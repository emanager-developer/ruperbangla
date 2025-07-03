import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 3000 },
  server: {
    port: 1400,
  },
  preview: {
    port: 1400,
  },
});
