import React from "react";
import "./Cart.css";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartDrawer = ({ cart, open, setOpen, removeItem }) => {
  return (
    <div className={`cart-drawer ${open ? "active" : ""}`}>
      
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={() => setOpen(false)}>X</button>
      </div>

      <div className="cart-items">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            removeItem={removeItem}
          />
        ))}
      </div>

      <CartSummary cart={cart} />
    </div>
  );
};

export default CartDrawer;
