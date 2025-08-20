export type AqiMeta = {
  label: string;
  bg: string;
  text: string;
  strip: string;
};

const BANDS: { max: number; meta: AqiMeta }[] = [
  {
    max: 50,
    meta: {
      label: "Baik",
      bg: "bg-emerald-500/15 border-emerald-500/30",
      text: "text-emerald-400",
      strip: "bg-emerald-500",
    },
  },
  {
    max: 100,
    meta: {
      label: "Sedang",
      bg: "bg-yellow-500/15 border-yellow-500/30",
      text: "text-yellow-400",
      strip: "bg-yellow-500",
    },
  },
  {
    max: 150,
    meta: {
      label: "Tidak Sehat (Sensitif)",
      bg: "bg-orange-500/15 border-orange-500/30",
      text: "text-orange-400",
      strip: "bg-orange-500",
    },
  },
  {
    max: 200,
    meta: {
      label: "Tidak Sehat",
      bg: "bg-red-500/15 border-red-500/30",
      text: "text-red-400",
      strip: "bg-red-500",
    },
  },
  {
    max: 300,
    meta: {
      label: "Sangat Tidak Sehat",
      bg: "bg-purple-500/15 border-purple-500/30",
      text: "text-purple-400",
      strip: "bg-purple-500",
    },
  },
  {
    max: 999,
    meta: {
      label: "Berbahaya",
      bg: "bg-rose-600/15 border-rose-600/30",
      text: "text-rose-400",
      strip: "bg-rose-600",
    },
  },
];

export function getAqiMeta(aqi: number): AqiMeta {
  return (BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1]).meta;
}
