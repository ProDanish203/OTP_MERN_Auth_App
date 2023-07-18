import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { Loader } from "./Loader";
import axios from 'axios';

export const ResetPassword = () => {

  const [password, setPassword] = useState("")
  const [cPass, setCpass] = useState("")

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state.username;

  const handleReset = async (e) => {
    e.preventDefault();

    if(!password) return toast.error("Password is required")
    if(!username) return toast.error("Username is required")
    if(!cPass) return toast.error("Please Confirm password")
    if(password.length < 6) return toast.error("Password must be greater than 6 characters")
    if(password.includes(" ")) return toast.error("Invalid Password! Password should not contain any white spaces");
    if(password !== cPass) return toast.error("Passwords do not match")

    const baseUrl = 'http://localhost:5000'
    try{
      setLoading(true);
      const {data} = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`, {
        username,
        password
      })

      if(data.success){
        toast.success(data.message);
        navigate("/login");
      }

      setLoading(false);

    }catch(error){
      toast.error(error.response.data.message)
      setLoading(false);
      navigate("/generateOTP")
    }
  }

  return (
    <>
    <div className='bg-hero-pattern bg-center bg-cover min-h-[100vh] w-full main-bg flex items-center justify-center'>
      
    <div className='bg-white rounded-md p-4 shadow-2xl max-w-[350px] w-full flex flex-col justify-center'>

      <h2 className='text-2xl font-bold text-center'>Reset Password </h2>
      <p className='text-center max-w-[80%] mx-auto mt-1 text-gray-500 mb-2'>Change your password</p>
      <form onSubmit={handleReset} className='w-[90%] mx-auto'>

        <div className='w-full relative mt-3'>
          <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password' 
          autoComplete='off'
          className='shadow-md px-2 py-2.5 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />

          <input 
          type="password" 
          value={cPass}
          onChange={(e) => setCpass(e.target.value)}
          placeholder='Confirm Password' 
          autoComplete='off'
          className='shadow-md px-2 py-2.5 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />
          
        </div>
      
        <div className='w-full'>
          <button type='submit' className='bg-purple-700 w-full py-2.5 my-3 text-xl rounded-md text-white'>{loading ? <Loader/> : "Reset Password"}</button>
        </div>

        <div className='flex items-center gap-1 my-2'>
          <p className='text-sm'>Don't have an account</p>
          <Link to="/register" className='text-purple-600 text-sm'>Register Now</Link>
        </div>

      </form>

    </div>

    </div> 
    </>
  )
}
