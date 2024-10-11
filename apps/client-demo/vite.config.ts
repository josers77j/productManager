import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
