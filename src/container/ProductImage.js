/* eslint-disable */
import React from 'react';
import RootLayout from './RootLayout';
import ProdImageUpload from '../components/ProdImageUpload';
import { useParams } from 'react-router-dom';
import { ScrollProvider } from '../components/Scroll/ScrollProvider';

function ProductImage() {
  const {id: prodId} = useParams();
  return (
    <div className="bg-slate-100">
      <RootLayout>
        <ScrollProvider>
          <ProdImageUpload prodId={prodId}/>
        </ScrollProvider>
      </RootLayout>
    </div>
  );
}

export default ProductImage;
