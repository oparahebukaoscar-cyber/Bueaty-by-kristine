import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAdmin({ children }) {
  const { session, profile, profilesAvailable, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Development fallback: allow a specific email to act as admin when `VITE_DEV_ADMIN_EMAIL` is set.
  // This is ONLY for local testing — prefer fixing Supabase `profiles` and RLS policies.
  const devAdminEmail = import.meta.env.VITE_DEV_ADMIN_EMAIL;
  const isDevAdmin = devAdminEmail && session?.user?.email === devAdminEmail;

  const derivedRole =
    profile?.role || session?.user?.user_metadata?.role || session?.user?.app_metadata?.role || null;

  // If the new Supabase project doesn't have `profiles` yet (404), don't block the whole admin.
  // This keeps the app usable while you create the profiles table/policies.
  const allowWhenProfilesMissing = profilesAvailable === false;

  if (!isDevAdmin && derivedRole !== "admin" && !allowWhenProfilesMissing) {
    return <Navigate to="/" replace />;
  }

  return children;
}
