require('dotenv').config();
const axios = require('axios');
const xml2js = require('xml2js');
const aswbxml = require('aswbxml');

// Configuration
const SERVER_URL = process.env.ACTIVESYNC_SERVER_URL || 'YOUR_SERVER_URL_HERE';
const EMAIL = process.env.ACTIVESYNC_EMAIL || 'YOUR_EMAIL_HERE';
const USERNAME = process.env.ACTIVESYNC_USERNAME || EMAIL;
const PASSWORD = process.env.ACTIVESYNC_PASSWORD || '';
const ACTIVESYNC_VERSION = process.env.ACTIVESYNC_VERSION || '14.1';
const DEVICEID = process.env.ACTIVESYNC_DEVICEID;

// XML Builder
const builder = new xml2js.Builder({
  //xmldec: { version: '1.0', encoding: 'utf-8' }
  headless: true,
});

// XML Parser
const parser = new xml2js.Parser({
  explicitArray: false,
  ignoreAttrs: true
});

/**
 * Get credentials, prompting for password if not set in environment
 * @returns {Object} Object containing username and password
 */
function getCredentials() {
  return { username: USERNAME, password: PASSWORD };
}

/**
 * Create XML payload for FolderSync command
 * @param {string} syncKey - The sync key to use (default: '0')
 * @returns {string} XML payload
 */
function createFolderSyncXml(syncKey = '0') {
  const obj = {
    'FolderSync': {
      '$': { 
        'xmlns': 'FolderHierarchy',
        // 'xmlns:fh': 'FolderHierarchy'
      },
      'SyncKey': [
        { _: syncKey }
      ]
    }
  };
  return obj; //builder.buildObject(obj);
}

/**
 * Create XML payload for Sync command
 * @param {string} collectionId - The collection ID to sync
 * @param {string} syncKey - The sync key to use (default: '0')
 * @returns {string} XML payload
 */
function createSyncXml(collectionId, syncKey = '0') {
  const obj = {
    Sync: {
      $: { 
        xmlns: 'AirSync',
        // 'xmlns:airsync': 'AirSync'
      },
      Collections: {
        Collection: {
          SyncKey: [
            { _: syncKey }
          ],
          CollectionId: collectionId,
          GetChanges: [
            { _: '1' }
          ],
          // Options: {
          //   FilterType: '0',
          //   Truncation: '0'
          // }
        }
      }
    }
  };
  return obj;
}

/**
 * Perform ActiveSync request
 * @param {string} username - The username to authenticate with
 * @param {string} password - The password to authenticate with
 * @param {string} command - The ActiveSync command to execute
 * @param {string} xmlPayload - The XML payload to send
 * @returns {Promise<string>} The response XML
 */
async function performActiveSyncRequest(username, password, command, xmlPayload) {
  console.log(`Preparing ActiveSync request for command: ${command}`);
  
  try {
    // 1. Encode XML to WBXML
    console.log("Encoding XML to WBXML...");
    // const wbxmlBuffer = await new Promise((resolve, reject) => {
    //   wbxml.encode(xmlPayload, (err, result) => {
    //     if (err) reject(err);
    //     else resolve(result);
    //   });
    // });
    const wbxmlBuffer = encodeWBXML(xmlPayload, command === 'FolderSync' ? 'FolderHierarchy' : 'AirSync');
    console.log(`WBXML Payload length: ${wbxmlBuffer.length} bytes`);
    
    // 2. Prepare headers
    const headers = {
      'Content-Type': 'application/vnd.ms-sync.wbxml', // Use WBXML content type
      'MS-ASProtocolVersion': ACTIVESYNC_VERSION,
      'User-Agent': 'LotusNotesClient/1.0',
      'Accept': '*/*',
      'Accept-Language': 'en-us',
      'Accept-Encoding': 'gzip, deflate',
      'Connection': 'keep-alive'
    };
    console.log('Headers:', headers);
    
    // 3. Prepare URL and params - Lotus Notes Traveler might have different parameter requirements
    const url = SERVER_URL;
    const params = {
      Cmd: command,
      User: EMAIL, // Use email instead of username for Lotus Notes
      DeviceId: DEVICEID,
      DeviceType: 'iPhone',
    };
    console.log(`Sending POST request to ${url}...`);
    
    // 4. Send request - Try different authentication methods
    // Method 1: Basic Auth
    try {
      console.log('Trying Basic Authentication...');
      const response = await axios.post(url, wbxmlBuffer, {
        headers,
        params,
        auth: {
          username,
          password
        },
        responseType: 'arraybuffer' // Important for binary WBXML response
      });
      
      console.log(`Response Status Code: ${response.status}`);
      
      // 5. Decode WBXML Response
      console.log("Decoding WBXML response...");
      if (response.data && response.data.length > 0) {
        try {
          // const decodedXml = await new Promise((resolve, reject) => {
          //   wbxml.decode(response.data, (err, result) => {
          //     if (err) reject(err);
          //     else resolve(result);
          //   });
          // });
          const decodedXml = decodeWBXML(response.data);
          console.log("Successfully decoded WBXML response.");
          return decodedXml;
        } catch (decodeError) {
          console.error(`Failed to decode WBXML response: ${decodeError}`);
          // Try to return as text as fallback
          return Buffer.from(response.data).toString('utf-8');
        }
      } else {
        console.log('Received empty response body.');
        return null;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If Basic Auth fails with 401, try Method 2
        console.log('Basic Authentication failed. Trying URL-based authentication...');
        
        // Method 2: URL-based authentication
        const urlWithAuth = new URL(url);
        urlWithAuth.username = encodeURIComponent(username);
        urlWithAuth.password = encodeURIComponent(password);
        
        const response = await axios.post(urlWithAuth.toString(), wbxmlBuffer, {
          headers,
          params,
          responseType: 'arraybuffer' // Important for binary WBXML response
        });
        
        console.log(`Response Status Code: ${response.status}`);
        
        // Decode WBXML Response
        console.log("Decoding WBXML response...");
        if (response.data && response.data.length > 0) {
          try {
            // const decodedXml = await new Promise((resolve, reject) => {
            //   wbxml.decode(response.data, (err, result) => {
            //     if (err) reject(err);
            //     else resolve(result);
            //   });
            // });
            const decodedXml = decodeWBXML(response.data);
            console.log("Successfully decoded WBXML response.");
            return decodedXml;
          } catch (decodeError) {
            console.error(`Failed to decode WBXML response: ${decodeError}`);
            // Try to return as text as fallback
            return Buffer.from(response.data).toString('utf-8');
          }
        } else {
          console.log('Received empty response body.');
          return null;
        }
      } else {
        // If it's not an auth error, rethrow
        throw error;
      }
    }
  } catch (error) {
    console.error('HTTP Request Error:', error.message);
    if (error.response) {
      console.error('Response Status:', error.response.status);
      if (error.response.data) {
        try {
          // Try to decode as WBXML if possible
          // const decodedError = await new Promise((resolve, reject) => {
          //   wbxml.decode(error.response.data, (err, result) => {
          //     if (err) reject(err);
          //     else resolve(result);
          //   });
          // });
          const decodedError = decodeWBXML(error.response.data);
          console.error('Response Body (decoded):', decodedError);
        } catch (decodeError) {
          // If decoding fails, show as string or hex
          console.error('Response Body:', 
            Buffer.isBuffer(error.response.data) 
              ? Buffer.from(error.response.data).toString('hex') 
              : error.response.data
          );
        }
      }
    }
    throw error;
  }
}

/**
 * Parse FolderSync response
 * @param {string} xmlText - The XML response from FolderSync
 * @returns {Promise<Object>} Object containing next sync key and folders
 */
async function parseFolderSyncResponse(xmlText) {
  try {
    const result = await parser.parseStringPromise(xmlText);
    
    // Extract SyncKey
    let nextSyncKey = null;
    if (result.FolderSync && result.FolderSync.SyncKey) {
      nextSyncKey = result.FolderSync.SyncKey;
    }
    
    // Extract folders
    const folders = [];
    if (result.FolderSync && result.FolderSync.Folders && result.FolderSync.Folders.Folder) {
      const folderList = Array.isArray(result.FolderSync.Folders.Folder) 
        ? result.FolderSync.Folders.Folder 
        : [result.FolderSync.Folders.Folder];
      
      folderList.forEach(folder => {
        folders.push({
          serverId: folder.ServerId,
          parentId: folder.ParentId,
          displayName: folder.DisplayName,
          type: folder.Type
        });
      });
    }
    
    return { nextSyncKey, folders };
  } catch (error) {
    console.error('Error parsing FolderSync response:', error);
    return { nextSyncKey: null, folders: [] };
  }
}

/**
 * Check folder for unread messages
 * @param {string} username - The username to authenticate with
 * @param {string} password - The password to authenticate with
 * @param {string} folderId - The folder ID to check
 * @param {string} folderName - The folder name (for logging)
 * @returns {Promise<Array>} Array of unread messages
 */
async function checkFolderForUnread(username, password, folderId, folderName) {
  console.log(`\nChecking folder '${folderName}' (ID: ${folderId}) for unread messages...`);
  
  // Initial sync with SyncKey='0'
  const syncXml = createSyncXml(folderId);
  console.log(`Sending initial Sync request for folder '${folderName}'...`);
  
  try {
    const responseText = await performActiveSyncRequest(username, password, 'Sync', syncXml);
    if (!responseText) {
      console.log(`No response received for folder '${folderName}'`);
      return [];
    }
    
    // Parse the response to get the SyncKey
    const result = await parser.parseStringPromise(responseText);
    
    // Extract SyncKey
    let nextSyncKey = null;
    if (result.Sync && 
        result.Sync.Collections && 
        result.Sync.Collections.Collection && 
        result.Sync.Collections.Collection.SyncKey) {
      nextSyncKey = result.Sync.Collections.Collection.SyncKey;
    }
    
    if (!nextSyncKey) {
      console.log(`Could not find SyncKey in response for folder '${folderName}'`);
      return [];
    }
    
    console.log(`Got SyncKey: ${nextSyncKey} for folder '${folderName}'`);
    
    // Now do a real sync with the new SyncKey
    const syncXml2 = createSyncXml(folderId, nextSyncKey);
    console.log(`Sending Sync request with SyncKey=${nextSyncKey} for folder '${folderName}'...`);
    
    const responseText2 = await performActiveSyncRequest(username, password, 'Sync', syncXml2);
    if (!responseText2) {
      console.log(`No response received for folder '${folderName}'`);
      return [];
    }
    
    // Parse the response to get unread messages
    const result2 = await parser.parseStringPromise(responseText2);
    
    // Extract unread messages
    const unreadMessages = [];
    
    if (result2.Sync && 
        result2.Sync.Collections && 
        result2.Sync.Collections.Collection && 
        result2.Sync.Collections.Collection.Commands && 
        result2.Sync.Collections.Collection.Commands.Add) {
      
      const addElements = Array.isArray(result2.Sync.Collections.Collection.Commands.Add) 
        ? result2.Sync.Collections.Collection.Commands.Add 
        : [result2.Sync.Collections.Collection.Commands.Add];
      
      addElements.forEach(add => {
        // In ActiveSync, Read=0 means unread
        if (add.ApplicationData && add.ApplicationData.Read === '0') {
          unreadMessages.push({
            subject: add.ApplicationData.Subject || 'No Subject',
            from: add.ApplicationData.From || 'Unknown Sender',
            dateReceived: add.ApplicationData.DateReceived || 'Unknown Date'
          });
        }
      });
    }
    
    return unreadMessages;
  } catch (error) {
    console.error(`Error checking folder '${folderName}' for unread messages:`, error);
    return [];
  }
}

/**
 * Main function
 */
async function main() {
  if (SERVER_URL.includes('YOUR_SERVER_URL_HERE') || EMAIL.includes('YOUR_EMAIL_HERE')) {
    console.log('Please configure ACTIVESYNC_SERVER_URL and ACTIVESYNC_EMAIL in the .env file or environment variables.');
    process.exit(1);
  }
  
  try {
    const { username, password } = getCredentials();
    console.log(`Attempting initial FolderSync to ${SERVER_URL} as ${username}...`);
    
    const folderSyncXml = createFolderSyncXml();
    console.log('\n--- Sending FolderSync Request ---');
    console.log('XML Payload:', folderSyncXml);
    
    const responseText = await performActiveSyncRequest(username, password, 'FolderSync', folderSyncXml);
    
    if (responseText) {
      console.log('\n--- Received FolderSync Response ---');
      console.log('Response XML:', responseText);
      
      // Parse the FolderSync response
      const { nextSyncKey, folders } = await parseFolderSyncResponse(responseText);
      
      if (nextSyncKey) {
        console.log(`\nNext SyncKey: ${nextSyncKey}`);
        console.log(`Found ${folders.length} folders:`);
        
        // Print folder details
        folders.forEach(folder => {
          console.log(`  - ${folder.displayName} (ID: ${folder.serverId}, Type: ${folder.type})`);
        });
        
        // Check each folder for unread messages
        const allUnreadMessages = [];
        
        for (const folder of folders) {
          // Skip certain folder types (like Drafts, Outbox, etc.)
          if (['3', '4', '5'].includes(folder.type)) {
            continue;
          }
          
          const unreadMessages = await checkFolderForUnread(username, password, folder.serverId, folder.displayName);
          
          if (unreadMessages.length > 0) {
            console.log(`\nFound ${unreadMessages.length} unread message(s) in '${folder.displayName}':`);
            unreadMessages.forEach(msg => {
              console.log(`  - Subject: ${msg.subject}`);
              console.log(`    From: ${msg.from}`);
              console.log(`    Received: ${msg.dateReceived}`);
              allUnreadMessages.push({
                folder: folder.displayName,
                subject: msg.subject,
                from: msg.from,
                dateReceived: msg.dateReceived
              });
            });
          }
        }
        
        // Summary
        if (allUnreadMessages.length > 0) {
          console.log(`\n--- Summary: Found ${allUnreadMessages.length} unread message(s) across all folders ---`);
        } else {
          console.log('\n--- No unread messages found in any folder ---');
        }
      } else {
        console.log('\nCould not find SyncKey in response.');
      }
    } else {
      console.log('\nNo response content received.');
    }
  } catch (error) {
    console.error('\nScript failed:', error);
  }
  
  console.log('\nScript finished.');
}


// ---
function encodeWBXML(obj) {
  return aswbxml.encode(obj, 'ActiveSync');
}

function decodeWBXML(wbxmlData) {
  return aswbxml.decode(encoded, 'ActiveSync');
}



// Run the main function
main();

// console.log(createFolderSyncXml());
// const encoded = aswbxml.encode(createFolderSyncXml(), 'ActiveSync');
// console.log(encoded);
// const decoded = aswbxml.decode(encoded, 'ActiveSync');
// console.log(decoded);