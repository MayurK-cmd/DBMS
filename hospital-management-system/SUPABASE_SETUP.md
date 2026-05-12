# Supabase Setup Guide

This guide will help you set up Supabase for the Hospital Management System.

## Step 1: Create Supabase Project

1. Visit [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New project"
4. Fill in project details:
   - **Name**: Hospital Management System
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to you
5. Click "Create new project"

## Step 2: Get Your Credentials

1. Go to Project Settings → API
2. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_KEY`
3. Save these to your backend `.env` file

## Step 3: Create Tables

### Option A: Using SQL Editor

1. In Supabase, go to SQL Editor
2. Create a new query and run each SQL script below
3. Execute them one by one

### Option B: Using Table Editor

1. Click on "Create a new table"
2. Add columns as specified

## SQL Scripts to Run

### Create Departments Table
```sql
CREATE TABLE departments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  head VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (optional but recommended)
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
```

### Create Doctors Table
```sql
CREATE TABLE doctors (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  specialization VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (optional but recommended)
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
```

### Create Patients Table
```sql
CREATE TABLE patients (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  disease VARCHAR(100),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (optional but recommended)
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
```

### Create Appointments Table
```sql
CREATE TABLE appointments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id BIGINT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (optional but recommended)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
```

## Step 4: Configure RLS (Row Level Security) - Optional but Recommended

For production, you should restrict access:

```sql
-- Departments RLS
CREATE POLICY "Enable all for authenticated users"
ON departments
AS PERMISSIVE FOR ALL
USING (true);

-- Doctors RLS
CREATE POLICY "Enable all for authenticated users"
ON doctors
AS PERMISSIVE FOR ALL
USING (true);

-- Patients RLS
CREATE POLICY "Enable all for authenticated users"
ON patients
AS PERMISSIVE FOR ALL
USING (true);

-- Appointments RLS
CREATE POLICY "Enable all for authenticated users"
ON appointments
AS PERMISSIVE FOR ALL
USING (true);
```

## Step 5: Verify Tables

1. Go to "Table Editor" in Supabase
2. You should see all four tables:
   - departments
   - doctors
   - patients
   - appointments

## Step 6: Test the Connection

1. Update backend `.env`:
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_KEY=your_anon_key
   PORT=5000
   ```

2. Start the backend:
   ```bash
   npm run dev
   ```

3. Test the health endpoint:
   ```bash
   curl http://localhost:5000/api/health
   ```

## Troubleshooting

### Tables not showing up
- Refresh the page
- Check SQL execution was successful
- Verify you're in the correct project

### Connection errors
- Double-check SUPABASE_URL and SUPABASE_KEY
- Ensure they're properly copied without extra spaces
- Check if the table names match exactly

### Permission errors
- Verify RLS policies are set correctly
- Check that your API key has proper permissions
- Use the anon key (not the service_role key) for client

## Next Steps

1. Run the frontend and backend
2. Add sample data through the UI
3. Test all CRUD operations
4. Configure authentication (optional)
5. Set up backups in Supabase console

---

For more help, visit [Supabase Docs](https://supabase.com/docs)
