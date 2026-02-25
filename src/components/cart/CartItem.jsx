import React from "react";

const CartItem = ({ item, removeItem }) => {
  return (
    <div className="cart-item">

      {(() => {
        const src = item.image || item.image_url || item.imageUrl || '';
        const placeholder = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%' height='100%' fill='%23fff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236b0f1a' font-family='Arial,Helvetica,sans-serif' font-size='14'>No image</text></svg>";
        return (
          <img src={src || placeholder} alt={item.name} onError={(e) => { e.currentTarget.src = placeholder; }} />
        );
      })()}

      <div>
        <h4>{item.name}</h4>
        <p>₦{item.price}</p>
      </div>

      <button onClick={() => removeItem(item.id)}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;
