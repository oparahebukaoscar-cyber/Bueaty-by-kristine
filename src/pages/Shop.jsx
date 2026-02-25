import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useCart } from "../context/CartContext";
import "./Shop.css"

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")

    if (!error) setProducts(data)
    setLoading(false)
  }

  function handleAddToCart(product) {
    addToCart(product);
    navigate("/cart");
  }

  if (loading) return <p className="shop-status">Loading products...</p>

  return (
    <div className="shop-wrapper">
      <div className="shop-header">
        <h1>Shop</h1>
        <p>{products.length} Products Available</p>
      </div>

      <div className="product-grid">
        {products.map((product) => {
          const rating = product.rating || 4

          return (
            <div key={product.id} className="product-card">
              <div className="image-container">
                <img
                  src={product.image_url}
                  alt={product.name}
                />
              </div>

              <div className="product-details">
                <h3>{product.name}</h3>

                <div className="rating">
                  {[1,2,3,4,5].map((star) => (
                    <span
                      key={star}
                      className={star <= rating ? "star filled" : "star"}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="price-row">
                  {product.old_price && (
                    <span className="old-price">
                      ₦{product.old_price}
                    </span>
                  )}
                  <span className="price">
                    ₦{product.price}
                  </span>
                </div>

                <button className="add-btn" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
