import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const ProductGrid = ({ products }) => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="product-grid">

      {products.map((product) => (
        <ProductCard key={product.id} product={product} onView={setSelected} />
      ))}

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
};

export default ProductGrid;
