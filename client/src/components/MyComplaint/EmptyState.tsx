export default function EmptyState({ onSubmit }: { onSubmit?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
      {/* Illustration */}
      <div className="w-48 h-48 mb-5">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
          {/* Background circle */}
          <circle cx="100" cy="100" r="95" className="fill-indigo-50 dark:fill-slate-800/80" />
          {/* Box */}
          <rect x="55" y="115" width="90" height="55" rx="6" className="fill-indigo-200 dark:fill-slate-700" />
          <rect x="55" y="115" width="90" height="20" rx="6" className="fill-indigo-300 dark:fill-slate-650" />
          {/* Clipboard */}
          <rect x="65" y="60" width="70" height="80" rx="8" className="fill-white dark:fill-slate-950 stroke-indigo-200 dark:stroke-slate-800" strokeWidth="2" />
          <rect x="78" y="52" width="44" height="16" rx="8" className="fill-indigo-200 dark:fill-slate-700" />
          {/* Face */}
          <circle cx="88" cy="92" r="5" className="fill-indigo-300 dark:fill-slate-600" />
          <circle cx="112" cy="92" r="5" className="fill-indigo-300 dark:fill-slate-600" />
          <path d="M88 108 Q100 100 112 108" className="stroke-indigo-300 dark:stroke-slate-600" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Lines */}
          <line x1="75" y1="120" x2="125" y2="120" className="stroke-indigo-50 dark:stroke-slate-900" strokeWidth="3" strokeLinecap="round" />
          {/* Paper airplane */}
          <path d="M150 55 L130 72 L145 78 Z" className="fill-indigo-400 dark:fill-indigo-500" opacity="0.7" />
          <path d="M150 55 L138 85 L145 78 Z" className="fill-indigo-500 dark:fill-indigo-400" opacity="0.5" />
          <line x1="130" y1="72" x2="140" y2="80" className="stroke-indigo-400 dark:stroke-indigo-500" strokeWidth="1.5" />
        </svg>
      </div>

      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200 mb-1.5">No complaints yet</h3>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-5 max-w-[200px] leading-relaxed">
        You haven&apos;t submitted any complaints. Submit your first complaint to get started.
      </p>

      <button
        onClick={onSubmit}
        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors shadow-sm"
      >
        <span className="text-base leading-none">⊕</span>
        Submit your first complaint
      </button>
    </div>
  )
}