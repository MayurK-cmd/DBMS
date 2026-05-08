// ===================================
// Auth Service — Supabase Authentication
// ===================================
import { supabase } from './supabase'

/**
 * Login with email and password using Supabase Auth
 */
export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return { id: data.user.id, name: data.user.user_metadata?.name || email, email: data.user.email, role: data.user.user_metadata?.role || 'Staff' }
}

/**
 * Register a new user
 */
export const register = async (name, email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, role: 'Staff' } }
  })
  if (error) throw error
  return { id: data.user.id, name, email, role: 'Staff' }
}

/**
 * Logout current user
 */
export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * Get currently logged-in user
 */
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser()
  if (!data.user) return null
  return { id: data.user.id, name: data.user.user_metadata?.name || data.user.email, email: data.user.email, role: data.user.user_metadata?.role || 'Staff' }
}
