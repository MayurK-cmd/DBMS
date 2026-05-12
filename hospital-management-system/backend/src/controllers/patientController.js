import supabase from '../db/supabase.js'

// Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*')

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get patient by id
export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create patient
export const createPatient = async (req, res) => {
  try {
    const { name, email, phone, disease, address } = req.body

    const { data, error } = await supabase
      .from('patients')
      .insert([{ name, email, phone, disease, address }])
      .select()

    if (error) throw error
    res.status(201).json(data[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update patient
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, phone, disease, address } = req.body

    const { data, error } = await supabase
      .from('patients')
      .update({ name, email, phone, disease, address })
      .eq('id', id)
      .select()

    if (error) throw error
    res.json(data[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete patient
export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id)

    if (error) throw error
    res.json({ message: 'Patient deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
