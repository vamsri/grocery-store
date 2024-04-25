/* eslint-disable */
import React from 'react';
import RootLayout from './RootLayout';
import ImageUpload from '../components/ImageUpload';

function ProductImage() {
  return (
    <div className="bg-slate-100">
      <RootLayout>
        <ImageUpload />
      </RootLayout>
    </div>
  );
}

export default ProductImage;
