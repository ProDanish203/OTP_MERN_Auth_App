import React, { useEffect, useState } from 'react'
import user1 from "../Assets/Images/user.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { convertImage } from "../Helper/Convert";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Store/Reducers/AuthReducer";
import { Loader } from "./Loader";
import axios from "axios";

export const Profile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.auth)

  const [file, setFile] = useState()
  const [updateData, setUpdateData] = useState({
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    mobile: user?.mobile || "",
    address: user?.address || "" 
  })
  
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUpdateData({...updateData, [name]: value})
  }

  const uploadFile = async (e) => {
    const base64 = await convertImage(e.target.files[0])
    setFile(base64)
  }

  const baseUrl = "http://localhost:5000"
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      setLoading(true);
      const token = await localStorage.getItem('token') 
      const {data} = await axios.put(`${baseUrl}/api/v1/auth/updateUser`, {
        email: updateData.email || user?.email || "",
        firstName: updateData.firstName || "",
        lastName: updateData.lastName || "",
        mobile: updateData.mobile || "",
        address: updateData.address || ""
      }, {
          headers: {
              "Authorization": `Bearer ${token}`
          }
      })

      toast.success("Profile Updated successfully");
      setLoading(false);
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false)
    }
  }

  const logout = () => {
    try{
      localStorage.removeItem('token')
      dispatch(setUser(null))
      toast.success("Logged out successfully");
      navigate("/login");
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
    <div className='bg-hero-pattern bg-center bg-cover min-h-[100vh] w-full main-bg flex items-center justify-center px-3'>

    <div className='bg-white rounded-md p-4 shadow-2xl max-w-[450px] w-full flex flex-col justify-center'>

      <h2 className='text-2xl font-bold text-center'>Hello {user?.username || "Profile"}</h2>
      <p className='text-center max-w-[80%] mx-auto mt-1 text-gray-500 mb-2'>You can now update your profile</p>
      <form onSubmit={handleSubmit} className='sm:w-[90%] w-full mx-auto'>

        <div className='flex items-center justify-center mx-auto w-24 h-24 shadow-xl rounded-full gap-2 my-2'>
          <label htmlFor="profile">
            <img src={file || user1} alt="user" className='w-24 h-24 select-none rounded-full object-cover'/>
          </label>
          <input type="file" id='profile' className='hidden' onChange={uploadFile} />
        </div>

        <div className='w-full mt-3 relative'>

          <div className='flex w-full gap-3 items-center'>
            <input 
            type="text" 
            placeholder='First Name' 
            name='firstName'
            value={updateData?.firstName}
            onChange={handleChange}
            autoComplete='off'
            className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />

            <input 
            type="text" 
            placeholder='Last Name' 
            name='lastName'
            value={updateData?.lastName}
            onChange={handleChange}
            autoComplete='off'
            className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />

          </div>

          <div className='flex w-full gap-3 items-center'>
            <input 
            type="email" 
            placeholder='Email Address' 
            name='email'
            value={updateData?.email}
            onChange={handleChange}
            autoComplete='off'
            className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />

            <input 
            type="number" 
            placeholder='Mobile' 
            name='mobile'
            value={updateData?.mobile}
            onChange={handleChange}
            autoComplete='off'
            minLength={7}
            maxLength={11}
            className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />
          </div>
          
          <input 
          type="text" 
          placeholder='Address' 
          name='address'
          value={updateData?.address}
          onChange={handleChange}
          autoComplete='off'
          className='shadow-md px-2 py-2 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />          

        </div>

        <div className='w-full mt-2'>
          <button type='submit' className='bg-purple-700 w-full py-2.5 my-3 text-xl rounded-md text-white'>{loading ? <Loader dark={false}/> : "Update"}</button>
        </div>

        <div className='flex items-center gap-1 my-2'>
          <p className='text-md'>come back later? </p>
          <button
          onClick={() => {logout()}}
          className='text-purple-600 text-md font-semibold'>Logout</button>
        </div>

      </form>

    </div>

    </div>
    </>
  )
}
