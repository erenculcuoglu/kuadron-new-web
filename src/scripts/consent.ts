const banner = document.getElementById('kuadron-cookie-banner');
const key = 'kuadron-analytics-consent';
const gaId = banner?.dataset.analyticsId || '';
const validId = /^G-[A-Z0-9]+$/.test(gaId);
let loaded = false;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  [key: `ga-disable-${string}`]: boolean;
};
const analytics = window as unknown as AnalyticsWindow;

function loadAnalytics() {
  if (loaded || !validId) return;
  loaded = true;
  analytics[`ga-disable-${gaId}`] = false;
  analytics.dataLayer = analytics.dataLayer || [];
  analytics.gtag = function () { analytics.dataLayer!.push(arguments); };
  analytics.gtag('js', new Date());
  analytics.gtag('config', gaId);
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  document.head.append(script);
}

function selectConsent(accepted: boolean) {
  try { localStorage.setItem(key, accepted ? 'accepted' : 'rejected'); } catch {}
  banner?.classList.add('hidden');
  if (accepted) loadAnalytics();
  else {
    analytics[`ga-disable-${gaId}`] = true;
    // Stop an already loaded tracker after the visitor changes their choice.
    if (loaded) window.location.reload();
  }
}

let saved: string | null = null;
try { saved = localStorage.getItem(key); } catch {}
if (saved === 'accepted') loadAnalytics();
else if (saved !== 'rejected' && validId) banner?.classList.remove('hidden');

banner?.querySelector('[data-cookie-accept]')?.addEventListener('click', () => selectConsent(true));
banner?.querySelector('[data-cookie-reject]')?.addEventListener('click', () => selectConsent(false));
document.querySelectorAll('[data-cookie-settings]').forEach((button) => {
  button.addEventListener('click', () => {
    banner?.classList.remove('hidden');
    banner?.querySelector<HTMLButtonElement>('button')?.focus();
  });
});

window.addEventListener('storage', (event) => {
  if (event.key === key || event.key === null) window.location.reload();
});

export {};
