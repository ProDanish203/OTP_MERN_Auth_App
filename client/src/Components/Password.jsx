import React, { useState } from 'react'
import user from "../Assets/Images/user.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import axios from "axios";

export const Password = () => {

  const { username } = useSelector(state => state.auth)
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!password) return toast.error("Password is required");

    const baseUrl = "http://localhost:5000"
    try{
      const {data} = axios.post(`${baseUrl}/api/v1/auth/login`, {
        username,
        password
      })
      
      console.log(data);
      
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
    <div className='bg-hero-pattern bg-center bg-cover min-h-[100vh] w-full main-bg flex items-center justify-center'>

    <div className='bg-white rounded-md p-4 shadow-2xl max-w-[350px] w-full flex flex-col justify-center'>

      <h2 className='text-2xl font-bold text-center'>Continue {username}</h2>
      <p className='text-center max-w-[80%] mx-auto mt-1 text-gray-500 mb-2'>Enter your password to login</p>
      <form onSubmit={handleLogin} className='w-[90%] mx-auto'>

        <div className='flex items-center justify-center w-28 h-28 shadow-xl rounded-full mx-auto my-2'>
          <img src={user} alt="user" className='w-full h-full rounded-full object-contain'/>
        </div>

        <div className='w-full relative'>
          <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password' 
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
