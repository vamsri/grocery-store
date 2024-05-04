/* eslint-disable */
import React from 'react';
import RootLayout from './RootLayout';
import ProdImageUpload from '../components/ProdImageUpload';
import { useParams } from 'react-router-dom';

function ProductImage() {
  const {id: prodId} = useParams();
  console.log('get the catid->', prodId);
  return (
    <div className="bg-slate-100">
      <RootLayout>
        <ProdImageUpload prodId={prodId}/>
      </RootLayout>
    </div>
  );
}

export default ProductImage;
