"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import {
  Users,
  UserCheck,
  HardHat,
  Eye,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

export default function Dashboard() {
  const capacityMax = 800;

  // ==== THEME ====
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // mounted fix (biar ngga hydration error)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // initial theme (localStorage > prefers-color-scheme)
  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored === "dark") setDarkMode(true);
    else if (stored === "light") setDarkMode(false);
    else setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  // sinkronkan ke <html class="dark">
  useEffect(() => {
    const root = document.documentElement; // <html>
    root.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // ==== DATA & STATE ====
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState({
    totalInside: 521,
    karyawanPKC: 63,
    phlKontraktor: 296,
    praktikan: 0,
    visitor: 137,
  });
  const [lastEntry, setLastEntry] = useState<Date | null>(null);
  const [lastExit, setLastExit] = useState<Date | null>(null);
  const [enteredToday, setEnteredToday] = useState(0);
  const [exitedToday, setExitedToday] = useState(0);

  // simulasi realtime
  useEffect(() => {
    const id = setInterval(() => {
      setData((p) => {
        const bump = Math.random() < 0.6 ? 1 : -1;
        let next = p.totalInside + bump;
        if (next < 0) next = 0;
        if (next > capacityMax) next = capacityMax;

        if (bump > 0) {
          setLastEntry(new Date());
          setEnteredToday((n) => n + 1);
        } else {
          setLastExit(new Date());
          setExitedToday((n) => n + 1);
        }
        setLastUpdate(new Date());
        return { ...p, totalInside: next };
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData((p) => {
        const bump = Math.random() < 0.6 ? 1 : -1;
        let next = p.totalInside + bump * (1 + Math.floor(Math.random() * 3));
        if (next < 0) next = 0;
        if (next > capacityMax) next = capacityMax;

        if (next > p.totalInside) {
          setLastEntry(new Date());
          setEnteredToday((n) => n + 1);
        } else if (next < p.totalInside) {
          setLastExit(new Date());
          setExitedToday((n) => n + 1);
        }
        return { ...p, totalInside: next };
      });
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 700);
  };

  // derived
  const occupancy = (data.totalInside / capacityMax) * 100;
  const ringStroke =
    occupancy >= 100 ? "#ef4444" : occupancy >= 90 ? "#f59e0b" : "#10b981";
  const capacityColor =
    occupancy >= 100
      ? "text-red-500"
      : occupancy >= 90
      ? "text-amber-500"
      : "text-emerald-600";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header
        lastUpdate={lastUpdate}
        refreshData={refreshData}
        isRefreshing={isRefreshing}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Top bar */}
        <div className="mb-5 p-4 rounded-xl bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* LIVE indicator */}
              <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-red-500/10 text-red-500 border border-red-500/30">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <span className="animate-pulse font-semibold tracking-wide">
                  LIVE
                </span>
              </span>

              <span className="text-sm text-gray-700 dark:text-gray-300">
                Last updated:{" "}
                <span className="font-medium" suppressHydrationWarning>
                  {mounted ? lastUpdate.toLocaleTimeString("id-ID") : ""}
                </span>
              </span>

              {lastEntry && (
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Last entry:{" "}
                  <span className="font-medium" suppressHydrationWarning>
                    {mounted ? lastEntry.toLocaleTimeString("id-ID") : ""}
                  </span>
                </span>
              )}
              {lastExit && (
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Last exit:{" "}
                  <span className="font-medium" suppressHydrationWarning>
                    {mounted ? lastExit.toLocaleTimeString("id-ID") : ""}
                  </span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-800 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {data.totalInside}
                </span>
                <span className="text-gray-500">/{capacityMax}</span>
              </span>
              <span className={`${capacityColor} font-semibold`}>
                {occupancy.toFixed(0)}%{" "}
                <span className="text-gray-500 font-normal">
                  of {capacityMax}
                </span>
              </span>
            </div>
          </div>

          {occupancy >= 100 ? (
            <div className="mt-3 px-4 py-2 rounded-md bg-red-600 text-white">
              Over capacity! Mohon tindakan segera.
            </div>
          ) : occupancy >= 90 ? (
            <div className="mt-3 px-4 py-2 rounded-md bg-amber-400 text-black">
              Mendekati kapasitas (≥90%). Perhatikan arus masuk.
            </div>
          ) : null}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total besar */}
          <div className="lg:col-span-1 lg:row-span-2">
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-xl relative overflow-hidden h-full">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-16 h-16 rounded-xl bg-emerald-600/90 flex items-center justify-center shadow-md">
                  <Users className="w-8 h-8 text-white" />
                </div>

                <div>
                  <div className="text-7xl md:text-8xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                    {data.totalInside.toLocaleString()}
                  </div>
                  <p className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300 mb-6">
                    Orang di Dalam Gedung
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kartu pendamping */}
          <StatCard
            title="Karyawan PKC"
            value={data.karyawanPKC}
            icon={UserCheck}
            color="text-blue-500"
            bgColor="from-blue-500 to-blue-600"
            trend="up"
            percentage={2.5}
          />
          <StatCard
            title="PHL & Kontraktor"
            value={data.phlKontraktor}
            icon={HardHat}
            color="text-cyan-400"
            bgColor="from-cyan-500 to-cyan-600"
            trend="up"
            percentage={1.8}
          />
          <StatCard
            title="Praktikan"
            value={data.praktikan}
            icon={Users}
            color="text-amber-400"
            bgColor="from-amber-400 to-amber-500"
          />
          <StatCard
            title="Visitor"
            value={data.visitor}
            icon={Eye}
            color="text-amber-300"
            bgColor="from-amber-400 to-amber-500"
            trend="up"
            percentage={5.2}
          />
        </div>

        {/* Entry/Exit hari ini */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm min-h-[120px] flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Masuk hari ini
              </p>
              <p className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                {enteredToday}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm min-h-[120px] flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Keluar hari ini
              </p>
              <p className="text-4xl font-extrabold text-red-600 dark:text-red-400 mt-1">
                {exitedToday}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <ArrowDownLeft className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
