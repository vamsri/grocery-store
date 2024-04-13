/* eslint-disable */
import React from 'react';
import RootLayout from './RootLayout';
import CategoryComponent from '../components/CategoryComponent';

function Category() {
  return (
    <div className="bg-slate-100">
      <RootLayout>
        <CategoryComponent />
      </RootLayout>
    </div>
  );
}

export default Category;
