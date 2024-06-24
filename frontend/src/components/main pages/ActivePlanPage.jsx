import React, { useEffect, useState } from "react";
import img1 from "../../Layout/basic.png";
import img2 from "../../Layout/business.png";
import img3 from "../../Layout/pro.png";
import { useAuth } from "../../context/auth";
import axios from "axios";
import ActivePlanCard from "../../Layout/ActivePlanCard";
import { Grid } from "@mui/material";

const ActivePlanPage = () => {
  const img = [img1, img2, img3];
  const { auth, api } = useAuth();

  const [activePlans, setActivePlans] = React.useState([]);
  const getActivePlan = async () => {
    try {
      const res = await axios.get(`${api}/subscription/get-plan`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setActivePlans(res.data.subscriptions);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getActivePlan();
  }, [auth, api]);
  return (

    <>     <div style={{width:"80vw",height:"80vh",padding:10}}>
 <h1 >Your Active Plans:</h1>
    <div style={{height:"75vh",overflowY: "auto",padding:"15px", display:"flex",width:"80vw",
      overflowX: "hidden"}}> 
                              <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md:6 }}>
    
      {activePlans.length > 0 && activePlans.map((plan) => (
        <Grid item xs={4} key = {plan._id}>
        <ActivePlanCard
          key={plan._id}
          img={img[Math.floor(Math.random() * img.length)]}
        plan={plan}  
        />
         </Grid>
      ))}
      </Grid>
    </div>
    </div>
    </>
  );
};

export default ActivePlanPage;
