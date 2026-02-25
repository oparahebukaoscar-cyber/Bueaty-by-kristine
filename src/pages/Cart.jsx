import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const formatN = (n) => `₦${Number(n || 0).toLocaleString('en-NG')}`;

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, totals } = useCart();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="mt-4 text-gray-600">Browse our collection and add your favourite wigs.</p>
          <Link to="/shop" className="mt-6 inline-block text-primary font-medium">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 sm:py-12 px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => {
              const itemPrice = Number(String(item.price).replace(/[^0-9]/g, '')) || 0;
              return (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  {(() => {
                    const src = item.image || item.image_url || item.imageUrl || '';
                    const placeholder = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%' height='100%' fill='%23fff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236b0f1a' font-family='Arial,Helvetica,sans-serif' font-size='14'>No image</text></svg>";
                    return (
                      <img
                        src={src || placeholder}
                        alt={item.name}
                        className="w-full sm:w-24 h-40 sm:h-24 object-contain"
                        onError={(e) => { e.currentTarget.src = placeholder; }}
                      />
                    );
                  })()}

                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <button 
                        className="text-sm text-primary hover:underline" 
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <p className="text-sm text-gray-500">{item.price}</p>

                    <div className="mt-3 flex items-center gap-2">
                      <button className="min-h-[44px] w-10 sm:w-8 h-10 sm:h-8 flex items-center justify-center border rounded-md hover:bg-accent" onClick={() => decreaseQuantity(item.id)}>-</button>
                      <div className="px-3 font-medium">{item.quantity}</div>
                      <button className="min-h-[44px] w-10 sm:w-8 h-10 sm:h-8 flex items-center justify-center border rounded-md hover:bg-accent" onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>

                  <div className="text-right sm:text-right">
                    <div className="font-semibold text-primary">{formatN(itemPrice * item.quantity)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="bg-accent/60 border border-primary/10 p-5 sm:p-6 rounded-lg h-fit">
          <h2 className="font-semibold text-lg border-b pb-3">Order Summary</h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatN(totals.subtotal)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Delivery</span><span className="text-gold font-semibold">Free</span></div>
            <hr />
            <div className="flex justify-between font-bold text-xl text-gray-900 pt-2">
              <span>Total</span>
              <span>{formatN(totals.grandTotal)}</span>
            </div>
          </div>

          <Link to="/checkout" className="mt-8 block w-full text-center bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default Cart;