// ===================================
// Patients Page — CRUD for patients
// ===================================
import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import PatientTable from "../components/PatientTable";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { getPatients, createPatient, updatePatient, deletePatient } from "../services/patientService";
import toast from "react-hot-toast";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  // Modal states
  const [showForm, setShowForm] = useState(false);
  const [editPatient, setEditPatient] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({ name:"", age:"", gender:"Male", bloodGroup:"", phone:"", email:"", address:"", condition:"", status:"Active" });

  // Load patients
  const loadPatients = async () => {
    setLoading(true);
    const data = await getPatients(search);
    setPatients(data);
    setLoading(false);
  };

  useEffect(() => { loadPatients(); }, [search]);

  // Pagination
  const totalPages = Math.ceil(patients.length / perPage);
  const paginatedPatients = patients.slice((page - 1) * perPage, page * perPage);

  // Open form for adding
  const handleAdd = () => { setEditPatient(null); setForm({ name:"",age:"",gender:"Male",bloodGroup:"",phone:"",email:"",address:"",condition:"",status:"Active" }); setShowForm(true); };

  // Open form for editing
  const handleEdit = (p) => { setEditPatient(p); setForm({...p, age: String(p.age)}); setShowForm(true); };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.phone) { toast.error("Name, Age and Phone are required"); return; }
    try {
      if (editPatient) {
        await updatePatient(editPatient.id, { ...form, age: Number(form.age) });
        toast.success("Patient updated");
      } else {
        await createPatient({ ...form, age: Number(form.age), admitDate: new Date().toISOString().split("T")[0] });
        toast.success("Patient added");
      }
      setShowForm(false);
      loadPatients();
    } catch { toast.error("Operation failed"); }
  };

  // Delete
  const handleDelete = async () => {
    await deletePatient(deleteTarget.id);
    toast.success("Patient deleted");
    setDeleteTarget(null);
    loadPatients();
  };

  if (loading) return <Loader fullPage />;

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Patient Management</h1>
          <p className="text-sm text-slate-400">{patients.length} patients total</p>
        </div>
        <button onClick={handleAdd} className="btn-primary"><Plus size={18}/>Add Patient</button>
      </div>

      {/* Search */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2 max-w-md">
          <Search size={16} className="text-slate-400"/>
          <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} className="bg-transparent text-sm outline-none w-full text-slate-700 dark:text-slate-200" placeholder="Search patients by name, condition or phone..."/>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card p-4">
        <PatientTable patients={paginatedPatients} onEdit={handleEdit} onDelete={p=>setDeleteTarget(p)} onView={p=>handleEdit(p)} />
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage}/>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showForm} onClose={()=>setShowForm(false)} title={editPatient?"Edit Patient":"Add Patient"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name *</label><input name="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="form-input" /></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Age *</label><input type="number" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} className="form-input" /></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gender</label><select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} className="form-input"><option>Male</option><option>Female</option><option>Other</option></select></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Blood Group</label><input value={form.bloodGroup} onChange={e=>setForm({...form,bloodGroup:e.target.value})} className="form-input" /></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone *</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="form-input" /></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="form-input" /></div>
          </div>
          <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Condition</label><input value={form.condition} onChange={e=>setForm({...form,condition:e.target.value})} className="form-input" /></div>
          <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address</label><input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} className="form-input" /></div>
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={()=>setShowForm(false)} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">{editPatient?"Update":"Add"} Patient</button></div>
        </form>
      </Modal>

      {/* Delete confirm */}
      <ConfirmDialog isOpen={!!deleteTarget} onClose={()=>setDeleteTarget(null)} onConfirm={handleDelete} message={`Delete patient "${deleteTarget?.name}"? This cannot be undone.`} />
    </div>
  );
}
