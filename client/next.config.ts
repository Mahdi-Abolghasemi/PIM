import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  env: {
    BACKEND_SERVER_ADDRESS: "http://127.0.0.1:4000/api",
  },
};

export default nextConfig;
