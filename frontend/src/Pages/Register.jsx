import React from "react";
import Body from "../Layout/Body.jsx";
import Animate from "../Animate.jsx";
import RegsterPage from "../components/main pages/RegisterPage.jsx"
const Regster = () => {

  return (
    <>
    <Animate app={<Body obj={<RegsterPage/>}/>}/>

      
    </>
    
  );
};

export default Regster;
