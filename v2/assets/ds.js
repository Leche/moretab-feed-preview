/* 더보기탭 디자인 시스템 — 공통 네비게이션 주입 */
(function () {
  'use strict';

  const body = document.body;
  const root = body.getAttribute('data-root') || '';
  const currentPage = body.getAttribute('data-page') || '';

  // ----- Nav data ----------------------------------------------------------
  const topNav = [
    { id: 'home', label: '개요', href: 'index.html' },
    { id: 'foundation', label: 'Foundation', href: 'foundation/color.html' },
    { id: 'components', label: 'Components', href: 'components/overview.html' },
    { id: 'patterns', label: 'Patterns', href: 'patterns/app-shell.html' },
  ];

  const sideNav = [
    {
      group: '시작하기',
      items: [
        { id: 'home', label: '소개 (Overview)', href: 'index.html' },
      ],
    },
    {
      group: 'Foundation',
      items: [
        { id: 'foundation/color', label: 'Color', href: 'foundation/color.html' },
        { id: 'foundation/typography', label: 'Typography', href: 'foundation/typography.html' },
        { id: 'foundation/spacing', label: 'Spacing & Radius', href: 'foundation/spacing.html' },
        { id: 'foundation/icon', label: 'Icon', href: 'foundation/icon.html' },
      ],
    },
    {
      group: 'Components',
      items: [
        { id: 'components/overview', label: '전체 보기', href: 'components/overview.html' },
        { id: 'components/header', label: 'Header (상단바)', href: 'components/header.html' },
        { id: 'components/chip', label: 'Chip', href: 'components/chip.html' },
        { id: 'components/pay-strip', label: 'PayStrip', href: 'components/pay-strip.html' },
        { id: 'components/service-shortcut', label: 'ServiceShortcut', href: 'components/service-shortcut.html' },
        { id: 'components/home-ad', label: 'HomeAd', href: 'components/home-ad.html' },
        { id: 'components/game-card', label: 'GameCard', href: 'components/game-card.html' },
        { id: 'components/kakaonow', label: 'KakaoNow', href: 'components/kakaonow.html' },
        { id: 'components/weather-card', label: 'WeatherCard', href: 'components/weather-card.html' },
        { id: 'components/tab-bar', label: 'TabBar (하단)', href: 'components/tab-bar.html' },
      ],
    },
    {
      group: 'Patterns',
      items: [
        { id: 'patterns/app-shell', label: '앱 셸 구조', href: 'patterns/app-shell.html' },
        { id: 'patterns/home-screen', label: '홈 피드 구성', href: 'patterns/home-screen.html' },
      ],
    },
  ];

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
      <span class="ds-brand-mark">더</span>
      <span>더보기탭 디자인 시스템</span>
    </a>
    <nav class="ds-header-nav">
      ${topNav
        .map(
          (n) =>
            `<a href="${root}${n.href}" class="${matchTop(n.id) ? 'is-active' : ''}">${n.label}</a>`
        )
        .join('')}
    </nav>
  `;

  // ----- Render Sidebar ----------------------------------------------------
  const sidebar = document.createElement('aside');
  sidebar.className = 'ds-sidebar';
  sidebar.innerHTML = sideNav
    .map(
      (g) => `
      <div class="ds-lnb-group">
        <h3>${g.group}</h3>
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

  // ----- Footer ------------------------------------------------------------
  const footer = document.createElement('footer');
  footer.className = 'ds-footer';
  footer.innerHTML = `
    © ${new Date().getFullYear()} 더보기탭 디자인 시스템 · 카카오톡 더보기탭 담당 프로덕트 디자이너
  `;

  // ----- Mount -------------------------------------------------------------
  body.insertBefore(sidebar, body.firstChild);
  body.insertBefore(header, body.firstChild);
  body.appendChild(footer);

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
