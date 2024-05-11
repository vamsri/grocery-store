/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import { useNavigate } from 'react-router-dom';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid

const ProductPage = () => {
    const navigate = useNavigate();  // Replace useHistory with useNavigate

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [products,setProducts] = useState([]);
    const [stock, setStock] = useState('');

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState();

    const handleCategory = (e) => {
        const selectedCategory = categoryList.filter(data => data.name === e.target.value);
        setCategory(selectedCategory[0]);
    };

    useEffect(() => {
        const deleteRow = (params) => {
            const idToDelete = params.data.id;
            setCategoryList(categoryList.filter((row) => row.id !== idToDelete));
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
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-ID': '661a6b052ce9f34f30fb9d1a',
            'Content-Type': 'application/json'
        };

        axios
            .get('http://localhost:4001/api/categories', { headers })
            .then((response) => {
                console.log('data->', response.data);
                if (response.data) {
                    console.log('categories->', response.data);
                    setCategoryList(response.data);
                }
            })
            .catch((err) => {
                console.log('err->', err);
            });
    };

    const getProducts = () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-ID': '661a6b052ce9f34f30fb9d1a',
            'Content-Type': 'application/json'
        };

        axios
            .get('http://localhost:4001/api/products', { headers })
            .then((response) => {
                console.log('data->', response.data);
                if (response.data) {
                    console.log('products->', response.data);
                    setProducts(response.data);
                }
            })
            .catch((err) => {
                console.log('err->', err);
            });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, price, description, stock } = e.target.elements;
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-ID': '661a6b052ce9f34f30fb9d1a'
        };

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
        console.log('Category:', category._id);
        console.log('inventoryCount:', productStock);

        try {
            const response = await axios.post('http://localhost:4001/api/products', {
                name: productName,
                price: productPrice,
                description: productDescription,
                categories: category._id,
                inventoryCount: productStock
            }, {headers});
            console.log('POST request successful:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container mx-auto p-10 h-screen overflow-scroll">            
            <div className="w-96 h-128 bg-white border-2">  
                <h1 className="text-sm bg-red-400 text-white uppercase w-full mx-auto p-2">Products</h1> 
                <form onSubmit={handleSubmit} className='p-2'>
                    <div className="mb-4 flex justify-end items-center">
                        <label htmlFor="name" className="block font-medium mb-1 w-1/4">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="border border-gray-300 rounded px-3 py-2 w-3/4"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-4 flex justify-end items-center">
                        <label htmlFor="price" className="block font-medium mb-1 w-1/4">Price:</label>
                        <input
                            type="number"
                            id="price"
                            className="border border-gray-300 rounded px-3 py-2 w-3/4"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex justify-end items-center">
                        <label htmlFor="description" className="block font-medium mb-1 w-1/4">Description:</label>
                        <textarea
                            id="description"
                            className="border border-gray-300 rounded px-3 py-2 w-3/4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-4 flex justify-end items-center">
                        <label htmlFor="category" className="block font-medium mb-1 w-1/4">Category:</label>
                        <select
                            id="category"
                            className="border border-gray-300 rounded px-3 py-2 w-3/4"
                            value={category.name}
                            onChange={(e) => handleCategory(e)}
                        >
                            {categoryList.map((data) => {
                                return (<>
                                    <option value={data.name}>{data.name}</option>
                                </>)
                            })}
                        </select>
                    </div>
                    <div className="mb-4 flex justify-end items-center">
                        <label htmlFor="stock" className="block font-medium mb-1 w-1/4">Stock:</label>
                        <input
                            type="number"
                            id="stock"
                            className="border border-gray-300 rounded px-3 py-2 w-3/4"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
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
                {categoryList.length > 0 && (
                    <div
                        className="ag-theme-quartz" // applying the grid theme
                        style={{ height: '100%' }} // the grid will fill the size of the parent container
                    >
                        <AgGridReact
                            rowData={products}
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
