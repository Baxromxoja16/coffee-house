import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/coffee-house/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cart: resolve(__dirname, 'pages/cart/index.html'),
        login: resolve(__dirname, 'pages/login/index.html'),
        register: resolve(__dirname, 'pages/register/index.html'),
        menu: resolve(__dirname, 'pages/coffee/index.html'),
      },
    },
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@shared': resolve(__dirname, './src/shared'),
      '@pages': resolve(__dirname, './src/pages'),
    },
  },
  server: {
    open: true,
    port: 3000,
  },
});
