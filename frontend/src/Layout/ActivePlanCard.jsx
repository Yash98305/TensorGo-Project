import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useAuth } from "../context/auth";
import { useNavigate} from "react-router-dom"


const ActivePlanCard = ({ img, plan}) => {
  const { api, auth } = useAuth();
  console.log(plan);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/create-users?activePlanId=${plan._id}`);
  };
  useEffect(() => {
    
  }, [auth?.token, api,plan]);
  return (
    <Card elevation={5} sx={{ maxWidth: 345, padding: "20px 10px"}}>
      <CardHeader title={plan.planId.name} subheader={plan.serviceId.name} />
      <CardMedia
        component="img"
        style={{ height: "195px", width: "80%", padding: "10px" }}
        image={img}
        alt="sorry"
      />
      <CardMedia>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ padding: "10px" }}
        >
       <h4>Plan Summary :</h4> 
        </Typography>
      </CardMedia>
      <CardMedia>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ padding: "0px 10px" }}
        >
           <h4 style={{display:"inline-block"}}>Plan Duration :</h4> {plan.planDuration}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ padding: "0px 10px" }}
        >
           <h4 style={{display:"inline-block"}}>Plan Starting Date :</h4> {plan.planStartDate}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ padding: "0px 10px" }}
        >
           <h4 style={{display:"inline-block"}}>Plan Price :</h4> {plan.planId.description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ padding: "0px 10px" }}
        >
           <h4 style={{display:"inline-block"}}>Plan Features : </h4> {plan.planId.features}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ padding: "0px 10px" }}
        >
         <h4 style={{display:"inline-block"}}>Plan Ending Date : </h4>{plan.planEndDate}
        </Typography>
      </CardMedia>
      
            <Button
           onClick={handleClick}
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
            
            Start
          </div>
        </Button>
        
    </Card>
  );
};
export default ActivePlanCard;
