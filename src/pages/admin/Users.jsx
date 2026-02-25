import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        if (error.status === 404) {
          setError("Profiles table is missing in this Supabase project.");
          setUsers([]);
          return;
        }
        setError(error.message || "Failed to load users");
        setUsers([]);
        return;
      }
      setError(null);
      setUsers(data || []);
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {error && <p>{error}</p>}
      {users?.map((u) => (
        <div key={u.id}>
          {u.full_name} - {u.role}
        </div>
      ))}
    </div>
  );
}
