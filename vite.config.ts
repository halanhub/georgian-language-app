
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@supabase/postgrest-js']
  },
  build: {
    rollupOptions: {
      external: []
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react': 'react',
      'react-dom': 'react-dom'
    }
  }
});
