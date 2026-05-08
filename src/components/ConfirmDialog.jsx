// ===================================
// Confirm Dialog — Delete confirmation popup
// ===================================
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title = "Confirm Delete", message = "Are you sure? This action cannot be undone." }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm fade-in">
        <div className="p-6 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{message}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={onClose} className="btn-secondary">Cancel</button>
            <button onClick={onConfirm} className="btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
