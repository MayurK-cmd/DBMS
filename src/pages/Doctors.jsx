// ===================================
// Doctors Page
// ===================================
import { useState, useEffect } from "react";
import { Plus, Search, Star, Users, Edit, Trash2 } from "lucide-react";
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from "../services/doctorService";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;
  const [showForm, setShowForm] = useState(false);
  const [editDoc, setEditDoc] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({ name:"",specialization:"",phone:"",email:"",experience:"",availability:"Mon-Fri",status:"Available" });

  const load = async () => { setLoading(true); setDoctors(await getDoctors(search)); setLoading(false); };
  useEffect(() => { load(); }, [search]);

  const totalPages = Math.ceil(doctors.length / perPage);
  const paginated = doctors.slice((page-1)*perPage, page*perPage);

  const handleAdd = () => { setEditDoc(null); setForm({name:"",specialization:"",phone:"",email:"",experience:"",availability:"Mon-Fri",status:"Available"}); setShowForm(true); };
  const handleEdit = (d) => { setEditDoc(d); setForm({...d, experience:String(d.experience)}); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name||!form.specialization) { toast.error("Name and specialization required"); return; }
    if (editDoc) { await updateDoctor(editDoc.id,{...form,experience:Number(form.experience)}); toast.success("Doctor updated"); }
    else { await createDoctor({...form,experience:Number(form.experience)}); toast.success("Doctor added"); }
    setShowForm(false); load();
  };

  const handleDelete = async () => { await deleteDoctor(deleteTarget.id); toast.success("Doctor removed"); setDeleteTarget(null); load(); };

  const statusColor = { Available:"badge-success", "On Leave":"badge-warning" };

  if (loading) return <Loader fullPage />;

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div><h1 className="text-xl font-bold text-slate-800 dark:text-white">Doctor Management</h1><p className="text-sm text-slate-400">{doctors.length} doctors</p></div>
        <button onClick={handleAdd} className="btn-primary"><Plus size={18}/>Add Doctor</button>
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2 max-w-md">
          <Search size={16} className="text-slate-400"/>
          <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} className="bg-transparent text-sm outline-none w-full text-slate-700 dark:text-slate-200" placeholder="Search doctors..."/>
        </div>
      </div>

      {/* Doctor cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {paginated.map(d=>(
          <div key={d.id} className="glass-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg">{d.name.charAt(4)||d.name.charAt(0)}</div>
                <div><p className="font-semibold text-slate-800 dark:text-white">{d.name}</p><p className="text-xs text-blue-500">{d.specialization}</p></div>
              </div>
              <span className={`badge ${statusColor[d.status]||"badge-info"}`}>{d.status}</span>
            </div>
            <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
              <div className="flex justify-between"><span>Experience</span><span className="font-medium text-slate-700 dark:text-slate-200">{d.experience} years</span></div>
              <div className="flex justify-between"><span>Availability</span><span className="font-medium text-slate-700 dark:text-slate-200">{d.availability}</span></div>
              <div className="flex justify-between"><span>Patients</span><span className="font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1"><Users size={13}/>{d.patients}</span></div>
              <div className="flex justify-between"><span>Rating</span><span className="font-medium text-amber-500 flex items-center gap-1"><Star size={13}/>{d.rating}</span></div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>handleEdit(d)} className="btn-secondary flex-1 justify-center text-xs py-2"><Edit size={14}/>Edit</button>
              <button onClick={()=>setDeleteTarget(d)} className="btn-danger flex-1 justify-center text-xs py-2"><Trash2 size={14}/>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage}/>

      <Modal isOpen={showForm} onClose={()=>setShowForm(false)} title={editDoc?"Edit Doctor":"Add Doctor"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name *</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="form-input"/></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Specialization *</label><input value={form.specialization} onChange={e=>setForm({...form,specialization:e.target.value})} className="form-input"/></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="form-input"/></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="form-input"/></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Experience (yrs)</label><input type="number" value={form.experience} onChange={e=>setForm({...form,experience:e.target.value})} className="form-input"/></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="form-input"><option>Available</option><option>On Leave</option></select></div>
          </div>
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={()=>setShowForm(false)} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">{editDoc?"Update":"Add"}</button></div>
        </form>
      </Modal>
      <ConfirmDialog isOpen={!!deleteTarget} onClose={()=>setDeleteTarget(null)} onConfirm={handleDelete} message={`Remove ${deleteTarget?.name}?`}/>
    </div>
  );
}
