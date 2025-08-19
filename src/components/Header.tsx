"use client";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export interface HeaderProps {
  lastUpdate: Date;
}

export default function Header({ lastUpdate }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [clockStr, setClockStr] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Auto dark/light mode berdasarkan jam
  useEffect(() => {
    const updateTheme = () => {
      const now = new Date();
      const hour = now.getHours();

      const shouldBeDark = hour >= 17 || hour <= 5;

      setIsDarkMode(shouldBeDark);

      const root = document.documentElement;
      root.classList.toggle("dark", shouldBeDark);

      localStorage.setItem("theme", shouldBeDark ? "dark" : "light");
    };

    updateTheme();
    const themeInterval = setInterval(updateTheme, 60000); // Check setiap 1 menit

    return () => clearInterval(themeInterval);
  }, []);

  // Clock update
  useEffect(() => {
    setMounted(true);
    const tick = () => setClockStr(new Date().toLocaleTimeString("id-ID"));
    tick();
    const clockInterval = setInterval(tick, 1000);
    return () => clearInterval(clockInterval);
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
          {/* Logo bulat sempurna */}
          <div
            className="
            w-12 h-12 md:w-14 md:h-14 
            rounded-full 
            overflow-hidden 
            ring-2 ring-gray-200 dark:ring-gray-700 
            flex items-center justify-center 
            bg-white 
            flex-shrink-0
            aspect-square
          "
          >
            <Image
              src="/pkclogo.png"
              alt="Logo PKC"
              width={56}
              height={56}
              className="
                w-full h-full 
                object-cover 
                rounded-full 
                scale-110
              "
              priority
            />
          </div>

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

        {/* kanan - hanya System Online indicator */}
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
