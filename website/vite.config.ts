import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [devtools(), solidPlugin(), tailwindcss()],
  server: {
    port: 3000,
    fs: {
      allow: ['..'],
    },
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      'nsg-ui/theme.css': resolve(__dirname, '../dist/theme.css'),
      'nsg-ui/icons': resolve(__dirname, '../src/icons'),
      'nsg-ui': resolve(__dirname, '../src'),
    },
  },
});
