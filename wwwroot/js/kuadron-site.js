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
            try { localStorage.setItem('color-scheme', next); } catch (e) { }
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

    // 2b. Hash / Bölüm Bağlantılarında (#referanslar, #iletisim, #urunler vb.) Hassas Kaydırma
    function scrollToHashTarget(hash, smooth) {
        if (!hash || hash === '#') return false;
        var id = decodeURIComponent(hash.replace(/^#/, ''));
        var target = document.getElementById(id);
        if (!target) return false;
        var header = document.querySelector('header');
        var headerOffset = header ? header.getBoundingClientRect().height : 64;
        var top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);
        var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({
            top: top,
            behavior: (smooth && !reduced) ? 'smooth' : 'instant'
        });
        return true;
    }

    document.querySelectorAll('a[href*="#"]').forEach(function (link) {
        link.addEventListener('click', function (event) {
            var rawHref = link.getAttribute('href');
            if (!rawHref) return;
            var url;
            try { url = new URL(rawHref, window.location.origin); } catch (e) { return; }
            var normCurrent = window.location.pathname.replace(/\/+$/, '') || '/';
            var normTarget = url.pathname.replace(/\/+$/, '') || '/';
            if (normCurrent !== normTarget || !url.hash) return;
            if (scrollToHashTarget(url.hash, true)) {
                event.preventDefault();
                history.pushState(null, '', url.hash);
            }
        });
    });

    if (window.location.hash) {
        window.requestAnimationFrame(function () {
            scrollToHashTarget(window.location.hash, false);
        });
        window.addEventListener('load', function () {
            scrollToHashTarget(window.location.hash, false);
        }, { once: true });
    }

    // 3. Native <dialog> Modallar ve Mobil Çekmece
    document.querySelectorAll('[data-open-dialog]').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            var targetId = trigger.getAttribute('data-open-dialog');
            if (!targetId) return;
            var dialog = document.getElementById(targetId);
            if (!dialog || typeof dialog.showModal !== 'function') return;
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

    // 4. OzBI Agent Modu, Strife & YZ Danışmanlığı Senaryo Sekmeleri (İç İçe Sekme Güvenli)
    document.querySelectorAll('[data-ozbi-console], [data-strife-console], [data-ai-studio]').forEach(function (root) {
        var tablist = root.querySelector('[role="tablist"]');
        if (!tablist) return;
        var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
        var panels = tabs.map(function (tab) {
            var id = tab.getAttribute('aria-controls');
            return id ? document.getElementById(id) : null;
        });

        function selectTab(index) {
            tabs.forEach(function (tab, i) {
                var active = i === index;
                tab.classList.toggle('is-active', active);
                tab.setAttribute('aria-selected', active ? 'true' : 'false');
                tab.tabIndex = active ? 0 : -1;
            });
            panels.forEach(function (panel, i) {
                if (panel) panel.hidden = i !== index;
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

    // 4b. Strife İnteraktif Alt Kontrolleri (Sezon Aşaması, Fikstür İşlemler, Kulüp Seçici, LED Skorboard & Yaka Kartı)
    document.querySelectorAll('[data-strife-console]').forEach(function (root) {
        // Normal Sezon / Play-Off Puan Tablosu Geçişi
        var stageBtns = root.querySelectorAll('[data-strife-stage-btn]');
        var stageViews = root.querySelectorAll('[data-strife-stage-view]');
        stageBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var target = btn.getAttribute('data-strife-stage-btn');
                stageBtns.forEach(function (b) {
                    var active = b === btn;
                    b.classList.toggle('is-active', active);
                    b.setAttribute('aria-pressed', active ? 'true' : 'false');
                });
                stageViews.forEach(function (view) {
                    view.hidden = view.getAttribute('data-strife-stage-view') !== target;
                });
            });
        });

        // Fikstür Satırı & "İşlemler" Maç Denetçisi
        var matchRows = root.querySelectorAll('[data-strife-match-row]');
        var titleEl = root.querySelector('[data-strife-inspector-title]');
        var quartersEl = root.querySelector('[data-strife-inspector-quarters]');
        var venueEl = root.querySelector('[data-strife-inspector-venue]');
        var refEl = root.querySelector('[data-strife-inspector-referee]');

        function selectMatchRow(row) {
            matchRows.forEach(function (r) { r.classList.toggle('is-selected', r === row); });
            if (titleEl) titleEl.textContent = row.getAttribute('data-match-title') || '';
            if (quartersEl) quartersEl.textContent = row.getAttribute('data-match-quarters') || '';
            if (venueEl) venueEl.textContent = row.getAttribute('data-match-venue') || '';
            if (refEl) refEl.textContent = row.getAttribute('data-match-referee') || '';
        }

        matchRows.forEach(function (row) {
            row.addEventListener('click', function () { selectMatchRow(row); });
        });

        // Kulüp Kartı & Sonuç Widget Seçici
        var clubBtns = root.querySelectorAll('[data-strife-club-btn]');
        var clubViews = root.querySelectorAll('[data-strife-club-view]');
        clubBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var clubId = btn.getAttribute('data-strife-club-btn');
                clubBtns.forEach(function (b) {
                    var active = b === btn;
                    b.classList.toggle('is-active', active);
                    b.setAttribute('aria-pressed', active ? 'true' : 'false');
                });
                clubViews.forEach(function (v) {
                    v.hidden = v.getAttribute('data-strife-club-view') !== clubId;
                });
            });
        });

        // OVR LED Skorboard Canlı Gol & Bayrak Seremonisi Kontrolleri
        var homeScoreEl = root.querySelector('[data-strife-home-score]');
        var awayScoreEl = root.querySelector('[data-strife-away-score]');
        var matchBoardEl = root.querySelector('[data-strife-led-match]');
        var ceremonyEl = root.querySelector('[data-strife-led-ceremony]');
        var ceremonyBtn = root.querySelector('[data-strife-ceremony-toggle]');

        root.querySelectorAll('[data-strife-score-btn]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var side = btn.getAttribute('data-strife-score-btn');
                var targetEl = side === 'home' ? homeScoreEl : awayScoreEl;
                if (!targetEl) return;
                var val = parseInt(targetEl.textContent || '0', 10);
                targetEl.textContent = String((val + 1) % 30);
                if (ceremonyEl && !ceremonyEl.hidden && matchBoardEl) {
                    ceremonyEl.hidden = true;
                    matchBoardEl.hidden = false;
                    if (ceremonyBtn) {
                        ceremonyBtn.classList.remove('is-active');
                        ceremonyBtn.setAttribute('aria-pressed', 'false');
                    }
                }
            });
        });

        if (ceremonyBtn && ceremonyEl && matchBoardEl) {
            ceremonyBtn.addEventListener('click', function () {
                var showCeremony = ceremonyEl.hidden;
                ceremonyEl.hidden = !showCeremony;
                matchBoardEl.hidden = showCeremony;
                ceremonyBtn.classList.toggle('is-active', showCeremony);
                ceremonyBtn.setAttribute('aria-pressed', showCeremony ? 'true' : 'false');
            });
        }

        // Akreditasyon Yaka Kartı & TV i-Frame Rol Seçici
        var roleBtns = root.querySelectorAll('[data-strife-role-btn]');
        var roleViews = root.querySelectorAll('[data-strife-role-view]');
        roleBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var role = btn.getAttribute('data-strife-role-btn');
                roleBtns.forEach(function (b) {
                    var active = b === btn;
                    b.classList.toggle('is-active', active);
                    b.setAttribute('aria-pressed', active ? 'true' : 'false');
                });
                roleViews.forEach(function (v) {
                    v.hidden = v.getAttribute('data-strife-role-view') !== role;
                });
            });
        });
    });

    // 4c. Reportql Low-Code SQL, Pivot & Dashboard Tasarlayıcı İnteraktif Konsolu
    document.querySelectorAll('[data-rql-console]').forEach(function (root) {
        var sqlCodeEl = root.querySelector('[data-rql-sql-code]');
        var activeLabelEl = root.querySelector('[data-rql-active-label]');
        var formatBtns = root.querySelectorAll('[data-rql-format-btn]');
        var formatViews = root.querySelectorAll('[data-rql-format-view]');

        formatBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var fmt = btn.getAttribute('data-rql-format-btn');
                formatBtns.forEach(function (b) {
                    var active = b === btn;
                    b.classList.toggle('is-active', active);
                    b.setAttribute('aria-selected', active ? 'true' : 'false');
                });
                formatViews.forEach(function (v) {
                    v.hidden = v.getAttribute('data-rql-format-view') !== fmt;
                });
                if (sqlCodeEl && btn.getAttribute('data-format-sql')) {
                    sqlCodeEl.textContent = btn.getAttribute('data-format-sql');
                }
                if (activeLabelEl && btn.getAttribute('data-format-badge')) {
                    activeLabelEl.textContent = btn.getAttribute('data-format-badge');
                }
            });
        });
    });

    // 4d. TORK CRM, Pipeline & Ön Muhasebe İnteraktif Konsolu
    document.querySelectorAll('[data-tork-console]').forEach(function (root) {
        var tabBtns = root.querySelectorAll('[data-tork-tab-btn]');
        var panels = root.querySelectorAll('[data-tork-panel]');

        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var target = btn.getAttribute('data-tork-tab-btn');
                tabBtns.forEach(function (b) {
                    var active = b === btn;
                    b.classList.toggle('is-active', active);
                    b.setAttribute('aria-selected', active ? 'true' : 'false');
                });
                panels.forEach(function (p) {
                    p.hidden = p.getAttribute('data-tork-panel') !== target;
                });
            });
        });
    });

    // 4e. Klinitra Sağlık Yapay Zeka Modülleri İnteraktif Konsolu
    document.querySelectorAll('[data-klinitra-console]').forEach(function (root) {
        var tabBtns = root.querySelectorAll('[data-klinitra-tab-btn]');
        var panels = root.querySelectorAll('[data-klinitra-panel]');

        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var target = btn.getAttribute('data-klinitra-tab-btn');
                tabBtns.forEach(function (b) {
                    var active = b === btn;
                    b.classList.toggle('is-active', active);
                    b.setAttribute('aria-selected', active ? 'true' : 'false');
                });
                panels.forEach(function (p) {
                    p.hidden = p.getAttribute('data-klinitra-panel') !== target;
                });
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

    // 6. Basın Arşivi Arama ve Yıl Filtresi (/haberler ve /en/news)
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

    // 7. Form Doğrulama ve Gönderim
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
        try { localStorage.setItem(consentKey, accepted ? 'accepted' : 'rejected'); } catch (e) { }
        if (banner) banner.classList.add('hidden');
        if (accepted) loadAnalytics();
        else {
            window['ga-disable-' + gaId] = true;
            if (loaded) window.location.reload();
        }
    }

    var savedConsent = null;
    try { savedConsent = localStorage.getItem(consentKey); } catch (e) { }
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
