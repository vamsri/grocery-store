/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState();

  useEffect(() => {
    const deleteRow = (params) => {
      const idToDelete = params.data.id;
      setCategories(categories.filter((row) => row.id !== idToDelete));
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

  const getCategories = () => {
    axios
      .get('http://localhost:4001/categories')
      .then((response) => {
        console.log('data->', response.data);
        setCategories(response.data);
      })
      .catch((err) => {
        console.log('err->', err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract name and description from event
    const { name, description } = e.target.elements;
    const nameValue = name.value;
    const descriptionValue = description.value;

    // Handle form submission logic here
    console.log('Form submitted:', nameValue, descriptionValue);

    // Make the POST request using Axios
    axios
      .post('http://localhost:4001/categories', {
        name: nameValue,
        description: descriptionValue,
      })
      .then((response) => {
        // Handle the response
        console.log('Response:', response.data);
        setCategories(response.data);
        getCategories();
      })
      .catch((error) => {
        // Handle the error
        console.error('Error:', error);
      });
  };

  return (
    <div className="p-4 w-full h-screen flex flex-col">
      <form onSubmit={handleSubmit} className="w-full h-2/5 space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="w-full h-3/5 ">
        {categories.length > 0 && (
          <div
            className="ag-theme-quartz" // applying the grid theme
            style={{ height: '100%' }} // the grid will fill the size of the parent container
          >
            <AgGridReact rowData={categories} columnDefs={colDefs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
