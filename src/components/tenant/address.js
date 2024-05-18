/* eslint-disable */
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const Error = (msg) => (<div className='text-red-400 text-right'>{msg}</div>);

const Address = () =>{
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const {city, country, postal_code, state, street, suite} = data;
      const token = localStorage.getItem('token');
      const headers = {
        "Authorization": `Bearer ${token}`
      };

      const response = await axios.post(`${apiUrl}/tenants/664072b1d0ffaacc06b11b00`, {headers}, {city, country, postal_code, state, street, suite});
    } catch(error) {
      console.log('error->', error);
    }
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
        {errors.street && touchedFields.street && Error("Address is required..")}
        <div className="flex m-2">
          <label className={'w-1/3'}>Suite:</label>
          <input
            {...register('suite', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Suite.."
            autoComplete="off"
          />
        </div>
        {errors.suite && touchedFields.suite && Error("Suite is required..")}
        <div className="flex m-2">
          <label className={'w-1/3'}>City:</label>
          <input
            {...register('city', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter City.."
            autoComplete="off"
          />
        </div>
        {errors.city && touchedFields.city && Error("City is required..")}
        <div className="flex m-2">
          <label className={'w-1/3'}>State:</label>
          <input
            {...register('state', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter State.."
            autoComplete="off"
          />
        </div>
        {errors.state && touchedFields.state && Error("State is required..")}
        <div className="flex m-2">
          <label className={'w-1/3'}>Postal Code:</label>
          <input
            {...register('postal_code', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Postal Code.."
            autoComplete="off"
          />
        </div>
        {errors.postal_code && touchedFields.postal_code && Error("Postal Code is required..")}
        <div className="flex m-2">
          <label className={'w-1/3'}>Country:</label>
          <input
            {...register('country', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Country.."
            autoComplete={"off"}
          />
        </div>
        {errors.country && touchedFields.country && Error("Country is required..")}
        <div className={"flex justify-end"}>
            <button className={'w-1/4 m-2 p-1 bg-cyan-400 rounded tracking-wider text-white'}>
            Submit
            </button>
        </div>
      </form>
    </div>
  );
}

export default Address;
