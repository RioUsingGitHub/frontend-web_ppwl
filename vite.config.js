import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // tambahkan ini

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // tambahkan ini
  ],
})
