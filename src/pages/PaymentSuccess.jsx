import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';

const PaymentSuccess = () => {
  const { cartItems = [], totals = { grandTotal: 0 }, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const pending = localStorage.getItem('pendingOrderCustomer');
        const customer = pending ? JSON.parse(pending) : {};
        if (!cartItems || cartItems.length === 0) throw new Error('Cart is empty');

        // prepare payload to match Edge Function contract
        const items = cartItems.map((i) => {
          const priceNum = Number(String(i.price).replace(/[^0-9]/g, '')) || 0;
          const qty = Number(i.quantity || 1);
          return {
            product_name: i.name,
            quantity: qty,
            subtotal: priceNum * qty,
          };
        });

        const payload = {
          customer: {
            name: customer?.name || null,
            email: customer?.email || null,
          },
          customer_name: customer?.name || null,
          customer_email: customer?.email || null,
          items,
          notes: customer?.address || null,
          total_amount: Number(totals?.grandTotal || 0),
        };

        // call Edge Function via the createOrder service
        console.log('Calling createOrder from PaymentSuccess with payload:', payload);
        const { data, error } = await createOrder(payload);
        if (error) {
          console.error('createOrder error:', error);
          throw error;
        }
        const orderId = data?.order_id ?? null;
        // clear cart, local storage, navigate
        localStorage.removeItem('pendingOrderCustomer');
        clearCart();
        setLoading(false);
        if (orderId) navigate(`/order-success/${orderId}`);
        else navigate(`/order-success`);
      } catch (err) {
        console.error('create-order failed', err);
        setError(err.message || String(err));
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Processing your order…</div>;
  if (error) return <div>There was an error placing your order: {error}</div>;
  return <div>Order placed successfully.</div>;
};

export default PaymentSuccess;
