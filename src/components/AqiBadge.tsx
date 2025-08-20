import { getAqiMeta } from "../utils/aqi";

type Props = {
  aqi: number;
  pm25?: number;
  temperature?: number;
  windSpeed?: number;
  humidity?: number;
  status?: string;
  variant?: "compact" | "full";
  className?: string;
};

export default function AqiBadge({
  aqi,
  pm25 = 12.4,
  temperature = 29,
  windSpeed = 2.4,
  humidity = 79,
  status,
  variant = "compact",
  className = "",
}: Props) {
  const m = getAqiMeta(aqi);
  const label = status ?? m.label;

  const face = (n: number) =>
    n <= 50
      ? "😊"
      : n <= 100
      ? "😐"
      : n <= 150
      ? "😟"
      : n <= 200
      ? "😷"
      : n <= 300
      ? "😰"
      : "🤢";

  // ===== COMPACT: untuk baris bawah, tinggi fleksibel =====
  if (variant === "compact") {
    return (
      <div
        className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800
                    rounded-xl p-6 shadow-sm min-h-[120px] h-full ${className}
                    flex flex-col justify-between`}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Kualitas Udara
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-lg border flex items-center justify-center ${m.bg} ${m.text}`}
            >
              <span className="font-bold">{aqi}</span>
            </div>
            <div>
              <p className={`text-sm font-semibold ${m.text}`}>{label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PM2.5: {pm25} μg/m³
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <div>☁️ {temperature}°</div>
            <div>🍃 {windSpeed} km/h</div>
            <div>💧 {humidity}%</div>
          </div>
        </div>
      </div>
    );
  }

  // ===== FULL (opsional, tidak dipakai di halaman ini) =====
  return (
    <div
      className={`rounded-2xl p-4 shadow-lg border ${m.bg} transition-all hover:shadow-xl ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div
            className={`px-3 py-2 rounded-lg font-bold text-lg ${m.text} bg-white/20 dark:bg-black/20`}
          >
            {aqi}
            <div className="text-xs opacity-70 font-normal">AQI* US</div>
          </div>
          <div className={`font-semibold text-lg ${m.text}`}>{label}</div>
        </div>
        <div className="text-2xl">{face(aqi)}</div>
      </div>

      <div className={`${m.text} mb-3`}>
        <div className="flex justify-between items-center">
          <span className="font-medium">Polutan utama: PM2.5</span>
          <span className="font-semibold">{pm25} μg/m³</span>
        </div>
      </div>

      <div className="bg-white/30 dark:bg-black/30 rounded-lg p-3">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <span>☁️</span>
            <span className={m.text}>{temperature}°</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🌪️</span>
            <span className={m.text}>{windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-1">
            <span>💧</span>
            <span className={m.text}>{humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
