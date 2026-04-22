/* 더보기탭 디자인 시스템 — 공통 네비게이션 주입 */
(function () {
  'use strict';

  const body = document.body;
  const root = body.getAttribute('data-root') || '';
  const currentPage = body.getAttribute('data-page') || '';

  // ----- Nav data ----------------------------------------------------------
  const topNav = [
    { id: 'home', label: 'Overview', href: 'index.html' },
    { id: 'foundation', label: 'Foundation', href: 'foundation/color.html' },
    { id: 'components', label: 'Components', href: 'components/overview.html' },
    { id: 'patterns', label: 'Patterns', href: 'patterns/app-shell.html' },
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
        items: [
          { id: 'components/overview', label: '전체 보기', href: 'components/overview.html' },
        ],
      },
      {
        group: 'Navigation',
        items: [
          { id: 'components/header', label: 'Header (상단바)', href: 'components/header.html' },
          { id: 'components/tab-bar', label: 'TabBar (하단)', href: 'components/tab-bar.html' },
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
          { id: 'patterns/app-shell', label: '앱 셸 구조', href: 'patterns/app-shell.html' },
          { id: 'patterns/home-screen', label: '홈 피드 구성', href: 'patterns/home-screen.html' },
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

  const sectionTitles = {
    foundation: 'Foundation',
    components: 'Components',
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
      <span class="ds-brand-wordmark">Moretab Design System</span>
    </a>
    <nav class="ds-header-nav">
      ${topNav
        .map(
          (n) =>
            `<a href="${root}${n.href}" class="${matchTop(n.id) ? 'is-active' : ''}"><span class="ds-header-nav-label">${n.label}</span></a>`
        )
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
  body.insertBefore(header, body.firstChild);

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
})();
