/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CatImageUpload = ({catId}) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [category, setCategory] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'X-Tenant-ID': '661a6b052ce9f34f30fb9d1a',
      'Content-Type': 'application/json'
    };
    axios
      .get(`${apiUrl}/categories/${catId}`, {headers})
      .then((response) => {
        if (response.data) {          
          const {images} = response.data;
          setImage(images[0]);
          setPreviewUrl(images[0]);
          setCategory(response.data);
        }
      })
      .catch((err) => {
        console.log('err->', err);
      });
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${apiUrl}/categories/${catId}/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-ID': '661a6b052ce9f34f30fb9d1a',
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Uploaded:', response.data);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleCancel = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="container mx-auto p-4 w-1/2">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {previewUrl && (
          <div className="flex flex-col items-center">
            <img
              src={previewUrl}
              alt="Preview"
              className="mb-4 max-w-xs rounded-lg w-full"
            />
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
            >
              Cancel
            </button>
          </div>
        )}
        <input
          type="file"
          onChange={handleImageChange}
          className="file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CatImageUpload;
