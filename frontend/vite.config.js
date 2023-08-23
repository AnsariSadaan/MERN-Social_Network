import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // ... other config properties
  server: {
    proxy: {
      '/backend': 'https://mern-social-network-phi.vercel.app/'
    }
  },
  plugins: [react()],
});
