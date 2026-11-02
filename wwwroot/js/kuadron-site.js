// Kuadron kurumsal web sitesi: üst menü, tema, modallar, OzBI Agent senaryo seçici, karusel, arama/filtre ve form yönetimi.
(function () {
    'use strict';

    // 1. Tema Yönetimi (Açık / Koyu)
    var meta = document.querySelector('meta[name="color-scheme"]');
    function applyTheme(theme) {
        var value = theme === 'light' || theme === 'dark' ? theme : null;
        if (value) document.documentElement.dataset.theme = value;
        else delete document.documentElement.dataset.theme;
        if (meta) meta.content = value || 'light dark';
    }

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
        button.addEventListener('click', function () {
            var current = document.documentElement.dataset.theme ||
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            var next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            try { localStorage.setItem('color-scheme', next); } catch (e) {}
        });
    });

    window.addEventListener('storage', function (event) {
        if (event.key === 'color-scheme' || event.key === null) applyTheme(event.newValue);
    });

    // 2. Üst Menü <details> Açılır Panelleri
    var disclosures = document.querySelectorAll('.nav-disclosure');
    disclosures.forEach(function (item) {
        item.addEventListener('toggle', function () {
            if (item.open) {
                disclosures.forEach(function (other) {
                    if (other !== item) other.open = false;
                });
            }
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        var active = document.activeElement;
        disclosures.forEach(function (item) {
            if (!item.open) return;
            item.open = false;
            if (active && item.contains(active)) {
                var summary = item.querySelector('summary');
                if (summary) summary.focus();
            }
        });
    });

    document.addEventListener('click', function (event) {
        disclosures.forEach(function (item) {
            if (event.target instanceof Node && !item.contains(event.target)) {
                item.open = false;
            }
        });
    });

    // 3. Native <dialog> Modallar ve Mobil Çekmece
    document.querySelectorAll('[data-open-dialog]').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            var targetId = trigger.getAttribute('data-open-dialog');
            if (!targetId) return;
            var dialog = document.getElementById(targetId);
            if (!dialog || typeof dialog.showModal !== 'function') return;

            var presetPosition = trigger.getAttribute('data-position-title');
            if (presetPosition) {
                var posInput = dialog.querySelector('input[name="position"]');
                if (posInput) posInput.value = presetPosition;
            }
            dialog.showModal();
        });
    });

    document.querySelectorAll('dialog').forEach(function (dialog) {
        dialog.querySelectorAll('[data-close-dialog]').forEach(function (el) {
            el.addEventListener('click', function () { dialog.close(); });
        });

        if (!('closedBy' in HTMLDialogElement.prototype)) {
            dialog.addEventListener('click', function (event) {
                if (event.target !== dialog) return;
                var rect = dialog.getBoundingClientRect();
                var isDialogContent =
                    rect.top <= event.clientY &&
                    event.clientY <= rect.top + rect.height &&
                    rect.left <= event.clientX &&
                    event.clientX <= rect.left + rect.width;
                if (isDialogContent) return;
                dialog.close();
            });
        }
    });

    // 4. OzBI Agent Modu Senaryo Sekmeleri
    document.querySelectorAll('[data-ozbi-console]').forEach(function (root) {
        var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
        var panels = Array.prototype.slice.call(root.querySelectorAll('[role="tabpanel"]'));

        function selectTab(index) {
            tabs.forEach(function (tab, i) {
                var active = i === index;
                tab.classList.toggle('is-active', active);
                tab.setAttribute('aria-selected', active ? 'true' : 'false');
                tab.tabIndex = active ? 0 : -1;
            });
            panels.forEach(function (panel, i) {
                panel.hidden = i !== index;
            });
        }

        tabs.forEach(function (tab, idx) {
            tab.addEventListener('click', function () { selectTab(idx); });
            tab.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    var dir = e.key === 'ArrowRight' ? 1 : -1;
                    var next = (idx + dir + tabs.length) % tabs.length;
                    selectTab(next);
                    if (tabs[next]) tabs[next].focus();
                }
            });
        });
    });

    // 5. Müşteri Deneyimleri Karuseli
    var track = document.querySelector('[data-testimonial-track]');
    var prev = document.querySelector('[data-testimonial-prev]');
    var next = document.querySelector('[data-testimonial-next]');
    if (track && prev && next) {
        var move = function (direction) {
            var firstWidth = track.firstElementChild ? track.firstElementChild.getBoundingClientRect().width : track.clientWidth;
            track.scrollBy({
                left: direction * firstWidth,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
            });
        };
        var updateCarousel = function () {
            prev.disabled = track.scrollLeft < 2;
            next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
        };
        prev.addEventListener('click', function () { move(-1); });
        next.addEventListener('click', function () { move(1); });
        track.addEventListener('scroll', updateCarousel, { passive: true });
        if (typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(updateCarousel).observe(track);
        }
        updateCarousel();
    }

    // 6. Reportql Demo Video Kontrolü
    document.querySelectorAll('.product-demo').forEach(function (details) {
        details.addEventListener('toggle', function () {
            if (!details.open) {
                var video = details.querySelector('video');
                if (video && typeof video.pause === 'function') video.pause();
            }
        });
    });

    // 7. Basın Arşivi Arama ve Yıl Filtresi (/haberler ve /en/news)
    var pressSearch = document.getElementById('press-search');
    var yearBtns = document.querySelectorAll('[data-year-filter]');
    var pressItems = document.querySelectorAll('[data-press-item]');
    var pressEmpty = document.getElementById('press-empty-state');
    if (pressItems.length > 0) {
        var activeYear = 'all';
        var filterArchive = function () {
            var query = ((pressSearch && pressSearch.value) || '').trim().toLowerCase();
            var visibleCount = 0;
            pressItems.forEach(function (el) {
                var matchesYear = activeYear === 'all' || el.dataset.year === activeYear;
                var matchesQuery = !query || (el.dataset.search || '').includes(query);
                var show = matchesYear && matchesQuery;
                el.classList.toggle('hidden', !show);
                if (show) visibleCount++;
            });
            if (pressEmpty) pressEmpty.classList.toggle('hidden', visibleCount > 0);
        };
        if (pressSearch) pressSearch.addEventListener('input', filterArchive);
        yearBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                activeYear = btn.getAttribute('data-year-filter') || 'all';
                yearBtns.forEach(function (b) {
                    var isCurrent = b === btn;
                    b.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
                    b.classList.toggle('border-[var(--brand-amber)]', isCurrent);
                    b.classList.toggle('bg-[var(--brand-amber-bg)]', isCurrent);
                    b.classList.toggle('text-[var(--brand-amber-text)]', isCurrent);
                    b.classList.toggle('border-[var(--border-subtle)]', !isCurrent);
                    b.classList.toggle('bg-[var(--bg-surface)]', !isCurrent);
                });
                filterArchive();
            });
        });
    }

    // 8. Blog Arama (/blog)
    var blogSearch = document.getElementById('blog-search');
    var blogCards = document.querySelectorAll('[data-blog-card]');
    var blogEmpty = document.getElementById('blog-empty');
    if (blogSearch && blogCards.length > 0) {
        blogSearch.addEventListener('input', function () {
            var q = blogSearch.value.trim().toLowerCase();
            var count = 0;
            blogCards.forEach(function (card) {
                var match = !q || (card.dataset.search || '').includes(q);
                card.classList.toggle('hidden', !match);
                if (match) count++;
            });
            if (blogEmpty) blogEmpty.classList.toggle('hidden', count > 0);
        });
    }

    // 9. Form Doğrulama ve Gönderim
    var touched = new WeakSet();
    function isField(target) {
        return (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)
            && target.classList.contains('k-input');
    }
    function updateField(field) {
        var invalid = !field.validity.valid;
        field.classList.toggle('user-invalid-fallback', invalid);
        field.classList.toggle('user-valid-fallback', !invalid && field.value !== '');
        field.setAttribute('aria-invalid', String(invalid));

        var errorId = field.getAttribute('aria-errormessage');
        if (!errorId) return;
        var descriptions = new Set((field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
        if (invalid) descriptions.add(errorId);
        else descriptions.delete(errorId);
        if (descriptions.size) field.setAttribute('aria-describedby', Array.from(descriptions).join(' '));
        else field.removeAttribute('aria-describedby');
    }

    document.addEventListener('blur', function (event) {
        if (!isField(event.target)) return;
        touched.add(event.target);
        updateField(event.target);
    }, true);

    document.addEventListener('input', function (event) {
        if (isField(event.target) && touched.has(event.target)) updateField(event.target);
    });

    document.addEventListener('change', function (event) {
        if (isField(event.target) && touched.has(event.target)) updateField(event.target);
    });

    document.addEventListener('invalid', function (event) {
        if (!isField(event.target)) return;
        touched.add(event.target);
        updateField(event.target);
    }, true);

    document.addEventListener('reset', function (event) {
        if (!(event.target instanceof HTMLFormElement)) return;
        Array.from(event.target.elements).forEach(function (field) {
            if (!isField(field)) return;
            touched.delete(field);
            field.classList.remove('user-invalid-fallback', 'user-valid-fallback');
            field.removeAttribute('aria-invalid');
            var errorId = field.getAttribute('aria-errormessage');
            var descriptions = (field.getAttribute('aria-describedby') || '').split(/\s+/)
                .filter(function (id) { return id && id !== errorId; });
            if (descriptions.length) field.setAttribute('aria-describedby', descriptions.join(' '));
            else field.removeAttribute('aria-describedby');
        });
    }, true);

    document.querySelectorAll('form[data-kuadron-form]').forEach(function (form) {
        var pending = false;
        var english = document.documentElement.lang === 'en';
        var feedback = form.querySelector('[data-form-feedback]');
        var showFeedback = function (message, state) {
            if (!feedback) return;
            feedback.setAttribute('role', state === 'error' ? 'alert' : 'status');
            feedback.setAttribute('aria-live', state === 'error' ? 'assertive' : 'polite');
            feedback.dataset.state = state;
            feedback.textContent = message;
            feedback.classList.remove('hidden');
        };

        form.addEventListener('submit', async function (event) {
            event.preventDefault();
            if (pending || !form.reportValidity()) return;
            var data = new FormData(form);
            if (data.get('_gotcha')) return;
            var endpoint = form.dataset.endpoint;

            if (!endpoint) {
                var lines = [];
                data.forEach(function (value, key) {
                    if (key !== '_gotcha' && typeof value === 'string' && value.trim()) {
                        lines.push(key + ': ' + value.trim());
                    }
                });
                var subject = english ? 'Kuadron website enquiry' : 'Kuadron web başvurusu';
                var email = form.dataset.fallbackEmail || 'info@kuadron.com';
                window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
                showFeedback(form.dataset.fallbackText || (english
                    ? 'Send the message from your email app. This site has not sent it.'
                    : 'Mesajı e-posta uygulamanızdan gönderin. Site üzerinden gönderilmedi.'), 'notice');
                return;
            }

            var button = form.querySelector('button[type="submit"]');
            var label = form.querySelector('[data-submit-label]');
            var originalLabel = form.dataset.submitText || (label && label.textContent) || '';
            pending = true;
            form.setAttribute('aria-busy', 'true');
            if (feedback) feedback.classList.add('hidden');
            if (button) button.disabled = true;
            if (label) label.textContent = form.dataset.submittingText || (english ? 'Sending…' : 'Gönderiliyor…');

            try {
                var response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { Accept: 'application/json' },
                    body: data
                });
                if (!response.ok) throw new Error('Submission failed');
                form.reset();
                showFeedback(form.dataset.successText || (english ? 'Message received.' : 'Mesajınız alındı.'), 'success');
            } catch (err) {
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

    // 10. Çerez ve Analitik İzin Yönetimi
    var banner = document.getElementById('kuadron-cookie-banner');
    var consentKey = 'kuadron-analytics-consent';
    var gaId = (banner && banner.dataset.analyticsId) || '';
    var validId = /^G-[A-Z0-9]+$/.test(gaId);
    var loaded = false;

    function loadAnalytics() {
        if (loaded || !validId) return;
        loaded = true;
        window['ga-disable-' + gaId] = false;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', gaId);
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
        document.head.appendChild(script);
    }

    function selectConsent(accepted) {
        try { localStorage.setItem(consentKey, accepted ? 'accepted' : 'rejected'); } catch (e) {}
        if (banner) banner.classList.add('hidden');
        if (accepted) loadAnalytics();
        else {
            window['ga-disable-' + gaId] = true;
            if (loaded) window.location.reload();
        }
    }

    var savedConsent = null;
    try { savedConsent = localStorage.getItem(consentKey); } catch (e) {}
    if (savedConsent === 'accepted') loadAnalytics();
    else if (savedConsent !== 'rejected' && validId && banner) banner.classList.remove('hidden');

    if (banner) {
        var acceptBtn = banner.querySelector('[data-cookie-accept]');
        var rejectBtn = banner.querySelector('[data-cookie-reject]');
        if (acceptBtn) acceptBtn.addEventListener('click', function () { selectConsent(true); });
        if (rejectBtn) rejectBtn.addEventListener('click', function () { selectConsent(false); });
    }

    document.querySelectorAll('[data-cookie-settings]').forEach(function (button) {
        button.addEventListener('click', function () {
            if (!banner) return;
            banner.classList.remove('hidden');
            var firstBtn = banner.querySelector('button');
            if (firstBtn) firstBtn.focus();
        });
    });
})();
