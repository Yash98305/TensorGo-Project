import img from "../assets/Untitled-1 copy.png"
import { TextField } from '@mui/material'
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/auth";

const Register = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
const {api,auth} = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${api}/auth/register`,
        {
          name,
          email,
          phone,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // const photoapi = `https://api.multiavatar.com/4645646/${Math.round(Math.random() * 1000)}.png`;
  useEffect(()=>{
    if(auth.token){
      toast.success(`you already logged in`)
      navigate("/home")}
      },[navigate,auth])
  return (
    <div style={{height:"100vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center",background: "#ADA996",
    background: "-webkit-linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996)",
    background: "linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996)",}}>
    <div style={{padding:"4px 120px",boxShadow: "0 0 20px 5px rgba(128, 128, 128, 0.2)",backgroundColor:"rgb(229 229 229)",borderRadius:"40px"}}><img style={{zIndex:"1"}} src={img} alt="" />
    <div style={{zIndex:"99",position:"absolute",top:"50px",right:"250px"}}>
    <form onSubmit={handleSubmit} style={{width:"400px"}}>
    <h1 style={{textAlign:"center",padding:"40px"}}>Register Yourself</h1>
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
       style={{ width:"100%",borderColor:"red",marginBottom:"40px"}} 
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
       style={{ width:"100%",borderColor:"red",marginBottom:"40px"}} 
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
       style={{ width:"100%",borderColor:"red",marginBottom:"40px"}} 
        />
    <TextField
          id="outlined-multiline-flexible"
          label="Password"
          value={password}
                name="password"
                required
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
          multiline
       style={{ width:"100%",borderColor:"red",marginBottom:"40px"}} 
        />
        <button type="submit" style={{width:"100%",padding:"17px",backgroundColor:"black",color:"white",fontSize:"15px",borderRadius:"7px"}}>
            SUBMIT
        </button>
    </form>

    </div>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default Register