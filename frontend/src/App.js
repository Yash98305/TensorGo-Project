import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage.jsx";
import Services from "./pages/Services.jsx";
import Organization from "./pages/Organization.jsx";
import Plan from "./pages/Plan.jsx";
import UserPlan from "./pages/UserPlan.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import ActivePlan from "./pages/ActivePlan.jsx";
import CreateUsers from "./pages/CreateUsers.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/subscription" element={<UserPlan />} />
        <Route path="/active-plans" element={<ActivePlan />} />
        <Route path="/create-users" element={<CreateUsers />} />
        <Route path="/admin" element={<Outlet/>}>
        <Route path="service" element={<Services/>} />
          <Route path="plan" element={<Plan />} />
          <Route path="organization" element={<Organization />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
