/* eslint-disable */
import React from 'react';
import RootLayout from './RootLayout';
import ImageUpload from '../components/ImageUpload';
import { useParams } from 'react-router-dom';

import {Card} from '@vamsridhar/sharabha-store';

function CategoryImage() {
  const {id: catId} = useParams();
  console.log('get the catid->', catId);
  return (
    <div className="bg-slate-100">
      <RootLayout>   
        <div className={"grid grid-cols-1 w-full h-screen m-2"}>
          <ImageUpload catId={catId}/>  
          
          {/* <Card 
            title={"Category"}
            description={"Category Details"}
          >
            <ImageUpload />
          </Card>
          <Card 
            title={"Category Image"}
            description={"Upload the Category Image"}
          >
            <ImageUpload />
          </Card> */}
        </div>
      </RootLayout>
    </div>
  );
}

export default CategoryImage;
