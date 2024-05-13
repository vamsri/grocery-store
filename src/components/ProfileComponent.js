/* eslint-disable */
import React from 'react';
import BrandInfo from './tenant/brandInfo';
import ContactDetails from './tenant/contactDetails';
import Address from './tenant/address';
// import { Plus } from '@heroicons/react/24/solid'

const AdvancedFileUpload = () => {

        return (
                <div className='w-full h-screen overflow-y-auto m-2 p-2'>
                        <div className='grid grid-cols-2 gap-2'>
                                <Address />
                                <ContactDetails />
                                <BrandInfo />
                        </div>
                </div>);
};

export default AdvancedFileUpload;
