import React, { useEffect } from "react";
import  useAuth  from "../../context/auth.jsx";
import axios from "axios";
import { useState } from "react";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { api, auth } = useAuth();
  const [services,setServices] = useState();
  const navigate = useNavigate();
  const fetchServices = async () => {
    try {
      const res = await axios?.get(`${api}/service/get-all`, {
        headers: {
          Authorization: auth?.token,
        },
      });

      setServices(res.data.services);
    } catch (err) {
      console.error('Failed to fetch Services:', err);
    }
  };
  const GoToSubscription = async(id)=>{
    navigate(`/subscription?serviceId=${id}`)
  }

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
    fetchServices();
 getActivePlan();
  }, [auth, api]); 
  const isServiceActive = (serviceId) => {
    return activePlans.some(plan => plan.serviceId._id === serviceId);
  };
  return (
    <div style={{width:"80vw",height:"80vh",padding:10}}>
      <h1 >Our Services :</h1>
      <div style={{width:"78.4vw",height:"70vh",padding:"15px 25px",marginTop:10,overflowY: 'auto',overflowX: 'hidden' }} >
      <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
        {services?.length > 0 ? (
          services.map(service => (
            <Grid item xs={4} key={service._id}>
              <Card elevation={5} sx={{ width: 200, height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <CardContent>
                  <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                    {service.name}
                  </Typography>
                </CardContent>
                <CardActions>
                 {isServiceActive(service._id) ?<Button variant="contained" color="success">
                    Active
                  </Button>:
                  <Button variant="contained" color="warning" onClick={()=>GoToSubscription(service._id)}>
                    Start
                  </Button>}

                </CardActions>
              </Card>
            </Grid>))):"No Service"}
            </Grid>
      </div>
    </div>
   
  );
};

export default HomePage;
