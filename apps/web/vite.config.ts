import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: "src/pages",
    }),
  ],

  resolve: {
    alias: {
      "@": "/src",
    },
  },

  server: {
    port: 8001,
    proxy: {
      "/api": {
        target: process.env.VITE_BASE_API_URL || "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
