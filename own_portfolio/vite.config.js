import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Only keep React core in vendor — everything else tree-shakes per lazy chunk
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // GSAP + Lenis are loaded via dynamic import in App.jsx
          // framer-motion is only used in Hackathon's lightbox — let it split naturally
          // Three.js only used in Contact3D — let it split naturally via lazy import
        }
      }
    }
  }
})
