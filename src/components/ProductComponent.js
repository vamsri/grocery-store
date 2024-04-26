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
                        className="bg-blue-400 w-1/2 text-white"
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
                        autocomplete="off"
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
            <div className="w-full h-3/5 mt-10">
                {categoryList.length > 0 && (
                    <div
                        className="ag-theme-quartz" // applying the grid theme
                        style={{ height: '100%' }} // the grid will fill the size of the parent container
                    >
                        <AgGridReact
                            rowData={categoryList}
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
