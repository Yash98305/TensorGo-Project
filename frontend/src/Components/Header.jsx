import * as React from 'react';
import {AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar} from '@mui/material';
import AdbIcon from "@mui/icons-material/Adb"
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom"
import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
import { useAuth } from "../Context/auth.js";
import {toast} from "react-toastify"

const pages = ['Home','Plan',];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
const {auth,setAuth} = useAuth();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
e.preventDefault();
console.log(e.target.innerText);

if(e.target.innerText == "HOME"){
  navigate("/")
}
if(e.target.innerText == "PLAN"){
  navigate("/plan")
}

    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    e.preventDefault();
console.log(e.target.innerText);
if(e.target.innerText == "LOGIN"){
  navigate("/login")
}
if(e.target.innerText == "Profile"){
  navigate("/profile")
}
if(e.target.innerText == "Logout"){
  handleLogout();
  navigate("/home")
}
    setAnchorElUser(null);
  };


  const getProfile = async() => {
try {
  const res = await axios.get();
} catch (error) {
  console.log(error.message);
}
  }

 
    const handleLogout = () => {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      toast.success("Logout Successfully");
     
    };
   
  
  useEffect(()=>{
    getProfile()
  },[auth])

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{background:"white"}}>
        <Toolbar disableGutters>
          <AdbIcon  sx={{color : 'black', display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu 
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
               
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 1, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
       {!auth.token?<Button href='/login'
              style={{ padding: 10,borderRadius:25,backgroundColor:"#2c3a8c",color:"white" }}
              
            >
              Login 
            </Button>:
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
            }   
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;