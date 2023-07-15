import React from 'react'
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { resetPasswordValidate } from "../Helper/Validate";

export const ResetPassword = () => {

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validate: resetPasswordValidate,
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

      <h2 className='text-2xl font-bold text-center'>Reset Password </h2>
      <p className='text-center max-w-[80%] mx-auto mt-1 text-gray-500 mb-2'>Change your password</p>
      <form onSubmit={formik.handleSubmit} className='w-[90%] mx-auto'>

        <div className='w-full relative mt-3'>
          <input 
          {...formik.getFieldProps('password')}
          type="password" 
          placeholder='Password' 
          autoComplete='off'
          className='shadow-md px-2 py-2.5 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />

          <input 
          {...formik.getFieldProps('confirmPassword')}
          type="password" 
          placeholder='Confirm Password' 
          autoComplete='off'
          className='shadow-md px-2 py-2.5 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />
          
        </div>
        

        <div className='w-full'>
          <button type='submit' className='bg-purple-700 w-full py-2.5 my-3 text-xl rounded-md text-white'>Login</button>
        </div>

        <div className='flex items-center gap-1 my-2'>
          <p className='text-sm'>Forgot Password?</p>
          <Link to="/recovery" className='text-purple-600 text-sm'>Reset Password</Link>
        </div>

      </form>

    </div>

    </div> 
    </>
  )
}
