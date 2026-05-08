// ===================================
// Mock Data for Hospital Management System
// This file contains dummy data used throughout the app.
// When integrating Supabase, replace service calls — this file
// can remain as fallback / seed reference.
// ===================================

// --- Patients ---
export const patients = [
  { id: 1, name: "Rahul Sharma", age: 34, gender: "Male", bloodGroup: "O+", phone: "9876543210", email: "rahul@email.com", address: "12 MG Road, Delhi", status: "Active", admitDate: "2026-04-10", condition: "Diabetes Type 2" },
  { id: 2, name: "Priya Patel", age: 28, gender: "Female", bloodGroup: "A+", phone: "9876543211", email: "priya@email.com", address: "45 Park Street, Mumbai", status: "Active", admitDate: "2026-04-15", condition: "Hypertension" },
  { id: 3, name: "Amit Kumar", age: 45, gender: "Male", bloodGroup: "B+", phone: "9876543212", email: "amit@email.com", address: "78 Lake Road, Kolkata", status: "Discharged", admitDate: "2026-03-20", condition: "Cardiac Arrhythmia" },
  { id: 4, name: "Sneha Reddy", age: 22, gender: "Female", bloodGroup: "AB-", phone: "9876543213", email: "sneha@email.com", address: "23 Jubilee Hills, Hyderabad", status: "Active", admitDate: "2026-05-01", condition: "Appendicitis" },
  { id: 5, name: "Vikram Singh", age: 56, gender: "Male", bloodGroup: "O-", phone: "9876543214", email: "vikram@email.com", address: "90 Civil Lines, Jaipur", status: "Critical", admitDate: "2026-04-28", condition: "Pneumonia" },
  { id: 6, name: "Ananya Gupta", age: 31, gender: "Female", bloodGroup: "A-", phone: "9876543215", email: "ananya@email.com", address: "56 Banjara Hills, Hyderabad", status: "Active", admitDate: "2026-05-03", condition: "Migraine" },
  { id: 7, name: "Rajesh Verma", age: 62, gender: "Male", bloodGroup: "B-", phone: "9876543216", email: "rajesh@email.com", address: "34 Connaught Place, Delhi", status: "Active", admitDate: "2026-04-22", condition: "Arthritis" },
  { id: 8, name: "Meera Nair", age: 38, gender: "Female", bloodGroup: "O+", phone: "9876543217", email: "meera@email.com", address: "67 MG Road, Bangalore", status: "Discharged", admitDate: "2026-03-15", condition: "Thyroid Disorder" },
  { id: 9, name: "Suresh Iyer", age: 50, gender: "Male", bloodGroup: "AB+", phone: "9876543218", email: "suresh@email.com", address: "12 Anna Nagar, Chennai", status: "Active", admitDate: "2026-05-05", condition: "Kidney Stones" },
  { id: 10, name: "Kavita Joshi", age: 29, gender: "Female", bloodGroup: "A+", phone: "9876543219", email: "kavita@email.com", address: "89 FC Road, Pune", status: "Active", admitDate: "2026-05-02", condition: "Anemia" },
  { id: 11, name: "Deepak Mishra", age: 41, gender: "Male", bloodGroup: "B+", phone: "9876543220", email: "deepak@email.com", address: "45 Hazratganj, Lucknow", status: "Discharged", admitDate: "2026-03-10", condition: "Fracture - Left Arm" },
  { id: 12, name: "Pooja Desai", age: 35, gender: "Female", bloodGroup: "O-", phone: "9876543221", email: "pooja@email.com", address: "23 SG Highway, Ahmedabad", status: "Active", admitDate: "2026-04-18", condition: "Asthma" },
  { id: 13, name: "Arjun Malhotra", age: 48, gender: "Male", bloodGroup: "A-", phone: "9876543222", email: "arjun@email.com", address: "78 Sector 17, Chandigarh", status: "Critical", admitDate: "2026-05-06", condition: "Liver Cirrhosis" },
  { id: 14, name: "Nisha Agarwal", age: 26, gender: "Female", bloodGroup: "AB+", phone: "9876543223", email: "nisha@email.com", address: "56 Salt Lake, Kolkata", status: "Active", admitDate: "2026-05-04", condition: "PCOS" },
  { id: 15, name: "Karan Chopra", age: 33, gender: "Male", bloodGroup: "B-", phone: "9876543224", email: "karan@email.com", address: "90 Model Town, Ludhiana", status: "Active", admitDate: "2026-04-25", condition: "Gastritis" },
];

// --- Doctors ---
export const doctors = [
  { id: 1, name: "Dr. Anil Kapoor", specialization: "Cardiology", phone: "9800000001", email: "dr.anil@hospital.com", experience: 15, availability: "Mon-Fri", status: "Available", patients: 120, rating: 4.8 },
  { id: 2, name: "Dr. Sunita Mehta", specialization: "Neurology", phone: "9800000002", email: "dr.sunita@hospital.com", experience: 12, availability: "Mon-Sat", status: "Available", patients: 95, rating: 4.7 },
  { id: 3, name: "Dr. Ravi Shankar", specialization: "Orthopedics", phone: "9800000003", email: "dr.ravi@hospital.com", experience: 20, availability: "Mon-Fri", status: "On Leave", patients: 200, rating: 4.9 },
  { id: 4, name: "Dr. Neha Gupta", specialization: "Pediatrics", phone: "9800000004", email: "dr.neha@hospital.com", experience: 8, availability: "Mon-Sat", status: "Available", patients: 150, rating: 4.6 },
  { id: 5, name: "Dr. Sanjay Patel", specialization: "Dermatology", phone: "9800000005", email: "dr.sanjay@hospital.com", experience: 10, availability: "Tue-Sat", status: "Available", patients: 180, rating: 4.5 },
  { id: 6, name: "Dr. Priya Sharma", specialization: "Gynecology", phone: "9800000006", email: "dr.priya@hospital.com", experience: 14, availability: "Mon-Fri", status: "Available", patients: 160, rating: 4.8 },
  { id: 7, name: "Dr. Manoj Tiwari", specialization: "General Medicine", phone: "9800000007", email: "dr.manoj@hospital.com", experience: 18, availability: "Mon-Sat", status: "Available", patients: 250, rating: 4.4 },
  { id: 8, name: "Dr. Kavitha Rao", specialization: "Ophthalmology", phone: "9800000008", email: "dr.kavitha@hospital.com", experience: 9, availability: "Mon-Fri", status: "On Leave", patients: 110, rating: 4.7 },
  { id: 9, name: "Dr. Rajiv Menon", specialization: "ENT", phone: "9800000009", email: "dr.rajiv@hospital.com", experience: 11, availability: "Wed-Sun", status: "Available", patients: 130, rating: 4.6 },
  { id: 10, name: "Dr. Anjali Desai", specialization: "Psychiatry", phone: "9800000010", email: "dr.anjali@hospital.com", experience: 7, availability: "Mon-Fri", status: "Available", patients: 85, rating: 4.9 },
];

// --- Appointments ---
export const appointments = [
  { id: 1, patientName: "Rahul Sharma", doctorName: "Dr. Anil Kapoor", date: "2026-05-07", time: "09:00 AM", status: "Scheduled", type: "Follow-up", notes: "Regular checkup for diabetes" },
  { id: 2, patientName: "Priya Patel", doctorName: "Dr. Sunita Mehta", date: "2026-05-07", time: "10:30 AM", status: "Completed", type: "Consultation", notes: "Headache evaluation" },
  { id: 3, patientName: "Amit Kumar", doctorName: "Dr. Anil Kapoor", date: "2026-05-07", time: "11:00 AM", status: "Scheduled", type: "Check-up", notes: "Post-surgery cardiac review" },
  { id: 4, patientName: "Sneha Reddy", doctorName: "Dr. Ravi Shankar", date: "2026-05-08", time: "09:30 AM", status: "Scheduled", type: "Surgery", notes: "Appendectomy prep" },
  { id: 5, patientName: "Vikram Singh", doctorName: "Dr. Manoj Tiwari", date: "2026-05-07", time: "02:00 PM", status: "In Progress", type: "Emergency", notes: "Severe breathing difficulty" },
  { id: 6, patientName: "Ananya Gupta", doctorName: "Dr. Sunita Mehta", date: "2026-05-08", time: "10:00 AM", status: "Scheduled", type: "Consultation", notes: "Chronic migraine treatment" },
  { id: 7, patientName: "Rajesh Verma", doctorName: "Dr. Ravi Shankar", date: "2026-05-08", time: "11:30 AM", status: "Scheduled", type: "Follow-up", notes: "Joint pain review" },
  { id: 8, patientName: "Meera Nair", doctorName: "Dr. Priya Sharma", date: "2026-05-09", time: "09:00 AM", status: "Scheduled", type: "Check-up", notes: "Thyroid level check" },
  { id: 9, patientName: "Suresh Iyer", doctorName: "Dr. Manoj Tiwari", date: "2026-05-07", time: "03:00 PM", status: "Completed", type: "Consultation", notes: "Kidney stone assessment" },
  { id: 10, patientName: "Kavita Joshi", doctorName: "Dr. Neha Gupta", date: "2026-05-09", time: "10:30 AM", status: "Scheduled", type: "Follow-up", notes: "Anemia treatment progress" },
  { id: 11, patientName: "Deepak Mishra", doctorName: "Dr. Ravi Shankar", date: "2026-05-07", time: "04:00 PM", status: "Cancelled", type: "Follow-up", notes: "Fracture healing check" },
  { id: 12, patientName: "Pooja Desai", doctorName: "Dr. Manoj Tiwari", date: "2026-05-10", time: "09:00 AM", status: "Scheduled", type: "Check-up", notes: "Asthma management review" },
  { id: 13, patientName: "Arjun Malhotra", doctorName: "Dr. Anil Kapoor", date: "2026-05-07", time: "01:00 PM", status: "In Progress", type: "Emergency", notes: "Liver function deterioration" },
  { id: 14, patientName: "Nisha Agarwal", doctorName: "Dr. Priya Sharma", date: "2026-05-10", time: "11:00 AM", status: "Scheduled", type: "Consultation", notes: "Hormonal assessment" },
  { id: 15, patientName: "Karan Chopra", doctorName: "Dr. Manoj Tiwari", date: "2026-05-08", time: "02:30 PM", status: "Scheduled", type: "Follow-up", notes: "Gastritis treatment review" },
  { id: 16, patientName: "Rahul Sharma", doctorName: "Dr. Sanjay Patel", date: "2026-05-11", time: "09:00 AM", status: "Scheduled", type: "Consultation", notes: "Skin rash evaluation" },
  { id: 17, patientName: "Priya Patel", doctorName: "Dr. Anjali Desai", date: "2026-05-11", time: "10:00 AM", status: "Scheduled", type: "Consultation", notes: "Anxiety management" },
  { id: 18, patientName: "Amit Kumar", doctorName: "Dr. Kavitha Rao", date: "2026-05-12", time: "11:00 AM", status: "Scheduled", type: "Check-up", notes: "Vision test" },
  { id: 19, patientName: "Sneha Reddy", doctorName: "Dr. Rajiv Menon", date: "2026-05-12", time: "09:30 AM", status: "Scheduled", type: "Consultation", notes: "Ear infection follow-up" },
  { id: 20, patientName: "Vikram Singh", doctorName: "Dr. Anil Kapoor", date: "2026-05-13", time: "10:00 AM", status: "Scheduled", type: "Follow-up", notes: "Lung function post pneumonia" },
];

// --- Billing ---
export const billingRecords = [
  { id: 1, patientName: "Rahul Sharma", date: "2026-05-07", amount: 5500, status: "Paid", method: "UPI", description: "Consultation + Blood Test", doctor: "Dr. Anil Kapoor" },
  { id: 2, patientName: "Priya Patel", date: "2026-05-07", amount: 3200, status: "Paid", method: "Card", description: "Neurology Consultation", doctor: "Dr. Sunita Mehta" },
  { id: 3, patientName: "Amit Kumar", date: "2026-05-06", amount: 45000, status: "Pending", method: "Insurance", description: "Cardiac Surgery + Room", doctor: "Dr. Anil Kapoor" },
  { id: 4, patientName: "Sneha Reddy", date: "2026-05-08", amount: 28000, status: "Pending", method: "Cash", description: "Appendectomy Surgery", doctor: "Dr. Ravi Shankar" },
  { id: 5, patientName: "Vikram Singh", date: "2026-05-07", amount: 12000, status: "Overdue", method: "Insurance", description: "ICU + Medication", doctor: "Dr. Manoj Tiwari" },
  { id: 6, patientName: "Ananya Gupta", date: "2026-05-06", amount: 2500, status: "Paid", method: "UPI", description: "MRI Scan", doctor: "Dr. Sunita Mehta" },
  { id: 7, patientName: "Rajesh Verma", date: "2026-05-05", amount: 4800, status: "Paid", method: "Card", description: "X-Ray + Physiotherapy", doctor: "Dr. Ravi Shankar" },
  { id: 8, patientName: "Meera Nair", date: "2026-05-04", amount: 3500, status: "Paid", method: "UPI", description: "Thyroid Test + Consultation", doctor: "Dr. Priya Sharma" },
  { id: 9, patientName: "Suresh Iyer", date: "2026-05-07", amount: 18000, status: "Pending", method: "Insurance", description: "Ultrasound + Treatment", doctor: "Dr. Manoj Tiwari" },
  { id: 10, patientName: "Kavita Joshi", date: "2026-05-03", amount: 1800, status: "Paid", method: "Cash", description: "Blood Test + Iron Supplement", doctor: "Dr. Neha Gupta" },
  { id: 11, patientName: "Arjun Malhotra", date: "2026-05-07", amount: 55000, status: "Overdue", method: "Insurance", description: "ICU Stay + Liver Treatment", doctor: "Dr. Anil Kapoor" },
  { id: 12, patientName: "Pooja Desai", date: "2026-05-02", amount: 2200, status: "Paid", method: "UPI", description: "Pulmonary Function Test", doctor: "Dr. Manoj Tiwari" },
];

// --- Medical Records ---
export const medicalRecords = [
  { id: 1, patientName: "Rahul Sharma", date: "2026-05-07", diagnosis: "Type 2 Diabetes Mellitus", doctor: "Dr. Anil Kapoor", prescription: "Metformin 500mg twice daily, Glimepiride 1mg once daily", notes: "Blood sugar levels elevated. Advised strict diet control and regular exercise. Follow-up in 2 weeks.", vitals: { bp: "130/85", pulse: 78, temp: "98.4°F", weight: "82 kg" } },
  { id: 2, patientName: "Priya Patel", date: "2026-05-07", diagnosis: "Essential Hypertension", doctor: "Dr. Sunita Mehta", prescription: "Amlodipine 5mg once daily, Telmisartan 40mg once daily", notes: "BP consistently high. Started dual therapy. Advised low-sodium diet.", vitals: { bp: "150/95", pulse: 82, temp: "98.6°F", weight: "65 kg" } },
  { id: 3, patientName: "Amit Kumar", date: "2026-04-20", diagnosis: "Atrial Fibrillation", doctor: "Dr. Anil Kapoor", prescription: "Warfarin 5mg, Amiodarone 200mg", notes: "Post-surgical recovery progressing well. ECG shows improvement.", vitals: { bp: "120/80", pulse: 72, temp: "98.2°F", weight: "78 kg" } },
  { id: 4, patientName: "Sneha Reddy", date: "2026-05-01", diagnosis: "Acute Appendicitis", doctor: "Dr. Ravi Shankar", prescription: "Ciprofloxacin 500mg, Metronidazole 400mg, Paracetamol SOS", notes: "Surgery scheduled for May 8. Pre-op tests completed. NPO from midnight.", vitals: { bp: "118/76", pulse: 88, temp: "99.5°F", weight: "55 kg" } },
  { id: 5, patientName: "Vikram Singh", date: "2026-05-06", diagnosis: "Community-Acquired Pneumonia", doctor: "Dr. Manoj Tiwari", prescription: "Azithromycin 500mg, Ambroxol syrup, Salbutamol nebulization", notes: "SpO2 dropping. Shifted to ICU. Oxygen support initiated.", vitals: { bp: "100/65", pulse: 110, temp: "101.2°F", weight: "75 kg" } },
  { id: 6, patientName: "Ananya Gupta", date: "2026-05-03", diagnosis: "Chronic Migraine", doctor: "Dr. Sunita Mehta", prescription: "Sumatriptan 50mg SOS, Propranolol 40mg daily", notes: "Frequency: 4-5 episodes/month. MRI brain normal. Stress management advised.", vitals: { bp: "110/70", pulse: 68, temp: "98.4°F", weight: "58 kg" } },
  { id: 7, patientName: "Rajesh Verma", date: "2026-04-22", diagnosis: "Osteoarthritis - Both Knees", doctor: "Dr. Ravi Shankar", prescription: "Diclofenac gel, Glucosamine supplements, Physiotherapy", notes: "Grade 3 OA bilateral knees. Weight reduction essential. Consider knee replacement if no improvement.", vitals: { bp: "140/90", pulse: 74, temp: "98.6°F", weight: "92 kg" } },
  { id: 8, patientName: "Meera Nair", date: "2026-03-15", diagnosis: "Hypothyroidism", doctor: "Dr. Priya Sharma", prescription: "Levothyroxine 75mcg on empty stomach", notes: "TSH levels stabilizing. Continue current dose. Recheck after 6 weeks.", vitals: { bp: "115/75", pulse: 65, temp: "97.8°F", weight: "68 kg" } },
  { id: 9, patientName: "Suresh Iyer", date: "2026-05-05", diagnosis: "Renal Calculi - Right Kidney", doctor: "Dr. Manoj Tiwari", prescription: "Tamsulosin 0.4mg, Potassium Citrate, Plenty of fluids", notes: "8mm stone in right kidney. ESWL planned if no spontaneous passage in 2 weeks.", vitals: { bp: "128/82", pulse: 80, temp: "98.8°F", weight: "80 kg" } },
  { id: 10, patientName: "Kavita Joshi", date: "2026-05-02", diagnosis: "Iron Deficiency Anemia", doctor: "Dr. Neha Gupta", prescription: "Ferrous Sulfate 200mg twice daily, Vitamin C 500mg", notes: "Hemoglobin 8.2 g/dL. Heavy menstruation likely cause. Gynecology referral advised.", vitals: { bp: "105/68", pulse: 92, temp: "98.4°F", weight: "52 kg" } },
];

// --- Dashboard Chart Data ---
export const appointmentChartData = [
  { month: "Jan", appointments: 120, patients: 85 },
  { month: "Feb", appointments: 150, patients: 102 },
  { month: "Mar", appointments: 180, patients: 125 },
  { month: "Apr", appointments: 165, patients: 118 },
  { month: "May", appointments: 200, patients: 145 },
  { month: "Jun", appointments: 185, patients: 135 },
];

// --- Department-wise patient distribution ---
export const departmentData = [
  { name: "Cardiology", patients: 120, color: "#3b82f6" },
  { name: "Neurology", patients: 95, color: "#8b5cf6" },
  { name: "Orthopedics", patients: 200, color: "#10b981" },
  { name: "Pediatrics", patients: 150, color: "#f59e0b" },
  { name: "General", patients: 250, color: "#ef4444" },
  { name: "Dermatology", patients: 180, color: "#06b6d4" },
];

// --- Dashboard Stats ---
export const dashboardStats = {
  totalPatients: 1250,
  totalDoctors: 48,
  todayAppointments: 32,
  totalRevenue: 485000,
  patientGrowth: 12.5,
  doctorGrowth: 4.2,
  appointmentGrowth: 8.7,
  revenueGrowth: 15.3,
};
