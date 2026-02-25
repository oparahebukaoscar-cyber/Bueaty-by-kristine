import React from "react";

const CartSummary = ({ cart }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-summary">
      
      <h3>Total: ₦{total}</h3>

      <button className="checkout-btn">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
