/* eslint-disable */
import React from 'react';
import { useForm } from 'react-hook-form';

export const Error = (msg) => (<div className='text-red-400 text-right'>{msg}</div>);

const ContactDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Contact Details->', data);
  };

  return (
    <div className="bg-white  flex flex-col border-2 border-slate-200 mb-2">
      <header className="h-8 bg-cyan-200">Contact Details</header>
      <form onSubmit={handleSubmit(onSubmit)} className={'p-2'}>
        <div className="flex m-2">
          <label className={'w-1/3'}>Email:</label>
          <input
            {...register('email', { required: true , pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Entered value does not match email format",
              }})}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Email.."
            autoComplete="off"
          />
        </div>
        {errors.email && touchedFields.email && Error(errors.email.message)}
        <div className="flex m-2">
          <label className={'w-1/3'}>Phone Number:</label>
          <input
            {...register('phone_number', { required: true, pattern: {
                value: /^\+\d{2}-\d{3}-\d{3}-\d{4}/,
                message: "Please Enter Correct Format.."
            } })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Phone Number.."
            autoComplete="off"
          />
        </div>      
        {errors.phone_number && touchedFields.phone_number && Error(errors.phone_number.message)}
        <div className={"flex justify-end"}>
            <button className={'w-1/4 m-2 p-1 bg-cyan-400 rounded tracking-wider text-white'}>
            Submit
            </button>
        </div>
      </form>
    </div>
  );
}

export default ContactDetails;
