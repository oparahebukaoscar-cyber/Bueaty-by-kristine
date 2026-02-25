import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await supabase
        .from("orders")
        .select(`*, order_items(*)`);

      setOrders(data);
    }

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>

      {orders?.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Total: ₦{order.total_amount}</p>

          <ul>
            {order.order_items?.map((item, index) => (
              <li key={index}>
                {item.product_name} — Qty: {item.quantity} — ₦{item.subtotal}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
