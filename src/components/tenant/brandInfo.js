/* eslint-disable */
import React from 'react';
import { useForm } from 'react-hook-form';

const BrandInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm();

  const onSubmit = (data) => {
    console.log('data->', data);
  };

  return (
    <div className=" flex flex-col border-2 border-slate-200 bg-white">
      <header className="h-8 bg-cyan-200">BrandInfo</header>
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

        <button className={'m-2 w-1/4 p-1 bg-red-400 text-white'}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default BrandInfo;
