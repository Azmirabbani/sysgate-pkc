import { getAqiMeta } from "../utils/aqi";

export default function AqiPill({
  aqi,
  showLabel = true,
  className = "",
}: {
  aqi: number;
  showLabel?: boolean;
  className?: string;
}) {
  const m = getAqiMeta(aqi);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs ${m.bg} ${m.text} ${className}`}
    >
      <span>🌬️</span>
      <span className="font-semibold">AQI: {aqi}</span>
      {showLabel && <span className="opacity-80">({m.label})</span>}
    </span>
  );
}
