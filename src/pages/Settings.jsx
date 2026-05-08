// ===================================
// Settings Page
// ===================================
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Save, User, Lock, Bell, Palette } from "lucide-react";
import toast from "react-hot-toast";

export default function Settings() {
  const { user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [profile, setProfile] = useState({ name: user?.name||"", email: user?.email||"", phone: "9876543210", role: user?.role||"Admin" });
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });

  const handleSave = (e) => { e.preventDefault(); toast.success("Settings saved successfully!"); };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-slate-800 dark:text-white">Profile & Settings</h1>

      {/* Profile section */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <User size={20} className="text-blue-500"/>
          <h2 className="text-base font-semibold text-slate-800 dark:text-white">Profile Information</h2>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label><input value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})} className="form-input"/></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label><input value={profile.email} onChange={e=>setProfile({...profile,email:e.target.value})} className="form-input"/></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label><input value={profile.phone} onChange={e=>setProfile({...profile,phone:e.target.value})} className="form-input"/></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label><input value={profile.role} disabled className="form-input opacity-60"/></div>
          </div>
          <button type="submit" className="btn-primary"><Save size={16}/>Save Changes</button>
        </form>
      </div>

      {/* Password section */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock size={20} className="text-blue-500"/>
          <h2 className="text-base font-semibold text-slate-800 dark:text-white">Change Password</h2>
        </div>
        <form onSubmit={e=>{e.preventDefault();toast.success("Password updated!");}} className="space-y-4">
          <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Password</label><input type="password" className="form-input" placeholder="••••••••"/></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">New Password</label><input type="password" className="form-input" placeholder="Min 6 characters"/></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm New</label><input type="password" className="form-input" placeholder="Repeat password"/></div>
          </div>
          <button type="submit" className="btn-primary"><Save size={16}/>Update Password</button>
        </form>
      </div>

      {/* Theme & Notifications */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette size={20} className="text-blue-500"/>
          <h2 className="text-base font-semibold text-slate-800 dark:text-white">Appearance</h2>
        </div>
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium text-slate-700 dark:text-slate-300">Dark Mode</p><p className="text-xs text-slate-400">Toggle dark/light theme</p></div>
          <button onClick={toggleDarkMode} className={`w-12 h-6 rounded-full transition-colors relative ${darkMode?"bg-blue-500":"bg-slate-300"}`}>
            <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${darkMode?"translate-x-6":"translate-x-0.5"}`}/>
          </button>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell size={20} className="text-blue-500"/>
          <h2 className="text-base font-semibold text-slate-800 dark:text-white">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[{key:"email",label:"Email Notifications"},{key:"sms",label:"SMS Notifications"},{key:"push",label:"Push Notifications"}].map(n=>(
            <div key={n.key} className="flex items-center justify-between">
              <p className="text-sm text-slate-700 dark:text-slate-300">{n.label}</p>
              <button onClick={()=>setNotifications({...notifications,[n.key]:!notifications[n.key]})}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications[n.key]?"bg-blue-500":"bg-slate-300"}`}>
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${notifications[n.key]?"translate-x-6":"translate-x-0.5"}`}/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
