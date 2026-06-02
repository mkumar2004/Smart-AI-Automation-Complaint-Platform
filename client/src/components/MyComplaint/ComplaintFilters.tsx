"use client"
import { Search, RotateCcw, Calendar } from "lucide-react"

type Props = {
  search: string
  status: string
  category: string
  onSearchChange: (v: string) => void
  onStatusChange: (v: string) => void
  onCategoryChange: (v: string) => void
  onReset: () => void
}

export default function ComplaintFilters({
  search, status, category,
  onSearchChange, onStatusChange, onCategoryChange, onReset
}: Props) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm px-5 py-4">
      <div className="flex flex-wrap items-end gap-4">

        {/* Search — no label, vertically centered with others */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative mt-5">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title or ticket ID..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 bg-white dark:bg-slate-950"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-1">Status</label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 dark:text-slate-250 bg-white dark:bg-slate-950 min-w-[130px]"
            >
              <option value="" className="dark:bg-slate-900">All Status</option>
              <option value="Pending" className="dark:bg-slate-900">Pending</option>
              <option value="Processing" className="dark:bg-slate-900">Processing</option>
              <option value="Assigned" className="dark:bg-slate-900">Assigned</option>
              <option value="In Progress" className="dark:bg-slate-900">In Progress</option>
              <option value="Resolved" className="dark:bg-slate-900">Resolved</option>
              <option value="Escalated" className="dark:bg-slate-900">Escalated</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▾</span>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-1">Category</label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 dark:text-slate-250 bg-white dark:bg-slate-950 min-w-[140px]"
            >
              <option value="" className="dark:bg-slate-900">All Categories</option>
              <option value="Internet" className="dark:bg-slate-900">Internet</option>
              <option value="Billing" className="dark:bg-slate-900">Billing</option>
              <option value="Account" className="dark:bg-slate-900">Account</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▾</span>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-1">Date Range</label>
          <div className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950 min-w-[210px]">
            <Calendar size={13} className="text-slate-400 flex-shrink-0" />
            <span>May 1, 2025 - May 31, 2025</span>
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap animate-none"
        >
          <RotateCcw size={13} />
          Reset Filters
        </button>

      </div>
    </div>
  )
}