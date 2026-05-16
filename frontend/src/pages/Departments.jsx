import { useState, useEffect } from 'react'
import { departmentAPI } from '../services/api'

function Departments() {
  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({ name: '', description: '', head: '', phone: '' })
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadDepartments()
  }, [])

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
        await departmentAPI.update(editingId, formData)
        showMessage('success', 'Department updated successfully')
        setEditingId(null)
      } else {
        await departmentAPI.create(formData)
        showMessage('success', 'Department added successfully')
      }
      setFormData({ name: '', description: '', head: '', phone: '' })
      loadDepartments()
    } catch (error) {
      showMessage('error', 'Failed to save department')
    }
  }

  const handleEdit = (department) => {
    setFormData(department)
    setEditingId(department.id)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await departmentAPI.delete(id)
        showMessage('success', 'Department deleted successfully')
        loadDepartments()
      } catch (error) {
        showMessage('error', 'Failed to delete department')
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
        <h2>🏢 Departments Management</h2>

        {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Department Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Department Head</label>
              <input type="text" name="head" value={formData.head} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" required></textarea>
          </div>

          <button type="submit" className="btn-success">
            {editingId ? 'Update Department' : 'Add Department'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', description: '', head: '', phone: '' }) }}>
              Cancel
            </button>
          )}
        </form>

        <h3 style={{ marginTop: '2rem' }}>Departments List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Head</th>
              <th>Phone</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(department => (
              <tr key={department.id}>
                <td>{department.id}</td>
                <td>{department.name}</td>
                <td>{department.head}</td>
                <td>{department.phone}</td>
                <td>{department.description}</td>
                <td>
                  <button onClick={() => handleEdit(department)}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(department.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Departments
