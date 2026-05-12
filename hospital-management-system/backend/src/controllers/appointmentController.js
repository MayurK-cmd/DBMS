import supabase from '../db/supabase.js'

// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get appointment by id
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create appointment
export const createAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, appointment_date, appointment_time, status } = req.body

    const { data, error } = await supabase
      .from('appointments')
      .insert([{ patient_id, doctor_id, appointment_date, appointment_time, status }])
      .select()

    if (error) throw error
    res.status(201).json(data[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update appointment
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const { patient_id, doctor_id, appointment_date, appointment_time, status } = req.body

    const { data, error } = await supabase
      .from('appointments')
      .update({ patient_id, doctor_id, appointment_date, appointment_time, status })
      .eq('id', id)
      .select()

    if (error) throw error
    res.json(data[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id)

    if (error) throw error
    res.json({ message: 'Appointment deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
