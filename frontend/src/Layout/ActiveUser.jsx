import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useAuth } from "../context/auth";

const ActiveUser = () => {
  const [users, setUsers] = useState([]);
  const { auth, api } = useAuth();

  const getUser = async () => {
    try {
      const res = await axios.get(`${api}/subscription/get-all-active`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setUsers(res.data.active);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUser();
  }, [auth, api]);

  return (
    <div style={{ width: "75vw", height: "480px" }}>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "100%", overflowY: "auto" }}
      >
        <Table aria-label="user table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  width: "5em",
                  height: "70px",
                  background: "#888",
                  color: "#eee",
                }}
                align="center"
              >
                Name
              </TableCell>
              <TableCell
                style={{
                  width: "20em",
                  height: "70px",
                  background: "#888",
                  color: "#eee",
                }}
                align="center"
              >
                Email
              </TableCell>
              <TableCell
                style={{
                  width: "10em",
                  height: "70px",
                  background: "#888",
                  color: "#eee",
                }}
                align="center"
              >
                Phone
              </TableCell>
              <TableCell
                style={{
                  width: "10em",
                  height: "70px",
                  background: "#888",
                  color: "#eee",
                }}
                align="center"
              >
                Active Plan
              </TableCell>
              <TableCell
                style={{
                  width: "10em",
                  height: "70px",
                  background: "#888",
                  color: "#eee",
                }}
                align="center"
              >
                Active Service
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} style={{ height: "70px" }}>
                <TableCell align="center" style={{ height: "70px" }}>
                  {user.userId.name}
                </TableCell>
                <TableCell align="center" style={{ height: "70px" }}>
                  {user.userId.email}
                </TableCell>
                <TableCell align="center" style={{ height: "70px" }}>
                  {user.userId.phone}
                </TableCell>
                <TableCell align="center" style={{ height: "70px" }}>
                  {user.planId.name}
                </TableCell>
                <TableCell align="center" style={{ height: "70px" }}>
                  {user.serviceId.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActiveUser;
