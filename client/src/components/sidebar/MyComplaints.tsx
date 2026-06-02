"use client"
import { useState, useMemo } from "react"
import { Bell } from "lucide-react"
import { Complaint } from "../MyComplaint/ComplaintCard"
import ComplaintFilters from "../MyComplaint/ComplaintFilters"
import ComplaintList from "../MyComplaint/ComplaintList"
import EmptyState from "../MyComplaint/EmptyState"
import ComplaintPagination from "../MyComplaint/ComplaintPagination"

const allComplaints: Complaint[] = [
  { id: "TK-1234", title: "Internet not working",       category: "Internet", priority: "High",   status: "Pending",     createdDate: "May 16, 2025", lastUpdated: "May 16, 2025 10:30 AM" },
  { id: "TK-1233", title: "Billing discrepancy",        category: "Billing",  priority: "Medium", status: "Processing",  createdDate: "May 15, 2025", lastUpdated: "May 15, 2025 04:15 PM" },
  { id: "TK-1232", title: "Slow internet speed",        category: "Internet", priority: "High",   status: "Assigned",    createdDate: "May 14, 2025", lastUpdated: "May 14, 2025 11:20 AM" },
  { id: "TK-1231", title: "Payment failed",             category: "Billing",  priority: "Low",    status: "In Progress", createdDate: "May 13, 2025", lastUpdated: "May 13, 2025 02:45 PM" },
  { id: "TK-1230", title: "Account not updating",       category: "Account",  priority: "Medium", status: "Resolved",    createdDate: "May 12, 2025", lastUpdated: "May 12, 2025 09:10 AM" },
  { id: "TK-1229", title: "Wrong charge on card",       category: "Billing",  priority: "High",   status: "Escalated",   createdDate: "May 10, 2025", lastUpdated: "May 10, 2025 03:30 PM" },
  { id: "TK-1228", title: "Unable to login",            category: "Account",  priority: "Low",    status: "Resolved",    createdDate: "May 9, 2025",  lastUpdated: "May 9, 2025 10:05 AM"  },
  { id: "TK-1227", title: "Network connectivity issue", category: "Internet", priority: "Medium", status: "Pending",     createdDate: "May 8, 2025",  lastUpdated: "May 8, 2025 08:40 AM"  },
  { id: "TK-1226", title: "Slow billing portal",        category: "Billing",  priority: "Low",    status: "Resolved",    createdDate: "May 7, 2025",  lastUpdated: "May 7, 2025 01:00 PM"  },
  { id: "TK-1225", title: "Login error on app",         category: "Account",  priority: "High",   status: "Assigned",    createdDate: "May 6, 2025",  lastUpdated: "May 6, 2025 09:00 AM"  },
]

export default function MyComplaints() {
  const [search,   setSearch]   = useState("")
  const [status,   setStatus]   = useState("")
  const [category, setCategory] = useState("")
  const [page,     setPage]     = useState(1)
  const [perPage,  setPerPage]  = useState(10)

  const filtered = useMemo(() => allComplaints.filter((c) => {
    const matchSearch   = !search   || c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus   = !status   || c.status === status
    const matchCategory = !category || c.category === category
    return matchSearch && matchStatus && matchCategory
  }), [search, status, category])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage)

  const handleReset = () => { setSearch(""); setStatus(""); setCategory(""); setPage(1) }

  return (
    <div className="p-6 bg-[#f4f6fb] h-full overflow-y-auto flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-start justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Complaints</h1>
          <p className="text-slate-500 text-sm mt-1">View and track all your complaints in one place.</p>
        </div>
        <button className="relative p-2 rounded-full hover:bg-slate-100 bg-white border border-slate-200 shadow-sm">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">3</span>
        </button>
      </div>

      {/* Filters */}
      <ComplaintFilters
        search={search} status={status} category={category}
        onSearchChange={(v) => { setSearch(v); setPage(1) }}
        onStatusChange={(v) => { setStatus(v); setPage(1) }}
        onCategoryChange={(v) => { setCategory(v); setPage(1) }}
        onReset={handleReset}
      />

      {/* Content: list + sidebar */}
      <div className="flex gap-5 items-start flex-1 min-h-0">

        {/* Left — complaint list */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {paginated.length > 0 ? (
            <ComplaintList complaints={paginated} />
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-10 flex items-center justify-center">
              <p className="text-slate-400 text-sm">No complaints match your filters.</p>
            </div>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <ComplaintPagination
              page={page}
              totalPages={totalPages}
              perPage={perPage}
              total={filtered.length}
              onPageChange={setPage}
              onPerPageChange={(n) => { setPerPage(n); setPage(1) }}
            />
          )}
        </div>

        {/* Right — always visible empty state panel */}
        <div className="w-72 flex-shrink-0 hidden lg:block bg-white rounded-xl border border-slate-200 shadow-sm">
          <EmptyState onSubmit={() => console.log("go to new complaint")} />
        </div>

      </div>

    </div>
  )
}