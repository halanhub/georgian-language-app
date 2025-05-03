import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['@supabase/postgrest-js']
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
          mainFields: ['module', 'main']
        }),
        commonjs({
          requireReturnsDefault: 'auto'
        })
      ],
      external: []
    }
  },
  server: {
    host: true,
    port: 5173,
  },
  base: './', // Use relative path for GitHub Pages
});