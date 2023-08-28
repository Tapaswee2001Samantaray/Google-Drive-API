import { Request, Response } from 'express';
import { authorize } from '../configuration/auth';
import { getFolderMetadata, listFilesInFolder, listViewersForFile } from '../services/driveService';
import { formatBytes, mapMimeTypeToReadableName } from '../utils/formatUtils';


export const folderController = async (req: Request, res: Response) => {
    const { folderId } = req.params;

    try {
        // Check if folderId is provided
        if (folderId) {
            const authClient = await authorize();
            const folderMetadata = await getFolderMetadata(folderId as string, authClient);

            if (folderMetadata) {
                const { createdTime, modifiedTime, name, mimeType, size, owners, permissions, webViewLink, parents } = folderMetadata;

                const filesInFolder = await listFilesInFolder(folderId as string, authClient);

                const folderContents = await Promise.all(filesInFolder.map(async file => {
                    if (file.id) {
                        const viewers = await listViewersForFile(file.id, authClient);

                        const fileSizeInBytes = file.size || "0";
                        const formattedFileSize = formatBytes(fileSizeInBytes);

                        return {
                            id: file.id,
                            fileName: file.name,
                            fileType: mapMimeTypeToReadableName(file.mimeType),
                            fileSize: formattedFileSize,
                            owners: file.owners,
                            createdTime: new Date(file.createdTime as string).toLocaleString(),
                            modifiedTime: new Date(file.modifiedTime as string).toLocaleString(),
                            permissions: file.permissions,
                            visibility: file.parents ? "private" : "public",
                            filePath: file.webViewLink,
                            viewers: viewers
                        }
                    } else {
                        return null;
                    }
                }));

                return res.json({
                    success: true, message: "Success", folderMetadata: {
                        folderId: folderId,
                        createdTime: new Date(createdTime as string).toLocaleString(),
                        modifiedTime: new Date(modifiedTime as string).toLocaleString(),
                        folderName: name,
                        mimeType,
                        size,
                        owners,
                        permissions,
                        visibility: parents ? "private" : "public",
                        filePath: webViewLink,
                        folderContents,
                    }
                });
            } else {
                return res.status(404).json({ success: false, message: 'Folder not found' });
            }
        } else {
            return res.status(400).json({ success: false, message: 'Folder ID is missing' });
        }
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Error processing request' });
    }
};


