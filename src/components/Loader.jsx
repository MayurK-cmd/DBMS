// ===================================
// Loader / Spinner Component
// ===================================
export default function Loader({ fullPage = false, text = "Loading..." }) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-blue-500 pulse-dot" style={{ animationDelay: "0s" }} />
        <div className="w-3 h-3 rounded-full bg-blue-500 pulse-dot" style={{ animationDelay: "0.2s" }} />
        <div className="w-3 h-3 rounded-full bg-blue-500 pulse-dot" style={{ animationDelay: "0.4s" }} />
      </div>
      <p className="text-sm text-slate-400">{text}</p>
    </div>
  );

  if (fullPage) {
    return <div className="flex items-center justify-center min-h-[60vh]">{spinner}</div>;
  }
  return <div className="flex items-center justify-center py-8">{spinner}</div>;
}
