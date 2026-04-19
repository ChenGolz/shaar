import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Important for GitHub Pages project URLs:
  // https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
  base: "./",
  plugins: [react()]
});
