import { google } from 'googleapis';
import * as path from 'path';
import * as readline from 'readline';
import * as fs from 'fs/promises';


const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

const CREDENTIALS_PATH = path.join(__dirname, '../../credentials.json');
const TOKEN_PATH = path.join(__dirname, '../../token.json');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export const authorize = async () => {

    // Load client credentials from a file
    const credentials = require(CREDENTIALS_PATH);
    const { client_secret, client_id, redirect_uris } = credentials.installed;

    // Create an OAuth2 client with the obtained credentials
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    try {
        // Load and set the user's token
        const token = await fs.readFile(TOKEN_PATH, 'utf-8');
        oAuth2Client.setCredentials(JSON.parse(token));
        return oAuth2Client;
    } catch (error) {
        // If no valid token, generate an authorization URL and exchange code for token
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });

        console.log('Authorize this app by visiting this URL:', authUrl);
        const code = await new Promise<string>((resolve) => {
            rl.question('Enter the code from that page here: ', (code) => {
                resolve(code);
            });
        });

        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens));
        return oAuth2Client;
    }
}