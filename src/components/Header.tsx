"use client";
import Image from "next/image";
import { RefreshCw, Sun, Moon, Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export interface HeaderProps {
  lastUpdate: Date;
  refreshData: () => void;
  isRefreshing: boolean;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Header({
  lastUpdate,
  refreshData,
  isRefreshing,
  darkMode,
  setDarkMode,
}: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [clockStr, setClockStr] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    const tick = () => setClockStr(new Date().toLocaleTimeString("id-ID"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className="
       sticky top-0 z-50 shadow-sm border-b
       bg-white text-gray-900 border-gray-200
       dark:bg-gray-900 dark:text-white dark:border-gray-800
       backdrop-blur supports-[backdrop-filter]:bg-opacity-80
     "
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* kiri */}
        <div className="flex items-center gap-3">
          <Image
            src="/pkclogo-removebg-preview.png"
            alt="Logo PKC"
            width={96}
            height={96}
            className="object-contain block dark:hidden"
            priority
          />

          <Image
            src="/pkclogo.png"
            alt="Logo PKC"
            width={96}
            height={96}
            className="object-contain hidden dark:block"
            priority
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold leading-tight">
              PUPUK KUJANG - GATE NPK2
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span suppressHydrationWarning>
                  {mounted
                    ? new Date().toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span suppressHydrationWarning>{clockStr}</span>
              </span>
            </div>
          </div>
        </div>

        {/* kanan */}
        <div className="flex items-center gap-4">
          <span className="flex items-center text-green-600 dark:text-green-400 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            System Online
          </span>

          {/* toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="
             p-2 rounded-md border transition
             bg-white text-gray-700 border-gray-300 hover:bg-gray-100
             dark:bg-gray-800 dark:text-yellow-400 dark:border-gray-700 dark:hover:bg-gray-700
           "
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>
    </header>
  );
}
