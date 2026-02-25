import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  return { products };
};

export default useProducts;
