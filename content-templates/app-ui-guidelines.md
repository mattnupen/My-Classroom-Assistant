# App UI Guidelines

The visual standard for the **teacher-facing tool pages** in `local-tools/` (Class Tools and every app in its sidebar). This keeps the suite looking like one product.

**Names.** The browser home page (`ClassAI-dashboard.html`) is **your dashboard**: the graph of the class's number, beside the chat in Cowork, and the page the teacher double-clicks to open the offline apps. Its heading is "Class Tools" until it has a graph, then the class ("7th Grade Science"). **Class Tools** names the set of offline apps, and stays the sidebar label. The AI's notes (`my-classroom/dashboard.md`) are never shown to teachers.

*Not to be confused with `classroom-display-rules.md`, which governs **student-facing** output — slides, posters, printed cards. This file is about the apps the teacher uses.*

**The app-builder scaffold implements this standard — generated apps inherit it automatically.** `skills/teacher-app-builder/references/scaffold-base.html` carries the hero, the palette, and the IIFE rule inline, so there's no conforming pass to do after a build. The AI reads this file when it creates or edits a **shipped** tool in `local-tools/`, and when the scaffold and this document need to be brought back into sync.

---

## The header (every app page uses it)

One consistent header — a dark **chalkboard sheet**, the same "Chalk & Marker" look as the homepage (`site-v2/design.md`) — opens every tool page:

- A **sticky-note icon tile** on the left (the app's matching sidebar icon, on a yellow note).
- The **app name as the `<h1>`** — the large text. Always the real app name (e.g., "Class Pulse"), never a tagline.
- A **one-line description as the `<h2>`** directly below it: what the tool is for, then **when** to use it ("Use it before group work.").
- Optional: one **cream action button** on the right (e.g., Feedback Cleaner's "Need a form?").

The CSS lives once in `local-tools/_nav.js` (class `.app-hero`), so pages only supply the markup and every page matches automatically. Put the header as the first child of the page's main content container so it inherits the page padding.

```html
<header class="app-hero">
  <span class="app-hero-ico" aria-hidden="true"><svg viewBox="0 0 24 24" …>…</svg></span>
  <div class="app-hero-text">
    <h1>App Name</h1>
    <h2>One-line description of what this tool does.</h2>
  </div>
  <!-- optional: <div class="app-hero-action"><button class="app-hero-btn">…</button></div> -->
</header>
```

Rules:

- The `<h1>` is the **app name**; the `<h2>` is the **description**. Don't put the name in a small eyebrow/kicker.
- **One description per page.** The sidebar shows titles only, so the page's `<h2>` is where the description lives. Don't repeat it again below the header.
- The icon SVG uses `stroke="currentColor"` so it picks up the ink color from `.app-hero-ico`.

**Class Tools is the one exception** — it's the home page, so it looks like the homepage hero instead of a chalk band: a big headline on graph paper showing the *class's* identity (the AI's name, mission, group chips), with **See a demo class** beside it and a handwritten margin note pointing at the button. Below it sits the "How Class Tools works" panel (a sky-blue sheet: what this is, what to do first, how it fits with the chat in both options); keep it, and keep it short. Its cards are objects, chosen by card `type`: the current move (`text` card whose id mentions focus) is a **sticky note**, `progress` is the homepage's **year ruler**, `checklist` uses **tick discs**, `dates` get **date chips**, `files` become **file chips**. Opening it with `#demo` at the end of the address starts it in the demo class.

---

---

## Words on the page

Teachers read every word, so use theirs:

| Instead of | Say |
|---|---|
| CSV / XLSX | your gradebook file (a .csv or Excel file) |
| export | download — except when naming the gradebook's own **Export** button |
| JSON, state file | memory file (Badges, Random Groups) · comparison file (Class Pulse) |
| snapshot, pulse | weekly class summary (the app can keep its name, Class Pulse) |
| sandbox, fictional | demo class, made-up students |
| tier | group (Strong / Steady / Struggling can stay) |

**The first step is obvious.** Any tool that reads a gradebook opens with a drop zone that says "Drop your gradebook file here," a **Load demo class** button (the fictional `CLASSAI_DEMO` in `_nav.js`), and one hint: how to get the file from the gradebook. Anything the teacher hands to the chat gets numbered steps and a paste-it-instead fallback (see Class Pulse).

## Palette and type ("Chalk & Marker", shared with the homepage)

The shell (sidebar, header, buttons, Class Tools) uses the homepage's system from `site-v2/design.md`. In `_nav.js` its colors are prefixed `--ct-` so they never collide with a tool page's own variables.

| Role | Hex |
|------|-----|
| Page paper | `#FAF6EE` (recessed `#F3EDE1`) |
| Card / surface | `#FFFFFF` |
| Ink (text, the chalkboard sidebar and header) | `#14231F` · body `#3F4F49` · meta `#5A6862` |
| The marker — the only color that points (arrows, margin notes, the demo stamp, the current-page icon) | `#FF5A1F` · as text `#C24410` · tint `#FFE3D3` |
| Supply-cupboard tints (one per card type) | sky `#E7F0FF` · sun `#FFF2C4` · mint `#E0F3E7` · coral `#FFE6DD` · lilac `#EEE8FF` |

- **Fonts are bundled** in `local-tools/fonts/` (Bricolage Grotesque for headings, Figtree for everything else, Caveat for handwritten notes, DM Mono for file names; all SIL Open Font License, licenses alongside). Nothing is fetched from the internet. Never link Google Fonts from a tool page.
- Base body text **16px**; never below 11px. Header `h1` 30px Bricolage 750, `h2` 16.5px Figtree 500.
- Cards: white, 20px radius, soft ink-tinted shadow plus a hairline inset, ~22px padding; a small tinted icon tile + Bricolage title is the card-head pattern. No hover lift on cards that aren't clickable.
- Buttons: ink (chalk) for the main action, white with a hairline for secondary; hover lifts 1px, press sinks 1px. Orange is never a button fill in the tools.
- Motion only shows a change of state (the demo swap, the ruler line drawing in, the drawer). Honor `prefers-reduced-motion`.
- **Inside the tool pages** (drop zones, steps, forms, results, tables, charts) the same tokens apply, unprefixed, in each page's own `:root`, plus text-safe inks for meaning on tinted sheets: good/Strong mint `#E0F3E7` + `#15693D`, info/Steady sky `#E7F0FF` + `#1F4FB0`, warning sun `#FFF2C4` + `#7A5800`, problem/Struggling coral `#FFE6DD` + `#A83A22`. Step cards are white 20px cards with a Bricolage heading in sentence case; drop zones are dashed paper-2 that turn sky on hover. Add `[hidden] { display: none !important; }` to any page that sets `display` on elements it also hides. The skill's scaffold (`scaffold-base.html`) carries the same look inline, with fonts falling back to the system font since generated apps load no files.

## Wiring (every tool page)

- Load the teacher's own apps, then the sidebar: `<script src="../my-classroom/my-apps.js"></script>` followed by `<script src="./_nav.js"></script>`. The first is absent on a fresh install and fails silently, which `_nav.js` handles; the second provides the nav, the `.app-hero` CSS, and the `.demo-btn`.
- Wrap any inline `<script>` logic in an IIFE — `_nav.js` declares globals (`ICONS`, `state`, …) and a bare top-level `const` with the same name will collide and silently break the page.
- **Apps generated by the skill are the exception:** they live outside `local-tools/`, load neither script, and carry their own copy of this style. They get a plain "← Back to Class Tools" link instead of the sidebar.

## The app rules (non-negotiable for any tool)

Every local tool is one **static, offline HTML file**. It must:

1. Be a single `.html` file — no build step.
2. Make **no network calls** except the SheetJS CDN (`https://cdn.sheetjs.com`) when it needs to read `.xlsx`.
3. **Never** store uploaded student data in `localStorage` / `sessionStorage` / `indexedDB`.
4. **Never** write to the filesystem inside the project folder — output is print, an `<a download>` blob, on-screen, or copy to clipboard.

And the fifth rule, which decides where a thing belongs in the first place:

5. **If an app touches names, it runs offline in the teacher's browser.** If it only uses class totals, it can live in Cowork.

The first four are enforced by construction when you build via the `teacher-app-builder` skill — its safety check refuses to add an app that breaks one to the sidebar. See `docs/teacher-app-builder.md`.
