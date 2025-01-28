import { defineConfig, loadEnv } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
          target: env.VITE_BASE_API_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
