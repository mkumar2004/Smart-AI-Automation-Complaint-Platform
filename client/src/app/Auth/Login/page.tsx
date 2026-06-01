"use client";
import LoginForm from "@/components/Auth/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex">
      <LeftPanel />
      <div className="flex-1 bg-white flex flex-col">
        <LoginForm />
      </div>
    </div>
  );
}

function LeftPanel() {
  return (
    <div
      className="hidden lg:flex flex-col w-[55%] min-h-screen p-10 gap-8 text-white relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0e2e 0%, #0d1554 60%, #0f1a6e 100%)" }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Logo */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-14 h-14 rounded-xl bg-[#1a2480] flex items-center justify-center border border-[#2a3590]">
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
              stroke="#7b8cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="8" y1="10" x2="16" y2="10" stroke="#7b8cff" strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="14" x2="13" y2="14" stroke="#7b8cff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="text-xl font-bold">
            Compli<span className="text-[#6b7fff]">ai</span>
          </div>
          <div className="text-xs text-[#8891cc]">AI Complaint Management</div>
        </div>
      </div>

      {/* Tagline */}
      <div className="relative z-10">
        <h1 className="text-4xl font-bold ">
          Smarter Complaints.<br />
          <span className="text-[#6b7fff]">Faster Resolutions.</span>
        </h1>
        <p className="text-sm text-[#8891cc] mt-4 leading-relaxed">
          AI reads, classifies, drafts responses<br />
          and assigns tickets automatically.
        </p>
      </div>

      {/* Dashboard Illustration */}
      <div className="relative z-10 flex-1 flex flex-col gap-3 ">
        <div className="relative">
          {/* Main dashboard card */}
          <div className="bg-white rounded-2xl p-4 text-slate-900 shadow-2xl mx-4">
            <div className="text-xs font-bold mb-3 text-slate-700">Dashboard</div>
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: "Total Complaints", val: "12,458", delta: "+ 18.2%" },
                { label: "In Progress", val: "2,345", delta: "+ 12.4%" },
                { label: "Resolved", val: "9,213", delta: "+ 22.1%" },
              ].map((k) => (
                <div key={k.label} className="bg-slate-50 rounded-lg p-2">
                  <div className="text-[8px] text-slate-400 mb-0.5">{k.label}</div>
                  <div className="text-sm font-bold text-slate-800">{k.val}</div>
                  <div className="text-[8px] text-emerald-500 font-semibold">{k.delta}</div>
                </div>
              ))}
            </div>
            {/* Mini chart */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-50 rounded-lg p-2">
                <div className="text-[8px] text-slate-500 mb-1 flex justify-between">
                  <span>Complaints Over Time</span>
                  <span className="text-[7px] bg-white border border-slate-200 px-1 rounded">This Week ▾</span>
                </div>
                <svg viewBox="0 0 120 35" className="w-full h-8">
                  <polyline fill="rgba(99,102,241,0.15)" stroke="none"
                    points="0,30 20,24 40,20 60,15 80,10 100,6 120,3 120,35 0,35" />
                  <polyline fill="none" stroke="#6366f1" strokeWidth="1.5"
                    points="0,30 20,24 40,20 60,15 80,10 100,6 120,3" />
                </svg>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <div className="text-[8px] text-slate-500 mb-1">By Category</div>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 32 32" className="w-10 h-10 shrink-0">
                    <circle cx="16" cy="16" r="12" fill="none" stroke="#6366f1" strokeWidth="6" strokeDasharray="28 47" />
                    <circle cx="16" cy="16" r="12" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="18 57" strokeDashoffset="-28" />
                    <circle cx="16" cy="16" r="12" fill="none" stroke="#f59e0b" strokeWidth="6" strokeDasharray="14 61" strokeDashoffset="-46" />
                    <circle cx="16" cy="16" r="12" fill="none" stroke="#ef4444" strokeWidth="6" strokeDasharray="11 64" strokeDashoffset="-60" />
                  </svg>
                  <div className="text-[7px] space-y-0.5">
                    {[["#6366f1","Billing","28%"],["#10b981","Service","24%"],["#f59e0b","Product","20%"],["#ef4444","Other","16%"]].map(([c,l,v])=>(
                      <div key={l} className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:c}}/>
                        <span className="text-slate-500">{l}</span>
                        <span className="ml-auto font-semibold text-slate-700">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Classification floating badge */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl px-3 py-2 flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
                <path d="M17 13v8M13 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-800">AI Classification</div>
              <div className="text-[9px] text-indigo-500 font-semibold">High Priority</div>
            </div>
          </div>

          {/* Brain icon floating */}
          <div className="absolute -right-2 -top-4 w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M9.5 2A2.5 2.5 0 007 4.5v.5a3 3 0 00-3 3v.5A2.5 2.5 0 006.5 11H7v6a2 2 0 002 2h6a2 2 0 002-2v-6h.5A2.5 2.5 0 0020 8.5V8a3 3 0 00-3-3v-.5A2.5 2.5 0 0014.5 2h-5z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Chat bubble floating */}
          <div className="absolute -left-1 bottom-2 w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg mb-10">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Built for Every Role */}
        <div className="bg-[#111a5c]/80 backdrop-blur rounded-2xl p-4 border border-[#1e2a8a]/50 mt-5">
          <p className="text-xs font-bold text-center mb-4">Built for Every Role</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { bg: "#1e3a6a", iconBg: "bg-blue-900", icon: "👥", color: "text-blue-400", title: "Customer", desc: "Submit & track complaints" },
              { bg: "#1a3d2b", iconBg: "bg-emerald-900", icon: "🎧", color: "text-emerald-400", title: "Agent", desc: "Resolve issues faster" },
              { bg: "#2d1a6b", iconBg: "bg-purple-900", icon: "🛡️", color: "text-purple-400", title: "Admin", desc: "Manage system & analytics" },
            ].map((r) => (
              <div key={r.title} className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: r.bg }}>
                  {r.icon}
                </div>
                <div className="text-sm font-semibold">{r.title}</div>
                <div className="text-[10px] text-[#8891cc] leading-tight">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}