import React, { useState } from 'react'
import user from "../Assets/Images/user.jpg";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { validateProfile } from "../Helper/Validate";
import { convertImage } from "../Helper/Convert";

export const Profile = () => {

  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: ""
    },
    validate: validateProfile,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      if(!file){
        return toast.error("Please upload profile Image")
      }
      values = await Object.assign(values, { profile: file || ''})
      console.log(values)
      
    }
  })

  const uploadFile = async (e) => {
    const base64 = await convertImage(e.target.files[0])
    setFile(base64)
  }

  return (
    <>
    <div className='bg-hero-pattern bg-center bg-cover min-h-[100vh] w-full main-bg flex items-center justify-center px-3'>

    <Toaster position='top-center' reverseOrder={false}></Toaster>

    <div className='bg-white rounded-md p-4 shadow-2xl max-w-[450px] w-full flex flex-col justify-center'>

      <h2 className='text-2xl font-bold text-center'>Profile</h2>
      <p className='text-center max-w-[80%] mx-auto mt-1 text-gray-500 mb-2'>You can now update your profile</p>
      <form onSubmit={formik.handleSubmit} className='sm:w-[90%] w-full mx-auto'>

        <div className='flex items-center justify-center mx-auto w-24 h-24 shadow-xl rounded-full gap-2 my-2'>
          <label htmlFor="profile">
            <img src={file || user} alt="user" className='w-24 h-24 select-none rounded-full object-cover'/>
          </label>
          <input type="file" id='profile' className='hidden' onChange={uploadFile} />
        </div>

        <div className='w-full mt-3 relative'>

          <div className='flex w-full gap-3 items-center'>
            <input 
            {...formik.getFieldProps('firstname')}
            type="text" 
            placeholder='First Name' 
            autoComplete='off'
            className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />

            <input 
            {...formik.getFieldProps('lastName')}
            type="text" 
            placeholder='Last Name' 
            autoComplete='off'
            className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />

          </div>

          <div className='flex w-full gap-3 items-center'>
            <input 
            {...formik.getFieldProps('email')}
            type="email" 
            placeholder='Email Address' 
            autoComplete='off'
            className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />

            <input 
            {...formik.getFieldProps('mobile')}
            type="number" 
            placeholder='Mobile' 
            autoComplete='off'
            minLength={7}
            maxLength={11}
            className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />
          </div>
          
          <input 
          {...formik.getFieldProps('address')}
          type="text" 
          placeholder='Address' 
          autoComplete='off'
          className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />
          

        </div>

        <div className='w-full mt-2'>
          <button type='submit' className='bg-purple-700 w-full py-2.5 my-3 text-xl rounded-md text-white'>Update</button>
        </div>

        <div className='flex items-center gap-1 my-2'>
          <p className='text-md'>come back later? </p>
          <Link to="/login" className='text-purple-600 text-md font-semibold'>Logout</Link>
        </div>

      </form>

    </div>

    </div>
    </>
  )
}
