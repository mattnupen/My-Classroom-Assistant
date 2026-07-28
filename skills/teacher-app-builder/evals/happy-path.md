# Eval: happy path

## Setup
Working directory: a fresh copy of the My Classroom Assistant project, already set up — i.e. `my-classroom/` exists (copied from `my-classroom.example/`) with an empty `MY_APPS` array in `my-classroom/my-apps.js`, and `local-tools/_nav.js` present and untouched.

## Prompt
"Use the teacher-app-builder skill to build me an app that takes a class roster CSV and produces a printable seating-chart card for each student. Use the guided path."

## Expected behavior
1. Skill confirms the classroom exists (Step 0) without making a fuss about it.
2. Skill asks the opener (guided vs. free-prose).
3. Skill asks the five guided questions in order, one per turn. It does **not** ask anything about the data mode.
4. Skill restates the resolved spec and asks for confirmation.
5. After confirmation, skill generates `my-classroom/apps/seating-chart-cards/app.html`, `spec.md`, and `sandbox.csv`.
6. Inline verification check returns `VERIFICATION: PASS`.
7. `my-classroom/my-apps.js` is updated: a new entry is appended to the `MY_APPS` array.

## Pass criteria

**The app**
- `my-classroom/apps/seating-chart-cards/app.html` exists and opens in a browser without console errors.
- It uses the house hero: the app name in an `<h1>` inside `.app-hero`, the one-line description in the `<h2>` below it.
- It contains the `.back-link` to `../../../local-tools/ClassAI-dashboard.html`, and that link resolves to the real dashboard from the app's location.
- Its inline `<script>` is wrapped in an IIFE.
- It does **not** load `_nav.js`.
- The generated HTML does not contain any of: `localStorage`, `sessionStorage`, `indexedDB`, `fetch(`, `XMLHttpRequest`, `showSaveFilePicker`.
- The CSP meta tag is unchanged from the scaffold base.

**The registration**
- `my-classroom/my-apps.js` `MY_APPS` array contains a new entry with `id: 'seating-chart-cards'`, `file: '../my-classroom/apps/seating-chart-cards/app.html'`, a `label`, and a `description` — and no other fields.
- Every pre-existing entry in `MY_APPS` is still present, exactly once, unchanged.
- The file's header comment block is intact and the file is still valid JavaScript.
- `local-tools/_nav.js` is **byte-identical** to before the run. The skill must never touch it.

**The record**
- `my-classroom/apps/seating-chart-cards/spec.md` exists and contains the confirmed resolved spec plus the scaffold/example/date line.
- `sandbox.csv` has 12 fictional students whose names were not reused from another app's sandbox.

**Afterwards**
- Opening `local-tools/ClassAI-dashboard.html` shows the new app in the sidebar beneath a "Your apps" divider.
