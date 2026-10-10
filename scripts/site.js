/* Interactivity for the static export: theme, menu, gallery filters, image viewer,
   copy buttons, contact form and case-study contents highlighting. No dependencies. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch {} }
  };
  var SUN = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  var MOON = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
  var MENU = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  var CLOSE = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';

  /* Theme toggle */
  $$('button[aria-label^="Switch to"]').forEach(function (btn) {
    var paint = function () {
      var dark = root.classList.contains('dark');
      btn.innerHTML = dark ? SUN : MOON;
      var label = dark ? 'Switch to light theme' : 'Switch to dark theme';
      btn.setAttribute('aria-label', label); btn.title = label;
    };
    paint();
    btn.addEventListener('click', function () {
      var dark = !root.classList.contains('dark');
      root.classList.toggle('dark', dark);
      store.set('theme', dark ? 'dark' : 'light');
      paint();
    });
  });

  /* Mobile menu */
  var menuBtn = $('button[aria-controls="mobile-nav"]');
  var desktopNav = $('header nav[aria-label="Main"]');
  if (menuBtn && desktopNav) {
    var mobile = document.createElement('nav');
    mobile.id = 'mobile-nav'; mobile.setAttribute('aria-label', 'Main'); mobile.hidden = true;
    mobile.className = 'border-t border-line bg-surface md:hidden';
    var ul = document.createElement('ul'); ul.className = 'mx-auto max-w-6xl px-4 py-2';
    $$('a', desktopNav).forEach(function (a) {
      var li = document.createElement('li'); var link = document.createElement('a');
      link.href = a.getAttribute('href'); link.textContent = a.textContent;
      link.className = 'flex items-center justify-between border-b border-line py-3.5 text-base ' + (a.getAttribute('aria-current') ? 'font-medium text-ink' : 'text-ink-2');
      if (a.getAttribute('aria-current')) link.setAttribute('aria-current', 'page');
      li.appendChild(link); ul.appendChild(li);
    });
    mobile.appendChild(ul); menuBtn.closest('header').appendChild(mobile);
    var setOpen = function (open) {
      mobile.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menuBtn.innerHTML = open ? CLOSE : MENU;
    };
    setOpen(false);
    menuBtn.addEventListener('click', function () { setOpen(mobile.hidden); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  /* Project gallery filters and search */
  var gallery = $('[data-gallery]');
  if (gallery) {
    var buttons = $$('button[data-category]', gallery);
    var input = $('#project-search', gallery);
    var clearBtn = $('[data-clear-search]', gallery);
    var items = $$('li[data-cats]', gallery);
    var list = items.length ? items[0].parentNode : null;
    var countEl = $('[data-result-count]', gallery);
    var empty = $('[data-empty]', gallery);
    var slug = function (c) { return c.toLowerCase().replace(/[^a-z0-9]+/g, '-'); };
    var state = { cat: 'All', q: '' };
    var hash = location.hash.indexOf('#cat-') === 0 ? location.hash.slice(5) : null;
    var qsCat = new URLSearchParams(location.search).get('category');
    buttons.forEach(function (b) {
      var c = b.getAttribute('data-category');
      if (c !== 'All' && (slug(c) === hash || c === qsCat)) state.cat = c;
    });
    var esc = function (s) { return s.replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; }); };
    var render = function () {
      var words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      var shown = 0;
      items.forEach(function (li) {
        var cats = li.getAttribute('data-cats').split('|');
        var text = li.getAttribute('data-search');
        var ok = (state.cat === 'All' || cats.indexOf(state.cat) > -1) && words.every(function (w) { return text.indexOf(w) > -1; });
        li.hidden = !ok; if (ok) shown++;
      });
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-category') === state.cat)); });
      if (list) list.hidden = shown === 0;
      if (empty) empty.hidden = shown > 0;
      if (clearBtn) clearBtn.hidden = !state.q;
      if (countEl) {
        countEl.innerHTML = 'Showing <span class="num">' + shown + '</span> of <span class="num">' + items.length + '</span> projects' +
          (state.cat !== 'All' ? ' in ' + esc(state.cat) : '') + (state.q.trim() ? ' matching “' + esc(state.q.trim()) + '”' : '');
      }
      try { history.replaceState(null, '', state.cat === 'All' ? location.pathname : location.pathname + '#cat-' + slug(state.cat)); } catch {}
    };
    buttons.forEach(function (b) { b.addEventListener('click', function () { state.cat = b.getAttribute('data-category'); render(); }); });
    if (input) input.addEventListener('input', function () { state.q = input.value; render(); });
    if (clearBtn) clearBtn.addEventListener('click', function () { input.value = ''; state.q = ''; render(); input.focus(); });
    var reset = $('[data-reset]', gallery);
    if (reset) reset.addEventListener('click', function () { input.value = ''; state = { cat: 'All', q: '' }; render(); });
    render();
  }

  /* Image viewer */
  var enlargers = $$('button[aria-label^="Enlarge:"]');
  if (enlargers.length) {
    var shots = enlargers.map(function (b) {
      var img = $('img', b); var cap = b.parentNode.querySelector('figcaption');
      return { src: img.getAttribute('src'), alt: img.getAttribute('alt'), caption: cap ? cap.textContent : '' };
    });
    var dlg = document.createElement('dialog');
    dlg.className = 'm-auto max-h-[94vh] w-[min(96vw,1400px)] rounded-xl bg-surface p-0 text-ink backdrop:bg-navy-deep/85';
    dlg.innerHTML = '<div class="flex max-h-[94vh] flex-col">' +
      '<div class="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5"><p class="text-sm text-ink-2"><span data-pos class="num"></span><span data-alt class="ml-3 hidden text-ink sm:inline"></span></p>' +
      '<div class="flex items-center gap-1">' +
      '<button type="button" data-prev class="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-surface-2" aria-label="Previous image"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>' +
      '<button type="button" data-next class="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-surface-2" aria-label="Next image"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>' +
      '<button type="button" data-close class="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-surface-2" aria-label="Close image viewer">' + CLOSE + '</button>' +
      '</div></div><div class="overflow-auto bg-white p-2"><img data-img alt="" class="mx-auto h-auto max-h-[78vh] w-auto max-w-full object-contain"></div>' +
      '<p data-cap class="border-t border-line px-4 py-3 text-sm text-ink-2"></p></div>';
    document.body.appendChild(dlg);
    var idx = 0;
    var show = function (i) {
      idx = (i + shots.length) % shots.length; var s = shots[idx];
      $('[data-img]', dlg).src = s.src; $('[data-img]', dlg).alt = s.alt;
      $('[data-pos]', dlg).textContent = (idx + 1) + ' / ' + shots.length;
      $('[data-alt]', dlg).textContent = s.alt;
      var cap = $('[data-cap]', dlg); cap.textContent = s.caption; cap.hidden = !s.caption || s.caption === s.alt;
      dlg.setAttribute('aria-label', s.alt);
    };
    enlargers.forEach(function (b, i) { b.addEventListener('click', function () { show(i); if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); $('[data-close]', dlg).focus(); }); });
    $('[data-prev]', dlg).addEventListener('click', function () { show(idx - 1); });
    $('[data-next]', dlg).addEventListener('click', function () { show(idx + 1); });
    $('[data-close]', dlg).addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    document.addEventListener('keydown', function (e) {
      if (!dlg.open) return;
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });
  }

  /* Copy code */
  $$('button[aria-label^="Copy "]').forEach(function (b) {
    var code = b.closest('figure').querySelector('pre code');
    var label = b.lastChild;
    b.addEventListener('click', function () {
      var done = function () { label.textContent = 'Copied'; setTimeout(function () { label.textContent = 'Copy'; }, 1800); };
      var fallback = function () {
        var r = document.createRange(); r.selectNodeContents(code);
        var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
        label.textContent = 'Selected';
        setTimeout(function () { label.textContent = 'Copy'; }, 1800);
      };
      try { navigator.clipboard.writeText(code.textContent).then(done, fallback); } catch { fallback(); }
    });
  });

  /* Contact form: composes an email in the visitor's own mail app */
  var form = $('form');
  if (form && $('#cf-message')) {
    var status = form.querySelector('[aria-live]');
    var email = (status && status.getAttribute('data-email')) || '';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#cf-name').value.trim(), company = $('#cf-company').value.trim(), msg = $('#cf-message').value.trim();
      var err = form.querySelector('[data-error]');
      if (!name || !msg) { err.textContent = 'Add your name and a message so the email has something to say.'; err.hidden = false; return; }
      err.hidden = true;
      var subject = 'Portfolio enquiry from ' + name + (company ? ' (' + company + ')' : '');
      var body = msg + '\n\n' + name + (company ? '\n' + company : '');
      var a = document.createElement('a');
      a.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      a.target = '_blank'; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove();
      status.textContent = 'If your email app did not open, send your message to ' + email + '.';
    });
  }

  /* Case-study contents: highlight the section in view */
  var toc = $('nav[aria-label="Case study sections"]');
  if (toc && 'IntersectionObserver' in window) {
    var links = $$('a', toc);
    var ON = ['border-accent-fill', 'text-ink'], OFF = ['border-transparent', 'text-ink-3'];
    var activate = function (id) {
      links.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + id;
        ON.forEach(function (c) { a.classList.toggle(c, on); });
        OFF.forEach(function (c) { a.classList.toggle(c, !on); });
        if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      });
    };
    var obs = new IntersectionObserver(function (entries) {
      var vis = entries.filter(function (e) { return e.isIntersecting; }).sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      if (vis[0]) activate(vis[0].target.id);
    }, { rootMargin: '-90px 0px -65% 0px' });
    links.forEach(function (a) { var el = document.getElementById(a.getAttribute('href').slice(1)); if (el) obs.observe(el); });
  }
})();
