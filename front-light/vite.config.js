import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  base: "/",  // Ensure correct routing on Vercel
  build: {
    outDir: "dist",
  }
});
