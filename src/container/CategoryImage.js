/* eslint-disable */
import React from 'react';
import RootLayout from './RootLayout';
import ImageUpload from '../components/CatImageUpload';
import { useParams } from 'react-router-dom';

function CategoryImage() {
  const {id: catId} = useParams();
  console.log('get the catid->', catId);
  return (
    <div className="bg-slate-100">
      <RootLayout>   
        <div className={"grid grid-cols-1 w-full h-screen m-2"}>
          <ImageUpload catId={catId}/>  
        </div>
      </RootLayout>
    </div>
  );
}

export default CategoryImage;
