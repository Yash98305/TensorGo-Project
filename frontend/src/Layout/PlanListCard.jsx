import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import { useAuth } from "../context/auth.js";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from 'moment';

const PlanListCard = ({ img, plan}) => {
  const navigate = useNavigate();
  const { api, auth} = useAuth();
  const [userId, setUserId] = useState();
  const [basic, setBasic] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = queryParams.get('serviceId');
console.log(userId);
  const fetchUserData = async () => {
    try {
      const res = await axios?.get(`${api}/auth/myprofile`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setUserId(res.data.user);
     
    } catch (e) {
      console.log(e.message);
    }
  };


    const checkout = async (planName) => {
      try {
        if(planName === "Basic"){
          try {
            const res = await axios?.post(
              `${api}/subscription/create-basic-subscription`,
              { userId: auth?.user?._id,serviceId:serviceId,planId:plan._id }
            );
if(res){
  navigate("/home")
}
          } catch (error) {
            console.log(error);
          }
        }else{
        const res = await axios?.post(
          `${api}/subscription/create-subscription-checkout`,
          { apiKey :plan.apiKey , userId: auth?.user?._id,service:serviceId,plan:plan._id }
        );
        if (res.status === 200) {
          const { session } = res.data;
          window.location = session.url;
        } else {
          console.error("Unexpected response status:", res.status);
        }}
      } catch (error) {
        if (error.response) {
          console.error("Response data error:", error.response.data);
        } else if (error.request) {
          console.error("Request error:", error.request);
        } else {
          console.error("General error:", error.message);
        }
      }
    };
    
  useEffect(() => {
    fetchUserData();
  }, [auth?.token, api]);
  return (
    <Card elevation={5} sx={{ maxWidth: 345, padding: "20px 10px" }}>
      <CardHeader title={plan.name} subheader={plan.description} />
      <CardMedia
        component="img"
        style={{ height: "250px", width: "100%", padding: "10px" }}
        image={img}
        alt="sorry"
      />
      <CardMedia>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ padding: "10px" }}
        >
          Features :
        </Typography>
      </CardMedia>
      <CardMedia>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ padding: "10px" }}
        >
          {plan.features}
        </Typography>
      </CardMedia>
      
        {userId?.basicPlanEndDate && plan.name === "Basic"? <Button
          style={{
            color:"#2E335B",fontWeight:600,width:`100%`,
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
            Expired
         
          </div>
        </Button>: <Button
            onClick={()=>checkout(plan.name)}
          style={{
            color:"#2E335B",fontWeight:600,width:`100%`,
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
            Subscribed
         
          </div>
        </Button>}
       
    </Card>
  );
};
export default PlanListCard;
