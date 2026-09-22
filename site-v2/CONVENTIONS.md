# site-v2 — build conventions

The new My Classroom Assistant homepage, built section by section by separate agents.
Output: `index.html` at the repo root, the live homepage at myclassroomassistant.com. Run `python3 site-v2/tools/build.py` after editing any section.

## Layout

```
site-v2/
  CONVENTIONS.md     this file
  brief.md           product truth + hard content rules (read first)
  copy.md            final marketing copy for every section (copy chief)
  design.md          visual system + per-section motion spec (art director)
  shell.html         <head>, fonts, global CSS hooks — art director owns
  tokens.css         design tokens + shared primitives — art director owns
  engine.js          scroll engine (API below) — do not change the API
  sections/NN-id.html  one fragment per section — one agent owns each file
  tools/build.py     assembler
  tools/shoot.sh     headless screenshot helper
  preview/           generated single-section pages (gitignored)
  shots/             screenshots (gitignored)
  refs/              reference screenshots of award-winning sites (gitignored)
```

**Only edit the files you own.** A section agent edits only its own `sections/NN-id.html`.
If you need a new shared token or primitive, say so in your result — don't edit tokens.css.

## Section fragments

A fragment is plain HTML: one root `<section id="ID">`, then optional `<style>` and `<script>`.

- Scope every CSS rule under `#ID` so sections can't collide (this has bitten us before:
  a `.badge` class in one section silently broke a card in another).
- Use `{{IMG}}/slide.png` for images in the repo's `images/` folder, and `{{ROOT}}` for
  repo-relative links, e.g. `{{ROOT}}local-tools/ClassAI-dashboard.html`.
- Available images: `slide.png` (a Monday projector slide), `student-cards.png`
  (printable progress cards), `dashboard.png` (the Class Tools dashboard),
  `app-studio.png` (the app-builder gallery), `architecture.png` (old diagram — avoid).
  Everything else must be built in HTML/CSS/SVG. No external image hosts.
- External resources allowed: Google Fonts only (declared in shell.html). No JS libraries.
- A pinned sequence is a tall wrapper with `data-pin` holding a `position:sticky` stage.

## Scroll engine (engine.js)

```js
MCA.register(el, "pin" | "pass", function paint(p) { /* p is 0..1 */ });
MCA.stepper(els, p, start, step, dur);   // staggered reveal: sets --t, toggles .on
MCA.clamp01(n); MCA.ease(t);            // easeOutCubic
```

- `pin`: progress across a tall `data-pin` wrapper with a sticky stage.
- `pass`: in-flow block; 0 entering from below, 1 while still comfortably in view.
- `paint(p)` must be pure and cheap — it runs every frame.
- **Reduced motion** paints every sequence once at `p=1`. Your section must look complete,
  legible and correct at `p=1` with no transitions.
- Register from your fragment's `<script>`; the engine starts on DOMContentLoaded.

## Previewing and screenshots

```bash
python3 site-v2/tools/build.py --preview ID          # -> site-v2/preview/ID.html
python3 site-v2/tools/build.py                       # -> index.html (all sections)
site-v2/tools/shoot.sh "URL" site-v2/shots/NAME.png 1440 900
```

URL is `file://` + the absolute path with spaces as `%20`. Query params:

- `?p=0.4` — freeze every sequence at 0.4, transitions off. Capture several p values
  (e.g. 0, 0.25, 0.5, 0.75, 1) to judge a sequence.
- `?flat&p=1` — collapse pinned wrappers for a whole-page overview (use a tall window,
  e.g. `1440 9000`).
- Mobile: width `390`, height `844`.

shoot.sh is parallel-safe. Look at every screenshot you take with the Read tool —
an unviewed screenshot verifies nothing.

**Never screenshot or run anything in `local-tools/`** — project rule. Link to it; don't open it.

## Quality bar

Every section is judged, blind and side by side, against screenshots of award-winning
product sites. "Fine" loses. Specifics that separate AAA from good:
exact type scale and rhythm, optical alignment, restraint, one clear idea per viewport,
motion that explains rather than decorates, crisp detail at 2x, no default-looking UI,
nothing cramped, nothing floating in unexplained empty space, perfect mobile.
