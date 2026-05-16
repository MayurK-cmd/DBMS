import { useState, useEffect } from 'react'
import { appointmentAPI, patientAPI, doctorAPI } from '../services/api'

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [formData, setFormData] = useState({ patient_id: '', doctor_id: '', appointment_date: '', appointment_time: '', status: 'scheduled' })
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadAppointments()
    loadPatients()
    loadDoctors()
  }, [])

  const loadAppointments = async () => {
    try {
      const response = await appointmentAPI.getAll()
      setAppointments(response.data)
    } catch (error) {
      showMessage('error', 'Failed to load appointments')
    }
  }

  const loadPatients = async () => {
    try {
      const response = await patientAPI.getAll()
      setPatients(response.data)
    } catch (error) {
      showMessage('error', 'Failed to load patients')
    }
  }

  const loadDoctors = async () => {
    try {
      const response = await doctorAPI.getAll()
      setDoctors(response.data)
    } catch (error) {
      showMessage('error', 'Failed to load doctors')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await appointmentAPI.update(editingId, formData)
        showMessage('success', 'Appointment updated successfully')
        setEditingId(null)
      } else {
        await appointmentAPI.create(formData)
        showMessage('success', 'Appointment scheduled successfully')
      }
      setFormData({ patient_id: '', doctor_id: '', appointment_date: '', appointment_time: '', status: 'scheduled' })
      loadAppointments()
    } catch (error) {
      showMessage('error', 'Failed to save appointment')
    }
  }

  const handleEdit = (appointment) => {
    setFormData(appointment)
    setEditingId(appointment.id)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await appointmentAPI.delete(id)
        showMessage('success', 'Appointment deleted successfully')
        loadAppointments()
      } catch (error) {
        showMessage('error', 'Failed to delete appointment')
      }
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const getPatientName = (id) => {
    const patient = patients.find(p => p.id === id)
    return patient ? patient.name : 'Unknown'
  }

  const getDoctorName = (id) => {
    const doctor = doctors.find(d => d.id === id)
    return doctor ? doctor.name : 'Unknown'
  }

  return (
    <div className="container">
      <div className="page">
        <h2>📅 Appointments Management</h2>

        {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Patient</label>
              <select name="patient_id" value={formData.patient_id} onChange={handleChange} required>
                <option value="">Select Patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Doctor</label>
              <select name="doctor_id" value={formData.doctor_id} onChange={handleChange} required>
                <option value="">Select Doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Appointment Date</label>
              <input type="date" name="appointment_date" value={formData.appointment_date} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Appointment Time</label>
              <input type="time" name="appointment_time" value={formData.appointment_time} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <button type="submit" className="btn-success">
            {editingId ? 'Update Appointment' : 'Schedule Appointment'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setFormData({ patient_id: '', doctor_id: '', appointment_date: '', appointment_time: '', status: 'scheduled' }) }}>
              Cancel
            </button>
          )}
        </form>

        <h3 style={{ marginTop: '2rem' }}>Appointments List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{getPatientName(appointment.patient_id)}</td>
                <td>{getDoctorName(appointment.doctor_id)}</td>
                <td>{appointment.appointment_date}</td>
                <td>{appointment.appointment_time}</td>
                <td>{appointment.status}</td>
                <td>
                  <button onClick={() => handleEdit(appointment)}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(appointment.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Appointments
