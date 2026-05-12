import { useState, useEffect } from 'react'
import { doctorAPI, departmentAPI } from '../services/api'

function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({ name: '', specialization: '', phone: '', email: '', department_id: '' })
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadDoctors()
    loadDepartments()
  }, [])

  const loadDoctors = async () => {
    try {
      const response = await doctorAPI.getAll()
      setDoctors(response.data)
    } catch (error) {
      showMessage('error', 'Failed to load doctors')
    }
  }

  const loadDepartments = async () => {
    try {
      const response = await departmentAPI.getAll()
      setDepartments(response.data)
    } catch (error) {
      showMessage('error', 'Failed to load departments')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await doctorAPI.update(editingId, formData)
        showMessage('success', 'Doctor updated successfully')
        setEditingId(null)
      } else {
        await doctorAPI.create(formData)
        showMessage('success', 'Doctor added successfully')
      }
      setFormData({ name: '', specialization: '', phone: '', email: '', department_id: '' })
      loadDoctors()
    } catch (error) {
      showMessage('error', 'Failed to save doctor')
    }
  }

  const handleEdit = (doctor) => {
    setFormData(doctor)
    setEditingId(doctor.id)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await doctorAPI.delete(id)
        showMessage('success', 'Doctor deleted successfully')
        loadDoctors()
      } catch (error) {
        showMessage('error', 'Failed to delete doctor')
      }
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const getDepartmentName = (id) => {
    const dept = departments.find(d => d.id === id)
    return dept ? dept.name : 'Unknown'
  }

  return (
    <div className="container">
      <div className="page">
        <h2>👨‍⚕️ Doctors Management</h2>

        {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Specialization</label>
              <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Department</label>
            <select name="department_id" value={formData.department_id} onChange={handleChange} required>
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-success">
            {editingId ? 'Update Doctor' : 'Add Doctor'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', specialization: '', phone: '', email: '', department_id: '' }) }}>
              Cancel
            </button>
          )}
        </form>

        <h3 style={{ marginTop: '2rem' }}>Doctors List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doctor => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.email}</td>
                <td>{getDepartmentName(doctor.department_id)}</td>
                <td>
                  <button onClick={() => handleEdit(doctor)}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(doctor.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Doctors
