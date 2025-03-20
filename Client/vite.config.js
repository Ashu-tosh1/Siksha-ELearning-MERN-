import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import path module

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default Vite port
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Set alias for src folder
    },
  },
});
