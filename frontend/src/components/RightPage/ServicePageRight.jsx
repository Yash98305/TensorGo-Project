import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import  useAuth  from "../../context/auth.jsx";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { TextField, Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const ServicePageRight = ({ open, setOpen }) => {
  const [name, setName] = React.useState("");
  const [plans, setPlans] = React.useState([]);
  const [selectedPlans, setSelectedPlans] = React.useState([]);
  const { auth, api } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name,
     plans:selectedPlans.map(plans=>{
      return {_id:plans._id, name:plans.name};
    }),
    };
    try {
      await axios.post(`${api}/service/create`, data, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setName("");
      setSelectedPlans([]);
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  const getPlans = async () => {
    try {
      const res = await axios.get(`${api}/plan/get-all`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setPlans(res.data.plans);
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    getPlans();
  }, [auth]);

  return (
    <>
      <div>
        <Button
          style={{
            color:"#2E335B",
            float: "right",
            marginTop: "50px",
            marginRight: "280px",
            margin: "30px 40px",
            display: "flex",
            backgroundColor: "#d9d9d9",
          }}
          variant="contained"
          color="success"
          onClick={handleClickOpen}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "15px",
            }}
          >
            <AddCircleOutlineOutlinedIcon
              sx={{ fontSize: "23px", marginRight: "4px" }}
            />
            Add Service
          </div>
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle
            sx={{ minWidth: "400px", backgroundColor: "green", color: "white" }}
          >
            Add Service
          </DialogTitle>
          <DialogContent>
            <TextField
              sx={{ marginTop: "20px" }}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Service Name"
              type="text"
              fullWidth
              value={name}
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
            <Autocomplete
              sx={{ m: 1, width: 500 }}
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
                  value={option} // Use the entire option object
                  sx={{ justifyContent: "space-between" }}
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
      <div style={{ height: "100%", display: "flex", alignItems: "end" }}>
        {/* Additional content or styling */}
      </div>
    </>
  );
};

export default ServicePageRight;
