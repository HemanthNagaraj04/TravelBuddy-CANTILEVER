import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

const ProtectedRoutes = ({children,isLoggedIn}) => {
    const isAuthenticated=isLoggedIn;
    const navigate=useNavigate();
    useEffect(()=>{
        if(!isAuthenticated) navigate('/SignIn')
    },[])
    return (
    children
  )
}

export default ProtectedRoutes
