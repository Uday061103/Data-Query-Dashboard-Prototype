import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'chart-vendor': ['chart.js', 'react-chartjs-2']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@reduxjs/toolkit',
      'react-redux',
      'chart.js',
      'react-chartjs-2'
    ]
  }
})





