import React from 'react'

type Complaint = {
  id: string
  title: string
  category: string
  priority: "High" | "Medium" | "Low"
  status: "Pending" | "Processing" | "Assigned" | "In Progress" | "Resolved" | "Escalated"
  date: string
}

const complaints: Complaint[] = [
  { id: "TK-1234", title: "Internet not working",       category: "Internet", priority: "High",   status: "Pending",     date: "May 16, 2025" },
  { id: "TK-1233", title: "Billing discrepancy",        category: "Billing",  priority: "Medium", status: "Processing",  date: "May 15, 2025" },
  { id: "TK-1232", title: "Slow internet speed",        category: "Internet", priority: "High",   status: "Assigned",    date: "May 14, 2025" },
  { id: "TK-1231", title: "Payment failed",             category: "Billing",  priority: "Low",    status: "In Progress", date: "May 13, 2025" },
  { id: "TK-1230", title: "Account not updating",       category: "Account",  priority: "Medium", status: "Resolved",    date: "May 12, 2025" },
  { id: "TK-1229", title: "Wrong charge on card",       category: "Billing",  priority: "High",   status: "Escalated",   date: "May 10, 2025" },
  { id: "TK-1228", title: "Unable to login",            category: "Account",  priority: "Low",    status: "Resolved",    date: "May 9, 2025"  },
  { id: "TK-1227", title: "Network connectivity issue", category: "Internet", priority: "Medium", status: "Pending",     date: "May 8, 2025"  },
   { id: "TK-123e", title: "Internet not working",       category: "Internet", priority: "High",   status: "Pending",     date: "May 16, 2025" },
  { id: "TK-123f3", title: "Billing discrepancy",        category: "Billing",  priority: "Medium", status: "Processing",  date: "May 15, 2025" },
  { id: "TK-122f", title: "Slow internet speed",        category: "Internet", priority: "High",   status: "Assigned",    date: "May 14, 2025" },
  { id: "TK-1f31", title: "Payment failed",             category: "Billing",  priority: "Low",    status: "In Progress", date: "May 13, 2025" },
  { id: "TK-1f30", title: "Account not updating",       category: "Account",  priority: "Medium", status: "Resolved",    date: "May 12, 2025" },
  { id: "TK-1429", title: "Wrong charge on card",       category: "Billing",  priority: "High",   status: "Escalated",   date: "May 10, 2025" },
  { id: "TK-1g28", title: "Unable to login",            category: "Account",  priority: "Low",    status: "Resolved",    date: "May 9, 2025"  },

]

const priorityDot: Record<Complaint["priority"], string> = {
  High:   "bg-red-500",
  Medium: "bg-yellow-400",
  Low:    "bg-green-500",
}

const statusStyle: Record<Complaint["status"], string> = {
  Pending:     "bg-gray-100    dark:bg-slate-800/80    text-gray-600    dark:text-slate-300",
  Processing:  "bg-orange-100  dark:bg-orange-950/35  text-orange-600  dark:text-orange-400",
  Assigned:    "bg-blue-100    dark:bg-blue-950/35    text-blue-600    dark:text-blue-400",
  "In Progress":"bg-purple-100  dark:bg-purple-950/35  text-purple-600  dark:text-purple-400",
  Resolved:    "bg-green-100   dark:bg-green-950/35   text-green-600   dark:text-green-400",
  Escalated:   "bg-red-100     dark:bg-red-950/35     text-red-600     dark:text-red-400",
}

type Props = {
  onViewAll?: () => void
}

function RecentComplaints({ onViewAll }: Props) {
  const [page, setPage] = React.useState(1)
  const perPage = 9
  const totalPages = Math.ceil(complaints.length / perPage)
  const paged = complaints.slice((page - 1) * perPage, page * perPage)
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800/80 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-slate-100 dark:border-slate-800/80 flex-shrink-0">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-base">Recent Complaints</h2>
        <button
          onClick={onViewAll}
          className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center gap-1 font-medium"
        >
          View All Complaints →
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800/80">
              {["Ticket ID", "Title", "Category", "Priority", "Status", "Date", ""].map((h) => (
                <th
                  key={h}
                  className="px-2 md:px-3.5 py-2.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/30">
            {paged.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                {/* Ticket ID */}
                <td className="px-2 md:px-3.5 py-2 font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
                  {c.id}
                </td>

                {/* Title */}
                <td className="px-2 md:px-3.5 py-2 text-slate-700 dark:text-slate-300">
                  <div className="truncate max-w-[100px] sm:max-w-[140px] xl:max-w-[170px]" title={c.title}>
                    {c.title}
                  </div>
                </td>

                {/* Category */}
                <td className="px-2 md:px-3.5 py-2 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                  {c.category}
                </td>

                {/* Priority */}
                <td className="px-2 md:px-3.5 py-2 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${priorityDot[c.priority]}`} />
                    <span className="text-slate-700 dark:text-slate-300">{c.priority}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-2 md:px-3.5 py-2 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[c.status]}`}>
                    {c.status}
                  </span>
                </td>

                {/* Date */}
                <td className="px-2 md:px-3.5 py-2 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {c.date}
                </td>

                {/* View button */}
                <td className="px-2 md:px-3.5 py-2 whitespace-nowrap">
                  <button className="px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 border-t border-slate-100 dark:border-slate-800/80 flex-shrink-0">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ‹
        </button>

        {[1, 2, 3].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
              ${page === p
                ? "bg-blue-600 text-white border border-blue-600"
                : "border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850"
              }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default RecentComplaints