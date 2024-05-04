/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import { useNavigate } from 'react-router-dom';
import { ScrollContext } from './Scroll/ScrollProvider';
import DotLoader from "react-spinners/DotLoader";
import { TrashIcon } from '@heroicons/react/20/solid'
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

const CategoryForm = () => {
  const navigate = useNavigate();  // Replace useHistory with useNavigate
  const { scroll, handleScroll } = useContext(ScrollContext)
  const [tenantId, setTenantId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState();

  const options = {
    // your options here, for example:
    duration: 500,
    smooth: true,
  };

  useEffect(() => {
    const deleteRow = (params) => {
      const idToDelete = params.data.id;
      setCategories(categories.filter((row) => row.id !== idToDelete));
    };
    const uploadImage = (params) => {
      console.log('params->', params);
    }
    setColDefs([
      { field: '_id', flex: 1 },
      { field: 'name', flex: 1 },
      { field: 'description', flex: 1 },
      {
        headerName: 'Actions',
        flex: 1,
        cellRenderer: (params) => (
          <div
            onClick={() => deleteRow(params)}
          >
            <TrashIcon className="h-5 w-5 " aria-hidden="true"/>
          </div>
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
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'X-Tenant-ID': '661a6b052ce9f34f30fb9d1a',
      'Content-Type': 'application/json'
    };
    handleScroll(true);
    setTimeout(() => {
      axios
      .get('http://localhost:4001/api/categories', {headers})
      .then((response) => {
        console.log('data->', response.data);
        if (response.data) {
          setCategories(response.data);
        }
        handleScroll(false);
      })
      .catch((err) => {
        console.log('err->', err);
        handleScroll(false);
      });
    }, [1000]);   
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

    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Handle form submission logic here
    console.log('Form submitted:', nameValue, descriptionValue);

    // Make the POST request using Axios
    axios
      .post('http://localhost:4001/api/categories',  {
        domain: 'www.abc.store.com',
        name: nameValue,
        description: descriptionValue,
      }, {headers})
      .then((response) => {
        // Handle the response
        setTimeout(() => {
          toast.success("New Added Category!", {
            position: "top-center",
            theme: "dark"
          });
        }, [5000]);        
        setCategories(response.data);
        getCategories();
      })
      .catch((error) => {
        setTimeout(() => {
          toast.error(error.message, {
            position: "top-center",
            theme: "dark"
          });
        }, [5000]);        
        console.error('Error:', error);
      });
  };

  const onRowClicked = (event) => {
    console.log('event->', event)
    navigate(`/category/${event.data._id}`); 
  };

  return (
    <div className="p-4 w-full h-screen flex flex-col">      
      <form onSubmit={handleSubmit} className="w-full h-2/5 space-y-4">
      {/* <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Tenant ID
          </label>
          <input
            type="text"
            id="tenant"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            autocomplete="off"
          />
        </div> */}
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            autoComplete="off"
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
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
      <ToastContainer />
      
      <div className="w-full h-3/5 ">
        {categories.length > 0 && (
          <div
            className="ag-theme-quartz" // applying the grid theme
            style={{ height: '100%' }} // the grid will fill the size of the parent container
          >
            <AgGridReact 
              rowData={categories} 
              columnDefs={colDefs} 
              onRowClicked={onRowClicked}
            />
          </div>
        )}
        <DotLoader
          color={'#36d7b7'}
          loading={scroll}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default CategoryForm;
