/* Rent a Garba Partner — Modulus Seventeen
   Plain JS, no build step. Edit CONFIG below to change links, counts and the prize. */
(function () {
  'use strict';

  var CONFIG = {
    siteUrl: 'https://modulusseventeen.com',
    instagramUrl: 'https://www.instagram.com/modulusseventeen',
    instagramHandle: '@modulusseventeen',
    videoUrl: '',            // e.g. 'assets/partner-reveal.mp4' (16:9)
    photoFemale: '',
    photoMale: '',
    likesSeed: 1284,
    dislikesSeed: 97,
    takedownAt: 1000,
    redirectSeconds: 15,
    prize: { name: 'boAt Smart EarPods Pro', worth: '₹1,700', image: 'assets/boat-earpods-cut.webp' },
    // Coming back from Instagram faster than this (ms) counts as "didn't follow".
    minFollowAwayMs: 4000
  };

  /* ---------------- icons & art ---------------- */
  var LOGO = '<svg viewBox="0 0 91 67" fill="currentColor" aria-hidden="true"><path d="M76.1419 16.8302C76.3202 16.8246 76.3457 16.7904 76.4517 16.8843C76.4517 16.8928 76.4523 16.9015 76.4517 16.91C76.4298 17.2823 72.7626 21.4333 72.1997 22.0986L55.7556 41.4969L50.9919 47.1099C50.3411 47.875 49.2082 49.3141 48.5164 49.9341C47.7955 50.0422 45.3396 50.0007 44.4654 49.9929C42.061 49.9718 39.5241 50.0419 37.1345 49.9559C36.9718 49.9646 36.9493 49.9745 36.8038 49.9143L36.7573 49.7807C36.8019 49.5755 36.9636 49.3527 37.1006 49.1929C38.8976 47.0989 40.6879 44.9871 42.4701 42.8808L55.7228 27.2532C57.6845 24.9149 59.6692 22.5953 61.6767 20.2951C62.3633 19.496 64.0471 17.4307 64.7657 16.8467C68.4253 16.7233 72.4664 16.9879 76.1419 16.8302Z"/><path d="M19.112 16.7852C19.6506 16.8874 21.5387 16.8514 22.2058 16.8517L29.2588 16.8321C29.1801 17.8192 29.2028 18.9538 29.2024 19.9562L29.2016 24.4348L29.2015 41.6757L29.2087 46.7238C29.2148 47.7164 29.2604 48.9376 29.1977 49.9078C28.6689 50.073 20.0277 50.0182 19.1008 49.9732C18.9824 48.4727 19.0716 45.5355 19.0718 43.9324L19.0726 32.1039L19.0727 21.9475C19.0725 20.6422 18.989 17.9918 19.112 16.7852Z"/><path d="M39.0425 16.7852C39.4884 16.8774 40.6228 16.849 41.1324 16.8494L44.9102 16.8482C49.4516 16.8475 54.1448 16.9083 58.6749 16.8264C58.3189 17.3915 57.4571 18.3419 56.9767 18.894C56.224 19.7591 55.4389 20.7139 54.664 21.5454C54.1935 22.1478 51.9687 24.792 51.4966 25.1186C50.6933 25.1979 49.2088 25.1484 48.3489 25.1474L42.5464 25.1426C41.4619 25.1422 40.0746 25.1113 39.0154 25.1864C38.926 24.3309 38.8804 17.3774 39.0425 16.7852Z"/><path d="M69.3507 43.3081C71.3674 43.12 73.1584 44.5831 73.3557 46.5801C73.5524 48.5771 72.0807 50.3556 70.0652 50.5573C68.039 50.76 66.2327 49.2944 66.0348 47.2877C65.8375 45.2811 67.3234 43.4971 69.3507 43.3081Z"/><path d="M89.6947 65.9471L82.0806 49.3218C82.055 49.2682 82.841 7.90244 82.8634 7.85224L89.6883 0.322667C89.9343 -0.185998 91.0015 -0.0621781 91.0015 0.476605V65.7864C91.0015 66.3185 89.9503 66.4491 89.6947 65.9471Z"/><path d="M1.30683 65.9504L8.92096 49.325C8.94652 49.2714 8.1605 7.90525 8.13814 7.85505L1.31322 0.325413C1.06719 -0.186603 0 -0.062782 0 0.476006V65.7864C0 66.3185 1.05122 66.4491 1.30683 65.9471V65.9504Z"/></svg>';
  var I = {
    back: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
    arrow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chev: '<svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
    check: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    play: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>',
    up: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>',
    down: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/></svg>',
    gift: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>',
    share: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>',
    shield: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
    ig: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
    igBig: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
    x: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    male: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="14" r="5"/><path d="M14 10l6-6M15 4h5v5"/></svg>',
    female: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5"/><path d="M12 14v8M9 19h6"/></svg>',
    bin: '<svg class="px" viewBox="0 0 10 10" aria-hidden="true"><rect x="1" y="1" width="8" height="1" fill="#FFB81C"/><rect x="4" y="0" width="2" height="1" fill="#FFB81C"/><rect x="2" y="3" width="6" height="7" fill="#FF3D8B"/><rect x="3" y="4" width="1" height="5" fill="#C8105A"/><rect x="6" y="4" width="1" height="5" fill="#C8105A"/></svg>'
  };
  var HEART = '<rect x="1" y="0" width="2" height="1"/><rect x="4" y="0" width="2" height="1"/><rect x="0" y="1" width="7" height="2"/><rect x="1" y="3" width="5" height="1"/><rect x="2" y="4" width="3" height="1"/><rect x="3" y="5" width="1" height="1"/>';
  function heart(fill, w, h, cls, style) {
    return '<svg class="px ' + (cls || '') + '" width="' + w + '" height="' + h + '" viewBox="0 0 7 6" fill="' + fill + '" aria-hidden="true"' + (style ? ' style="' + style + '"' : '') + '>' + HEART + '</svg>';
  }

  var BOY = '<svg class="px" viewBox="0 0 22 23" aria-hidden="true">' +
    '<rect x="6" y="21" width="12" height="1" fill="#1E030A" opacity=".55"/>' +
    '<g class="lgA"><rect x="7" y="18" width="2" height="3" fill="#FFF1DC"/><rect x="7" y="20" width="3" height="1" fill="#2B0711"/></g>' +
    '<g class="lgB"><rect x="14" y="18" width="2" height="3" fill="#FFF1DC"/><rect x="14" y="20" width="3" height="1" fill="#2B0711"/></g>' +
    '<g class="stL"><rect x="3" y="5" width="1" height="9" fill="#FFB81C"/><rect x="3" y="6" width="1" height="1" fill="#FF3D8B"/><rect x="3" y="8" width="1" height="1" fill="#FF3D8B"/><rect x="3" y="10" width="1" height="1" fill="#FF3D8B"/></g>' +
    '<rect x="2" y="13" width="3" height="2" fill="#FFF1DC"/><rect x="7" y="9" width="10" height="1" fill="#FFF1DC"/><rect x="6" y="10" width="12" height="1" fill="#FFF1DC"/><rect x="5" y="11" width="14" height="6" fill="#FFF1DC"/>' +
    '<rect x="6" y="17" width="12" height="1" fill="#EBD3B0"/><rect x="5" y="16" width="14" height="1" fill="#FF3D8B"/>' +
    '<rect x="7" y="16" width="1" height="1" fill="#FFB81C"/><rect x="11" y="16" width="1" height="1" fill="#FFB81C"/><rect x="15" y="16" width="1" height="1" fill="#FFB81C"/>' +
    '<rect x="6" y="1" width="4" height="1" fill="#FFF1DC"/><rect x="5" y="2" width="1" height="7" fill="#FFF1DC"/><rect x="6" y="2" width="4" height="5" fill="#FF7A1A"/><rect x="10" y="3" width="1" height="4" fill="#FF7A1A"/><rect x="6" y="7" width="6" height="2" fill="#D9530A"/>' +
    '<rect x="10" y="2" width="1" height="1" fill="#FFF1DC"/><rect x="11" y="3" width="1" height="4" fill="#FFF1DC"/><rect x="12" y="7" width="1" height="2" fill="#FFF1DC"/>' +
    '<rect x="10" y="11" width="3" height="4" fill="#FFB81C"/><rect x="14" y="11" width="3" height="4" fill="#FFB81C"/><rect x="13" y="12" width="1" height="1" fill="#FFB81C"/>' +
    '<rect class="eye" x="11" y="12" width="1" height="2" fill="#2B0711"/><rect class="eye" x="15" y="12" width="1" height="2" fill="#2B0711"/>' +
    '<rect x="8" y="14" width="1" height="1" fill="#FF8FB1"/><rect x="18" y="14" width="1" height="1" fill="#FF8FB1"/>' +
    '<g class="stR"><rect x="20" y="5" width="1" height="9" fill="#FFB81C"/><rect x="20" y="6" width="1" height="1" fill="#FF3D8B"/><rect x="20" y="8" width="1" height="1" fill="#FF3D8B"/><rect x="20" y="10" width="1" height="1" fill="#FF3D8B"/></g>' +
    '<rect x="19" y="13" width="3" height="2" fill="#FFF1DC"/></svg>';

  var GIRL = '<svg class="px" viewBox="0 0 22 23" aria-hidden="true">' +
    '<rect x="5" y="21" width="14" height="1" fill="#1E030A" opacity=".55"/>' +
    '<g class="lgA"><rect x="8" y="19" width="2" height="2" fill="#FFF1DC"/><rect x="8" y="20" width="2" height="1" fill="#FFB81C"/></g>' +
    '<g class="lgB"><rect x="14" y="19" width="2" height="2" fill="#FFF1DC"/><rect x="14" y="20" width="2" height="1" fill="#FFB81C"/></g>' +
    '<g class="stL"><rect x="3" y="5" width="1" height="9" fill="#FFB81C"/><rect x="3" y="6" width="1" height="1" fill="#0F7A68"/><rect x="3" y="8" width="1" height="1" fill="#0F7A68"/><rect x="3" y="10" width="1" height="1" fill="#0F7A68"/></g>' +
    '<rect x="2" y="13" width="3" height="2" fill="#FFF1DC"/><rect x="7" y="9" width="10" height="1" fill="#FFF1DC"/><rect x="6" y="10" width="12" height="1" fill="#FFF1DC"/><rect x="5" y="11" width="14" height="6" fill="#FFF1DC"/>' +
    '<rect x="4" y="16" width="16" height="3" fill="#0F7A68"/><rect x="4" y="18" width="16" height="1" fill="#FFB81C"/>' +
    '<rect x="6" y="17" width="1" height="1" fill="#FF3D8B"/><rect x="9" y="17" width="1" height="1" fill="#FF3D8B"/><rect x="12" y="17" width="1" height="1" fill="#FF3D8B"/><rect x="15" y="17" width="1" height="1" fill="#FF3D8B"/><rect x="18" y="17" width="1" height="1" fill="#FF3D8B"/>' +
    '<rect x="6" y="1" width="4" height="1" fill="#FFF1DC"/><rect x="5" y="2" width="1" height="7" fill="#FFF1DC"/><rect x="6" y="2" width="4" height="5" fill="#FF3D8B"/><rect x="10" y="3" width="1" height="4" fill="#FF3D8B"/><rect x="6" y="7" width="6" height="2" fill="#C8105A"/>' +
    '<rect x="10" y="2" width="1" height="1" fill="#FFF1DC"/><rect x="11" y="3" width="1" height="4" fill="#FFF1DC"/><rect x="12" y="7" width="1" height="2" fill="#FFF1DC"/><rect x="13" y="10" width="1" height="1" fill="#C8105A"/>' +
    '<rect class="eye" x="11" y="12" width="1" height="3" fill="#2B0711"/><rect class="eye" x="15" y="12" width="1" height="3" fill="#2B0711"/>' +
    '<rect x="9" y="15" width="1" height="1" fill="#FF8FB1"/><rect x="17" y="15" width="1" height="1" fill="#FF8FB1"/>' +
    '<g class="stR"><rect x="20" y="5" width="1" height="9" fill="#FFB81C"/><rect x="20" y="6" width="1" height="1" fill="#0F7A68"/><rect x="20" y="8" width="1" height="1" fill="#0F7A68"/><rect x="20" y="10" width="1" height="1" fill="#0F7A68"/></g>' +
    '<rect x="19" y="13" width="3" height="2" fill="#FFF1DC"/></svg>';

  function boyEl(tag) { return '<div class="who"><div class="chr">' + BOY + '</div>' + (tag || '') + '</div>'; }
  function girlEl(tag) { return '<div class="who"><div class="flip"><div class="chr late">' + GIRL + '</div></div>' + (tag || '') + '</div>'; }
  function hearts() {
    return '<div class="heartmid">' + heart('#FF3D8B', 35, 30, 'beat') +
      heart('#FFB81C', 14, 12, 'fh', 'left:0;bottom:30px') + heart('#FF8FB1', 12, 10, 'fh fh2', 'right:0;bottom:36px') + heart('#FFF1DC', 10, 9, 'fh fh3', 'left:16px;bottom:44px') + '</div>';
  }
  // A stage holds the couple. o: {boy, girl, mid, gap, boyTag, girlTag}
  function stage(mode, o) {
    o = o || {};
    var html = '';
    if (o.boy !== false) html += boyEl(o.boyTag);
    if (o.mid) html += o.mid;
    if (o.girl !== false) html += girlEl(o.girlTag);
    return '<div class="stage ' + mode + '"' + (o.id ? ' id="' + o.id + '"' : '') + '><div class="row" style="gap:' + (o.gap == null ? 22 : o.gap) + 'px">' + html + '</div></div>';
  }

  /* profession illustrations — pixel art to match the dancers */
  var ART = {
    shop: '<svg class="px" viewBox="0 0 16 16" aria-hidden="true">' +
      '<rect x="2" y="6" width="12" height="8" fill="#FFF1DC"/>' +
      '<rect x="3" y="8" width="5" height="4" fill="#A9DCCF"/><rect x="5" y="8" width="1" height="4" fill="#FFF1DC"/><rect x="3" y="10" width="5" height="1" fill="#FFF1DC"/>' +
      '<rect x="9" y="8" width="4" height="6" fill="#C8105A"/><rect x="11" y="11" width="1" height="1" fill="#FFB81C"/>' +
      '<rect x="2" y="1" width="12" height="2" fill="#2B0711"/><rect x="5" y="1" width="6" height="1" fill="#FFB81C"/>' +
      '<g class="awning"><rect x="1" y="3" width="2" height="3" fill="#FF3D8B"/><rect x="3" y="3" width="2" height="3" fill="#FFF1DC"/><rect x="5" y="3" width="2" height="3" fill="#FF3D8B"/><rect x="7" y="3" width="2" height="3" fill="#FFF1DC"/><rect x="9" y="3" width="2" height="3" fill="#FF3D8B"/><rect x="11" y="3" width="2" height="3" fill="#FFF1DC"/><rect x="13" y="3" width="2" height="3" fill="#FF3D8B"/>' +
      '<rect x="1" y="6" width="2" height="1" fill="#FF3D8B"/><rect x="5" y="6" width="2" height="1" fill="#FF3D8B"/><rect x="9" y="6" width="2" height="1" fill="#FF3D8B"/><rect x="13" y="6" width="2" height="1" fill="#FF3D8B"/></g>' +
      '<rect x="1" y="14" width="14" height="1" fill="#2B0711"/></svg>',
    laptop: '<svg class="px" viewBox="0 0 16 16" aria-hidden="true">' +
      '<rect x="2" y="2" width="12" height="9" fill="#2B0711"/><rect x="3" y="3" width="10" height="7" fill="#FF3D8B"/>' +
      '<g class="lapheart" fill="#FFF1DC"><rect x="6" y="5" width="1" height="1"/><rect x="9" y="5" width="1" height="1"/><rect x="5" y="5" width="1" height="1"/><rect x="10" y="5" width="1" height="1"/><rect x="5" y="6" width="6" height="1"/><rect x="6" y="7" width="4" height="1"/><rect x="7" y="8" width="2" height="1"/><rect x="7" y="4" width="0" height="0"/></g>' +
      '<rect class="cursor" x="11" y="8" width="1" height="1" fill="#FFB81C"/>' +
      '<rect x="0" y="11" width="16" height="2" fill="#B98C97"/><rect x="6" y="11" width="4" height="1" fill="#7A4A55"/><rect x="1" y="13" width="14" height="1" fill="#2B0711" opacity=".25"/></svg>',
    clock: '<svg class="px" viewBox="0 0 16 16" aria-hidden="true"><g class="clockbody">' +
      '<rect x="1" y="1" width="4" height="2" fill="#FFB81C"/><rect x="11" y="1" width="4" height="2" fill="#FFB81C"/><rect x="2" y="3" width="2" height="1" fill="#2B0711"/><rect x="12" y="3" width="2" height="1" fill="#2B0711"/>' +
      '<rect x="3" y="13" width="2" height="2" fill="#2B0711"/><rect x="11" y="13" width="2" height="2" fill="#2B0711"/>' +
      '<circle cx="8" cy="8.5" r="6.5" fill="#FF7A1A"/><circle cx="8" cy="8.5" r="5" fill="#FFF1DC"/>' +
      '<rect x="7.5" y="4" width="1" height="1" fill="#C8105A"/><rect x="7.5" y="12" width="1" height="1" fill="#C8105A"/><rect x="3.5" y="8" width="1" height="1" fill="#C8105A"/><rect x="11.5" y="8" width="1" height="1" fill="#C8105A"/>' +
      '<rect class="hand-h" x="7.5" y="5.5" width="1" height="3.5" fill="#2B0711"/><rect class="hand-m" x="7.5" y="8" width="4" height="1" fill="#2B0711"/>' +
      '<rect x="7" y="7.5" width="2" height="2" fill="#C8105A"/></g></svg>',
    cap: '<svg class="px" viewBox="0 0 16 16" aria-hidden="true">' +
      '<rect x="3" y="12" width="1" height="3" fill="#FFB81C" transform="rotate(-25 3 12)"/><rect x="12" y="12" width="1" height="3" fill="#FF3D8B" transform="rotate(25 12 12)"/>' +
      '<rect x="4" y="8" width="8" height="4" fill="#2B0711"/><rect x="4" y="8" width="8" height="1" fill="#0F7A68"/><rect x="5" y="11" width="6" height="2" fill="#2B0711"/>' +
      '<polygon points="8,2 15.5,5.5 8,9 0.5,5.5" fill="#2B0711" shape-rendering="geometricPrecision"/><polygon points="8,3.2 13,5.5 8,7.8 3,5.5" fill="#3E0C1C" shape-rendering="geometricPrecision"/>' +
      '<g class="tassel"><rect x="8" y="5" width="5" height="1" fill="#FFB81C"/><rect x="12" y="5" width="1" height="6" fill="#FFB81C"/><rect x="11" y="11" width="3" height="2" fill="#FFB81C"/><rect x="11" y="13" width="1" height="1" fill="#FFD36B"/><rect x="13" y="13" width="1" height="1" fill="#FFD36B"/></g>' +
      '<rect x="7.5" y="5" width="1" height="1" fill="#FFB81C"/></svg>'
  };

  /* congrats perks — same pixel style as the profession icons */
  ART.bill = '<svg class="px" viewBox="0 0 16 16" aria-hidden="true"><g class="print">' +
    '<rect x="3" y="0" width="9" height="15" fill="#2B0711"/><rect x="4" y="1" width="7" height="13" fill="#FFF1DC"/>' +
    '<rect x="3" y="14" width="1" height="1" fill="#FFE08A"/><rect x="5" y="14" width="1" height="1" fill="#FFE08A"/><rect x="7" y="14" width="1" height="1" fill="#FFE08A"/><rect x="9" y="14" width="1" height="1" fill="#FFE08A"/><rect x="11" y="14" width="1" height="1" fill="#FFE08A"/>' +
    '<rect x="5" y="3" width="5" height="1" fill="#C8105A"/><rect x="5" y="5" width="3" height="1" fill="#B98C97"/><rect x="5" y="7" width="4" height="1" fill="#B98C97"/><rect x="5" y="9" width="2" height="1" fill="#B98C97"/>' +
    '<rect x="5" y="11" width="5" height="1" fill="#2B0711"/></g>' +
    '<rect x="10" y="9" width="4" height="1" fill="#2B0711"/><rect x="9" y="10" width="6" height="4" fill="#2B0711"/><rect x="10" y="14" width="4" height="1" fill="#2B0711"/>' +
    '<rect x="10" y="10" width="4" height="4" fill="#FFB81C"/><rect x="11" y="11" width="2" height="2" fill="#FFD36B"/></svg>';
  ART.stock = '<svg class="px" viewBox="0 0 16 16" aria-hidden="true">' +
    '<rect x="0" y="15" width="16" height="1" fill="#2B0711" opacity=".3"/>' +
    '<rect x="0" y="8" width="10" height="7" fill="#2B0711"/><rect x="1" y="9" width="8" height="5" fill="#FF7A1A"/><rect x="1" y="9" width="8" height="1" fill="#FFB81C"/><rect x="4" y="9" width="2" height="5" fill="#FFF1DC"/>' +
    '<rect x="10" y="10" width="6" height="5" fill="#2B0711"/><rect x="11" y="11" width="4" height="3" fill="#0F7A68"/><rect x="12" y="11" width="2" height="3" fill="#FFF1DC"/>' +
    '<g class="hopbox"><rect x="2" y="2" width="8" height="6" fill="#2B0711"/><rect x="3" y="3" width="6" height="4" fill="#FF3D8B"/><rect x="5" y="3" width="2" height="4" fill="#FFF1DC"/></g>' +
    '<rect x="12" y="2" width="3" height="3" fill="#0F7A68"/><rect x="13" y="3" width="1" height="1" fill="#FFF1DC"/></svg>';
  ART.ride = '<svg class="px" viewBox="0 0 16 16" aria-hidden="true">' +
    '<rect class="speed" x="0" y="7" width="2" height="1" fill="#FFF1DC"/><rect class="speed speed2" x="0" y="10" width="3" height="1" fill="#FFF1DC"/>' +
    '<g class="ride"><rect x="2" y="4" width="6" height="6" fill="#2B0711"/><rect x="3" y="5" width="4" height="4" fill="#FFB81C"/><rect x="4" y="6" width="2" height="1" fill="#C8105A"/>' +
    '<rect x="4" y="10" width="9" height="2" fill="#FF3D8B"/><rect x="10" y="4" width="2" height="6" fill="#FF3D8B"/><rect x="9" y="3" width="4" height="1" fill="#2B0711"/>' +
    '<rect x="12" y="9" width="3" height="2" fill="#FF3D8B"/><rect x="15" y="9" width="1" height="1" fill="#FFB81C"/></g>' +
    '<rect x="2" y="12" width="3" height="1" fill="#2B0711"/><rect x="1" y="13" width="5" height="2" fill="#2B0711"/><rect x="2" y="15" width="3" height="1" fill="#2B0711"/><rect x="3" y="13" width="1" height="2" fill="#B98C97"/>' +
    '<rect x="11" y="12" width="3" height="1" fill="#2B0711"/><rect x="10" y="13" width="5" height="2" fill="#2B0711"/><rect x="11" y="15" width="3" height="1" fill="#2B0711"/><rect x="12" y="13" width="1" height="2" fill="#B98C97"/></svg>';

  /* ---------------- state ---------------- */
  var S = {
    screen: 'age', gender: null, prof: null, step: 0, playing: false,
    vote: null, name: '', giftOpened: false, entered: false,
    modal: null, igOpenedAt: 0
  };
  var timers = [];
  var BACK = { under18: 'age', gender: 'age', profession: 'gender', business: 'profession', radar: 'profession', found: 'profession', video: 'found', giveaway: 'video', done: 'giveaway' };

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
  function every(fn, ms) { var t = setInterval(fn, ms); timers.push(t); return t; }
  function clearTimers() { timers.forEach(function (t) { clearTimeout(t); clearInterval(t); }); timers = []; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(n) { return Number(n).toLocaleString('en-IN'); }
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var app = $('#app'), topbar = $('#topbar'), prog = $('#prog'), top = $('#top'), screenEl = $('#screen'), fx = $('#fx'), modalRoot = $('#modal-root'), toastEl = $('#toast');

  /* ---------------- navigation ---------------- */
  function go(s, opts) {
    opts = opts || {};
    clearTimers();
    closeModal(true);
    S.screen = s; S.step = 0; S.playing = false;
    if (!opts.fromHistory) {
      try { history.pushState({ s: s }, '', '#' + s); } catch (e) {}
    }
    render();
    window.scrollTo(0, 0);
  }
  window.addEventListener('popstate', function (e) {
    var s = (e.state && e.state.s) || (location.hash || '').slice(1) || 'age';
    if (!screens[s]) s = 'age';
    if (s === 'done' && !S.entered) s = 'giveaway';
    go(s, { fromHistory: true });
  });
  function goBack() { go(BACK[S.screen] || 'age'); }

  /* ---------------- header ---------------- */
  function renderHeader() {
    var home = S.screen === 'age' || S.screen === 'under18';
    var logo = '<a class="logo" href="' + CONFIG.siteUrl + '" target="_blank" rel="noopener" aria-label="Modulus Seventeen">' + LOGO + '</a>';
    top.innerHTML = home
      ? logo + '<span class="pill-tag">Navratri special</span>'
      : '<button class="back" type="button" aria-label="Go back" data-act="back">' + I.back + '</button>' + logo;
  }

  var STEP = { age: 1, gender: 2, profession: 3 };
  function renderProgress() {
    var n = STEP[S.screen];
    prog.innerHTML = n ? '<div class="progress" aria-label="Step ' + n + ' of 3">' +
      [1, 2, 3].map(function (i) { return '<span class="' + (i <= n ? 'on' : '') + '"></span>'; }).join('') + '</div>' : '';
  }

  /* ---------------- screens ---------------- */
  var screens = {};

  screens.age = function () {
    return '<div class="hero scr"><div class="hero-type anton"><span class="a">Rent a</span><span class="b">Garba</span><span class="c">Partner</span></div>' +
      '<div class="price"><b>at just</b><span>₹69</span></div></div>' +
      stage('dance', { mid: hearts() }) +
      '<section class="card scr d3" style="display:flex;flex-direction:column;gap:10px">' +
        '<h2 style="font-size:24px;line-height:1.2;font-weight:700;letter-spacing:-.02em">Are you <span class="ser" style="color:var(--magenta)">18</span> or above?</h2>' +
        '<p class="muted" style="font-size:14px;line-height:1.5;margin-bottom:4px">Garba partners are strictly for grown-ups.</p>' +
        '<button class="btn btn-dark pbtn shine" data-act="go" data-to="gender"><span>Yes, I\'m 18+</span><span class="ic">' + I.arrow + '</span></button>' +
        '<button class="btn-ghost pbtn" data-act="go" data-to="under18">No, I\'m under 18</button>' +
      '</section>';
  };

  screens.under18 = function () {
    return '<div class="hero scr" style="padding-top:12px;gap:8px">' +
        '<span class="anton" style="display:grid;place-items:center;width:72px;height:72px;border-radius:50%;background:var(--cream);color:var(--magenta);border:1.5px solid var(--ink);box-shadow:4px 4px 0 var(--gold);font-size:26px;animation:wiggle 1.2s ease-in-out infinite">18+</span>' +
        '<h1 class="h1" style="margin-top:8px">Not this <span class="ser" style="color:var(--gold)">year</span>, champ.</h1></div>' +
      stage('wave', { gap: 30, mid: '<div class="heartmid">' + heart('#FF3D8B', 28, 24, 'beat') + '</div>' }) +
      '<section class="card scr d2" style="display:flex;flex-direction:column;gap:12px;text-align:center">' +
        '<p style="font-size:15px;line-height:1.55;color:var(--muted-2)">Garba partners are for 18+ only. But the party doesn\'t have to wait!</p>' +
        '<h2 style="font-size:21px;line-height:1.25;font-weight:800;letter-spacing:-.02em">Join the <span class="ser" style="color:var(--magenta)">Navratri gang</span> on Instagram</h2>' +
        '<div class="chips" style="justify-content:center">' +
          '<span class="chip" style="background:#FFE9C2;animation-delay:.3s">Garba step tutorials</span>' +
          '<span class="chip" style="background:#FFDCE9;animation-delay:.4s">Dandiya memes</span>' +
          '<span class="chip" style="background:#D3EFE8;animation-delay:.5s">Festive reels</span>' +
        '</div>' +
        '<p style="font-size:13.5px;line-height:1.5;color:var(--muted-2)">Practise your moves with us now, and you\'ll be the star of the circle when you turn 18.</p>' +
        '<a class="btn btn-ig pbtn shine" href="' + CONFIG.instagramUrl + '" target="_blank" rel="noopener"><span>Follow us on Instagram</span><span class="ic">' + I.igBig + '</span></a>' +
        countdownBlock(false, 'Opening our Instagram in') +
      '</section>';
  };
  screens.under18.after = function () { startCountdown(CONFIG.instagramUrl); };

  screens.gender = function () {
    return '<div class="scr" style="display:flex;flex-direction:column;gap:6px;padding-top:6px"><h1 class="h1">Who\'s dancing <span class="ser" style="color:var(--gold)">tonight?</span></h1>' +
      '<p class="sub">Pick one so we can find your perfect Garba match.</p></div>' +
      stage('idle', { gap: 66 }) +
      '<section class="scr d2" style="display:flex;flex-direction:column;gap:12px">' +
        '<div class="g-grid">' +
          '<button class="g-card pbtn" style="box-shadow:4px 4px 0 var(--orange)" data-act="gender" data-v="male"><span class="gi" style="background:#FFE2CC;color:#B8460A">' + I.male + '</span><span style="display:flex;flex-direction:column;gap:2px"><b>Male</b><small>He / him</small></span></button>' +
          '<button class="g-card pbtn" style="box-shadow:4px 4px 0 var(--pink)" data-act="gender" data-v="female"><span class="gi" style="background:#FFDCE9;color:var(--magenta)">' + I.female + '</span><span style="display:flex;flex-direction:column;gap:2px"><b>Female</b><small>She / her</small></span></button>' +
        '</div>' +
        '<button class="btn-ghost light pbtn" data-act="gender" data-v="other">Others / prefer not to say</button>' +
      '</section>';
  };

  screens.profession = function () {
    function card(o, i) {
      return '<button class="prof pbtn scr d' + (i + 1) + (o.star ? ' star' : '') + '" data-act="prof" data-v="' + o.v + '">' +
        '<span class="tile ' + o.tile + '">' + o.art + (o.spark ? '<span class="spark" style="left:6px;top:6px"></span><span class="spark" style="right:6px;bottom:8px;animation-delay:.8s"></span>' : '') + '</span>' +
        '<span class="txt"><b>' + o.t + '</b><small>' + o.d + '</small></span>' + I.chev +
        (o.star ? '<span class="badge">Special match</span>' : '') + '</button>';
    }
    var list = [
      { v: 'biz', t: 'Business owner', d: 'Shop, restaurant, boutique or wholesale', art: ART.shop, tile: 't-shop', star: true, spark: true },
      { v: 'self', t: 'Self-employed', d: 'Freelancer, consultant, creator', art: ART.laptop, tile: 't-lap' },
      { v: 'salaried', t: 'Salaried', d: '9 to 5 at work, 9 to 12 at Garba', art: ART.clock, tile: 't-clock' },
      { v: 'student', t: 'Student / other', d: 'College, homemaker, or just here to dance', art: ART.cap, tile: 't-cap' }
    ];
    return '<div class="scr" style="display:flex;flex-direction:column;gap:6px;padding-top:6px;margin-bottom:6px"><h1 class="h1">What do you <span class="ser" style="color:var(--gold)">do?</span></h1>' +
      '<p class="sub">Your partner should match your hustle.</p></div>' +
      '<section style="display:flex;flex-direction:column;gap:14px">' + list.map(card).join('') + '</section>';
  };

  function countdownBlock(dark, lead) {
    var c = 2 * Math.PI * 19;
    return '<div class="redirect' + (dark ? ' dark' : '') + '" id="redirect">' +
      '<div class="ring"><svg viewBox="0 0 46 46"><circle class="trk" cx="23" cy="23" r="19"/><circle class="bar" id="ringbar" cx="23" cy="23" r="19" stroke-dasharray="' + c.toFixed(2) + '" stroke-dashoffset="0"/></svg><b id="ringnum">' + CONFIG.redirectSeconds + '</b></div>' +
      '<p>' + lead + ' <b id="ringtxt">' + CONFIG.redirectSeconds + ' seconds</b>.</p></div>';
  }
  function startCountdown(url) {
    url = typeof url === 'string' ? url : CONFIG.siteUrl;
    var total = CONFIG.redirectSeconds, left = total, c = 2 * Math.PI * 19;
    var bar = $('#ringbar'), num = $('#ringnum'), txt = $('#ringtxt');
    every(function () {
      left -= 1;
      if (bar) bar.style.strokeDashoffset = (c * (1 - left / total)).toFixed(2);
      if (num) num.textContent = Math.max(0, left);
      if (txt) txt.textContent = Math.max(0, left) + (left === 1 ? ' second' : ' seconds');
      if (left <= 0) { clearTimers(); window.location.href = url; }
    }, 1000);
  }

  screens.business = function () {
    return '<div class="biz-badge scr"><span class="dot"></span>Special match for business owners</div>' +
      stage('wave', { gap: 12, boyTag: '<span class="tag">SELL</span>', girlTag: '<span class="tag buy">BUY</span>', mid: '<div style="height:104px;display:flex;align-items:center"><span class="m17chip">' + LOGO + '</span></div>' }) +
      '<section class="card gold scr d2 free-wrap" style="margin-top:14px">' +
        '<div class="free-stamp" aria-hidden="true"><span>Get</span><b>1 MONTH</b><span>Free</span></div>' +
        '<div class="brand-row"><span class="brand-mark">' + LOGO + '</span><span><b>Modulus Seventeen</b><small>India\'s most affordable business ecosystem</small></span></div>' +
        '<h2 class="big-offer">Get <span class="hl">one month FREE</span> with your partner Modulus Seventeen</h2>' +
        '<p style="font-size:14px;line-height:1.55;color:var(--muted-2)">Garba season brings the rush. Let your partner handle billing, stock and delivery while you dance till midnight.</p>' +
        '<a class="btn btn-dark pbtn shine" href="' + CONFIG.siteUrl + '" style="box-shadow:3px 3px 0 var(--pink)"><span>Claim my free month</span><span class="ic">' + I.arrow + '</span></a>' +
        countdownBlock(false, 'Taking you to Modulus Seventeen in') +
        '<div style="display:flex;flex-direction:column;gap:8px;margin-top:2px"><span class="label">Your partner loves</span><div class="chips">' +
          '<span class="chip" style="background:#FFE9C2;animation-delay:.4s">Fast billing in rush hour</span>' +
          '<span class="chip" style="background:#FFDCE9;animation-delay:.5s">Zero commission on BUY</span>' +
          '<span class="chip" style="background:#D3EFE8;animation-delay:.6s">One stock count, online + offline</span>' +
          '<span class="chip" style="background:#FFE2CC;animation-delay:.7s">Delivery managed in SELL</span>' +
        '</div></div>' +
      '</section>';
  };
  screens.business.after = startCountdown;

  screens.radar = function () {
    var pins = [
      { x: 18.9, y: 20.3, c: '#FF7A1A', d: .6 }, { x: 81.4, y: 22.3, c: '#FF3D8B', d: 1.4 },
      { x: 25, y: 83, c: '#0F7A68', d: 2.2 }
    ];
    return '<div class="radar-head scr"><h1 class="h1">Finding your <span class="nowrap"><span class="ser" style="color:var(--gold)">Garba partner</span><span class="dots" aria-hidden="true"><i>.</i><i>.</i><i>.</i></span></span></h1>' +
      '<p class="sub radar-msg" id="radarmsg" aria-live="polite">Looking around your area…</p></div>' +
      '<div class="map scr d1" aria-label="Map searching nearby">' +
        '<svg viewBox="0 0 350 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
          '<rect x="14" y="16" width="90" height="62" rx="8" fill="#F4D3AE"/><rect x="130" y="16" width="70" height="44" rx="8" fill="#F4D3AE"/><rect x="228" y="16" width="108" height="64" rx="8" fill="#F4D3AE"/><rect x="14" y="108" width="64" height="76" rx="8" fill="#F4D3AE"/>' +
          '<circle cx="276" cy="206" r="46" fill="#CDE7C4"/><rect x="130" y="216" width="70" height="70" rx="8" fill="#F4D3AE"/><rect x="14" y="216" width="90" height="70" rx="8" fill="#F4D3AE"/>' +
          '<path d="M-10 260 C 80 236, 120 160, 210 146 S 310 110, 360 54" stroke="#A9DCCF" stroke-width="16" fill="none"/>' +
          '<path d="M0 94 H350 M116 0 V300 M214 0 V300 M0 200 H350" stroke="#FFF8EE" stroke-width="10" fill="none"/><path d="M0 150 H116 M214 120 H350 M160 94 V200" stroke="#FFF8EE" stroke-width="5" fill="none"/>' +
        '</svg>' +
        '<div class="radar"><span class="ringd"></span><span class="ringd in"></span><span class="sweep"></span><span class="ping"></span><span class="ping ping2"></span><span class="ping ping3"></span><span class="me"></span></div>' +
        pins.map(function (p) { return '<span class="pin" style="left:' + p.x + '%;top:' + p.y + '%;border-color:' + p.c + ';animation-delay:' + p.d + 's">' + heart(p.c, 14, 12) + '</span>'; }).join('') +
        '<span class="pin final" style="left:77.7%;top:82%;animation-delay:3s,3.5s">' + heart('#FFF5E6', 18, 15) + '</span>' +
        '<div class="scout stage dance" aria-hidden="true"><div class="chr">' + (S.gender === 'female' ? GIRL : BOY) + '</div></div>' +
      '</div>' +
      '<div class="card steps scr d2" id="steps"></div>';
  };
  function renderSteps() {
    var labels = ['Scanning pandals near you', 'Checking dandiya skills', 'Matching your vibe'];
    var el = $('#steps'); if (!el) return;
    el.innerHTML = labels.map(function (l, i) {
      var st = S.step > i ? 'done' : S.step === i ? 'active' : 'pending';
      return '<div class="step' + (st === 'done' ? ' isdone' : '') + '"><span class="st ' + st + '">' + (st === 'done' ? I.check : '') + '</span><span>' + l + '</span></div>';
    }).join('');
    var msg = ['Looking around your area…', 'Found a few dancers nearby…', 'Shortlisting the best moves…', 'Partner found!'][S.step];
    var m = $('#radarmsg'); if (m && msg) m.textContent = msg;
  }
  screens.radar.after = function () {
    renderSteps();
    [1, 2, 3].forEach(function (n, i) { later(function () { S.step = n; renderSteps(); }, 1300 * (i + 1)); });
    later(function () { go('found'); }, 4600);
  };

  function partner() {
    var pf = S.gender !== 'female';
    var JOBS = {
      self: pf ? 'Freelance designer · Garba since age 5' : 'Freelance photographer · Garba since age 5',
      salaried: pf ? 'Software engineer · weekend Garba pro' : 'Bank manager · weekend Garba pro',
      student: pf ? 'Student · College Garba champion' : 'Student · College Dandiya champion'
    };
    return {
      female: pf,
      photo: pf ? CONFIG.photoFemale : CONFIG.photoMale,
      masked: pf ? 'P***** J***' : 'R***** M*****',
      job: JOBS[S.prof] || JOBS.student,
      traits: pf ? ['47 rounds non-stop', 'Never misses a beat', 'Brings her own dandiya'] : ['47 rounds non-stop', 'Steps on toes only twice', 'Brings his own dandiya']
    };
  }

  screens.found = function () {
    var p = partner();
    return '<span class="match-title anton">It\'s a match!</span>' +
      '<div style="display:flex;justify-content:center;perspective:800px"><div class="frame">' +
        '<span class="dist">0.8 km away</span><span class="ok">' + I.check + '</span>' +
        (p.photo ? '<img src="' + esc(p.photo) + '" alt="Your Garba partner">' : stage('dance', { boy: !p.female, girl: p.female, gap: 0 })) +
      '</div></div>' +
      '<section class="scr d2" style="display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;padding-top:6px">' +
        '<span class="masked">' + p.masked + '</span>' +
        '<span class="jobpill">' + p.job + '</span>' +
        '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px">' + p.traits.map(function (t, i) { return '<span class="trait" style="animation-delay:' + (.5 + i * .12) + 's">' + t + '</span>'; }).join('') + '</div>' +
        '<div class="card" style="width:100%;margin-top:4px;padding:18px;display:flex;flex-direction:column;gap:12px">' +
          '<p style="font-size:16px;line-height:1.45;font-weight:600"><span class="ser" style="color:var(--magenta)">Congratulations!</span> You\'ve rented your Garba partner for <b>₹69</b>.</p>' +
          '<button class="btn btn-mag pbtn shine" style="box-shadow:3px 3px 0 var(--ink)" data-act="go" data-to="video"><span>Show my partner</span><span class="ic">' + I.play + '</span></button>' +
        '</div>' +
      '</section>';
  };
  screens.found.after = function () { confetti(true); };

  /* ---------- video + takedown meter ---------- */
  function counts() {
    var downs = CONFIG.dislikesSeed + (S.vote === 'down' ? 1 : 0) - (S.vote === 'up' ? 1 : 0);
    var ups = CONFIG.likesSeed + (S.vote === 'up' ? 1 : 0);
    return { ups: ups, downs: Math.max(0, downs) };
  }
  function level(d) {
    var r = d / CONFIG.takedownAt;
    if (r < .25) return { c: 'l0', t: 'Safe & silly' };
    if (r < .5) return { c: 'l1', t: 'Getting spicy' };
    if (r < .75) return { c: 'l2', t: 'Danger zone' };
    return { c: 'l3', t: 'Almost gone' };
  }
  var REACT = {
    none: 'Laughed? Hit the thumb. Felt off? Your 👎 pushes it toward the bin.',
    up: 'Saved by you! Your 👍 pulled the meter back by 1. The dancers say thanks.',
    down: 'Heard you. Your 👎 just pushed this 1 step closer to the bin.'
  };

  screens.video = function () {
    var c = counts(), lv = level(c.downs), pct = Math.min(100, c.downs / CONFIG.takedownAt * 100);
    var ticks = [25, 50, 75].map(function (t) { return '<i style="left:' + t + '%"></i>'; }).join('');
    var mode = S.vote === 'down' ? 'sad' : S.vote === 'up' ? 'cheer' : 'idle';
    return '<h1 class="h1 scr" style="align-self:flex-start">Meet your <span class="ser" style="color:var(--gold)">partner</span></h1>' +
      '<div class="vid scr d1">' +
        (CONFIG.videoUrl
          ? '<video src="' + esc(CONFIG.videoUrl) + '" controls playsinline></video>'
          : '<div class="ph gridbg"><span class="lbl">PARTNER REVEAL</span>' +
            '<button class="play pbtn" data-act="play" aria-label="' + (S.playing ? 'Pause video' : 'Play video') + '">' + (S.playing ? I.pause : I.play) + '</button>' +
            '<span style="font-size:12px;color:var(--soft)">[16:9 video goes here]</span>' +
            '<div class="vtrack">' + (S.playing ? '<span class="vbar"></span>' : '') + '</div></div>') +
      '</div>' +
      '<section class="card shield scr d2" style="width:100%">' +
        '<div class="shield-head"><span class="shield-ico">' + I.shield + '</span><span class="t"><b>Community Shield</b><small>If this video hits ' + fmt(CONFIG.takedownAt) + ' dislikes, we take it down.</small></span><span class="lvl ' + lv.c + '" id="lvl">' + lv.t + '</span></div>' +
        '<div class="vote-row">' +
          '<button class="vbtn up pbtn" aria-pressed="' + (S.vote === 'up') + '" data-act="vote" data-v="up" aria-label="Like, ' + fmt(c.ups) + ' likes">' + I.up + '<span id="upn">' + fmt(c.ups) + '</span></button>' +
          '<button class="vbtn down pbtn" aria-pressed="' + (S.vote === 'down') + '" data-act="vote" data-v="down" aria-label="Dislike">' + I.down + '<span>Not cool</span></button>' +
        '</div>' +
        '<div class="meter" id="meter"><div class="meter-track" role="meter" aria-valuemin="0" aria-valuemax="' + CONFIG.takedownAt + '" aria-valuenow="' + c.downs + '" aria-label="Dislikes toward takedown"><span class="meter-fill" id="mfill" style="width:' + pct + '%"></span>' + ticks + '</div><span class="meter-goal" title="Takedown">' + I.bin + '</span></div>' +
        '<div class="meter-labels"><span><b id="downn">' + fmt(c.downs) + '</b> / ' + fmt(CONFIG.takedownAt) + ' dislikes</span><span id="togo">' + fmt(CONFIG.takedownAt - c.downs) + ' to takedown</span></div>' +
        '<div class="react">' + stage(mode, { gap: 2, mid: '<div class="heartmid">' + heart('#FF3D8B', 14, 12, 'beat') + '</div>', id: 'reactstage' }) + '<p id="reactmsg">' + REACT[S.vote || 'none'] + '</p></div>' +
        '<p class="vote-note">We care about you more than views. If a reveal ever hurts anyone, the community can send it to the bin.</p>' +
      '</section>' +
      '<button class="btn btn-mag pbtn shine scr d3" data-act="go" data-to="giveaway"><span>Take part in the Giveaway</span><span class="ic" style="animation:wiggle 1.4s ease-in-out infinite">' + I.gift + '</span></button>' +
      '<button class="btn-ghost light pbtn scr d4" data-act="share">' + I.share + ' Share the video</button>' +
      '<a class="textlink" href="' + CONFIG.siteUrl + '" target="_blank" rel="noopener">Own a shop? Your real partner is here →</a>';
  };

  function vote(v, btn) {
    var before = counts().downs;
    S.vote = S.vote === v ? null : v;
    var c = counts(), delta = c.downs - before;
    // update buttons
    $$('.vbtn').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.v === S.vote)); });
    btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop');
    $('#upn').textContent = fmt(c.ups);
    var rs = $('#reactstage');
    if (rs) rs.className = 'stage ' + (S.vote === 'down' ? 'sad' : S.vote === 'up' ? 'cheer' : 'idle');
    $('#reactmsg').textContent = REACT[S.vote || 'none'];
    if (delta !== 0) flyChip(btn, delta, function () { applyMeter(c); }); else applyMeter(c);
  }
  function applyMeter(c) {
    var pct = Math.min(100, c.downs / CONFIG.takedownAt * 100);
    $('#mfill').style.width = pct + '%';
    $('.meter-track').setAttribute('aria-valuenow', c.downs);
    var dn = $('#downn'); dn.textContent = fmt(c.downs); dn.classList.remove('tick'); void dn.offsetWidth; dn.classList.add('tick');
    $('#togo').textContent = fmt(CONFIG.takedownAt - c.downs) + ' to takedown';
    var lv = level(c.downs), l = $('#lvl'); l.className = 'lvl ' + lv.c; l.textContent = lv.t;
    var m = $('#meter'); m.classList.remove('bump'); void m.offsetWidth; m.classList.add('bump');
  }
  function flyChip(fromEl, delta, done) {
    var chip = document.createElement('span');
    chip.className = 'flychip ' + (delta > 0 ? 'plus' : 'minus');
    chip.textContent = (delta > 0 ? '+' : '') + delta;
    app.appendChild(chip);
    var ar = app.getBoundingClientRect(), fr = fromEl.getBoundingClientRect(), fill = $('#mfill').getBoundingClientRect(), track = $('.meter-track').getBoundingClientRect();
    var cw = chip.offsetWidth, ch = chip.offsetHeight;
    var x0 = fr.left - ar.left + fr.width / 2 - cw / 2, y0 = fr.top - ar.top - ch / 2;
    var x1 = Math.max(track.left, fill.right) - ar.left - cw / 2, y1 = track.top - ar.top + track.height / 2 - ch / 2;
    if (reduced || !chip.animate) { chip.remove(); done(); return; }
    var mx = (x0 + x1) / 2, my = Math.min(y0, y1) - 70;
    var anim = chip.animate([
      { transform: 'translate(' + x0 + 'px,' + y0 + 'px) scale(.4)', opacity: 0 },
      { transform: 'translate(' + x0 + 'px,' + (y0 - 30) + 'px) scale(1.25)', opacity: 1, offset: .2 },
      { transform: 'translate(' + mx + 'px,' + my + 'px) scale(1.1) rotate(' + (delta > 0 ? 12 : -12) + 'deg)', opacity: 1, offset: .55 },
      { transform: 'translate(' + x1 + 'px,' + y1 + 'px) scale(.5)', opacity: .2 }
    ], { duration: 900, easing: 'cubic-bezier(.3,.7,.4,1)' });
    anim.onfinish = function () { chip.remove(); done(); };
  }

  /* ---------- giveaway ---------- */
  var GIFT_SVG = '<svg viewBox="0 0 150 160" aria-hidden="true"><g class="whole">' +
    '<ellipse cx="75" cy="154" rx="56" ry="6" fill="#1E030A" opacity=".45"/>' +
    '<rect x="20" y="66" width="110" height="86" rx="6" fill="#C8105A" stroke="#2B0711" stroke-width="2.5"/>' +
    '<rect x="66" y="66" width="18" height="86" fill="#FFB81C" stroke="#2B0711" stroke-width="2.5"/>' +
    '<rect x="20" y="66" width="110" height="10" fill="#9E0C47" opacity=".5"/>' +
    '<circle cx="40" cy="100" r="4" fill="#FF8FB1"/><circle cx="110" cy="124" r="4" fill="#FF8FB1"/><circle cx="44" cy="134" r="3" fill="#FFF1DC"/><circle cx="106" cy="92" r="3" fill="#FFF1DC"/>' +
    '<g class="lid"><rect x="12" y="44" width="126" height="26" rx="6" fill="#FF3D8B" stroke="#2B0711" stroke-width="2.5"/>' +
    '<rect x="64" y="44" width="22" height="26" fill="#FFB81C" stroke="#2B0711" stroke-width="2.5"/>' +
    '<path d="M75 44 C 52 14, 28 22, 40 40 C 46 48, 64 46, 75 44Z" fill="#FFB81C" stroke="#2B0711" stroke-width="2.5"/>' +
    '<path d="M75 44 C 98 14, 122 22, 110 40 C 104 48, 86 46, 75 44Z" fill="#FFB81C" stroke="#2B0711" stroke-width="2.5"/>' +
    '<circle cx="75" cy="42" r="7" fill="#FFD36B" stroke="#2B0711" stroke-width="2.5"/></g>' +
    '</g></svg>';

  screens.giveaway = function () {
    var head = '<div class="scr" style="display:flex;flex-direction:column;gap:6px;padding-top:6px"><h1 class="h1">' +
      (S.giftOpened ? 'You could <span class="ser" style="color:var(--gold)">win this!</span>' : 'A gift is <span class="ser" style="color:var(--gold)">waiting</span>') + '</h1>' +
      '<p class="sub">' + (S.giftOpened ? 'Enter your name, follow us on Instagram and you\'re in the draw.' : 'Tap the box to see what we\'re giving away this Navratri.') + '</p></div>';
    if (!S.giftOpened) {
      return head + '<div class="gift-stage scr d1" id="giftstage">' +
        '<div class="gift-row">' + boyEl() + '<button class="giftbtn" id="giftbtn" data-act="opengift" aria-label="Open the gift box"><span class="glow"></span>' + GIFT_SVG + '</button>' + girlEl() + '</div>' +
        '<span class="tap-hint">' + I.gift + ' Tap to open</span></div>';
    }
    return head + prizeCard(true) +
      '<section class="card scr d2" style="display:flex;flex-direction:column;gap:14px">' +
        '<div class="field"><label for="gw-name">Your name</label><input id="gw-name" type="text" autocomplete="name" maxlength="40" placeholder="e.g. Riya Shah" value="' + esc(S.name) + '"><span class="hint">This is the name we\'ll announce if you win.</span></div>' +
        '<button class="btn btn-dark pbtn shine" id="participate" data-act="participate"><span>Participate Now</span><span class="ic">' + I.arrow + '</span></button>' +
        '<div class="ig-line"><span class="ig-dot">' + I.ig + '</span><span>Follow <b style="color:var(--ink)">' + CONFIG.instagramHandle + '</b> on Instagram to confirm your entry</span></div>' +
      '</section>';
  };

  function prizeCard(animate) {
    var sp = [[8, 14, 0], [86, 10, .5], [12, 62, 1], [90, 58, .3], [50, 4, .8]].map(function (s) {
      return '<span class="spark" style="left:' + s[0] + '%;top:' + s[1] + '%;animation-delay:' + s[2] + 's"></span>';
    }).join('');
    return '<section class="card prize gold"' + (animate ? '' : ' style="animation:none"') + '>' +
      '<div class="sparkles">' + sp + '</div>' +
      '<span class="kicker">Giveaway prize</span>' +
      '<div class="prize-img"><span class="rays"></span><span class="halo"></span><img src="' + CONFIG.prize.image + '" alt="' + esc(CONFIG.prize.name) + '" width="480" height="594"></div>' +
      '<h2 class="prize-name">' + esc(CONFIG.prize.name) + '</h2>' +
      '<span class="worth"><small>Worth</small><b>' + CONFIG.prize.worth + '</b></span>' +
    '</section>';
  }

  function openGift() {
    if (S.giftOpened) return;
    var btn = $('#giftbtn'); if (!btn || btn.classList.contains('open')) return;
    btn.classList.add('open');
    var stageEl = $('#giftstage');
    stageEl.querySelectorAll('.stage, .who').forEach(function () {});
    $$('.gift-row .chr', stageEl).forEach(function (c) { c.style.animation = 'jump .7s cubic-bezier(.3,.6,.4,1) infinite'; });
    later(function () {
      var b = document.createElement('div'); b.className = 'burst';
      var cols = ['#FFB81C', '#FF3D8B', '#FFF1DC', '#FF7A1A', '#0F7A68', '#C8105A'], h = '<span class="flash"></span>';
      for (var i = 0; i < 34; i++) {
        var a = (Math.PI * 2 * i) / 34 + Math.random() * .3, d = 90 + Math.random() * 120;
        h += '<i style="background:' + cols[i % cols.length] + ';--dx:' + (Math.cos(a) * d).toFixed(0) + 'px;--dy:' + (Math.sin(a) * d - 30).toFixed(0) + 'px;--r:' + (Math.random() * 720 - 360).toFixed(0) + 'deg;' + (i % 3 ? '' : 'border-radius:50%;') + 'animation-delay:' + (Math.random() * .08).toFixed(2) + 's"></i>';
      }
      b.innerHTML = h; btn.appendChild(b);
      confetti(true, 1800);
    }, 450);
    later(function () { S.giftOpened = true; clearTimers(); render(); }, reduced ? 50 : 1250);
  }

  function participate() {
    var inp = $('#gw-name');
    var v = (inp.value || '').trim();
    S.name = v;
    if (v.length < 2) {
      inp.classList.remove('err'); void inp.offsetWidth; inp.classList.add('err');
      inp.focus();
      toast('Add your name so we know who to announce!');
      return;
    }
    openModal('ask');
  }

  /* ---------- Instagram gate modal ---------- */
  var NOPE = [
    { t: 'Uh-oh, the dandiya didn\'t click!', p: 'Looks like you came back without tapping Follow. Our dancers are still holding a spot in the circle for you.', b: 'Psst… we can\'t start the Garba without you.' },
    { t: 'Plot twist: no follow detected', p: 'You zipped back faster than a dandiya spin! The follow button is still waiting for its partner.', b: 'One tap. Two seconds. Zero regrets.' },
    { t: 'Our radar missed your follow', p: 'Maybe the Instagram app was being shy? Give it one more try and your entry is locked in.', b: 'The prize is literally waving at you.' }
  ];
  var nopeIdx = 0;

  function openModal(state) { S.modal = state; renderModal(); }
  function closeModal(silent) {
    S.modal = null;
    modalRoot.innerHTML = '';
    document.body.style.overflow = '';
    if (!silent) { var p = $('#participate'); if (p) p.focus(); }
  }
  function renderModal() {
    if (!S.modal) { closeModal(true); return; }
    document.body.style.overflow = 'hidden';
    var name = esc(S.name.split(' ')[0] || 'friend');
    var igCard = '<div class="ig-card"><span class="ig-av"><span>' + LOGO + '</span></span><span style="flex:1;min-width:0"><b>' + CONFIG.instagramHandle + '</b><small>Modulus Seventeen · Navratri giveaway</small></span></div>';
    var followBtn = '<a class="btn btn-ig pbtn shine" href="' + CONFIG.instagramUrl + '" target="_blank" rel="noopener" data-act="igopen"><span>Follow on Instagram</span><span class="ic">' + I.igBig + '</span></a>';
    var body = '';
    if (S.modal === 'ask') {
      body = stage('wave', { gap: 4, mid: '<div class="heartmid" style="height:60px">' + heart('#FF3D8B', 22, 19, 'beat') + '</div>' }) +
        '<h2 id="mtitle">One tiny step, ' + name + '!</h2>' +
        '<p>Follow us on Instagram to lock in your entry. That\'s also where we announce the winner.</p>' +
        igCard + followBtn +
        '<button class="btn-ghost pbtn" data-act="igalready">I already follow you</button>';
    } else if (S.modal === 'waiting') {
      body = stage('idle', { gap: 30 }) +
        '<h2 id="mtitle">See you on Instagram!</h2>' +
        '<p>Tap <b>Follow</b> on our page, then come back here. We\'ll be right here.</p>' +
        '<div class="waiting"><span class="spin-s"></span>Waiting for you to come back…</div>' +
        followBtn +
        '<button class="btn-ghost pbtn" data-act="igback">I\'m back, I followed</button>';
    } else if (S.modal === 'confirm') {
      body = stage('cheer', { gap: 4, mid: '<div class="heartmid" style="height:60px">' + heart('#FF3D8B', 22, 19, 'beat') + '</div>' }) +
        '<h2 id="mtitle">Welcome back! Did you hit Follow?</h2>' +
        '<p>Just checking before we lock your entry for the <b>' + esc(CONFIG.prize.name) + '</b>.</p>' +
        '<button class="btn btn-mag pbtn shine" data-act="igyes"><span>Yes, I followed!</span><span class="ic">' + I.check.replace('width="13" height="13"', 'width="18" height="18"') + '</span></button>' +
        '<button class="btn-ghost pbtn" data-act="ignope">Not yet</button>';
    } else if (S.modal === 'nope') {
      var n = NOPE[nopeIdx % NOPE.length];
      body = '<div class="bubble">' + n.b + '</div>' + stage('sad', { gap: 26 }) +
        '<h2 id="mtitle">' + n.t + '</h2>' +
        '<p>' + n.p + '</p>' +
        igCard +
        followBtn.replace('Follow on Instagram', 'Okay okay, following now') +
        '<button class="btn-ghost pbtn" data-act="iglater">I\'ll do it later</button>';
    }
    modalRoot.innerHTML = '<div class="overlay" data-act="overlay"><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="grab"></div>' +
      '<button class="x" data-act="iglater" aria-label="Close">' + I.x + '</button><div class="sheet-body">' + body + '</div></div></div>';
    var first = $('.sheet .btn, .sheet a', modalRoot); if (first) first.focus({ preventScroll: true });
  }
  function onIgReturn() {
    if (S.modal !== 'waiting' || !S.igOpenedAt) return;
    var away = Date.now() - S.igOpenedAt;
    S.igOpenedAt = 0;
    if (away < CONFIG.minFollowAwayMs) { nopeIdx++; openModal('nope'); }
    else openModal('confirm');
  }
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') setTimeout(onIgReturn, 250); });
  window.addEventListener('focus', function () { setTimeout(onIgReturn, 250); });

  function enterGiveaway() {
    S.entered = true;
    try {
      var list = JSON.parse(localStorage.getItem('m17-garba-entries') || '[]');
      list.push({ name: S.name, at: new Date().toISOString() });
      localStorage.setItem('m17-garba-entries', JSON.stringify(list));
    } catch (e) {}
    closeModal(true);
    go('done');
  }

  /* ---------- done ---------- */
  screens.done = function () {
    var first = esc(S.name.split(' ')[0] || 'friend');
    var entry = 'M17-' + String(Math.abs(hash(S.name)) % 100000).padStart(5, '0');
    return '<div class="done-hero scr"><span class="match-title anton" style="font-size:clamp(34px,11vw,46px)">Congrats, ' + first + '!</span>' +
      '<p class="sub">You\'re officially in the Modulus Seventeen Navratri giveaway.</p></div>' +
      stage('cheer', { mid: hearts() }) +
      '<section class="card trophy scr d1"><img src="' + CONFIG.prize.image + '" alt=""><span><span class="entry-no">ENTRY ' + entry + '</span><b>' + esc(CONFIG.prize.name) + '</b><small>Worth ' + CONFIG.prize.worth + ' · Winner announced on ' + CONFIG.instagramHandle + '</small></span></section>' +
      '<section class="card gold teaser scr d2"><span class="ribbon">BONUS</span>' +
        '<span class="label" style="color:var(--magenta)">While you wait for the draw</span>' +
        '<h3>Meet the partner that runs <span class="ser" style="color:var(--magenta)">businesses</span> all year</h3>' +
        '<div class="perks">' +
          '<span class="perk" style="background:#FFF5E6;animation-delay:.5s"><span class="tile t-bill">' + ART.bill + '</span>Fast billing</span>' +
          '<span class="perk" style="background:#FFF5E6;animation-delay:.6s"><span class="tile t-box">' + ART.stock + '</span>Live stock</span>' +
          '<span class="perk" style="background:#FFF5E6;animation-delay:.7s"><span class="tile t-ride">' + ART.ride + '</span>Delivery</span>' +
        '</div>' +
        '<p style="font-size:13.5px;line-height:1.5;color:var(--muted-2)">Shop owners get <b style="color:var(--ink)">1 month free</b>. Take a peek, you might find your real partner.</p>' +
        '<a class="btn btn-dark pbtn shine" href="' + CONFIG.siteUrl + '" style="box-shadow:3px 3px 0 var(--pink)"><span>Explore Modulus Seventeen</span><span class="ic">' + I.arrow + '</span></a>' +
        countdownBlock(false, 'Heading to Modulus Seventeen in') +
      '</section>' +
      '<button class="btn btn-mag pbtn scr d3" data-act="share"><span>Share with your Garba gang</span><span class="ic">' + I.share + '</span></button>';
  };
  screens.done.after = function () { confetti(true); startCountdown(); };
  function hash(s) { var h = 7; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h + Date.now() % 997; }

  /* ---------------- fx ---------------- */
  function confetti(on, ms) {
    if (reduced) return;
    if (!on) { fx.innerHTML = ''; return; }
    var cols = ['#FFB81C', '#FF3D8B', '#FFF1DC', '#FF7A1A', '#0F7A68'], h = '';
    for (var i = 0; i < 26; i++) {
      h += '<span class="conf" style="left:' + (Math.random() * 98).toFixed(1) + '%;background:' + cols[i % 5] + ';animation-delay:' + (Math.random() * 2.4).toFixed(2) + 's;animation-duration:' + (2.2 + Math.random() * 1.6).toFixed(2) + 's;' + (i % 4 === 0 ? 'border-radius:50%;width:9px;height:9px;' : '') + '"></span>';
    }
    fx.innerHTML = h;
    if (ms) setTimeout(function () { if (S.screen === 'giveaway') fx.innerHTML = ''; }, ms + 2400);
  }
  var toastT;
  function toast(msg) {
    toastEl.innerHTML = '<div class="toast">' + esc(msg) + '</div>';
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.innerHTML = ''; }, 2600);
  }
  function share() {
    var url = location.href.split('#')[0];
    var data = { title: 'I just rented a Garba partner for ₹69', text: 'Look who I got matched with this Navratri! 💃', url: url };
    try {
      if (navigator.share) navigator.share(data).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast('Link copied!'); });
    } catch (e) {}
  }

  /* ---------------- render ---------------- */
  function render() {
    renderHeader();
    renderProgress();
    onScroll();
    if (S.screen !== 'found' && S.screen !== 'done') fx.innerHTML = '';
    screenEl.innerHTML = screens[S.screen]();
    if (screens[S.screen].after) screens[S.screen].after();
    renderModal();
  }

  /* ---------------- events ---------------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]'); if (!t) return;
    var act = t.dataset.act;
    switch (act) {
      case 'back': goBack(); break;
      case 'go': go(t.dataset.to); break;
      case 'gender': S.gender = t.dataset.v; go('profession'); break;
      case 'prof': S.prof = t.dataset.v; go(S.prof === 'biz' ? 'business' : 'radar'); break;
      case 'play':
        S.playing = !S.playing;
        t.innerHTML = S.playing ? I.pause : I.play;
        t.setAttribute('aria-label', S.playing ? 'Pause video' : 'Play video');
        $('.vtrack').innerHTML = S.playing ? '<span class="vbar"></span>' : '';
        break;
      case 'vote': vote(t.dataset.v, t); break;
      case 'share': share(); break;
      case 'opengift': openGift(); break;
      case 'participate': participate(); break;
      case 'igopen':
        S.igOpenedAt = Date.now();
        if (S.modal !== 'waiting') { later(function () { openModal('waiting'); }, 60); }
        break;
      case 'igalready': openModal('confirm'); break;
      case 'igback': {
        var away = S.igOpenedAt ? Date.now() - S.igOpenedAt : Infinity;
        S.igOpenedAt = 0;
        if (away < CONFIG.minFollowAwayMs) { nopeIdx++; openModal('nope'); } else openModal('confirm');
        break;
      }
      case 'igyes': enterGiveaway(); break;
      case 'ignope': nopeIdx++; openModal('nope'); break;
      case 'iglater':
        closeModal();
        toast('No stress! Your name is saved, come back anytime.');
        break;
      case 'overlay': if (e.target === t) { closeModal(); } break;
    }
  });
  document.addEventListener('input', function (e) { if (e.target.id === 'gw-name') { S.name = e.target.value; e.target.classList.remove('err'); } });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.modal) closeModal();
    if (e.key === 'Enter' && e.target.id === 'gw-name') { e.preventDefault(); participate(); }
  });

  /* ---------- pinned top shadow ---------- */
  function onScroll() { topbar.classList.toggle('scrolled', window.scrollY > 4); }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- keep the focused input above the on-screen keyboard ---------- */
  function keepInputVisible() {
    var el = document.activeElement;
    if (!el || el.tagName !== 'INPUT') return;
    var vv = window.visualViewport, vh = vv ? vv.height : window.innerHeight, off = vv ? vv.offsetTop : 0;
    var r = el.getBoundingClientRect(), topH = topbar.offsetHeight, labelRoom = 34;
    var y = r.top - off;
    if (r.bottom - off > vh - 16 || y < topH + labelRoom) {
      window.scrollBy({ top: y - (topH + labelRoom), behavior: reduced ? 'auto' : 'smooth' });
    }
  }
  var kbT;
  document.addEventListener('focusin', function (e) {
    if (e.target.tagName !== 'INPUT') return;
    clearTimeout(kbT);
    document.body.classList.add('kb');
    [120, 350, 700].forEach(function (ms) { setTimeout(keepInputVisible, ms); });
  });
  document.addEventListener('focusout', function (e) {
    if (e.target.tagName !== 'INPUT') return;
    kbT = setTimeout(function () { document.body.classList.remove('kb'); }, 250);
  });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', function () { setTimeout(keepInputVisible, 50); });

  /* ---------------- boot ---------------- */
  var start = (location.hash || '').slice(1);
  if (!screens[start] || start === 'done') start = 'age';
  S.screen = start;
  try { history.replaceState({ s: start }, '', '#' + start); } catch (e) {}
  render();
})();
