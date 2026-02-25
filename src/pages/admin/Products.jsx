import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./Products.css";
import Toast from "../../components/common/Toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "wig", image_url: "" });
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });

  function isLikelyCloudinaryUrl(url) {
    const s = String(url || "").trim();
    if (!s) return true; // allow empty
    try {
      const u = new URL(s);
      // most common: https://res.cloudinary.com/<cloud>/...
      return u.hostname === "res.cloudinary.com" || u.hostname.endsWith("cloudinary.com");
    } catch {
      return false;
    }
  }

  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("fetchProducts error:", error);
      return;
    }
    setProducts(data || []);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function addProduct() {
    try {
      const image_url = String(form.image_url || "").trim() || null;
      if (!isLikelyCloudinaryUrl(image_url)) {
        setToast({ show: true, message: "Please paste a valid Cloudinary image link." });
        return;
      }

      const payload = {
        name: form.name,
        description: form.description,
        category: form.category,
        price: parseFloat(form.price || 0),
        image_url,
      };
      const { error } = await supabase.from('products').insert([payload]);
      if (error) throw error;
      setToast({ show: true, message: 'Product added' });
      setForm({ name: "", description: "", price: "", category: "wig", image_url: "" });
      fetchProducts();
    } catch (err) {
      console.error('addProduct error', err);
      const code = err?.code;
      const msg = String(err?.message || "");
      const isRlsDenied = code === "42501" || msg.toLowerCase().includes("row-level security") || msg.includes("Forbidden");
      if (isRlsDenied) {
        setToast({
          show: true,
          message:
            "Supabase blocked this action (RLS). Run supabase/migrations/20260224_000001_init_core.sql and supabase/sql/make_admin.sql in Supabase SQL Editor to create profiles + grant admin role.",
        });
        return;
      }
      setToast({ show: true, message: err?.message || 'Failed to add product' });
    }
  }

  async function startEdit(p) {
    setEditing(p);
    setForm({
      name: p.name || '',
      description: p.description || '',
      price: String(p.price || ''),
      category: p.category || 'wig',
      image_url: p.image_url || '',
    });
  }

  async function saveEdit() {
    try {
      const image_url = String(form.image_url || "").trim() || null;
      if (!isLikelyCloudinaryUrl(image_url)) {
        setToast({ show: true, message: "Please paste a valid Cloudinary image link." });
        return;
      }

      const payload = {
        name: form.name,
        description: form.description,
        category: form.category,
        price: parseFloat(form.price || 0),
        image_url,
      };
      const { error } = await supabase.from('products').update(payload).eq('id', editing.id);
      if (error) throw error;
      setToast({ show: true, message: 'Product updated' });
      setEditing(null);
      setForm({ name: "", description: "", price: "", category: "wig", image_url: "" });
      fetchProducts();
    } catch (err) {
      console.error('saveEdit error', err);
      const code = err?.code;
      const msg = String(err?.message || "");
      const isRlsDenied = code === "42501" || msg.toLowerCase().includes("row-level security") || msg.includes("Forbidden");
      if (isRlsDenied) {
        setToast({
          show: true,
          message:
            "Supabase blocked this action (RLS). Run supabase/migrations/20260224_000001_init_core.sql and supabase/sql/make_admin.sql in Supabase SQL Editor to create profiles + grant admin role.",
        });
        return;
      }
      setToast({ show: true, message: err?.message || 'Failed to update product' });
    }
  }

  async function deleteProduct(id) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('deleteProduct error', error);
      const code = error?.code;
      const msg = String(error?.message || "");
      const isRlsDenied = code === "42501" || msg.toLowerCase().includes("row-level security") || msg.includes("Forbidden");
      if (isRlsDenied) {
        setToast({
          show: true,
          message:
            "Supabase blocked this action (RLS). Run supabase/migrations/20260224_000001_init_core.sql and supabase/sql/make_admin.sql in Supabase SQL Editor to create profiles + grant admin role.",
        });
        return;
      }
      setToast({ show: true, message: error?.message || 'Failed to delete product' });
      return;
    }
    fetchProducts();
  }

  return (
    <div className="admin-products">
      <Toast show={toast.show} setShow={(s) => setToast((t) => ({ ...t, show: s }))} message={toast.message} />
      <h2 className="products-title">{editing ? 'Edit Product' : 'Products'}</h2>

      <div className="product-form">
        <input className="form-input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="form-input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="form-input" placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input className="form-input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />

        <input
          className="form-input"
          placeholder="Cloudinary Image Link (secure_url)"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
        />

        <div className="form-actions">
          {editing ? (
            <>
              <button className="btn btn-primary" onClick={saveEdit}>Save</button>
              <button className="btn" onClick={() => { setEditing(null); setForm({ name: "", description: "", price: "", category: "wig", image_url: "" }); }}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={addProduct}>Add Product</button>
          )}
        </div>
      </div>

      <ul className="product-list">
        {products?.map((p) => (
          <li key={p.id} className="product-item">
            <div className="product-card">
              {p.image_url ? <img className="product-img" src={p.image_url} alt={p.name} /> : <div className="product-img placeholder" />}
              <div className="product-info">
                <strong className="product-name">{p.name}</strong>
                <div className="product-price">₦{p.price}</div>
                <div className="product-desc">{p.description}</div>
                <div className="product-actions">
                  <button className="btn" onClick={() => startEdit(p)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => deleteProduct(p.id)}>Delete</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
