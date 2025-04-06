# ActiveSync Email Checker (Node.js)

This Node.js script connects to a Lotus Notes Traveler server (or any ActiveSync-compatible server) to check for unread emails across all folders.

## Features

- Connects to an ActiveSync server using WBXML encoding/decoding
- Lists all folders in the mailbox
- Checks each folder for unread messages
- Displays a summary of all unread messages found

## Requirements

- Node.js 14.x or higher
- Required npm packages (see `package.json`):
  - `axios`: For HTTP communication
  - `xml2js`: For XML parsing/building
  - `dotenv`: For environment variable management
  - `prompt-sync`: For password prompting
  - `activesync-wbxml`: For WBXML encoding/decoding

## Installation

1. Clone this repository or download the script files
2. Install the required packages:

```bash
npm install
```

## Configuration

You can configure the script in two ways:

### 1. Environment Variables (.env file)

Create or edit the `.env` file with the following variables:

```
ACTIVESYNC_SERVER_URL=https://mail.example.com/Microsoft-Server-ActiveSync
ACTIVESYNC_EMAIL=user@example.com
ACTIVESYNC_USERNAME=user@example.com
ACTIVESYNC_PASSWORD=your_password
ACTIVESYNC_VERSION=14.1
```

Note: Setting the password in the `.env` file is optional. If not set, the script will prompt for it.

### 2. Edit the Script

Open `activesync-checker.js` and modify the following variables at the top of the file:

```javascript
const SERVER_URL = process.env.ACTIVESYNC_SERVER_URL || 'YOUR_SERVER_URL_HERE';
const EMAIL = process.env.ACTIVESYNC_EMAIL || 'YOUR_EMAIL_HERE';
const USERNAME = process.env.ACTIVESYNC_USERNAME || EMAIL;
const PASSWORD = process.env.ACTIVESYNC_PASSWORD || '';
const ACTIVESYNC_VERSION = process.env.ACTIVESYNC_VERSION || '14.1';
```

## Usage

Run the script:

```bash
node activesync-checker.js
```

Or use the npm script:

```bash
npm start
```

If you haven't set the `ACTIVESYNC_PASSWORD` environment variable, the script will prompt you to enter your password.

## Output

The script will:

1. Connect to the ActiveSync server
2. Retrieve a list of all folders
3. Check each folder for unread messages
4. Display a summary of all unread messages found

Example output:

```
Attempting initial FolderSync to https://mail.example.com/Microsoft-Server-ActiveSync as user@example.com...

--- Sending FolderSync Request ---
XML Payload: <?xml version="1.0" encoding="utf-8"?>
<FolderSync xmlns="FolderHierarchy">
  <SyncKey>0</SyncKey>
</FolderSync>

...

Next SyncKey: 1234567890
Found 10 folders:
  - Inbox (ID: 1, Type: 1)
  - Sent Items (ID: 2, Type: 2)
  - Drafts (ID: 3, Type: 3)
  ...

Checking folder 'Inbox' (ID: 1) for unread messages...
...
Found 2 unread message(s) in 'Inbox':
  - Subject: Important Meeting
    From: boss@example.com
    Received: 2023-04-05T10:30:00Z
  - Subject: Project Update
    From: colleague@example.com
    Received: 2023-04-05T09:15:00Z

--- Summary: Found 2 unread message(s) across all folders ---
```

## Troubleshooting

- If you get authentication errors, check your username and password
- If you get connection errors, verify the server URL
- If you get WBXML encoding/decoding errors, check the version of the ActiveSync protocol
- If you get XML parsing errors after WBXML decoding, the response might be in an unexpected format
- For SSL certificate errors, you can modify the axios request to include `{ httpsAgent: new https.Agent({ rejectUnauthorized: false }) }` (not recommended for production)

## Notes

- The script uses the ActiveSync protocol with WBXML encoding/decoding
- It performs a FolderSync operation to get a list of all folders
- For each folder, it performs a Sync operation to check for unread messages
- The script handles both namespaced and non-namespaced XML responses
- The script properly encodes XML to WBXML before sending to the server and decodes WBXML responses back to XML
