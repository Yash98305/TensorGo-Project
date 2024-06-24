import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../../context/auth';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from "axios"
const planPageLeft = ({open,setOpen}) => {
  const {auth,api} = useAuth();
  const [name, setName] = useState('');
  const [price, setPrice] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [features, setFeatures] = React.useState("");
  const [userLimit, setUserLimit] = React.useState("");
  const [eopen,seteOpen] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [currentplanId, setCurrentplanId] = useState(null);
  const handleClickOpen = (plan) => {
    setCurrentplanId(plan?._id);
    setName(plan?.name);
    setPrice(plan?.price);
    setApiKey(plan?.apiKey);
    setDescription(plan?.description);
    setFeatures(plan?.features);
    setUserLimit(plan?.userLimit);
    seteOpen(true);
  };

  const handleClose = () => {
    seteOpen(false);
  };
  const getPlanData = async () => {
    try {
      const res = await axios.get(`${api}/plan/get-all`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setData(res.data.plans);
    } catch (err) {
      console.error("Failed to fetch Plans:", err);
      setError("Failed to load Plans");
    }
  };
  const Edit = async (event) => {
    event.preventDefault();
    const plan = { name, description,features,price,userLimit,api};
    try {
        await axios.put(`${api}/plan/update/${currentplanId}`, plan, {
          headers: {
            Authorization: auth?.token,
          },
        });
     
    } catch (e) {
      console.error(e);
    }
    handleClose();
  };
  
  const DeletePlan = async(id)=>{
    try {
      await axios.delete(`${api}/plan/delete/${id}`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setData((prevData) => prevData.filter((plan) => plan._id !== id));
    } catch (err) {
      console.error('Failed to delete Plan:', err);
    }
  }
  
  React.useEffect(() => {
    getPlanData();
  }, [auth,api,open,eopen]);
  return (
    <div style={{height:"80vh",overflowY: "auto",padding:"15px", display:"flex",
	overflowX: "hidden"}}> 
                          <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md:6 }}>

    {data?.length > 0 ? (
                    data?.map((data, index) => (
                      <Grid item xs={4} key = {index}>
                      
       <Card elevation={5} sx={{ width: 200,height : 200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}} key = {index} >
    <CardContent>
      <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
     {data.name}
      </Typography>    
    </CardContent>
    <CardActions>
    <Button variant="contained" color="warning" onClick={() => DeletePlan(data._id)}
    >
              Delete
            </Button>
            <Button variant="contained" color="success" onClick={() => handleClickOpen(data)}>
                    Edit
                  </Button>   </CardActions>
  </Card></Grid>
    ))):("Plans Not Found")}
    </Grid>
    <Dialog
        open={eopen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: Edit,
        }}
      >
        <DialogTitle sx={{ minWidth: '400px', backgroundColor: 'green', color: 'white' }}>
          {currentplanId ? 'Edit plan' : 'Add plan'}
        </DialogTitle>
        <DialogContent>
        <TextField
              sx={{ marginTop: "20px" }}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Plan Name"
              type="text"
              fullWidth
              value={name}
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
<TextField
              sx={{ marginTop: "20px" }}
              autoFocus
              required
              margin="dense"
              id="price"
              name="price"
              label="Plan Price"
              type="number"
              fullWidth
              value={price}
              variant="standard"
              onChange={(e) => setPrice(e.target.value)}
            />
<TextField
              sx={{ marginTop: "20px" }}
              autoFocus
              required
              margin="dense"
              id="description"
              name="description"
              label="Plan Description"
              type="text"
              fullWidth
              value={description}
              variant="standard"
              onChange={(e) => setDescription(e.target.value)}
            />
<TextField
              sx={{ marginTop: "20px" }}
              autoFocus
              required
              margin="dense"
              id="features"
              name="features"
              label="Plan Features"
              type="text"
              fullWidth
              value={features}
              variant="standard"
              onChange={(e) => setFeatures(e.target.value)}
            />
<TextField
              sx={{ marginTop: "20px" }}
              autoFocus
              required
              margin="dense"
              id="userLimit"
              name="userLimit"
              label="Plan User Limit"
              type="number"
              fullWidth
              value={userLimit}
              variant="standard"
              onChange={(e) => setUserLimit(e.target.value)}
            />
<TextField
              sx={{ marginTop: "20px" }}
              autoFocus
              required
              margin="dense"
              id="apiKey"
              name="apiKey"
              label="Plan Api Key"
              type="text"
              fullWidth
              value={apiKey}
              variant="standard"
              onChange={(e) => setApiKey(e.target.value)}
            />

        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog> 
  </div>

  )
}

export default planPageLeft