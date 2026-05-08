// ===================================
// Appointment Service — Supabase CRUD
// ===================================
import { supabase } from './supabase'

/** Get all appointments with optional filters */
export const getAppointments = async (filters = {}) => {
  let query = supabase.from('appointments').select('*').order('date', { ascending: false })

  if (filters.status) {
    query = query.eq('status', filters.status)
  }
  if (filters.date) {
    query = query.eq('date', filters.date)
  }
  const { data, error } = await query
  if (error) throw error

  // Map DB columns to frontend field names
  let results = data.map(mapAppointment)

  // Client-side search filter (searches across patient/doctor names)
  if (filters.search) {
    const q = filters.search.toLowerCase()
    results = results.filter(a =>
      (a.patientName || '').toLowerCase().includes(q) ||
      (a.doctorName || '').toLowerCase().includes(q)
    )
  }
  return results
}

/** Get a single appointment */
export const getAppointmentById = async (id) => {
  const { data, error } = await supabase.from('appointments').select('*').eq('id', id).single()
  if (error) throw error
  return mapAppointment(data)
}

/** Create a new appointment */
export const createAppointment = async (apptData) => {
  const { data, error } = await supabase.from('appointments').insert([{
    patient_name: apptData.patientName,
    doctor_name: apptData.doctorName,
    date: apptData.date,
    time: apptData.time,
    type: apptData.type || 'Consultation',
    status: apptData.status || 'Scheduled',
    notes: apptData.notes
  }]).select().single()
  if (error) throw error
  return mapAppointment(data)
}

/** Update an appointment */
export const updateAppointment = async (id, updates) => {
  const dbUpdates = {}
  if (updates.patientName !== undefined) dbUpdates.patient_name = updates.patientName
  if (updates.doctorName !== undefined) dbUpdates.doctor_name = updates.doctorName
  if (updates.date !== undefined) dbUpdates.date = updates.date
  if (updates.time !== undefined) dbUpdates.time = updates.time
  if (updates.type !== undefined) dbUpdates.type = updates.type
  if (updates.status !== undefined) dbUpdates.status = updates.status
  if (updates.notes !== undefined) dbUpdates.notes = updates.notes

  const { data, error } = await supabase.from('appointments').update(dbUpdates).eq('id', id).select().single()
  if (error) throw error
  return mapAppointment(data)
}

/** Delete an appointment */
export const deleteAppointment = async (id) => {
  const { error } = await supabase.from('appointments').delete().eq('id', id)
  if (error) throw error
  return true
}

/** Map DB snake_case to frontend camelCase */
function mapAppointment(row) {
  return {
    id: row.id,
    patientName: row.patient_name,
    doctorName: row.doctor_name,
    date: row.date,
    time: row.time,
    type: row.type,
    status: row.status,
    notes: row.notes
  }
}
