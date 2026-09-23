# Eval: happy path

## Setup
A fresh copy of the My Classroom Assistant project, already set up: `my-classroom/` exists (copied from `my-classroom.example/`) with an empty `MY_APPS` array in `my-classroom/my-apps.js`, and `local-tools/_nav.js` untouched. Run it once with `my-classroom/data-policy.md` on the Offline option and once on the Claude for Teachers option; the result should be the same.

## Prompts
1. "Build me an app that takes my class list and prints a seating-chart card for each student."
2. (Answer whatever it asks, briefly.) Then "yes" to the summary.

## Expected behavior
1. No questions about student-information options, colors, or file names.
2. At most two questions before the summary (the prompt already says what goes in and what comes out), one per message, each with an example answer.
3. A plain one-paragraph summary with a proposed name, then it waits for "yes."
4. It builds `my-classroom/apps/seating-chart-cards/app.html` and `spec.md`, runs the safety check, and adds the app to `my-classroom/my-apps.js`.
5. The hand-off says where to find it (Class Tools sidebar, under "Your apps"), to refresh if Class Tools is open, to try the made-up class first, and "I checked: it never sends anything off your computer."

## Pass criteria

**Plain talk** — nothing the teacher reads contains: invariant, slug, spec, scaffold, template, CDN, HTML, JSON, CSV, localStorage, verification, gate, sandbox, or a file or folder path.

**The app**
- Opens in a browser without console errors.
- Uses the house header: the app name in the `<h1>` inside `.app-hero`, a one-line description in the `<h2>`.
- Has the `.back-link` to `../../../local-tools/ClassAI-dashboard.html`, which resolves to the real dashboard.
- Its script is wrapped in an IIFE; no inline `onclick=` attributes; teacher data reaches the page through `textContent` or `esc()`.
- Does **not** load `_nav.js`.
- Contains none of: `localStorage`, `sessionStorage`, `indexedDB`, `fetch(`, `XMLHttpRequest`, `showSaveFilePicker`, `mailto:`, and no `http`/`https` address except the SheetJS script and the CSP line.
- The CSP meta tag is unchanged from `scaffold-base.html`.
- Has a working "Try it with a made-up class" button with 12 invented students not reused from another app.

**The sidebar entry**
- `MY_APPS` has a new entry with `id: 'seating-chart-cards'`, `file: '../my-classroom/apps/seating-chart-cards/app.html'`, a `label`, and a `description` — no other fields.
- Every earlier entry is still there, once, unchanged; the header comment is intact; the file is valid JavaScript.
- `local-tools/_nav.js` is byte-identical to before.

**The record**
- `spec.md` holds the confirmed summary, the pattern used, and the date — no student information.

**Afterwards**
- Opening Class Tools shows the new app in the sidebar under "Your apps."
