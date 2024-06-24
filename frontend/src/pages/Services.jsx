import React from 'react'
import Body from "../Layout/Body.jsx";
import ServicePage from "../components/main pages/ServicePage.jsx"
import Animate from "../Animate.jsx";
import { useAuth } from "../context/auth.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
const Services = () => {
    const navigate = useNavigate();
    const {auth} = useAuth();
    
    useEffect(() => {
      if (!auth?.token) {
        navigate('/login');
      }
    }, [navigate, auth?.token]);
      return (
        <><Animate app={<Body obj={<ServicePage/>}/>}/></>
  )
}

export default Services;