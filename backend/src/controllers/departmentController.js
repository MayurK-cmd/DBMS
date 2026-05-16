
// Department Controller
import { supabase } from '../db/supabase.js'

// Get all departments
export const getAllDepartments = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('departments').select('*')
    if (error) throw error
    res.json(data)
  } catch (error) {
    console.error('Error in getAllDepartments:', error)
    next(error)
  }
}

// Get department by id
export const getDepartmentById = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('departments').select('*').eq('id', req.params.id).single()
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Department not found' })
    }
    res.json(data)
  } catch (error) {
    console.error('Error in getDepartmentById:', error)
    next(error)
  }
}

// Create department
export const createDepartment = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('departments').insert([req.body]).select()
    if (error) throw error
    if (!data || data.length === 0) {
      throw new Error('No data returned from insert operation')
    }
    res.status(201).json(data[0])
  } catch (error) {
    console.error('Error in createDepartment:', error)
    next(error)
  }
}

// Update department
export const updateDepartment = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('departments').update(req.body).eq('id', req.params.id).select()
    if (error) throw error
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Department not found' })
    }
    res.json(data[0])
  } catch (error) {
    console.error('Error in updateDepartment:', error)
    next(error)
  }
}

// Delete department
export const deleteDepartment = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('departments').delete().eq('id', req.params.id)
    if (error) throw error
    if (data.length === 0) {
      return res.status(404).json({ error: 'Department not found' })
    }
    res.json({ message: 'Department deleted successfully' })
  } catch (error) {
    console.error('Error in deleteDepartment:', error)
    next(error)
  }
}
