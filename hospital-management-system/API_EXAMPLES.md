# API Request Examples

## Base URL
```
http://localhost:5000/api
```

## Health Check
```bash
curl http://localhost:5000/api/health
```

## Patients

### Get All Patients
```bash
curl http://localhost:5000/api/patients
```

### Get Single Patient
```bash
curl http://localhost:5000/api/patients/1
```

### Create Patient
```bash
curl -X POST http://localhost:5000/api/patients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-0100",
    "disease": "Hypertension",
    "address": "123 Main St"
  }'
```

### Update Patient
```bash
curl -X PUT http://localhost:5000/api/patients/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john.smith@example.com",
    "phone": "555-0101",
    "disease": "Hypertension",
    "address": "456 Oak Ave"
  }'
```

### Delete Patient
```bash
curl -X DELETE http://localhost:5000/api/patients/1
```

## Departments

### Get All Departments
```bash
curl http://localhost:5000/api/departments
```

### Get Single Department
```bash
curl http://localhost:5000/api/departments/1
```

### Create Department
```bash
curl -X POST http://localhost:5000/api/departments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cardiology",
    "description": "Heart and cardiovascular disease treatment",
    "head": "Dr. Smith",
    "phone": "555-0200"
  }'
```

### Update Department
```bash
curl -X PUT http://localhost:5000/api/departments/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cardiology",
    "description": "Specialized cardiac care and treatment",
    "head": "Dr. Johnson",
    "phone": "555-0201"
  }'
```

### Delete Department
```bash
curl -X DELETE http://localhost:5000/api/departments/1
```

## Doctors

### Get All Doctors
```bash
curl http://localhost:5000/api/doctors
```

### Get Single Doctor
```bash
curl http://localhost:5000/api/doctors/1
```

### Create Doctor
```bash
curl -X POST http://localhost:5000/api/doctors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Sarah Johnson",
    "specialization": "Cardiology",
    "phone": "555-0300",
    "email": "sarah@hospital.com",
    "department_id": 1
  }'
```

### Update Doctor
```bash
curl -X PUT http://localhost:5000/api/doctors/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Sarah Johnson",
    "specialization": "Pediatric Cardiology",
    "phone": "555-0301",
    "email": "sarah.j@hospital.com",
    "department_id": 1
  }'
```

### Delete Doctor
```bash
curl -X DELETE http://localhost:5000/api/doctors/1
```

## Appointments

### Get All Appointments
```bash
curl http://localhost:5000/api/appointments
```

### Get Single Appointment
```bash
curl http://localhost:5000/api/appointments/1
```

### Create Appointment
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patient_id": 1,
    "doctor_id": 1,
    "appointment_date": "2024-12-25",
    "appointment_time": "14:30",
    "status": "scheduled"
  }'
```

### Update Appointment
```bash
curl -X PUT http://localhost:5000/api/appointments/1 \
  -H "Content-Type: application/json" \
  -d '{
    "patient_id": 1,
    "doctor_id": 2,
    "appointment_date": "2024-12-26",
    "appointment_time": "10:00",
    "status": "completed"
  }'
```

### Delete Appointment
```bash
curl -X DELETE http://localhost:5000/api/appointments/1
```

## Using with JavaScript/Axios

```javascript
import axios from 'axios'

const API_BASE = 'http://localhost:5000/api'

// Get all patients
const getPatients = async () => {
  const response = await axios.get(`${API_BASE}/patients`)
  console.log(response.data)
}

// Create new patient
const createPatient = async () => {
  const response = await axios.post(`${API_BASE}/patients`, {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '555-0400',
    disease: 'Diabetes',
    address: '789 Elm St'
  })
  console.log(response.data)
}

// Update patient
const updatePatient = async (id) => {
  const response = await axios.put(`${API_BASE}/patients/${id}`, {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '555-0401',
    disease: 'Type 2 Diabetes',
    address: '789 Elm St'
  })
  console.log(response.data)
}

// Delete patient
const deletePatient = async (id) => {
  const response = await axios.delete(`${API_BASE}/patients/${id}`)
  console.log(response.data)
}
```

## Response Format

### Success Response (200, 201)
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-0100",
  "disease": "Hypertension",
  "address": "123 Main St",
  "created_at": "2024-05-10T10:30:00"
}
```

### Error Response (500)
```json
{
  "error": "Error message describing what went wrong"
}
```

## Testing Tips

1. **Use Postman** or **Insomnia** for testing API endpoints
2. **Check browser console** for frontend errors
3. **Check terminal** for backend errors
4. **Verify Supabase connection** by checking backend console on startup
5. **Test in order**: Create Department → Create Doctor (with Department) → Create Patient → Create Appointment

---

For more details, see [README.md](./README.md)
