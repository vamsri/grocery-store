/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4001/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid gap-3 m-4 p-2 w-screen h-screen overflow-scroll">
      {products.map((product) => (
        <div className="bg-slate-100  h-full " key={product.id}>
          <div className="grid grid-cols-3 h-full">
            <div className="h-full font-sans uppercase italic p-2 font-semibold">
              <img src="https://res.cloudinary.com/prod/image/upload/me/rotate-food-2.png" />
            </div>
            <div className=" h-full col-span-2 p-4">
              <div>
                <span className="text-lg font-bold font-serif">
                  {product.name}
                </span>
              </div>
              <div className="max-[500]">
                <span className="font-bold">Description:</span>
                <span className="font-serif tracking-wide">
                  {product.description}
                </span>
              </div>
              <div className="text-gray-700">
                <span className="font-bold">Price:</span>
                <span className="text-lg font-serif">${product.price}</span>
              </div>
              <div className="text-gray-700">
                <span className="font-bold">Category:</span>
                <span className="text-lg font-serif">
                  {product.category.name}
                </span>
              </div>
              <div className="text-gray-700">
                <span className="font-bold">Stock:</span>
                <span className="text-lg font-serif">{product.stock}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
