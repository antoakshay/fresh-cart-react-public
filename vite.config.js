import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [
    mkcert(), // Enables HTTPS development with self-signed certificates
    react(),
    eslintPlugin({
      emitWarning: true, // Show warnings in yellow
      emitError: false, // Turn off errors (red)
    }),
  ],
});
