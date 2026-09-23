/*
 * Universal navigation for Class Tools local tools.
 *
 * Every tool page includes this with:
 *   <script src="./_nav.js"></script>
 *
 * On load it injects a fixed left sidebar listing every "enabled" app.
 * The Settings (gear) button at the bottom opens a modal where the
 * teacher can drag rows to reorder, remove apps into an "Additional
 * Apps" section, add back later, or add a new app. Changes are saved
 * to localStorage so they persist between visits to the SAME page.
 *
 * About persistence: browsers isolate localStorage per file:// URL,
 * so a customization made on the dashboard does not automatically
 * appear on student-cards.html etc. The modal includes a code preview
 * so the teacher can copy their preferred APPS order and ask Claude
 * Cowork to update DEFAULT_APPS in this file — that change becomes the
 * default for every page.
 *
 * Two app lists, two owners:
 *   DEFAULT_APPS  — the shipped tools. ENGINE-OWNED: this whole file is
 *                   replaced wholesale on a project update. Claude Cowork
 *                   edits it only when a new tool ships with the project.
 *   window.MY_APPS — the teacher's own built apps, defined in
 *                   my-classroom/my-apps.js and loaded by each tool page
 *                   BEFORE this file. Teacher-owned; updates never touch it.
 *                   It may be absent (a fresh install has no my-classroom/
 *                   folder) — every read of it below is defensive.
 *
 * Aggregate text only — NEVER include student names, grades, or
 * per-student data in this file.
 */

const ICONS = {
  home:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg>',
  award:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M8.5 12.5L7 21l5-3 5 3-1.5-8.5"/></svg>',
  pulse:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 12 7 12 10 4 14 20 17 12 21 12"/></svg>',
  megaphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M16 8a4 4 0 0 1 0 8"/></svg>',
  chart:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="20" x2="6" y2="11"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="14"/></svg>',
  mail:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>',
  users:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 5 5"/></svg>',
  idcard:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2.5"/><path d="M6.5 16a3 3 0 0 1 5 0"/><line x1="14" y1="10" x2="18" y2="10"/><line x1="14" y1="14" x2="18" y2="14"/></svg>',
  book:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  build:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.6 6.4a3.8 3.8 0 0 0-5 5L3 18l3 3 6.6-6.6a3.8 3.8 0 0 0 5-5l-2.6 2.6-2.4-2.4z"/></svg>',
  gear:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>'
};

// DEFAULT_APPS is the canonical, global app list. Claude Cowork edits
// this when a new tool ships. The teacher's per-page customizations
// live in localStorage and override this list on a per-page basis.
const DEFAULT_APPS = [
  { id: 'classai-dashboard',   label: 'Class Tools',         file: 'ClassAI-dashboard.html',   description: 'The home page: what each app does and how it fits with your chat', icon: 'home' },
  { id: 'student-cards',       label: 'Progress Cards',      file: 'student-cards.html',       description: 'Print each student a card of what they still owe. Before a catch-up day.', icon: 'idcard' },
  { id: 'parent-messages',     label: 'Parent Messages',     file: 'parent-messages.html',     description: 'A note home for every student from one template. Before conferences or report cards.', icon: 'mail' },
  { id: 'gradebook-analytics', label: 'Gradebook Analytics', file: 'gradebook-analytics.html', description: 'Every student, sorted by missing work. When you want the full picture.', icon: 'chart' },
  { id: 'class-pulse',         label: 'Class Pulse',         file: 'class-pulse.html',         description: 'Your weekly class summary for the chat, no names. Once a week, if your challenge is missing work.', icon: 'pulse' },
  { id: 'student-voice',       label: 'Feedback Cleaner',    file: 'student-voice.html',       description: 'Takes names out of student survey answers. After a class survey.', icon: 'megaphone' },
  { id: 'badges',              label: 'Badges',              file: 'badges.html',              description: 'Print certificates for effort and comebacks. On celebration days.', icon: 'award' },
  { id: 'random-groups',       label: 'Random Groups',       file: 'random-groups.html',       description: 'Fair groups that keep chosen students apart. Before group work.', icon: 'users' },
  { id: 'app-studio',          label: 'App Studio',          file: 'app-studio.html',          description: 'Ideas for new apps your AI can build. When you wish a tool existed.', icon: 'build' },
  { id: 'demo-semester',       label: 'Demo Semester',       file: 'demo-semester.html',       description: 'A made-up class through a whole term. Before you start, to see how it works.', icon: 'book' }
];

// ---- Demo class ------------------------------------------------------
// CLASSAI_DEMO is the FICTIONAL sandbox class — the same invented students
// as sandbox/fictional-gradebook.csv — embedded here so any tool can offer
// a one-click "Try the demo class" button. (file:// blocks fetch(), so the
// data must live inline.) These are made-up names for made-up students.
// Real student data must NEVER be embedded in this file — fictional demo
// data only.
const CLASSAI_DEMO = {
  fileName: 'fictional-gradebook.csv',
  csv: `Student,Period,Vocab Quiz 1 (10),Reading Response Ch 1-3 (15),Character Map (20),Vocab Quiz 2 (10),Theme Essay Outline (25),Reading Response Ch 4-6 (15),Theme Essay Draft (50),Peer Review (10)
Ali Ahmadi,P1,9,14,18,8,22,13,45,9
Brooke Carlson,P1,10,15,20,10,25,15,48,10
Carlos Diaz,P1,7,Missing,15,6,18,Missing,Missing,Missing
Devon Edwards,P1,8,12,Missing,9,20,11,42,8
Eliana Fischer,P1,Missing,Missing,Missing,Missing,Missing,Missing,Missing,Missing
Farrah Gomez,P1,10,15,19,9,24,14,47,10
Gavin Huang,P1,6,11,14,Missing,Missing,12,38,Missing
Hana Ibrahim,P1,9,13,17,8,21,Missing,Missing,9
Isaac Johnson,P1,Missing,10,Missing,Missing,15,Missing,30,Missing
Jada Kim,P1,10,14,20,10,23,15,49,10
Kai Lawson,P1,5,Missing,12,7,Missing,Missing,Missing,8
Lila Martinez,P1,8,13,16,9,22,13,44,9
Mateo Nguyen,P3,9,14,18,9,23,14,46,10
Nora Okafor,P3,Missing,Missing,Missing,Missing,Missing,Missing,Missing,Missing
Owen Park,P3,7,12,Missing,8,Missing,11,40,Missing
Priya Quinn,P3,10,15,20,10,25,15,50,10
Quinn Rivera,P3,6,Missing,13,Missing,17,12,Missing,8
Ravi Singh,P3,9,14,17,9,22,14,45,9
Sofia Torres,P3,8,13,15,8,20,Missing,38,Missing
Tariq Underwood,P3,Missing,11,Missing,7,Missing,Missing,32,Missing
Uma Valdez,P3,10,15,19,10,24,15,48,10
Vincent Walker,P3,7,12,14,Missing,Missing,12,Missing,Missing
Wren Xu,P3,9,13,18,9,23,14,46,9
Yasmin Zhao,P3,Missing,Missing,16,8,21,13,42,Missing
`,
  makeFile() {
    return new File([this.csv], this.fileName, { type: 'text/csv' });
  }
};

// The homepage's mark: a sticky note inside the orange marker loop.
const BRAND_MARK = '<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="17" fill="#FAF6EE" fill-opacity=".08"/><rect x="1" y="1" width="62" height="62" rx="16" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="2"/><rect x="16" y="16" width="30" height="30" rx="3" fill="#FFE67E" transform="rotate(-6 31 31)"/><path d="M16.4 19.6l29.8-3.1.5 4.3-29.8 3.1z" fill="#14231F" opacity=".09"/><path d="M36 10.6C20 10.2 9 19 9 32s11 23 25 22 21-10 21-23c0-8-3.8-13.6-10.6-17.8" fill="none" stroke="#FF5A1F" stroke-width="4" stroke-linecap="round"/></svg>';

const STORAGE_KEY = 'classai-nav-v2';

// The teacher's own apps, read from window.MY_APPS (my-classroom/my-apps.js).
// Returns [] if that file is missing, malformed, or not an array — which is the
// normal case on a fresh install, so this must never throw. Each entry is
// tagged `teacher: true`, which drives the "Your apps" divider in the sidebar
// and keeps them out of the DEFAULT_APPS code export in Settings.
// Teacher entries carry only { id, label, file, description }; the icon is
// filled in here so the app-builder skill never has to know the ICONS table.
function teacherApps() {
  const list = (typeof window !== 'undefined' && Array.isArray(window.MY_APPS)) ? window.MY_APPS : [];
  return list.filter(isValidApp).map(a => {
    const app = deepCopy(a);
    app.teacher = true;
    if (!app.icon || !ICONS[app.icon]) app.icon = 'build';
    return app;
  });
}

function defaultState() {
  return { enabled: deepCopy(DEFAULT_APPS).concat(teacherApps()), disabled: [] };
}

function deepCopy(x) { return JSON.parse(JSON.stringify(x)); }

function isValidApp(a) {
  return a && typeof a.id === 'string' && typeof a.label === 'string' && typeof a.file === 'string';
}

function loadState() {
  try {
    const mine = teacherApps();
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw);
    if (!s || !Array.isArray(s.enabled) || !Array.isArray(s.disabled)) return defaultState();
    let enabled = s.enabled.filter(isValidApp);
    let disabled = s.disabled.filter(isValidApp);
    if (enabled.length === 0 && disabled.length === 0) return defaultState();

    // Teacher apps are owned by my-apps.js, not by this page's saved settings.
    // Drop any that no longer exist there (app deleted, or the whole
    // my-classroom/ folder absent) and refresh the rest from the file, so a
    // renamed label shows up without the teacher clearing their settings.
    // Shipped tools refresh the same way from DEFAULT_APPS, so a relabelled
    // tool (say, "Home" → "Class Tools") updates for teachers who reordered.
    const mineById = new Map(mine.map(a => [a.id, a]));
    const shippedById = new Map(DEFAULT_APPS.map(a => [a.id, a]));
    const stillExists = a => !a.teacher || mineById.has(a.id);
    const refresh = a => (a.teacher ? deepCopy(mineById.get(a.id))
      : shippedById.has(a.id) ? deepCopy(shippedById.get(a.id)) : a);
    enabled = enabled.filter(stillExists).map(refresh);
    disabled = disabled.filter(stillExists).map(refresh);

    // Apps added to DEFAULT_APPS (a project update) or to my-apps.js (a newly
    // built app) after the user saved their settings would otherwise never
    // appear. Merge any unknown ones in.
    const known = new Set(enabled.concat(disabled).map(a => a.id));
    for (const app of DEFAULT_APPS.concat(mine)) {
      if (!known.has(app.id)) enabled.push(deepCopy(app));
    }
    return { enabled, disabled };
  } catch {
    return defaultState();
  }
}

// Shipped tools sit beside the tool pages ("badges.html"); teacher apps live
// outside local-tools/ and already carry a relative prefix ("../my-classroom/…").
function appHref(file) {
  return /^\.\.?\//.test(file) ? file : './' + file;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

let state = loadState();

(function injectUniversalNav() {
  const currentFile = (location.pathname.split('/').pop() || '').toLowerCase();

  const style = document.createElement('style');
  style.textContent = `
    /* ==================================================================
       Class Tools shell, "Chalk & Marker" (matches the homepage: site-v2/design.md).
       Fonts are bundled in ./fonts/ (SIL Open Font License), so nothing is
       fetched from the internet. Shared tokens are prefixed --ct- so they
       never collide with a tool page's own :root variables.
       ================================================================== */
    @font-face { font-family: "Bricolage Grotesque"; src: url("./fonts/bricolage-grotesque.woff2") format("woff2"); font-weight: 500 800; font-display: swap; }
    @font-face { font-family: "Figtree"; src: url("./fonts/figtree.woff2") format("woff2"); font-weight: 400 800; font-display: swap; }
    @font-face { font-family: "Caveat"; src: url("./fonts/caveat.woff2") format("woff2"); font-weight: 500 700; font-display: swap; }
    @font-face { font-family: "DM Mono"; src: url("./fonts/dm-mono-400.woff2") format("woff2"); font-weight: 400; font-display: swap; }
    @font-face { font-family: "DM Mono"; src: url("./fonts/dm-mono-500.woff2") format("woff2"); font-weight: 500; font-display: swap; }

    :root {
      --ct-ink: #14231F; --ct-ink-2: #3F4F49; --ct-ink-3: #5A6862; --ct-ink-4: #A7B1AC;
      --ct-line: rgba(20,35,31,.10); --ct-line-2: rgba(20,35,31,.18);
      --ct-paper: #FAF6EE; --ct-paper-2: #F3EDE1; --ct-card: #FFFFFF;
      --ct-chalk: #14231F; --ct-chalk-2: #1D302A; --ct-chalk-3: #26392F;
      --ct-on-chalk: #F6F2E8; --ct-on-chalk-2: #B7C4BD; --ct-on-chalk-3: #93A39B;
      --ct-orange: #FF5A1F; --ct-orange-ink: #C24410; --ct-orange-tint: #FFE3D3;
      --ct-note-sun: #FFE67E; --ct-mint-ink: #1D8A51; --ct-coral: #FFE6DD; --ct-coral-ink: #D2573A;
      --ct-focus: #2D66DB;
      --ct-f-display: "Bricolage Grotesque", "Figtree", system-ui, sans-serif;
      --ct-f-body: "Figtree", system-ui, -apple-system, "Segoe UI", sans-serif;
      --ct-f-hand: "Caveat", "Bradley Hand", cursive;
      --ct-f-mono: "DM Mono", ui-monospace, "SF Mono", Menlo, monospace;
      --ct-sh-1: 0 1px 2px rgba(20,35,31,.07), 0 1px 1px rgba(20,35,31,.04);
      --ct-sh-2: 0 1px 2px rgba(20,35,31,.06), 0 4px 10px -2px rgba(20,35,31,.07), 0 16px 30px -14px rgba(20,35,31,.16);
      --ct-sh-3: 0 2px 4px rgba(20,35,31,.05), 0 14px 26px -8px rgba(20,35,31,.12), 0 42px 80px -28px rgba(20,35,31,.26);
      --ct-ease: cubic-bezier(.22,1,.36,1);
    }

    /* Shared "Load demo class" button (tool pages; made-up students) */
    .demo-btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      margin-top: 8px; min-height: 42px; padding: 0 16px;
      border: 0; border-radius: 11px;
      background: var(--ct-card); color: var(--ct-ink);
      box-shadow: var(--ct-sh-1), inset 0 0 0 1px var(--ct-line-2);
      font: 750 15px/1.15 var(--ct-f-body); letter-spacing: -.005em;
      cursor: pointer; white-space: nowrap;
      transition: transform .2s var(--ct-ease), box-shadow .2s var(--ct-ease), background-color .2s var(--ct-ease);
    }
    .demo-btn:hover { transform: translateY(-1px); box-shadow: var(--ct-sh-2), inset 0 0 0 1px var(--ct-line-2); }
    .demo-btn:active { transform: translateY(1px); box-shadow: inset 0 0 0 1px var(--ct-line-2); transition-duration: .12s; }
    .demo-btn:focus-visible { outline: none; box-shadow: var(--ct-sh-1), inset 0 0 0 1px var(--ct-line-2), 0 0 0 3px var(--ct-paper), 0 0 0 5.5px var(--ct-focus); }
    @media print { .demo-btn { display: none; } }

    /* ---- Shared app-page header: a chalkboard sheet, like the homepage's closing section.
       App name is the <h1>; the one-line description is the <h2> below it. ---- */
    .app-hero {
      position: relative; overflow: hidden; isolation: isolate;
      background:
        radial-gradient(60% 70% at 18% 20%, rgba(255,255,255,.05), transparent 70%),
        radial-gradient(50% 80% at 88% 90%, rgba(255,255,255,.035), transparent 70%),
        var(--ct-chalk);
      color: var(--ct-on-chalk); border-radius: 24px; padding: 26px 28px; margin-bottom: 22px;
      display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
      box-shadow: var(--ct-sh-2);
      font-family: var(--ct-f-body);
    }
    .app-hero .app-hero-ico {
      flex: 0 0 auto; width: 56px; height: 56px; border-radius: 3px 3px 4px 12px;
      background: linear-gradient(to bottom, #EBD06C 0 12px, var(--ct-note-sun) 12px);
      color: var(--ct-ink); transform: rotate(-4deg);
      box-shadow: 0 1px 1px rgba(0,0,0,.2), 0 10px 18px -8px rgba(0,0,0,.55);
      display: inline-flex; align-items: center; justify-content: center; padding-top: 6px;
    }
    .app-hero .app-hero-ico svg { width: 28px; height: 28px; }
    .app-hero .app-hero-text { flex: 1 1 320px; min-width: 0; }
    .app-hero h1 {
      margin: 0; font: 750 30px/1.08 var(--ct-f-display); letter-spacing: -.024em;
      font-variation-settings: "opsz" 48; color: var(--ct-on-chalk); text-wrap: balance;
    }
    .app-hero h2 { margin: 7px 0 0; font: 500 16.5px/1.45 var(--ct-f-body); color: var(--ct-on-chalk-2); max-width: 64ch; text-wrap: pretty; }
    .app-hero .app-hero-action { flex: 0 0 auto; }
    .app-hero .app-hero-btn {
      display: inline-flex; align-items: center; min-height: 44px; padding: 0 18px;
      border: 0; border-radius: 12px; background: var(--ct-on-chalk); color: var(--ct-ink);
      font: 750 15px/1.15 var(--ct-f-body); cursor: pointer;
      box-shadow: 0 1px 2px rgba(0,0,0,.25);
      transition: transform .2s var(--ct-ease), background-color .2s var(--ct-ease);
    }
    .app-hero .app-hero-btn:hover { transform: translateY(-1px); background: #FFFFFF; }
    .app-hero .app-hero-btn:active { transform: translateY(1px); }
    .app-hero .app-hero-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--ct-chalk), 0 0 0 5.5px #8DB1FF; }
    @media (max-width: 639px) {
      .app-hero { padding: 20px; border-radius: 20px; gap: 14px; }
      .app-hero h1 { font-size: 25px; }
    }
    @media print { .app-hero { display: none; } }

    /* ---- Sidebar: the chalkboard beside the desk ---- */
    .universal-nav {
      position: fixed;
      top: 0; left: 0; bottom: 0;
      width: 232px;
      box-sizing: border-box;
      background:
        radial-gradient(90% 40% at 20% 8%, rgba(255,255,255,.045), transparent 70%),
        radial-gradient(80% 35% at 70% 92%, rgba(255,255,255,.03), transparent 70%),
        var(--ct-chalk);
      color: var(--ct-on-chalk-2);
      padding: 18px 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow-y: auto;
      z-index: 100;
      font-family: var(--ct-f-body);
      font-size: 16px;
      line-height: 1.5;
      scrollbar-width: thin; scrollbar-color: var(--ct-chalk-3) transparent;
    }
    .universal-nav .un-brand {
      display: flex; align-items: center; gap: 11px;
      color: var(--ct-on-chalk);
      font: 750 19px/1.1 var(--ct-f-display); letter-spacing: -.02em; font-variation-settings: "opsz" 24;
      padding: 6px 10px 16px;
      border-bottom: 1px solid rgba(246,242,232,.10);
      margin-bottom: 10px;
      text-decoration: none;
      border-radius: 10px;
    }
    .universal-nav .un-brand svg { width: 34px; height: 34px; flex: none; }
    .universal-nav .un-item {
      display: flex;
      align-items: center;
      gap: 11px;
      min-height: 40px;
      padding: 8px 11px;
      border-radius: 10px;
      color: var(--ct-on-chalk-2);
      text-decoration: none;
      font-size: 15px; font-weight: 600;
      transition: background-color .18s var(--ct-ease), color .18s var(--ct-ease);
    }
    .universal-nav .un-item:hover { background: var(--ct-chalk-2); color: var(--ct-on-chalk); }
    /* the current page: a sheet of paper laid on the chalkboard */
    .universal-nav .un-item.active {
      background: var(--ct-paper); color: var(--ct-ink); font-weight: 750;
      box-shadow: 0 1px 1px rgba(0,0,0,.25), 0 8px 16px -10px rgba(0,0,0,.6);
    }
    .universal-nav .un-item.active .un-icon { opacity: 1; color: var(--ct-orange-ink); }
    .universal-nav .un-item:focus-visible, .universal-nav .un-brand:focus-visible, .universal-nav .un-settings:focus-visible {
      outline: none; box-shadow: 0 0 0 2.5px #8DB1FF;
    }
    .universal-nav .un-icon {
      flex-shrink: 0;
      width: 19px;
      height: 19px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      opacity: .85;
    }
    .universal-nav .un-icon svg { width: 100%; height: 100%; }
    .universal-nav .un-text { flex: 1; min-width: 0; }
    .universal-nav .un-label { display: block; line-height: 1.25; }
    .universal-nav .un-desc {
      display: block;
      font-size: 13px;
      color: var(--ct-on-chalk-3);
      margin-top: 2px;
    }
    .universal-nav .un-divider {
      margin: 16px 11px 6px;
      padding-top: 14px;
      border-top: 1px solid rgba(246,242,232,.10);
      font: 750 12px/1 var(--ct-f-body);
      text-transform: uppercase;
      letter-spacing: .08em;
      color: var(--ct-on-chalk-3);
    }
    .universal-nav .un-spacer { flex: 1; min-height: 16px; }
    .universal-nav .un-settings {
      display: flex;
      align-items: center;
      gap: 11px;
      min-height: 40px;
      padding: 8px 11px;
      border-radius: 10px;
      color: var(--ct-on-chalk-3);
      background: none;
      border: none;
      font: 600 15px/1.25 var(--ct-f-body);
      cursor: pointer;
      text-align: left;
      width: 100%;
      margin-top: 8px;
      position: relative;
      transition: background-color .18s var(--ct-ease), color .18s var(--ct-ease);
    }
    .universal-nav .un-settings::before {
      content: ""; position: absolute; left: 11px; right: 11px; top: -5px;
      border-top: 1px solid rgba(246,242,232,.10);
    }
    .universal-nav .un-settings:hover { color: var(--ct-on-chalk); background: var(--ct-chalk-2); }
    .universal-nav .un-settings .un-icon { opacity: .75; }
    body { margin-left: 232px; }
    ::selection { background: var(--ct-orange-tint); color: var(--ct-ink); }

    /* Topbar + drawer overlay are hidden until mobile. */
    .un-topbar { display: none; }
    .un-overlay-nav { display: none; }
    .universal-nav .un-close { display: none; }

    /* Mobile: the sidebar becomes an off-canvas drawer behind a menu button. */
    @media (max-width: 768px) {
      .universal-nav {
        width: 256px;
        transform: translateX(-100%);
        transition: transform .28s var(--ct-ease);
        box-shadow: 2px 0 24px rgba(0,0,0,.32);
        z-index: 1200;
      }
      .universal-nav.un-open { transform: translateX(0); }
      .universal-nav .un-close {
        display: inline-flex; align-items: center; justify-content: center;
        position: absolute; top: 16px; right: 10px; width: 40px; height: 40px;
        background: none; border: none; color: var(--ct-on-chalk-2); cursor: pointer; border-radius: 10px;
      }
      .universal-nav .un-close:hover { background: var(--ct-chalk-2); color: var(--ct-on-chalk); }
      .universal-nav .un-close svg { width: 22px; height: 22px; }
      body { margin-left: 0; padding-top: 56px; }

      .un-topbar {
        display: flex; align-items: center; gap: 10px;
        position: fixed; top: 0; left: 0; right: 0; height: 56px;
        box-sizing: border-box; padding: 0 10px;
        background: var(--ct-chalk); color: var(--ct-on-chalk);
        z-index: 1100;
        font-family: var(--ct-f-body);
        box-shadow: 0 1px 0 rgba(0,0,0,.2), 0 6px 16px -10px rgba(0,0,0,.5);
      }
      .un-hamburger {
        display: inline-flex; align-items: center; justify-content: center;
        width: 44px; height: 44px;
        background: none; border: none; cursor: pointer; color: var(--ct-on-chalk);
        border-radius: 10px;
      }
      .un-hamburger:hover { background: var(--ct-chalk-2); }
      .un-hamburger svg { width: 24px; height: 24px; }
      .un-topbar-brand {
        display: inline-flex; align-items: center; gap: 9px;
        color: var(--ct-on-chalk); font: 750 18px/1 var(--ct-f-display); letter-spacing: -.02em; text-decoration: none;
      }
      .un-topbar-brand svg { width: 28px; height: 28px; }

      .un-overlay-nav {
        display: block; position: fixed; inset: 0; z-index: 1150;
        background: rgba(20,35,31,.45);
        opacity: 0; pointer-events: none; transition: opacity .28s var(--ct-ease);
      }
      .un-overlay-nav.un-show { opacity: 1; pointer-events: auto; }
    }

    @media (prefers-reduced-motion: reduce) {
      .universal-nav, .un-overlay-nav, .demo-btn, .app-hero-btn { transition: none !important; }
    }

    @media print {
      .universal-nav { display: none; }
      .un-topbar, .un-overlay-nav { display: none !important; }
      .un-modal-overlay { display: none !important; }
      body { margin-left: 0 !important; padding-top: 0 !important; }
    }

    /* Settings dialog: paper and ink */
    .un-modal-overlay {
      position: fixed; inset: 0;
      background: rgba(20,35,31,.45);
      z-index: 1300;
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      font-family: var(--ct-f-body);
    }
    .un-modal {
      background: var(--ct-paper); border-radius: 20px;
      max-width: 640px; width: 100%; max-height: 90vh;
      display: flex; flex-direction: column;
      color: var(--ct-ink);
      box-shadow: var(--ct-sh-3), inset 0 0 0 1px var(--ct-line);
    }
    .un-modal-header {
      padding: 20px 22px 16px;
      border-bottom: 1px solid var(--ct-line);
      display: flex; justify-content: space-between; align-items: center;
    }
    .un-modal-header h2 { margin: 0; font: 750 22px/1.1 var(--ct-f-display); letter-spacing: -.02em; }
    .un-modal-close {
      background: none; border: none; font-size: 24px; cursor: pointer;
      color: var(--ct-ink-3); width: 40px; height: 40px; border-radius: 10px; line-height: 1;
    }
    .un-modal-close:hover { background: var(--ct-paper-2); color: var(--ct-ink); }
    .un-modal-body { padding: 18px 22px; overflow-y: auto; flex: 1; }
    .un-modal-footer {
      padding: 14px 22px; border-top: 1px solid var(--ct-line);
      display: flex; justify-content: space-between; align-items: center; gap: 10px;
    }
    .un-modal-footer .un-save-status { font-size: 13px; color: var(--ct-ink-3); font-weight: 600; }
    .un-modal-footer .un-save-status.error { color: #A83A22; }
    .un-modal-footer-actions { display: flex; gap: 10px; }
    .un-modal .un-btn {
      min-height: 42px; padding: 0 16px; border-radius: 11px; font: 750 15px/1.15 var(--ct-f-body);
      cursor: pointer; border: 0;
      transition: transform .2s var(--ct-ease), box-shadow .2s var(--ct-ease), background-color .2s var(--ct-ease);
    }
    .un-modal .un-btn:hover { transform: translateY(-1px); }
    .un-modal .un-btn:active { transform: translateY(1px); }
    .un-modal .un-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--ct-paper), 0 0 0 5.5px var(--ct-focus); }
    .un-modal .un-btn-primary { background: var(--ct-ink); color: var(--ct-on-chalk); box-shadow: var(--ct-sh-2); }
    .un-modal .un-btn-primary:hover { background: #1E3530; }
    .un-modal .un-btn-secondary { background: var(--ct-card); color: var(--ct-ink); box-shadow: var(--ct-sh-1), inset 0 0 0 1px var(--ct-line-2); }
    .un-modal h3.un-section-title {
      font: 750 12px/1.2 var(--ct-f-body); text-transform: uppercase; letter-spacing: .08em;
      color: var(--ct-ink-3); margin: 20px 0 10px;
    }
    .un-modal h3.un-section-title:first-child { margin-top: 0; }
    .un-modal hr { border: none; border-top: 1px dashed var(--ct-line-2); margin: 20px 0 14px; }

    /* Enabled list rows (draggable) */
    .un-edit-list { list-style: none; padding: 0; margin: 0; }
    .un-edit-row {
      position: relative;
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px;
      border-radius: 12px;
      margin-bottom: 6px;
      background: var(--ct-card);
      box-shadow: var(--ct-sh-1), inset 0 0 0 1px var(--ct-line);
      cursor: grab;
      user-select: none;
    }
    .un-edit-row:active { cursor: grabbing; }
    .un-edit-row.dragging { opacity: 0.4; }
    .un-edit-row[data-drop-pos="before"]::before {
      content: ''; position: absolute; left: 0; right: 0; top: -4px;
      height: 3px; background: var(--ct-orange); border-radius: 2px; pointer-events: none;
    }
    .un-edit-row[data-drop-pos="after"]::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: -4px;
      height: 3px; background: var(--ct-orange); border-radius: 2px; pointer-events: none;
    }
    .un-drag-handle {
      flex-shrink: 0;
      width: 14px; text-align: center;
      color: var(--ct-ink-4);
      font-size: 18px;
      line-height: 1;
      letter-spacing: -2px;
    }
    .un-edit-icon { width: 20px; height: 20px; color: var(--ct-ink-3); flex-shrink: 0; }
    .un-edit-icon svg { width: 100%; height: 100%; }
    .un-edit-name { flex: 1; min-width: 0; }
    .un-edit-name strong { display: block; font-size: 15px; font-weight: 750; }
    .un-edit-name span {
      display: block; font-size: 13px; color: var(--ct-ink-3);
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .un-edit-controls { display: flex; gap: 4px; flex-shrink: 0; }
    .un-edit-controls button {
      background: var(--ct-card); border: 0; box-shadow: inset 0 0 0 1px var(--ct-line-2);
      height: 32px; min-width: 32px; padding: 0 8px; border-radius: 8px;
      cursor: pointer; font-size: 15px; color: var(--ct-ink-3);
      font-family: inherit; line-height: 1;
    }
    .un-edit-controls button:hover { background: var(--ct-paper-2); color: var(--ct-ink); }
    .un-edit-controls .un-remove:hover { background: #FFE6DD; color: #A83A22; }
    .un-edit-controls .un-add-back:hover { background: #E0F3E7; color: #1D8A51; }

    /* Additional Apps empty state */
    .un-empty-additional {
      padding: 14px;
      border: 1.5px dashed var(--ct-ink-4);
      border-radius: 12px;
      text-align: center;
      color: var(--ct-ink-3);
      font-size: 14px;
    }

    /* Add form */
    .un-add-form {
      background: var(--ct-paper-2);
      border-radius: 14px;
      padding: 14px;
      margin-top: 10px;
      box-shadow: inset 0 0 0 1px var(--ct-line);
    }
    .un-add-form label {
      display: block;
      margin-bottom: 10px;
      font-size: 14px;
      color: var(--ct-ink);
      font-weight: 650;
    }
    .un-add-form input,
    .un-add-form select {
      display: block; width: 100%;
      min-height: 40px; padding: 6px 10px;
      border: 0; box-shadow: inset 0 0 0 1px var(--ct-line-2);
      border-radius: 9px; background: var(--ct-card); color: var(--ct-ink);
      font-size: 15px;
      margin-top: 5px;
      font-family: inherit;
      box-sizing: border-box;
      font-weight: 500;
    }
    .un-add-form input:focus-visible, .un-add-form select:focus-visible { outline: none; box-shadow: inset 0 0 0 1.5px var(--ct-focus); }
    .un-form-actions { display: flex; gap: 8px; margin-top: 8px; }

    /* Code preview block */
    .un-modal-help {
      font-size: 14px; color: var(--ct-ink-3); margin: 0 0 8px;
    }
    .un-modal-help code {
      background: var(--ct-paper-2); padding: 1px 5px; border-radius: 5px; font: 500 13px var(--ct-f-mono);
    }
    .un-code-preview {
      width: 100%; box-sizing: border-box; height: 160px;
      font: 400 13px/1.55 var(--ct-f-mono);
      border: 0; box-shadow: inset 0 0 0 1px var(--ct-line-2); border-radius: 12px;
      padding: 12px; background: var(--ct-card); color: var(--ct-ink);
      resize: vertical; white-space: pre; overflow: auto;
    }
    .un-copy-row {
      display: flex; justify-content: space-between; align-items: center; margin-top: 6px;
    }
    .un-copy-msg { font-size: 13px; font-weight: 700; color: var(--ct-mint-ink); opacity: 0; transition: opacity 0.2s; }
    .un-copy-msg.visible { opacity: 1; }
`;
  document.head.appendChild(style);

  const aside = document.createElement('aside');
  aside.className = 'universal-nav';

  function renderSidebar() {
    aside.innerHTML = '';

    const brand = document.createElement('a');
    brand.className = 'un-brand';
    brand.href = './ClassAI-dashboard.html';
    brand.innerHTML = BRAND_MARK + '<span>Class Tools</span>';
    aside.appendChild(brand);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'un-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
    closeBtn.addEventListener('click', closeDrawer);
    aside.appendChild(closeBtn);

    let teacherHeaderShown = false;
    for (const app of state.enabled) {
      // The teacher's own apps get their own labelled section.
      if (app.teacher && !teacherHeaderShown) {
        const divider = document.createElement('div');
        divider.className = 'un-divider';
        divider.textContent = 'Your apps';
        aside.appendChild(divider);
        teacherHeaderShown = true;
      }

      const a = document.createElement('a');
      a.className = 'un-item';
      a.href = appHref(app.file);
      // Only flat, same-folder tools can be the current page — the sidebar
      // never renders inside a teacher app, and matching on basename alone
      // would light up every app named "app.html".
      if (app.file.indexOf('/') === -1 && app.file.toLowerCase() === currentFile) {
        a.classList.add('active');
      }
      a.title = app.description || app.label;

      const iconSpan = document.createElement('span');
      iconSpan.className = 'un-icon';
      iconSpan.innerHTML = ICONS[app.icon] || '';
      a.appendChild(iconSpan);

      const text = document.createElement('span');
      text.className = 'un-text';
      const label = document.createElement('span');
      label.className = 'un-label';
      label.textContent = app.label;
      text.appendChild(label);
      // Sidebar shows titles only (keeps each row to one line, no scrolling).
      // The description still rides along as the hover tooltip (a.title), and
      // each app page shows its own subtitle in its header.
      a.appendChild(text);
      aside.appendChild(a);
    }

    const spacer = document.createElement('div');
    spacer.className = 'un-spacer';
    aside.appendChild(spacer);

    const settingsBtn = document.createElement('button');
    settingsBtn.className = 'un-settings';
    settingsBtn.type = 'button';
    settingsBtn.title = 'Customize navigation';
    const settingsIcon = document.createElement('span');
    settingsIcon.className = 'un-icon';
    settingsIcon.innerHTML = ICONS.gear;
    settingsBtn.appendChild(settingsIcon);
    const settingsLabel = document.createElement('span');
    settingsLabel.className = 'un-text';
    const sl = document.createElement('span');
    sl.className = 'un-label';
    sl.textContent = 'Settings';
    settingsLabel.appendChild(sl);
    settingsBtn.appendChild(settingsLabel);
    settingsBtn.addEventListener('click', openSettings);
    aside.appendChild(settingsBtn);
  }

  function openSettings() {
    closeDrawer();
    // Working copy — mutations apply on every action and auto-save.
    let working = { enabled: deepCopy(state.enabled), disabled: deepCopy(state.disabled) };

    const overlay = document.createElement('div');
    overlay.className = 'un-modal-overlay';
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    const modal = document.createElement('div');
    modal.className = 'un-modal';
    overlay.appendChild(modal);

    modal.innerHTML = `
      <div class="un-modal-header">
        <h2>Customize Navigation</h2>
        <button class="un-modal-close" type="button" aria-label="Close">×</button>
      </div>
      <div class="un-modal-body">
        <h3 class="un-section-title">Apps in your sidebar</h3>
        <p class="un-modal-help">Drag rows to reorder. Click × to move an app to Additional Apps (it stays available — not deleted).</p>
        <ul class="un-edit-list" id="un-enabled-list"></ul>

        <h3 class="un-section-title">Additional apps</h3>
        <ul class="un-edit-list" id="un-disabled-list"></ul>
        <div class="un-empty-additional" id="un-empty-additional" hidden>
          Nothing here yet. Removed apps will appear here.
        </div>

        <hr>

        <button type="button" class="un-btn un-btn-secondary" id="un-show-add">+ Add a new app</button>
        <div class="un-add-form" id="un-add-form" hidden>
          <label>Icon
            <select id="un-add-icon"></select>
          </label>
          <label>Label
            <input id="un-add-label" type="text" placeholder="e.g. Seating Chart">
          </label>
          <label>File name
            <input id="un-add-file" type="text" placeholder="e.g. seating-chart.html">
          </label>
          <label>Description
            <input id="un-add-desc" type="text" placeholder="Short blurb shown on hover">
          </label>
          <div class="un-form-actions">
            <button type="button" class="un-btn un-btn-primary" id="un-add-submit">Add to sidebar</button>
            <button type="button" class="un-btn un-btn-secondary" id="un-add-cancel">Cancel</button>
          </div>
        </div>

        <hr>

        <p class="un-modal-help">
          Your changes save for <strong>this page only</strong> — each app page keeps its own sidebar order.
          Want this order on every page? Click <strong>Copy</strong>, paste it into your chat, and say &ldquo;make this my sidebar order.&rdquo; (A project update will reset it.)
          Apps you built yourself aren't included — they keep their own place.
        </p>
        <textarea class="un-code-preview" id="un-code-preview" readonly spellcheck="false"></textarea>
        <div class="un-copy-row">
          <button type="button" class="un-btn un-btn-secondary" id="un-copy-code">Copy</button>
          <span class="un-copy-msg" id="un-copy-msg">Copied!</span>
        </div>
      </div>
      <div class="un-modal-footer">
        <span class="un-save-status" id="un-save-status">Saved.</span>
        <div class="un-modal-footer-actions">
          <button type="button" class="un-btn un-btn-secondary" id="un-reset">Reset to defaults</button>
          <button type="button" class="un-btn un-btn-primary" id="un-modal-done">Done</button>
        </div>
      </div>
    `;

    const enabledListEl = modal.querySelector('#un-enabled-list');
    const disabledListEl = modal.querySelector('#un-disabled-list');
    const emptyAdditionalEl = modal.querySelector('#un-empty-additional');
    const codePreview = modal.querySelector('#un-code-preview');
    const saveStatusEl = modal.querySelector('#un-save-status');

    // Populate icon select
    const iconSelect = modal.querySelector('#un-add-icon');
    for (const key of Object.keys(ICONS)) {
      if (key === 'gear') continue; // reserved for the Settings button
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = key;
      iconSelect.appendChild(opt);
    }

    function persist() {
      const ok = saveState(working);
      saveStatusEl.textContent = ok ? 'Saved.' : 'Could not save (storage unavailable).';
      saveStatusEl.classList.toggle('error', !ok);
    }

    function applyAndPersist() {
      state = { enabled: deepCopy(working.enabled), disabled: deepCopy(working.disabled) };
      renderSidebar();
      persist();
    }

    function exportAppsCode(apps) {
      const lines = ['const DEFAULT_APPS = ['];
      apps.forEach((app, i) => {
        const fields = [
          `id: ${JSON.stringify(app.id)}`,
          `label: ${JSON.stringify(app.label)}`,
          `file: ${JSON.stringify(app.file)}`,
          `description: ${JSON.stringify(app.description || '')}`,
          `icon: ${JSON.stringify(app.icon || 'home')}`
        ];
        lines.push('  { ' + fields.join(', ') + ' }' + (i < apps.length - 1 ? ',' : ''));
      });
      lines.push('];');
      return lines.join('\n');
    }

    function updatePreview() {
      // Only the shipped tools belong in DEFAULT_APPS. Apps under "Your apps"
      // are registered in my-classroom/my-apps.js, which updates never touch —
      // copying them in here would put them in the engine and lose them.
      codePreview.value = exportAppsCode(working.enabled.filter(a => !a.teacher));
    }

    function buildRow(app, list, kind) {
      const li = document.createElement('li');
      li.className = 'un-edit-row';
      li.dataset.id = app.id;
      li.dataset.kind = kind;
      if (kind === 'enabled') li.draggable = true;

      const handle = document.createElement('span');
      handle.className = 'un-drag-handle';
      handle.textContent = kind === 'enabled' ? '⋮⋮' : ' ';
      handle.setAttribute('aria-hidden', 'true');
      li.appendChild(handle);

      const iconWrap = document.createElement('span');
      iconWrap.className = 'un-edit-icon';
      iconWrap.innerHTML = ICONS[app.icon] || '';
      li.appendChild(iconWrap);

      const nameWrap = document.createElement('div');
      nameWrap.className = 'un-edit-name';
      const strong = document.createElement('strong');
      strong.textContent = app.label;
      nameWrap.appendChild(strong);
      const sub = document.createElement('span');
      sub.textContent = app.file;
      nameWrap.appendChild(sub);
      li.appendChild(nameWrap);

      const controls = document.createElement('div');
      controls.className = 'un-edit-controls';
      const actionBtn = document.createElement('button');
      actionBtn.type = 'button';
      actionBtn.draggable = false;
      if (kind === 'enabled') {
        actionBtn.className = 'un-remove';
        actionBtn.textContent = '×';
        actionBtn.title = 'Move to Additional Apps';
        actionBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          moveToDisabled(app.id);
        });
      } else {
        actionBtn.className = 'un-add-back';
        actionBtn.textContent = '+ Add';
        actionBtn.title = 'Add to sidebar';
        actionBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          moveToEnabled(app.id);
        });
      }
      controls.appendChild(actionBtn);
      li.appendChild(controls);

      if (kind === 'enabled') attachDragHandlers(li);
      return li;
    }

    function attachDragHandlers(row) {
      row.addEventListener('dragstart', (e) => {
        row.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', row.dataset.id);
      });
      row.addEventListener('dragend', () => {
        row.classList.remove('dragging');
        enabledListEl.querySelectorAll('.un-edit-row').forEach(r => r.removeAttribute('data-drop-pos'));
      });
      row.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const rect = row.getBoundingClientRect();
        const before = e.clientY < rect.top + rect.height / 2;
        enabledListEl.querySelectorAll('.un-edit-row').forEach(r => r.removeAttribute('data-drop-pos'));
        row.dataset.dropPos = before ? 'before' : 'after';
      });
      row.addEventListener('drop', (e) => {
        e.preventDefault();
        const sourceId = e.dataTransfer.getData('text/plain');
        if (!sourceId || sourceId === row.dataset.id) {
          enabledListEl.querySelectorAll('.un-edit-row').forEach(r => r.removeAttribute('data-drop-pos'));
          return;
        }
        const before = row.dataset.dropPos === 'before';
        reorderEnabled(sourceId, row.dataset.id, before);
      });
    }

    function reorderEnabled(sourceId, targetId, before) {
      const from = working.enabled.findIndex(a => a.id === sourceId);
      const to = working.enabled.findIndex(a => a.id === targetId);
      if (from === -1 || to === -1 || from === to) { renderBoth(); return; }
      const item = working.enabled.splice(from, 1)[0];
      // After removal, indexes >= from shift down by one.
      let insertAt = working.enabled.findIndex(a => a.id === targetId);
      if (insertAt === -1) insertAt = working.enabled.length;
      if (!before) insertAt += 1;
      working.enabled.splice(insertAt, 0, item);
      renderBoth();
      applyAndPersist();
    }

    function moveToDisabled(id) {
      const i = working.enabled.findIndex(a => a.id === id);
      if (i === -1) return;
      const [app] = working.enabled.splice(i, 1);
      working.disabled.push(app);
      renderBoth();
      applyAndPersist();
    }

    function moveToEnabled(id) {
      const i = working.disabled.findIndex(a => a.id === id);
      if (i === -1) return;
      const [app] = working.disabled.splice(i, 1);
      working.enabled.push(app);
      renderBoth();
      applyAndPersist();
    }

    function renderBoth() {
      enabledListEl.innerHTML = '';
      for (const app of working.enabled) enabledListEl.appendChild(buildRow(app, enabledListEl, 'enabled'));
      disabledListEl.innerHTML = '';
      for (const app of working.disabled) disabledListEl.appendChild(buildRow(app, disabledListEl, 'disabled'));
      emptyAdditionalEl.hidden = working.disabled.length > 0;
      updatePreview();
    }

    function slugify(s) {
      return String(s).toLowerCase().trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Add form handlers
    const addForm = modal.querySelector('#un-add-form');
    modal.querySelector('#un-show-add').addEventListener('click', () => {
      addForm.hidden = false;
      modal.querySelector('#un-add-label').focus();
    });
    modal.querySelector('#un-add-cancel').addEventListener('click', () => {
      addForm.hidden = true;
      clearAddForm();
    });
    modal.querySelector('#un-add-submit').addEventListener('click', () => {
      const label = modal.querySelector('#un-add-label').value.trim();
      const file = modal.querySelector('#un-add-file').value.trim();
      const desc = modal.querySelector('#un-add-desc').value.trim();
      const icon = modal.querySelector('#un-add-icon').value;
      if (!label || !file) {
        alert('Label and file name are required.');
        return;
      }
      let id = slugify(label) || 'app-' + Date.now();
      // Avoid id collision
      const allIds = working.enabled.concat(working.disabled).map(a => a.id);
      let suffix = 2;
      const baseId = id;
      while (allIds.includes(id)) { id = baseId + '-' + (suffix++); }
      working.enabled.push({ id, label, file, description: desc, icon });
      addForm.hidden = true;
      clearAddForm();
      renderBoth();
      applyAndPersist();
    });

    function clearAddForm() {
      modal.querySelector('#un-add-label').value = '';
      modal.querySelector('#un-add-file').value = '';
      modal.querySelector('#un-add-desc').value = '';
      const keys = Object.keys(ICONS).filter(k => k !== 'gear');
      modal.querySelector('#un-add-icon').value = keys[0];
    }

    // Copy code
    modal.querySelector('#un-copy-code').addEventListener('click', async () => {
      const text = codePreview.value;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        codePreview.select();
        document.execCommand('copy');
      }
      const msg = modal.querySelector('#un-copy-msg');
      msg.classList.add('visible');
      setTimeout(() => msg.classList.remove('visible'), 1500);
    });

    // Reset to defaults
    modal.querySelector('#un-reset').addEventListener('click', () => {
      if (!confirm('Reset to the default app list and order? This clears your customizations for this page.')) return;
      working = defaultState();
      renderBoth();
      applyAndPersist();
    });

    function close() {
      if (overlay.parentNode) document.body.removeChild(overlay);
    }

    modal.querySelector('.un-modal-close').addEventListener('click', close);
    modal.querySelector('#un-modal-done').addEventListener('click', close);

    document.body.appendChild(overlay);
    renderBoth();
  }

  let overlayNav = null;
  function closeDrawer() {
    aside.classList.remove('un-open');
    if (overlayNav) overlayNav.classList.remove('un-show');
  }
  function openDrawer() {
    aside.classList.add('un-open');
    if (overlayNav) overlayNav.classList.add('un-show');
  }

  function mount() {
    renderSidebar();
    document.body.insertBefore(aside, document.body.firstChild);

    // Mobile top bar with a hamburger (hidden on desktop via CSS).
    const topbar = document.createElement('div');
    topbar.className = 'un-topbar';
    const burger = document.createElement('button');
    burger.className = 'un-hamburger';
    burger.type = 'button';
    burger.setAttribute('aria-label', 'Open menu');
    burger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>';
    const tbBrand = document.createElement('a');
    tbBrand.className = 'un-topbar-brand';
    tbBrand.href = './ClassAI-dashboard.html';
    tbBrand.innerHTML = BRAND_MARK + '<span>Class Tools</span>';
    topbar.appendChild(burger);
    topbar.appendChild(tbBrand);
    document.body.insertBefore(topbar, document.body.firstChild);

    overlayNav = document.createElement('div');
    overlayNav.className = 'un-overlay-nav';
    document.body.appendChild(overlayNav);

    burger.addEventListener('click', () => {
      if (aside.classList.contains('un-open')) closeDrawer(); else openDrawer();
    });
    overlayNav.addEventListener('click', closeDrawer);
    // Tapping a destination (or the brand) closes the drawer.
    aside.addEventListener('click', (e) => {
      if (e.target.closest('.un-item') || e.target.closest('.un-brand')) closeDrawer();
    });
  }

  if (document.body) {
    mount();
  } else {
    document.addEventListener('DOMContentLoaded', mount);
  }
})();
