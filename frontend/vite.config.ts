import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  plugins: [react()],
  server: {
    host: '0.0.0.0',   //Permette così di far interagire il browser con il frontend server nel container, facendo 0.0.0.0 accedo da qualsiasi dispositivo nella rete
    port: 5173,
  }

})
