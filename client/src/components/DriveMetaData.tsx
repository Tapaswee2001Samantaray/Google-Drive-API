import React, { useState } from 'react';
import Loader from 'react-js-loader';

import { DriveMetaDataService } from '../service/DriveMetaDataService';
import { DriveMetaDataModel } from '../models/DriveMetaDataModel';
import "./styles.css";


const DriveMetaData: React.FC = () => {
  const [metaData, setMetaData] = useState<DriveMetaDataModel[]>([]);
  const [folderId, setFolderId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchEmailValue, setSearchEmailValue] = useState<string>("");
  const [filteredMetaData, setFilteredMetaData] = useState<DriveMetaDataModel[]>([]);

  const getDriveMetaDatas = async () => {
    setLoading(true);
    try {
      const response = await DriveMetaDataService.getDriveMetaData(folderId);
      setMetaData(response.data.folderMetadata.folderContents);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  const getFilteredMetaDataOfFolderByEmail = () => {
    if (searchEmailValue.trim() === "") {
      setFilteredMetaData(metaData);
    } else {
      const filteredData = metaData.filter((item => item.owners?.some((owner: any) => owner.emailAddress === searchEmailValue)));
      setFilteredMetaData(filteredData);
    }
  }


  console.log(metaData)
  return (
    <div className='container'>
      <h1>Google Drive Folder Contents</h1>
      <div className="input-container">
        <input
          className="folder-input"
          type="text"
          placeholder="Enter Folder ID"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
        />
        <button className="fetch-button" onClick={getDriveMetaDatas}>Fetch Metadata</button>

        <input
          className="search-input"
          type="text"
          placeholder="Enter Email ID"
          value={searchEmailValue}
          onChange={(e) => setSearchEmailValue(e.target.value)}
        />
        <button className="fetch-button" onClick={getFilteredMetaDataOfFolderByEmail}>Search</button>
      </div>
      {loading ? (
        <div>
          <Loader type="spinner-cub" bgColor={"blue"} color={'red'} size={100} />
        </div>) : (
        <table className="metadata-table">
          <thead>
            <th>Date Created</th>
            <th>Date Modified</th>
            <th>File Name</th>
            <th>File Type</th>
            <th>File Size</th>
            <th>Visibility</th>
            <th>Owner</th>
            <th>Editors</th>
            <th>Viewers</th>
            <th>File Path</th>
          </thead>
          <tbody>
            {metaData?.map((item) => (
              <tr>
                <td>{item.createdTime}</td>
                <td>{item.modifiedTime}</td>
                <td>{item.fileName}</td>
                <td>{item.fileType}</td>
                <td>{item.fileSize}</td>
                <td>{item.visibility}</td>
                <td>{item.owners?.map((name: any) => name.displayName).join(', ')}</td>
                <td>{item.permissions?.filter((perm) => perm.role === "writer").map((perm) => perm.displayName).join(', ')}</td>
                <td>{item.permissions?.filter((perm) => perm.role === "reader").map((perm) => perm.displayName).join(', ')}</td>
                <td>{item.filePath}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />
      <div>
        <table className="metadata-table">
          <thead>
            <th>Date Created</th>
            <th>Date Modified</th>
            <th>File Name</th>
            <th>File Type</th>
            <th>File Size</th>
            <th>Visibility</th>
            <th>Owner</th>
            <th>Editors</th>
            <th>Viewers</th>
            <th>File Path</th>
          </thead>
          <tbody>
            {filteredMetaData?.map((item) => (
              <tr>
                <td>{item.createdTime}</td>
                <td>{item.modifiedTime}</td>
                <td>{item.fileName}</td>
                <td>{item.fileType}</td>
                <td>{item.fileSize}</td>
                <td>{item.visibility}</td>
                <td>{item.owners?.map((name: any) => name.displayName).join(', ')}</td>
                <td>{item.permissions?.filter((perm) => perm.role === "writer").map((perm) => perm.displayName).join(', ')}</td>
                <td>{item.permissions?.filter((perm) => perm.role === "reader").map((perm) => perm.displayName).join(', ')}</td>
                <td>{item.filePath}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriveMetaData;