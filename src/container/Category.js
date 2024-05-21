/* eslint-disable */
import React from 'react';
import RootLayout from './RootLayout';
import CategoryComponent from '../components/CategoryComponent';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollProvider } from '../components/Scroll/ScrollProvider';
import { addCategory} from './../features/categories/categorySlice';

function Category() {
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // Extract name and description from event
    console.log('data->', data)
    const { name, description, parentCategoryId } = data;
    const nameValue = name;
    const descriptionValue = description;
    dispatch(addCategory({
      domain: 'www.narayana.store.com',
      name: nameValue,
      description: descriptionValue,
      parentCategoryId: parentCategoryId
    }));    
  };

  return (
    <div className="bg-slate-100">
      <RootLayout>
        <ScrollProvider>
          <CategoryComponent onSubmit={onSubmit}/>
        </ScrollProvider>
      </RootLayout>
    </div>
  );
}

export default Category;
