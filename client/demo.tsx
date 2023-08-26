import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GoogleDrive.css';

import Loader from "react-js-loader";

const GoogleDrive: React.FC = () => {
    const [metadata, setMetadata] = useState<any[]>([]);
    const [folderId, setFolderId] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filteredMetadata, setFilteredMetadata] = useState<any[]>([]);

    const fetchMetadata = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/folder-metadata/${folderId}`);
            console.log(response.data)
            setMetadata(response.data.folderMetadata.folderContents);
        } catch (error) {
            console.error('Error fetching metadata:', error);
        }
        finally {
            setLoading(false);
        }
    };
    function A() {
        if (searchValue.trim() === "") {
            setFilteredMetadata(metadata);
        } else {
            //const filteredData = metadata.map((item)=>item.owners.filter((e:any)=>e.emailAddress===searchValue
            //))

            const filteredData = metadata.filter((item => item.owners.some((owner: any) => owner.emailAddress === searchValue)))
            setFilteredMetadata(filteredData);
            console.log("kkk", filteredData)

            /*if (filteredData.length > 0) {
              const matchedData = filteredData.map(item => {
                const matchingOwner = item.owners.find((owner:any) => owner.emailAddress === searchValue);
                const matchpermissions = item.permissions.map((permission:any)=> 
                return {
                  createdTime:item.createdTime,
                  fileName: item. fileName,
                  filePath:item. filePath,
                  fileSize:item.fileSize,
                  fileType:item.fileType,
                  id:item.id,
                  modifiedTime:item.modifiedTime,
                  owner: matchingOwner,
                  visibility:item. visibility,
      
                };
              });
              console.log("Matching items:", matchedData);
              setFilteredMetadata(matchedData)
            } else {
              console.log("No matching items found.");
            }
            
      
      
          }*/
        };
    }


    console.log("filterdata", filteredMetadata)
    return (
        <div className="container">
            <h1>Google Drive Folder Contents</h1>
            <div className="input-container">
                <input
                    className="folder-input"
                    type="text"
                    placeholder="Enter Folder ID"
                    value={folderId}
                    onChange={(e) => setFolderId(e.target.value)}
                />
                <button className="fetch-button" onClick={fetchMetadata}>Fetch Metadata</button>



                <input
                    className="search-input"
                    type="text"
                    placeholder="Search by Owner's Name"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}

                />
                <button onClick={A}>Search</button>
            </div>
            {loading ? (
                <div>

                    <Loader type="spinner-cub" bgColor={"blue"} color={'red'} size={100} />
                </div>
            ) :



                (<table className="metadata-table">
                    {/* Table headings */}
                    <thead>
                        <tr>
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
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                        {metadata?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.createdTime}</td>
                                <td>{item.modifiedTime}</td>
                                <td>{item.fileName}</td>
                                <td>{item.fileType}</td>
                                <td>{item.fileSize}</td>
                                <td>{item.visibility}</td>
                                <td>{item.owners.map((e: any) => e.displayName).join(', ')}</td>
                                <td>{item.permissions.filter((e: any) => e.role === "writer").map((item1: any) => item1.displayName).join(', ')}</td>
                                <td>{item.permissions.filter((e: any) => e.role === "reader").map((item1: any) => item1.displayName).join(', ')}</td>
                                <td>{item.filePath}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>)}

            <br></br>
            {/* Another Table */}
            <div>
                <table className="metadata-table">
                    {/* Table headings */}
                    <thead>
                        <tr>
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
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                        {filteredMetadata?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.createdTime}</td>
                                <td>{item.modifiedTime}</td>
                                <td>{item.fileName}</td>
                                <td>{item.fileType}</td>
                                <td>{item.fileSize}</td>
                                <td>{item.visibility}</td>
                                <td>{item.owners.map((e: any) => e.displayName).join(', ')}</td>
                                <td>{item.permissions.filter((e: any) => e.role === "writer").map((item1: any) => item1.displayName).join(', ')}</td>
                                <td>{item.permissions.filter((e: any) => e.role === "reader").map((item1: any) => item1.displayName).join(', ')}</td>
                                <td>{item.filePath}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>




        </div>
    );
};

export default GoogleDrive;