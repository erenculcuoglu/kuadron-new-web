import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { ROUTE_PAIRS, normalizePath } from './src/config/routes.ts';

export default defineConfig({
  site: 'https://www.kuadron.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const legacyAliases = [
          '/blog/yeni-nesil-sirket-yonetim-uygulamasi-gelistirdi/',
          '/blog/endustri-4-0-nedir-ve-amaci-nedir/',
          '/blog/yazilim-gelistirme-yapan-firmalar/',
          '/blog/kuadron-veri-hazirlama-uygulamasi-reportqli-duyurdu/',
        ];
        if (legacyAliases.some((alias) => page.endsWith(alias))) return false;
        if (page.includes('/blog/tag/%')) return false;
        return true;
      },
      serialize(item) {
        const path = normalizePath(new URL(item.url).pathname);
        const pair = ROUTE_PAIRS.find((route) =>
          normalizePath(route.tr) === path || normalizePath(route.en) === path
        );
        if (pair) {
          const origin = new URL(item.url).origin;
          item.links = [
            { lang: 'tr', url: new URL(pair.tr, origin).href },
            { lang: 'en', url: new URL(pair.en, origin).href },
          ];
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
