import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  base: command === 'build' ? '/lista-de-presentes/' : '/',
  server: {
    open: true,
    port: 3000,
  },
}));
