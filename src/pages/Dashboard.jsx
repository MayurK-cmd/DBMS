// ===================================
// Dashboard Page — Live data from Supabase
// ===================================
import { useState, useEffect } from "react";
import { Users, Stethoscope, CalendarCheck, IndianRupee, Clock } from "lucide-react";
import DashboardCards from "../components/DashboardCards";
import Loader from "../components/Loader";
import { supabase } from "../services/supabase";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Fetch counts from Supabase in parallel
        const [patientsRes, doctorsRes, appointmentsRes, billingRes, recentRes] = await Promise.all([
          supabase.from("patients").select("id", { count: "exact", head: true }),
          supabase.from("doctors").select("id", { count: "exact", head: true }),
          supabase.from("appointments").select("id", { count: "exact", head: true }),
          supabase.from("billing").select("amount, status"),
          supabase.from("appointments").select("*").order("date", { ascending: false }).limit(5),
        ]);

        const totalRevenue = (billingRes.data || []).reduce((sum, b) => sum + Number(b.amount), 0);

        setStats({
          totalPatients: patientsRes.count || 0,
          totalDoctors: doctorsRes.count || 0,
          todayAppointments: appointmentsRes.count || 0,
          totalRevenue,
          patientGrowth: 0,
          doctorGrowth: 0,
          appointmentGrowth: 0,
          revenueGrowth: 0,
        });

        setRecentAppointments(
          (recentRes.data || []).map((a) => ({
            id: a.id,
            patientName: a.patient_name,
            doctorName: a.doctor_name,
            date: a.date,
            time: a.time,
            status: a.status,
          }))
        );
      } catch (err) {
        console.error("Dashboard load error:", err);
        setStats({ totalPatients: 0, totalDoctors: 0, todayAppointments: 0, totalRevenue: 0, patientGrowth: 0, doctorGrowth: 0, appointmentGrowth: 0, revenueGrowth: 0 });
        setRecentAppointments([]);
      }
      setLoading(false);
    };

    loadDashboard();
  }, []);

  if (loading) return <Loader fullPage />;

  const statusColor = {
    Scheduled: "badge-info",
    Completed: "badge-success",
    "In Progress": "badge-warning",
    Cancelled: "badge-danger",
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Welcome banner */}
      <div className="glass-card p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute right-16 bottom-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2" />
        <div className="relative">
          <h1 className="text-2xl font-bold mb-1">Welcome to MediCare HMS 👋</h1>
          <p className="text-blue-100 text-sm">Here's what's happening at the hospital today.</p>
        </div>
      </div>

      {/* Stats cards */}
      <DashboardCards
        stats={stats}
        icons={{ patients: Users, doctors: Stethoscope, appointments: CalendarCheck, revenue: IndianRupee }}
      />

      {/* Recent appointments table */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Recent Appointments</h3>
          <a href="/appointments" className="text-xs text-blue-500 hover:underline">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                {["Patient", "Doctor", "Date", "Time", "Status"].map((h) => (
                  <th key={h} className="text-left py-2.5 px-3 font-semibold text-slate-500 dark:text-slate-400 text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map((a) => (
                <tr key={a.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-white">{a.patientName}</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{a.doctorName}</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{a.date}</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 flex items-center gap-1"><Clock size={13} />{a.time}</td>
                  <td className="py-2.5 px-3"><span className={`badge ${statusColor[a.status] || "badge-info"}`}>{a.status}</span></td>
                </tr>
              ))}
              {recentAppointments.length === 0 && (
                <tr><td colSpan={5} className="text-center py-8 text-slate-400">No appointments yet. Add some from the Appointments page.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
