import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    console.log("Submitting login", { email });
    try {
      // log before calling Supabase
      console.log("Calling supabase.auth.signInWithPassword", { email });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // log raw response (stringified for visibility)
      try { console.log("Supabase response:", JSON.stringify({ data, error })); } catch (e) { console.log("Supabase response (raw):", { data, error }); }

      if (error) {
        console.log("Supabase sign-in error", error);
        alert(error.message);
        setLoading(false);
        return;
      }

      if (data?.session) {
        navigate("/admin", { replace: true });
        return;
      }

      // If there was no error, Supabase will trigger onAuthStateChange and AuthContext
      // will update `session`. Do NOT navigate here — let the session effect handle it.
      console.log("Login submitted to Supabase; awaiting session update");
    } catch (err) {
      console.error("signInWithPassword threw:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session) {
      // When the AuthContext observes a session, navigate to /admin
      navigate("/admin", { replace: true });
    }
  }, [session, navigate]);

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Admin Sign In</h2>
        <form onSubmit={handleLogin}>
          <input
            name="email"
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            name="password"
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
