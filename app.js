/* Rent a Garba Partner — Modulus Seventeen
   Plain JS, no build step. Edit CONFIG below to change links, counts and the prize. */
(function () {
  'use strict';

  var CONFIG = {
    siteUrl: 'https://modulusseventeen.com',
    instagramUrl: 'https://www.instagram.com/modulusseventeen',
    instagramHandle: '@modulusseventeen',
    // The partner reveal video for each profession (YouTube ids, 16:9). A profession without one shows the text version.
    videoByProfession: { student: 'DZwm0BSJpnc', salaried: '0ltdlDR8LoI', self: 'orAapXh9Cio' },
    photoFemale: '',
    photoMale: '',
    // Where the campaign copy and numbers live: change them here, not in the screens below.
    event: 'Navratri',
    under18Note: 'Garba partners are for 18+ only. Go dance with your cousins tonight. They need you more.',
    closesOn: '',            // e.g. '25 October'. While empty, the "Closes ..." sentence is left out of the script
    takedownNote: 'This reveal hit {n} dislikes, so the community sent it to the bin. It was fun while it lasted.',   // replaces the video at takedownAt dislikes
    // The partner reveal as text, shown in place of the video until it is ready (one per profession).
    // {prize} and {closes} are filled in from above; secs is how long each part would run in the video.
    script: {
      self: [
        { tag: 'The roast', secs: 8, text: "Self-employed. That's just unemployed with a visiting card. Your whole company is you, your Wi-Fi and an invoice nobody's paid since March. And you scanned a QR code on a wall to rent a Garba partner. Founder in your bio, nobody to dance with." },
        { tag: 'The reveal', secs: 12, text: "Relax. Nobody's coming. The only partner we rent out is the business kind. Modulus Seventeen. Sell keeps your billing, stock and accounts straight, so you can finally see who hasn't paid since March. Buy puts your shop online. Zero commission." },
        { tag: 'The giveaway', secs: 10, text: "Share this video, enter the giveaway, win {prize}.{closes} Tag the friend who needs a business partner more than a dance one." }
      ],
      salaried: [
        { tag: 'The roast', secs: 8, text: "Salaried. Paid on the 1st, broke by the 12th. Your boss calls you a rockstar because rockstars never ask for a raise. And you scanned a QR code to rent a Garba partner? Sir, you can't even get a leave approved. You want a partner approved?" },
        { tag: 'The reveal', secs: 12, text: "Nobody's coming. The only partner we rent out is the business kind. Modulus Seventeen. Sell runs a shop's billing, stock, accounts and staff. Buy takes it online. Zero commission. Show it to the shop owner you know." },
        { tag: 'The giveaway', secs: 10, text: "Share this video, enter the giveaway, win {prize}.{closes} Tag a colleague still on 'one quick call' at 9 p.m." }
      ],
      student: [
        { tag: 'The roast', secs: 8, text: "Student. Twelve years of school, and your best plan for Navratri was a QR code. You scanned this at 2 a.m., 9% battery, a syllabus you've never opened. Or 'other', for people who tapped first and thought later. Either way, no one's coming." },
        { tag: 'The reveal', secs: 12, text: "The only partner we rent out is the business kind. Modulus Seventeen. Sell does a shop's billing, stock and accounts. Buy puts it online. Zero commission. Your parents' friend with the shop needs this more than you need a date." },
        { tag: 'The giveaway', secs: 10, text: "Share this video, enter the giveaway, win {prize}.{closes} Tag the friend who also scanned. They know who they are." }
      ]
    },
    // What the two mascots say (and how they move) while each part of the script plays: they mock the visitor.
    scriptMascots: [
      { mood: 'cheer', sell: 'Hehe. Ouch.', buy: 'Bahaha, you scanned it!' },
      { mood: 'wave', sell: 'Plot twist!', buy: 'Business partner only.' },
      { mood: 'dance', sell: 'Share it!', buy: 'Tag them. Now.' }
    ],
    scriptReadCps: 15,       // a part stays up at least this long per character, so the text can be read
    // The partner a visitor is matched with: one is picked at random from the pool for their gender and profession.
    // The name is shown masked (P**** J****). photo is optional (falls back to photoFemale / photoMale, then the pixel dancers).
    partners: {
      female: [
        { name: 'Priya Joshi', tag: 'Garba since age 5', jobs: { self: 'Freelance designer', salaried: 'Software engineer', student: 'Design student' }, traits: ['47 rounds non-stop', 'Never misses a beat', 'Brings her own dandiya'] },
        { name: 'Aarohi Mehta', tag: 'weekend Garba pro', jobs: { self: 'Content creator', salaried: 'Chartered accountant', student: 'Law student' }, traits: ['Twirls faster than your phone charges', 'Remembers every step', 'Laughs at your jokes (some)'] },
        { name: 'Kavya Patel', tag: 'College Garba champion', jobs: { self: 'Freelance photographer', salaried: 'Bank manager', student: 'Medical student' }, traits: ['Never loses her dandiya', 'Knows every Garba song', 'Hates dancing alone'] },
        { name: 'Nisha Desai', tag: 'Navratri regular', jobs: { self: 'Makeup artist', salaried: 'HR manager', student: 'Commerce student' }, traits: ['Dances till the last song', 'Steps on toes only twice', 'Brings snacks for everyone'] },
        { name: 'Riya Shah', tag: 'Garba since age 7', jobs: { self: 'Illustrator', salaried: 'Product manager', student: 'Architecture student' }, traits: ['Perfect timing', 'Never tired by midnight', 'Brings her own dandiya'] },
        { name: 'Meera Iyer', tag: 'weekend Dandiya pro', jobs: { self: 'Freelance writer', salaried: 'School teacher', student: 'Music student' }, traits: ['Hums every tune', 'Spins without getting dizzy', 'Always on the beat'] }
      ],
      male: [
        { name: 'Rohan Mehta', tag: 'Garba since age 5', jobs: { self: 'Freelance photographer', salaried: 'Bank manager', student: 'Engineering student' }, traits: ['47 rounds non-stop', 'Steps on toes only twice', 'Brings his own dandiya'] },
        { name: 'Aarav Shah', tag: 'weekend Garba pro', jobs: { self: 'Video editor', salaried: 'Software engineer', student: 'MBA student' }, traits: ['Twirls faster than your phone charges', 'Never misses a beat', 'Carries spare dandiya'] },
        { name: 'Kunal Patel', tag: 'College Dandiya champion', jobs: { self: 'Freelance consultant', salaried: 'Sales manager', student: 'Law student' }, traits: ['Knows every Garba song', 'Never loses count', 'Hates dancing alone'] },
        { name: 'Vivek Desai', tag: 'Navratri regular', jobs: { self: 'Fitness coach', salaried: 'Chartered accountant', student: 'Commerce student' }, traits: ['Dances till the last song', 'Brings snacks for everyone', 'Perfect timing'] },
        { name: 'Dev Joshi', tag: 'Garba since age 6', jobs: { self: 'Graphic designer', salaried: 'Doctor', student: 'Design student' }, traits: ['Steps on toes only twice', 'Never tired by midnight', 'Brings his own dandiya'] },
        { name: 'Arjun Nair', tag: 'weekend Dandiya pro', jobs: { self: 'Musician', salaried: 'School teacher', student: 'Music student' }, traits: ['Hums every tune', 'Spins without getting dizzy', 'Always on the beat'] }
      ]
    },
    matchPct: [91, 99],      // the "vibe match" on the match card is a random percentage in this range
    sharesSeed: 4852,        // people who shared before the counter existed; real shares are added on top
    shareRefreshMs: 60000,   // how often the live share count is re-read from the backend
    takedownAt: 1000,
    redirectSeconds: 15,
    prize: { name: 'Noise Airwave Max 4 Headphones', worth: '₹1,700', image: 'assets/noise-airwave-max-4-cut.webp' },
    campaign: 'Garba',
    // Local preview talks to a local backend; the live site talks to production.
    // Local preview talks to a local backend; modulusseventeen.com talks to the API directly. Any other host
    // (garba-promotion.vercel.app) goes through the /api proxy in vercel.json, because the API's CORS only allows modulusseventeen.com.
    apiBase: /^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? 'http://localhost:5500/api/'
      : /(^|\.)modulusseventeen\.com$/.test(location.hostname) ? 'https://api.modulusseventeen.com/api/' : '/api/',
    // Also save "Name · @handle" as the entry name, so the handle is visible in the entries list even if the
    // backend does not store the separate instagramHandle field yet. Set to false once it does.
    handleInName: true
  };

  /* ---------------- backend ---------------- */
  var VOTE_NAME = { up: 'Like', down: 'Dislike' };
  function api(method, path, body) {
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = ctl && setTimeout(function () { ctl.abort(); }, 8000);   // a stalled request must not freeze the page
    return fetch(CONFIG.apiBase + 'v1/campaign/' + CONFIG.campaign + path, {
      method: method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: ctl ? ctl.signal : undefined
    }).then(function (r) {
      clearTimeout(timer);
      return r;
    }, function (e) {
      clearTimeout(timer);
      throw e;
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok) { var err = new Error(j.message || 'Request failed'); err.status = r.status; throw err; }
        return j.data || {};
      });
    });
  }
  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value);
    } catch (e) {}
    return null;
  }
  // A random id kept in this browser, so the backend can count one vote per person (16-64 letters, digits, - or _).
  var visitor = '';
  function visitorId() {
    if (visitor) return visitor;
    var saved = store('m17-garba-visitor');
    if (saved && /^[A-Za-z0-9_-]{16,64}$/.test(saved)) return (visitor = saved);
    var id = '';
    if (window.crypto && crypto.randomUUID) id = crypto.randomUUID();
    else for (var i = 0; i < 32; i++) id += Math.floor(Math.random() * 36).toString(36);
    store('m17-garba-visitor', id);
    return (visitor = id);
  }
  // Source comes from the QR link (?utm_source=poster1 or instaqr). Pages opened without one are not counted as scans.
  // The backend only keeps the printed QR names; any other value counts in the total only.
  function scanSource() {
    var m = /[?&]utm_source=([^&#]*)/.exec(location.search);
    if (!m) return '';
    var v;
    try { v = decodeURIComponent(m[1]); } catch (e) { v = m[1]; }
    return v.toLowerCase().replace(/[^a-z0-9_-]/g, '_').slice(0, 40);
  }

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

  /* ---------- Modulus Seventeen theme: indigo (SELL) and brick red (BUY) pixel mascots ---------- */
  var M17_SCREENS = { business: 1, video: 1, giveaway: 1, enter: 1, done: 1 };   // everything from the reveal on wears the brand
  function isM17(s) { return !!M17_SCREENS[s || S.screen]; }
  function tint(svg, map) { return svg.replace(/#[0-9A-Fa-f]{6}/g, function (c) { return map[c.toUpperCase()] || c; }); }
  var M17_BOY = { '#FF7A1A': '#261F8E', '#D9530A': '#19136B', '#FF3D8B': '#A52226', '#FFB81C': '#7C86F0', '#FFF1DC': '#F5EADB', '#EBD3B0': '#E2CFB0', '#FF8FB1': '#F2A7A9', '#2B0711': '#14103F' };
  var M17_GIRL = { '#FF3D8B': '#A52226', '#C8105A': '#7A171A', '#0F7A68': '#261F8E', '#FFB81C': '#7C86F0', '#FFF1DC': '#F5EADB', '#FF8FB1': '#F2A7A9', '#2B0711': '#14103F' };
  var M17_ART = { '#2B0711': '#14103F', '#FFB81C': '#7C86F0', '#FFD36B': '#B7BCF7', '#FFE08A': '#C9CDF9', '#C8105A': '#A52226', '#FF3D8B': '#3F4EE3', '#FF7A1A': '#A52226', '#0F7A68': '#00A80E', '#FFF1DC': '#FFFFFF', '#B98C97': '#9AA0D6' };
  var BOY17 = tint(BOY, M17_BOY), GIRL17 = tint(GIRL, M17_GIRL);

  function boyEl(tag) { return '<div class="who"><div class="chr">' + (isM17() ? BOY17 : BOY) + '</div>' + (tag || '') + '</div>'; }
  function girlEl(tag) { return '<div class="who"><div class="flip"><div class="chr late">' + (isM17() ? GIRL17 : GIRL) + '</div></div>' + (tag || '') + '</div>'; }
  function hearts() {
    var c = isM17() ? ['#A52226', '#3F4EE3', '#7C86F0', '#A52226'] : ['#FF3D8B', '#FFB81C', '#FF8FB1', '#FFF1DC'];
    return '<div class="heartmid">' + heart(c[0], 35, 30, 'beat') +
      heart(c[1], 14, 12, 'fh', 'left:0;bottom:30px') + heart(c[2], 12, 10, 'fh fh2', 'right:0;bottom:36px') + heart(c[3], 10, 9, 'fh fh3', 'left:16px;bottom:44px') + '</div>';
  }
  var BOT_SVG = { sell: "<svg class=\"bot-art\" viewBox=\"2 6 23 21\" width=\"23\" height=\"21\" shape-rendering=\"crispEdges\" aria-hidden=\"true\"><g class=\"bot-shadow\"><rect x=\"10\" y=\"26\" width=\"12\" height=\"1\" fill=\"#00000026\"/></g><g class=\"bot-jump\"><g class=\"bot-leg bot-leg-l\"><rect x=\"11\" y=\"23\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"11\" y=\"24\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"11\" y=\"25\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/></g><g class=\"bot-leg bot-leg-r\"><rect x=\"19\" y=\"23\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"19\" y=\"24\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"19\" y=\"25\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/></g><g class=\"bot-leg-sit\"><rect x=\"26\" y=\"21\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"26\" y=\"22\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"25\" y=\"23\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"21\" y=\"24\" width=\"4\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"21\" y=\"25\" width=\"4\" height=\"1\" fill=\"#f4e8d8\"/></g><g class=\"bot-upper\"><g class=\"bot-hat\"><rect x=\"9\" y=\"6\" width=\"4\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"9\" y=\"7\" width=\"4\" height=\"1\" fill=\"#261f8e\"/><rect x=\"8\" y=\"7\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"13\" y=\"7\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"9\" y=\"8\" width=\"5\" height=\"1\" fill=\"#261f8e\"/><rect x=\"8\" y=\"8\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"14\" y=\"8\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"9\" y=\"9\" width=\"5\" height=\"1\" fill=\"#261f8e\"/><rect x=\"8\" y=\"9\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"14\" y=\"9\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"9\" y=\"10\" width=\"5\" height=\"1\" fill=\"#261f8e\"/><rect x=\"8\" y=\"10\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"14\" y=\"10\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"10\" y=\"11\" width=\"6\" height=\"1\" fill=\"#261f8e\"/><rect x=\"9\" y=\"11\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"16\" y=\"11\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"10\" y=\"12\" width=\"6\" height=\"1\" fill=\"#261f8e\"/><rect x=\"9\" y=\"12\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"16\" y=\"12\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/></g><g class=\"bot-body\"><rect x=\"11\" y=\"13\" width=\"10\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"10\" y=\"14\" width=\"12\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"9\" y=\"15\" width=\"6\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"18\" y=\"15\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"22\" y=\"15\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"9\" y=\"16\" width=\"6\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"18\" y=\"16\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"22\" y=\"16\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"9\" y=\"17\" width=\"6\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"22\" y=\"17\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"7\" y=\"18\" width=\"8\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"18\" y=\"18\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"22\" y=\"18\" width=\"3\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"11\" y=\"19\" width=\"4\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"18\" y=\"19\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"22\" y=\"19\" width=\"3\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"11\" y=\"20\" width=\"12\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"11\" y=\"21\" width=\"11\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"11\" y=\"22\" width=\"10\" height=\"1\" fill=\"#e5d5bf\"/></g><g class=\"bot-lens\"><rect x=\"15\" y=\"15\" width=\"3\" height=\"1\" fill=\"#8a82e0\"/><rect x=\"19\" y=\"15\" width=\"3\" height=\"1\" fill=\"#8a82e0\"/><rect x=\"15\" y=\"16\" width=\"3\" height=\"1\" fill=\"#8a82e0\"/><rect x=\"19\" y=\"16\" width=\"3\" height=\"1\" fill=\"#8a82e0\"/><rect x=\"15\" y=\"17\" width=\"7\" height=\"1\" fill=\"#8a82e0\"/><rect x=\"15\" y=\"18\" width=\"3\" height=\"1\" fill=\"#8a82e0\"/><rect x=\"19\" y=\"18\" width=\"3\" height=\"1\" fill=\"#8a82e0\"/><rect x=\"15\" y=\"19\" width=\"3\" height=\"1\" fill=\"#8a82e0\"/><rect x=\"19\" y=\"19\" width=\"3\" height=\"1\" fill=\"#8a82e0\"/></g><g class=\"bot-eyes-look\"><g class=\"bot-eyes\"><rect x=\"16\" y=\"16\" width=\"1\" height=\"1\" fill=\"#2a211c\"/><rect x=\"20\" y=\"16\" width=\"1\" height=\"1\" fill=\"#2a211c\"/><rect x=\"16\" y=\"17\" width=\"1\" height=\"1\" fill=\"#2a211c\"/><rect x=\"20\" y=\"17\" width=\"1\" height=\"1\" fill=\"#2a211c\"/><rect x=\"16\" y=\"18\" width=\"1\" height=\"1\" fill=\"#2a211c\"/><rect x=\"20\" y=\"18\" width=\"1\" height=\"1\" fill=\"#2a211c\"/></g></g><g class=\"bot-bag\"><rect x=\"4\" y=\"18\" width=\"5\" height=\"1\" fill=\"#3a3340\"/><rect x=\"4\" y=\"19\" width=\"1\" height=\"1\" fill=\"#3a3340\"/><rect x=\"8\" y=\"19\" width=\"1\" height=\"1\" fill=\"#3a3340\"/><rect x=\"2\" y=\"20\" width=\"9\" height=\"1\" fill=\"#8a82e0\"/><rect x=\"2\" y=\"21\" width=\"9\" height=\"1\" fill=\"#3a3340\"/><rect x=\"2\" y=\"22\" width=\"1\" height=\"1\" fill=\"#3a3340\"/><rect x=\"10\" y=\"22\" width=\"1\" height=\"1\" fill=\"#3a3340\"/><rect x=\"3\" y=\"22\" width=\"7\" height=\"1\" fill=\"#ffffff\"/><rect x=\"2\" y=\"23\" width=\"1\" height=\"1\" fill=\"#3a3340\"/><rect x=\"10\" y=\"23\" width=\"1\" height=\"1\" fill=\"#3a3340\"/><rect x=\"3\" y=\"23\" width=\"7\" height=\"1\" fill=\"#ffffff\"/><rect x=\"2\" y=\"24\" width=\"1\" height=\"1\" fill=\"#3a3340\"/><rect x=\"10\" y=\"24\" width=\"1\" height=\"1\" fill=\"#3a3340\"/><rect x=\"3\" y=\"24\" width=\"7\" height=\"1\" fill=\"#ffffff\"/><rect x=\"2\" y=\"25\" width=\"9\" height=\"1\" fill=\"#3a3340\"/><image href=\"assets/bots/sell-badge-frame.svg\" x=\"3.400\" y=\"22.000\" width=\"6.200\" height=\"3.000\" preserveAspectRatio=\"none\"/><image href=\"assets/bots/sell-badge-text.svg\" x=\"4.315\" y=\"22.800\" width=\"4.421\" height=\"1.385\" preserveAspectRatio=\"none\"/></g></g></g></svg>", buy: "<svg class=\"bot-art\" viewBox=\"-3 1 23 22\" width=\"23\" height=\"22\" shape-rendering=\"crispEdges\" aria-hidden=\"true\"><g class=\"bot-shadow\"><rect x=\"5\" y=\"22\" width=\"12\" height=\"1\" fill=\"#00000026\"/></g><g class=\"bot-jump\"><g class=\"bot-leg bot-leg-l\"><rect x=\"6\" y=\"19\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"6\" y=\"20\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"6\" y=\"21\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/></g><g class=\"bot-leg bot-leg-r\"><rect x=\"14\" y=\"19\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"14\" y=\"20\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"14\" y=\"21\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/></g><g class=\"bot-leg-sit\"><rect x=\"21\" y=\"17\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"21\" y=\"18\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"20\" y=\"19\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"16\" y=\"20\" width=\"4\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"16\" y=\"21\" width=\"4\" height=\"1\" fill=\"#f4e8d8\"/></g><g class=\"bot-upper\"><g class=\"bot-hat\"><rect x=\"5\" y=\"1\" width=\"4\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"5\" y=\"2\" width=\"4\" height=\"1\" fill=\"#a52226\"/><rect x=\"4\" y=\"2\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"9\" y=\"2\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"5\" y=\"3\" width=\"5\" height=\"1\" fill=\"#a52226\"/><rect x=\"4\" y=\"3\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"10\" y=\"3\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"5\" y=\"4\" width=\"5\" height=\"1\" fill=\"#a52226\"/><rect x=\"4\" y=\"4\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"10\" y=\"4\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"5\" y=\"5\" width=\"5\" height=\"1\" fill=\"#a52226\"/><rect x=\"4\" y=\"5\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"10\" y=\"5\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"5\" y=\"6\" width=\"5\" height=\"1\" fill=\"#a52226\"/><rect x=\"4\" y=\"6\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"10\" y=\"6\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"5\" y=\"7\" width=\"6\" height=\"1\" fill=\"#a52226\"/><rect x=\"4\" y=\"7\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"11\" y=\"7\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"5\" y=\"8\" width=\"6\" height=\"1\" fill=\"#a52226\"/><rect x=\"4\" y=\"8\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"11\" y=\"8\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/></g><g class=\"bot-body\"><rect x=\"6\" y=\"9\" width=\"10\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"5\" y=\"10\" width=\"12\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"4\" y=\"11\" width=\"7\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"12\" y=\"11\" width=\"3\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"16\" y=\"11\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"4\" y=\"12\" width=\"7\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"12\" y=\"12\" width=\"3\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"16\" y=\"12\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"4\" y=\"13\" width=\"7\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"12\" y=\"13\" width=\"3\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"16\" y=\"13\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"5\" y=\"14\" width=\"4\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"10\" y=\"14\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"12\" y=\"14\" width=\"3\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"16\" y=\"14\" width=\"1\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"18\" y=\"14\" width=\"2\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"5\" y=\"15\" width=\"15\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"5\" y=\"16\" width=\"13\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"5\" y=\"17\" width=\"12\" height=\"1\" fill=\"#f4e8d8\"/><rect x=\"6\" y=\"18\" width=\"10\" height=\"1\" fill=\"#e5d5bf\"/></g><g class=\"bot-cheeks\"><rect x=\"9\" y=\"14\" width=\"1\" height=\"1\" fill=\"#f2a0a4\"/><rect x=\"17\" y=\"14\" width=\"1\" height=\"1\" fill=\"#f2a0a4\"/></g><g class=\"bot-eyes-look\"><g class=\"bot-eyes\"><rect x=\"11\" y=\"11\" width=\"1\" height=\"1\" fill=\"#2a211c\"/><rect x=\"15\" y=\"11\" width=\"1\" height=\"1\" fill=\"#2a211c\"/><rect x=\"11\" y=\"12\" width=\"1\" height=\"1\" fill=\"#2a211c\"/><rect x=\"15\" y=\"12\" width=\"1\" height=\"1\" fill=\"#2a211c\"/><rect x=\"11\" y=\"13\" width=\"1\" height=\"1\" fill=\"#2a211c\"/><rect x=\"15\" y=\"13\" width=\"1\" height=\"1\" fill=\"#2a211c\"/><rect x=\"11\" y=\"14\" width=\"1\" height=\"1\" fill=\"#2a211c\"/><rect x=\"15\" y=\"14\" width=\"1\" height=\"1\" fill=\"#2a211c\"/></g></g><g class=\"bot-bag\"><rect x=\"-1\" y=\"13\" width=\"5\" height=\"1\" fill=\"#6f1418\"/><rect x=\"-1\" y=\"14\" width=\"1\" height=\"1\" fill=\"#6f1418\"/><rect x=\"3\" y=\"14\" width=\"1\" height=\"1\" fill=\"#6f1418\"/><rect x=\"-3\" y=\"15\" width=\"9\" height=\"1\" fill=\"#6f1418\"/><rect x=\"-3\" y=\"16\" width=\"9\" height=\"1\" fill=\"#a52226\"/><rect x=\"-3\" y=\"17\" width=\"1\" height=\"1\" fill=\"#a52226\"/><rect x=\"5\" y=\"17\" width=\"1\" height=\"1\" fill=\"#a52226\"/><rect x=\"-2\" y=\"17\" width=\"7\" height=\"1\" fill=\"#ffffff\"/><rect x=\"-3\" y=\"18\" width=\"1\" height=\"1\" fill=\"#a52226\"/><rect x=\"5\" y=\"18\" width=\"1\" height=\"1\" fill=\"#a52226\"/><rect x=\"-2\" y=\"18\" width=\"7\" height=\"1\" fill=\"#ffffff\"/><rect x=\"-3\" y=\"19\" width=\"1\" height=\"1\" fill=\"#a52226\"/><rect x=\"5\" y=\"19\" width=\"1\" height=\"1\" fill=\"#a52226\"/><rect x=\"-2\" y=\"19\" width=\"7\" height=\"1\" fill=\"#ffffff\"/><rect x=\"-3\" y=\"20\" width=\"9\" height=\"1\" fill=\"#a52226\"/><g class=\"bag-badge\" transform=\"translate(3.000 0) scale(-1 1)\"><image href=\"assets/bots/buy-badge-b.svg\" x=\"-0.634\" y=\"17.872\" width=\"2.693\" height=\"1.319\" preserveAspectRatio=\"none\"/><image href=\"assets/bots/buy-badge-u.svg\" x=\"2.262\" y=\"17.872\" width=\"1.423\" height=\"1.286\" preserveAspectRatio=\"none\"/><image href=\"assets/bots/buy-badge-frame.svg\" x=\"-1.600\" y=\"17.000\" width=\"6.200\" height=\"3.000\" preserveAspectRatio=\"none\"/><image href=\"assets/bots/buy-badge-dot.svg\" x=\"3.339\" y=\"18.591\" width=\"0.482\" height=\"0.480\" preserveAspectRatio=\"none\"/></g></g></g></g></svg>" };

  /* ---------- the SELL and BUY bots from modulusseventeen.com (same pixel art, same step motion) ---------- */
  var BOT_LINES = {
    sell: ['Hi! I\'m SELL.', 'Billing? Done.', 'Stock, sorted.', 'Ka-ching!', 'Ledger looks good.'],
    buy: ['Hi! I\'m BUY.', 'Zero commission!', 'Your shop, online.', 'New order!', 'Delivered!']
  };
  function bot(kind, say) {
    return '<span class="bot bot-' + kind + (say ? ' has-bubble' : '') + '" data-act="bot" data-bot="' + kind + '" role="button" tabindex="0" aria-label="Say hi to ' + kind.toUpperCase() + '">' +
      '<span class="bot-bubble" aria-hidden="true">' + esc(say || '') + '</span>' + BOT_SVG[kind] + '</span>';
  }
  // o: { id, sell, buy (speech bubbles), mid (html between them) }
  function duo(mode, o) {
    o = o || {};
    return '<div class="stage duo ' + (mode || 'idle') + '"' + (o.id ? ' id="' + o.id + '"' : '') + '><div class="row">' + bot('sell', o.sell) + (o.mid17 || '') + bot('buy', o.buy) + '</div></div>';
  }
  function setMood(el, mood) { if (el) el.className = (el.classList.contains('duo') ? 'stage duo ' : 'stage ') + mood; }
  // hop, say something, float a pixel heart (what the homepage bots do on tap)
  function poke(el, text) {
    if (!el) return;
    el.classList.remove('is-hopping'); void el.offsetWidth; el.classList.add('is-hopping');
    if (text) {
      var b = el.querySelector('.bot-bubble'); b.textContent = text;
      el.classList.add('has-bubble');
      clearTimeout(el._bt); el._bt = setTimeout(function () { el.classList.remove('has-bubble'); }, 2200);
    }
    if (reduced) return;
    var fx = document.createElement('span'); fx.className = 'bot-fx';
    fx.style.setProperty('--fx-x', (25 + Math.random() * 50).toFixed(0) + '%');
    fx.innerHTML = heart(el.classList.contains('bot-sell') ? '#3F4EE3' : '#A52226', 14, 12);
    el.appendChild(fx);
    setTimeout(function () { fx.remove(); }, 950);
  }
  function botSay(kind, text) { $$('#screen .bot-' + kind).forEach(function (el) { poke(el, text); }); }
  function blinkSomeone() {
    var all = $$('.bot'); if (!all.length) return;
    var b = all[Math.floor(Math.random() * all.length)];
    b.classList.add('is-blinking'); setTimeout(function () { b.classList.remove('is-blinking'); }, 150);
  }
  // A stage holds the couple. o: {boy, girl, mid, gap, boyTag, girlTag}
  function stage(mode, o) {
    o = o || {};
    if (isM17()) return duo(mode, o);
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

  // the three perk icons, recoloured to the brand
  var ART17 = { bill: tint(ART.bill, M17_ART), stock: tint(ART.stock, M17_ART), ride: tint(ART.ride, M17_ART), shop: tint(ART.shop, M17_ART) };

  /* ---------------- state ---------------- */
  var S = {
    screen: 'age', watched: false, gender: null, prof: null, step: 0, playing: false,
    // the name and entry number are kept in this browser, so the form is prefilled and nobody can enter twice from here
    vote: store('m17-garba-vote') || null, name: store('m17-garba-name') || '', phone: store('m17-garba-phone') || '', ig: store('m17-garba-ig') || '',
    followed: ({ yes: true, no: false })[store('m17-garba-followed')],   // undefined until they answer, once giftOpened: false,
    entered: !!store('m17-garba-entry'),
    modal: null, igOpenedAt: 0, entryNumber: (store('m17-garba-entry') || '').replace(/^1$/, ''), saving: false, source: scanSource(),
    crowd: { likes: 0, dislikes: 0, shares: 0 }   // real totals from the backend, added on top of the seeds
  };
  if (S.vote !== 'up' && S.vote !== 'down') S.vote = null;
  var timers = [];
  var BACK = { under18: 'age', gender: 'age', profession: 'gender', business: 'profession', radar: 'profession', found: 'profession', video: 'found', giveaway: 'video', enter: 'giveaway', done: 'giveaway' };

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
  function every(fn, ms) { var t = setInterval(fn, ms); timers.push(t); return t; }
  function clearTimers() { timers.forEach(function (t) { clearTimeout(t); clearInterval(t); }); timers = []; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(n) { return Number(n).toLocaleString('en-IN'); }
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var app = $('#app'), topbar = $('#topbar'), prog = $('#prog'), top = $('#top'), screenEl = $('#screen'), fx = $('#fx'), modalRoot = $('#modal-root'), toastEl = $('#toast'), foot = $('#foot');

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
    var back = '<button class="back" type="button" aria-label="Go back" data-act="back">' + I.back + '</button>';
    top.innerHTML = isM17()
      ? back + '<a class="brand" href="' + CONFIG.siteUrl + '" target="_blank" rel="noopener" aria-label="Modulus Seventeen">' + LOGO + '<span class="wordmark">Modulus <span>Seventeen</span></span></a>'
      : home ? logo + '<span class="pill-tag">' + CONFIG.event + ' special</span>' : back + logo;
  }

  var STEP = { age: 1, gender: 2, profession: 3 };
  function renderProgress() {
    var n = STEP[S.screen];
    prog.innerHTML = n ? '<div class="progress" aria-label="Step ' + n + ' of 3">' +
      [1, 2, 3].map(function (i) { return '<span class="' + (i <= n ? 'on' : '') + '"></span>'; }).join('') + '</div>' : '';
  }


  /* ---------- small pieces from the Modulus Seventeen site ---------- */
  // the "SELL + BUY | made for every ..." pill at the top of the homepage
  function heroPill(muted, accent) {
    return '<span class="hero-pill scr"><span class="hp-brand"><span class="s">SELL</span><span class="plus">+</span><span class="b">BUY</span></span><span class="hp-div"></span><span class="hp-muted">' + muted + '</span><span class="hp-accent">' + accent + '</span></span>';
  }
  function head(title, sub) {
    return '<div class="sec-head scr"><h1 class="h1">' + title + '</h1>' + (sub ? '<p class="sub">' + sub + '</p>' : '') + '</div>';
  }
  function miniLogo() { return '<span class="mini-logo">' + LOGO + '</span>'; }
  function arrowBtn(label, attrs, cls) {
    return '<' + (attrs.indexOf('href=') === 0 ? 'a ' : 'button ') + attrs + ' class="btn btn-dark btn-arrow pbtn' + (cls ? ' ' + cls : '') + '"><span>' + label + '</span><span class="ic">' + I.arrow + '</span></' + (attrs.indexOf('href=') === 0 ? 'a' : 'button') + '>';
  }

  /* ---------------- screens ---------------- */
  var screens = {};

  screens.age = function () {
    return '<div class="hero scr"><div class="hero-type anton"><span class="a">Find a</span><span class="b">Garba</span><span class="c">Partner</span></div>' +
      '<div class="price"><span>FREE</span></div>' +
      '<p class="byline"><span class="by-mark">' + LOGO + '</span>by Modulus Seventeen</p></div>' +
      stage('dance', { mid: hearts() }) +
      '<section class="card scr d3" style="display:flex;flex-direction:column;gap:10px">' +
        '<h2 style="font-size:24px;line-height:1.2;font-weight:700;letter-spacing:-.02em">Are you <span class="ser" style="color:var(--magenta)">18</span> or above?</h2>' +
        '<p class="muted" style="font-size:14px;line-height:1.5;margin-bottom:4px">Garba partners are strictly for grown-ups.</p>' +
        '<button class="btn btn-dark pbtn shine" data-act="go" data-to="gender"><span>Yes, I\'m 18+</span><span class="ic">' + I.arrow + '</span></button>' +
        '<button class="btn-ghost pbtn" data-act="go" data-to="under18">No, I\'m under 18</button>' +
      '</section>' +
      '<p class="assure scr d4">' + I.shield + 'Free to play. No payment needed.</p>';
  };
  screens.under18 = function () {
    return '<div class="hero scr" style="padding-top:12px;gap:8px">' +
        '<span class="anton" style="display:grid;place-items:center;width:72px;height:72px;border-radius:50%;background:var(--cream);color:var(--magenta);border:1.5px solid var(--ink);box-shadow:4px 4px 0 var(--gold);font-size:26px;animation:wiggle 1.2s ease-in-out infinite">18+</span>' +
        '<h1 class="h1" style="margin-top:8px">Not this <span class="ser" style="color:var(--gold)">year</span>, champ.</h1></div>' +
      stage('wave', { gap: 30, mid: '<div class="heartmid">' + heart('#FF3D8B', 28, 24, 'beat') + '</div>' }) +
      '<section class="card scr d2" style="display:flex;flex-direction:column;gap:12px;text-align:center">' +
        '<p style="font-size:15px;line-height:1.55;color:var(--muted-2)">' + CONFIG.under18Note + '</p>' +
        '<h2 style="font-size:21px;line-height:1.25;font-weight:800;letter-spacing:-.02em">Join the <span class="ser" style="color:var(--magenta)">' + CONFIG.event + ' gang</span> on Instagram</h2>' +
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
    var badge = '<span class="flow-badge">' + LOGO + '</span>';
    var perks = [
      [ART17.bill, 'Fast billing in rush hour', 'Bill in seconds while the Garba crowd queues up.'],
      [ART17.stock, 'One stock count', 'Online and offline stock in one place.'],
      [ART17.shop, 'Zero commission on BUY', 'Keep what you earn on every order.'],
      [ART17.ride, 'Delivery managed in SELL', 'Assign and track every delivery.']
    ];
    return heroPill('Special match', 'for business owners') +
      head('Jackpot, <span class="ser">Business Owner!</span>', 'Your ' + CONFIG.event + ' partner is the one that runs your shop all year.') +
      '<div class="scene-wrap scr d1" id="bizparty">' + duo('idle', { sell: 'Your partner!', buy: '1 month free!', mid17: '<div class="duo-mid">' + badge + '</div>' }) + '</div>' +
      '<section class="hc sell scr d2">' +
        '<div class="hc-top"><div class="hc-id"><span class="hc-label">' + miniLogo() + 'Modulus Seventeen</span><span class="hc-sub">One ecosystem for every Indian business</span></div>' +
        '<div class="hc-right"><small class="hc-cap">Free for</small><span class="hc-amt">1 month</span></div></div>' +
        '<h2 class="offer">Get <span class="ser">one month free</span> with your partner Modulus Seventeen</h2>' +
        '<p class="hc-p">Garba season brings the rush. Let your partner handle billing, stock and delivery while you dance till midnight.</p>' +
        arrowBtn('Claim my free month', 'href="' + CONFIG.siteUrl + '"') +
        countdownBlock(false, 'Taking you to Modulus Seventeen in') +
      '</section>' +
      '<div class="vlist scr d3">' + perks.map(function (p) {
        return '<div class="vcard"><span class="vc-ic">' + p[0] + '</span><span><b>' + p[1] + '</b><small>' + p[2] + '</small></span></div>';
      }).join('') + '</div>';
  };
  // the win: the bots celebrate, a buzz on phones, then the countdown to the site
  screens.business.after = function () {
    startCountdown();
    later(function () { botSay('sell', 'Your partner!'); }, 500);
    later(function () { botSay('buy', '1 month free!'); }, 900);
    try { if (navigator.vibrate && !reduced) navigator.vibrate([40, 60, 40]); } catch (e) {}
  };

  screens.radar = function () {
    var pins = [
      { x: 18.9, y: 20.3, c: '#FF7A1A', d: .6 }, { x: 81.4, y: 22.3, c: '#FF3D8B', d: 1.4 },
      { x: 25, y: 83, c: '#0F7A68', d: 2.2 }
    ];
    return '<div class="radar-head scr"><h1 class="h1">Finding your <span class="nowrap"><span class="ser" style="color:var(--gold)">Garba partner</span><span class="dots" aria-hidden="true"><i>.</i><i>.</i><i>.</i></span></span></h1>' +
      '<p class="sub radar-msg" id="radarmsg" aria-live="polite">Looking through the guest list…</p></div>' +
      '<div class="map scr d1" aria-label="Search animation">' +
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
    var labels = ['Browsing the Garba guest list', 'Checking dandiya skills', 'Matching your vibe'];
    var el = $('#steps'); if (!el) return;
    el.innerHTML = labels.map(function (l, i) {
      var st = S.step > i ? 'done' : S.step === i ? 'active' : 'pending';
      return '<div class="step' + (st === 'done' ? ' isdone' : '') + '"><span class="st ' + st + '">' + (st === 'done' ? I.check : '') + '</span><span>' + l + '</span></div>';
    }).join('');
    var msg = ['Looking through the guest list…', 'Found a few dancers…', 'Shortlisting the best moves…', 'Partner found!'][S.step];
    var m = $('#radarmsg'); if (m && msg) m.textContent = msg;
  }
  screens.radar.after = function () {
    renderSteps();
    [1, 2, 3].forEach(function (n, i) { later(function () { S.step = n; renderSteps(); }, 1300 * (i + 1)); });
    later(function () { go('found'); }, 4600);
  };

  function partner() {
    // picked once per gender + profession, so going back and forth keeps the same partner, while the next visitor gets another
    var key = (S.gender || '') + '|' + (S.prof || '');
    if (S.partner && S.partnerKey === key) return S.partner;
    var pf = S.gender !== 'female';
    var pool = CONFIG.partners[pf ? 'female' : 'male'];
    var base = pool[Math.floor(Math.random() * pool.length)];
    var pct = CONFIG.matchPct[0] + Math.floor(Math.random() * (CONFIG.matchPct[1] - CONFIG.matchPct[0] + 1));
    S.partnerKey = key;
    S.partner = {
      female: pf,
      photo: base.photo || (pf ? CONFIG.photoFemale : CONFIG.photoMale),
      masked: maskName(base.name),
      job: (base.jobs[S.prof] || base.jobs.student) + ' · ' + base.tag,
      traits: base.traits,
      match: pct
    };
    return S.partner;
  }
  // "Priya Joshi" -> "P**** J****"
  function maskName(name) {
    return name.split(' ').map(function (w) { return w.charAt(0) + new Array(w.length).join('*'); }).join(' ');
  }

  screens.found = function () {
    var p = partner();
    return '<span class="match-title anton">It\'s a match!</span>' +
      '<div style="display:flex;justify-content:center;perspective:800px"><button type="button" class="frame frame-btn" data-act="go" data-to="video" aria-label="Reveal my partner">' +
        '<span class="dist">' + p.match + '% vibe match</span><span class="ok">' + I.check + '</span>' +
        (p.photo ? '<img src="' + esc(p.photo) + '" alt="Your Garba partner">' : stage('dance', { boy: !p.female, girl: p.female, gap: 0 })) +
        '<span class="tap-reveal">' + I.play + 'Tap to reveal</span>' +
      '</button></div>' +
      '<button class="btn btn-m17 pbtn shine reveal-cta scr d1" data-act="go" data-to="video"><span class="m17mark">' + LOGO + '</span><span class="bt"><small>From Modulus Seventeen</small>Reveal my partner</span><span class="ic">' + I.play + '</span></button>' +
      '<p class="assure scr d1">' + I.shield + 'Free. Nothing to pay, no sign-up.</p>' +
      '<section class="scr d2" style="display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center">' +
        '<span class="masked">' + p.masked + '</span>' +
        '<span class="jobpill">' + p.job + '</span>' +
        '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px">' + p.traits.map(function (t, i) { return '<span class="trait" style="animation-delay:' + (.5 + i * .12) + 's">' + t + '</span>'; }).join('') + '</div>' +
      '</section>';
  };
  screens.found.after = function () { confetti(true); };

  /* ---------- video + takedown meter ---------- */
  function counts() {
    // Real numbers from the backend. A like and a dislike cancel each other out: every like takes one off the
    // dislike count and every dislike takes one off the like count, so only the difference is shown. It can go below 0.
    return { ups: S.crowd.likes - S.crowd.dislikes, downs: S.crowd.dislikes - S.crowd.likes };
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
    up: 'Saved by you! Your 👍 pulled the meter back by 1. SELL and BUY say thanks.',
    down: 'Heard you. Your 👎 just pushed this 1 step closer to the bin.'
  };

  /* ---------- the partner reveal as text, until the video is ready ---------- */
  function scriptParts() {
    var closes = CONFIG.closesOn ? ' Closes ' + CONFIG.closesOn + '.' : '';
    return (CONFIG.script[S.prof] || CONFIG.script.student).map(function (p) {
      var text = p.text.replace('{prize}', CONFIG.prize.name).replace('{closes}', closes);
      return { tag: p.tag, text: text, ms: Math.max(p.secs, Math.ceil(text.length / CONFIG.scriptReadCps)) * 1000 };
    });
  }
  // every part sits in the same grid cell, so the card is as tall as its longest part and never jumps
  // the real video once there is one, until the community takes it down
  function videoId() { return CONFIG.videoByProfession[S.prof] || ''; }
  function videoLive() { return !!videoId() && counts().downs < CONFIG.takedownAt; }
  function scriptCard() {
    if (counts().downs >= CONFIG.takedownAt) return takedownCard();   // already taken down
    var parts = scriptParts();
    var texts = parts.map(function (p, i) {
      return '<div class="sc-part" data-i="' + i + '"><b class="sc-tag">' + esc(p.tag) + '</b><p class="sc-text">' + esc(p.text) + '</p></div>';
    }).join('');
    var bars = parts.map(function (p, i) {
      return '<button class="sc-bar pbtn" data-act="scpart" data-i="' + i + '" aria-label="' + esc(p.tag) + '"><i></i></button>';
    }).join('');
    return '<div class="ph script gridbg" id="script"><span class="lbl">PARTNER REVEAL</span>' +
      '<div class="sc-wrap">' + texts + '</div>' +
      '<div class="sc-mascots"><span class="mock" id="mockSell"></span>' + stage('idle', { gap: 8, id: 'scStage' }) + '<span class="mock buy" id="mockBuy"></span></div>' +
      '<div class="sc-ctl"><button class="sc-play pbtn" data-act="play" aria-label="Pause"></button><div class="sc-bars">' + bars + '</div></div></div>';
  }
  var scriptAt = 0, scriptTimer = 0;
  function showPart(i) {
    var parts = scriptParts();
    scriptAt = (i + parts.length) % parts.length;
    var script = $('#script');
    if (!script) return;
    script.classList.remove('paused');
    $$('.sc-part', script).forEach(function (el) { el.classList.toggle('on', +el.dataset.i === scriptAt); });
    $$('.sc-bar', script).forEach(function (b, k) {
      b.classList.remove('on'); void b.offsetWidth;   // restart the fill
      b.classList.toggle('done', k < scriptAt);
      b.classList.toggle('on', k === scriptAt);
      b.style.setProperty('--dur', parts[k].ms + 'ms');
    });
    var m = CONFIG.scriptMascots[scriptAt] || CONFIG.scriptMascots[0];
    setMood($('#scStage'), m.mood);
    [['#mockSell', m.sell], ['#mockBuy', m.buy]].forEach(function (pair) {
      var b = $(pair[0]); b.textContent = pair[1];
      b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
    });
    setPlayIcon();
    clearTimeout(scriptTimer);
    if (S.playing) scriptTimer = later(function () { showPart(scriptAt + 1); }, parts[scriptAt].ms);
  }
  function setPlayIcon() {
    var b = $('.sc-play');
    if (!b) return;
    b.innerHTML = S.playing ? I.pause : I.play;
    b.setAttribute('aria-label', S.playing ? 'Pause' : 'Play');
  }
  function toggleScript() {
    S.playing = !S.playing;
    if (S.playing) return showPart(scriptAt);
    clearTimeout(scriptTimer);
    var script = $('#script');
    if (script) script.classList.add('paused');
    setMood($('#scStage'), 'idle');
    setPlayIcon();
  }

  /* ---------- the quest: the homepage stepper (1 Add product -> 2 Live on BUY ...), here Watch -> Vote -> Share -> Enter ---------- */
  var QUEST = [['watch', 'Watch'], ['vote', 'Vote'], ['share', 'Share'], ['enter', 'Enter']];
  function questState() { return { watch: !!S.watched, vote: !!S.vote, share: !!store('m17-garba-shared'), enter: !!S.entered }; }
  function questHTML(pop) {
    var st = questState(), done = QUEST.filter(function (q) { return st[q[0]]; }).length, next = -1;
    QUEST.forEach(function (q, i) { if (next < 0 && !st[q[0]]) next = i; });
    var items = QUEST.map(function (q, i) {
      var cls = st[q[0]] ? ' is-done' : i === next ? ' is-active' : '';
      return '<li class="step' + cls + (pop === q[0] ? ' just' : '') + '"><span class="step-n">' + (st[q[0]] ? I.check : (i + 1)) + '</span><span class="step-t">' + q[1] + '</span></li>';
    }).join('');
    var hint = st.enter ? 'You\'re in the draw. Share it so your friends can join.' : done >= 3 ? 'One step left: enter the giveaway.' : 'Vote or share, then enter the giveaway.';
    return '<section class="card quest' + (pop === undefined ? ' scr d3' : '') + '" id="quest"><div class="q-head"><b>Your ' + CONFIG.event + ' quest</b><span class="q-count">' + done + ' / 4</span></div>' +
      '<ol class="steps4">' + items + '</ol><p class="q-hint">' + hint + '</p></section>';
  }
  function refreshQuest(pop) {
    var q = $('#quest');
    if (q) q.outerHTML = questHTML(pop || null);
  }

  // the giveaway right under the video: a mystery box (the prize is revealed when they open it)
  function giveawayTease() {
    return '<section class="hc buy gw scr d2">' +
      '<div class="hc-top"><div class="hc-id"><span class="hc-label">' + miniLogo() + CONFIG.event + ' giveaway</span><span class="paid">Free to enter</span></div>' +
      '<div class="hc-right"><small class="hc-cap">Worth</small><span class="hc-amt">' + CONFIG.prize.worth + '</span></div></div>' +
      '<div class="gw-prod"><span class="gw-img gw-box">' + GIFT_SVG + '<span class="q">?</span></span><span class="gw-name"><small>Mystery gift</small><b>What\'s inside the box?</b><small>Open it to find out. Winner announced on Instagram.</small></span></div>' +
      arrowBtn(S.entered ? 'See my entry' : 'Participate Now', 'data-act="go" data-to="giveaway"') +
    '</section>';
  }

  screens.video = function () {
    var c = counts(), lv = level(c.downs), pct = Math.max(0, Math.min(100, c.downs / CONFIG.takedownAt * 100));
    var ticks = [25, 50, 75].map(function (t) { return '<i style="left:' + t + '%"></i>'; }).join('');
    var mode = S.vote === 'down' ? 'sad' : S.vote === 'up' ? 'cheer' : 'idle';
    return heroPill('Partner reveal', 'by Modulus Seventeen') +
      head('Meet Your <span class="ser">Partner</span>', 'Watch it till the end. There\'s a twist.') +
      '<div class="vid scr d1' + (videoLive() ? '' : ' has-script') + '">' +
        (videoLive()
          ? '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(videoId()) + '?autoplay=1&mute=0&loop=1&playlist=' + esc(videoId()) + '&rel=0&modestbranding=1&playsinline=1&enablejsapi=1" title="Your Garba partner" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>'
          : scriptCard()) +
      '</div>' +
      giveawayTease() +
      questHTML() +
      '<section class="card shield scr d3" style="width:100%">' +
        '<div class="shield-head"><span class="shield-ico">' + I.shield + '</span><span class="t"><b>Community Shield</b><small>If this video hits ' + fmt(CONFIG.takedownAt) + ' dislikes, we take it down.</small></span><span class="lvl ' + lv.c + '" id="lvl">' + lv.t + '</span></div>' +
        '<div class="vote-row">' +
          '<button class="vbtn up pbtn" aria-pressed="' + (S.vote === 'up') + '" data-act="vote" data-v="up" aria-label="Like, ' + fmt(c.ups) + ' likes">' + I.up + '<span id="upn">' + fmt(c.ups) + '</span></button>' +
          '<button class="vbtn down pbtn" aria-pressed="' + (S.vote === 'down') + '" data-act="vote" data-v="down" aria-label="Dislike">' + I.down + '<span>Not cool</span></button>' +
        '</div>' +
        '<div class="meter" id="meter"><div class="meter-track" role="meter" aria-valuemin="0" aria-valuemax="' + CONFIG.takedownAt + '" aria-valuenow="' + c.downs + '" aria-label="Dislikes toward takedown"><span class="meter-fill" id="mfill" style="width:' + pct + '%"></span>' + ticks + '</div><span class="meter-goal" title="Takedown">' + tint(I.bin, M17_ART) + '</span></div>' +
        '<div class="meter-labels"><span><b id="downn">' + fmt(c.downs) + '</b> / ' + fmt(CONFIG.takedownAt) + ' dislikes</span><span id="togo">' + fmt(CONFIG.takedownAt - c.downs) + ' to takedown</span></div>' +
        '<div class="react">' + stage(mode, { id: 'reactstage' }) + '<p id="reactmsg">' + REACT[S.vote || 'none'] + '</p></div>' +
        '<p class="vote-note">We care about you more than views. If a reveal ever hurts anyone, the community can send it to the bin.</p>' +
      '</section>' +
      '<button class="btn-ghost light has-count pbtn scr d4" data-act="share"><span class="lbl">' + I.share + ' Share the video</span>' +
        '<small class="share-count"><b id="sharesn">' + fmt(shareTotal()) + '</b> people have shared</small></button>' +
      '<a class="textlink" href="' + CONFIG.siteUrl + '" target="_blank" rel="noopener">Own a shop? Your real partner is here →</a>';
  };
  // the text plays itself, part by part, like the video would
  screens.video.after = function () {
    later(function () { if (!S.watched) { S.watched = true; refreshQuest('watch'); } }, 4000);
    var frame = $('.vid iframe');
    if (frame) return playWithSound(frame);
    if (!$('#script')) return;
    S.playing = true;
    showPart(0);
  };

  // The video starts by itself, loops, and plays at full volume. The visitor has just tapped "Show my partner", which is
  // what lets the browser allow sound; the player is also told to unmute and set the volume to 100 once it is ready.
  function playWithSound(frame) {
    function tell(func, args) {
      try { frame.contentWindow.postMessage(JSON.stringify({ event: 'command', func: func, args: args || [] }), '*'); } catch (e) {}
    }
    function ready() {
      tell('unMute'); tell('setVolume', [100]); tell('playVideo');
    }
    frame.addEventListener('load', function () {
      try { frame.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: 1 }), '*'); } catch (e) {}
      [300, 900, 1800].forEach(function (ms) { later(ready, ms); });
    });
  }

  function vote(v, btn) {
    var before = counts().downs, prev = S.vote;
    S.vote = prev === v ? null : v;
    if (prev) S.crowd[prev === 'up' ? 'likes' : 'dislikes'] = Math.max(0, S.crowd[prev === 'up' ? 'likes' : 'dislikes'] - 1);
    if (S.vote) S.crowd[S.vote === 'up' ? 'likes' : 'dislikes']++;
    store('m17-garba-vote', S.vote);
    sendVote(S.vote);
    var c = counts(), delta = c.downs - before;
    // update buttons
    $$('.vbtn').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.v === S.vote)); });
    btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop');
    $('#upn').textContent = fmt(c.ups);
    var rs = $('#reactstage');
    setMood(rs, S.vote === 'down' ? 'sad' : S.vote === 'up' ? 'cheer' : 'idle');
    $('#reactmsg').textContent = REACT[S.vote || 'none'];
    if (delta !== 0) flyChip(btn, delta, function () { applyMeter(c); }); else applyMeter(c);
    if (S.vote) { if (isM17()) botSay(S.vote === 'up' ? 'sell' : 'buy', S.vote === 'up' ? 'Saved it!' : 'Noted. Thanks!'); else burstOn(btn, 16, 70); }
    refreshQuest(S.vote ? 'vote' : null);
  }
  var voteQueue = Promise.resolve(), votePending = 0;
  // Votes are sent one after another; the server totals replace the local ones once the last one lands.
  // The backend keeps one vote per visitorId, so switching a vote is just a new vote and taking it back needs no vote name.
  function sendVote(vote) {
    var call = vote
      ? function () { return api('POST', '/vote', { vote: VOTE_NAME[vote], visitorId: visitorId() }); }
      : function () { return api('DELETE', '/vote', { visitorId: visitorId() }); };
    votePending++;
    voteQueue = voteQueue.then(call).then(function (d) {
      if (--votePending === 0) setCrowd(d);
    }, function () { votePending--; });
  }
  function shareTotal() { return CONFIG.sharesSeed + S.crowd.shares; }
  function showShares() {
    var n = $('#sharesn');
    if (n) n.textContent = fmt(shareTotal());
  }
  function setCrowd(d) {
    if (typeof d.likeCount !== 'number' || typeof d.dislikeCount !== 'number') return;
    S.crowd.likes = d.likeCount; S.crowd.dislikes = d.dislikeCount;
    if (typeof d.shareCount === 'number') { S.crowd.shares = d.shareCount; showShares(); }
    if (S.screen !== 'video' || !$('#mfill')) return;
    var c = counts(); $('#upn').textContent = fmt(c.ups); applyMeter(c);
  }
  function applyMeter(c) {
    var pct = Math.max(0, Math.min(100, c.downs / CONFIG.takedownAt * 100));
    $('#mfill').style.width = pct + '%';
    $('.meter-track').setAttribute('aria-valuenow', c.downs);
    var dn = $('#downn'); dn.textContent = fmt(c.downs); dn.classList.remove('tick'); void dn.offsetWidth; dn.classList.add('tick');
    $('#togo').textContent = fmt(CONFIG.takedownAt - c.downs) + ' to takedown';
    var lv = level(c.downs), l = $('#lvl'); l.className = 'lvl ' + lv.c; l.textContent = lv.t;
    var m = $('#meter'); m.classList.remove('bump'); void m.offsetWidth; m.classList.add('bump');
    if (c.downs >= CONFIG.takedownAt) takeDown();
  }
  // 1,000 dislikes: the community sends the reveal to the bin and a notice takes the video's place
  function takeDown() {
    var vid = $('.vid');
    if (!vid || vid.querySelector('.takedown')) return;
    clearTimeout(scriptTimer);
    S.playing = false;
    vid.classList.add('has-script');
    vid.innerHTML = takedownCard();
  }
  function takedownCard() {
    var note = CONFIG.takedownNote.replace('{n}', fmt(CONFIG.takedownAt));
    return '<div class="ph script gridbg takedown"><span class="lbl">REMOVED</span>' +
      '<div class="sc-wrap"><div class="sc-part on"><b class="sc-tag">Taken down by the community</b><p class="sc-text">' + esc(note) + '</p></div></div>' +
      '<div class="sc-mascots">' + stage('sad', { gap: 8 }) + '</div></div>';
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
  // a pixel gift box in the bots' palette: indigo box, red ribbon, the |17| brackets on the front
  var GIFT_SVG = '<svg class="px" viewBox="0 0 16 16" aria-hidden="true"><g class="whole">' +
    '<rect x="2" y="15" width="12" height="1" fill="#00000026"/>' +
    '<rect x="2" y="8" width="12" height="7" fill="#261F8E"/><rect x="2" y="14" width="12" height="1" fill="#19136B"/><rect x="3" y="9" width="1" height="5" fill="#3F4EE3"/>' +
    '<rect x="7" y="8" width="2" height="7" fill="#A52226"/>' +
    '<rect x="4" y="10" width="1" height="3" fill="#F4E8D8"/><rect x="11" y="10" width="1" height="3" fill="#F4E8D8"/>' +
    '<g class="lid"><rect x="1" y="5" width="14" height="3" fill="#3F4EE3"/><rect x="1" y="5" width="14" height="1" fill="#8A82E0"/><rect x="1" y="7" width="14" height="1" fill="#261F8E"/>' +
    '<rect x="7" y="5" width="2" height="3" fill="#A52226"/>' +
    '<rect x="4" y="3" width="3" height="2" fill="#A52226"/><rect x="9" y="3" width="3" height="2" fill="#A52226"/><rect x="5" y="2" width="1" height="1" fill="#A52226"/><rect x="10" y="2" width="1" height="1" fill="#A52226"/><rect x="7" y="4" width="2" height="1" fill="#7A171A"/></g>' +
    '</g></svg>';

  // the homepage FAQ list (01, 02 ... with dashed lines), used for "how it works"
  function qaList(rows) {
    return '<ol class="qa-list scr d2">' + rows.map(function (r, i) {
      return '<li><span class="qa-n">0' + (i + 1) + '</span><span><b>' + r[0] + '</b><small>' + r[1] + '</small></span></li>';
    }).join('') + '</ol>';
  }
  screens.giveaway = function () {
    var pill = heroPill('Official giveaway', 'by Modulus Seventeen');
    if (S.entered) {
      // already in: show the entry instead of the form, so going back from the last screen can't enter twice
      return pill + head('You\'re <span class="ser">In!</span>', 'Winner announced on ' + CONFIG.instagramHandle + '. Good luck!') + prizeCard() +
        '<section class="card scr d2" style="display:flex;flex-direction:column;gap:14px">' +
          '<p style="font-size:15px;line-height:1.5;font-weight:500">Your entry number is <b class="entry-no" style="display:inline">' + esc(S.entryNumber) + '</b>.</p>' +
          arrowBtn('See my entry', 'data-act="go" data-to="done"') +
        '</section>';
    }
    var opened = S.giftOpened;
    return pill + '<div id="gwhead">' + giftHead(opened) + '</div>' +
      '<div class="gift-stage scr d1" id="giftstage">' +
        duo('party', { sell: opened ? 'Woohoo!' : 'Hehe! Open it!', buy: opened ? 'Grab it!' : 'Tap the box!', mid17: opened
          ? '<span class="giftbtn open opened" aria-hidden="true">' + GIFT_SVG + '</span>'
          : '<button class="giftbtn" id="giftbtn" data-act="opengift" aria-label="Open the gift box">' + GIFT_SVG + '</button>' }) +
        (opened ? '' : '<button class="outline-chip pbtn" id="taphint" data-act="opengift">' + I.gift + ' Tap the box</button>') +
      '</div>' +
      (opened ? revealCard(false) : '') +
      '<div class="trust scr d2"><span>' + I.check + 'Free to enter</span><span>' + I.check + 'No purchase needed</span><span>' + I.check + 'Winner on Instagram</span></div>';
  };
  function giftHead(opened) {
    return opened ? head('It\'s Yours to <span class="ser">Win!</span>', 'Free to enter. Winner announced on Instagram.')
      : head('A Gift Is <span class="ser">Waiting</span>', 'Tap the box to open your ' + CONFIG.event + ' surprise.');
  }
  // the prize floating out of the box
  function revealCard(animate) {
    return '<section class="reveal-card' + (animate ? ' floating-in' : ' scr d2') + '" id="revealcard">' +
      '<span class="rc-kick">Inside the box</span>' +
      '<div class="rc-img"><img src="' + CONFIG.prize.image + '" alt="' + esc(CONFIG.prize.name) + '" width="581" height="720"></div>' +
      '<b class="p-name">' + esc(CONFIG.prize.name) + '</b>' +
      '<span class="p-row"><span class="p-worth">Worth <b>' + CONFIG.prize.worth + '</b></span><span class="off-chip">Free to enter</span></span>' +
      arrowBtn('Grab it Now', 'data-act="go" data-to="enter"') +
    '</section>';
  }
  // the two bots can't stop laughing while the box waits
  var LAUGH = {
    sell: ['Hahaha!', 'Hehe!', 'Open it!', 'Tap tap tap!', 'Hehehe!'],
    buy: ['Bahaha!', 'Hehe!', 'What\'s inside?', 'Go on!', 'Hahaha!']
  };
  screens.giveaway.after = function () {
    if (S.entered) return;
    var k = 0;
    every(function () {
      var kind = k++ % 2 ? 'buy' : 'sell', lines = S.giftOpened ? ['Woohoo!', 'Grab it!', 'Yay!', 'So good!'] : LAUGH[kind];
      botSay(kind, lines[Math.floor(Math.random() * lines.length)]);
    }, 1700);
  };

  // the form, on its own screen after "Grab it Now": name and Instagram handle (both needed), plus the follow step
  screens.enter = function () {
    if (S.entered) return screens.giveaway();
    return heroPill('Official giveaway', 'by Modulus Seventeen') + head('Enter the <span class="ser">Giveaway</span>') +
      prizeStrip() +
      '<section class="idea entry scr d2">' +
        '<div class="es"><span class="es-n">1</span><span class="es-t"><b>Follow ' + CONFIG.instagramHandle + '</b><small>We check every entry by hand before the draw.</small></span></div>' +
        followBox() +
        '<div class="es-sep"></div>' +
        '<div class="es"><span class="es-n">2</span><span class="es-t"><b>Your details</b><small>We\'ll message the winner on Instagram. One entry per person.</small></span></div>' +
        '<div class="field"><label for="gw-name">Your name</label><input id="gw-name" type="text" autocomplete="name" maxlength="40" placeholder="e.g. Riya Shah" value="' + esc(S.name) + '"></div>' +
        '<div class="field"><label for="gw-ig">Instagram handle</label><div class="phone-row"><span class="cc">@</span><input id="gw-ig" type="text" autocapitalize="none" autocorrect="off" spellcheck="false" autocomplete="off" maxlength="31" placeholder="yourhandle" value="' + esc(S.ig) + '"></div></div>' +
        '<button class="btn btn-dark pbtn idea-btn" id="participate" data-act="participate"><span>Participate Now</span></button>' +
      '</section>';
  };

  // the prize, small: it was already shown big on the video screen and when the box opened
  function prizeStrip() {
    return '<div class="prize-strip scr d1"><span class="gw-img"><img src="' + CONFIG.prize.image + '" alt="" width="581" height="720"></span>' +
      '<span class="gw-name"><small>Giveaway prize</small><b>' + esc(CONFIG.prize.name) + '</b></span>' +
      '<span class="ps-r"><b>' + CONFIG.prize.worth + '</b><span class="off-chip">Free</span></span></div>';
  }
  function followBox() {
    return '<div class="follow-box" id="followbox">' +
      (S.followed ? '<p class="followed">' + I.check + 'Thanks for following! We\'ll verify it before the draw.</p>' : '') +
      '<a class="btn btn-ig pbtn" href="' + CONFIG.instagramUrl + '" target="_blank" rel="noopener" data-act="igopen"><span>' + (S.followed ? 'Open our Instagram' : 'Follow on Instagram') + '</span><span class="ic">' + I.igBig + '</span></a></div>';
  }

  // the prize as one of the BUY store's product cards
  function prizeCard() {
    return '<section class="prize-card scr d1">' +
      '<div class="p-img"><img src="' + CONFIG.prize.image + '" alt="' + esc(CONFIG.prize.name) + '" width="581" height="720"></div>' +
      '<div class="p-meta"><span class="p-kick">Giveaway prize</span><b class="p-name">' + esc(CONFIG.prize.name) + '</b>' +
      '<span class="p-row"><span class="p-worth">Worth <b>' + CONFIG.prize.worth + '</b></span><span class="off-chip">Free to enter</span></span></div>' +
    '</section>';
  }

  function openGift() {
    if (S.giftOpened) return;
    var btn = $('#giftbtn'); if (!btn || btn.classList.contains('open')) return;
    btn.classList.add('open');
    if (isM17()) {
      botSay('sell', 'Woohoo!'); botSay('buy', 'Hahaha, look!');
      var hint = $('#taphint'); if (hint) hint.remove();
      later(function () { burstOn(btn, 30, 110, true); }, reduced ? 0 : 420);
      later(function () {
        S.giftOpened = true;
        var h = $('#gwhead'); if (h) h.innerHTML = giftHead(true);
        $('#giftstage').insertAdjacentHTML('afterend', revealCard(true));
        var rc = $('#revealcard');
        if (rc && rc.getBoundingClientRect().bottom > window.innerHeight) window.scrollTo({ top: rc.getBoundingClientRect().top + window.scrollY - 140, behavior: reduced ? 'auto' : 'smooth' });
      }, reduced ? 0 : 750);
      return;
    }
    var stageEl = $('#giftstage');
    stageEl.querySelectorAll('.stage, .who').forEach(function () {});
    $$('.gift-row .chr', stageEl).forEach(function (c) { c.style.animation = 'jump .7s cubic-bezier(.3,.6,.4,1) infinite'; });
    later(function () {
      burstOn(btn, 34, 120);
      confetti(true, 1800);
    }, 450);
    later(function () { S.giftOpened = true; clearTimers(); render(); }, reduced ? 50 : 1250);
  }

  // a firework of colour from the middle of host (it needs position: relative); n pieces flying up to reach px
  function burstOn(host, n, reach, force) {
    if (!host || reduced || (isM17() && !force)) return;
    var b = document.createElement('div'); b.className = 'burst';
    var m17 = isM17(), cols = m17 ? ['#261F8E', '#3F4EE3', '#A52226', '#00BD10', '#9FA8FF', '#232323'] : ['#FFB81C', '#FF3D8B', '#FFF1DC', '#FF7A1A', '#0F7A68', '#C8105A'], h = '<span class="flash"></span>';
    for (var i = 0; i < n; i++) {
      var a = (Math.PI * 2 * i) / n + Math.random() * .3, d = reach * .75 + Math.random() * reach;
      h += '<i style="background:' + cols[i % cols.length] + ';--dx:' + (Math.cos(a) * d).toFixed(0) + 'px;--dy:' + (Math.sin(a) * d - 30).toFixed(0) + 'px;--r:' + (Math.random() * 720 - 360).toFixed(0) + 'deg;' + (m17 ? 'border-radius:2px;' : (i % 3 ? '' : 'border-radius:50%;')) + 'animation-delay:' + (Math.random() * .08).toFixed(2) + 's"></i>';
    }
    b.innerHTML = h; host.appendChild(b);
    setTimeout(function () { b.remove(); }, 1400);
  }

  function fail(inp, message) {
    inp.classList.remove('err'); void inp.offsetWidth; inp.classList.add('err');
    inp.focus();
    toast(message);
  }
  function participate() {
    var inp = $('#gw-name'), ig = $('#gw-ig');
    var v = (inp.value || '').trim();
    S.name = v;
    if (v.length < 2) return fail(inp, 'Add your name so we know who to announce!');
    S.ig = cleanIg(ig.value);
    if (!S.ig) return fail(ig, 'Add your Instagram handle so we can reach you if you win.');
    store('m17-garba-name', v);
    store('m17-garba-ig', S.ig);
    enterGiveaway();
  }
  // an Instagram username: letters, digits, dots and underscores, up to 30 (a typed @ is dropped)
  function cleanIg(raw) { return String(raw || '').trim().replace(/^@+/, '').replace(/[^A-Za-z0-9._]/g, '').slice(0, 30); }

  /* ---------- "did you follow?": asked once, when they come back from Instagram. Follows are checked by hand. ---------- */
  function openModal(state) { S.modal = state; renderModal(); }
  function closeModal(silent) {
    S.modal = null;
    modalRoot.innerHTML = '';
    document.body.style.overflow = '';
    if (!silent) { var p = $('#participate'); if (p) p.focus({ preventScroll: true }); }
  }
  function renderModal() {
    if (!S.modal) { closeModal(true); return; }
    document.body.style.overflow = 'hidden';
    var body = stage('wave') +
      '<h2 id="mtitle">Did you follow ' + CONFIG.instagramHandle + '?</h2>' +
      '<p>Just tell us once. We check every entry by hand before picking the winner.</p>' +
      '<button class="btn btn-dark pbtn" data-act="fyes"><span>Yes, I followed</span></button>' +
      '<button class="btn-ghost pbtn" data-act="fno">Not yet</button>';
    modalRoot.innerHTML = '<div class="overlay" data-act="overlay"><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="grab"></div>' +
      '<button class="x" data-act="mclose" aria-label="Close">' + I.x + '</button><div class="sheet-body">' + body + '</div></div></div>';
    var first = $('.sheet .btn', modalRoot); if (first) first.focus({ preventScroll: true });
  }
  function answerFollow(yes) {
    S.followed = yes;
    store('m17-garba-followed', yes ? 'yes' : 'no');
    closeModal(true);
    var box = $('#followbox'); if (box) box.outerHTML = followBox();
    toast(yes ? 'Thanks! We\'ll verify it before the draw.' : 'No problem. Follow any time before the draw.');
    if (yes) botSay('sell', 'Thank you!');
  }
  function onIgReturn() {
    if (!S.igOpenedAt || Date.now() - S.igOpenedAt < 1000) return;
    S.igOpenedAt = 0;
    if (S.followed !== undefined || S.screen !== 'enter' || S.entered) return;
    openModal('follow');
  }
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') setTimeout(onIgReturn, 300); });
  window.addEventListener('focus', function () { setTimeout(onIgReturn, 300); });

  function enterGiveaway() {
    if (S.saving) return;
    S.saving = true;
    var btn = $('#participate'); if (btn) { btn.disabled = true; btn.firstChild.textContent = 'Saving…'; }
    var shown = S.name.trim();
    var name = CONFIG.handleInName ? shown.slice(0, Math.max(2, 60 - S.ig.length - 4)).trim() + ' · @' + S.ig : shown;
    var body = { name: name, visitorId: visitorId(), instagramHandle: S.ig };
    if (S.followed !== undefined) body.instagramFollowed = S.followed;
    if (S.source) body.source = S.source;
    api('POST', '/entry', body).then(function (d) {
      S.saving = false;
      S.entered = true;
      S.entryNumber = d.entryNumber || '';
      store('m17-garba-entry', S.entryNumber || '1');
      closeModal(true);
      go('done');
    }, function (e) {
      S.saving = false;
      closeModal(true);
      var b2 = $('#participate'); if (b2) { b2.disabled = false; b2.firstChild.textContent = 'Participate Now'; }
      // 409 = this device is already in: say so instead of a generic error
      toast(e && e.status === 409 ? e.message : 'Could not save your entry. Please try again in a moment.');
    });
  }

  /* ---------- done ---------- */
  screens.done = function () {
    var first = esc(S.name.split(' ')[0] || 'friend');
    var entry = esc(S.entryNumber);
    var c = (2 * Math.PI * 19).toFixed(2);
    return '<section class="redir-card scr" id="redircard">' +
        '<div class="rd-top"><div class="ring rd-ring"><svg viewBox="0 0 46 46"><circle class="trk" cx="23" cy="23" r="19"/><circle class="bar" id="ringbar" cx="23" cy="23" r="19" stroke-dasharray="' + c + '" stroke-dashoffset="0"/></svg><b id="ringnum">' + CONFIG.redirectSeconds + '</b></div>' +
        '<div class="rd-txt"><span class="rd-k"><span class="dot"></span>Entry saved · redirecting</span><b id="rdline">Taking you to Modulus Seventeen in <span id="ringtxt">' + CONFIG.redirectSeconds + ' seconds</span></b></div></div>' +
        '<p class="rd-why" id="rdwhy"><b>Why?</b> Your entry is saved and there\'s nothing more to do. Modulus Seventeen runs this giveaway, so while you wait for the draw we\'re showing you what we build for Indian businesses. You can come back here any time.</p>' +
        '<div class="rd-acts" id="rdacts"><a class="btn btn-dark pbtn" href="' + CONFIG.siteUrl + '">Go now</a><button class="btn-ghost pbtn" data-act="stay">Stay here</button></div>' +
      '</section>' +
      head('You\'re In, <span class="ser">' + first + '!</span>', 'Your entry is locked for the ' + CONFIG.event + ' giveaway.') +
      '<div class="scene-wrap scr d1">' + duo('party', { sell: 'You\'re in!', buy: 'Good luck!', mid17: '<span class="duo-mid cele" id="cele"></span>' }) + '</div>' +
      '<section class="hc sell scr d1">' +
        '<div class="hc-top"><div class="hc-id"><span class="hc-label">' + miniLogo() + 'Entry confirmed</span><span class="paid">' + I.check + ' Saved</span></div>' +
        '<div class="hc-right"><small class="hc-cap">Entry no.</small><span class="hc-amt entry-no">' + entry + '</span></div></div>' +
        '<div class="gw-prod"><span class="gw-img"><img src="' + CONFIG.prize.image + '" alt="" width="581" height="720"></span><span class="gw-name"><small>Giveaway prize</small><b>' + esc(CONFIG.prize.name) + '</b><small>Worth ' + CONFIG.prize.worth + '</small></span></div>' +
      '</section>' +
      '<h3 class="mini-title scr d2">What happens <span class="ser">next</span></h3>' +
      qaList([
        ['Keep following ' + CONFIG.instagramHandle, 'The winner is announced on our Instagram page.'],
        ['Check your Instagram messages', 'We\'ll message the winner at @' + esc(S.ig || 'your handle') + '.']
      ]) +
      '<section class="cta-final scr d3">' +
        '<span class="cta-orn">' + LOGO + '</span>' +
        '<h2 class="cta-title">Bring Your Business Online,<span class="ser">Without Losing What Makes It Yours.</span></h2>' +
        '<p class="cta-sub">Free to start on SELL · Zero commission on BUY orders</p>' +
        arrowBtn('Get Started with SELL', 'href="' + CONFIG.siteUrl + '"') +
        '<a class="btn-ghost pbtn" href="' + CONFIG.siteUrl + '">Explore BUY</a>' +
      '</section>' +
      '<button class="btn-ghost light pbtn scr d4" data-act="share"><span class="lbl">' + I.share + ' Share with your Garba gang</span></button>';
  };
  // the countdown, then the party: a pixel burst between the bots, twice
  screens.done.after = function () {
    startCountdown();
    [350, 1300].forEach(function (ms) { later(function () { burstOn($('#cele'), 26, 95, true); }, ms); });
  };
  // "Stay here": stop the redirect and say so
  function stayHere() {
    clearTimers();
    if (!reduced) every(blinkSomeone, 2600);
    var card = $('#redircard'); if (!card) return;
    card.classList.add('stopped');
    $('#rdline').textContent = 'Redirect stopped. You\'re staying here.';
    $('#rdwhy').innerHTML = 'Visit Modulus Seventeen whenever you like. Your entry stays saved either way.';
    $('#rdacts').innerHTML = '<a class="btn btn-dark pbtn" href="' + CONFIG.siteUrl + '">Visit Modulus Seventeen</a>';
  }

  /* ---------------- fx ---------------- */
  function confetti(on, ms) {
    if (reduced) return;
    if (!on) { fx.innerHTML = ''; return; }
    if (isM17()) return;
    var m17 = isM17(), cols = m17 ? ['#261F8E', '#3F4EE3', '#A52226', '#00BD10', '#9FA8FF'] : ['#FFB81C', '#FF3D8B', '#FFF1DC', '#FF7A1A', '#0F7A68'], h = '';
    for (var i = 0; i < 26; i++) {
      h += '<span class="conf" style="left:' + (Math.random() * 98).toFixed(1) + '%;background:' + cols[i % 5] + ';animation-delay:' + (Math.random() * 2.4).toFixed(2) + 's;animation-duration:' + (2.2 + Math.random() * 1.6).toFixed(2) + 's;' + (m17 ? 'border-radius:1px;' : (i % 4 === 0 ? 'border-radius:50%;width:9px;height:9px;' : '')) + '"></span>';
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
    // the clean page address: no ?utm_... (so shared links don't count as poster scans) and no index.html
    var url = location.origin + location.pathname.replace(/index\.html$/, '');
    var data = { title: 'I just found my Garba partner', text: 'Look who I got matched with this ' + CONFIG.event + '! 💃', url: url };
    try {
      if (navigator.share) navigator.share(data).then(countShare, function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast('Link copied!'); countShare(); });
    } catch (e) {}
  }

  // a share that really happened is counted once per device, so tapping again doesn't inflate the number
  function countShare() {
    if (store('m17-garba-shared')) return;
    store('m17-garba-shared', '1');
    S.crowd.shares++;
    showShares();
    if (S.screen === 'video') refreshQuest('share');
    api('POST', '/share').then(setCrowd, function () {});
  }

  /* ---------------- render ---------------- */
  function renderFoot() {
    if (isM17()) {
      foot.innerHTML = '<a class="foot-logo" href="' + CONFIG.siteUrl + '" target="_blank" rel="noopener" aria-label="Modulus Seventeen">' + LOGO + '</a>' +
        '<span class="foot-brand"><b>Modulus Seventeen</b>India\'s most affordable Business Ecosystem</span>';
      return;
    }
    foot.innerHTML = '<a class="foot-logo" href="' + CONFIG.siteUrl + '" target="_blank" rel="noopener" aria-label="Modulus Seventeen">' + LOGO + '</a>' +
      '<span>A ' + CONFIG.event + ' campaign by <a href="' + CONFIG.siteUrl + '" target="_blank" rel="noopener">Modulus Seventeen</a>. One ecosystem for every Indian business.</span>';
  }
  function render() {
    var m17 = isM17();
    document.body.classList.toggle('m17', m17);
    var tc = document.querySelector('meta[name=theme-color]'); if (tc) tc.setAttribute('content', m17 ? '#FCFCFD' : '#4A0A1C');
    renderFoot();
    renderHeader();
    renderProgress();
    onScroll();
    if (S.screen !== 'found' && S.screen !== 'done') fx.innerHTML = '';
    screenEl.innerHTML = screens[S.screen]();
    if (screens[S.screen].after) screens[S.screen].after();
    if (m17 && !reduced) every(blinkSomeone, 2600);
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
      case 'play': toggleScript(); break;
      case 'scpart': S.playing = true; showPart(+t.dataset.i); break;
      case 'vote': vote(t.dataset.v, t); break;
      case 'share': share(); break;
      case 'opengift': openGift(); break;
      case 'bot': poke(t, BOT_LINES[t.dataset.bot][Math.floor(Math.random() * BOT_LINES[t.dataset.bot].length)]); break;
      case 'participate': participate(); break;
      case 'igopen': S.igOpenedAt = Date.now(); break;   // the "did you follow?" question waits for them to come back
      case 'fyes': answerFollow(true); break;
      case 'fno': answerFollow(false); break;
      case 'mclose': closeModal(); break;
      case 'stay': stayHere(); break;
      case 'overlay': if (e.target === t) { closeModal(); } break;
    }
  });
  document.addEventListener('input', function (e) {
    if (e.target.id === 'gw-name') { S.name = e.target.value; e.target.classList.remove('err'); }
    if (e.target.id === 'gw-ig') { S.ig = e.target.value; e.target.classList.remove('err'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.modal) closeModal();
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('bot')) { e.preventDefault(); e.target.click(); }
    if (e.key === 'Enter' && (e.target.id === 'gw-name' || e.target.id === 'gw-ig')) { e.preventDefault(); participate(); }
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
  // Count a QR scan once per browser tab, then load the real totals for the meter.
  var scanned = false;
  try { scanned = !!sessionStorage.getItem('m17-garba-scanned'); } catch (e) {}
  if (S.source && !scanned) {
    api('POST', '/scan', { source: S.source }).then(function () {
      try { sessionStorage.setItem('m17-garba-scanned', '1'); } catch (e) {}
    }, function () {});
  }
  api('GET', '').then(setCrowd, function () {});
  // the counts are live: re-read them every minute so shares (and votes) from other people show up
  setInterval(function () {
    if (document.visibilityState === 'visible' && !votePending) api('GET', '').then(setCrowd, function () {});
  }, CONFIG.shareRefreshMs);

  var start = (location.hash || '').slice(1);
  if (!screens[start] || (start === 'done' && !S.entered)) start = 'age';
  S.screen = start;
  try { history.replaceState({ s: start }, '', '#' + start); } catch (e) {}
  render();
})();
