import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers for smaller bundles
    target: "es2020",
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Source maps only in development
    sourcemap: mode === "development",
    // Chunk splitting strategy
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor: large 3rd-party libs into their own chunks
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-lenis": ["lenis"],
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
          ],
        },
        // Consistent hash-based filenames for caching
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
    // Inline small assets
    assetsInlineLimit: 4096,
    // Minify with esbuild (fast + good output)
    minify: "esbuild",
  },
  // Optimize deps for faster cold starts
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "lenis",
      "react-router-dom",
    ],
  },
}));
