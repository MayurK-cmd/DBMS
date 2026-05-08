// ===================================
// Auth Context — Manages user authentication state
// ===================================
// Uses Supabase Auth for login/register/logout.
// Falls back gracefully if Supabase is not configured.

import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";
import { supabase, isSupabaseConfigured } from "../services/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing Supabase session on mount
  useEffect(() => {
    let subscription = null;

    const init = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.warn("[Auth] Session check failed:", err.message);
        setUser(null);
      }
      setLoading(false);

      // Listen for Supabase auth state changes (login/logout from other tabs)
      if (isSupabaseConfigured) {
        try {
          const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
              setUser({
                id: session.user.id,
                name: session.user.user_metadata?.name || session.user.email,
                email: session.user.email,
                role: session.user.user_metadata?.role || 'Staff'
              });
            } else if (event === 'SIGNED_OUT') {
              setUser(null);
            }
          });
          subscription = data?.subscription;
        } catch (err) {
          console.warn("[Auth] Could not set up auth listener:", err.message);
        }
      }
    };

    init();

    return () => {
      if (subscription) {
        try { subscription.unsubscribe(); } catch {}
      }
    };
  }, []);

  const login = async (email, password) => {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = async (name, email, password) => {
    const newUser = await authService.register(name, email, password);
    setUser(newUser);
    return newUser;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = { user, loading, login, register, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
