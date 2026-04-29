/* 더보기탭 디자인 시스템 — 공통 네비게이션 주입 */
(function () {
  'use strict';

  const body = document.body;
  const root = body.getAttribute('data-root') || '';
  const currentPage = body.getAttribute('data-page') || '';

  // ----- Nav data ----------------------------------------------------------
  const topNav = [
    { id: 'home', label: 'Overview', href: 'index.html' },
    { id: 'foundation', label: 'Foundation', href: 'foundation/overview.html' },
    { id: 'components', label: 'Components', href: 'components/overview.html' },
    { id: 'patterns', label: 'Patterns', href: 'patterns/overview.html' },
  ];

  // LNB: top-nav 섹션별로 분리. Overview(home) 섹션은 사이드바 없음.
  const sideNavBySection = {
    foundation: [
      {
        items: [
          { id: 'foundation/color', label: 'Color', href: 'foundation/color.html' },
          { id: 'foundation/typography', label: 'Typography', href: 'foundation/typography.html' },
          { id: 'foundation/spacing', label: 'Spacing & Radius', href: 'foundation/spacing.html' },
          { id: 'foundation/icon', label: 'Icon', href: 'foundation/icon.html' },
        ],
      },
    ],
    components: [
      {
        group: 'Navigation',
        items: [
          { id: 'components/header', label: 'Header', href: 'components/header.html' },
          { id: 'components/tab-bar', label: 'TabBar', href: 'components/tab-bar.html' },
        ],
      },
      {
        group: 'Controls',
        items: [
          { id: 'components/chip', label: 'Chip', href: 'components/chip.html' },
        ],
      },
      {
        group: 'Feed Blocks',
        items: [
          { id: 'components/pay-strip', label: 'PayStrip', href: 'components/pay-strip.html' },
          { id: 'components/service-shortcut', label: 'ServiceShortcut', href: 'components/service-shortcut.html' },
          { id: 'components/home-ad', label: 'HomeAd', href: 'components/home-ad.html' },
          { id: 'components/kakaonow', label: 'KakaoNow', href: 'components/kakaonow.html' },
          { id: 'components/weather-card', label: 'WeatherCard', href: 'components/weather-card.html' },
          { id: 'components/game-card', label: 'GameCard', href: 'components/game-card.html' },
        ],
      },
    ],
    patterns: [
      {
        items: [
          { id: 'patterns/app-shell', label: 'App Shell', href: 'patterns/app-shell.html' },
          { id: 'patterns/home-screen', label: 'Home Feed', href: 'patterns/home-screen.html' },
        ],
      },
    ],
  };

  function currentSection() {
    if (currentPage.startsWith('foundation/')) return 'foundation';
    if (currentPage.startsWith('components/')) return 'components';
    if (currentPage.startsWith('patterns/')) return 'patterns';
    return 'home';
  }

  // Components 섹션은 서브그룹 헤딩(Navigation/Controls/Feed Blocks)이 LNB 타이틀
  // 역할을 대신하므로 상단 섹션 타이틀을 생략한다 (LDSM /components/ 패턴).
  const sectionTitles = {
    foundation: 'Foundation',
    patterns: 'Patterns',
  };

  const activeSection = currentSection();
  const sideNav = sideNavBySection[activeSection] || null;
  const sideNavTitle = sectionTitles[activeSection] || '';

  // ----- Compute which top nav is active ----------------------------------
  function matchTop(id) {
    if (currentPage === 'home' && id === 'home') return true;
    if (id === 'foundation' && currentPage.startsWith('foundation/')) return true;
    if (id === 'components' && currentPage.startsWith('components/')) return true;
    if (id === 'patterns' && currentPage.startsWith('patterns/')) return true;
    return false;
  }

  // ----- Render Header -----------------------------------------------------
  const header = document.createElement('header');
  header.className = 'ds-header';
  header.innerHTML = `
    <a href="${root}index.html" class="ds-header-brand">
      <span class="ds-brand-mark" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="14" r="2.2" fill="#191919"/>
          <circle cx="14" cy="14" r="2.2" fill="#191919"/>
          <circle cx="22" cy="14" r="2.2" fill="#191919"/>
        </svg>
      </span>
      <span class="ds-brand-wordmark ds-brand-wordmark--long">Moretab Design System</span>
      <span class="ds-brand-wordmark ds-brand-wordmark--short" aria-hidden="true">MDS</span>
    </a>
    <nav class="ds-header-nav">
      ${topNav
        .map(
          (n) =>
            `<a href="${root}${n.href}" class="${matchTop(n.id) ? 'is-active' : ''}"><span class="ds-header-nav-label">${n.label}</span></a>`
        )
        .join('')}
    </nav>
    <button type="button" class="ds-header-toggle" aria-label="메뉴 열기" aria-expanded="false" aria-controls="ds-menu-overlay">
      <span></span><span></span><span></span>
    </button>
  `;

  // ----- Render Mobile Menu Overlay (full-screen LNB) ----------------------
  // Build flat item list: each top nav as "section"; active section's sub items
  // follow as flat "sub" entries (groups flattened per Figma 6835:*).
  const flatItems = [];
  topNav.forEach((n) => {
    const isActive = matchTop(n.id);
    flatItems.push({ type: 'section', href: root + n.href, label: n.label, active: isActive });
    if (isActive) {
      const subs = sideNavBySection[n.id];
      if (subs) {
        subs.forEach((g) => {
          g.items.forEach((it) => {
            flatItems.push({
              type: 'sub',
              href: root + it.href,
              label: it.label,
              active: it.id === currentPage,
            });
          });
        });
      }
    }
  });

  const overlay = document.createElement('div');
  overlay.id = 'ds-menu-overlay';
  overlay.className = 'ds-menu-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('aria-label', '전체 메뉴');
  overlay.innerHTML = `
    <nav class="ds-menu-nav">
      ${flatItems
        .map((it) => {
          const cls = ['menu-item', `is-${it.type}`];
          if (it.active) cls.push('is-active');
          return `<a href="${it.href}" class="${cls.join(' ')}">${it.label}</a>`;
        })
        .join('')}
    </nav>
  `;

  // ----- Render Sidebar ----------------------------------------------------
  let sidebar = null;
  if (sideNav) {
    sidebar = document.createElement('aside');
    sidebar.className = 'ds-sidebar';
    const titleHtml = sideNavTitle
      ? `<h2 class="ds-lnb-section-title">${sideNavTitle}</h2>`
      : '';
    const groupsHtml = sideNav
      .map(
        (g) => `
        <div class="ds-lnb-group${g.group ? '' : ' is-untitled'}">
          ${g.group ? `<h3>${g.group}</h3>` : ''}
          <ul>
            ${g.items
              .map(
                (it) =>
                  `<li><a href="${root}${it.href}" class="${
                    it.id === currentPage ? 'is-active' : ''
                  }">${it.label}</a></li>`
              )
              .join('')}
          </ul>
        </div>
      `
      )
      .join('');
    sidebar.innerHTML = titleHtml + groupsHtml;
  } else {
    // 사이드바 없는 페이지(Overview)는 main이 전폭으로 퍼지도록 body에 플래그
    body.classList.add('is-no-sidebar');
  }

  // ----- Mount -------------------------------------------------------------
  if (sidebar) body.insertBefore(sidebar, body.firstChild);
  body.insertBefore(overlay, body.firstChild);
  body.insertBefore(header, body.firstChild);

  // ----- Mobile menu toggle ------------------------------------------------
  const toggleBtn = header.querySelector('.ds-header-toggle');
  // Sequenced motion: on OPEN wait for ds-main/header fade-out (320ms) then
  // reveal LNB; on CLOSE hide LNB first, then fade ds-main/header back in.
  const SEQ_DELAY = 320;
  let pendingTimer = null;
  function setMenuOpen(open) {
    if (pendingTimer) {
      clearTimeout(pendingTimer);
      pendingTimer = null;
    }
    toggleBtn.classList.toggle('is-open', open);
    toggleBtn.setAttribute('aria-expanded', String(open));
    toggleBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');

    if (open) {
      body.classList.add('is-menu-open');
      pendingTimer = setTimeout(() => {
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        pendingTimer = null;
      }, SEQ_DELAY);
    } else {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      pendingTimer = setTimeout(() => {
        body.classList.remove('is-menu-open');
        pendingTimer = null;
      }, SEQ_DELAY);
    }
  }
  toggleBtn.addEventListener('click', () => {
    setMenuOpen(!toggleBtn.classList.contains('is-open'));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.classList.contains('is-open')) {
      setMenuOpen(false);
    }
  });

  // Menu link click: close LNB, wait for it to fully disappear, then navigate
  // (next page's .ds-main fades in via CSS animation on load).
  const NAV_DELAY_MS = 400; // matches .ds-menu-overlay transition duration
  overlay.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      // Skip hash links / external protocols
      if (!href || href.startsWith('#') || /^[a-z]+:/i.test(href) && !/^https?:\/\//i.test(href)) {
        setMenuOpen(false);
        return;
      }
      // Only delay-navigate if it's a same-origin link
      const isSameOrigin = !href.startsWith('http') || href.startsWith(location.origin);
      if (!isSameOrigin) {
        setMenuOpen(false);
        return;
      }
      e.preventDefault();
      body.classList.add('is-navigating');
      setMenuOpen(false);
      setTimeout(() => {
        window.location.href = href;
      }, NAV_DELAY_MS);
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 640 && toggleBtn.classList.contains('is-open')) {
      setMenuOpen(false);
    }
  });

  // ----- Footer ------------------------------------------------------------
  const footer = document.createElement('footer');
  footer.className = 'ds-footer';
  footer.innerHTML = `
    <div class="ds-footer-inner">
      <div class="ds-footer-brand">
        <div class="ds-footer-text">
          <span class="ds-footer-title">Moretab Design System</span>
          <span class="ds-footer-sub">카카오톡 더보기탭 지면의 디자인 토큰 · 컴포넌트 · 패턴</span>
        </div>
      </div>
      <div class="ds-footer-meta">
        <span class="ds-footer-meta-item"><span class="ds-footer-meta-label">Released</span><span class="ds-footer-meta-value">2026.04.21</span></span>
        <span class="ds-footer-meta-item"><span class="ds-footer-meta-label">Platform</span><span class="ds-footer-meta-value">iOS / Android</span></span>
        <span class="ds-footer-meta-item ds-footer-copy">© Kakao Corp.</span>
      </div>
    </div>
  `;
  body.appendChild(footer);

  // ----- iOS PWA standalone: keep internal navigation in-app --------------
  // Known iOS Safari behavior: tapping <a href> from a home-screen web app
  // can open the link in Safari (browser chrome) instead of staying in
  // standalone. Intercept same-origin non-blank links and use location.href
  // which is guaranteed to stay in standalone.
  const isStandalone =
    (typeof window.navigator.standalone === 'boolean' && window.navigator.standalone) ||
    window.matchMedia('(display-mode: standalone)').matches;
  if (isStandalone) {
    document.addEventListener(
      'click',
      (e) => {
        const a = e.target.closest && e.target.closest('a');
        if (!a) return;
        // LNB overlay links have their own handler (smooth transition).
        if (a.closest('.ds-menu-overlay')) return;
        const href = a.getAttribute('href');
        if (!href || href.startsWith('#')) return;
        if (a.target === '_blank') return;
        const url = new URL(a.href, location.href);
        if (url.origin !== location.origin) return; // external
        e.preventDefault();
        window.location.href = url.href;
      },
      true
    );
  }

  // ----- Auto-wrap wide tables for mobile scroll ---------------------------
  document.querySelectorAll('table.ds-table').forEach((table) => {
    if (
      !table.parentElement ||
      table.parentElement.classList.contains('ds-table-scroll')
    )
      return;
    const wrap = document.createElement('div');
    wrap.className = 'ds-table-scroll';
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  // ----- Example tabs (for component pages) --------------------------------
  document.querySelectorAll('.ds-example').forEach((ex) => {
    const tabs = ex.querySelectorAll('.ds-example-tab');
    const panes = ex.querySelectorAll('.ds-example-code');
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('is-active'));
        panes.forEach((p) => p.classList.remove('is-active'));
        tab.classList.add('is-active');
        if (panes[i]) panes[i].classList.add('is-active');
      });
    });
  });

  // ----- Syntax highlighting (highlight.js, atom-one-light) ----------------
  (function loadHljs() {
    const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/';
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = CDN + 'styles/atom-one-light.min.css';
    document.head.appendChild(themeLink);

    const script = document.createElement('script');
    script.src = CDN + 'highlight.min.js';
    script.onload = function () {
      if (window.hljs) {
        document.querySelectorAll('pre code').forEach(function (el) {
          window.hljs.highlightElement(el);
        });
      }
    };
    document.head.appendChild(script);
  })();
})();
