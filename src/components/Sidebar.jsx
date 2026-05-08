// ===================================
// Sidebar Component — Navigation menu
// ===================================
// Responsive sidebar with navigation links, icons, and active state.
// Collapses to overlay on mobile screens.

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarCheck,
  Receipt,
  FileText,
  Settings,
  Info,
  X,
  Heart,
} from "lucide-react";

// Navigation items config — easy to add new pages
const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/patients", label: "Patients", icon: Users },
  { path: "/doctors", label: "Doctors", icon: Stethoscope },
  { path: "/appointments", label: "Appointments", icon: CalendarCheck },
  { path: "/billing", label: "Billing", icon: Receipt },
  { path: "/records", label: "Medical Records", icon: FileText },
  { path: "/settings", label: "Settings", icon: Settings },
  { path: "/contact", label: "About / Contact", icon: Info },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[260px] bg-white dark:bg-slate-900
          border-r border-slate-200 dark:border-slate-700
          flex flex-col transition-transform duration-300
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? "translate-x-0 slide-in" : "-translate-x-full"}
        `}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Heart size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 dark:text-white">MediCare</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Hospital System</p>
            </div>
          </div>

          {/* Close button (mobile only) */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Menu
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                    }`
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section — user info */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Admin User</p>
              <p className="text-xs text-slate-400">admin@hospital.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
