import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Multi-page build: real URLs for arabkumar.in/, /code/ and /content/ on GitHub Pages.
export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        code: resolve(import.meta.dirname, 'code/index.html'),
        content: resolve(import.meta.dirname, 'content/index.html'),
      },
    },
  },
});
