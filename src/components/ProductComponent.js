/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './../features/products/productSlice';
import { fetchCategory } from './../features/categories/categorySlice';
import { useForm } from 'react-hook-form';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid

export const Error = (msg) => (<div className='text-red-400 text-right'>{msg}</div>);

const ProductPage = () => {
    const navigate = useNavigate();  // Replace useHistory with useNavigate    
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors, touchedFields, isValid}} = useForm()

    // const productLoading = useSelector(state => state.products.loading);
    const productEntity = useSelector(state => state.products.entities);
    // const categoryLoading = useSelector(state => state.categories.loading);
    const categoryEntity = useSelector(state => state.categories.entities);
    const [category, setCategory] = useState({});

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState();

    const handleCategory = (e) => {
        const selectedCategory = categoryEntity.filter(data => data.name === e.target.value);
        setCategory(selectedCategory[0]);
    };

    useEffect(() => {
        const deleteRow = (params) => {
            const idToDelete = params.data.id;
            // setCategoryList(categoryList.filter((row) => row.id !== idToDelete));
        };

        setColDefs([
            { field: '_id', flex: 1 },
            { field: 'name', flex: 1 },
            { field: 'description', flex: 1 },
            {
                headerName: 'Actions',
                flex: 1,
                cellRenderer: (params) => (
                    <button
                        className="bg-red-400 w-1/2 text-white"
                        onClick={() => deleteRow(params)}
                    >
                        Delete
                    </button>
                ),
                // Optional: Adjust the width, suppress sorting/filtering for this column
                width: 200,
                sortable: false,
                filter: false,
            },

        ]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    const onRowClicked = (event) => {
        console.log('event->', event)
        navigate(`/product/${event.data._id}`);
    };

    const getCategories = () => {
        dispatch(fetchCategory());
    };

    const getProducts = () => {
        dispatch(fetchProducts());
    };
    const onSubmit = async (data) => {
        console.log('errors->', errors, isValid);
        const { username, price, description, stock } = data;
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-ID': '661a6b052ce9f34f30fb9d1a'
        };

        // Extract the name, price, description, and stock from the event
        const productName = username;
        const productPrice = parseFloat(price);
        const productDescription = description;
        const productStock = parseInt(stock);

        try {
            const response = await axios.post('http://localhost:4001/api/products', {
                name: productName,
                price: productPrice,
                description: productDescription,
                categories: category._id,
                inventoryCount: productStock
            }, { headers });
            console.log('POST request successful:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container mx-auto p-10 h-screen overflow-scroll">
            <div className="w-128 h-128 bg-white border-2">
                <h1 className="text-sm bg-red-400 text-white uppercase w-full mx-auto p-2">Products</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='p-2'>
                    <div className="mb-2 flex justify-end items-center">
                        <label htmlFor="name" className="block font-medium mb-1 w-1/4">Name:</label>
                        <input
                            className={`${errors.username && touchedFields.username ? 'border-2 border-red-300' : 'border-2 border-gray-300'} rounded px-3 py-2 w-3/4`}
                            autoComplete="off"
                            placeholder="Enter username..."
                            {...register('username', {required: true})}
                        />
                    </div>    
                    {errors.username && touchedFields.username && Error('Username is required')}                
                    <div className="mb-2 flex justify-end items-center">
                        <label htmlFor="price" className="block font-medium mb-1 w-1/4">Price:</label>
                        <input
                            type="number"
                            id="price"
                            className={`${errors.price && touchedFields.price ? 'border-2 border-red-300' : 'border-2 border-gray-300'} rounded px-3 py-2 w-3/4`}
                            placeholder="Enter Price..."
                            {...register('price', {required: true})}
                        />
                        
                    </div>
                    {errors.price && touchedFields.price && Error('Price is required')}
                    <div className="mb-2 flex justify-end items-center">
                        <label htmlFor="description" className="block font-medium mb-1 w-1/4">Description:</label>
                        <textarea
                            id="description"
                            className={`${errors.description && touchedFields.description ? 'border-2 border-red-300' : 'border-2 border-gray-300'} rounded px-3 py-2 w-3/4`}
                            placeholder="Enter Description..."
                            {...register('description', {required: true})}
                        ></textarea>
                        
                    </div>
                    {errors.description && touchedFields.description && Error('Description is required')}
                    <div className="mb-2 flex justify-end items-center">
                        <label htmlFor="category" className="block font-medium mb-1 w-1/4">Category:</label>
                        <select
                            id="category"
                            className={`${errors.name && touchedFields.name ? 'border-2 border-red-300' : 'border-2 border-gray-300'} rounded px-3 py-2 w-3/4`}
                            value={category.name}
                            placeholder="Enter category..."
                        >
                            {categoryEntity.map((data) => {
                                return (<>
                                    <option value={data.name}>{data.name}</option>
                                </>)
                            })}
                        </select>
                    </div>
                    {errors.name && touchedFields.name && Error('Name is required')}
                    <div className="mb-2 flex justify-end items-center">
                        <label htmlFor="stock" className="block font-medium mb-1 w-1/4">Stock:</label>
                        <input
                            type="number"
                            id="stock"
                            className={`${errors.stock && touchedFields.stock ? 'border-2 border-red-300' : 'border-2 border-gray-300'} rounded px-3 py-2 w-3/4`}
                            placeholder="Enter Stock..."
                            {...register('stock', {required: true})}
                        />
                    </div>
                    {errors.stock && touchedFields.stock && Error('Stock is required')}
                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            className="bg-red-400 hover:bg-red-600 text-white font-medium py-1 px-4 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full h-3/5 mt-10">
                {productEntity?.length > 0 && (
                    <div
                        className="ag-theme-quartz" // applying the grid theme
                        style={{ height: '100%' }} // the grid will fill the size of the parent container
                    >
                        <AgGridReact
                            rowData={productEntity}
                            columnDefs={colDefs}
                            onRowClicked={onRowClicked}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
