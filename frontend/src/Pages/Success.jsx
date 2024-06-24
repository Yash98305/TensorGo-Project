import React, { useEffect, useState } from "react";
import Body from "../Layout/Body.jsx";
import Animate from "../Animate.jsx";
import SuccessPage from "../components/main pages/SuccessPage.jsx";
const Success = () => {
 

  return (
    <>
    <Animate app={<Body obj={<SuccessPage/>}/>}/>

      
    </>
    
  );
};

export default Success;
