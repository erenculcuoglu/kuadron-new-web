const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');

function applyTheme(theme: string | null) {
  const value = theme === 'light' || theme === 'dark' ? theme : null;
  if (value) document.documentElement.dataset.theme = value;
  else delete document.documentElement.dataset.theme;
  if (meta) meta.content = value ?? 'light dark';
}

document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme ??
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('color-scheme', next); } catch {}
  });
});

window.addEventListener('storage', (event) => {
  if (event.key === 'color-scheme' || event.key === null) applyTheme(event.newValue);
});

export {};
