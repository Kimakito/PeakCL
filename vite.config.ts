import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig(({ command }) => ({
  plugins: [
    tanstackStart(),
    react(),
    tsconfigPaths(),
    tailwindcss(),
    // The Netlify plugin wires up redirects/middleware for Netlify.
    // In local `vite dev`, that can cause the app HTML to be served via the
    // serverless function (built assets), resulting in 404s for hashed assets.
    // Keep it enabled for `vite build` only.
    ...(command === "build" ? [netlify()] : []),
  ],
}));
