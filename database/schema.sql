-- ===================================
-- Hospital Management System — Database Schema
-- ===================================
-- Compatible with Supabase (PostgreSQL)
-- Run this in Supabase SQL Editor to create all tables.
--
-- IMPORTANT: After creating tables, go to Supabase Dashboard > Authentication > Settings
-- and enable Email/Password sign-up. Then disable RLS on these tables for development:
--   ALTER TABLE doctors DISABLE ROW LEVEL SECURITY;
--   ALTER TABLE patients DISABLE ROW LEVEL SECURITY;
--   ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;
--   ALTER TABLE billing DISABLE ROW LEVEL SECURITY;
--   ALTER TABLE medical_records DISABLE ROW LEVEL SECURITY;

-- 1. Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  specialization  VARCHAR(100) NOT NULL,
  phone           VARCHAR(15),
  email           VARCHAR(150),
  experience      INT DEFAULT 0,
  availability    VARCHAR(50) DEFAULT 'Mon-Fri',
  status          VARCHAR(20) DEFAULT 'Available' CHECK (status IN ('Available','On Leave','Busy')),
  rating          DECIMAL(2,1) DEFAULT 0.0,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- 2. Patients table
CREATE TABLE IF NOT EXISTS patients (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  age         INT NOT NULL CHECK (age > 0 AND age < 150),
  gender      VARCHAR(10) CHECK (gender IN ('Male','Female','Other')),
  blood_group VARCHAR(5),
  phone       VARCHAR(15) NOT NULL,
  email       VARCHAR(150),
  address     TEXT,
  condition   VARCHAR(200),
  status      VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active','Discharged','Critical')),
  admit_date  DATE DEFAULT CURRENT_DATE,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

-- 3. Appointments table (uses text names to match frontend service layer)
CREATE TABLE IF NOT EXISTS appointments (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  patient_name  VARCHAR(100) NOT NULL,
  doctor_name   VARCHAR(100) NOT NULL,
  date          DATE NOT NULL,
  time          VARCHAR(20) NOT NULL,
  type          VARCHAR(30) DEFAULT 'Consultation' CHECK (type IN ('Consultation','Follow-up','Check-up','Surgery','Emergency')),
  status        VARCHAR(20) DEFAULT 'Scheduled' CHECK (status IN ('Scheduled','Completed','In Progress','Cancelled')),
  notes         TEXT,
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW()
);

-- 4. Billing table (uses text names to match frontend service layer)
CREATE TABLE IF NOT EXISTS billing (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  patient_name VARCHAR(100) NOT NULL,
  doctor       VARCHAR(100),
  date         DATE DEFAULT CURRENT_DATE,
  amount       DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
  status       VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Paid','Pending','Overdue')),
  method       VARCHAR(30) CHECK (method IN ('Cash','Card','UPI','Insurance','Online')),
  description  TEXT,
  created_at   TIMESTAMP DEFAULT NOW()
);

-- 5. Medical Records table
CREATE TABLE IF NOT EXISTS medical_records (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  patient_name VARCHAR(100) NOT NULL,
  doctor_name  VARCHAR(100) NOT NULL,
  date         DATE DEFAULT CURRENT_DATE,
  diagnosis    TEXT NOT NULL,
  prescription TEXT,
  notes        TEXT,
  bp           VARCHAR(10),
  pulse        INT,
  temperature  VARCHAR(10),
  weight       VARCHAR(10),
  created_at   TIMESTAMP DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_billing_status ON billing(status);
CREATE INDEX IF NOT EXISTS idx_patients_status ON patients(status);

-- ===================================
-- Disable RLS for development (run these after creating tables)
-- ===================================
ALTER TABLE doctors DISABLE ROW LEVEL SECURITY;
ALTER TABLE patients DISABLE ROW LEVEL SECURITY;
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;
ALTER TABLE billing DISABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records DISABLE ROW LEVEL SECURITY;
