/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';
// import { Plus } from '@heroicons/react/24/solid'

const AdvancedFileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post('/api/upload', formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );
                    setUploadProgress(progress);
                },
            })
                .then((response) => {
                    setUploadStatus('File uploaded successfully');
                    // Do something with the response if needed
                })
                .catch((error) => {
                    setUploadStatus('Error uploading file');
                    console.error('Error uploading file:', error);
                });
        }
    };

    const ProfilePreview = () => {
        return (
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Profile Preview</h2>
                <div className="flex items-center justify-center w-64 h-64 bg-gray-200 rounded-full mt-2">
                    {selectedFile ? (
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected file"
                            className="w-full h-400"
                        />
                    ) : (
                        // <Plus className="w-8 h-8 text-gray-500" />
                        <div>Plus Icon</div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className='grid grid-cols-1 h-screen m-2 gap-4 w-screen'>
            <div className="flex flex-col items-center justify-center bg-slate-100 p-4">
                <label htmlFor="fileInput" className="relative cursor-pointer">
                    <input
                        id="fileInput"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                    />
                    <div className="flex items-center justify-center w-64 h-64 bg-gray-200 rounded-full">
                        {selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected file"
                                className="w-full h-full rounded-full"
                            />
                        ) : (
                            // <Plus className="w-8 h-8 text-gray-500" />
                            <div>Plus Icon</div>
                        )}
                    </div>
                </label>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleUpload}
                >
                    Upload
                </button>
                {uploadProgress > 0 && (
                    <div className="mt-4 w-full bg-gray-200 rounded">
                        <div
                            className="h-2 bg-blue-500 rounded"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                )}
                {uploadStatus && <p className="mt-4 text-gray-500">{uploadStatus}</p>}

            </div>
            {/* <div className='bg-slate-100 p-4 flex items-center justify-center'>
                <ProfilePreview />
            </div> */}
        </div>

    );
};

export default AdvancedFileUpload;
