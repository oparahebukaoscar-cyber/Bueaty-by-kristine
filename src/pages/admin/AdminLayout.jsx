import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  // Keep layout minimal — Dashboard implements its own admin layout.
  return <Outlet />;
}
