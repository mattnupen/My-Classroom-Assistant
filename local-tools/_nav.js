/*
 * Universal navigation for ClassAI local tools.
 *
 * Every tool page includes this with:
 *   <script src="./_nav.js"></script>
 *
 * On load, it injects a fixed left sidebar listing every tool in APPS,
 * highlights the current page, and offsets the body so existing
 * page content shifts right of the sidebar.
 *
 * Claude Cowork edits the APPS array when a new tool ships.
 * Aggregate text only — NEVER include student names, grades, or
 * per-student data in this file.
 */

const ICONS = {
  home:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg>',
  award:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M8.5 12.5L7 21l5-3 5 3-1.5-8.5"/></svg>',
  pulse:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 12 7 12 10 4 14 20 17 12 21 12"/></svg>',
  megaphone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M16 8a4 4 0 0 1 0 8"/></svg>',
  chart:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="20" x2="6" y2="11"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="14"/></svg>',
  mail:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>',
  users:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 5 5"/></svg>',
  idcard:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2.5"/><path d="M6.5 16a3 3 0 0 1 5 0"/><line x1="14" y1="10" x2="18" y2="10"/><line x1="14" y1="14" x2="18" y2="14"/></svg>'
};

const APPS = [
  {
    id: 'classai-dashboard',
    label: 'Dashboard',
    file: 'ClassAI-dashboard.html',
    description: 'Class overview and goals',
    icon: 'home'
  },
  {
    id: 'badges',
    label: 'Badges',
    file: 'badges.html',
    description: 'Generate printable student recognition badges',
    icon: 'award'
  },
  {
    id: 'class-pulse',
    label: 'Class Pulse',
    file: 'class-pulse.html',
    description: 'Quick read on how the class is doing',
    icon: 'pulse'
  },
  {
    id: 'cold-call',
    label: 'Cold Call',
    file: 'cold-call.html',
    description: 'Randomly pick a student to call on',
    icon: 'megaphone'
  },
  {
    id: 'gradebook-analytics',
    label: 'Gradebook Analytics',
    file: 'gradebook-analytics.html',
    description: 'Upload a gradebook CSV for per-student stats',
    icon: 'chart'
  },
  {
    id: 'parent-messages',
    label: 'Parent Messages',
    file: 'parent-messages.html',
    description: 'Draft parent-facing messages',
    icon: 'mail'
  },
  {
    id: 'random-groups',
    label: 'Random Groups',
    file: 'random-groups.html',
    description: 'Shuffle the class into small groups',
    icon: 'users'
  },
  {
    id: 'student-cards',
    label: 'Student Cards',
    file: 'student-cards.html',
    description: 'Per-student printable info cards',
    icon: 'idcard'
  }
];

(function injectUniversalNav() {
  const currentFile = (location.pathname.split('/').pop() || '').toLowerCase();

  const style = document.createElement('style');
  style.textContent = `
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
    body { margin-left: 220px; }

    @media (max-width: 1023px) {
      .universal-nav { width: 64px; padding: 16px 6px; align-items: center; }
      .universal-nav .un-brand {
        font-size: 11px;
        text-align: center;
        padding: 4px 0 12px;
        width: 100%;
      }
      .universal-nav .un-item {
        justify-content: center;
        padding: 10px 6px;
        gap: 0;
      }
      .universal-nav .un-icon { width: 22px; height: 22px; margin-top: 0; }
      .universal-nav .un-text { display: none; }
      body { margin-left: 64px; }
    }

    @media (max-width: 639px) {
      .universal-nav {
        position: static;
        width: 100%;
        height: auto;
        flex-direction: row;
        gap: 6px;
        padding: 10px 12px;
        overflow-x: auto;
        overflow-y: hidden;
        align-items: center;
      }
      .universal-nav .un-brand {
        flex-shrink: 0;
        border-bottom: none;
        border-right: 1px solid #374151;
        padding: 4px 12px 4px 0;
        margin-bottom: 0;
        margin-right: 4px;
        width: auto;
      }
      .universal-nav .un-item {
        flex-shrink: 0;
        padding: 6px 10px;
        gap: 6px;
        justify-content: flex-start;
      }
      .universal-nav .un-icon { width: 16px; height: 16px; }
      .universal-nav .un-text { display: block; }
      .universal-nav .un-label { white-space: nowrap; font-size: 12px; }
      .universal-nav .un-desc { display: none; }
      body { margin-left: 0; }
    }

    @media print {
      .universal-nav { display: none; }
      body { margin-left: 0 !important; }
    }
  `;
  document.head.appendChild(style);

  const aside = document.createElement('aside');
  aside.className = 'universal-nav';

  const brand = document.createElement('a');
  brand.className = 'un-brand';
  brand.href = './ClassAI-dashboard.html';
  brand.textContent = 'ClassAI';
  aside.appendChild(brand);

  for (const app of APPS) {
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

  if (document.body) {
    document.body.insertBefore(aside, document.body.firstChild);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.insertBefore(aside, document.body.firstChild);
    });
  }
})();
