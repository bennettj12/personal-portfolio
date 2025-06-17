import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, './src/assets/styles'),
      '@': path.resolve(__dirname, './src/')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@styles/variables" as *;
        @use "@styles/mixins" as *;
        `,
      }
    },
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]_[hash:base64:5]'
    }
  },
  

})
