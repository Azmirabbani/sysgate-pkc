// src/app/page.tsx
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

import AqiBadge from "../components/AqiBadge";
import { getAqiMeta } from "../utils/aqi";

import {
  CAPACITY_MAX,
  initialDashboardData,
  initialAirQualityData,
  sumTotalInside,
  type DashboardCategories,
  type AirQualityData,
} from "../data/dashboardData";

type Category = keyof DashboardCategories;
const CATEGORIES: Category[] = [
  "karyawanPKC",
  "phlKontraktor",
  "praktikan",
  "visitor",
];

export default function Dashboard() {
  const [data, setData] = useState<DashboardCategories>(initialDashboardData);
  const [aqiData] = useState<AirQualityData>(initialAirQualityData);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [lastEntry, setLastEntry] = useState<Date | null>(null);
  const [lastExit, setLastExit] = useState<Date | null>(null);
  const [enteredToday, setEnteredToday] = useState(0);
  const [exitedToday, setExitedToday] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const totalInside = sumTotalInside(prev);
        const bump = Math.random() < 0.6 ? 1 : -1;
        const next = { ...prev };

        if (bump > 0) {
          if (totalInside >= CAPACITY_MAX) return prev;
          const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
          next[cat] = (next[cat] as number) + 1;
          setLastEntry(new Date());
          setEnteredToday((n) => n + 1);
        } else {
          if (totalInside <= 0) return prev;
          const nonZero = CATEGORIES.filter((c) => prev[c] > 0);
          if (!nonZero.length) return prev;
          const cat = nonZero[Math.floor(Math.random() * nonZero.length)];
          next[cat] = (next[cat] as number) - 1;
          setLastExit(new Date());
          setExitedToday((n) => n + 1);
        }

        setLastUpdate(new Date());
        return next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const totalInside = sumTotalInside(data);
  const occupancy = (totalInside / CAPACITY_MAX) * 100;
  const capacityColor =
    occupancy >= 100
      ? "text-red-500"
      : occupancy >= 90
      ? "text-amber-500"
      : "text-emerald-600";

  const aqiMeta = getAqiMeta(aqiData.aqi);

  return (
    <div className="min-h-[100dvh] bg-slate-100 dark:bg-slate-900 grid grid-rows-[auto,1fr] overflow-hidden">
      <Header lastUpdate={lastUpdate} />

      <main className="max-w-7xl mx-auto w-full px-6 py-5 overflow-hidden flex flex-col">
        {/* Top bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800/90 ring-1 ring-slate-200/70 dark:ring-slate-800 shadow-sm mb-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-red-500/10 text-red-600 border border-red-500/30">
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
                  {totalInside}
                </span>
                <span className="text-gray-500">/{CAPACITY_MAX}</span>
              </span>
              <span className={`${capacityColor} font-semibold`}>
                {occupancy.toFixed(0)}%{" "}
                <span className="text-gray-500 font-normal">
                  of {CAPACITY_MAX}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Konten */}
        <div className="flex-1 overflow-hidden flex flex-col gap-6">
          {/* GRID atas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {/* Kartu besar: konten dipusatkan */}
            <div className="lg:col-span-1 lg:row-span-2">
              <div className="bg-white dark:bg-[#0f172a] ring-1 ring-slate-200/70 dark:ring-slate-800 rounded-2xl shadow-sm h-full">
                <div className="h-full flex flex-col justify-center items-center p-8 text-center">
                  {/* ikon */}
                  <div className="w-16 h-16 rounded-2xl bg-emerald-600/90 flex items-center justify-center shadow-lg mb-6">
                    <Users className="w-8 h-8 text-white stroke-[1.75]" />
                  </div>

                  {/* angka & label */}
                  <div className="space-y-3">
                    <div className="text-7xl font-black text-gray-900 dark:text-white tracking-tight">
                      {totalInside.toLocaleString()}
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Orang di Dalam Gedung
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
                        Kualitas Udara Sekitar:{" "}
                        <span className={`${aqiMeta.text} font-medium`}>
                          {aqiData.aqi} AQI
                        </span>{" "}
                        — {aqiMeta.label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 stat cards */}
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

          {/* Bar bawah */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 ring-1 ring-slate-200/70 dark:ring-slate-800 rounded-2xl p-6 shadow-sm h-[140px] md:h-[180px] flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Masuk hari ini
                </p>
                <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
                  {enteredToday}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-emerald-600 dark:text-emerald-400 stroke-[2]" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 ring-1 ring-slate-200/70 dark:ring-slate-800 rounded-2xl p-6 shadow-sm h-[140px] md:h-[180px] flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Keluar hari ini
                </p>
                <p className="text-4xl font-black text-red-600 dark:text-red-400">
                  {exitedToday}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <ArrowDownLeft className="w-6 h-6 text-red-600 dark:text-red-400 stroke-[2]" />
              </div>
            </div>

            {/* AQI Card yang lebih rapi */}
            <div className="bg-white dark:bg-gray-800 ring-1 ring-slate-200/70 dark:ring-slate-800 rounded-2xl p-6 shadow-sm h-[140px] md:h-[180px]">
              <div className="h-full flex flex-col justify-between">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Kualitas Udara
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-gray-900 dark:text-white">
                        {aqiData.aqi}
                      </span>
                      <span
                        className={`text-sm font-semibold px-2 py-1 rounded-md ${aqiMeta.text} ${aqiMeta.bg}`}
                      >
                        {aqiData.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl">{aqiData.temperature}°</div>
                </div>

                {/* Footer info */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>PM2.5: {aqiData.pm25} μg/m³</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="text-blue-500">💧</span>
                      {aqiData.humidity}%
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-green-500">🌪</span>
                      {aqiData.windSpeed} km/h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
