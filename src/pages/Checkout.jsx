import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const toAmount = (v) => {
  if (v == null) return 0;
  if (typeof v === "number" && Number.isFinite(v)) return v;
  const s = String(v);
  const digits = s.replace(/[^0-9.]/g, "");
  const n = Number(digits);
  return Number.isFinite(n) ? n : 0;
};

const formatN = (n) => `₦${toAmount(n).toLocaleString("en-NG")}`;

export default function Checkout() {
  const { cartItems = [], totals = { grandTotal: 0 } } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [method, setMethod] = useState("card");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("pendingOrderCustomer", JSON.stringify(form));
    navigate(method === "card" ? "/payment/card" : "/payment/transfer");
  };

  return (
    <div className="checkout-page">
      {/* STEP INDICATOR */}
      <div className="checkout-steps">
        <div className="step completed">Cart</div>
        <div className="step active">Checkout</div>
        <div className="step">Payment</div>
      </div>

      <div className="checkout-container">
        {/* LEFT SIDE */}
        <div className="checkout-main">
          <form id="checkout-form" onSubmit={handleSubmit} className="section-card">
            <h2 className="section-title">Customer Details</h2>

            <div className="form-grid">
              <input
                className="input"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                className="input"
                placeholder="Phone"
                required
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <input
                className="input full"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                className="input full"
                placeholder="Delivery Address"
                required
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
              />
            </div>
          </form>

          <div className="section-card">
            <h2 className="section-title">Payment Method</h2>

            <div className="payment-grid">
              <div
                className={`payment-box ${
                  method === "card" ? "selected" : ""
                }`}
                onClick={() => setMethod("card")}
              >
                Pay with Card
              </div>

              <div
                className={`payment-box ${
                  method === "transfer" ? "selected" : ""
                }`}
                onClick={() => setMethod("transfer")}
              >
                Bank Transfer
              </div>
            </div>

            <button type="submit" form="checkout-form" className="primary-btn">
              Continue to Payment
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <aside className="order-summary">
          <h3>Order Summary</h3>

          {cartItems.map((item) => (
            <div key={item.id} className="summary-row">
              <div>
                <p className="item-name">{item.name}</p>
                <span className="item-meta">
                  {item.quantity} × {formatN(toAmount(item.price))}
                </span>
              </div>
              <strong>
                {formatN(toAmount(item.price) * Number(item.quantity || 1))}
              </strong>
            </div>
          ))}

          <div className="summary-total">
            <span>Total</span>
            <strong>{formatN(totals.grandTotal)}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}
