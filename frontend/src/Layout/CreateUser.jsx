import React, { useEffect, useState } from 'react'
import img from "../Layout/Mobile login-pana.png"
import useAuth from '../context/auth.jsx';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateUser = ({activePlanId,limit,userGet,len,setRefresh,refresh}) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [userRole, setUserRole] = useState('');

  const handleRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  const {api,auth} = useAuth();
const [showPassword, setShowPassword] = React.useState(false);
const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleMouseDownPassword = (event) => {
  event.preventDefault();
};
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${api}/auth/user-create`,
        {
          name,
          email,
          phone,
          password,userRole,activePlanId
        }
      );
      setRefresh(!refresh)
      if (res) {
        toast.success(res.data && res.data.message);
        setname("")
        setemail("")
        setphone("")
        setpassword("")
        setUserRole('')
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{

      },[auth,api,refresh])
  return (
    <div>
      <div style={{display:"flex",}} >
    <div style={{width:"50%"}}>
      <img src={img} style={{ width: "88%", height: "100%" }} />
    </div>
    <div style={{width:"50%"}}><form onSubmit={handleSubmit} style={{width:"400px"}}>
    <h1 style={{textAlign:"center",padding:"10px"}}>Register Yourself</h1>
    <TextField
          id="outlined-multiline-flexible"
          label="Name"
          value={name}
                name="name"
                required
                onChange={(e) => {
                  setname(e.target.value);
                }}
          multiline
       style={{ width:"100%",borderColor:"red",marginBottom:"10px"}} 
        />
    <TextField
          id="outlined-multiline-flexible"
          label="Email"
          value={email}
                name="email"
                required
                onChange={(e) => {
                  setemail(e.target.value);
                }}
          multiline
       style={{ width:"100%",borderColor:"red",marginBottom:"10px"}} 
        />
    <TextField
          id="outlined-multiline-flexible"
          label="Phone"
          value={phone}
                required
                name="phone"
                onChange={(e) => {
                  setphone(e.target.value);
                }}
          multiline
       style={{ width:"100%",borderColor:"red",marginBottom:"10px"}} 
        />
   <FormControl
              sx={{ m: 1, width: "400px", marginLeft: "-0.1px" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                value={password}
                name="password"
                required
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Role :</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value = {userRole}
        onChange={handleRoleChange}
      >
        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
        <FormControlLabel value="user" control={<Radio />} label="User" />
      </RadioGroup>
    </FormControl>


       {limit-len>0? <button type="submit" style={{width:"100%",padding:"17px",backgroundColor:"black",color:"white",fontSize:"15px",borderRadius:"7px"}}>
            SUBMIT
        </button>:<button type="submit" style={{width:"100%",padding:"17px",backgroundColor:"black",color:"white",fontSize:"15px",borderRadius:"7px"}}>
            User Limit Excressed
        </button>}
    </form>
    </div>
    </div>
    </div>
  )
}

export default CreateUser