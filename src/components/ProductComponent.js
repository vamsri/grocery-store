/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';

const ProductPage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, price, description, stock } = e.target.elements;

        // Extract the name, price, description, and stock from the event
        const productName = name.value;
        const productPrice = parseFloat(price.value);
        const productDescription = description.value;
        const productStock = parseInt(stock.value);

        // Perform submission logic here
        console.log('Form submitted!');
        console.log('Name:', productName);
        console.log('Price:', productPrice);
        console.log('Description:', productDescription);
        console.log('Category:', category);
        console.log('Stock:', productStock);

        try {
            const response = await axios.post('http://localhost:4001/products', {
                name: productName,
                price: productPrice,
                description: productDescription,
                category: category,
                stock: productStock
            });
            console.log('POST request successful:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        
        <div className="container mx-auto p-20">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block font-medium mb-1">Price</label>
                    <input
                        type="number"
                        id="price"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block font-medium mb-1">Description</label>
                    <textarea
                        id="description"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block font-medium mb-1">Category</label>
                    <select
                        id="category"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Books">Books</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="stock" className="block font-medium mb-1">Stock</label>
                    <input
                        type="number"
                        id="stock"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProductPage;
