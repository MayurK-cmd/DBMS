// Doctor Controller
import { supabase } from '../db/supabase.js'

// Get all doctors
export const getAllDoctors = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('doctors').select('*')
    if (error) throw error
    res.json(data)
  } catch (error) {
    console.error('Error in getAllDoctors:', error)
    next(error)
  }
}

// Get doctor by id
export const getDoctorById = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('doctors').select('*').eq('id', req.params.id).single()
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Doctor not found' })
    }
    res.json(data)
  } catch (error) {
    console.error('Error in getDoctorById:', error)
    next(error)
  }
}

// Create doctor
export const createDoctor = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('doctors').insert([req.body]).select()
    if (error) throw error
    if (!data || data.length === 0) {
      throw new Error('No data returned from insert operation')
    }
    res.status(201).json(data[0])
  } catch (error) {
    console.error('Error in createDoctor:', error)
    next(error)
  }
}

// Update doctor
export const updateDoctor = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('doctors').update(req.body).eq('id', req.params.id).select()
    if (error) throw error
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Doctor not found' })
    }
    res.json(data[0])
  } catch (error) {
    console.error('Error in updateDoctor:', error)
    next(error)
  }
}

// Delete doctor
export const deleteDoctor = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('doctors').delete().eq('id', req.params.id)
    if (error) throw error
    if (data.length === 0) {
      return res.status(404).json({ error: 'Doctor not found' })
    }
    res.json({ message: 'Doctor deleted successfully' })
  } catch (error) {
    console.error('Error in deleteDoctor:', error)
    next(error)
  }
}
