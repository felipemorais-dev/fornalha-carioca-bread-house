// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// `NETLIFY_STATIC_EXPORT=1` (set by `bun run export:netlify`) builds a plain,
// self-contained folder for hosts that only take static files, such as a
// Netlify drag & drop deploy. The normal Lovable build is untouched.
const staticExport = process.env["NETLIFY_STATIC_EXPORT"] === "1";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // The static export (see scripts/export-netlify.mjs) builds a Node server it
  // can render the page from, then ships only the rendered HTML and the files.
  ...(staticExport
    ? { nitro: { preset: process.env["NETLIFY_NITRO_PRESET"] ?? "node-server" } }
    : {}),
});
