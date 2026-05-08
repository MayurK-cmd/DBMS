// ===================================
// Appointments Page
// ===================================
import { useState, useEffect } from "react";
import { Plus, Search, Clock, Filter } from "lucide-react";
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from "../services/appointmentService";
import AppointmentForm from "../components/AppointmentForm";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Appointments() {
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;
  const [showForm, setShowForm] = useState(false);
  const [editAppt, setEditAppt] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = async () => { setLoading(true); setAppts(await getAppointments({ search, status: statusFilter })); setLoading(false); };
  useEffect(() => { load(); }, [search, statusFilter]);

  const totalPages = Math.ceil(appts.length / perPage);
  const paginated = appts.slice((page-1)*perPage, page*perPage);

  const handleSubmit = async (form) => {
    if (editAppt) { await updateAppointment(editAppt.id, form); toast.success("Appointment updated"); }
    else { await createAppointment(form); toast.success("Appointment booked"); }
    setShowForm(false); setEditAppt(null); load();
  };

  const handleDelete = async () => { await deleteAppointment(deleteTarget.id); toast.success("Appointment cancelled"); setDeleteTarget(null); load(); };

  const statusColor = { Scheduled:"badge-info", Completed:"badge-success", "In Progress":"badge-warning", Cancelled:"badge-danger" };
  const statuses = ["","Scheduled","Completed","In Progress","Cancelled"];

  if (loading) return <Loader fullPage />;

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div><h1 className="text-xl font-bold text-slate-800 dark:text-white">Appointments</h1><p className="text-sm text-slate-400">{appts.length} total</p></div>
        <button onClick={()=>{setEditAppt(null);setShowForm(true);}} className="btn-primary"><Plus size={18}/>Book Appointment</button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2 flex-1 max-w-md">
          <Search size={16} className="text-slate-400"/>
          <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} className="bg-transparent text-sm outline-none w-full text-slate-700 dark:text-slate-200" placeholder="Search by patient or doctor..."/>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400"/>
          <select value={statusFilter} onChange={e=>{setStatusFilter(e.target.value);setPage(1);}} className="form-input w-auto text-sm py-2">
            <option value="">All Status</option>
            {statuses.filter(Boolean).map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-slate-200 dark:border-slate-700">
            {["Patient","Doctor","Date","Time","Type","Status","Actions"].map(h=>(
              <th key={h} className={`py-3 px-3 font-semibold text-slate-500 dark:text-slate-400 text-xs ${h==="Actions"?"text-right":"text-left"}`}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {paginated.map(a=>(
              <tr key={a.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-3 font-medium text-slate-800 dark:text-white">{a.patientName}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{a.doctorName}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{a.date}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 flex items-center gap-1"><Clock size={13}/>{a.time}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{a.type}</td>
                <td className="py-3 px-3"><span className={`badge ${statusColor[a.status]||"badge-info"}`}>{a.status}</span></td>
                <td className="py-3 px-3 text-right space-x-1">
                  <button onClick={()=>{setEditAppt(a);setShowForm(true);}} className="text-xs text-blue-500 hover:underline">Edit</button>
                  <button onClick={()=>setDeleteTarget(a)} className="text-xs text-red-500 hover:underline">Cancel</button>
                </td>
              </tr>
            ))}
            {paginated.length===0&&<tr><td colSpan={7} className="text-center py-8 text-slate-400">No appointments found.</td></tr>}
          </tbody>
        </table>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage}/>
      </div>

      <Modal isOpen={showForm} onClose={()=>{setShowForm(false);setEditAppt(null);}} title={editAppt?"Edit Appointment":"Book Appointment"}>
        <AppointmentForm appointment={editAppt} onSubmit={handleSubmit} onClose={()=>{setShowForm(false);setEditAppt(null);}}/>
      </Modal>
      <ConfirmDialog isOpen={!!deleteTarget} onClose={()=>setDeleteTarget(null)} onConfirm={handleDelete} title="Cancel Appointment" message={`Cancel appointment for ${deleteTarget?.patientName}?`}/>
    </div>
  );
}
