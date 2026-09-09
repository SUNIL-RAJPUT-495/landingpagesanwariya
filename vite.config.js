import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.jpeg', 'pwa-192x192.png', 'pwa-512x512.png', 'app-release.apk'],
      manifest: false, // Use existing public/manifest.json
      devOptions: {
        enabled: true
      }
    })
  ],
})

