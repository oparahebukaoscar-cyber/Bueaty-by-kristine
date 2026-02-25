import { createContext, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  // null = unknown, true = profiles query works, false = profiles table/route missing
  const [profilesAvailable, setProfilesAvailable] = useState(null);
  const [loading, setLoading] = useState(true);

  const profilesStatusRef = useRef("unknown");
  const profileLoadInFlightRef = useRef(false);

  function isProfilesMissingError(error) {
    if (!error) return false;

    // PostgREST returns PGRST205 when a table isn't in the schema cache (often surfaced as 404 in the network tab)
    if (error.code === "PGRST205") return true;

    const message = String(error.message || "");
    const hint = String(error.hint || "");

    if (error.status === 404) return true;
    if (message.includes("Could not find the table 'public.profiles'")) return true;
    if (hint.includes("table 'public.profiles'")) return true;

    return false;
  }

  async function loadProfileForUser(currentUser) {
    if (!currentUser) {
      setProfile(null);
      return;
    }

    // If you're using the dev admin email fallback, don't query `profiles` at all.
    // This avoids noisy 404/PGRST205 errors while the new Supabase project is being seeded.
    const devAdminEmail = import.meta.env.VITE_DEV_ADMIN_EMAIL;
    if (devAdminEmail && currentUser.email === devAdminEmail) {
      setProfile({ id: currentUser.id, role: "admin" });
      return;
    }

    if (profilesStatusRef.current === "unavailable") {
      setProfilesAvailable(false);
      setProfile(null);
      return;
    }

    // Avoid duplicate concurrent requests (StrictMode and auth change events can race)
    if (profileLoadInFlightRef.current) return;
    profileLoadInFlightRef.current = true;

    try {
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (error) {
        if (isProfilesMissingError(error)) {
          profilesStatusRef.current = "unavailable";
          setProfilesAvailable(false);
          setProfile(null);
          // eslint-disable-next-line no-console
          console.warn(
            "AuthContext: profiles table not found. Skipping profile lookups until DB is seeded.",
            error
          );
          return;
        }

        profilesStatusRef.current = "unknown";
        setProfilesAvailable(null);
        setProfile(null);
        // eslint-disable-next-line no-console
        console.warn("AuthContext: profile lookup failed:", error);
        return;
      }

      profilesStatusRef.current = "available";
      setProfilesAvailable(true);
      setProfile(profileData ?? null);
    } finally {
      profileLoadInFlightRef.current = false;
    }
  }

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();

      const currentSession = data?.session ?? null;
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);

      await loadProfileForUser(currentUser);

      setLoading(false);
    }

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session ?? null);
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      loadProfileForUser(currentUser);
    });

    return () => {
      try {
        listener?.subscription?.unsubscribe();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, profile, profilesAvailable, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
