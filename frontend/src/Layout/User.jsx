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
import  useAuth from "../context/auth.jsx";

const User = () => {
  const [users, setUsers] = useState([]);
  const { auth, api } = useAuth();

  const getUser = async () => {
    try {
      const res = await axios.get(`${api}/auth/get-all-users`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setUsers(res.data.users);
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
                Created At
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} style={{ height: "70px" }}>
                <TableCell align="center" style={{ height: "70px" }}>
                  {(user.name).toUpperCase()}
                </TableCell>
                <TableCell align="center" style={{ height: "70px" }}>
                  {user.email}
                </TableCell>
                <TableCell align="center" style={{ height: "70px" }}>
                  {user.phone}
                </TableCell>
                
                <TableCell align="center" style={{ height: "70px" }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;
