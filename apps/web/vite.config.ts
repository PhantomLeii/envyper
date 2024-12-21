import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

console.log(path.resolve(__dirname, "./"));

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      generatedRouteTree: "./routeTree.gen.ts",
      routesDirectory: "./app",
    }),
    react(),
  ],
  server: {
    port: 3002,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
