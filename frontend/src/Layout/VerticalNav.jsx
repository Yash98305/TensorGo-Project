import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import { useAnimationFrame } from "framer-motion";
import { useAuth } from "../context/auth";

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
