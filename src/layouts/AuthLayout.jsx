// ===================================
// Auth Layout — Minimal layout for Login/Register
// ===================================
import { Outlet } from "react-router-dom";
import { Heart } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Left: Branding panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="relative text-white text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Heart size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3">MediCare HMS</h1>
          <p className="text-blue-100 text-lg mb-8">Hospital Management System</p>
          <div className="space-y-3 text-left max-w-xs mx-auto">
            {["Manage patients efficiently","Schedule appointments easily","Track billing & records","Secure & reliable system"].map((t,i)=>(
              <div key={i} className="flex items-center gap-3 text-blue-100">
                <div className="w-2 h-2 rounded-full bg-blue-300" />
                <span className="text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right: Form area */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
