import type { Locale } from '../data/types';

export const normalizePath = (path: string): string => path.replace(/\/+$/, '') || '/';

// Directory pages use one public URL in all SEO metadata.
export const canonicalPath = (path: string): string => {
  const normalized = normalizePath(path);
  return normalized === '/' || normalized.endsWith('.html') ? normalized : `${normalized}/`;
};

export interface RoutePair {
  tr: string;
  en: string;
}

export const ROUTE_PAIRS: RoutePair[] = [
  { tr: '/', en: '/en/' },
  { tr: '/hakkimizda/', en: '/en/about-us/' },
  { tr: '/bayilik/', en: '/en/franchising/' },
  { tr: '/kariyer/', en: '/en/career/' },
  { tr: '/haberler/', en: '/en/news/' },
  { tr: '/yazilim-gelistirme/', en: '/en/software-development/' },
  { tr: '/urun-gelistirme-ve-pazarlama/', en: '/en/product-development-and-marketing/' },
  { tr: '/dijital-donusum-danismanligi/', en: '/en/digital-transformation-consultancy/' },
  { tr: '/cerez-politikasi/', en: '/en/cookie-policy/' },
];

export function hasBilingualAlternate(pathname: string): boolean {
  const normalized = normalizePath(pathname);
  return ROUTE_PAIRS.some((pair) => {
    const trNorm = normalizePath(pair.tr);
    const enNorm = normalizePath(pair.en);
    return normalized === trNorm || normalized === enNorm;
  });
}

export function getAlternateUrl(pathname: string, targetLang: Locale): string {
  const normalized = normalizePath(pathname);
  for (const pair of ROUTE_PAIRS) {
    const trNorm = normalizePath(pair.tr);
    const enNorm = normalizePath(pair.en);
    if (normalized === trNorm || normalized === enNorm) {
      return targetLang === 'tr' ? pair.tr : pair.en;
    }
  }
  if (normalized.startsWith('/blog')) {
    return targetLang === 'tr' ? normalized : '/en/';
  }
  return targetLang === 'tr' ? '/' : '/en/';
}

