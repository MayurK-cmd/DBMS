import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <h1>🏥 Hospital Management System</h1>
      <ul className="nav-links">
        <li><a onClick={() => navigate('/')}>Home</a></li>
        <li><a onClick={() => navigate('/patients')}>Patients</a></li>
        <li><a onClick={() => navigate('/doctors')}>Doctors</a></li>
        <li><a onClick={() => navigate('/appointments')}>Appointments</a></li>
        <li><a onClick={() => navigate('/departments')}>Departments</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
