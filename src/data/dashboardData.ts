// src/data/dashboardData.ts

export type DashboardCategories = {
  karyawanPKC: number;
  phlKontraktor: number;
  praktikan: number;
  visitor: number;
};

// Tambahan: Type untuk Air Quality data
export type AirQualityData = {
  aqi: number;
  pm25: number;
  temperature: number;
  windSpeed: number;
  humidity: number;
  status: string;
  lastUpdated?: string;
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

// Data Air Quality - bisa diupdate real-time atau dari API
export const initialAirQualityData: AirQualityData = {
  aqi: 57,
  pm25: 12.4,
  temperature: 29,
  windSpeed: 2.4,
  humidity: 79,
  status: "Sedang",
  lastUpdated: "08:27:10",
};

// Helper total orang di dalam
export const sumTotalInside = (d: DashboardCategories) =>
  d.karyawanPKC + d.phlKontraktor + d.praktikan + d.visitor;

// Helper untuk format data AQI (optional)
export const formatAirQualityData = (data: AirQualityData) => ({
  ...data,
  pm25Formatted: `${data.pm25} μg/m³`,
  temperatureFormatted: `${data.temperature}°`,
  windSpeedFormatted: `${data.windSpeed} km/h`,
  humidityFormatted: `${data.humidity}%`,
});

// Combined dashboard data type (jika perlu)
export type CompleteDashboardData = {
  occupancy: DashboardCategories;
  airQuality: AirQualityData;
  totalInside: number;
  capacityPercentage: number;
};

// Helper untuk get complete dashboard data
export const getCompleteDashboardData = (
  occupancy: DashboardCategories = initialDashboardData,
  airQuality: AirQualityData = initialAirQualityData
): CompleteDashboardData => {
  const totalInside = sumTotalInside(occupancy);
  return {
    occupancy,
    airQuality,
    totalInside,
    capacityPercentage: Math.round((totalInside / CAPACITY_MAX) * 100),
  };
};
