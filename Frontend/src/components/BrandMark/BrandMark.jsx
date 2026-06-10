export default function BrandMark({ compact = false, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-700 text-white shadow-soft ring-4 ring-brand-200/40">
        <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
          <path
            fill="currentColor"
            d="M31.6 5.9c-4.3 4.4-6.4 8.3-6.4 12.4 0 3.4 1.6 6.4 4.8 9.2-2.8-.6-5.3-2.1-7.1-4.3-1.2-1.5-1.9-3.1-2-4.9-3.7 1.9-6.1 5.7-6.1 10 0 7 5.7 12.7 12.8 12.7 6.9 0 12.6-5.4 12.8-12.2.2-6-4.7-9.1-6.6-13.7-1.1-2.6-.9-5.5.8-9.2h-3Z"
          />
          <path
            fill="#ffffff"
            d="M25.5 31.8c1.9 1.4 3.2 3.6 3.2 6.1 0 1.4-.4 2.8-1.1 4-1.4-.6-2.4-2-2.4-3.7 0-1.2.5-2.3 1.3-3.1-1.9-.2-3.7.2-5.2 1.2.1-1.9 1-3.4 2.4-4.4.5-.4 1.1-.5 1.8-.1Z"
          />
          <path
            fill="#ffffff"
            d="M19.3 18.1c1.3-4 4.6-7 8.8-8-.8 1.6-1.2 3.1-1.2 4.6-1.6.1-3.1.7-4.3 1.8 1.1.3 2.1.9 2.9 1.7-2.3.2-4.4.2-6.2-.1Z"
          />
          <circle cx="24.4" cy="15.2" r="1.5" fill="#ffffff" />
        </svg>
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="text-sm font-semibold text-current">White Fox Media</p>
          <p className="text-xs text-current/70">Student Console</p>
        </div>
      )}
    </div>
  );
}
