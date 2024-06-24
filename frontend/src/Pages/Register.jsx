import React, { useEffect, useState } from "react";
import Body from "../Layout/Body.jsx";
import Animate from "../Animate.jsx";
import { useAuth } from "../context/auth.js";
import { useNavigate } from "react-router-dom";
import RegsterPage from "../components/main pages/RegisterPage.jsx"
const Regster = () => {
  const navigate = useNavigate();
const {auth} = useAuth();

  return (
    <>
    <Animate app={<Body obj={<RegsterPage/>}/>}/>

      
    </>
    
  );
};

export default Regster;
