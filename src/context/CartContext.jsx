import React, { createContext, useContext, useMemo, useState } from 'react';

export const CartContext = createContext();
const STORAGE_KEY = 'beautyByKristineCart';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const persist = (items) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (e) {}
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let next;
      if (existingItem) {
        next = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        // Persist database product id when available. Use `db_id` to store canonical DB UUID.
        const uuidRx = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const db_id = (product && product.id && typeof product.id === 'string' && uuidRx.test(product.id)) ? product.id : (product.db_id || null);
        next = [...prevItems, { ...product, quantity: 1, db_id }];
      }
      persist(next);
      return next;
    });
  };

  const increaseQuantity = (id) => {
    const next = cartItems.map(item => 
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCartItems(next);
    persist(next);
  };

  const decreaseQuantity = (id) => {
    const next = cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(next);
    persist(next);
  };

  const removeFromCart = (id) => {
    const next = cartItems.filter(item => item.id !== id);
    setCartItems(next);
    persist(next);
  };

  const clearCart = () => {
    setCartItems([]);
    persist([]);
  };

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((s, c) => {
      const priceNum = Number(String(c.price).replace(/[^0-9]/g, '')) || 0;
      return s + (priceNum * (c.quantity || 1));
    }, 0);
    const totalItems = cartItems.reduce((s, c) => s + (c.quantity || 0), 0);
    return { subtotal, grandTotal: subtotal, totalItems };
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      increaseQuantity, 
      decreaseQuantity, 
      removeFromCart, 
      clearCart, 
      totals 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);