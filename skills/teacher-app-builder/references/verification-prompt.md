# Invariants Checklist (the privacy gate)

This is the gate. Apply it to every generated HTML file BEFORE registering the app in `my-classroom/my-apps.js`. The model running the skill applies the checks to its own output — there is no separate reviewer.

**Be honest.** If you cannot prove an invariant holds by reading the file, fail the check. The cost of a false PASS is leaked student data; the cost of a false FAIL is the teacher re-running the skill.

## Process

1. Read the **full** text of the `app.html` file you just wrote, using the Read tool. Do not rely on what you intended to write — read what is actually on disk.
2. For each invariant below, search the file exhaustively. Write out each finding explicitly. Do not skim and assume.
3. After all four checks, output `VERIFICATION: PASS` or `VERIFICATION: FAIL`. On fail, list each violation with the line number and snippet.

## Invariant 1 — Single static HTML file

- The file path ends in `.html`.
- The file does not load sibling local JS/CSS/JSON files (other than via the CSP-allowlisted SheetJS CDN script).
- Inline `<script>` and `<style>` are allowed and expected.

**Output:** state whether the file is a single self-contained HTML file. If any local sibling reference exists, fail and quote it.

## Invariant 2 — No outbound network calls outside the allowlist

Search the file for each of these strings (case-sensitive):

- `fetch(`
- `XMLHttpRequest`
- `navigator.sendBeacon`
- `new EventSource`
- `new WebSocket`
- `import(`
- `<script src=`

For every match, quote the line and decide. The **only** allowed match is `<script src="https://cdn.sheetjs.com/...">`. Any other match fails this invariant.

**Output:** "no violations" OR a list of every offending line.

## Invariant 3 — No persistent storage of uploaded data

Search the file for each of:

- `localStorage`
- `sessionStorage`
- `indexedDB`
- `caches.open`
- `navigator.storage`

For every match, read the surrounding code and decide: is the value being stored **only** a UI preference (a remembered text default, a toggle setting) that cannot contain uploaded data? If yes, allow. If uploaded data could flow into the call, or you cannot prove it cannot, fail.

**Output:** "no violations" OR each match with one sentence of reasoning.

## Invariant 4 — No save-to-filesystem inside the project

Search the file for:

- `showSaveFilePicker`
- `showDirectoryPicker`
- `FileSystemFileHandle`
- `requestFileSystem`

Any match fails. The only allowed output mechanisms are `window.print()` (system print dialog) and `<a download>` with a `URL.createObjectURL()` blob (lands in the browser's default Downloads folder).

**Output:** "no violations" OR a list of every offending line.

## Verdict

After all four checks, output exactly one of:

- `VERIFICATION: PASS` — proceed to Step 5 of SKILL.md.
- `VERIFICATION: FAIL` followed by the list of violations — stop. Do **not** register the app in `my-classroom/my-apps.js`. Tell the teacher the gate failed, show the violations and what they mean, and (if a compliant alternative exists) offer to build that instead. Leave the failing `app.html` in place so the teacher can inspect it.

## A note on rigor

You are reviewing code you just wrote. The temptation to rubber-stamp is real. Defenses:

- Output the result of each search literally — do not skip a string just because you "know" you didn't use it.
- A short PASS verdict that doesn't quote any of the file is suspicious. Show your work.
- When in doubt, fail. The teacher would rather rebuild than ship a tool that leaks student data.
