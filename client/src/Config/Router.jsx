import React from 'react'
import { Routes, Route } from "react-router-dom";
import { PageNotfound, Password, Profile, Recovery, Register, ResetPassword, Username, GenerateOTP } from "../Components";
import { PrivateRoute } from "./PrivateRoute";

export const Router = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Username/>}/>
        <Route path='/login' element={<Username/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/password' element={<Password/>}/>
        <Route path='/profile' element={
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>
        }/>
        <Route path='/generateOTP' element={<GenerateOTP/>}/>
        <Route path='/recovery' element={<Recovery/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
        <Route path='*' element={<PageNotfound/>}/>

    </Routes>
    </>
  )
}
