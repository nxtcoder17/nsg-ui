import { readFileSync } from 'node:fs';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Connect, type Plugin } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';

/**
 * `appType: 'mpa'` (below) stops Vite rendering the app for an unknown path, but
 * its own 404 is an empty body. This serves the same `public/404.html` the
 * deployed site serves, so dev, `vite preview` and production agree.
 *
 * Requests that name a real HTML document (`/`, `/?…`, `*.html`) are passed on —
 * Vite serves those itself — and anything else that reaches the end of the stack
 * is a miss.
 */
const notFoundPage = (): Plugin => {
  const isDocument = (url: string) => {
    const path = url.split('?')[0];
    return url === '/' || url.startsWith('/?') || path.endsWith('.html');
  };
  const serve404: Connect.NextHandleFunction = (req, res, next) => {
    if (req.url && isDocument(req.url)) return next();
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(readFileSync(resolve(__dirname, 'public/404.html')));
  };
  return {
    name: 'nsg-404-page',
    configureServer(server) {
      return () => {
        server.middlewares.use(serve404);
      };
    },
    configurePreviewServer(server) {
      return () => {
        server.middlewares.use(serve404);
      };
    },
  };
};

export default defineConfig({
  // This site is one HTML page with no client-side router, so Vite's default
  // `appType: 'spa'` history fallback (`/anything` -> index.html) only ever hides
  // mistakes: a mistyped URL renders the app, and a mistyped asset path returns
  // HTML with a 200 — which is exactly how a wrong stylesheet path once looked
  // like success. `'mpa'` disables that fallback, so an unknown path 404s.
  appType: 'mpa',
  plugins: [notFoundPage(), devtools(), solidPlugin(), tailwindcss()],
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
    dedupe: ['solid-js', '@kobalte/core'],
    alias: {
      'nsg-ui/theme.css': resolve(__dirname, '../dist/theme.css'),
      'nsg-ui/icons': resolve(__dirname, '../src/icons'),
      'nsg-ui': resolve(__dirname, '../src'),
      '@utils': resolve(__dirname, '../src/utils'),
      '@icons': resolve(__dirname, '../src/icons'),
    },
  },
});
