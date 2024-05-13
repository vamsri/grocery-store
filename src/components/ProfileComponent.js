/* eslint-disable */
import React from 'react';
import BrandInfo from './tenant/brandInfo';
import ContactDetails from './tenant/contactDetails';
import Address from './tenant/address';
// import { Plus } from '@heroicons/react/24/solid'

const AdvancedFileUpload = () => {

        return (
                <div className='w-full h-screen overflow-y-auto p-2'>
                        <div className='grid grid-cols-2 gap-2'>
                                <div className='grid grid-cols-1 '>
                                        <div className='w-full'>
                                                <Address />
                                        </div>
                                        <div className='w-full'>
                                                <ContactDetails />
                                        </div>
                                        <div className='w-full'>
                                                <BrandInfo />
                                        </div>
                                        
                                </div>
                                <div className='grid grid-cols-1 content-start '>
                                        <div className='w-full'>
                                                <ContactDetails />
                                        </div>
                                        <div className='w-full'>
                                                <Address />
                                        </div>
                                </div>
                        </div>
                </div>);
};

export default AdvancedFileUpload;
