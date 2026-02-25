import React from 'react';
import "./Products.css";
import StarRating from "./StarRating";
import { useCart } from '../../context/CartContext';

const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  if (!product) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <img src={product.image} alt={product.name} />

        <div className="modal-info">
          <h2>{product.name}</h2>

          <StarRating rating={product.rating} />

          <p>{product.description}</p>

          <h3>₦{product.price}</h3>

          <button
            onClick={() => {
              try { console.log('ADDING:', product); } catch (e) {}
              if (addToCart) addToCart(product);
            }}
            className="add-btn"
          >
            Add to Cart
          </button>

          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
