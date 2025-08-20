"use client";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export interface HeaderProps {
  lastUpdate: Date;
}

export default function Header({ lastUpdate }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [clockStr, setClockStr] = useState("");

  // Auto dark/light mode berdasarkan jam
  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      const shouldBeDark = hour >= 17 || hour <= 5;
      document.documentElement.classList.toggle("dark", shouldBeDark);
      localStorage.setItem("theme", shouldBeDark ? "dark" : "light");
    };
    updateTheme();
    const id = setInterval(updateTheme, 60_000);
    return () => clearInterval(id);
  }, []);

  // Clock update
  useEffect(() => {
    setMounted(true);
    const tick = () => setClockStr(new Date().toLocaleTimeString("id-ID"));
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, []);

  const ico = "w-4 h-4 stroke-[1.75]"; // konsistensi ikon

  return (
    <header
      className="sticky top-0 z-50 border-b
                 bg-white text-gray-900 border-gray-200
                 dark:bg-gray-900 dark:text-white dark:border-gray-800"
    >
      {/* tinggi tetap agar layout stabil */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* kiri */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden
                          ring-2 ring-gray-200 dark:ring-gray-700 flex items-center justify-center
                          bg-white flex-shrink-0"
          >
            <Image
              src="/pkclogo.png"
              alt="Logo PKC"
              width={56}
              height={56}
              className="w-full h-full object-cover rounded-full"
              priority
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight">
              PUPUK KUJANG - GATE NPK2
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <Calendar className={ico} />
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
                <Clock className={ico} />
                <span suppressHydrationWarning>{clockStr}</span>
              </span>
            </div>
          </div>
        </div>

        {/* kanan */}
        <div className="flex items-center">
          <span className="flex items-center text-green-600 dark:text-green-400 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            System Online
          </span>
        </div>
      </div>
    </header>
  );
}
