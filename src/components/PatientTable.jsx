// ===================================
// Patient Table Component
// ===================================
import { Edit, Trash2, Eye } from "lucide-react";

export default function PatientTable({ patients, onEdit, onDelete, onView }) {
  const statusColor = { Active: "badge-success", Discharged: "badge-info", Critical: "badge-danger" };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            {["Name","Age","Gender","Blood","Phone","Condition","Status","Actions"].map(h=>(
              <th key={h} className={`py-3 px-4 font-semibold text-slate-500 dark:text-slate-400 ${h==="Actions"?"text-right":"text-left"}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">{p.name.charAt(0)}</div>
                  <span className="font-medium text-slate-800 dark:text-white">{p.name}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{p.age}</td>
              <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{p.gender}</td>
              <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{p.bloodGroup}</td>
              <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{p.phone}</td>
              <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{p.condition}</td>
              <td className="py-3 px-4"><span className={`badge ${statusColor[p.status]||"badge-info"}`}>{p.status}</span></td>
              <td className="py-3 px-4">
                <div className="flex items-center justify-end gap-1">
                  <button onClick={()=>onView?.(p)} className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-500 transition-colors" title="View"><Eye size={16}/></button>
                  <button onClick={()=>onEdit?.(p)} className="p-1.5 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/30 text-amber-500 transition-colors" title="Edit"><Edit size={16}/></button>
                  <button onClick={()=>onDelete?.(p)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 transition-colors" title="Delete"><Trash2 size={16}/></button>
                </div>
              </td>
            </tr>
          ))}
          {patients.length===0&&(<tr><td colSpan={8} className="text-center py-8 text-slate-400">No patients found.</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
