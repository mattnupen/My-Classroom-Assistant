---
name: teacher-app-builder
description: Use when a K-12 teacher wants to build their own offline HTML app for their classroom (e.g., printable cards, sortable rosters, parent-message drafts). Generates a single-file HTML app from the project's house scaffold, enforces four privacy invariants via an inline verification check, saves the app and its spec to my-classroom/apps/, and registers it in my-classroom/my-apps.js for the dashboard sidebar. Triggered by "build me an app", "make me a tool", "/teacher-app-builder".
---

# Teacher App-Builder

Help a K-12 teacher build a single-file offline HTML app for their classroom. Every app you produce must satisfy four privacy invariants by construction:

1. Single static HTML file, no build step.
2. No outbound network calls except `https://cdn.sheetjs.com`.
3. No `localStorage` / `sessionStorage` / `indexedDB` of uploaded data.
4. No saving to the filesystem inside the project folder. Output is print or `<a download>` only.

These are enforced by the inline verification check in Step 5 below. Do not skip it. Do not register an app in `my-apps.js` if it fails.

This skill builds Locked-Room tools regardless of the classroom's data mode — these are the only tools that touch student names, and they do it entirely in the teacher's browser.

## Step 0 — Confirm the classroom exists

Apps live in `my-classroom/apps/`. If `my-classroom/` doesn't exist, this project hasn't been set up — pause and run the First Session Protocol from `CLAUDE.md` first (it takes ten minutes and ends with something better than an app: their own assistant). Then return here.

## Step 1 — Open the conversation

Follow `references/conversation-flow.md` exactly. Do not invent your own opener. End this step with a confirmed "resolved spec" in the format shown there, and an explicit teacher "yes."

## Step 2 — Generate the app

1. Choose the matching example from `references/examples/`:
   - Output style "Printable cards" → `printable-cards.html`
   - Output style "On-screen sortable list" → `sortable-list.html`
   - Output style "Downloadable CSV" or "On-screen text to copy" → `csv-export.html`
2. Read `references/scaffold-base.html`. It already carries the house style (the `.app-hero` header, the app palette, an IIFE-wrapped script) — do not restyle it. Substitute the slots:
   - `{{TITLE}}` → the title from the resolved spec
   - `{{INTRO}}` → a one-sentence description, ending with " — nothing leaves your computer."
   - `{{SHEETJS_SLOT}}` → if the app takes a CSV/XLSX file, replace with `<script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>`. Otherwise leave the HTML comment as-is.
   - `{{BACK_LINK}}` → leave the scaffold's default (a plain "← Back to Class Tools" link). Generated apps are standalone: they do not include `_nav.js`.
   - `{{EXTRA_STYLES_SLOT}}` → any per-app CSS additions. Keep small. Do not introduce new CSS variables.
   - `{{BODY_SLOT}}` → the BODY section of the chosen example, adapted to this app's specific fields
   - `{{LOGIC_SLOT}}` → the LOGIC section of the chosen example, adapted to this app's specific fields
3. Write the result to `my-classroom/apps/<slug>/app.html`. Create the folder if it doesn't exist.
4. Do not import or include any URL other than the SheetJS CDN. Do not write any `localStorage` / `sessionStorage` / `indexedDB` / `showSaveFilePicker` / `FileSystemFileHandle` / `fetch(` / `XMLHttpRequest` code. If you find yourself wanting to, you are wrong — re-read the invariants.

## Step 3 — Save the spec

Write `my-classroom/apps/<slug>/spec.md`: the resolved spec from Step 1, verbatim, plus one line naming the scaffold and example used and today's date. This is what makes "rebuild my apps on the new scaffold" possible after future engine updates — the spec is the durable artifact; the HTML is the build.

## Step 4 — Generate the sandbox file (only if the app takes a data file)

If the app's input is a CSV or XLSX file, create `my-classroom/apps/<slug>/sandbox.csv` (always CSV, even if the real input will be XLSX — CSV is easier to read).

- Use 12 fictional students. Generate names that are obviously fake but plausible (e.g., "Avery Brookfield", "Marcus Whitlow"). Generate fresh names each time — do not reuse a fixed roster across apps.
- Populate columns specific to the app's needs.
- Vary the data so the teacher can see how the app handles different cases (e.g., one student with zero issues, one with many).

If the app does not take a data file, skip this step entirely. The file's presence in the app folder is the only signal.

## Step 5 — Verify (THE GATE)

Apply the invariants checklist in `references/verification-prompt.md` to the file you just wrote. This is an inline self-check — you (the model running the skill) read your own generated `app.html` and verify each invariant explicitly. There is no separate reviewer.

Read `references/verification-prompt.md` and follow it step by step. Output `VERIFICATION: PASS` or `VERIFICATION: FAIL` according to the checklist.

- On `VERIFICATION: PASS`: continue to Step 6.
- On `VERIFICATION: FAIL`: tell the teacher the gate failed, show each violation in plain language, and stop. **Do not touch `my-apps.js`.** Leave the generated `app.html` in place so the teacher can inspect it. If a compliant alternative exists (e.g., the teacher asked for localStorage; offer the download-and-reload pattern), propose it instead of just refusing.

## Step 6 — Register in `my-classroom/my-apps.js`

Follow `references/my-apps-upsert.md` exactly. The upsert is a Read → edit → Write flow using only the standard Read and Write tools — **no shell, no `jq`** — so it works equivalently in Claude Code and Cowork.

The entry shape — four fields, nothing more:

```js
{
  "id": "<slug>",
  "label": "<title from resolved spec>",
  "file": "../my-classroom/apps/<slug>/app.html",
  "description": "<problem_solved from resolved spec, one short sentence>"
}
```

Notes:
- `id` is the slug from the conversation-flow rules. Lowercase, dash-separated.
- `file` is relative to the `local-tools/` pages that render the sidebar — hence the `../my-classroom/` prefix. Do not invent extra fields.
- If an entry with the same `id` already exists, replace it; otherwise append. Preserve every other entry, any comments, and the `window.MY_APPS =` assignment shape.
- Verify the post-condition (Read the file back; confirm the new entry's `id` is present) before reporting success.
- Never write to `_nav.js` — that file is engine-owned and replaced on every update.

## Step 7 — Hand off

Tell the teacher:

> "Done. Your new app is at `my-classroom/apps/<slug>/app.html`. To use it, double-click that file in Finder. {{If sandbox: 'I also generated a fictional `sandbox.csv` in the same folder — drag it in first to confirm everything works before you point it at your real data.'}} It's saved in your `my-classroom` folder, so project updates will never touch it — and Class Tools will show it in the sidebar under 'Your apps' next time you open the dashboard."

Do **not** open the app yourself. Do not invoke it via Bash. The teacher launches it.
