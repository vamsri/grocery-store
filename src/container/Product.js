/* eslint-disable */
import React from 'react';
import RootLayout from './RootLayout';
import ProductComponent from '../components/ProductComponent';

function Product() {
  return (
    <div className="bg-slate-100">
      <RootLayout>
        <ProductComponent />
      </RootLayout>
    </div>
  );
}

export default Product;
