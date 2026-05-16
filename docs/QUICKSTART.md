# Hospital Management System - Quick Start Guide

## 🎯 Quick Start (5 minutes)

### 1. Supabase Setup
```bash
# Go to https://supabase.com
# Create a new project
# Copy your URL and API key
# Create the tables using SQL from SUPABASE_SETUP.md
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase credentials

npm install
npm run dev
# Backend runs on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### 4. Open Browser
Visit: `http://localhost:5173`

## 📋 Default Navigation

- **Home**: Overview of system
- **Patients**: Add/Edit/Delete patient records
- **Doctors**: Manage doctor information
- **Departments**: Manage hospital departments
- **Appointments**: Schedule and manage appointments

## 🧪 Test the System

1. **Add a Department** first (needed for doctors)
2. **Add a Doctor** (select department)
3. **Add a Patient**
4. **Schedule an Appointment** (select patient & doctor)

## 🛑 Stop the Servers

Press `Ctrl+C` in the terminal running the server

## 📖 Full Documentation

See [README.md](./README.md) for complete documentation.

---

**Questions?** Check [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for database setup help.
