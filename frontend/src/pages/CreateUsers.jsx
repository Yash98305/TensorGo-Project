import React from 'react'
import Body from "../Layout/Body.jsx";
import CreateUsersPage from "../components/main pages/CreateUsersPage.jsx"
import Animate from "../Animate.jsx";

const CreateUsers = () => {
 
      return (
        <><Animate app={<Body obj={<CreateUsersPage/>}/>}/></>
  )
}

export default CreateUsers