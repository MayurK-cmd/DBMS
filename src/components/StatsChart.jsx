// ===================================
// StatsChart Component — Dashboard charts using Recharts
// ===================================
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useTheme } from "../context/ThemeContext";

export function AppointmentLineChart({ data }) {
  const { darkMode } = useTheme();
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">Appointment Trends</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#334155" : "#e2e8f0"} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: darkMode ? "#94a3b8" : "#64748b" }} />
          <YAxis tick={{ fontSize: 12, fill: darkMode ? "#94a3b8" : "#64748b" }} />
          <Tooltip contentStyle={{ background: darkMode ? "#1e293b" : "#fff", border: "none", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
          <Legend />
          <Line type="monotone" dataKey="appointments" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DepartmentBarChart({ data }) {
  const { darkMode } = useTheme();
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">Patients by Department</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#334155" : "#e2e8f0"} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: darkMode ? "#94a3b8" : "#64748b" }} />
          <YAxis tick={{ fontSize: 12, fill: darkMode ? "#94a3b8" : "#64748b" }} />
          <Tooltip contentStyle={{ background: darkMode ? "#1e293b" : "#fff", border: "none", borderRadius: 12 }} />
          <Bar dataKey="patients" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
