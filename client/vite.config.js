import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: 'localhost',  // Ensure it matches your environment
    port: 5173,         // Ensure this port is not blocked
    hmr: {
      clientPort: 5173, // Ensures WebSocket connects properly
    }}
});
