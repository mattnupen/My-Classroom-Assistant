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

const APPS = [
  {
    id: 'classai-dashboard',
    label: 'Dashboard',
    file: 'ClassAI-dashboard.html',
    description: 'Class overview and goals'
  },
  {
    id: 'badges',
    label: 'Badges',
    file: 'badges.html',
    description: 'Generate printable student recognition badges'
  },
  {
    id: 'class-pulse',
    label: 'Class Pulse',
    file: 'class-pulse.html',
    description: 'Quick read on how the class is doing'
  },
  {
    id: 'cold-call',
    label: 'Cold Call',
    file: 'cold-call.html',
    description: 'Randomly pick a student to call on'
  },
  {
    id: 'gradebook-analytics',
    label: 'Gradebook Analytics',
    file: 'gradebook-analytics.html',
    description: 'Upload a gradebook CSV for per-student stats'
  },
  {
    id: 'parent-messages',
    label: 'Parent Messages',
    file: 'parent-messages.html',
    description: 'Draft parent-facing messages'
  },
  {
    id: 'random-groups',
    label: 'Random Groups',
    file: 'random-groups.html',
    description: 'Shuffle the class into small groups'
  },
  {
    id: 'student-cards',
    label: 'Student Cards',
    file: 'student-cards.html',
    description: 'Per-student printable info cards'
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
      display: block;
      padding: 8px 10px;
      border-radius: 6px;
      color: #e5e7eb;
      text-decoration: none;
      font-size: 13px;
    }
    .universal-nav .un-item:hover { background: #374151; }
    .universal-nav .un-item.active { background: #4f46e5; color: white; }
    .universal-nav .un-item .un-desc {
      display: block;
      font-size: 11px;
      color: #9ca3af;
      margin-top: 2px;
    }
    body { margin-left: 220px; }

    @media (max-width: 1023px) {
      .universal-nav { width: 64px; padding: 16px 6px; }
      .universal-nav .un-brand {
        font-size: 12px;
        text-align: center;
        padding: 4px 0 12px;
      }
      .universal-nav .un-item {
        text-align: center;
        padding: 8px 4px;
        font-size: 11px;
        line-height: 1.2;
      }
      .universal-nav .un-item .un-desc { display: none; }
      body { margin-left: 64px; }
    }

    @media (max-width: 639px) {
      .universal-nav {
        position: static;
        width: 100%;
        height: auto;
        flex-direction: row;
        gap: 8px;
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
      }
      .universal-nav .un-item {
        flex-shrink: 0;
        padding: 6px 10px;
        font-size: 12px;
        white-space: nowrap;
      }
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
    a.textContent = app.label;
    if (app.description) {
      const d = document.createElement('span');
      d.className = 'un-desc';
      d.textContent = app.description;
      a.appendChild(d);
    }
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
