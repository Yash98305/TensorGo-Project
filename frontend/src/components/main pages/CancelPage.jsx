import React, { useEffect } from 'react'
import "../../css/succecc.css"
import { Button } from '@mui/material';
const CancelPage = () => {
 
  
  return (
    <> 
    <div className="card">
    <svg viewBox="0 0 24 24" className="icon">
    <path fill="red" 
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0ZM15.54,8.46a1,1,0,0,1,0,1.41L13.41,12l2.13,2.13a1,1,0,0,1-1.41,1.41L12,13.41l-2.13,2.13a1,1,0,1,1-1.41-1.41L10.59,12,8.46,9.87a1,1,0,1,1,1.41-1.41L12,10.59l2.13-2.13A1,1,0,0,1,15.54,8.46Z">
    </path>
</svg>
        <div className="text-center">
            <h3 className="title">Oops!! Payment Failed</h3>
            <p className="text">Retry you payment</p>
            <p>Have a great day!</p>
            <div style={{
            marginTop:"20px",
            display: "flex",justifyContent:"center"}}>
            <Button href="/home"
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

export default CancelPage