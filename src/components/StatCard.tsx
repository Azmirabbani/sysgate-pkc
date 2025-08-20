import { LucideIcon, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  trend?: "up" | "down";
  percentage?: number;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  trend,
  percentage,
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`bg-white dark:bg-[#0f172a]
                  ring-1 ring-slate-200/70 dark:ring-slate-800
                  rounded-2xl p-6 shadow-sm relative overflow-hidden
                  min-h-[160px] flex flex-col justify-between h-full ${className}`}
    >
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bgColor} flex items-center justify-center shadow`}
          >
            <Icon className="w-5 h-5 text-white stroke-[1.75]" />
          </div>
          {trend && typeof percentage === "number" && (
            <div
              className={`flex items-center gap-1 text-xs ${
                trend === "up" ? "text-emerald-600" : "text-rose-500"
              }`}
            >
              <TrendingUp
                className={`w-4 h-4 stroke-[1.75] ${
                  trend === "down" ? "rotate-180" : ""
                }`}
              />
              <span className="font-medium">{percentage.toFixed(1)}%</span>
            </div>
          )}
        </div>

        <div className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {value.toLocaleString()}
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{title}</p>
      </div>
    </div>
  );
}
