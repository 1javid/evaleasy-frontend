import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  base: "/",  // Ensure Vercel serves assets correctly
  build: {
    outDir: "dist", // Output directory for production
  }
});
