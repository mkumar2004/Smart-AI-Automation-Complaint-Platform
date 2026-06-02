"use client"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"

type Props = {
  page: number
  totalPages: number
  perPage: number
  total: number
  onPageChange: (p: number) => void
  onPerPageChange: (n: number) => void
}

export default function ComplaintPagination({ page, totalPages, perPage, total, onPageChange, onPerPageChange }: Props) {
  const start = (page - 1) * perPage + 1
  const end   = Math.min(page * perPage, total)

  // Show max 5 page buttons around current page
  const pages: number[] = []
  const delta = 2
  for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
    pages.push(i)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-3">

      {/* Per page */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <div className="relative">
          <select
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="appearance-none border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
          >
            {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
        <span>per page</span>
      </div>

      {/* Count info */}
      <p className="text-sm text-slate-500">
        Showing {start}–{end} of {total} complaints
      </p>

      {/* Page buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={14} /> Previous
        </button>

        {pages[0] > 1 && (
          <>
            <button onClick={() => onPageChange(1)} className="w-8 h-8 text-sm rounded-lg text-slate-600 border border-slate-200 hover:bg-slate-50">1</button>
            {pages[0] > 2 && <span className="text-slate-400 px-1">…</span>}
          </>
        )}

        {pages.map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 text-sm rounded-lg font-medium transition-colors ${
              page === p
                ? "bg-blue-600 text-white"
                : "text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {p}
          </button>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && <span className="text-slate-400 px-1">…</span>}
            <button onClick={() => onPageChange(totalPages)} className="w-8 h-8 text-sm rounded-lg text-slate-600 border border-slate-200 hover:bg-slate-50">{totalPages}</button>
          </>
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>

    </div>
  )
}