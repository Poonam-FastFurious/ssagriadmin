import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
=======
  server: {
    proxy: {
      "/api": "https://ssagricultureapi.brandbell.in",
    },
  },
>>>>>>> c727a857f65edd70d1312c0e9c24c090f0e0b5eb
  plugins: [react()],
});
