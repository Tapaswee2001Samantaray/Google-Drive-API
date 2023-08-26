export interface DriveMetaDataModel {
    id: string;
    fileName: string;
    fileType: string;
    fileSize?: string;
    owners?: (OwnersEntity)[] | null;
    createdTime: string;
    modifiedTime: string;
    permissions?: (PermissionsEntity)[] | null;
    visibility: string;
    filePath: string;
    viewers?: (null)[] | null;
}

export interface OwnersEntity {
    displayName: string;
    kind: string;
    me: boolean;
    permissionId: string;
    emailAddress: string;
    photoLink: string;
}

export interface PermissionsEntity {
    id: string;
    displayName: string;
    type: string;
    kind: string;
    photoLink: string;
    emailAddress: string;
    role: string;
    deleted: boolean;
    pendingOwner: boolean;
}
