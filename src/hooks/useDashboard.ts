// src/hooks/useDashboard.ts
"use client";

import { useEffect, useState } from "react";
import {
  initialDashboardData,
  sumTotalInside,
  CAPACITY_MAX,
  type DashboardCategories,
} from "../data/dashboardData";

/**
 * Catatan penting:
 * - State hanya menyimpan kategori (karyawanPKC, phlKontraktor, praktikan, visitor).
 * - totalInside SELALU dihitung dari kategori -> TIDAK disimpan di state.
 * - Update data JANGAN mengubah `totalInside` langsung.
 */
export function useDashboard() {
  const [data, setData] = useState<DashboardCategories>(initialDashboardData);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Util: clamp agar ga minus dan ga melebihi kapasitas total
  const clampNonNegative = (n: number) => (n < 0 ? 0 : n);

  // Simulasi “realtime” (contoh kecil). Hanya ubah kategori.
  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        // random kecil: -1, 0, atau +1 untuk beberapa kategori
        const deltaKaryawan = Math.floor(Math.random() * 3) - 1; // -1..+1
        const deltaVisitor = Math.floor(Math.random() * 3) - 1; // -1..+1

        const next: DashboardCategories = {
          ...prev,
          karyawanPKC: clampNonNegative(prev.karyawanPKC + deltaKaryawan),
          visitor: clampNonNegative(prev.visitor + deltaVisitor),
        };

        // (opsional) jaga total agar tidak melebihi kapasitas
        const total = sumTotalInside(next);
        if (total > CAPACITY_MAX) {
          // turunkan visitor terlebih dahulu kalau penuh
          const overflow = total - CAPACITY_MAX;
          next.visitor = clampNonNegative(next.visitor - overflow);
        }

        return next;
      });

      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(id);
  }, []);

  // Tombol refresh manual (random sedikit semua kategori)
  const refresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData((prev) => {
        const next: DashboardCategories = {
          karyawanPKC: clampNonNegative(
            prev.karyawanPKC + (Math.floor(Math.random() * 5) - 2)
          ), // -2..+2
          phlKontraktor: clampNonNegative(
            prev.phlKontraktor + (Math.floor(Math.random() * 7) - 3)
          ), // -3..+3
          praktikan: clampNonNegative(
            prev.praktikan + (Math.floor(Math.random() * 3) - 1)
          ), // -1..+1
          visitor: clampNonNegative(
            prev.visitor + (Math.floor(Math.random() * 7) - 3)
          ), // -3..+3
        };

        // jaga kapasitas
        const total = sumTotalInside(next);
        if (total > CAPACITY_MAX) {
          const overflow = total - CAPACITY_MAX;
          // kurangi dari visitor dulu, sisanya dari phlKontraktor
          const cutVisitor = Math.min(overflow, next.visitor);
          next.visitor -= cutVisitor;
          const remain = overflow - cutVisitor;
          if (remain > 0)
            next.phlKontraktor = clampNonNegative(next.phlKontraktor - remain);
        }

        return next;
      });

      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 800);
  };

  // Nilai turunan (tidak disimpan di state)
  const totalInside = sumTotalInside(data);
  const occupancyPct = Math.min(
    100,
    Math.round((totalInside / CAPACITY_MAX) * 100)
  );

  return {
    data, // detail per kategori
    totalInside, // total terhitung
    capacityMax: CAPACITY_MAX,
    occupancyPct, // persentase okupansi (0–100)
    lastUpdate,
    isRefreshing,
    refresh,
    setData, // kalau mau update dari luar
  };
}
