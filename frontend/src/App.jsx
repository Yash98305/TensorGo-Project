import React from 'react'
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Login from "./Pages/Login.jsx";
import Home from './Pages/Home.jsx';
import Register from './Pages/Register.jsx';
import Profile from './Pages/Profile.jsx';
import Header from './Components/Header.jsx';
import PlanList from './Pages/PlanList.jsx';
import OrderHistory from './Pages/OrderHistory.jsx';
import Cart from './Pages/Cart.jsx';
import Checkout from './Pages/Checkout.jsx';
import { useState } from 'react';
import Success from './Pages/Success.jsx';
import Cancel from './Pages/Cancel.jsx';
const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleAddToCart = (plan) => {
    setCartItems([...cartItems, plan]);
    setTotalAmount(totalAmount + plan.price);
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    const removedItem = cartItems.find(item => item._id === id);
    setCartItems(updatedCart);
    setTotalAmount(totalAmount - removedItem.price);
  };

  const handleCheckout = () => {
    // Handle checkout logic here
  };
  return (
    <>
    <Header/>
    <Routes>
     <Route path="/" element={<Home/>}/>
   <Route path="/home" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/plan" element={<PlanList/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/cheakout" element={<Checkout/>}/>
    <Route path="/order-history" element={<OrderHistory/>} />
    <Route path="/success" element={<Success/>} />
    <Route path="/cancel" element={<Cancel/>} />
    <Route path="*" element={<ErrorPage/>}/>
  </Routes>
  </>

  )
}

export default App