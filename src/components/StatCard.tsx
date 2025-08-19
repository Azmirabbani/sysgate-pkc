import { LucideIcon, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  trend?: "up" | "down";
  percentage?: number;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  trend,
  percentage,
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg relative overflow-hidden min-h-[160px] flex flex-col justify-between">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${bgColor} flex items-center justify-center shadow`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && typeof percentage === "number" && (
            <div
              className={`flex items-center gap-1 text-sm ${
                trend === "up" ? "text-emerald-500" : "text-rose-400"
              }`}
            >
              <TrendingUp
                className={`w-4 h-4 ${trend === "down" ? "rotate-180" : ""}`}
              />
              <span className="font-medium">{percentage.toFixed(1)}%</span>
            </div>
          )}
        </div>

        <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1 tracking-tight">
          {value.toLocaleString()}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm">{title}</p>
      </div>
    </div>
  );
}
