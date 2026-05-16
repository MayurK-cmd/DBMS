# Hospital Management System

A full-stack hospital management system built with React, Node.js/Express, and Supabase. This system allows managing patients, doctors, departments, and appointments in a hospital setting.

## ✨ Features

- **Patient Management**: Add, view, update, and delete patient records
- **Doctor Management**: Manage doctor information and specializations
- **Department Management**: Organize hospital departments
- **Appointment Scheduling**: Schedule and manage patient appointments
- **Responsive Design**: Works on desktop and mobile devices
- **RESTful API**: Well-documented backend API
- **Supabase Integration**: PostgreSQL database with real-time capabilities

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Supabase** - Database and authentication (PostgreSQL-based)
- **CORS** - Cross-origin resource sharing middleware
- **Dotenv** - Environment variable management

### Database
- **Supabase (PostgreSQL)** - Relational database
- **Tables**: Patients, Doctors, Departments, Appointments
- **Relationships**: 
  - Departments ← Doctors → Appointments ← Patients

## 📁 Project Structure

```
hospital-management-system/
├── backend/                  # Node.js/Express server
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── routes/           # API route definitions
│   │   └── db/               # Database connection (Supabase)
│   ├── server.js             # Express app entry point
│   ├── .env                  # Environment variables
│   ├── package.json          # Backend dependencies
│   └── package-lock.json
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Shared UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service layer
│   │   ├── App.jsx           # Root app component
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Static assets
│   ├── index.html            # HTML template
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   └── package-lock.json
├── docs/                     # Documentation
│   ├── API_EXAMPLES.md       # API usage examples
│   ├── QUICKSTART.md         # Quick start guide
│   └── SUPABASE_SETUP.md     # Supabase setup instructions
├── package.json              # Root package.json
└── README.md                 # This file
```

## 🚀 Quick Start

Follow these steps to get the system running locally:

### Prerequisites
- Node.js (v16+ recommended)
- Supabase account (free tier available at [supabase.com](https://supabase.com))

### 1. Setup Supabase Database
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your Project URL and anon public key from **Settings → API**
3. Execute the SQL scripts from `docs/SUPABASE_SETUP.md` to create tables:
   - `departments`
   - `doctors`  
   - `patients`
   - `appointments`
4. (Optional) Configure Row Level Security (RLS) policies for production

### 2. Setup Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase credentials:
# SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_KEY=your_anon_public_key
# PORT=5000

npm install
npm run dev  # Backend runs on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev  # Frontend runs on http://localhost:5173
```

### 4. Access the Application
Open your browser to: **http://localhost:5173**

## 📖 Detailed Documentation

For more detailed information, refer to the documentation in the `docs/` directory:

- [QUICKSTART.md](docs/QUICKSTART.md) - Step-by-step setup guide
- [SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md) - Detailed Supabase setup instructions
- [API_EXAMPLES.md](docs/API_EXAMPLES.md) - API request/response examples

## 🔧 API Endpoints

The backend provides RESTful API endpoints for all entities:

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `POST /api/departments` - Create new department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Health Check
- `GET /api/health` - Check if server is running

## 🧪 Testing the System

Follow this order to test all functionality:
1. **Add a Department** first (required for doctors)
2. **Add a Doctor** (assign to a department)
3. **Add a Patient**
4. **Schedule an Appointment** (select patient & doctor)

## 🛑 Stopping the Servers

To stop either server, press `Ctrl+C` in the terminal where it's running.

## 🔍 Troubleshooting

### Common Issues

1. **Connection Errors**
   - Verify `SUPABASE_URL` and `SUPABASE_KEY` in backend `.env` file
   - Ensure you're using the **anon key** (not service_role key)
   - Check for typos in the environment variables

2. **Table Not Found Errors**
   - Run the SQL scripts from `docs/SUPABASE_SETUP.md`
   - Verify table names match exactly (case-sensitive in some setups)

3. **RLS Policy Errors**
   - If you see "row-level security policy" errors, you need to configure RLS policies
   - For development, you can run permissive policies (see SUPABASE_SETUP.md)
   - For production, implement proper authentication-based policies

4. **Port Already in Use**
   - Change the PORT in backend `.env` if 5000 is taken
   - Frontend runs on 5173 by default (configurable in vite.config.js)

### Getting Help
- Check backend terminal for detailed error logs
- Verify Supabase connection by testing the health endpoint: `http://localhost:5000/api/health`
- Consult the Supabase documentation at [supabase.com/docs](https://supabase.com/docs)

## 📝 Environment Variables

### Backend (`.env` file)
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=5000
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the amazing BaaS platform
- [React](https://reactjs.org) and [Vite](https://vitejs.dev) for the frontend stack
- [Express.js](https://expressjs.com) for the backend framework

---

**Happy coding!** If you find this project useful, please consider giving it a star ⭐