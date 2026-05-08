// ===================================
// Patient Service — Supabase CRUD
// ===================================
import { supabase } from './supabase'

/** Get all patients, with optional search filter */
export const getPatients = async (search = "") => {
  let query = supabase.from('patients').select('*').order('id', { ascending: false })
  if (search) {
    query = query.or(`name.ilike.%${search}%,condition.ilike.%${search}%,phone.ilike.%${search}%`)
  }
  const { data, error } = await query
  if (error) throw error
  return data
}

/** Get a single patient by ID */
export const getPatientById = async (id) => {
  const { data, error } = await supabase.from('patients').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

/** Create a new patient */
export const createPatient = async (patientData) => {
  // Map frontend field names to DB column names
  const dbData = {
    name: patientData.name,
    age: Number(patientData.age),
    gender: patientData.gender,
    blood_group: patientData.bloodGroup,
    phone: patientData.phone,
    email: patientData.email,
    address: patientData.address,
    condition: patientData.condition,
    status: patientData.status || 'Active',
    admit_date: patientData.admitDate || new Date().toISOString().split('T')[0]
  }
  const { data, error } = await supabase.from('patients').insert([dbData]).select().single()
  if (error) throw error
  return mapPatient(data)
}

/** Update an existing patient */
export const updatePatient = async (id, updates) => {
  const dbUpdates = {}
  if (updates.name !== undefined) dbUpdates.name = updates.name
  if (updates.age !== undefined) dbUpdates.age = Number(updates.age)
  if (updates.gender !== undefined) dbUpdates.gender = updates.gender
  if (updates.bloodGroup !== undefined) dbUpdates.blood_group = updates.bloodGroup
  if (updates.phone !== undefined) dbUpdates.phone = updates.phone
  if (updates.email !== undefined) dbUpdates.email = updates.email
  if (updates.address !== undefined) dbUpdates.address = updates.address
  if (updates.condition !== undefined) dbUpdates.condition = updates.condition
  if (updates.status !== undefined) dbUpdates.status = updates.status

  const { data, error } = await supabase.from('patients').update(dbUpdates).eq('id', id).select().single()
  if (error) throw error
  return mapPatient(data)
}

/** Delete a patient */
export const deletePatient = async (id) => {
  const { error } = await supabase.from('patients').delete().eq('id', id)
  if (error) throw error
  return true
}

/** Map DB snake_case columns to frontend camelCase */
function mapPatient(row) {
  return {
    id: row.id,
    name: row.name,
    age: row.age,
    gender: row.gender,
    bloodGroup: row.blood_group,
    phone: row.phone,
    email: row.email,
    address: row.address,
    condition: row.condition,
    status: row.status,
    admitDate: row.admit_date
  }
}