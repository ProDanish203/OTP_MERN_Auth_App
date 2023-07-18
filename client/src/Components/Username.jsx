import React, { useState } from 'react'
import user from "../Assets/Images/user.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../Store/Reducers/AuthReducer";
import axios from "axios";
import { Loader } from './Loader';

export const Username = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseUrl = "http://localhost:5000"

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!username) return toast.error("Username is required")
    if(username.includes(" ")) return toast.error("Invalid Username")
    if(!password) return toast.error("Password is required")
    if(password.includes(" ")) return toast.error("Invalid Password")

    try{
      setLoading(true)
      const { data } = await axios.post(`${baseUrl}/api/v1/auth/login`, {
        username,
        password
      })

      dispatch(setUser(data.user))
      localStorage.setItem('token', data.token);
      setLoading(false)
      toast.success(data.message)
      navigate("/profile")

    }catch(error){
      toast.error(error.response.data.message)
      setLoading(false)
    }

  }


  return (
    <>
    <div className='bg-hero-pattern bg-center bg-cover min-h-[100vh] w-full main-bg flex items-center justify-center'>

      <div className='bg-white rounded-md p-4 shadow-2xl max-w-[350px] w-full flex flex-col justify-center'>

        <h2 className='text-2xl font-bold text-center'>Hello Again</h2>
        <p className='text-center max-w-[80%] mx-auto mt-1 text-gray-500 mb-2'>Login now with your username</p>
        <form 
        onSubmit={handleLogin}
        className='w-[90%] mx-auto'
        >

          <div className='flex items-center justify-center w-28 h-28 shadow-xl rounded-full mx-auto my-2'>
            <img src={user} alt="user" className='w-full h-full rounded-full object-contain'/>
          </div>

          <div className='w-full relative'>
            <input 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text" 
            placeholder='Username' 
            autoComplete='off'
            className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />
          </div>

          <div className='w-full relative'>
            <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" 
            placeholder='Password' 
            autoComplete='off'
            className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />
          </div>

          <div className='w-full'>
            <button type='submit' className='bg-purple-700 w-full py-2.5 my-3 text-xl rounded-md text-white'>{loading ? <Loader dark={false}/> : "Login"}</button>
          </div>

          <div className='flex items-center gap-1 my-2'>
            <p className='text-sm'>Don't have an account? </p>
            <Link to="/register" className='text-purple-600 text-sm'>Regsiter now</Link>
          </div>
          <div className='flex items-center gap-1 my-2'>
            <Link to="/generateOTP" className='text-purple-600 text-sm'>Forgot Password?</Link>
          </div>

        </form>

      </div>

    </div>
    </>
  )
}