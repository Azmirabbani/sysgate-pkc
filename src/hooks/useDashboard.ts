import { useEffect, useState } from "react";
import { initialDashboardData, DashboardData } from "../data/dashboardData";

export function useDashboard() {
  const [data, setData] = useState<DashboardData>(initialDashboardData);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // simulasi realtime
  useEffect(() => {
    const id = setInterval(() => {
      setData((p) => ({
        ...p,
        totalInside: p.totalInside + Math.floor(Math.random() * 3) - 1,
        visitor: p.visitor + Math.floor(Math.random() * 2),
        karyawanPKC: p.karyawanPKC + Math.floor(Math.random() * 2) - 1,
      }));
      setLastUpdate(new Date());
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const refresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData((p) => ({
        ...p,
        totalInside: p.totalInside + Math.floor(Math.random() * 10) - 5,
        karyawanPKC: p.karyawanPKC + Math.floor(Math.random() * 5) - 2,
        phlKontraktor: p.phlKontraktor + Math.floor(Math.random() * 8) - 4,
        visitor: p.visitor + Math.floor(Math.random() * 6) - 3,
      }));
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  return { data, lastUpdate, isRefreshing, refresh, setData };
}
