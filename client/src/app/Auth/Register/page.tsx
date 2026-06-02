"use client";
import RegisterForm from "@/components/Auth/RegisterForm";
import Image from "next/image";
import RegisterLogo from "../../../Assests/RegisterLogo.png";

export default function Register() {
  return (
    <div className="min-h-screen flex">
      <LeftPanel />
      <div className="flex-1 bg-white flex flex-col">
       <RegisterForm/>
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
      <div className="relative">
  <h1 className="text-4xl font-bold leading-snug ">
    Smarter Complaints.<br />
    <span className="text-[#6b7fff]">Faster Resolutions.</span>
  </h1>
  <p className="text-sm text-[#8891cc] mt-4 leading-relaxed max-w-[280px]">
    AI reads, classifies, drafts responses
    and assigns tickets automatically.
  </p>
</div>

      {/* Dashboard Illustration */}
      <div className="relative z-10 flex-1 flex flex-col gap-3 ">
        <Image src={RegisterLogo} className="w-50hv h-50"  alt="Register Logo"/>
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