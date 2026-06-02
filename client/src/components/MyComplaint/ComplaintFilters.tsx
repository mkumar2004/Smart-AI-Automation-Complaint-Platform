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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
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
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 placeholder:text-slate-400 bg-white"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="text-xs text-slate-500 font-medium block mb-1">Status</label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 bg-white min-w-[130px]"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Escalated">Escalated</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▾</span>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-xs text-slate-500 font-medium block mb-1">Category</label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 bg-white min-w-[140px]"
            >
              <option value="">All Categories</option>
              <option value="Internet">Internet</option>
              <option value="Billing">Billing</option>
              <option value="Account">Account</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▾</span>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="text-xs text-slate-500 font-medium block mb-1">Date Range</label>
          <div className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 bg-white min-w-[210px]">
            <Calendar size={13} className="text-slate-400 flex-shrink-0" />
            <span>May 1, 2025 - May 31, 2025</span>
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
        >
          <RotateCcw size={13} />
          Reset Filters
        </button>

      </div>
    </div>
  )
}