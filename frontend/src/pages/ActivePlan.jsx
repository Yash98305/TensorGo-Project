import React from 'react'
import Body from "../Layout/Body.jsx";
import ActivePlanPage from "./../components/main pages/ActivePlanPage.jsx"
import Animate from "../Animate.jsx";

const ActivePlan = () => {
 
      return (
        <><Animate app={<Body obj={<ActivePlanPage/>}/>}/></>
  )
}

export default ActivePlan