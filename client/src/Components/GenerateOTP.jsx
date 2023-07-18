import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsername } from "../Store/Reducers/AuthReducer";
import axios from "axios";
import { Loader } from './Loader';

export const GenerateOTP = () => {

    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const baseUrl = "http://localhost:5000"
    const generate = async (e) => {
      e.preventDefault();

      if(!username) return toast.error("Username is required");
      try{
          setLoading(true);
          const {data: {rest: {email}, success}} = await axios.post(`${baseUrl}/api/v1/auth/verifyUser`, {
              username
          });


          if(success){
              const {data: {code, success}} = await axios.get(`${baseUrl}/api/v1/auth/genOTP`)
              if(success){
                  let text = `Your password recovery OTP is: ${code}. Verify the otp and recover your passsword`;
                  let subject = "Password Revovery OTP"
                  await axios.post(`${baseUrl}/api/v1/auth/registerMail`, {
                      username, 
                      userEmail: email,
                      text,
                      subject
                  })

                  setLoading(false)
                  toast.success("An OTP has been sent to your email.")
                  navigate("/recovery", { state: {username} })
              }else{
                  toast.error("Error occured while sending OTP. Please try again later.")
                  setLoading(false)
              }

            }
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message);
            setLoading(false);
        }

    }

  return (
    <>
    <div className='bg-hero-pattern bg-center bg-cover min-h-[100vh] px-2 w-full main-bg flex items-center justify-center'>

    <div className='bg-white rounded-md p-4 shadow-2xl max-w-[390px] w-full flex flex-col justify-center'>

      <h2 className='text-2xl font-bold text-center'>Generate OTP</h2>
      <p className='text-center max-w-[90%] mx-auto mb-2 mt-1'>Enter the username to generate OTP</p>
      <form onSubmit={generate} className='w-[90%] mx-auto'>

        <div className='mt-5 relative'>
          <span className='text-sm text-gray-500'>OTP will be send to your provided email address</span>
          <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username' 
          autoComplete='off'
          className='shadow-md px-2 py-2.5 my-2 border-2 text-sm w-full outline-none border-gray-400 rounded-md' />
        </div>

        <div>
          <button type='submit' className='bg-purple-700 w-full py-2.5 my-3 text-xl rounded-md text-white'>{loading ? <Loader/> : "Send OTP"}</button>
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
