import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [file, setFile] = useState('');

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', res.data);
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Upload Image</h1>
      <input type="file" onChange={onFileChange} />
      <button type="submit">Upload Image</button>
    </form>
  );
}

export default ImageUpload;
