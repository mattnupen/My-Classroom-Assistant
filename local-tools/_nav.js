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
  { id: 'badges',              label: 'Badges',              file: 'badges.html',            description: 'Generate printable student recognition badges',  icon: 'award' },
  { id: 'random-groups',       label: 'Random Groups',       file: 'random-groups.html',     description: 'Shuffle the class into small groups',            icon: 'users' }
];

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
    /* Sidebar */
    .universal-nav {
      position: fixed;
      top: 0; left: 0; bottom: 0;
      width: 220px;
      box-sizing: border-box;
      background: #1f2937;
      color: #e5e7eb;
      padding: 20px 14px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow-y: auto;
      z-index: 100;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
    }
    .universal-nav .un-brand {
      color: white;
      font-weight: 600;
      font-size: 15px;
      padding: 6px 10px 14px;
      border-bottom: 1px solid #374151;
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
      color: #e5e7eb;
      text-decoration: none;
      font-size: 13px;
    }
    .universal-nav .un-item:hover { background: #374151; }
    .universal-nav .un-item.active { background: #4f46e5; color: white; }
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
      font-size: 11px;
      color: #9ca3af;
      margin-top: 2px;
    }
    .universal-nav .un-spacer { flex: 1; min-height: 16px; }
    .universal-nav .un-settings {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-radius: 6px;
      color: #9ca3af;
      background: none;
      border: none;
      font-size: 13px;
      cursor: pointer;
      font-family: inherit;
      text-align: left;
      border-top: 1px solid #374151;
      margin-top: 8px;
      padding-top: 12px;
      width: 100%;
    }
    .universal-nav .un-settings:hover { color: white; }
    .universal-nav .un-settings .un-icon { opacity: 0.7; }
    body { margin-left: 220px; }

    @media (max-width: 1023px) {
      .universal-nav { width: 64px; padding: 16px 6px; align-items: center; }
      .universal-nav .un-brand { font-size: 11px; text-align: center; padding: 4px 0 12px; width: 100%; }
      .universal-nav .un-item { justify-content: center; padding: 10px 6px; gap: 0; }
      .universal-nav .un-icon { width: 22px; height: 22px; margin-top: 0; }
      .universal-nav .un-text { display: none; }
      .universal-nav .un-settings { justify-content: center; padding: 10px 6px; }
      body { margin-left: 64px; }
    }

    @media (max-width: 639px) {
      .universal-nav {
        position: static; width: 100%; height: auto; flex-direction: row;
        gap: 6px; padding: 10px 12px; overflow-x: auto; overflow-y: hidden; align-items: center;
      }
      .universal-nav .un-brand {
        flex-shrink: 0; border-bottom: none; border-right: 1px solid #374151;
        padding: 4px 12px 4px 0; margin-bottom: 0; margin-right: 4px; width: auto;
      }
      .universal-nav .un-item { flex-shrink: 0; padding: 6px 10px; gap: 6px; justify-content: flex-start; }
      .universal-nav .un-icon { width: 16px; height: 16px; }
      .universal-nav .un-text { display: block; }
      .universal-nav .un-label { white-space: nowrap; font-size: 12px; }
      .universal-nav .un-desc { display: none; }
      .universal-nav .un-spacer { display: none; }
      .universal-nav .un-settings {
        flex-shrink: 0; border-top: none; border-left: 1px solid #374151;
        margin-top: 0; margin-left: auto; padding: 6px 10px; width: auto; gap: 6px;
      }
      body { margin-left: 0; }
    }

    @media print {
      .universal-nav { display: none; }
      .un-modal-overlay { display: none !important; }
      body { margin-left: 0 !important; }
    }

    /* Settings modal */
    .un-modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
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
    .un-modal-header h2 { margin: 0; font-size: 18px; font-weight: 600; }
    .un-modal-close {
      background: none; border: none; font-size: 22px; cursor: pointer;
      color: #6b7280; width: 32px; height: 32px; border-radius: 6px; line-height: 1;
    }
    .un-modal-close:hover { background: #f3f4f6; color: #18181b; }
    .un-modal-body { padding: 18px 20px; overflow-y: auto; flex: 1; }
    .un-modal-footer {
      padding: 14px 20px; border-top: 1px solid #e7e5e4;
      display: flex; justify-content: space-between; align-items: center; gap: 10px;
    }
    .un-modal-footer .un-save-status { font-size: 11px; color: #6b7280; }
    .un-modal-footer .un-save-status.error { color: #b91c1c; }
    .un-modal-footer-actions { display: flex; gap: 10px; }
    .un-modal .un-btn {
      padding: 8px 14px; border-radius: 6px; font-size: 13px;
      cursor: pointer; font-family: inherit; border: 1px solid transparent;
    }
    .un-modal .un-btn-primary { background: #4f46e5; color: white; border-color: #4f46e5; }
    .un-modal .un-btn-primary:hover { background: #4338ca; border-color: #4338ca; }
    .un-modal .un-btn-secondary { background: white; color: #18181b; border-color: #d4d4d8; }
    .un-modal .un-btn-secondary:hover { background: #f3f4f6; }
    .un-modal h3.un-section-title {
      font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;
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
      height: 3px; background: #4f46e5; border-radius: 2px; pointer-events: none;
    }
    .un-edit-row[data-drop-pos="after"]::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: -3px;
      height: 3px; background: #4f46e5; border-radius: 2px; pointer-events: none;
    }
    .un-drag-handle {
      flex-shrink: 0;
      width: 14px; text-align: center;
      color: #9ca3af;
      font-size: 16px;
      line-height: 1;
      letter-spacing: -2px;
    }
    .un-edit-icon { width: 20px; height: 20px; color: #6b7280; flex-shrink: 0; }
    .un-edit-icon svg { width: 100%; height: 100%; }
    .un-edit-name { flex: 1; min-width: 0; }
    .un-edit-name strong { display: block; font-size: 13px; }
    .un-edit-name span {
      display: block; font-size: 11px; color: #6b7280;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .un-edit-controls { display: flex; gap: 4px; flex-shrink: 0; }
    .un-edit-controls button {
      background: white; border: 1px solid #d4d4d8;
      height: 28px; padding: 0 8px; border-radius: 5px;
      cursor: pointer; font-size: 13px; color: #6b7280;
      font-family: inherit; line-height: 1;
    }
    .un-edit-controls button:hover { background: #f3f4f6; color: #18181b; }
    .un-edit-controls .un-remove:hover {
      background: #fef2f2; color: #991b1b; border-color: #fecaca;
    }
    .un-edit-controls .un-add-back:hover {
      background: #eef2ff; color: #4338ca; border-color: #c7d2fe;
    }

    /* Additional Apps empty state */
    .un-empty-additional {
      padding: 14px;
      border: 1px dashed #e7e5e4;
      border-radius: 6px;
      text-align: center;
      color: #9ca3af;
      font-size: 12px;
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
      font-size: 12px;
      color: #18181b;
      font-weight: 500;
    }
    .un-add-form input,
    .un-add-form select {
      display: block; width: 100%;
      padding: 6px 8px;
      border: 1px solid #d4d4d8;
      border-radius: 4px;
      font-size: 13px;
      margin-top: 4px;
      font-family: inherit;
      box-sizing: border-box;
      font-weight: normal;
    }
    .un-form-actions { display: flex; gap: 8px; margin-top: 8px; }

    /* Code preview block */
    .un-modal-help {
      font-size: 12px; color: #6b7280; margin: 0 0 8px;
    }
    .un-modal-help code {
      background: #f3f4f6; padding: 1px 4px; border-radius: 3px; font-size: 11px;
    }
    .un-code-preview {
      width: 100%; box-sizing: border-box; height: 160px;
      font-family: "SF Mono", Menlo, monospace; font-size: 11px;
      border: 1px solid #d4d4d8; border-radius: 6px;
      padding: 10px; background: #fafaf9;
      resize: vertical; white-space: pre; overflow: auto;
    }
    .un-copy-row {
      display: flex; justify-content: space-between; align-items: center; margin-top: 6px;
    }
    .un-copy-msg { font-size: 11px; color: #10b981; opacity: 0; transition: opacity 0.2s; }
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
      if (app.description) {
        const desc = document.createElement('span');
        desc.className = 'un-desc';
        desc.textContent = app.description;
        text.appendChild(desc);
      }
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

  function mount() {
    renderSidebar();
    document.body.insertBefore(aside, document.body.firstChild);
  }

  if (document.body) {
    mount();
  } else {
    document.addEventListener('DOMContentLoaded', mount);
  }
})();
