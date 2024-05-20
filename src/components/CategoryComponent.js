/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import { useNavigate } from 'react-router-dom';
import DotLoader from "react-spinners/DotLoader";
import { TrashIcon } from '@heroicons/react/20/solid';
import { fetchCategory } from './../features/categories/categorySlice';
import { useForm} from "react-hook-form";

import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

export const Error = (msg) => (<div className='text-red-400 text-left'>{msg}</div>);

const CategoryForm = ({onSubmit}) => {
  // Replace useHistory with useNavigate
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const [colDefs, setColDefs] = useState();
  const categories = useSelector(state => state.categories.entities);
  const loading = useSelector(state => state.categories.loading);
  const {register, handleSubmit, formState: {errors, touchedFields}} = useForm();

  const options = {
    duration: 500,
    smooth: true,
  };

  useEffect(() => {
    const deleteRow = (params) => {
      const idToDelete = params.data.id;
      // setCategories(categories.filter((row) => row.id !== idToDelete));
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
    dispatch(fetchCategory());
  };

  useEffect(() => {
    getCategories();
  }, []);

  const onRowClicked = (event) => {
    console.log('event->', event)
    navigate(`/category/${event.data._id}`); 
  };

  return (
    <div className="p-4 w-full h-screen flex flex-col">  
      <div className="w-128 h-128 bg-white border-2 mb-2">    
        <h1 className="bg-cyan-200 w-full mx-auto p-2">Categories</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-2/5 space-y-4 p-2">      
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              <span className="text-red-500">{'*'}</span>Category:
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {required: true})}
              className={`${errors.name && touchedFields.name ? 'border-2 border-red-300' : 'border-2 border-gray-300'} rounded px-3 py-2 w-full`}
              autoComplete="off"
              placeholder='Enter Category name...'
            />
          </div>
          {errors.name && touchedFields.name && Error("Name is required...")}
          <div>
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              <span className="text-red-500">{'*'}</span>Description:
            </label>
            <textarea
              id="description"
              {...register("description", {required: true})}
              placeholder='Enter Category Description...'
              className={`${errors.description && touchedFields.description ? 'border-2 border-red-300' : 'border-2 border-gray-300'} rounded px-3 py-2 w-full`}
            ></textarea>
          </div>
          {errors.description && touchedFields.description && Error("Category Description is required...")}
          <div className={"flex justify-end"}>
            <button className={'w-1/4 m-2 p-1 bg-cyan-400 rounded tracking-wider text-white'}>
            Submit
            </button>
        </div>
        </form>
      </div>
      <ToastContainer />
      
      {!loading && <div className="w-full h-3/5 ">
        {categories?.length > 0 && (
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
      </div>}
      <DotLoader
          color={'#36d7b7'}
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>
  );
};

export default CategoryForm;
