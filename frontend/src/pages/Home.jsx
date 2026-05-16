function Home() {
  return (
    <div className="container">
      <div className="page">
        <h2>Welcome to Hospital Management System</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          This system helps you manage patients, doctors, departments, and appointments efficiently.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginTop: '2rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
            <h3>👥 Patients</h3>
            <p>Manage patient information and medical history</p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
            <h3>👨‍⚕️ Doctors</h3>
            <p>Manage doctor details and specializations</p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
            <h3>🏢 Departments</h3>
            <p>Organize hospital departments</p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
            <h3>📅 Appointments</h3>
            <p>Schedule and manage appointments</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
