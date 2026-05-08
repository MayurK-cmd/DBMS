// ===================================
// Footer Component
// ===================================
// Simple footer with copyright and links.

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} MediCare HMS. All rights reserved.
        </p>
        <p className="text-xs text-slate-400 flex items-center gap-1">
          Made with <Heart size={12} className="text-red-400" /> for DBMS Mini Project
        </p>
      </div>
    </footer>
  );
}
