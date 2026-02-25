import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => (
  <div className="py-20 text-center">
    <div className="text-6xl mb-4">🎉</div>
    <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
    <p className="text-gray-600 mb-8">Thank you for shopping with Beauty by Kristine.</p>
    <Link to="/shop" className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90">Continue Shopping</Link>
  </div>
);

export default OrderSuccess;
