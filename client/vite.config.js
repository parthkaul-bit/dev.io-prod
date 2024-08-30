import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://dev-io-exl4.onrender.com/", // Replace with your backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
