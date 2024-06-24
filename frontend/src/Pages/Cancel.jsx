import React, { useEffect, useState } from "react";
import Body from "../Layout/Body";
import Animate from "../Animate.jsx";
import CancelPage from "../components/main pages/CancelPage.jsx";
const Cancel = () => {
 

  return (
    <>
    <Animate app={<Body obj={<CancelPage/>}/>}/>

      
    </>
    
  );
};

export default Cancel;
