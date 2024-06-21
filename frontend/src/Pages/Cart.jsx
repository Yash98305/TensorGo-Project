import React, { useState } from 'react';

const Cart = ({ cartItems, onRemove, onCheckout }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems?.map(item => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>${item.price}</p>
          <button onClick={() => onRemove(item._id)}>Remove</button>
        </div>
      ))}
      <button onClick={onCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
