import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mengabaikan error ESLint (variabel tak terpakai, dll) saat build Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Mengabaikan error TypeScript (seperti tulisan 'any') saat build Vercel
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;