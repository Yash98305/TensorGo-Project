import React from 'react'
import Body from "../Layout/Body.jsx";
import OrganizationPage from "../components/main pages/OrganizationPage.jsx"
import Animate from "../Animate.jsx";
import { useAuth } from "../context/auth.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Organization = () => {
  const navigate = useNavigate();
    const {auth} = useAuth();
    
    useEffect(() => {
      if (!auth?.token) {
        navigate('/login');
      }
    }, [navigate, auth?.token]);
      return (
        <><Animate app={<Body obj={<OrganizationPage/>}/>}/></>
  )
}

export default Organization