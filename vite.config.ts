import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';


// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://www.everydayutils.com',
      dynamicRoutes: [
        // Tools
        '/password-generator',
        '/username-generator',
        '/qr-generator',
        '/color-palette-generator',
        '/favicon-generator',
        '/text-tools',
        '/percentage-calculator',
        '/lorem-ipsum-generator',
        '/base64',
        '/url-encoder',
        '/image-converter',
        '/pomodoro',
        '/json-formatter',
        '/promptforge',
        '/youtube-thumbnail',
        '/timestamp-converter',
        '/uuid-generator',
        '/css-effects',
        'breathing-timer',


        // Legal / Info
        '/about',
        '/contact',
        '/privacy-policy',
        '/terms-of-use',


        // Blog Posts
        '/blog/promptforge-launch',
        '/blog/youtube-thumbnail-generator',
        '/blog/free-developer-utilities',
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
        '/blog/favicon-generator',
        '/blog/who-is-json',
        '/blog/wifi-qr-code-guide',
        '/blog/15-tools-18-posts-milestone',
        '/blog/unix-timestamp-converter-guide',
        '/blog/uuid-generator',
        'blog/css-effects-generator',
        
      ],
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});