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
  Button,
} from "@mui/material";
import useAuth  from "../context/auth.jsx";
const AllUser = ({user,userGet,refresh,setRefresh}) => {
  const{api,auth} = useAuth()
  const deletUser = async(id)=>{
try {
  const res = await axios.delete(`${api}/auth/user-delete/${id}`)
  setRefresh(!refresh)
 
} catch (error) {
  console.log(error);
}
  }
  useEffect(()=>{

  },[auth,api,refresh])
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
                Role
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
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user?.map((user) => (
              <TableRow key={user._id} style={{ height: "70px" }}>
                <TableCell align="center" style={{ height: "70px" }}>
                  {user.name}
                </TableCell>
                <TableCell align="center" style={{ height: "70px" }}>
                  {user.email}
                </TableCell>
                <TableCell align="center" style={{ height: "70px" }}>
                  {user.phone}
                </TableCell>
                <TableCell align="center" style={{ height: "70px" }}>
                  {user.userRole}
                </TableCell>
                <TableCell align="center" style={{ height: "70px" }}>
                 <Button onClick={()=> deletUser(user._id)}>
                    Delete
                 </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AllUser