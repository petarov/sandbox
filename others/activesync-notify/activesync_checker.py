import os
import requests
from getpass import getpass
from requests.auth import HTTPBasicAuth
import xml.etree.ElementTree as ET
from io import BytesIO

# --- Configuration ---
# Replace with your actual server URL (base URL, *not* the EWS endpoint) and email address
# It's recommended to use environment variables or a more secure method for credentials
SERVER_BASE_URL = os.getenv('ACTIVESYNC_SERVER_URL', 'YOUR_SERVER_URL_HERE') # e.g., 'https://mail.example.com/Microsoft-Server-ActiveSync'
EMAIL_ADDRESS = os.getenv('ACTIVESYNC_EMAIL', 'YOUR_EMAIL_HERE') # Used for logging/context, username might be different
USERNAME = os.getenv('ACTIVESYNC_USERNAME', EMAIL_ADDRESS) # Often domain\user or just user
PASSWORD = os.getenv('ACTIVESYNC_PASSWORD', '')
ACTIVESYNC_ENDPOINT = f"{SERVER_BASE_URL}"
ACTIVESYNC_VERSION = '14.1' # Adjust if your server uses a different version

# --- Functions ---

def get_credentials():
    """Gets credentials, prompting for password if not set in environment."""
    password = PASSWORD
    if not password:
        print(f"Password for {USERNAME} not found in environment variables.")
        password = getpass(f"Enter password for {USERNAME}: ")
    return USERNAME, password

def create_foldersync_xml(sync_key='0'):
    """Creates the basic XML payload for FolderSync."""
    # Note: XML namespaces might be required depending on the AS version and server implementation
    # This is a simplified example.
    return f"""<?xml version="1.0" encoding="utf-8"?>
<FolderSync xmlns="FolderHierarchy">
    <SyncKey>{sync_key}</SyncKey>
</FolderSync>
"""

def perform_activesync_request(username, password, command, xml_payload):
    """Sends request with plain XML payload, handles plain text response."""
    print(f"Preparing ActiveSync request for command: {command}")

    try:
        # 1. Prepare Headers
        headers = {
            'Content-Type': 'text/xml',  # Using plain XML instead of WBXML
            'MS-ASProtocolVersion': ACTIVESYNC_VERSION,
            'User-Agent': 'PythonActiveSyncClient/0.1',
            # Add other headers like X-MS-PolicyKey if needed later
        }
        print(f"Headers: {headers}")

        # 2. Send POST Request
        print(f"Sending POST request to {ACTIVESYNC_ENDPOINT}...")
        response = requests.post(
            ACTIVESYNC_ENDPOINT,
            params={'Cmd': command, 'User': username, 'DeviceId': 'TEST', 'DeviceType': 'TEST'}, # DeviceId/Type can be arbitrary but consistent
            headers=headers,
            data=xml_payload.encode('utf-8'),
            auth=HTTPBasicAuth(username, password),
            verify=True # Set to False to ignore SSL errors (not recommended for production)
        )

        print(f"Response Status Code: {response.status_code}")
        response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)

        # 3. Handle Response
        print("Handling response...")
        if response.content:
            response_text = response.text
            print("Successfully received response.")
            return response_text
        else:
            print("Received empty response body.")
            return None

    except requests.exceptions.RequestException as e:
        print(f"HTTP Request Error: {e}")
        if e.response is not None:
            print(f"Response Body: {e.response.text}") # Show text response on HTTP error
        raise
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        raise


def create_sync_xml(collection_id, sync_key='0'):
    """Creates the XML payload for Sync command."""
    return f"""<?xml version="1.0" encoding="utf-8"?>
<Sync xmlns="AirSync">
    <Collections>
        <Collection>
            <SyncKey>{sync_key}</SyncKey>
            <CollectionId>{collection_id}</CollectionId>
            <GetChanges>1</GetChanges>
            <Options>
                <FilterType>0</FilterType>
                <Truncation>0</Truncation>
            </Options>
        </Collection>
    </Collections>
</Sync>
"""

def parse_folder_sync_response(xml_text):
    """Parses the FolderSync response to extract SyncKey and folder details."""
    try:
        root = ET.fromstring(xml_text)
        
        # Define namespace map
        ns = {'fh': 'FolderHierarchy'}
        
        # Extract SyncKey
        sync_key_element = root.find('.//fh:SyncKey', ns)
        if sync_key_element is None:
            # Try without namespace
            sync_key_element = root.find('.//SyncKey')
        
        next_sync_key = sync_key_element.text if sync_key_element is not None else None
        
        # Extract folders
        folders = []
        folder_elements = root.findall('.//fh:Folder', ns)
        if not folder_elements:
            # Try without namespace
            folder_elements = root.findall('.//Folder')
        
        for folder in folder_elements:
            server_id = folder.find('.//fh:ServerId', ns)
            if server_id is None:
                server_id = folder.find('.//ServerId')
            
            parent_id = folder.find('.//fh:ParentId', ns)
            if parent_id is None:
                parent_id = folder.find('.//ParentId')
            
            display_name = folder.find('.//fh:DisplayName', ns)
            if display_name is None:
                display_name = folder.find('.//DisplayName')
            
            folder_type = folder.find('.//fh:Type', ns)
            if folder_type is None:
                folder_type = folder.find('.//Type')
            
            folders.append({
                'server_id': server_id.text if server_id is not None else None,
                'parent_id': parent_id.text if parent_id is not None else None,
                'display_name': display_name.text if display_name is not None else None,
                'type': folder_type.text if folder_type is not None else None
            })
        
        return next_sync_key, folders
    except Exception as e:
        print(f"Error parsing FolderSync response: {e}")
        return None, []

def check_folder_for_unread(username, password, folder_id, folder_name):
    """Checks a folder for unread messages using Sync command."""
    print(f"\nChecking folder '{folder_name}' (ID: {folder_id}) for unread messages...")
    
    # Initial sync with SyncKey='0'
    sync_xml = create_sync_xml(folder_id)
    print(f"Sending initial Sync request for folder '{folder_name}'...")
    
    response_text = perform_activesync_request(username, password, 'Sync', sync_xml)
    if not response_text:
        print(f"No response received for folder '{folder_name}'")
        return []
    
    try:
        # Parse the response to get the SyncKey
        root = ET.fromstring(response_text)
        
        # Define namespace map
        ns = {'as': 'AirSync'}
        
        # Extract SyncKey
        sync_key_element = root.find('.//as:SyncKey', ns)
        if sync_key_element is None:
            # Try without namespace
            sync_key_element = root.find('.//SyncKey')
        
        if sync_key_element is None:
            print(f"Could not find SyncKey in response for folder '{folder_name}'")
            return []
        
        next_sync_key = sync_key_element.text
        print(f"Got SyncKey: {next_sync_key} for folder '{folder_name}'")
        
        # Now do a real sync with the new SyncKey
        sync_xml = create_sync_xml(folder_id, next_sync_key)
        print(f"Sending Sync request with SyncKey={next_sync_key} for folder '{folder_name}'...")
        
        response_text = perform_activesync_request(username, password, 'Sync', sync_xml)
        if not response_text:
            print(f"No response received for folder '{folder_name}'")
            return []
        
        # Parse the response to get unread messages
        root = ET.fromstring(response_text)
        
        # Extract unread messages
        unread_messages = []
        
        # Look for Add elements which contain new messages
        add_elements = root.findall('.//as:Add', ns)
        if not add_elements:
            # Try without namespace
            add_elements = root.findall('.//Add')
        
        for add in add_elements:
            # Check if the message is unread
            read_element = add.find('.//as:Read', ns)
            if read_element is None:
                read_element = add.find('.//Read')
            
            # In ActiveSync, Read=0 means unread
            if read_element is not None and read_element.text == '0':
                # Extract message details
                subject_element = add.find('.//as:Subject', ns)
                if subject_element is None:
                    subject_element = add.find('.//Subject')
                
                from_element = add.find('.//as:From', ns)
                if from_element is None:
                    from_element = add.find('.//From')
                
                date_received_element = add.find('.//as:DateReceived', ns)
                if date_received_element is None:
                    date_received_element = add.find('.//DateReceived')
                
                unread_messages.append({
                    'subject': subject_element.text if subject_element is not None else 'No Subject',
                    'from': from_element.text if from_element is not None else 'Unknown Sender',
                    'date_received': date_received_element.text if date_received_element is not None else 'Unknown Date'
                })
        
        return unread_messages
    except Exception as e:
        print(f"Error checking folder '{folder_name}' for unread messages: {e}")
        return []

# --- Main Execution ---

if __name__ == "__main__":
    if 'YOUR_SERVER_URL_HERE' in SERVER_BASE_URL or 'YOUR_EMAIL_HERE' in EMAIL_ADDRESS:
        print("Please configure ACTIVESYNC_SERVER_URL and ACTIVESYNC_EMAIL/USERNAME in the script or environment variables.")
        exit(1)

    try:
        user, pwd = get_credentials()
        print(f"Attempting initial FolderSync to {ACTIVESYNC_ENDPOINT} as {user}...")

        foldersync_xml = create_foldersync_xml()
        print("\n--- Sending FolderSync Request ---")
        print(f"XML Payload:\n{foldersync_xml}")

        response_text = perform_activesync_request(user, pwd, 'FolderSync', foldersync_xml)

        if response_text:
            print("\n--- Received FolderSync Response ---")
            # Pretty print the XML for readability
            try:
                root = ET.fromstring(response_text)
                ET.indent(root) # Requires Python 3.9+
                print(ET.tostring(root, encoding='unicode'))
            except Exception as parse_err:
                print(f"Could not parse/pretty-print response XML: {parse_err}")
                print("Raw Response Text:")
                print(response_text)

            # Parse the FolderSync response
            next_sync_key, folders = parse_folder_sync_response(response_text)
            
            if next_sync_key:
                print(f"\nNext SyncKey: {next_sync_key}")
                print(f"Found {len(folders)} folders:")
                
                # Print folder details
                for folder in folders:
                    print(f"  - {folder['display_name']} (ID: {folder['server_id']}, Type: {folder['type']})")
                
                # Check each folder for unread messages
                all_unread_messages = []
                
                for folder in folders:
                    # Skip certain folder types (like Drafts, Outbox, etc.)
                    if folder['type'] in ['3', '4', '5']:  # Common types to skip
                        continue
                    
                    unread_messages = check_folder_for_unread(user, pwd, folder['server_id'], folder['display_name'])
                    
                    if unread_messages:
                        print(f"\nFound {len(unread_messages)} unread message(s) in '{folder['display_name']}':")
                        for msg in unread_messages:
                            print(f"  - Subject: {msg['subject']}")
                            print(f"    From: {msg['from']}")
                            print(f"    Received: {msg['date_received']}")
                            all_unread_messages.append({
                                'folder': folder['display_name'],
                                'subject': msg['subject'],
                                'from': msg['from'],
                                'date_received': msg['date_received']
                            })
                
                # Summary
                if all_unread_messages:
                    print(f"\n--- Summary: Found {len(all_unread_messages)} unread message(s) across all folders ---")
                else:
                    print("\n--- No unread messages found in any folder ---")
            else:
                print("\nCould not find SyncKey in response.")
        else:
            print("\nNo response content received.")

    except Exception as e:
        print(f"\nScript failed: {e}")

    print("\nScript finished.")
