import { google } from 'googleapis';


export const getFolderMetadata = async (folderId: string, authClient: any) => {
    const drive = google.drive({ version: 'v3', auth: authClient });

    try {
        // Retrieve metadata of the specified folder
        const res = await drive.files.get({
            fileId: folderId,
            fields: 'createdTime, modifiedTime, name, mimeType, size, owners, permissions, webViewLink, parents',
        });
        return res.data;
    } catch (error: any) {
        console.error('Error retrieving folder metadata:', error.message);
        return null;
    }
}

export const listFilesInFolder = async (folderId: string, authClient: any) => {
    const drive = google.drive({ version: "v3", auth: authClient });

    try {
        // List files in the specified folder
        const res = await drive.files.list({
            q: `'${folderId}' in parents`,
            fields: `files(id, name, mimeType, size, owners, createdTime, modifiedTime, permissions, parents, webViewLink)`
        });

        return res.data.files || [];
    } catch (err: any) {
        console.log("Error Listening files in the folder: ", err.message);
        return [];
    }
}

export const listViewersForFile = async (fileId: string, authClient: any) => {
    const drive = google.drive({ version: "v3", auth: authClient });

    try {
        // List permissions for the specified file
        const res = await drive.permissions.list({
            fileId: fileId,
            fields: `permissions(id, displayName, emailAddress, role)`
        });

        // Filter permissions to get viewers
        const viewers = res.data.permissions?.filter(permission => permission.role === "reader");

        return viewers?.map(viewer => ({
            emailAddress: viewer.emailAddress,
            displayName: viewer.displayName
        }));

    } catch (err: any) {
        console.log("Error Retriving viewers of the file: ", err.message);
        return [];
    }
}