import React from 'react'
import Body from "../Layout/Body.jsx";
import PlanPage from "../components/main pages/PlanPage.jsx"
import Animate from "../Animate.jsx";
import { useAuth } from "../context/auth.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Plan = () => {
  const navigate = useNavigate();
    const {auth} = useAuth();
    
    useEffect(() => {
      if (!auth?.token) {
        navigate('/login');
      }
    }, [navigate, auth?.token]);
      return (
        <><Animate app={<Body obj={<PlanPage/>}/>}/></>
  )
}

export default Plan