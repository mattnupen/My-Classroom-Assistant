# v2.0 Integration Report

**Executed:** 2026-08-10 · **Branch:** `v2.0-integration` (6 commits, `09b70c3`…`88940b4`)
**Against:** `mca-10x-handoff/` (work order dated 2026-07-27)
**Scope:** 69 files changed, +2,118 / −420. Marketing materials untouched, as instructed.

All six phases are complete and signed off. This report covers what changed, what I adapted because the repo differed from the work order's assumptions, what's verified, and what's still open.

---

## 1. What changed

### Added (34 files)

| Group | Files |
|---|---|
| The classroom template | `my-classroom.example/` — 13 files including `data-policy.md`, `dashboard.md`, `dashboard-data.js`, `my-apps.js`, `.installed-version`, and READMEs for `pulses/`, `apps/`, `for-class/`, `inbox/`, `evidence-packs/` |
| Update system | `VERSION`, `CHANGELOG.md`, `migrations/2.0-adopt-existing-setup.md` |
| Challenge Deck | `brain/challenge-deck/` — README/template + 5 cards |
| The skill, in-repo | `skills/teacher-app-builder/` — 10 files (SKILL.md, 5 references, 3 examples, 2 evals) |
| Templates | `content-templates/season-snapshot.jsx`, `architecture.mermaid` |
| Docs | `setup/permissions/data-mode-record.md`, `docs/about.md` |

### Moved (2 files, git-tracked as renames)

- `brain/your-classroom-ai.md` → `my-classroom.example/your-classroom-ai.md` (94% similarity)
- `brain/class-story.md` → `my-classroom.example/class-story.md` (79% similarity)

Copy-first, per ground rule 6; originals removed only after the reference sweep came back clean. **Nothing was deleted in this integration.**

### Modified (33 files)

`CLAUDE.md` · `README.md` · `TUTORIAL.md` · `.gitignore` · `index.html` · all 10 `local-tools/*.html` + `_nav.js` · `brain/{README,safety-rules,weekly-rhythm}.md` + `evidence-packs/improving-attendance.md` · all 6 `setup/permissions/*` · `setup/getting-started.md` · 5 `content-templates/*` · `docs/teacher-app-builder.md` · `teacher-app-builder-skill-upload.zip`

---

## 2. The two empirical checks — **still open**

The work order asked these be run early. `test.md` and `test.jsx` are in the repo root and **await Matt's eyes** — I can create the files but cannot observe how Cowork renders them.

1. **Do they render on creation?** — unanswered.
2. **Does `test.md` re-render when closed and reopened, or show raw text?** — unanswered.

**This is not blocking, because I wrote `CLAUDE.md` to be correct either way.** The Cowork-dashboard section reads: *"bring it up to date and open it — if this build of Cowork doesn't re-render existing files on open, regenerate it so it renders fresh."* If the answer turns out to be "renders only on creation," no edit is needed; the instruction already covers it. If it renders both times, the clause is harmless.

**Action:** look at both files, then delete them. If re-opening shows raw text, consider hardening that clause from conditional to unconditional ("regenerate `dashboard.md` rather than opening it").

---

## 3. Where the repo differed from the work order

The work order was written against 2026-07-27; the repo's last commit was 2026-06-22, so nothing of yours had drifted. But several assumptions about file *internals* were wrong:

| # | Assumed | Actual | What I did |
|---|---|---|---|
| 1 | Dashboard cards are `{id, title, body, progress, tone}` | Real schema has top-level `title`/`subtitle`, and cards carry `size` and `type` (`text`/`progress`/`checklist`/`dates`/`files`), where `type` decides whether `body` is a string or an array | Ported the real schema into the template and corrected `CLAUDE.md`. §4 explicitly authorised this. |
| 2 | `_nav.js` has a place where it "builds its app list" to concat | It's a localStorage state machine (`state.enabled`/`state.disabled`) with no single concat point | Merged `MY_APPS` through the same path that already merges newly-shipped `DEFAULT_APPS`. See §4 below. |
| 3 | Teacher app entries are 4 fields | Shipped entries carry a 5th, `icon`, and the renderer does `ICONS[app.icon]` — a 4-field teacher app would render a blank icon slot | Kept the 4-field shape and made `_nav.js` default a missing icon to the wrench glyph, so the skill never needs to know the icon table. |
| 4 | Skill reference is `manifest-rebuild.md` | No such file; it was `nav-rebuild.md`, and no `manifest.json` existed anywhere in the repo | Renamed to `my-apps-upsert.md` and rewrote. The "nothing mentions manifest.json" criterion was already half-met. |
| 5 | `anthropic.com/learn/claude-for-teachers` | **404** | Used `claude.com/solutions/teachers`. Also found [the Claude for Teachers data terms](https://support.claude.com/en/articles/15926041-claude-for-teachers-your-data-and-our-terms) — the K-12 DPA/FERPA citation the Mode B collateral needed, now cited in four places. |
| 6 | `app-ui-guidelines.md` folds cleanly into the scaffold | It says the `.app-hero` CSS "lives once in `_nav.js`" — but generated apps are standalone and never load `_nav.js`. Following both literally yields hero markup with no hero CSS | Scaffold carries the style inline; both files now cross-reference the duplication instead of hiding it. |

### Files I touched that no spec mentioned

- **`brain/README.md`** — documented `your-classroom-ai.md` as living in `brain/`; broke on the move.
- **`content-templates/README.md`** — was missing `persona-card.html`, `slide-template.html`, and `app-ui-guidelines.md` *before* this work, plus the two new templates.
- **`checklist.md`** — said "read all four files in `brain/`" (there are seven).
- **`day-one-lesson-plan.md`, `lms-intro-page.md`** — see §5.

---

## 4. Three changes worth a second look

### The `_nav.js` merge is real design, not the spec's two-line concat

Teacher entries are tagged `teacher: true`, refreshed from `my-apps.js` on every load (so a renamed label propagates without clearing settings), dropped when the app no longer exists, kept out of the "copy this into `DEFAULT_APPS`" export in Settings, and given a default icon. `defaultState()` and the Settings **Reset** both include them.

Since I can't drive a browser, I extracted the pure functions and ran **12 behavioural tests** in Node: fresh install, app added, app deleted, `my-classroom/` absent entirely, label renamed, app parked in "Additional apps", corrupt `MY_APPS`, link paths. All pass. That is not a substitute for your `file://` check, but the logic is exercised rather than merely parsed.

### The privacy collateral had a legal accuracy problem

`privacy-explainer.md` stated that state vendor-agreement laws "generally do not apply" because no data reaches a third party. **Under Direct mode that is false** — student records *are* processed by a third party, which is precisely what SOPPA, Ed Law 2-d, and SOPIPA govern. Same issue in the FERPA section. Both are now scoped, with Direct mode routed to the district's normal vendor process. A privacy officer would have caught this.

### Two student-facing scripts asserted something Direct mode makes untrue

`day-one-lesson-plan.md` and `lms-intro-page.md` are **read aloud to children** and posted in an LMS. Both said the AI never sees who scored what. Each now carries the Locked-Room wording as primary with the true Direct-mode alternative beside it. These weren't in §7's file list; leaving them would have had teachers telling classes something false.

---

## 5. Verified

- Every path `CLAUDE.md` references resolves.
- All 5 challenge cards link to a real evidence pack.
- A generated pulse file contains **none of the 24 demo-roster names** — checked by executing the real `buildPulseMarkdown()` against a realistic aggregate and diffing against `sandbox/fictional-gradebook.csv`.
- The pulse's name-free property is structural: `renderStructured`/`renderProse` read only the aggregate snapshot (counts, three tier integers, assignment→count pairs). No code path reaches a student row.
- `_nav.js`, `class-pulse.html`, `ClassAI-dashboard.html`, and both `my-classroom.example` JS files parse; both dashboard JSON blocks are valid.
- The skill zip is **byte-identical** to `skills/teacher-app-builder/`.
- README is **472 words**; all local links resolve.
- `git status` shows `my-classroom/` ignored.
- `VERSION` and `my-classroom.example/.installed-version` both read `2.0.0`.

---

## 6. Open items

### 🔴 Release blocker — the site's HTTPS certificate

`https://myclassroomassistant.com` serves the `*.github.io` certificate. **Your README's headline link throws a browser security warning.**

Your DNS is correct — all four GitHub Pages A records on the apex, no conflicting CNAME, `www` pointed at `mattnupen.github.io`. GitHub simply never issued the cert. `http://` returns 200, and `mattnupen.github.io` 301-redirects to **`http://`** — that redirect target confirms "Enforce HTTPS" is off because no certificate exists.

**Fix (yours — it's repo settings):** Settings → Pages → remove the custom domain, save, re-add `myclassroomassistant.com`, save. Wait for "Certificate provisioned," then tick **Enforce HTTPS**. Standard stuck-cert remedy when a domain is added before DNS resolves. A cert warning on a privacy-focused project is the worst possible first impression — do this before announcing.

### Decisions waiting on you

1. **`index.html` still asserts the absolute** in four places ("the AI never sees student-identifying data"). You scoped the website to naming-only, so I left the privacy framing. The public site now claims something stronger than the product guarantees for a Direct-mode teacher. Two minutes to port the README's "private by default, direct by permission" line if you want it. *(2.1: still open. The option names are now "the Offline option" and "the Claude for Teachers option", and the latter allows sharing in the chat, so the site's claim should be scoped to "by default".)*
2. **`docs/about.md`** — I preserved the origin story, pilot data, four constraints, app descriptions, file map, and all five screenshots there rather than deleting them with the old README (which would have orphaned `images/`). If you'd rather the short README stand alone, that's one commit to revert.
3. **`CHANGELOG.md`** still says `## 2.0.0 — [release date]`. Yours to date at tag time.
4. ~~**`reading-comprehension.md` carries a TODO.**~~ **Closed in 2.1:** the reading challenge now counts groups using a strategy unprompted, and the pack's "How to tell if it's working" section explains why a weekly reading test can't show progress within a season.
5. **`privacy-one-pager.html` gained ~4 lines** — worth a ⌘P to confirm it still fits one page.

### Your manual verification list (browser work, not mine)

1. `ClassAI-dashboard.html` via `file://` with **no** `my-classroom/` — shipped tools in the sidebar, built-in welcome cards, no page-breaking console errors.
2. Same **with** a populated `my-classroom/` — teacher apps under "Your apps," cards from `dashboard-data.js`.
3. `class-pulse.html` → **Download this pulse** → dated filename, no student names anywhere in it.
4. One app built through the rebuilt skill: opens standalone, passes its gate, appears in the sidebar on reopen.

---

## 7. Next steps

1. **Reinstall `teacher-app-builder-skill-upload.zip`** in Cowork. The skill loaded in the session that did this work is still the old one — it writes to `local-tools/` and its description still advertises `manifest.json`. Nothing from Phase 4 takes effect until you reinstall.
2. Fix the HTTPS certificate.
3. Work the manual verification list.
4. Merge `v2.0-integration` → `main`, then **tag `v2.0.0`**.
5. **Pilot the migration with 2–3 real teachers before announcing.** `migrations/2.0-adopt-existing-setup.md` has never been run against a real pre-2.0 classroom — only read. It is the single least-tested thing in this release, and it runs against folders that already contain a teacher's live semester.
