import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import pkg from './package.json'
import { manifestPlugin } from './manifestPlugin'

export default defineConfig({
  plugins: [
    react(),
    manifestPlugin({ widgetName: 'regionmap' })
  ],
  define: {
    'process.env': {},
  },
  build: {
    outDir: "../www",
    cssCodeSplit: true,
    emptyOutDir: false,
    lib: {
      entry: "src/widget.ts",
      name: "WidgetRegionMap",
      fileName: () => `widget-regionmap@${pkg.version}.iife.js`,
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: "widget-region-map.[ext]",
      },
    },
    minify: true,
    sourcemap: false
  }
});