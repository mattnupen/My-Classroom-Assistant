# Class AI Dashboard — Design

**Date:** 2026-05-17
**Status:** Approved for implementation planning

## Purpose

A teacher-facing homepage for the MyClassroomAIbot project. It serves two jobs:

1. **Launcher** — quick access to all offline local-tools (missing-work cards, slides, seating chart, etc.) via a left sidebar.
2. **Aggregated progress view** — a flexible canvas of cards showing class goals, curriculum progress, upcoming dates, and reflections — populated and updated by Claude Cowork through conversation with the teacher.

The dashboard is purely visual (read-only in the browser). All authoring happens through Claude Cowork chats; Claude writes to two JSON files which the dashboard reads.

## Non-Goals

- No per-student data display. Aggregate text only.
- No interactive editing inside the page (no inline forms, no in-page text fields).
- No backend, no auth, no analytics. Static files only.
- No fixed content schema for cards — what shows up is determined during teacher onboarding, not hardcoded.

## Architecture

### File Structure

```
MyClassroomAIbot/
├── local-tools/
│   ├── index.html                ← the dashboard (homepage)
│   ├── dashboard-data.json       ← Claude-edited: cards content
│   ├── apps-registry.json        ← Claude-edited: sidebar tools list
│   ├── missing-work-cards.html   ← existing local tool
│   └── [other apps as added]
```

### Runtime Behavior

1. Teacher opens `local-tools/index.html` in their browser (double-click).
2. The page fetches `./dashboard-data.json` and `./apps-registry.json` via `fetch()`.
3. JS renders the sidebar from `apps-registry.json` and the bento grid of cards from `dashboard-data.json`.
4. Sidebar links are plain anchors (`<a href="./missing-work-cards.html">`) — navigation is the browser's default behavior.

### Why Two JSON Files

Different update cadences. `apps-registry.json` changes rarely (a new tool ships). `dashboard-data.json` changes often (Claude updates cards during a cowork chat). Separate files mean smaller diffs and lower conflict risk.

## Data Schemas

### `apps-registry.json`

```json
{
  "apps": [
    {
      "id": "missing-work-cards",
      "label": "Missing Work Cards",
      "file": "missing-work-cards.html",
      "description": "Print per-student cards from a gradebook CSV"
    }
  ]
}
```

Fields:
- `id` — stable identifier (lowercase-kebab). Never renamed once set.
- `label` — display text in the sidebar.
- `file` — sibling filename in `local-tools/`. Used as the link href.
- `description` — optional short blurb shown on hover or in a tooltip.

### `dashboard-data.json`

```json
{
  "title": "My Class",
  "subtitle": "Period 3 · Algebra I",
  "cards": [
    {
      "id": "unit-progress",
      "size": "large",
      "type": "progress",
      "title": "Unit 3: Algebraic Expressions",
      "body": "60% complete · on pace · quiz Thursday",
      "progress": 0.6,
      "tone": "neutral"
    }
  ]
}
```

Top-level fields:
- `title` — header text shown above the bento grid.
- `subtitle` — secondary text below the title.
- `cards` — array of card objects.

Card fields:
- `id` — stable identifier. Never renamed once set; used by Claude to locate cards for updates.
- `size` — `large` | `medium` | `small`. Drives bento grid placement.
- `type` — renderer key. Day-1 set: `progress`, `text`, `dates`, `checklist`.
- `title` — card heading.
- `body` — main text content.
- `progress` — number 0–1 (only used by `progress` type).
- `tone` — `neutral` | `good` | `warning`. Affects accent color.

### Card Types (Day 1)

All types accept `tone` (`neutral` | `good` | `warning`), which colors the card's accent (border-left stripe and progress bar where applicable).

| Type | Body shape | Purpose |
|---|---|---|
| `progress` | string (caption); `progress` field 0–1 | Goals/units with completion percentage |
| `text` | string | Free-form prose, reflections, focus areas |
| `dates` | array of strings | Upcoming events |
| `checklist` | array of `{text: string, done: boolean}` | Multi-item goals |

Unknown card `type` renders as a plain text card with a small "unknown type" note so the teacher notices but the dashboard doesn't crash.

## Visual Design

### Aesthetic

Clean, calm, teacher-friendly. Light theme. Typography matches the existing `missing-work-cards.html` to keep the suite visually coherent.

### Color Palette

- Background: `#fafaf9` (warm off-white)
- Cards: white with `#e7e5e4` border
- Sidebar: `#1f2937` (dark slate) with light text — anchors the homepage visually distinct from the lighter tool pages
- Accent: `#4f46e5` (indigo) for active nav + progress bars
- Tone — good: `#10b981` (green)
- Tone — warning: `#f59e0b` (amber)
- Typography: system font stack (no web font dependency)

### Layout — Bento Grid

CSS Grid with `grid-auto-flow: dense` so smaller cards backfill gaps left by large ones.

Size mapping (desktop):
- `large` — spans 2 cols × 2 rows
- `medium` — spans 1 col × 2 rows, or 2 cols × 1 row (grid auto-flow decides)
- `small` — 1 col × 1 row

### Responsive Breakpoints

| Width | Sidebar | Main grid |
|---|---|---|
| ≥1024px | 220px fixed | 4 columns |
| 640–1023px | 64px (icons only, label on hover/tap) | 2 columns |
| <640px | Top bar with hamburger menu | 1 column, all cards full-width |

At narrow widths, card size classes flatten — all cards become equal width.

### Print

A `@media print` rule hides the sidebar and stacks cards vertically. Print isn't a primary use case but Cmd-P should produce something sane.

### Offline

Zero external dependencies. No web fonts, no CDN scripts, no analytics. After first open, works fully offline.

## Claude Cowork Update Model

The dashboard is read-only in the browser. All authoring happens via Claude editing the JSON files during a cowork conversation.

### Update Flow

1. Teacher chats with Claude (e.g., "We finished the warm-up routine goal — 5/5 weeks done, can we mark it complete?").
2. Claude reads `dashboard-data.json`.
3. Claude locates the relevant card by `id`. If ambiguous, Claude asks the teacher to clarify.
4. Claude edits the JSON using its Edit tool (targeted replacement, not full-file overwrite).
5. Claude confirms the change in chat.

### Guardrails (Encoded in Project CLAUDE.md)

- **Never write student names, grades, or per-student data** into either JSON file. Aggregate text only. ("3 students behind on Unit 3" — not "Maria, José, Aisha.")
- **Preserve unrelated cards.** Use targeted Edit operations; never overwrite the whole file blind.
- **Ask before adding or removing cards.** Edits to existing card content are fine; structural changes need teacher confirmation.
- **`id` is stable.** Never rename an `id` once assigned — only `title`, `body`, `progress`, etc.

### Adding a New Offline Tool

When a new HTML tool is created in `local-tools/`, Claude appends an entry to `apps-registry.json`. No change to `index.html` required — the sidebar re-renders from the registry on next page load.

## Error Handling

- **Malformed JSON** — `index.html` shows a non-blocking error banner at the top: "Couldn't read dashboard-data.json — check the file or ask Claude to fix it." The rest of the page still renders if the other file is valid.
- **Missing fields on a card** — renderer uses safe defaults: empty body, no progress bar, neutral tone.
- **Unknown card `type`** — renders as a plain text card with a subtle "unknown type: X" note.
- **Empty `cards` array** — renders an empty-state message: "No dashboard cards yet. Set them up with Claude Cowork."
- **Empty `apps` array** — sidebar shows just the dashboard link and a "No tools yet" placeholder.

## Privacy Boundary (Reinforcement)

This dashboard sits inside the Claude project folder and the JSON files are readable by Claude. Per project-level architecture decisions, the JSON schemas contain **no fields for per-student data** by design — there is nowhere to accidentally store a roster, a grade, or a name. The schema is the boundary. Both JSON files should carry a top-of-file comment reminding human readers (and reinforcing for Claude): "This file is readable by Claude. Aggregate text only — never include student names or grades."

## Out of Scope

- **Onboarding flow** — how the initial `dashboard-data.json` gets populated for a teacher. The dashboard renders whatever it's given; onboarding is a separate spec.
- **Authoring UI** — no in-page editing. All edits go through Claude Cowork.
- **Multi-class support** — single class only for v1.
- **Theming / dark mode** — light theme only for v1.
- **Animations / transitions** — none for v1 beyond default browser behavior.

## Testing Approach

- **Manual smoke test:** Open `index.html` with the seed JSON files. Verify sidebar renders, cards render, sidebar links navigate to sibling tools.
- **Responsive check:** Use the browser devtools responsive mode at 1280px, 800px, 400px. Confirm sidebar collapses correctly and cards reflow.
- **Error states:** Manually break each JSON file (malformed, missing fields, unknown card type) and confirm the page degrades gracefully.
- **Claude-edit simulation:** Have Claude edit a card via the Edit tool and reload the page. Confirm the change appears and no other cards regressed.

No automated test suite for v1 — the surface is small and entirely visual.
