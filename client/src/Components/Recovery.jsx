import React from 'react'
import { Toaster } from "react-hot-toast";

export const Recovery = () => {
  return (
    <>
    <div className='bg-hero-pattern bg-center bg-cover min-h-[100vh] px-2 w-full main-bg flex items-center justify-center'>

    <Toaster position='top-center' reverseOrder={false}></Toaster>

    <div className='bg-white rounded-md p-4 shadow-2xl max-w-[390px] w-full flex flex-col justify-center'>

      <h2 className='text-2xl font-bold text-center'>Recover Password</h2>
      <p className='text-center max-w-[80%] mx-auto mb-2 mt-1'>Enter OTP to recover password</p>
      <form className='w-[90%] mx-auto'>

        <div className='mt-5 relative'>
          <span className='text-sm text-gray-500'>Enter 6 digit OTP sent to your email address </span>
          <input 
          type="text" 
          placeholder='OTP' 
          autoComplete='off'
          className='shadow-md px-2 py-2.5 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />
        </div>

        <div>
          <button type='submit' className='bg-purple-700 w-full py-2.5 my-3 text-xl rounded-md text-white'>Login</button>
        </div>

        <div className='flex items-center gap-1 my-2'>
          <p className='text-sm'>didn't recieved OTP yet?</p>
          <button type='button' className='text-purple-600 text-sm'>Resend OTP</button>
        </div>

      </form>

    </div>

    </div> 
    </>
  )
}
