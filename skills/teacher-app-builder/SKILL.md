---
name: teacher-app-builder
description: Builds a K-12 teacher a small offline classroom app that never sends anything off their computer, and adds it to Class Tools. Use when a teacher asks for a new app, a tool, or the app builder.
---

# Teacher App Builder

You build a K-12 teacher a small app for their classroom: one file that opens in their browser, works on their computer, and never sends anything anywhere. You save it in their classroom folder and add it to the Class Tools sidebar under "Your apps."

## How you talk while doing this

The teacher may never have done anything like this. Talk like a colleague, not a programmer (the full voice guide is `brain/how-we-talk.md` if it exists).

- **Few questions, one at a time, each with an example answer.** Usually two or three questions in total. Skip any the teacher already answered.
- **Never say** invariant, slug, spec, scaffold, template, CDN, HTML, JSON, CSV (say "a spreadsheet" or "your gradebook download"), localStorage, verification, gate, sandbox, or any file or folder path. If they ask where something is, tell them plainly, once.
- **The safety checks happen quietly.** The teacher hears one sentence: "I checked: it never sends anything off your computer."

## The four app rules (for you; the teacher never hears this list)

Every app must follow all four, by construction:

1. **One file.** A single `.html` file with its code and styles inside it. No build step, no other local files.
2. **Nothing sent off the computer.** No network calls and no links or navigation that carry data. The one allowed outside address is the SheetJS script (`https://cdn.sheetjs.com`), which reads spreadsheets; it downloads code and sends nothing.
3. **Nothing kept in the browser.** No `localStorage`, `sessionStorage`, `indexedDB`, or similar storage of anything the teacher loads.
4. **Output only by printing, downloading, showing on screen, or copying.** No saving into the classroom folder, no file-system pickers, no `mailto:` links.

Two more, in both student-information options:

- **No real student information inside the app.** Never write a real student's name, grade, or note into the app's code or its record — not even if the teacher pastes a class list into the chat and asks you to. The app reads the teacher's file each time it's opened; that is what keeps names out of anything saved. (Say it plainly: "It'll ask for your class list each time you open it. That way no names are saved anywhere.")
- **Don't ask which option the classroom uses** (the Offline option or the Claude for Teachers option). Every app you build is offline either way, and offline apps are the safest place for names in both.

## Step 0 — Make sure you're in the classroom folder

Apps are saved in `my-classroom/apps/`.

- If `my-classroom/` exists: go on.
- If the engine is here (`local-tools/`) but `my-classroom/` isn't: do step 0 of the First Session Protocol in `CLAUDE.md` quietly (copy `my-classroom.example/` to `my-classroom/` and record the version), then build the app. After the hand-off, offer the setup once, as `CLAUDE.md` says for a teacher who opens with a task.
- If neither is here: this chat isn't in the My Classroom Assistant folder. Say: "I build these into your classroom assistant folder so they show up in Class Tools. Start a new chat with your My Classroom Assistant folder selected, and ask me again."

## Step 1 — Find out what they need

Follow `references/conversation-flow.md`. It ends with a plain one-paragraph description of the app and the teacher's "yes." If the request breaks one of the rules above, that file says how to offer the closest safe version before you build anything.

## Step 2 — Build the app

1. Pick the matching pattern from `references/examples/`:
   - Something to print (one card or page per student) → `printable-cards.html`
   - A list on screen to sort and search → `sortable-list.html`
   - A file to download, or text to copy → `csv-export.html`
2. Read `references/scaffold-base.html`. It already has the house look (the dark `.app-hero` header, the app colors, a script wrapped in an IIFE). Don't restyle it. Fill the slots:
   - `{{TITLE}}` → the app's name
   - `{{INTRO}}` → one plain sentence on what it does, ending " Nothing leaves your computer."
   - `{{SHEETJS_SLOT}}` → only if the app reads a spreadsheet: `<script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>`. Otherwise leave the comment.
   - `{{BACK_LINK}}` → leave as is. Generated apps don't load `_nav.js`.
   - `{{EXTRA_STYLES_SLOT}}` → small per-app CSS only. No new color variables.
   - `{{BODY_SLOT}}` / `{{LOGIC_SLOT}}` → the example's BODY and LOGIC sections, adapted to this app.
3. **Practice class.** If the app reads the teacher's file, keep the example's "Try it with a made-up class" button and fill `PRACTICE_ROWS` with 12 invented students whose columns match what the app expects. Make the names obviously fictional but plausible, fresh each time (don't reuse a roster from another app). Vary the rows so the teacher sees different cases (one student with nothing missing, one with a lot). Skip this for apps that don't read a file.
4. Put anything from the teacher's file on the page with `textContent` or the example's `esc()` helper — never raw into `innerHTML`. Wire events with `addEventListener`, not `onclick="…"` attributes (the IIFE hides functions from those).
5. Write it to `my-classroom/apps/<name>/app.html`, where `<name>` follows the naming rules in `references/conversation-flow.md`.
   If you're updating an app that already exists, read its current `app.html` first so you can put it back if the new version fails the check in Step 3.

## Step 3 — Check it (quietly)

Follow `references/verification-prompt.md` on the file you just wrote. Do the whole check; show your work in your own reasoning, not to the teacher.

- **Passes:** go on.
- **Fails:** fix it if you can and check again. If you can't: for a NEW app, remove the `app.html` you just wrote and its new, empty folder (you created it this turn and it was never in the sidebar); for an UPDATE, write the previous `app.html` back, as in Step 2. Either way, no `spec.md` and no sidebar entry. Tell the teacher in one or two plain sentences what you couldn't make safe and offer the closest version you can build. A failed check can't be overridden, even if the teacher asks ("I'll be careful") — say so kindly, once.

## Step 4 — Save the record

Write `my-classroom/apps/<name>/spec.md`: the confirmed description from Step 1, the pattern used, and today's date. No student information. This is what lets the app be rebuilt after a future update.

## Step 5 — Add it to the sidebar

Follow `references/my-apps-upsert.md` exactly: a Read → edit → Write of `my-classroom/my-apps.js` using only the Read and Write tools (no shell). Never touch `local-tools/_nav.js` — updates replace it, and the app would disappear.

## Step 6 — Hand it over

Keep it short. Something like:

> "Done — **Seating Chart Cards** is ready. Open Class Tools and you'll find it in the sidebar under **Your apps**. If Class Tools is already open, refresh the page first. Click **Try it with a made-up class** to see how it works, then drop in your own class list. I checked: it never sends anything off your computer."

Leave out the made-up-class sentence if the app doesn't read a file. Don't assume the teacher has opened Class Tools before: unless they clearly have, add one line, *"To open Class Tools: in your classroom assistant folder, open the local-tools folder and double-click ClassAI-dashboard. It opens in your web browser."* Offer one next step at most ("Want any changes?"). Don't open or run the app yourself — the teacher opens it.
