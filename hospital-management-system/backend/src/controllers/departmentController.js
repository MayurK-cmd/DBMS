import supabase from '../db/supabase.js'

// Get all departments
export const getAllDepartments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('departments')
      .select('*')

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get department by id
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create department
export const createDepartment = async (req, res) => {
  try {
    const { name, description, head, phone } = req.body

    const { data, error } = await supabase
      .from('departments')
      .insert([{ name, description, head, phone }])
      .select()

    if (error) throw error
    res.status(201).json(data[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update department
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, head, phone } = req.body

    const { data, error } = await supabase
      .from('departments')
      .update({ name, description, head, phone })
      .eq('id', id)
      .select()

    if (error) throw error
    res.json(data[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete department
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('departments')
      .delete()
      .eq('id', id)

    if (error) throw error
    res.json({ message: 'Department deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
