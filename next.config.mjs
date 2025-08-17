/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⛔ Matikan ESLint saat build
  },
};

export default nextConfig;
