import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../Store/Reducers/AuthReducer";
import axios from "axios";
import { toast } from 'react-hot-toast';

export const PrivateRoute = ({ children }) => {

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const baseUrl = "http://localhost:5000"
    const getUser = async () => {
        try{
            const {data} = await axios.post(`${baseUrl}/api/v1/auth/getAuthUser`, {
                token: localStorage.getItem('token') 
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            // console.log(data)
            dispatch(setUser(data.user))
        }catch(error){
            toast.error("Authentication Error");
            <Navigate to="/login"/>
        }
    }

    useEffect(() => {
        if(!user){
            getUser();
        }
    }, [])
  
    if(localStorage.getItem("token")){
        return children;
    }else{
        return <Navigate to="/login"/>
    }

}
