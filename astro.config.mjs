import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Netlify sets URL to the site's primary address at build time. Set SITE_URL to override.
const site = process.env.SITE_URL || process.env.URL || 'https://jagritiverma.netlify.app';

export default defineConfig({
  site,
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' }
});
