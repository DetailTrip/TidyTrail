import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@":           path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@features":   path.resolve(__dirname, "src/features"),
      "@booking":    path.resolve(__dirname, "src/features/booking"),
      "@utils":      path.resolve(__dirname, "src/utils"),
      "@admin":      path.resolve(__dirname, "src/features/admin"),
      "@hooks":      path.resolve(__dirname, "src/hooks"),  // ← NEW
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3001", // Proxy API requests to Express backend
    },
  },
});
