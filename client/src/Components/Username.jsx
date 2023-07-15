import React from 'react'
import user from "../Assets/Images/user.jpg";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { usernameValidate } from "../Helper/Validate";

export const Username = () => {

  const formik = useFormik({
      initialValues: {
        username: "",
      },
      validate: usernameValidate,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: async values => {
        console.log(values)
      }
  })

  return (
    <>
    <div className='bg-hero-pattern bg-center bg-cover min-h-[100vh] w-full main-bg flex items-center justify-center'>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='bg-white rounded-md p-4 shadow-2xl max-w-[350px] w-full flex flex-col justify-center'>

        <h2 className='text-2xl font-bold text-center'>Hello Again</h2>
        <p className='text-center max-w-[80%] mx-auto mt-1 text-gray-500 mb-2'>Login now with your username</p>
        <form onSubmit={formik.handleSubmit} className='w-[90%] mx-auto'>

          <div className='flex items-center justify-center w-28 h-28 shadow-xl rounded-full mx-auto my-2'>
            <img src={user} alt="user" className='w-full h-full rounded-full object-contain'/>
          </div>

          <div className='w-full relative'>
            <input 
            {...formik.getFieldProps('username')}
            type="text" 
            placeholder='Username' 
            autoComplete='off'
            className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />
          </div>

          <div className='w-full'>
            <button type='submit' className='bg-purple-700 w-full py-2.5 my-3 text-xl rounded-md text-white'>Let's Go</button>
          </div>

          <div className='flex items-center gap-1 my-2'>
            <p className='text-sm'>Don't have an account? </p>
            <Link to="/register" className='text-purple-600 text-sm'>Regsiter now</Link>
          </div>

        </form>

      </div>

    </div>
    </>
  )
}
