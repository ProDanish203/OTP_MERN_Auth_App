import React, { useState } from 'react'
import user from "../Assets/Images/user.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { convertImage } from "../Helper/Convert";
import axios from "axios";
import { Loader } from './Loader';

export const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [profile, setFile] = useState()

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const uploadFile = async (e) => {
    const base64 = await convertImage(e.target.files[0])
    setFile(base64)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if(!profile) return toast.error("Please Provide Profile Picture");
    if(username.includes(" ")) return toast.error("Invalid Username");
    if(password.includes(" ")) return toast.error("Invalid Password! Password should not contain any white spaces");
    if(password.length < 6) return toast.error("Password must be greater than 6 characters");
    if(email.includes(" ")) return toast.error("Invalid Email");
    if(!/^[A-Z0-9._%+-@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return toast.error("Invalid Email Address");

    const baseUrl = 'http://localhost:5000'
    try{
      setLoading(true)
      const {data} = await axios.post(`${baseUrl}/api/v1/auth/register`, {
        username,
        email,
        password,
        profile: ''
      });

      if(data.success){
        const res = await axios.post(`${baseUrl}/api/v1/auth/registerMail`, { username, userEmail: email, text: "Account registeration successfull, we're pleased to have you with us." })
        toast.success("Please check your email for account confirmation");
        toast.success("Account Registered Successfully.")
        navigate("/login");
      }
      
      setLoading(false);

    }catch(error){
      toast.error(error.response.data.message);
      setLoading(false);
    }

  }

  return (
    <>
    <div className='bg-hero-pattern bg-center bg-cover min-h-[100vh] w-full main-bg flex items-center justify-center'>

    <div className='bg-white rounded-md p-4 shadow-2xl max-w-[350px] w-full flex flex-col justify-center'>

      <h2 className='text-2xl font-bold text-center'>Register</h2>
      <p className='text-center max-w-[80%] mx-auto mt-1 text-gray-500 mb-2'>Create your account</p>
      <form 
      onSubmit={handleSubmit} 
      className='w-[90%] mx-auto'
      >

        <div className='flex items-center justify-center mx-auto w-24 h-24 shadow-xl rounded-full gap-2 my-2'>
          <label htmlFor="profile">
            <img src={profile || user} alt="user" className='w-24 h-24 select-none rounded-full object-cover'/>
          </label>
          <input type="file" id='profile' className='hidden' onChange={uploadFile} />
        </div>

        <div className='w-full mt-3 relative'>
          <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder='Username' 
          autoComplete='off'
          className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />

          <input 
          type="text" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email Address' 
          autoComplete='off'
          required
          className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />
          
          <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password' 
          required
          autoComplete='off'
          className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />
          

        </div>

        <div className='w-full'>
          <button type='submit' className='bg-purple-700 w-full py-2.5 my-3 text-xl rounded-md text-white'>{loading ? <Loader/> : "Regsiter"}</button>
        </div>

        <div className='flex items-center gap-1 my-2'>
          <p className='text-sm'>Already have an account? </p>
          <Link to="/login" className='text-purple-600 text-sm'>Login now</Link>
        </div>

      </form>

    </div>

    </div>
    </>
  )
}
