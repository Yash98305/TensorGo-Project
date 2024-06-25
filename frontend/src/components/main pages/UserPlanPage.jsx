import React, { useEffect, useState } from "react";
import PlanListCard from "../../Layout/PlanListCard";
import img1 from "../../Layout/basic.png";
import img2 from "../../Layout/business.png";
import img3 from "../../Layout/pro.png";
import  useAuth  from "../../context/auth.jsx";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";

const UserPlanPage = () => {
  const img = [img1, img2, img3];
  const [data, setData] = useState([]);
  const { auth, api} = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const servicesId = queryParams.get('serviceId');

  const getPlanData = async () => {
    try {
      const res = await axios.get(`${api}/service/get-all/${servicesId}`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setData(res.data.plans);
    } catch (err) {
      console.error("Failed to fetch subscription:", err);
    }
  };

  useEffect(() => {
    getPlanData();
  }, [auth, api]);

  return (
    <div style={{width:"80vw",height:"80vh",padding:10}}>
 <h1 >Subscription Plans:</h1>
    <div style={{height:"75vh",overflowY: "auto",padding:"15px", display:"flex",width:"80vw",
      overflowX: "hidden"}}> 
      
       <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md:6 }}>

      {data.length > 0 && data.map((plan) => (
        <Grid item xs={4} key = {plan._id}>

        <PlanListCard
          key={plan._id}
          img={img[Math.floor(Math.random() * img.length)]}
          plan={plan}servicesId={servicesId}
         
        />
     </Grid>
      ))}
      </Grid>
      </div>
      </div>
  );
};

export default UserPlanPage;
