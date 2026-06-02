import { Wifi, CreditCard, User, Activity } from "lucide-react"

export type Complaint = {
  id: string
  title: string
  category: "Internet" | "Billing" | "Account"
  priority: "High" | "Medium" | "Low"
  status: "Pending" | "Processing" | "Assigned" | "In Progress" | "Resolved" | "Escalated"
  createdDate: string
  lastUpdated: string
}

const categoryIcon: Record<Complaint["category"], React.ReactNode> = {
  Internet: <Wifi      size={13} className="text-slate-400 flex-shrink-0" />,
  Billing:  <CreditCard size={13} className="text-slate-400 flex-shrink-0" />,
  Account:  <User      size={13} className="text-slate-400 flex-shrink-0" />,
}

const categoryStyle: Record<Complaint["category"], string> = {
  Internet: "bg-blue-50   text-blue-600",
  Billing:  "bg-orange-50 text-orange-600",
  Account:  "bg-teal-50   text-teal-600",
}

const priorityDot: Record<Complaint["priority"], string> = {
  High:   "bg-red-500",
  Medium: "bg-yellow-400",
  Low:    "bg-green-500",
}

const priorityStyle: Record<Complaint["priority"], string> = {
  High:   "bg-red-50    text-red-600",
  Medium: "bg-yellow-50 text-yellow-600",
  Low:    "bg-green-50  text-green-600",
}

const statusStyle: Record<Complaint["status"], string> = {
  Pending:       "bg-gray-100   text-gray-600",
  Processing:    "bg-orange-100 text-orange-600",
  Assigned:      "bg-blue-100   text-blue-600",
  "In Progress": "bg-purple-100 text-purple-600",
  Resolved:      "bg-green-100  text-green-600",
  Escalated:     "bg-red-100    text-red-600",
}

type Props = {
  complaint: Complaint
}

export default function ComplaintCard({ complaint }: Props) {
  return (
    <div className="px-5 py-4 hover:bg-slate-50 transition-colors">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">

        {/* Ticket ID + Created Date */}
        <div className="w-[110px] flex-shrink-0">
          <p className="font-bold text-slate-800 text-sm">{complaint.id}</p>
          <p className="text-xs text-slate-400 mt-0.5">Created: {complaint.createdDate}</p>
        </div>

        {/* Title + Category badge */}
        <div className="flex-1 min-w-[150px]">
          <div className="flex items-center gap-1.5 mb-1.5">
            {categoryIcon[complaint.category]}
            <span className="text-sm font-semibold text-slate-800">{complaint.title}</span>
          </div>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${categoryStyle[complaint.category]}`}>
            {complaint.category}
          </span>
        </div>

        {/* Priority */}
        <div className="min-w-[80px] flex-shrink-0">
          <p className="text-[11px] text-slate-400 mb-1">Priority (AI)</p>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${priorityStyle[complaint.priority]}`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${priorityDot[complaint.priority]}`} />
            {complaint.priority}
          </span>
        </div>

        {/* Status */}
        <div className="min-w-[90px] flex-shrink-0">
          <p className="text-[11px] text-slate-400 mb-1">Status</p>
          <span className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-semibold ${statusStyle[complaint.status]}`}>
            {complaint.status}
          </span>
        </div>

        {/* Last Updated */}
        <div className="min-w-[150px] flex-shrink-0">
          <p className="text-[11px] text-slate-400 mb-0.5">Last Updated:</p>
          <p className="text-xs text-slate-600 font-medium">{complaint.lastUpdated}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
          <button className="px-3.5 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
            View
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            <Activity size={11} />
            Track
          </button>
        </div>

      </div>
    </div>
  )
}