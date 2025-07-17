import React from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from './api/axiosInstance'
import { useAuth } from './apps/auth/authContext'

function HomePage() {

    const test = async () => {
        const response = await axiosInstance.post('/auth/test')
        console.log(response)
    }
    
    const { logoutContext } = useAuth();
    const navigate = useNavigate();
    
      const handleLogout = () => {
        logoutContext();
        navigate('/login');
      };
      
  return (
    <div>
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={test}>Test</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
  }


export default HomePage