import { supabase } from "../supabaseClient";

export const createOrder = async (payload) => {
  if (!payload || typeof payload !== "object") {
    return { data: null, error: new Error("Invalid payload") };
  }

  try {
    console.log("Invoking Edge Function 'create-order' with payload:", payload);

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      return { data: null, error: new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY") };
    }

    const token = (await supabase.auth.getSession()).data.session?.access_token ?? null;

    // Always send a bearer token:
    // - If the user is logged in, send their access token.
    // - Otherwise, send the anon key (it is also a JWT signed by the project).
    // This works whether the deployed function uses verify_jwt=true or verify_jwt=false.
    const bearer = token || supabaseAnonKey;

    const headers = {
      "Content-Type": "application/json",
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${bearer}`,
    };

    const res = await fetch(`${supabaseUrl}/functions/v1/create-order`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      const detail = (data && (data.error || data.message || data.detail)) || "";
      const error = new Error(detail || `Edge Function failed (${res.status})`);
      error.status = res.status;
      error.body = data;

      if (res.status === 401 && String(detail).toLowerCase().includes("jwt")) {
        error.message =
          "create-order is rejecting the JWT. Deploy the Edge Function with verify_jwt=false (supabase/functions/create-order/config.toml), then try again.";
      }

      console.error("create-order function error details:", {
        status: res.status,
        statusText: res.statusText,
        body: data,
      });
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};