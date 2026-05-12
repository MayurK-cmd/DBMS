import supabase from '../db/supabase.js'

// Get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get doctor by id
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create doctor
export const createDoctor = async (req, res) => {
  try {
    const { name, specialization, phone, email, department_id } = req.body

    const { data, error } = await supabase
      .from('doctors')
      .insert([{ name, specialization, phone, email, department_id }])
      .select()

    if (error) throw error
    res.status(201).json(data[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update doctor
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params
    const { name, specialization, phone, email, department_id } = req.body

    const { data, error } = await supabase
      .from('doctors')
      .update({ name, specialization, phone, email, department_id })
      .eq('id', id)
      .select()

    if (error) throw error
    res.json(data[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('doctors')
      .delete()
      .eq('id', id)

    if (error) throw error
    res.json({ message: 'Doctor deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
