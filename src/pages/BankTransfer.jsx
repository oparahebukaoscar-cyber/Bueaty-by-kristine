import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';

const BankTransfer = () => {
  const { totals, clearCart, cartItems = [] } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const bankName = 'Opay Digital Services';
  const accountNumber = '7017503628';
  const accountName = 'Oraka Chinaza Kristine';

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      // Build payload similar to PaymentSuccess: include customer from localStorage
      const pending = localStorage.getItem('pendingOrderCustomer');
      const customer = pending ? JSON.parse(pending) : {};

      if (!cartItems || cartItems.length === 0) throw new Error('Cart is empty');

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

      console.log('Calling createOrder from BankTransfer with payload:', payload);
      const { data, error } = await createOrder(payload);
      if (error) {
        console.error('createOrder error:', error);
        throw error;
      }
      const orderId = data?.order_id ?? null;
      // clear cart and navigate
      localStorage.removeItem('pendingOrderCustomer');
      clearCart();
      setLoading(false);
      if (orderId) navigate(`/order-success/${orderId}`);
      else navigate('/order-success');
    } catch (err) {
      console.error('Bank transfer order submission failed:', err);
      setError(err.message || String(err));
      setLoading(false);
    }
  };

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch (e) {
      setCopied(false);
      setError('Copy failed. Please select and copy manually.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent via-white to-white">
      <main className="mx-auto flex min-h-screen max-w-2xl items-start px-4 py-10 sm:py-14">
        <div className="w-full rounded-3xl border border-gray-200 bg-white shadow-sm">
          <header className="px-6 pt-7 pb-6 sm:px-8">
            <p className="text-xs font-semibold tracking-wide text-gray-500">Payment method</p>
            <h1 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">Bank transfer</h1>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Transfer the exact amount below to complete your order. Once done, confirm payment to place your order.
            </p>
          </header>

          <section className="border-t border-gray-100 px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">Total amount</p>
                <div className="mt-2 text-3xl font-extrabold text-primary">
                  ₦{(totals?.grandTotal || 0).toLocaleString()}
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Please include your name in the transfer narration if possible.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700 sm:max-w-xs">
                After transferring, click the confirmation button. Your order will be created immediately.
              </div>
            </div>

            {error && (
              <div className="mt-5 rounded-2xl border border-primary/20 bg-accent/60 px-4 py-3 text-sm text-primary">
                {error}
              </div>
            )}
          </section>

          <section className="border-t border-gray-100 px-6 py-6 sm:px-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Bank details</h2>
                <p className="mt-1 text-sm text-gray-600">Use the details below to make your transfer.</p>
              </div>
              <div className="hidden sm:inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-gray-900">
                Secure checkout
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Bank name</label>
                <div className="mt-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900">
                  {bankName}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Account name</label>
                <div className="mt-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900">
                  {accountName}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Account number</label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                  <input
                    readOnly
                    value={accountNumber}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-lg font-extrabold tracking-widest text-gray-900 outline-none focus:border-primary/60 focus:ring-4 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-900 transition hover:bg-gray-100 active:scale-[0.99]"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="w-full rounded-2xl bg-primary py-4 font-extrabold text-white transition hover:opacity-95 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Submitting...' : 'I Have Made the Transfer'}
              </button>
              <p className="mt-3 text-center text-xs text-gray-500">
                By confirming, you agree that the transfer has been made.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BankTransfer;
