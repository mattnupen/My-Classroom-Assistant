# Adding the app to the sidebar (`my-classroom/my-apps.js`)

After the safety check passes, register the new app in `my-classroom/my-apps.js` by adding — or replacing — an entry in the `MY_APPS` array. Every tool page loads that file just before `_nav.js`, so an entry here makes the app appear in the Class Tools sidebar under the **"Your apps"** divider, on every page.

**Never write to `local-tools/_nav.js`.** That file is engine-owned and is replaced wholesale on a project update; anything you put there is destroyed the first time the teacher updates. `my-classroom/` is the half that survives. That is the entire reason this file exists.

**No shell, no `jq`, no JSON parsing** — uses only the standard Read and Write tools, so it behaves identically in Claude Code and Cowork.

## Preconditions

- The safety check (SKILL.md Step 3) returned `CHECK: PASS`. If it failed, stop; do not touch this file.
- `my-classroom/my-apps.js` exists. If `my-classroom/` exists but this file doesn't, copy it from `my-classroom.example/my-apps.js` first. If `my-classroom/` doesn't exist, go back to SKILL.md Step 0.
- The new entry has been built in memory, shaped as a JS object literal with exactly four fields:
  ```js
  { id: '<name>', label: '<App Name>', file: '../my-classroom/apps/<name>/app.html', description: '<one sentence>' }
  ```

### About those four fields

- **`id`** — the folder name from `conversation-flow.md`. Lowercase, dash-separated. Stable forever; never rename an existing one.
- **`label`** — the app's name, as agreed with the teacher. This is what shows in the sidebar.
- **`file`** — relative to the `local-tools/` pages that render the sidebar, which is why it starts with `../my-classroom/`. It is *not* relative to `my-apps.js` itself. Getting this wrong produces a sidebar link that goes nowhere.
- **`description`** — what it's for, one short plain sentence. It becomes the link's hover tooltip.

Do not add an `icon` field. The shipped tools carry one, but `_nav.js` gives every teacher-built app the wrench glyph automatically, and the icon table is engine-owned — a key that exists today may not survive an update.

## Steps

1. **Read** `my-classroom/my-apps.js` with the Read tool. You are looking for the `window.MY_APPS = [` line and its closing `];`.

2. **Check for a duplicate `id`.** Scan the existing entries.

3. **If an entry with that `id` already exists** (the teacher is rebuilding an app): replace that entry in place, keeping its position in the array. Leave every other entry exactly as it was.

4. **If it doesn't exist** (the common case): append the new entry as the last element, adding a trailing comma to the previous last entry if there is one.

5. **Write** the file back with the Write tool. What must round-trip untouched:
   - the header comment block at the top of the file
   - the `window.MY_APPS = [` … `];` assignment shape
   - every other entry, with its fields unchanged
   - any comments the teacher or a previous run left between entries

   Match the existing indentation (2 spaces per entry). If the array is empty, just add the one entry.

## Verify before reporting success

Read `my-classroom/my-apps.js` back and confirm all of these:

- The new entry's `id` appears exactly once.
- Every `id` that was in the file before is still present exactly once — count them against what you read in step 1.
- The file is still valid JavaScript: `window.MY_APPS = [` at the top, one entry per line, commas between entries and none after the last, closing `];`.
- The header comment block is intact.
- `file` starts with `../my-classroom/apps/` and ends with `/app.html`.

If any check fails, fix the file and check again. If you can't, **don't tell the teacher it worked.** Put `my-apps.js` back exactly as you read it in step 1, and tell them plainly: "The app is built, but I couldn't add it to your sidebar. Want me to try again?" A half-written `my-apps.js` breaks the sidebar on every tool page, so it is far better to report a registration failure loudly than to guess.

## Reference shape

A file with two apps registered:

```js
// Your apps — the apps Claude has built for your class.
// Claude adds them here for you; you never need to edit this file.
// Entry shape: { id, label, file, description }
// `file` is relative to the local-tools/ pages: "../my-classroom/apps/<name>/app.html"
window.MY_APPS = [
  { id: 'seating-chart', label: 'Seating Chart', file: '../my-classroom/apps/seating-chart/app.html', description: 'Print a seating grid from the roster' },
  { id: 'lab-checkoff', label: 'Lab Check-off', file: '../my-classroom/apps/lab-checkoff/app.html', description: 'Track which lab stations each group has finished' }
];
```

## Why this is an upsert and not an append

A teacher who asks for "the same app but with the periods on separate pages" gets a rebuild under the same name. Replacing the entry keeps the sidebar stable and keeps `apps/<name>/spec.md` — the lasting record of what they asked for — matched to exactly one registration. Appending a near-duplicate would leave two sidebar rows pointing at the same folder, and the older one would rot.
