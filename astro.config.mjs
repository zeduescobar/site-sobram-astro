import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://planosobam.com.br',
  integrations: [sitemap()],
  trailingSlash: 'never',
  scopedStyleStrategy: 'where'
});
