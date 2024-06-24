import React, { useEffect, useState } from "react";
import Body from "../Layout/Body.jsx";
import Animate from "../Animate.jsx";
import UserPlanPage from "../components/main pages/UserPlanPage.jsx";
const UserPlan = () => {
 

  return (
    <>
    <Animate app={<Body obj={<UserPlanPage/>}/>}/>

      
    </>
    
  );
};

export default UserPlan;
