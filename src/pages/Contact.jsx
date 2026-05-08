// ===================================
// Contact / About Page
// ===================================
import { MapPin, Phone, Mail, Clock, Heart, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name||!form.email||!form.message) { toast.error("Please fill all fields"); return; }
    toast.success("Message sent successfully!");
    setForm({ name:"", email:"", message:"" });
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* About section */}
      <div className="glass-card p-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-60 h-60 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4"/>
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Heart size={28}/> <h1 className="text-2xl font-bold">About MediCare HMS</h1>
          </div>
          <p className="text-blue-100 max-w-2xl leading-relaxed">
            MediCare Hospital Management System is a comprehensive solution for managing hospital operations including patient records, doctor schedules, appointments, billing, and medical history. Built as a DBMS mini-project demonstrating modern web technologies and database design principles.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact info cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Hospital Information</h2>
          {[
            { icon: MapPin, label: "Address", value: "123 Healthcare Avenue, Medical District, New Delhi - 110001" },
            { icon: Phone, label: "Phone", value: "+91 11 2345 6789" },
            { icon: Mail, label: "Email", value: "info@medicare-hms.com" },
            { icon: Clock, label: "Hours", value: "24/7 Emergency | OPD: 8 AM - 8 PM" },
          ].map((item,i)=>(
            <div key={i} className="glass-card p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-blue-500"/>
              </div>
              <div><p className="text-xs font-semibold text-slate-400 uppercase">{item.label}</p><p className="text-sm text-slate-700 dark:text-slate-200 mt-0.5">{item.value}</p></div>
            </div>
          ))}

          {/* Tech stack */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {["React","Vite","Tailwind CSS","React Router","Recharts","Lucide Icons","Supabase (optional)"].map(t=>(
                <span key={t} className="badge badge-info">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="form-input" placeholder="Your name"/></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="form-input" placeholder="you@example.com"/></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label><textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={5} className="form-input" placeholder="Write your message..."/></div>
            <button type="submit" className="btn-primary w-full justify-center"><Send size={16}/>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
