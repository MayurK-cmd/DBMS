// ===================================
// Billing Page
// ===================================
import { useState, useEffect } from "react";
import { Search, IndianRupee, CreditCard, AlertCircle, CheckCircle } from "lucide-react";
import { getBillingRecords, getBillingSummary } from "../services/billingService";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

export default function Billing() {
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState({ total:0,paid:0,pending:0,overdue:0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [data, sum] = await Promise.all([getBillingRecords({ search, status: statusFilter }), getBillingSummary()]);
      setRecords(data); setSummary(sum); setLoading(false);
    })();
  }, [search, statusFilter]);

  const totalPages = Math.ceil(records.length / perPage);
  const paginated = records.slice((page-1)*perPage, page*perPage);
  const statusColor = { Paid:"badge-success", Pending:"badge-warning", Overdue:"badge-danger" };

  const summaryCards = [
    { label:"Total Revenue", value:`₹${(summary.total/1000).toFixed(1)}K`, icon:IndianRupee, color:"from-blue-500 to-blue-600" },
    { label:"Paid", value:`₹${(summary.paid/1000).toFixed(1)}K`, icon:CheckCircle, color:"from-emerald-500 to-emerald-600" },
    { label:"Pending", value:`₹${(summary.pending/1000).toFixed(1)}K`, icon:CreditCard, color:"from-amber-500 to-orange-500" },
    { label:"Overdue", value:`₹${(summary.overdue/1000).toFixed(1)}K`, icon:AlertCircle, color:"from-red-500 to-red-600" },
  ];

  if (loading) return <Loader fullPage />;

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      <h1 className="text-xl font-bold text-slate-800 dark:text-white">Billing & Payments</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryCards.map((c,i)=>(
          <div key={i} className="glass-card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shrink-0`}>
              <c.icon size={22} className="text-white"/>
            </div>
            <div><p className="text-xl font-bold text-slate-800 dark:text-white">{c.value}</p><p className="text-xs text-slate-400">{c.label}</p></div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2 flex-1 max-w-md">
          <Search size={16} className="text-slate-400"/>
          <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} className="bg-transparent text-sm outline-none w-full text-slate-700 dark:text-slate-200" placeholder="Search by patient name..."/>
        </div>
        <select value={statusFilter} onChange={e=>{setStatusFilter(e.target.value);setPage(1);}} className="form-input w-auto text-sm py-2">
          <option value="">All</option><option>Paid</option><option>Pending</option><option>Overdue</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass-card p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-slate-200 dark:border-slate-700">
            {["Patient","Doctor","Date","Description","Amount","Method","Status"].map(h=>(
              <th key={h} className="text-left py-3 px-3 font-semibold text-slate-500 dark:text-slate-400 text-xs">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {paginated.map(b=>(
              <tr key={b.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-3 font-medium text-slate-800 dark:text-white">{b.patientName}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{b.doctor}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{b.date}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{b.description}</td>
                <td className="py-3 px-3 font-semibold text-slate-800 dark:text-white">₹{b.amount.toLocaleString()}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{b.method}</td>
                <td className="py-3 px-3"><span className={`badge ${statusColor[b.status]||"badge-info"}`}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage}/>
      </div>
    </div>
  );
}
