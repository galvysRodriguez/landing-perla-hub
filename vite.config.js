import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        // three.js is heavy: keep it in its own chunk, loaded after the page paints.
        manualChunks(id) {
          if (id.includes("node_modules/three") || id.includes("@react-three")) return "three";
        },
      },
    },
  },
});
