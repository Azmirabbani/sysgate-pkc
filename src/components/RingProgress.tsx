type Props = { value: number; capacity?: number; gradientId?: string };
export default function RingProgress({
  value,
  capacity = 500,
  gradientId = "ringGrad",
}: Props) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(value / capacity, 1));
  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-32 h-32 -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={r}
          stroke="#e5e7eb"
          className="dark:stroke-gray-700"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="64"
          cy="64"
          r={r}
          stroke={`url(#${gradientId})`}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-gray-800 dark:text-white">
          {Math.round(pct * 100)}%
        </span>
      </div>
    </div>
  );
}
