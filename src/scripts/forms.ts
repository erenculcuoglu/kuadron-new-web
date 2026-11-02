type FeedbackState = 'success' | 'error' | 'notice';

document.querySelectorAll<HTMLFormElement>('form[data-kuadron-form]').forEach((form) => {
  let pending = false;
  const english = document.documentElement.lang === 'en';
  const feedback = form.querySelector<HTMLElement>('[data-form-feedback]');
  const showFeedback = (message: string, state: FeedbackState) => {
    if (!feedback) return;
    feedback.setAttribute('role', state === 'error' ? 'alert' : 'status');
    feedback.setAttribute('aria-live', state === 'error' ? 'assertive' : 'polite');
    feedback.dataset.state = state;
    feedback.textContent = message;
    feedback.classList.remove('hidden');
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get('_gotcha')) return;
    const endpoint = form.dataset.endpoint;

    // A static page cannot register a subscriber without a receiving service.
    if (!endpoint && form.dataset.isNewsletter === 'true') {
      showFeedback(english
        ? 'Subscription is not available. Your email address was not saved.'
        : 'Bülten kaydı şu an kapalı. E-posta adresiniz kaydedilmedi.', 'notice');
      return;
    }

    if (!endpoint) {
      const lines: string[] = [];
      data.forEach((value, key) => {
        if (key !== '_gotcha' && typeof value === 'string' && value.trim()) {
          lines.push(`${key}: ${value.trim()}`);
        }
      });
      const subject = english ? 'Kuadron website enquiry' : 'Kuadron web başvurusu';
      const email = form.dataset.fallbackEmail || 'info@kuadron.com';
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      showFeedback(form.dataset.fallbackText || (english
        ? 'Send the message from your email app. This site has not sent it.'
        : 'Mesajı e-posta uygulamanızdan gönderin. Site üzerinden gönderilmedi.'), 'notice');
      return;
    }

    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const label = form.querySelector('[data-submit-label]');
    const originalLabel = form.dataset.submitText || label?.textContent || '';
    pending = true;
    form.setAttribute('aria-busy', 'true');
    feedback?.classList.add('hidden');
    if (button) button.disabled = true;
    if (label) label.textContent = form.dataset.submittingText || (english ? 'Sending…' : 'Gönderiliyor…');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      showFeedback(form.dataset.successText || (english ? 'Message received.' : 'Mesajınız alındı.'), 'success');
    } catch {
      showFeedback(english
        ? 'The message could not be sent. Your entries are still here. Try again or use the email link.'
        : 'Mesaj gönderilemedi. Yazdıklarınız korundu. Tekrar deneyin veya e-posta bağlantısını kullanın.', 'error');
    } finally {
      pending = false;
      form.removeAttribute('aria-busy');
      if (button) button.disabled = false;
      if (label) label.textContent = originalLabel;
    }
  });
});

export {};
