import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
      // Polyfills to include
      include: ['buffer', 'process', 'util', 'global']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    mainFields: ['browser', 'module', 'jsnext:main', 'main'], // Prioritize browser field
  },
  define: {
    // Define global for browser environment
    global: 'globalThis',
  },
  optimizeDeps: {
    include: [
      '@supabase/postgrest-js',
      'react-router',
      'react-router-dom'
    ],
    exclude: ['lucide-react']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    rollupOptions: {
      plugins: [
        nodeResolve({
          preferBuiltins: false,
          browser: true,
          mainFields: ['browser', 'module', 'jsnext:main', 'main'], // Prioritize browser field
          extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], // Add all relevant extensions
        }),
        commonjs({
          requireReturnsDefault: true, // Force CommonJS modules to have a default export
          transformMixedEsModules: true,
          ignore: ['bufferutil', 'utf-8-validate']
        })
      ],
      external: []
    }
  },
  server: {
    host: true,
    port: 5173,
  },
  base: './',
});