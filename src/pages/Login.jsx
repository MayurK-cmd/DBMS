// ===================================
// Login Page
// ===================================
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, Mail, Lock, Heart } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("admin@hospital.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill all fields"); return; }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Mobile logo */}
      <div className="lg:hidden flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
          <Heart size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">MediCare HMS</h1>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Welcome Back</h2>
      <p className="text-sm text-slate-400 mb-8">Sign in to your account to continue</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="form-input pl-11" placeholder="admin@hospital.com" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-input pl-11" placeholder="••••••••" />
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
          {loading ? "Signing in..." : <><LogIn size={18}/> Sign In</>}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-6">
        Don't have an account? <Link to="/register" className="text-blue-500 font-medium hover:underline">Register</Link>
      </p>
      <p className="text-center text-xs text-slate-400 mt-4">Demo: admin@hospital.com / admin123</p>
    </div>
  );
}
