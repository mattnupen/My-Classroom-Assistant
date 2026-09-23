# The safety check

Run this on every app you build, before adding it to `my-classroom/my-apps.js`. You are checking your own work; there is no separate reviewer. The teacher doesn't see any of this — they hear one sentence at the end.

**Be honest.** If you can't show a rule holds by reading the file, it fails. A false pass can leak student information; a false fail only costs a rebuild.

## How

1. Read the **whole** `app.html` from disk with the Read tool. Check what's actually there, not what you meant to write.
2. For each check below, search for every listed string and note each match and your decision. Don't skip a string because you "know" you didn't use it.
3. End with `CHECK: PASS` or `CHECK: FAIL` (with each problem's line and snippet) in your own reasoning.

## Check 1 — One file

- The file ends in `.html`.
- Nothing loads a local sibling file: no `<script src=` other than the SheetJS address, no `<link href=`, no `<iframe`, no `type="module"` scripts or `import` statements.

## Check 2 — Nothing sent off the computer

Search for: `http:` · `https:` · `//` at the start of a `src` or `href` · `fetch(` · `XMLHttpRequest` · `navigator.sendBeacon` · `EventSource` · `WebSocket` · `import(` · `window.open` · `location.href` · `location.assign` · `location.replace` · `<form` · `mailto:`

The only allowed matches: the SheetJS `<script src="https://cdn.sheetjs.com/...">` tag, and the scaffold's Content-Security-Policy line (which names that same address). Anything else fails.

## Check 3 — Nothing kept in the browser

Search for: `localStorage` · `sessionStorage` · `indexedDB` · `caches.open` · `navigator.storage` · `document.cookie`

Any match fails. (Generated apps have no settings worth remembering; the download-and-reload pattern covers the rest.)

## Check 4 — Output only by print, download, screen, or copy

Search for: `showSaveFilePicker` · `showDirectoryPicker` · `showOpenFilePicker` · `FileSystemFileHandle` · `requestFileSystem`

Any match fails. Allowed output: `window.print()`, an `<a download>` link with a `URL.createObjectURL()` blob (it lands in the browser's Downloads folder), text on the page, and `navigator.clipboard.writeText`.

## Check 5 — No real student information inside

- The Content-Security-Policy `<meta>` line is unchanged from `scaffold-base.html`.
- Every name in `PRACTICE_ROWS` (if present) is one you invented for this app. No name, grade, or note the teacher shared in this chat appears anywhere in the file.
- Anything from the teacher's file reaches the page through `textContent` or `esc()`, not raw `innerHTML`.

## After the check

- **PASS:** go on to adding it to the sidebar. Tell the teacher only: "I checked: it never sends anything off your computer."
- **FAIL:** fix the problem and run the whole check again. If you can't fix it: for a NEW app, remove the `app.html` you just wrote and its new, empty folder (you created it this turn and it was never in the sidebar); for an UPDATE, write the previous `app.html` back, as in SKILL.md Step 2. Either way, no `spec.md` and no sidebar entry. Tell the teacher in plain words what you couldn't make safe and offer the closest safe version, e.g. "I couldn't make that part work without going online, so I didn't keep it. I can build it with a list you paste in instead — want that?"
