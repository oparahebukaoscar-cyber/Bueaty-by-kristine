import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Dashboard.css";

export default function Dashboard() {
  // eslint-disable-next-line no-console
  console.log("Admin Dashboard Loaded");

  const [stats, setStats] = useState({
    orders: 24,
    revenue: "$3,250",
    customers: 18,
  });

  // placeholder fetch for future Supabase integration
  useEffect(() => {
    async function loadCounts() {
      try {
        // keep original fetch commented for future use
        // const { count: products } = await supabase.from('products').select('*', { count: 'exact', head: true });
        // setStats({ ...stats, products });
      } catch (err) {
        // ignore for now
      }
    }
    loadCounts();
  }, []);

  const recentOrders = [
    { id: "#1234", customer: "Jane Doe", email: "jane@email.com", status: "Pending" },
    { id: "#1235", customer: "John Smith", email: "john@email.com", status: "Completed" },
    { id: "#1236", customer: "Alice Lee", email: "alice@email.com", status: "Processing" },
  ];

  const products = [
    { name: "Silky Wig", price: "$120", stock: 12 },
    { name: "Clip-in Extensions", price: "$80", stock: 5 },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="admin-logo">Admin Panel</h2>
        <nav>
          <ul className="admin-nav">
            <li>
              <NavLink to="/admin" end className={({ isActive }) => (isActive ? "active" : "")}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? "active" : "")}>Orders</NavLink>
            </li>
            <li>
              <NavLink to="/admin/products" className={({ isActive }) => (isActive ? "active" : "")}>Products</NavLink>
            </li>
            <li>
              <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active" : "")}>Customers</NavLink>
            </li>
            <li>
              <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>Settings</NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button className="sidebar-toggle" onClick={() => setSidebarOpen((s) => !s)} aria-label="Toggle sidebar">☰</button>
            <h1>Dashboard Overview</h1>
          </div>
          <div className="admin-user">Admin</div>
        </header>

        <section className="admin-cards">
          <div className="card">
            <h3>Total Orders</h3>
            <p className="stat">{stats.orders}</p>
          </div>
          <div className="card">
            <h3>Total Revenue</h3>
            <p className="stat">{stats.revenue}</p>
          </div>
          <div className="card">
            <h3>Total Customers</h3>
            <p className="stat">{stats.customers}</p>
          </div>
        </section>

        <section className="admin-section">
          <h2>Recent Orders</h2>
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.customer}</td>
                    <td>{r.email}</td>
                    <td>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-section">
          <h2>Products</h2>
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* overlay when sidebar open on mobile */}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
