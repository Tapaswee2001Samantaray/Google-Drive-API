import axios from "axios";

export class DriveMetaDataService {
    private static URL: string = "http://localhost:3001";

    public static getDriveMetaData(folderId: string) {
        let driveMetaDataURL = `${this.URL}/folder-metadata/${folderId}`;

        return axios.get(driveMetaDataURL);
    }
}