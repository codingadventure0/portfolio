import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/portfolio",
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png'],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/global.css";`
      }
    }
  },
  resolve: {
    alias: {
      // Add this alias if needed
      'react-slick': 'react-slick/dist/react-slick.js'
    }
  }
});
