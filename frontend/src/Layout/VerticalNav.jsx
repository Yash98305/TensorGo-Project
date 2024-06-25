import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import  useAuth  from "../context/auth.jsx";

const VerticalNav = ({ handleLogout }) => {
  const location = useLocation();
  const { so,auth } = useAuth();
  const lpath = location.pathname;
  useEffect(() => {}, [location]);
  return (
    <>
      <ul onClick={() => so?.(false)}>
        <NavLink to="/home">
          <li style={{ backgroundColor: `${lpath == "/home" ? "#ccc" : ""}` }}>
            <HomeRoundedIcon color="#2E335B" />
            <span style={{ paddingLeft: "10px" }}>Overview</span>
          </li>
        </NavLink>
        <NavLink to="/active-plans">
          <li
            style={{ backgroundColor: `${lpath == "/active-plans" ? "#ccc" : ""}` }}
          >
            <InventoryRoundedIcon color="#2E335B" />
            <span style={{ paddingLeft: "10px" }}>Active Plan</span>
          </li>
        </NavLink>
          </ul>
      <ul>
        
       {auth?.token? <NavLink to="/login" onClick={handleLogout}>
          <li>
            <LogoutRoundedIcon color="#2E335B" />
            <span>Log Out</span>
          </li>
        </NavLink>:<NavLink to="/login">
          <li>
            <LogoutRoundedIcon color="#2E335B" />
            <span>Login</span>
          </li>
        </NavLink>
        }
      </ul>
    </>
  );
};

export default VerticalNav;
