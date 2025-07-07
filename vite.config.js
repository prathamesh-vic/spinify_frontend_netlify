import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: [
      'spinner-frontend.ngrok.app',
      // Add any other hosts you need
    ]
  },
  // ...other Vite configuration options
});