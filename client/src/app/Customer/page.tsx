"use client"
import {Menu} from "lucide-react"
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../../components/sidebar/AppSidebar"
import Dashboard from "../../components/sidebar/Dashboard"
import MyComplaints from "../../components/sidebar/MyComplaints"
import NewComplaint from "../../components/sidebar/NewComplaints"
import Profile from "../../components/sidebar/Profile"

export default function CustomerPage() {
  const [active, setActive] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderView = () => {
    switch (active) {
      case "dashboard":
        return <Dashboard onMenuClick={() => setSidebarOpen(true)} />
      case "complaints":
        return <MyComplaints />
      case "new-complaint":
        return <NewComplaint />
      case "profile":
        return <Profile />
      default:
        return <Dashboard onMenuClick={() => setSidebarOpen(true)} />
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: "#f4f6fb" }}>
      <AppSidebar
        active={active}
        onSelect={(key) => {
          setActive(key)
          setSidebarOpen(false)
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 overflow-hidden flex flex-col">
        {renderView()}
      </main>
    </div>
  )
}