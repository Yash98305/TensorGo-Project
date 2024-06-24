import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Autocomplete,
  MenuItem,
  Grid,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import { useAuth } from '../../context/auth';

const ServicePageLeft = ({ open, setOpen }) => {
  const { auth, api } = useAuth();
  const [name, setName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState([]);

  const handleClickOpen = (service) => {
    setCurrentService(service);
    setName(service.name);
    setSelectedPlans(service.plans);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setCurrentService(null);
    setName('');
    setSelectedPlans([]);
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${api}/service/get-all`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setServices(res.data.services);
    } catch (err) {
      console.error('Failed to fetch Services:', err);
      setError('Failed to load Services');
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await axios.get(`${api}/plan/get-all`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setPlans(res.data.plans);
    } catch (err) {
      console.error('Failed to fetch Plans:', err);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const updatedService = {
      name,
      plans: selectedPlans.map(plans=>{
        return {_id:plans._id, name:plans.name};
      }),
    };

    try {
      await axios.put(`${api}/service/update/${currentService._id}`, updatedService, {
        headers: {
          Authorization: auth?.token,
        },
      });
      fetchServices();
    } catch (err) {
      console.error('Failed to update Service:', err);
    }

    handleClose();
  };

  const handleDeleteService = async (id) => {
    try {
      await axios.delete(`${api}/service/delete/${id}`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      fetchServices();
    } catch (err) {
      console.error('Failed to delete Service:', err);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchPlans();
  }, [auth, api, open, openDialog]);

  return (
    <div style={{  height: '80vh', overflowY: 'auto', padding: '15px', display: 'flex', overflowX: 'hidden' }}>
      <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
        {services?.length > 0 ? (
          services.map(service => (
            <Grid  item xs={4} key={service._id}>
              <Card elevation={5} sx={{ width: 200, height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <CardContent>
                  <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                    {service.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="warning" onClick={() => handleDeleteService(service._id)}>
                    Delete
                  </Button>
                  <Button variant="contained" color="success" onClick={() => handleClickOpen(service)}>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">Services Not Found</Typography>
        )}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleEdit,
        }}
      >
        <DialogTitle sx={{ minWidth: '400px', backgroundColor: 'green', color: 'white' }}>
          {currentService ? 'Edit Service' : 'Add Service'}
        </DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: '20px' }}
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Service Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Autocomplete
            sx={{ m: 1, width: '100%' }}
            multiple
            options={plans}
            getOptionLabel={(option) => option.name}
            value={selectedPlans}
            onChange={(event, newValue) => {
              setSelectedPlans(newValue);
            }}
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Plans"
                placeholder="Select Plans"
              />
            )}
            renderOption={(props, option, { selected }) => (
              <MenuItem
                {...props}
                key={option._id}
                value={option}
                sx={{ justifyContent: 'space-between' }}
              >
                {option.name}
                {selected ? <CheckIcon color="info" /> : null}
              </MenuItem>
            )}
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
  );
};

export default ServicePageLeft;
