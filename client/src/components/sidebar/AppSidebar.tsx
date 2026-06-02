"use client"

import { LayoutDashboard, ClipboardList, PlusSquare, User, LogOut, Moon, Sun } from "lucide-react"
import { useState } from "react"

const navItems = [
  { title: "Dashboard",     icon: LayoutDashboard, key: "dashboard" },
  { title: "My Complaints", icon: ClipboardList,   key: "complaints" },
  { title: "New Complaint", icon: PlusSquare,      key: "new-complaint" },
  { title: "Profile",       icon: User,            key: "profile" },
]

type Props = {
  active: string
  onSelect: (key: string) => void
  isOpen?: boolean
  onClose?: () => void
}

export function AppSidebar({ active, onSelect, isOpen, onClose }: Props) {
  const [lightMode, setLightMode] = useState(false)

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        style={{ backgroundColor: "#0f1c2e", minHeight: "100vh", width: "230px", flexShrink: 0 }}
        className={`flex flex-col text-white fixed lg:static inset-y-0 left-0 z-50 transform lg:transform-none transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-base"
            style={{ backgroundColor: "#2563eb" }}>
            C
          </div>
          <div>
            <div className="font-bold text-white text-base leading-tight">
              Compli<span style={{ color: "#60a5fa" }}>AI</span>
            </div>
            <div className="text-white/40 text-[10px]">AI Complaint Management</div>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="px-4 py-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm"
          style={{ backgroundColor: "#334155" }}>
          SJ
        </div>
        <div>
          <div className="text-white text-sm font-semibold">Sarah Johnson</div>
          <div className="text-white/40 text-xs">Customer</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full text-left transition-all"
            style={{
              backgroundColor: active === item.key ? "#2563eb" : "transparent",
              color: active === item.key ? "#ffffff" : "rgba(255,255,255,0.6)",
            }}
            onMouseEnter={(e) => {
              if (active !== item.key)
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.08)"
            }}
            onMouseLeave={(e) => {
              if (active !== item.key)
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"
            }}
          >
            <item.icon size={18} />
            <span>{item.title}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10 space-y-3">
        {/* Light mode toggle */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Moon size={15} />
            <span>Light Mode</span>
          </div>
          <button
            onClick={() => setLightMode(!lightMode)}
            className="w-11 h-6 rounded-full flex items-center px-0.5 transition-colors relative"
            style={{ backgroundColor: lightMode ? "#2563eb" : "#334155" }}
          >
            <div
              className="w-5 h-5 rounded-full bg-white flex items-center justify-center transition-transform duration-200"
              style={{ transform: lightMode ? "translateX(20px)" : "translateX(0px)" }}
            >
              {lightMode
                ? <Sun size={11} style={{ color: "#f59e0b" }} />
                : <Moon size={11} style={{ color: "#64748b" }} />}
            </div>
          </button>
        </div>

        {/* Logout */}
        <button
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm transition-all"
          style={{ color: "rgba(255,255,255,0.6)" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </>
  )
}