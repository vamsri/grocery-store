/* eslint-disable */
import React from 'react';
import { useForm } from 'react-hook-form';

export const Error = (msg) => (<div className='text-red-400 text-right'>{msg}</div>);

const Address = () =>{
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm();

  const onSubmit = (data) => {
    console.log('data->', data);
  };

  return (
    <div className="bg-white flex flex-col border-2 border-slate-200 mb-2">
      <header className="h-8 bg-cyan-200">Address</header>
      <form onSubmit={handleSubmit(onSubmit)} className={'p-2 '}>
        <div className="flex m-2">
          <label className={'w-1/3'}>Street:</label>
          <input
            {...register('street', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Street.."
            autoComplete="off"
          />
        </div>
        <div className="flex m-2">
          <label className={'w-1/3'}>Suite:</label>
          <input
            {...register('suite', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Suite.."
            autoComplete="off"
          />
        </div>
        <div className="flex m-2">
          <label className={'w-1/3'}>City:</label>
          <input
            {...register('city', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter City.."
            autoComplete="off"
          />
        </div>
        <div className="flex m-2">
          <label className={'w-1/3'}>State:</label>
          <input
            {...register('state', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter State.."
            autoComplete="off"
          />
        </div>
        <div className="flex m-2">
          <label className={'w-1/3'}>Postal Code:</label>
          <input
            {...register('postal_code', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Postal Code.."
            autoComplete="off"
          />
        </div>
        <div className="flex m-2">
          <label className={'w-1/3'}>Country:</label>
          <input
            {...register('country', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Country.."
            autoComplete="off"
          />
        </div>
        <div className={"flex justify-end"}>
            <button className={'w-1/4 m-2 p-1 bg-red-400 text-white'}>
            Submit
            </button>
        </div>
      </form>
    </div>
  );
}

export default Address;
