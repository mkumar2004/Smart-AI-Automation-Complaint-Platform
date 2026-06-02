export default function EmptyState({ onSubmit }: { onSubmit?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
      {/* Illustration */}
      <div className="w-48 h-48 mb-5">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
          {/* Background circle */}
          <circle cx="100" cy="100" r="95" fill="#EEF2FF" />
          {/* Box */}
          <rect x="55" y="115" width="90" height="55" rx="6" fill="#C7D2FE" />
          <rect x="55" y="115" width="90" height="20" rx="6" fill="#A5B4FC" />
          {/* Clipboard */}
          <rect x="65" y="60" width="70" height="80" rx="8" fill="white" stroke="#C7D2FE" strokeWidth="2" />
          <rect x="78" y="52" width="44" height="16" rx="8" fill="#C7D2FE" />
          {/* Face */}
          <circle cx="88" cy="92" r="5" fill="#A5B4FC" />
          <circle cx="112" cy="92" r="5" fill="#A5B4FC" />
          <path d="M88 108 Q100 100 112 108" stroke="#A5B4FC" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Lines */}
          <line x1="75" y1="120" x2="125" y2="120" stroke="#E0E7FF" strokeWidth="3" strokeLinecap="round" />
          {/* Paper airplane */}
          <path d="M150 55 L130 72 L145 78 Z" fill="#818CF8" opacity="0.7" />
          <path d="M150 55 L138 85 L145 78 Z" fill="#6366F1" opacity="0.5" />
          <line x1="130" y1="72" x2="140" y2="80" stroke="#818CF8" strokeWidth="1.5" />
        </svg>
      </div>

      <h3 className="text-base font-semibold text-slate-700 mb-1.5">No complaints yet</h3>
      <p className="text-sm text-slate-400 mb-5 max-w-[200px] leading-relaxed">
        You haven't submitted any complaints. Submit your first complaint to get started.
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