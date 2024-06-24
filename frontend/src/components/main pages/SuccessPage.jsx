import React, { useEffect } from 'react'
import "../../css/succecc.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import {useAuth} from "../../context/auth.js"
import axios from 'axios'
import { Button } from '@mui/material';
const SuccessPage = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [sessionId, setSessionId] = useState("");
  const {auth,api} = useAuth();
  const fetchUserData = async () => {
    try{
    const res = await axios?.get(`${api}/auth/myprofile`, {headers: {
        Authorization: auth?.token
      }});
setUserId(res.data.user._id);
setSessionId(res.data.user.subscription.sessionId);
  }catch(e){
    console.log(e.message);
  }}

    useEffect(() => {
      fetchUserData();
    }, [auth?.token,api]);
  
    const handlePaymentSuccess = async () => {
      try {
        await axios?.post(`${api}/subscription/payment-success`, {
         sessionId, userId })
        setSessionId("");
      } catch (e) {
        console.log(e.error);
      }
    };
    useEffect(() => {
      if (userId && sessionId) {
        handlePaymentSuccess();
      }
    }, [userId, sessionId]);
  return (
    <> 
    <div className="card">
        <svg viewBox="0 0 24 24" className="icon">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>
        <div className="text-center">
            <h3 className="title">Payment Done!</h3>
            <p className="text">Thank you for completing your secure online payment.</p>
            <p>Have a great day!</p>
            <div style={{
            marginTop:"20px",
            display: "flex",justifyContent:"center"}}>
            <Button href="/active-plans"
          style={{
            color:"#2E335B",fontWeight:600,
            display: "flex",
            backgroundColor: "#d9d9d9",
          }}
          variant="contained"
          color="success"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "15px",
            }}
          >
            
            Go Back
          </div>
        </Button>
        </div>
        </div>
    
</div></>
  )
}

export default SuccessPage