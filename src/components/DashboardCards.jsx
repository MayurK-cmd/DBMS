// ===================================
// Dashboard Stat Cards Component
// ===================================
// Displays key statistics in a responsive grid of cards.
// Each card shows an icon, value, label, and growth trend.

import { TrendingUp, TrendingDown } from "lucide-react";

/**
 * Single stat card
 */
function StatCard({ icon: Icon, label, value, growth, color }) {
  const isPositive = growth >= 0;

  // Color variants for the icon background
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-emerald-500 to-emerald-600",
    purple: "from-violet-500 to-violet-600",
    orange: "from-amber-500 to-orange-500",
  };

  return (
    <div className="glass-card p-5 flex items-center gap-4">
      {/* Icon circle */}
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color] || colorClasses.blue} flex items-center justify-center shrink-0`}
      >
        <Icon size={22} className="text-white" />
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
        <p className="text-xs text-slate-400 mt-0.5">{label}</p>
      </div>

      {/* Growth indicator */}
      <div
        className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
          isPositive
            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
            : "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
        }`}
      >
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {Math.abs(growth)}%
      </div>
    </div>
  );
}

/**
 * Dashboard Cards grid — renders 4 stat cards
 * @param {Object} stats - { totalPatients, totalDoctors, todayAppointments, totalRevenue, ...growths }
 */
export default function DashboardCards({ stats, icons }) {
  // icons is an object mapping: { patients: UsersIcon, doctors: StethoscopeIcon, ... }
  const cards = [
    {
      icon: icons.patients,
      label: "Total Patients",
      value: stats.totalPatients?.toLocaleString(),
      growth: stats.patientGrowth,
      color: "blue",
    },
    {
      icon: icons.doctors,
      label: "Total Doctors",
      value: stats.totalDoctors?.toLocaleString(),
      growth: stats.doctorGrowth,
      color: "green",
    },
    {
      icon: icons.appointments,
      label: "Today's Appointments",
      value: stats.todayAppointments?.toLocaleString(),
      growth: stats.appointmentGrowth,
      color: "purple",
    },
    {
      icon: icons.revenue,
      label: "Total Revenue (₹)",
      value: `₹${(stats.totalRevenue / 1000).toFixed(0)}K`,
      growth: stats.revenueGrowth,
      color: "orange",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <StatCard key={i} {...card} />
      ))}
    </div>
  );
}
