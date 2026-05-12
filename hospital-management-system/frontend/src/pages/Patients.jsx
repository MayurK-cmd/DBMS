import { useState, useEffect } from 'react'
import { patientAPI } from '../services/api'

function Patients() {
  const [patients, setPatients] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', disease: '', address: '' })
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    try {
      const response = await patientAPI.getAll()
      setPatients(response.data)
    } catch (error) {
      showMessage('error', 'Failed to load patients')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await patientAPI.update(editingId, formData)
        showMessage('success', 'Patient updated successfully')
        setEditingId(null)
      } else {
        await patientAPI.create(formData)
        showMessage('success', 'Patient added successfully')
      }
      setFormData({ name: '', email: '', phone: '', disease: '', address: '' })
      loadPatients()
    } catch (error) {
      showMessage('error', 'Failed to save patient')
    }
  }

  const handleEdit = (patient) => {
    setFormData(patient)
    setEditingId(patient.id)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await patientAPI.delete(id)
        showMessage('success', 'Patient deleted successfully')
        loadPatients()
      } catch (error) {
        showMessage('error', 'Failed to delete patient')
      }
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  return (
    <div className="container">
      <div className="page">
        <h2>👥 Patients Management</h2>

        {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Disease</label>
              <input type="text" name="disease" value={formData.disease} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} rows="3" required></textarea>
          </div>

          <button type="submit" className="btn-success">
            {editingId ? 'Update Patient' : 'Add Patient'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', email: '', phone: '', disease: '', address: '' }) }}>
              Cancel
            </button>
          )}
        </form>

        <h3 style={{ marginTop: '2rem' }}>Patients List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Disease</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>{patient.disease}</td>
                <td>{patient.address}</td>
                <td>
                  <button onClick={() => handleEdit(patient)}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(patient.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Patients
