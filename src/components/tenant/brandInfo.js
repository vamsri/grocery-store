/* eslint-disable */
import React from 'react';
import { useForm } from 'react-hook-form';

export const Error = (msg) => (<div className='text-red-400 text-right'>{msg}</div>);

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
    <div className=" flex flex-col border-2 border-slate-200 bg-white mb-2">
      <header className="h-8 bg-cyan-200">BrandInfo</header>
      <form onSubmit={handleSubmit(onSubmit)} className={'p-2 '}>
        <div className="flex m-2">
          <label className={'w-1/3'}>Logo Url:</label>
          <input
            {...register('logo_url', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Logo URL.."
            autoComplete="off"
          />
        </div>
        {errors.logo_url && touchedFields.logo_url && Error("Entered value does not match URL format")}
        <div className="flex m-2">
          <label className={'w-1/3'}>Cover Image URL:</label>
          <input
            {...register('cover_image_url', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Cover Image URL.."
            autoComplete="off"
          />
        </div>
        {errors.cover_image_url && touchedFields.cover_image_url && Error("Entered value does not match Image URL format")}
        <div className="flex m-2">
          <label className={'w-1/3'}>Brand Color:</label>
          <input
            {...register('brand_color', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Brand Color.."
            autoComplete="off"
          />
        </div>
        {errors.brand_color && touchedFields.brand_color && Error("Enter Brand Color..")}
        <div className="flex m-2">
          <label className={'w-1/3'}>Tag Line:</label>
          <input
            {...register('tag_line', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Tag Line.."
            autoComplete="off"
          />
        </div>
        {errors.tag_line && touchedFields.tag_line && Error("Entered value does not match Tag Line format")}
        <div className="flex m-2">
          <label className={'w-1/3'}>Theme Settings:</label>
          <input
            {...register('theme_settings', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Theme Settings."
            autoComplete="off"
          />
        </div>
        {errors.theme_settings && touchedFields.theme_settings && Error("Entered value For Theme Settings")}
        <div className="flex m-2">
          <label className={'w-1/3'}>Brand Guidelines:</label>
          <input
            {...register('brand_guidelines', { required: true })}
            className={'w-2/3 p-1 border-2 border-grey-200'}
            placeholder="Enter Brand Guidelines.."
            autoComplete="off"
          />
        </div>
        {errors.brand_guidelines && touchedFields.brand_guidelines && Error("Entered value does not match brand guidelines format")}
        <div className={"flex justify-end"}>
            <button className={'w-1/4 m-2 p-1 bg-red-400 text-white'}>
            Submit
            </button>
        </div>
      </form>
    </div>
  );
}

export default BrandInfo;
