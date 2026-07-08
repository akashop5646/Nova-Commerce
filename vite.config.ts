import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@klin/platform": path.resolve(__dirname, "./packages/platform/src/index.ts"),
      "@klin/web": path.resolve(__dirname, "./apps/web/src/index.tsx"),
      "@klin/commerce": path.resolve(__dirname, "./packages/commerce/src/index.ts")
    },
  },
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
