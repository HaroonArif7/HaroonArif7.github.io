import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration targeting static GitHub Pages root deployment
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
