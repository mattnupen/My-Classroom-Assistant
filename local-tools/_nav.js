/*
 * Universal navigation for ClassAI local tools.
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
 * Claude Cowork edits DEFAULT_APPS when a new tool ships or when the
 * teacher requests a permanent reorder.
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
  { id: 'classai-dashboard',   label: 'Dashboard',           file: 'ClassAI-dashboard.html', description: 'Class overview and goals',                       icon: 'home' },
  { id: 'student-cards',       label: 'Student Cards',       file: 'student-cards.html',     description: 'Per-student printable info cards',               icon: 'idcard' },
  { id: 'parent-messages',     label: 'Parent Messages',     file: 'parent-messages.html',   description: 'Draft parent-facing messages',                   icon: 'mail' },
  { id: 'gradebook-analytics', label: 'Gradebook Analytics', file: 'gradebook-analytics.html', description: 'Upload a gradebook CSV for per-student stats', icon: 'chart' },
  { id: 'class-pulse',         label: 'Class Pulse',         file: 'class-pulse.html',       description: 'Quick read on how the class is doing',           icon: 'pulse' },
  { id: 'student-voice',       label: 'Feedback Cleaner',    file: 'student-voice.html',     description: 'Strip names and emails from responses',          icon: 'megaphone' },
  { id: 'badges',              label: 'Badges',              file: 'badges.html',            description: 'Generate printable student recognition badges',  icon: 'award' },
  { id: 'random-groups',       label: 'Random Groups',       file: 'random-groups.html',     description: 'Shuffle the class into small groups',            icon: 'users' },
  { id: 'app-studio',          label: 'App Studio',          file: 'app-studio.html',        description: 'Ideas your AI can build for you',                icon: 'build' },
  { id: 'demo-semester',       label: 'Demo Semester',       file: 'demo-semester.html',     description: 'A fictional class, start to finish',             icon: 'book' }
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

const STORAGE_KEY = 'classai-nav-v2';

function defaultState() {
  return { enabled: deepCopy(DEFAULT_APPS), disabled: [] };
}

function deepCopy(x) { return JSON.parse(JSON.stringify(x)); }

function isValidApp(a) {
  return a && typeof a.id === 'string' && typeof a.label === 'string' && typeof a.file === 'string';
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw);
    if (!s || !Array.isArray(s.enabled) || !Array.isArray(s.disabled)) return defaultState();
    const enabled = s.enabled.filter(isValidApp);
    const disabled = s.disabled.filter(isValidApp);
    if (enabled.length === 0 && disabled.length === 0) return defaultState();
    // Apps added to DEFAULT_APPS after the user saved their settings
    // would otherwise never appear. Merge any unknown defaults in.
    const known = new Set(enabled.concat(disabled).map(a => a.id));
    for (const app of DEFAULT_APPS) {
      if (!known.has(app.id)) enabled.push(deepCopy(app));
    }
    return { enabled, disabled };
  } catch {
    return defaultState();
  }
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
    /* Shared "Load demo class" button (used by the tool pages) */
    .demo-btn {
      display: inline-block;
      margin-top: 8px;
      padding: 7px 14px;
      border: 1px solid #1f6b6b;
      border-radius: 6px;
      background: #e3f1ef;
      color: #1f6b6b;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
    }
    .demo-btn:hover { background: #1f6b6b; color: #f1faee; }
    @media print { .demo-btn { display: none; } }

    /* ---- Shared app-page hero: one consistent header for every tool page.
       App name is the <h1> (large); the one-line description is the <h2> below it. ---- */
    .app-hero {
      position: relative; overflow: hidden;
      background: linear-gradient(135deg, #1a2332, #143a45);
      color: #f1faee; border-radius: 18px; padding: 24px 26px; margin-bottom: 20px;
      display: flex; align-items: center; gap: 18px; flex-wrap: wrap;
      box-shadow: 0 1px 2px rgba(13,27,42,.06), 0 6px 18px rgba(13,27,42,.08);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .app-hero .app-hero-ico {
      flex: 0 0 auto; width: 54px; height: 54px; border-radius: 13px;
      background: rgba(168,218,220,.16); color: #a8dadc;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .app-hero .app-hero-ico svg { width: 30px; height: 30px; }
    .app-hero .app-hero-text { flex: 1 1 320px; min-width: 0; }
    .app-hero h1 { margin: 0; font-size: 27px; font-weight: 700; line-height: 1.2; color: #f1faee; }
    .app-hero h2 { margin: 5px 0 0; font-size: 16px; font-weight: 500; line-height: 1.4; color: rgba(241,250,238,.82); }
    .app-hero .app-hero-action { flex: 0 0 auto; }
    .app-hero .app-hero-btn {
      border: 1px solid #f1faee; background: #f1faee; color: #1a2332;
      border-radius: 999px; padding: 10px 16px; font-size: 15px; font-weight: 700;
      cursor: pointer; font-family: inherit;
    }
    .app-hero .app-hero-btn:hover { background: #a8dadc; border-color: #a8dadc; }
    @media print { .app-hero { display: none; } }

    /* Sidebar */
    .universal-nav {
      position: fixed;
      top: 0; left: 0; bottom: 0;
      width: 220px;
      box-sizing: border-box;
      background: #1a2332;
      color: #c9d6d4;
      padding: 20px 14px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow-y: auto;
      z-index: 100;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
    }
    .universal-nav .un-brand {
      color: #f1faee;
      font-weight: 600;
      font-size: 17px;
      padding: 6px 10px 14px;
      border-bottom: 1px solid #2a3a48;
      margin-bottom: 10px;
      text-decoration: none;
      display: block;
    }
    .universal-nav .un-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 6px;
      color: #c9d6d4;
      text-decoration: none;
      font-size: 15px;
    }
    .universal-nav .un-item:hover { background: #243140; color: #f1faee; }
    .universal-nav .un-item.active { background: #1f6b6b; color: #f1faee; }
    .universal-nav .un-icon {
      flex-shrink: 0;
      width: 18px;
      height: 18px;
      margin-top: 1px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      opacity: 0.9;
    }
    .universal-nav .un-icon svg { width: 100%; height: 100%; }
    .universal-nav .un-text { flex: 1; min-width: 0; }
    .universal-nav .un-label { display: block; line-height: 1.3; }
    .universal-nav .un-desc {
      display: block;
      font-size: 13px;
      color: #8aa0a0;
      margin-top: 2px;
    }
    .universal-nav .un-spacer { flex: 1; min-height: 16px; }
    .universal-nav .un-settings {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-radius: 6px;
      color: #8aa0a0;
      background: none;
      border: none;
      font-size: 15px;
      cursor: pointer;
      font-family: inherit;
      text-align: left;
      border-top: 1px solid #2a3a48;
      margin-top: 8px;
      padding-top: 12px;
      width: 100%;
    }
    .universal-nav .un-settings:hover { color: white; }
    .universal-nav .un-settings .un-icon { opacity: 0.7; }
    body { margin-left: 220px; }

    /* Topbar + drawer overlay are hidden until mobile. The full-text sidebar
       stays put at every width down to the mobile breakpoint. */
    .un-topbar { display: none; }
    .un-overlay-nav { display: none; }
    .universal-nav .un-close { display: none; }

    /* Mobile: the full sidebar becomes an off-canvas drawer behind a hamburger. */
    @media (max-width: 768px) {
      .universal-nav {
        width: 244px;
        transform: translateX(-100%);
        transition: transform 0.25s ease;
        box-shadow: 2px 0 18px rgba(0, 0, 0, 0.28);
        z-index: 1200;
      }
      .universal-nav.un-open { transform: translateX(0); }
      .universal-nav .un-close {
        display: inline-flex; align-items: center; justify-content: center;
        position: absolute; top: 12px; right: 10px; width: 36px; height: 36px;
        background: none; border: none; color: #c9d6d4; cursor: pointer; border-radius: 6px;
      }
      .universal-nav .un-close:hover { background: #243140; color: #f1faee; }
      .universal-nav .un-close svg { width: 22px; height: 22px; }
      body { margin-left: 0; padding-top: 52px; }

      .un-topbar {
        display: flex; align-items: center; gap: 10px;
        position: fixed; top: 0; left: 0; right: 0; height: 52px;
        box-sizing: border-box; padding: 0 12px;
        background: #1a2332; color: #f1faee;
        border-bottom: 1px solid #2a3a48; z-index: 1100;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      }
      .un-hamburger {
        display: inline-flex; align-items: center; justify-content: center;
        background: none; border: none; cursor: pointer; color: #f1faee;
        padding: 6px; border-radius: 6px;
      }
      .un-hamburger:hover { background: #243140; }
      .un-hamburger svg { width: 26px; height: 26px; }
      .un-topbar-brand { color: #f1faee; font-weight: 600; font-size: 18px; text-decoration: none; }

      .un-overlay-nav {
        display: block; position: fixed; inset: 0; z-index: 1150;
        background: rgba(13, 27, 42, 0.5);
        opacity: 0; pointer-events: none; transition: opacity 0.25s ease;
      }
      .un-overlay-nav.un-show { opacity: 1; pointer-events: auto; }
    }

    @media print {
      .universal-nav { display: none; }
      .un-topbar, .un-overlay-nav { display: none !important; }
      .un-modal-overlay { display: none !important; }
      body { margin-left: 0 !important; padding-top: 0 !important; }
    }

    /* Settings modal */
    .un-modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1300;
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .un-modal {
      background: white; border-radius: 12px;
      max-width: 640px; width: 100%; max-height: 90vh;
      display: flex; flex-direction: column;
      color: #18181b;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    }
    .un-modal-header {
      padding: 18px 20px;
      border-bottom: 1px solid #e7e5e4;
      display: flex; justify-content: space-between; align-items: center;
    }
    .un-modal-header h2 { margin: 0; font-size: 20px; font-weight: 600; }
    .un-modal-close {
      background: none; border: none; font-size: 24px; cursor: pointer;
      color: #6b7280; width: 32px; height: 32px; border-radius: 6px; line-height: 1;
    }
    .un-modal-close:hover { background: #f3f4f6; color: #18181b; }
    .un-modal-body { padding: 18px 20px; overflow-y: auto; flex: 1; }
    .un-modal-footer {
      padding: 14px 20px; border-top: 1px solid #e7e5e4;
      display: flex; justify-content: space-between; align-items: center; gap: 10px;
    }
    .un-modal-footer .un-save-status { font-size: 13px; color: #6b7280; }
    .un-modal-footer .un-save-status.error { color: #b91c1c; }
    .un-modal-footer-actions { display: flex; gap: 10px; }
    .un-modal .un-btn {
      padding: 8px 14px; border-radius: 6px; font-size: 15px;
      cursor: pointer; font-family: inherit; border: 1px solid transparent;
    }
    .un-modal .un-btn-primary { background: #1f6b6b; color: #f1faee; border-color: #1f6b6b; }
    .un-modal .un-btn-primary:hover { background: #18585a; border-color: #18585a; }
    .un-modal .un-btn-secondary { background: white; color: #18181b; border-color: #d4d4d8; }
    .un-modal .un-btn-secondary:hover { background: #f3f4f6; }
    .un-modal h3.un-section-title {
      font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;
      color: #6b7280; margin: 18px 0 8px; font-weight: 600;
    }
    .un-modal h3.un-section-title:first-child { margin-top: 0; }
    .un-modal hr { border: none; border-top: 1px solid #e7e5e4; margin: 18px 0 12px; }

    /* Enabled list rows (draggable) */
    .un-edit-list { list-style: none; padding: 0; margin: 0; }
    .un-edit-row {
      position: relative;
      display: flex; align-items: center; gap: 10px;
      padding: 10px 10px;
      border: 1px solid #e7e5e4;
      border-radius: 6px;
      margin-bottom: 6px;
      background: white;
      cursor: grab;
      user-select: none;
    }
    .un-edit-row:active { cursor: grabbing; }
    .un-edit-row.dragging { opacity: 0.4; }
    .un-edit-row[data-drop-pos="before"]::before {
      content: ''; position: absolute; left: 0; right: 0; top: -3px;
      height: 3px; background: #1f6b6b; border-radius: 2px; pointer-events: none;
    }
    .un-edit-row[data-drop-pos="after"]::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: -3px;
      height: 3px; background: #1f6b6b; border-radius: 2px; pointer-events: none;
    }
    .un-drag-handle {
      flex-shrink: 0;
      width: 14px; text-align: center;
      color: #9ca3af;
      font-size: 18px;
      line-height: 1;
      letter-spacing: -2px;
    }
    .un-edit-icon { width: 20px; height: 20px; color: #6b7280; flex-shrink: 0; }
    .un-edit-icon svg { width: 100%; height: 100%; }
    .un-edit-name { flex: 1; min-width: 0; }
    .un-edit-name strong { display: block; font-size: 15px; }
    .un-edit-name span {
      display: block; font-size: 13px; color: #6b7280;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .un-edit-controls { display: flex; gap: 4px; flex-shrink: 0; }
    .un-edit-controls button {
      background: white; border: 1px solid #d4d4d8;
      height: 28px; padding: 0 8px; border-radius: 5px;
      cursor: pointer; font-size: 15px; color: #6b7280;
      font-family: inherit; line-height: 1;
    }
    .un-edit-controls button:hover { background: #f3f4f6; color: #18181b; }
    .un-edit-controls .un-remove:hover {
      background: #fef2f2; color: #991b1b; border-color: #fecaca;
    }
    .un-edit-controls .un-add-back:hover {
      background: #e3f1ef; color: #18585a; border-color: #b9d8d2;
    }

    /* Additional Apps empty state */
    .un-empty-additional {
      padding: 14px;
      border: 1px dashed #e7e5e4;
      border-radius: 6px;
      text-align: center;
      color: #9ca3af;
      font-size: 14px;
      font-style: italic;
    }

    /* Add form */
    .un-add-form {
      background: #fafaf9;
      border: 1px solid #e7e5e4;
      border-radius: 8px;
      padding: 14px;
      margin-top: 10px;
    }
    .un-add-form label {
      display: block;
      margin-bottom: 10px;
      font-size: 14px;
      color: #18181b;
      font-weight: 500;
    }
    .un-add-form input,
    .un-add-form select {
      display: block; width: 100%;
      padding: 6px 8px;
      border: 1px solid #d4d4d8;
      border-radius: 4px;
      font-size: 15px;
      margin-top: 4px;
      font-family: inherit;
      box-sizing: border-box;
      font-weight: normal;
    }
    .un-form-actions { display: flex; gap: 8px; margin-top: 8px; }

    /* Code preview block */
    .un-modal-help {
      font-size: 14px; color: #6b7280; margin: 0 0 8px;
    }
    .un-modal-help code {
      background: #f3f4f6; padding: 1px 4px; border-radius: 3px; font-size: 13px;
    }
    .un-code-preview {
      width: 100%; box-sizing: border-box; height: 160px;
      font-family: "SF Mono", Menlo, monospace; font-size: 13px;
      border: 1px solid #d4d4d8; border-radius: 6px;
      padding: 10px; background: #fafaf9;
      resize: vertical; white-space: pre; overflow: auto;
    }
    .un-copy-row {
      display: flex; justify-content: space-between; align-items: center; margin-top: 6px;
    }
    .un-copy-msg { font-size: 13px; color: #1f6b6b; opacity: 0; transition: opacity 0.2s; }
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
    brand.textContent = 'ClassAI';
    aside.appendChild(brand);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'un-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
    closeBtn.addEventListener('click', closeDrawer);
    aside.appendChild(closeBtn);

    for (const app of state.enabled) {
      const a = document.createElement('a');
      a.className = 'un-item';
      a.href = './' + app.file;
      if (app.file.toLowerCase() === currentFile) a.classList.add('active');
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
          Your changes save automatically for <strong>this page</strong>. Other tool pages use their own settings (browsers isolate local storage per file).
          To make this order the global default everywhere, copy the code below and ask Claude Cowork to update <code>DEFAULT_APPS</code> in <code>local-tools/_nav.js</code>.
        </p>
        <textarea class="un-code-preview" id="un-code-preview" readonly spellcheck="false"></textarea>
        <div class="un-copy-row">
          <button type="button" class="un-btn un-btn-secondary" id="un-copy-code">Copy code</button>
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
      codePreview.value = exportAppsCode(working.enabled);
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
      working = { enabled: deepCopy(DEFAULT_APPS), disabled: [] };
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
    tbBrand.textContent = 'ClassAI';
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
