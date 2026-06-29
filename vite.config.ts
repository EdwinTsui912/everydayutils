import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://www.everydayutils.com',
      dynamicRoutes: [
        '/', 
        '/password-generator', 
        '/username-generator', 
        '/qr-generator',
        '/color-palette-generator',
        '/text-tools',
        '/percentage-calculator',
        '/lorem-ipsum-generator',
        '/about',
        '/privacy-policy',
        '/terms-of-use',
        '/wifi-qr-guide',
        // Blog Posts
        '/blog/url-encoder',
        '/blog/image-converter',
        '/blog/percentage-calculator',
        '/blog/color-palette-generator-tailwind',
        '/blog/pomodoro-timer-free-online',
        '/blog/json-formatter-guide',
        '/blog/best-free-password-generator-2026',
        '/blog/lorem-ipsum-generator-free-private',
        '/blog/word-counter-text-sanitizer-guide',
        '/blog/pdf-copy-paste-fixer',
        '/blog/how-to-create-strong-passwords',
        '/blog/best-free-username-generator-2026',
      ],
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});