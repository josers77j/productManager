import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server:{
    watch:{
      usePolling:true,
    },
    host:'0.0.0.0',
    proxy:{
      '/api':{
        target:'http://localhost:5000',
        changeOrigin:true,
      }
    }
  }
})
