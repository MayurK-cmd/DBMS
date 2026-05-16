// Patient Controller
import { supabase } from '../db/supabase.js'

// Get all patients
export const getAllPatients = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('patients').select('*')
    if (error) throw error
    res.json(data)
  } catch (error) {
    console.error('Error in getAllPatients:', error)
    next(error)
  }
}

// Get patient by id
export const getPatientById = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('patients').select('*').eq('id', req.params.id).single()
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Patient not found' })
    }
    res.json(data)
  } catch (error) {
    console.error('Error in getPatientById:', error)
    next(error)
  }
}

// Create patient
export const createPatient = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('patients').insert([req.body]).select()
    if (error) throw error
    if (!data || data.length === 0) {
      throw new Error('No data returned from insert operation')
    }
    res.status(201).json(data[0])
  } catch (error) {
    console.error('Error in createPatient:', error)
    next(error)
  }
}

// Update patient
export const updatePatient = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('patients').update(req.body).eq('id', req.params.id).select()
    if (error) throw error
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Patient not found' })
    }
    res.json(data[0])
  } catch (error) {
    console.error('Error in updatePatient:', error)
    next(error)
  }
}

// Delete patient
export const deletePatient = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('patients').delete().eq('id', req.params.id)
    if (error) throw error
    if (data.length === 0) {
      return res.status(404).json({ error: 'Patient not found' })
    }
    res.json({ message: 'Patient deleted successfully' })
  } catch (error) {
    console.error('Error in deletePatient:', error)
    next(error)
  }
}
