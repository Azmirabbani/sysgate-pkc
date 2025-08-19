// src/data/dashboardData.ts

export type DashboardCategories = {
  karyawanPKC: number;
  phlKontraktor: number;
  praktikan: number;
  visitor: number;
};

// Kapasitas gedung (boleh dipakai di page)
export const CAPACITY_MAX = 800;

// Data awal (semua kategori). Total akan dihitung dari ini.
export const initialDashboardData: DashboardCategories = {
  karyawanPKC: 63,
  phlKontraktor: 296,
  praktikan: 0,
  visitor: 134,
};

// Helper total orang di dalam
export const sumTotalInside = (d: DashboardCategories) =>
  d.karyawanPKC + d.phlKontraktor + d.praktikan + d.visitor;
