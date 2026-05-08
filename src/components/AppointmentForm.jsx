// ===================================
// Appointment Form Component — Fetches doctors from Supabase
// ===================================
import { useState, useEffect } from "react";
import { getDoctors } from "../services/doctorService";

export default function AppointmentForm({ appointment, onSubmit, onClose }) {
  const [form, setForm] = useState({
    patientName: "", doctorName: "", date: "", time: "", type: "Consultation", status: "Scheduled", notes: "",
  });
  const [errors, setErrors] = useState({});
  const [doctors, setDoctors] = useState([]);

  // Load doctors list from Supabase
  useEffect(() => {
    getDoctors().then(setDoctors).catch(() => setDoctors([]));
  }, []);

  // Pre-fill form when editing
  useEffect(() => {
    if (appointment) setForm({ ...appointment });
  }, [appointment]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.patientName.trim()) errs.patientName = "Patient name is required";
    if (!form.doctorName) errs.doctorName = "Select a doctor";
    if (!form.date) errs.date = "Date is required";
    if (!form.time) errs.time = "Time is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Patient Name *</label>
        <input name="patientName" value={form.patientName} onChange={handleChange} className="form-input" placeholder="Enter patient name" />
        {errors.patientName && <p className="text-xs text-red-500 mt-1">{errors.patientName}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Doctor *</label>
        <select name="doctorName" value={form.doctorName} onChange={handleChange} className="form-input">
          <option value="">Select Doctor</option>
          {doctors.map(d => <option key={d.id} value={d.name}>{d.name} — {d.specialization}</option>)}
        </select>
        {errors.doctorName && <p className="text-xs text-red-500 mt-1">{errors.doctorName}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date *</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="form-input" />
          {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Time *</label>
          <input type="time" name="time" value={form.time} onChange={handleChange} className="form-input" />
          {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
        <select name="type" value={form.type} onChange={handleChange} className="form-input">
          {["Consultation","Follow-up","Check-up","Surgery","Emergency"].map(t=><option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="form-input" placeholder="Additional notes..." />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
        <button type="submit" className="btn-primary">{appointment ? "Update" : "Book"} Appointment</button>
      </div>
    </form>
  );
}
