import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@emotion/styled"],
  },
  resolve: {
    alias: {
      "@lib/core": resolve(__dirname, "../../packages/core/src"),
      "@": resolve(__dirname, "./src"),
    },
  },
});
