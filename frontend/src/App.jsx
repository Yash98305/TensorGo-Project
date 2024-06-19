import React from 'react'
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Login from "./Pages/Login.jsx";
import Home from './Pages/Home.jsx';
import Register from './Pages/Register.jsx';
import Profile from './Pages/Profile.jsx';

const App = () => {
  return (
    <>
    <Routes>
     <Route path="/" element={<Login/>}/>
   <Route path="/home" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/profile" element={<Profile/>}/>
  
    <Route path="*" element={<ErrorPage/>}/>
  </Routes>
  </>

  )
}

export default App