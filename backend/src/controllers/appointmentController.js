// Appointment Controller
import { supabase } from '../db/supabase.js'

// Get all appointments
export const getAllAppointments = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('appointments').select('*')
    if (error) throw error
    res.json(data)
  } catch (error) {
    console.error('Error in getAllAppointments:', error)
    next(error)
  }
}

// Get appointment by id
export const getAppointmentById = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('appointments').select('*').eq('id', req.params.id).single()
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Appointment not found' })
    }
    res.json(data)
  } catch (error) {
    console.error('Error in getAppointmentById:', error)
    next(error)
  }
}

// Create appointment
export const createAppointment = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('appointments').insert([req.body]).select()
    if (error) throw error
    if (!data || data.length === 0) {
      throw new Error('No data returned from insert operation')
    }
    res.status(201).json(data[0])
  } catch (error) {
    console.error('Error in createAppointment:', error)
    next(error)
  }
}

// Update appointment
export const updateAppointment = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('appointments').update(req.body).eq('id', req.params.id).select()
    if (error) throw error
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' })
    }
    res.json(data[0])
  } catch (error) {
    console.error('Error in updateAppointment:', error)
    next(error)
  }
}

// Delete appointment
export const deleteAppointment = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('appointments').delete().eq('id', req.params.id)
    if (error) throw error
    if (data.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' })
    }
    res.json({ message: 'Appointment deleted successfully' })
  } catch (error) {
    console.error('Error in deleteAppointment:', error)
    next(error)
  }
}
