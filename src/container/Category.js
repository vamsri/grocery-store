/* eslint-disable */
import React from 'react';
import RootLayout from './RootLayout';
import CategoryComponent from '../components/CategoryComponent';
import { ScrollProvider } from '../components/Scroll/ScrollProvider';

function Category() {
  return (
    <div className="bg-slate-100">
      <RootLayout>
        <ScrollProvider>
          <CategoryComponent />
        </ScrollProvider>
      </RootLayout>
    </div>
  );
}

export default Category;
