-- ===================================
-- Seed Data — Sample inserts for demo
-- ===================================
-- Run after schema.sql

-- Users
INSERT INTO users (name, email, password_hash, role, phone) VALUES
('Admin User', 'admin@hospital.com', '$2b$10$dummyhash1', 'Admin', '9876543200'),
('Dr. Anil Kapoor', 'dr.anil@hospital.com', '$2b$10$dummyhash2', 'Doctor', '9800000001'),
('Dr. Sunita Mehta', 'dr.sunita@hospital.com', '$2b$10$dummyhash3', 'Doctor', '9800000002');

-- Doctors
INSERT INTO doctors (user_id, name, specialization, phone, email, experience, availability, status, rating) VALUES
(2, 'Dr. Anil Kapoor', 'Cardiology', '9800000001', 'dr.anil@hospital.com', 15, 'Mon-Fri', 'Available', 4.8),
(3, 'Dr. Sunita Mehta', 'Neurology', '9800000002', 'dr.sunita@hospital.com', 12, 'Mon-Sat', 'Available', 4.7),
(NULL, 'Dr. Ravi Shankar', 'Orthopedics', '9800000003', 'dr.ravi@hospital.com', 20, 'Mon-Fri', 'On Leave', 4.9),
(NULL, 'Dr. Neha Gupta', 'Pediatrics', '9800000004', 'dr.neha@hospital.com', 8, 'Mon-Sat', 'Available', 4.6),
(NULL, 'Dr. Manoj Tiwari', 'General Medicine', '9800000007', 'dr.manoj@hospital.com', 18, 'Mon-Sat', 'Available', 4.4);

-- Patients
INSERT INTO patients (name, age, gender, blood_group, phone, email, address, condition, status, admit_date) VALUES
('Rahul Sharma', 34, 'Male', 'O+', '9876543210', 'rahul@email.com', '12 MG Road, Delhi', 'Diabetes Type 2', 'Active', '2026-04-10'),
('Priya Patel', 28, 'Female', 'A+', '9876543211', 'priya@email.com', '45 Park Street, Mumbai', 'Hypertension', 'Active', '2026-04-15'),
('Amit Kumar', 45, 'Male', 'B+', '9876543212', 'amit@email.com', '78 Lake Road, Kolkata', 'Cardiac Arrhythmia', 'Discharged', '2026-03-20'),
('Sneha Reddy', 22, 'Female', 'AB-', '9876543213', 'sneha@email.com', '23 Jubilee Hills, Hyderabad', 'Appendicitis', 'Active', '2026-05-01'),
('Vikram Singh', 56, 'Male', 'O-', '9876543214', 'vikram@email.com', '90 Civil Lines, Jaipur', 'Pneumonia', 'Critical', '2026-04-28');

-- Appointments
INSERT INTO appointments (patient_id, doctor_id, date, time, type, status, notes) VALUES
(1, 1, '2026-05-07', '09:00', 'Follow-up', 'Scheduled', 'Regular checkup for diabetes'),
(2, 2, '2026-05-07', '10:30', 'Consultation', 'Completed', 'Headache evaluation'),
(3, 1, '2026-05-07', '11:00', 'Check-up', 'Scheduled', 'Post-surgery cardiac review'),
(4, 3, '2026-05-08', '09:30', 'Surgery', 'Scheduled', 'Appendectomy prep'),
(5, 5, '2026-05-07', '14:00', 'Emergency', 'In Progress', 'Severe breathing difficulty');

-- Billing
INSERT INTO billing (patient_id, doctor_id, date, amount, status, method, description) VALUES
(1, 1, '2026-05-07', 5500.00, 'Paid', 'UPI', 'Consultation + Blood Test'),
(2, 2, '2026-05-07', 3200.00, 'Paid', 'Card', 'Neurology Consultation'),
(3, 1, '2026-05-06', 45000.00, 'Pending', 'Insurance', 'Cardiac Surgery + Room'),
(5, 5, '2026-05-07', 12000.00, 'Overdue', 'Insurance', 'ICU + Medication');

-- Medical Records
INSERT INTO medical_records (patient_id, doctor_id, date, diagnosis, prescription, notes, bp, pulse, temperature, weight) VALUES
(1, 1, '2026-05-07', 'Type 2 Diabetes Mellitus', 'Metformin 500mg twice daily', 'Blood sugar elevated. Advised diet control.', '130/85', 78, '98.4°F', '82 kg'),
(2, 2, '2026-05-07', 'Essential Hypertension', 'Amlodipine 5mg daily', 'BP consistently high. Started dual therapy.', '150/95', 82, '98.6°F', '65 kg'),
(5, 5, '2026-05-06', 'Community-Acquired Pneumonia', 'Azithromycin 500mg', 'SpO2 dropping. Shifted to ICU.', '100/65', 110, '101.2°F', '75 kg');
