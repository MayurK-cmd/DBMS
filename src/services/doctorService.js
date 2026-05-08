// ===================================
// Doctor Service — Supabase CRUD
// ===================================
import { supabase } from './supabase'

/** Get all doctors with optional search */
export const getDoctors = async (search = "") => {
  let query = supabase.from('doctors').select('*').order('id', { ascending: false })
  if (search) {
    query = query.or(`name.ilike.%${search}%,specialization.ilike.%${search}%`)
  }
  const { data, error } = await query
  if (error) throw error
  return data
}

/** Get a single doctor by ID */
export const getDoctorById = async (id) => {
  const { data, error } = await supabase.from('doctors').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

/** Create a new doctor */
export const createDoctor = async (docData) => {
  const { data, error } = await supabase.from('doctors').insert([{
    name: docData.name,
    specialization: docData.specialization,
    phone: docData.phone,
    email: docData.email,
    experience: Number(docData.experience) || 0,
    availability: docData.availability || 'Mon-Fri',
    status: docData.status || 'Available',
    rating: 0
  }]).select().single()
  if (error) throw error
  return data
}

/** Update a doctor */
export const updateDoctor = async (id, updates) => {
  const dbUpdates = {}
  if (updates.name !== undefined) dbUpdates.name = updates.name
  if (updates.specialization !== undefined) dbUpdates.specialization = updates.specialization
  if (updates.phone !== undefined) dbUpdates.phone = updates.phone
  if (updates.email !== undefined) dbUpdates.email = updates.email
  if (updates.experience !== undefined) dbUpdates.experience = Number(updates.experience)
  if (updates.availability !== undefined) dbUpdates.availability = updates.availability
  if (updates.status !== undefined) dbUpdates.status = updates.status

  const { data, error } = await supabase.from('doctors').update(dbUpdates).eq('id', id).select().single()
  if (error) throw error
  return data
}

/** Delete a doctor */
export const deleteDoctor = async (id) => {
  const { error } = await supabase.from('doctors').delete().eq('id', id)
  if (error) throw error
  return true
}