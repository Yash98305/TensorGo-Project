import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
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
        <NavLink to="/admin/service">
          <li
            style={{ backgroundColor: `${lpath == "/admin/service" ? "#ccc" : ""}` }}
          >
            <InventoryRoundedIcon color="#2E335B" />
            <span style={{ paddingLeft: "10px" }}>Service</span>
          </li>
        </NavLink>
        <NavLink to="/admin/plan">
          <li style={{ backgroundColor: `${lpath == "/admin/plan" ? "#ccc" : ""}` }}>
            <ArchiveRoundedIcon color="#2E335B" />
            <span>Plan</span>
          </li>
        </NavLink>
        <NavLink to="/admin/organization">
          <li
            style={{
              backgroundColor: `${lpath == "/admin/organization" ? "#ccc" : ""}`,
            }}
          >
            <AccountBalanceWalletRoundedIcon color="#2E335B" />
            <span>Organization</span>
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
