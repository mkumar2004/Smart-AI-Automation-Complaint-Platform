import { LucideIcon } from "lucide-react"

type Props = {
  label: string
  value: string
  sub: string
  icon: LucideIcon
  iconColor: string
  iconBg: string
  valueColor: string
}

export default function InfoCard({ label, value, sub, icon: Icon, iconColor, iconBg, valueColor }: Props) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon size={22} className={iconColor} />
      </div>
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className={`text-2xl font-bold leading-tight ${valueColor}`}>{value}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>
      </div>
    </div>
  )
}