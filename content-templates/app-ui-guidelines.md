# App UI Guidelines

The visual standard for the **teacher-facing tool pages** in `local-tools/` (the dashboard and every app in the sidebar). This keeps the suite looking like one product.

*Not to be confused with `classroom-display-rules.md`, which governs **student-facing** output — slides, posters, printed cards. This file is about the apps the teacher uses.*

The AI reads this whenever it creates or edits a local tool. New tools built with the `teacher-app-builder` skill should be conformed to it afterward (the skill's generic scaffold doesn't know these rules).

---

## The header (every app page uses it)

One consistent header — a dark "Ocean Depths" hero band — opens every tool page:

- A **seafoam icon chip** on the left (the app's matching sidebar icon).
- The **app name as the `<h1>`** — the large text. Always the real app name (e.g., "Class Pulse"), never a tagline.
- A **one-line description as the `<h2>`** directly below it.
- Optional: one **cream pill action button** on the right (e.g., Feedback Cleaner's "Need a form?").

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
- The icon SVG uses `stroke="currentColor"` so it picks up the seafoam color from `.app-hero-ico`.

**The Dashboard is the one exception** — it's the home/overview, so its hero shows the *class's* identity (the AI's name, mission, tier chips) rather than the word "Dashboard." It still uses the same dark band and an `<h1>`.

---

## Palette (teacher-app theme)

The apps use the Ocean Depths colors as a light UI (distinct from the projection edition):

| Role | Hex |
|------|-----|
| App canvas background | `#eef4f1` |
| Card / surface | `#ffffff` |
| Primary text (ink) | `#0d1b2a` |
| Hero band | `#1a2332` → `#143a45` gradient |
| Accent (links, progress, key terms) | Deep Teal `#1f6b6b` |
| Fills / chips | Seafoam `#a8dadc`, pale `#e3f1ef` |
| Muted text (AA on white) | `#51646d` |
| Hairline borders | `#d8e6e1` |

## Type & components

- Base body text **16px**; never below 11px.
- Header: `h1` 27px / 700, `h2` 16px / 500.
- Cards: white background, `1px` hairline border, `14px` radius, soft shadow, ~17–19px padding. A small seafoam icon chip + bold title is the card-head pattern.
- Buttons: teal for primary actions; cream pill on the dark hero.
- Honor `prefers-reduced-motion`; keep motion subtle (this is teacher-facing, not student-facing).

## Wiring (every tool page)

- Include the sidebar + shared styles with `<script src="./_nav.js"></script>` (it provides the nav, the `.app-hero` CSS, and the `.demo-btn`).
- Wrap any inline `<script>` logic in an IIFE — `_nav.js` declares globals (`ICONS`, `state`, …) and a bare top-level `const` with the same name will collide and silently break the page.

## Privacy invariants (non-negotiable for any tool)

Every local tool is one **static, offline HTML file**. It must:

1. Be a single `.html` file — no build step.
2. Make **no network calls** except the SheetJS CDN (`https://cdn.sheetjs.com`) when it needs to read `.xlsx`.
3. **Never** store uploaded student data in `localStorage` / `sessionStorage` / `indexedDB`.
4. **Never** write to the filesystem inside the project folder — output is print or an `<a download>` blob only.

These are enforced by construction when you build via the `teacher-app-builder` skill. See `docs/teacher-app-builder.md`.
