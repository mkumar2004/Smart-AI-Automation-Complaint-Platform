import React from 'react'
import { MessageCircle, CheckCircle, Cpu, User, PlusCircle } from 'lucide-react'

type Activity = {
  id: string
  icon: React.ReactNode
  iconBg: string
  title: React.ReactNode
  description: string
  time: string
}

const activities: Activity[] = [
  {
    id: '1',
    icon: <MessageCircle size={15} />,
    iconBg: 'bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
    title: (
      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
        Agent replied to <span className="text-blue-600 dark:text-blue-400 font-semibold">#TK-1234</span>
      </span>
    ),
    description: 'Our support agent replied to your complaint regarding internet issue.',
    time: '2 hrs ago',
  },
  {
    id: '2',
    icon: <CheckCircle size={15} />,
    iconBg: 'bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400',
    title: (
      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
        Complaint <span className="text-blue-600 dark:text-blue-400 font-semibold">#TK-1233</span> resolved
      </span>
    ),
    description: 'Your billing discrepancy complaint has been resolved successfully.',
    time: '1 day ago',
  },
  {
    id: '3',
    icon: <Cpu size={15} />,
    iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    title: (
      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
        AI processed <span className="text-blue-600 dark:text-blue-400 font-semibold">#TK-1232</span>
      </span>
    ),
    description: 'AI has analyzed your complaint and assigned to the right department.',
    time: '2 days ago',
  },
  {
    id: '4',
    icon: <User size={15} />,
    iconBg: 'bg-orange-100 dark:bg-orange-950/40 text-orange-500 dark:text-orange-450',
    title: (
      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
        Complaint <span className="text-blue-600 dark:text-blue-400 font-semibold">#TK-1231</span> assigned
      </span>
    ),
    description: 'Your complaint has been assigned to John Doe (Support Agent).',
    time: '2 days ago',
  },
  {
    id: '5',
    icon: <PlusCircle size={15} />,
    iconBg: 'bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400',
    title: (
      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
        You submitted a new complaint <span className="text-blue-600 dark:text-blue-400 font-semibold">#TK-1234</span>
      </span>
    ),
    description: "We have received your complaint and it's being reviewed.",
    time: '3 days ago',
  },
]

const ActivityTime = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800/80 h-full flex flex-col overflow-hidden">

      {/* Header — fixed */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800/80 flex-shrink-0">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-base">Activity Timeline</h2>
        <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline font-medium">
          View All
        </button>
      </div>

      {/* Scrollable timeline */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4">
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-slate-100 dark:bg-slate-800" />

          <div className="space-y-5">
            {activities.map((activity) => (
              <div key={activity.id} className="relative flex gap-4">
                {/* Icon bubble */}
                <div
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.iconBg}`}
                >
                  {activity.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      {activity.title}
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap mt-0.5 flex-shrink-0">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ActivityTime