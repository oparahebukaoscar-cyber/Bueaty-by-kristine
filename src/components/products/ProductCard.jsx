import React from "react";
import "./Products.css";
import StarRating from "./StarRating";
import { useCart } from "../../context/CartContext";

const SALE_IDS = new Set([2, 5, 9, 15]); // Products on sale

const formatPrice = (v) => {
  if (v == null) return "";
  const n = Number(v) || 0;
  return `₦${n.toLocaleString('en-NG')}`;
};

const ProductCard = ({ product }) => {
  const hasSale = SALE_IDS.has(product.id);
  const { addToCart } = useCart();

  // Price Calculation Logic
  const numPrice = Number(String(product.price).replace(/[^0-9.]/g, "")) || 0;
  const discountPct = hasSale ? 20 : 0;
  const discountedPrice = discountPct ? Math.round(numPrice * (1 - discountPct / 100)) : null;

  const handleAddToCart = (e) => {
    // Prevent the click from bubbling up (useful if the whole card is a link)
    e.preventDefault();
    e.stopPropagation();

    // Prepare the object to match the Cart's expected format
    const productToAdd = {
      ...product,
      // If there's a sale, we pass the discounted price to the cart
      price: hasSale ? formatPrice(discountedPrice) : product.price,
      rawPrice: hasSale ? discountedPrice : numPrice
    };

    console.log("Adding to Cart:", productToAdd);
    
    if (addToCart) {
      addToCart(productToAdd);
      // Optional: Add a small toast or alert here to show success
    } else {
      console.error("CartContext not found! Check if CartProvider is in App.jsx");
    }
  };

  return (
    <div className="product-card group relative">
      {hasSale && <div className="sale-badge">-{discountPct}%</div>}

      <div className="image-wrap relative">
        <img 
          loading="lazy" 
          src={product.image} 
          alt={product.name} 
          className="product-image" 
        />
        {/* We add pointer-events-none so the overlay doesn't block the button click */}
        <div className="glass-overlay pointer-events-none" style={{ pointerEvents: 'none' }} />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="rating-row">
          <StarRating rating={product.rating} />
        </div>

        <div className="price-row">
          {hasSale ? (
            <>
              <span className="original-price text-gray-400 line-through mr-2">
                {product.price}
              </span>
              <span className="discount-price text-primary font-bold">
                {formatPrice(discountedPrice)}
              </span>
            </>
          ) : (
            <span className="price font-bold">{product.price}</span>
          )}
        </div>

        <div className="product-buttons mt-4">
          <button
            onClick={handleAddToCart}
            type="button"
            aria-label={`Add ${product.name} to cart`}
            className="w-full py-2 text-sm font-semibold bg-black text-white rounded-lg hover:bg-primary hover:border-primary border border-black transition-all duration-300 active:scale-95"
            style={{ position: 'relative', zIndex: 50 }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;