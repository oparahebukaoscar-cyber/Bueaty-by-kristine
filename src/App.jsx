import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Booking from "./pages/Booking";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CardPayment from "./pages/CardPayment";
import BankTransfer from "./pages/BankTransfer";
import PaymentSuccess from "./pages/PaymentSuccess";
import OrderSuccess from "./pages/OrderSuccess";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Bookings from "./pages/admin/Bookings";
import Users from "./pages/admin/Users";
import RequireAdmin from "./components/RequireAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/card" element={<CardPayment />} />
          <Route path="/payment/transfer" element={<BankTransfer />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/shop" element={<Shop />} />

          {/* Removed temporary unprotected admin debug route */}

          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
