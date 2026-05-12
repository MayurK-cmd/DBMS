import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import patientRoutes from './src/routes/patientRoutes.js'
import doctorRoutes from './src/routes/doctorRoutes.js'
import departmentRoutes from './src/routes/departmentRoutes.js'
import appointmentRoutes from './src/routes/appointmentRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/patients', patientRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/departments', departmentRoutes)
app.use('/api/appointments', appointmentRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Hospital Management Backend running on http://localhost:${PORT}`)
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`)
})
