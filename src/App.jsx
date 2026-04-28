import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Booking from './pages/Booking';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CardPayment from './pages/CardPayment';
import BankTransfer from './pages/BankTransfer';
import PaymentSuccess from './pages/PaymentSuccess';
import OrderSuccess from './pages/OrderSuccess';
// Admin pages removed

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

          {/* Admin routes removed */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
