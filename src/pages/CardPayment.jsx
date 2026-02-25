import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CardPayment = () => {
  const { totals, clearCart } = useCart();
  const navigate = useNavigate();
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // simulate card processing
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="max-w-md mx-auto py-10 sm:py-12 px-4 sm:px-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Card Payment</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <p className="text-sm text-gray-500 mb-4">Amount to pay: ₦{(totals?.grandTotal || 0).toLocaleString()}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Card number" className="input w-full" value={card.number} onChange={(e) => setCard({...card, number: e.target.value})} />
          <input required placeholder="Cardholder name" className="input w-full" value={card.name} onChange={(e) => setCard({...card, name: e.target.value})} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input required placeholder="MM/YY" className="input w-full" value={card.expiry} onChange={(e) => setCard({...card, expiry: e.target.value})} />
            <input required placeholder="CVC" className="input w-full" value={card.cvc} onChange={(e) => setCard({...card, cvc: e.target.value})} />
          </div>
          <button type="submit" className="w-full min-h-[44px] bg-primary text-white py-2 rounded-lg hover:opacity-95">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default CardPayment;
