import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { UserContext } from '../../context/UserContext';

const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  const isAuthenticated = isLoggedIn;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate('/SignIn')
  }, [])
  return (
    children
  )
}

export default ProtectedRoutes
