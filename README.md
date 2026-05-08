# 🏥 MediCare HMS — Hospital Management System

A modern, responsive Hospital Management System built with **React + Vite + Tailwind CSS** for a college DBMS mini-project.

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-8-purple) ![Tailwind](https://img.shields.io/badge/TailwindCSS-4-cyan)

---

## ✨ Features

- 🔐 **Authentication** — Login / Register with mock auth (Supabase-ready)
- 📊 **Dashboard** — Stats cards, line charts, bar charts, recent appointments
- 👥 **Patient Management** — Full CRUD with search, pagination, modal forms
- 🩺 **Doctor Management** — Card grid view, specialization, ratings
- 📅 **Appointment Booking** — Book, edit, cancel with status filters
- 💰 **Billing** — Revenue summary, payment status tracking
- 📋 **Medical Records** — Expandable rows with diagnosis, vitals, prescriptions
- ⚙️ **Settings** — Profile, password, theme, notifications
- 📞 **Contact/About** — Hospital info and contact form
- 🌙 **Dark / Light Mode** — Persisted to localStorage
- 🔔 **Toast Notifications** — Success/error feedback on actions
- 📱 **Fully Responsive** — Mobile sidebar, adaptive tables

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ installed

### Setup

```bash
# 1. Navigate to project directory
cd hospital_management_system

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Demo Login
- **Email:** `admin@hospital.com`
- **Password:** `admin123`

---

## 📁 Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── Footer.jsx
│   ├── DashboardCards.jsx
│   ├── PatientTable.jsx
│   ├── AppointmentForm.jsx
│   ├── StatsChart.jsx
│   ├── Modal.jsx
│   ├── ConfirmDialog.jsx
│   ├── Pagination.jsx
│   └── Loader.jsx
│
├── pages/               # Route pages
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Patients.jsx
│   ├── Doctors.jsx
│   ├── Appointments.jsx
│   ├── Billing.jsx
│   ├── Records.jsx
│   ├── Settings.jsx
│   └── Contact.jsx
│
├── services/            # API / data layer
│   ├── supabase.js
│   ├── authService.js
│   ├── patientService.js
│   ├── appointmentService.js
│   ├── doctorService.js
│   └── billingService.js
│
├── context/             # React Context providers
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
│
├── layouts/             # Layout wrappers
│   ├── MainLayout.jsx
│   └── AuthLayout.jsx
│
├── data/
│   └── mockData.js      # Dummy data for demo
│
├── App.jsx              # Router configuration
├── main.jsx             # Entry point
└── index.css            # Tailwind + global styles

database/
├── schema.sql           # Table definitions
└── seed.sql             # Sample data
```

---

## 🗄️ Database Tables (ER Design)

| Table | Description | Key Relationships |
|-------|-------------|-------------------|
| `users` | System users (admin, doctors, staff) | — |
| `doctors` | Doctor profiles | `doctors.user_id → users.id` |
| `patients` | Patient records | — |
| `appointments` | Scheduled appointments | `→ patients.id`, `→ doctors.id` |
| `billing` | Payment records | `→ patients.id`, `→ doctors.id` |
| `medical_records` | Diagnosis & prescriptions | `→ patients.id`, `→ doctors.id` |

---

## 🔌 Supabase Integration (Optional)

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → Run `database/schema.sql`
3. Run `database/seed.sql` for sample data
4. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
5. Fill in your Supabase URL and anon key
6. Install Supabase client: `npm install @supabase/supabase-js`
7. Uncomment code in `src/services/supabase.js`
8. Replace mock calls in service files with Supabase queries (comments show how)

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| React 19 | UI framework |
| Vite 8 | Build tool |
| Tailwind CSS 4 | Styling |
| React Router 7 | Client-side routing |
| Recharts | Dashboard charts |
| Lucide React | Icons |
| React Hot Toast | Notifications |
| Supabase (optional) | Backend & Auth |

---

## 📜 License

This project is created for educational purposes (DBMS Mini Project).
