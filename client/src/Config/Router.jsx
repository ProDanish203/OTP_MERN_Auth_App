import React from 'react'
import { Routes, Route } from "react-router-dom";
import { PageNotfound, Password, Profile, Recovery, Register, ResetPassword, Username } from "../Components";

export const Router = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Username/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/password' element={<Password/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/recovery' element={<Recovery/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
        <Route path='*' element={<PageNotfound/>}/>

    </Routes>
    </>
  )
}
