/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.tsx"),
      formats: ["es"],
    },
    copyPublicDir: false,
  },
  // below is necessary to avoid React using process,
  // see the Environment Variables box under https://vite.dev/guide/build#css-support
  define: { "process.env.NODE_ENV": "production" },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
  },
});
