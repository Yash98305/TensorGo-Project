import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import  useAuth  from "../../context/auth.jsx";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const ServicePageRight = ({open,setOpen}) => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [features, setFeatures] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");
  const [userLimit, setUserLimit] = React.useState("");
  const {auth, api } = useAuth();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const Submit = async (event) => {
    event.preventDefault();
    const data = {
      name,price,description,userLimit,features,apiKey
    };
    try {
     await axios.post(`${api}/plan/create`, data, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setName("")
      setPrice("")
      setDescription("")
      setUserLimit("")
      setFeatures("")
      setApiKey("")
    } catch (e) {
      console.error(e);
    }

    handleClose();
  };
  React.useEffect(() => {
   
  }, [auth,open]);

  return (
   <>
     <div>
        <Button
          style={{
            float: "right",
            marginTop: "50px",
            marginRight: "280px",
            margin: "30px 40px",
            display: "flex",
            color:"#2E335B",
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
            Add Plans
          </div>
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: Submit,
          }}
        >
          <DialogTitle
            sx={{ minWidth: "400px", backgroundColor: "green", color: "white" }}
          >
             Add Plans
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
      <div style={{ height: "100%", display: "flex", alignItems: "end" }}>
      </div>
   </>
  );
};


export default ServicePageRight