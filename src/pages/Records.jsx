// ===================================
// Medical Records Page
// ===================================
import { useState } from "react";
import { Search, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { medicalRecords } from "../data/mockData";

export default function Records() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = medicalRecords.filter(r =>
    r.patientName.toLowerCase().includes(search.toLowerCase()) ||
    r.diagnosis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      <h1 className="text-xl font-bold text-slate-800 dark:text-white">Medical Records</h1>

      <div className="glass-card p-4">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2 max-w-md">
          <Search size={16} className="text-slate-400"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} className="bg-transparent text-sm outline-none w-full text-slate-700 dark:text-slate-200" placeholder="Search by patient or diagnosis..."/>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(r=>(
          <div key={r.id} className="glass-card overflow-hidden">
            {/* Header row — click to expand */}
            <button onClick={()=>setExpanded(expanded===r.id?null:r.id)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-white"/>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">{r.patientName}</p>
                  <p className="text-xs text-slate-400">{r.date} · {r.doctor}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="badge badge-info hidden sm:inline-flex">{r.diagnosis.split(" ").slice(0,3).join(" ")}</span>
                {expanded===r.id ? <ChevronUp size={18} className="text-slate-400"/> : <ChevronDown size={18} className="text-slate-400"/>}
              </div>
            </button>

            {/* Expanded details */}
            {expanded===r.id && (
              <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-800 fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Diagnosis</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-200">{r.diagnosis}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Vitals</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2"><span className="text-slate-400 text-xs">BP:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{r.vitals.bp}</span></div>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2"><span className="text-slate-400 text-xs">Pulse:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{r.vitals.pulse} bpm</span></div>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2"><span className="text-slate-400 text-xs">Temp:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{r.vitals.temp}</span></div>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2"><span className="text-slate-400 text-xs">Weight:</span> <span className="font-medium text-slate-700 dark:text-slate-200">{r.vitals.weight}</span></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Prescription</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-200">{r.prescription}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Doctor Notes</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-200">{r.notes}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length===0 && <div className="text-center py-12 text-slate-400">No records found.</div>}
      </div>
    </div>
  );
}
