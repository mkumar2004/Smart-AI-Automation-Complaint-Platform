import React from 'react'
import InfoCard from '../CustomerDashboard/infoCard'
import RecentComplaints from '../CustomerDashboard/RecentComplaints'
import ActivityTime from '../CustomerDashboard/ActivityTime'
import { ClipboardList, Clock, CheckCircle, AlarmClock, Bell, Menu } from "lucide-react"

interface DashboardProps {
  onMenuClick?: () => void
}

function Dashboard({ onMenuClick }: DashboardProps) {
  const stats = [
    {
      label: "Total Complaints",
      value: "24",
      sub: "All time complaints",
      icon: ClipboardList,
      iconColor: "text-blue-500 dark:text-blue-400",
      iconBg: "bg-blue-50 dark:bg-blue-950/30",
      valueColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Open Complaints",
      value: "6",
      sub: "Currently open",
      icon: Clock,
      iconColor: "text-orange-500 dark:text-orange-400",
      iconBg: "bg-orange-50 dark:bg-orange-950/30",
      valueColor: "text-orange-500 dark:text-orange-400",
    },
    {
      label: "Resolved",
      value: "18",
      sub: "Successfully resolved",
      icon: CheckCircle,
      iconColor: "text-green-500 dark:text-green-400",
      iconBg: "bg-green-50 dark:bg-green-950/30",
      valueColor: "text-green-500 dark:text-green-400",
    },
    {
      label: "Avg Response Time",
      value: "6.4 hrs",
      sub: "Average response time",
      icon: AlarmClock,
      iconColor: "text-purple-500 dark:text-purple-400",
      iconBg: "bg-purple-50 dark:bg-purple-950/30",
      valueColor: "text-purple-600 dark:text-purple-400",
    },
  ]

  return (
    <div className='p-4 md:p-6 bg-transparent w-full h-full flex flex-col gap-4 overflow-hidden'>

      {/* Header — fixed height */}
      <div className='flex items-center justify-between flex-shrink-0'>
        <div className='flex items-center gap-3'>
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className='lg:hidden p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm'
              aria-label="Toggle Menu"
            >
              <Menu size={20} />
            </button>
          )}
          <div>
            <h1 className='text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2'>
              Welcome back, Sarah! <span>👋</span>
            </h1>
            <p className='text-sm text-slate-500 dark:text-slate-400 mt-0.5'>Here&apos;s what&apos;s happening with your complaints.</p>
          </div>
        </div>
        <button className="relative w-9 h-9 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
          <Bell size={18} className="text-slate-600 dark:text-slate-300" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
            3
          </span>
        </button>
      </div>

      {/* Info cards — fixed height */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 flex-shrink-0">
        {stats.map((stat) => (
          <InfoCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Complaints + timeline — fills remaining space, NO outer scroll */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
        <div className="lg:col-span-2 min-h-0 h-full">
          <RecentComplaints />
        </div>
        <div className="lg:col-span-1 min-h-0 h-full">
          <ActivityTime />
        </div>
      </div>

    </div>
  )
}

export default Dashboard