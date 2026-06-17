# 10x Roadmap — Wow Factor, Clarity, Usability

*Last updated: 2026-06-11. Items marked ✅ shipped that day.*

The thesis: a teacher should hit three "wow" moments in their first 30 minutes — **(1)** the tools work instantly with zero setup, **(2)** the AI's first conversation feels like meeting a colleague, not configuring software, and **(3)** they can picture the semester story this becomes. Everything below serves one of those three.

---

## Tier 1 — First 30 minutes (highest impact)

### ✅ Demo mode in the tools
A "Try the demo class" button in Student Cards and Class Pulse loads the 24-student fictional gradebook with one click — no file hunting, no CSV export needed. The demo data is embedded in `_nav.js` (`CLASSAI_DEMO`), so any tool can offer it without a network call or fetch. **Next:** add the same button to Gradebook Analytics and Parent Messages.

### ✅ Dashboard that's alive on first open
The default dashboard now opens as a guided welcome — what this is, a start-here checklist, and a "try it now" path — instead of placeholder cards that say "replace me."

### ✅ First Session Protocol
CLAUDE.md now scripts the AI's first conversation: a short interview (not a form), a drafted persona by the end of chat one, and a tangible artifact — a real Monday slide — generated before the teacher leaves. The wow is *leaving the first chat with something you can use tomorrow.*

### ✅ Demo Semester viewer
`local-tools/demo-semester.html`: a fictional class (Mr. Nupen, 24 students, AI named Otter) running the project for 16 weeks with Wednesday/Friday check-ins. Six milestone Cowork chats shown as full transcripts — including the privacy boundary and crisis-lane moments — plus a tier trend chart and the end-of-semester report. This is the answer to "what does this look like once it's running?"

### Demo video (top remaining item)
The README has a placeholder. A 90-second screen recording — open dashboard → demo button → Class Pulse → paste into Cowork → AI responds in persona → slide appears — is worth more than every paragraph of docs. Record once the Tier 1 items are merged.

## Tier 2 — The story and the pitch

### ✅ README leads with outcomes
Rewritten to open with what a teacher gets and a "see it in 90 seconds" path. The research framing (Project Vend) stays, but as the *why*, after the *what*.

### Screenshots in the README
Three images: the dashboard, a printed student card, a Class Pulse summary next to the AI's response. GitHub renders them; nothing sells an offline HTML tool like seeing it.

### Shareable one-pager
A single PDF a teacher can drop in a staff meeting or a teachers-of-X subreddit: what it is, the privacy architecture in one diagram, the QR/link. The `canvas-design` skill can produce this. The privacy diagram ("your data stays in the blue box") is the single most persuasive artifact for both teachers and admins.

### Consolidate TUTORIAL.md / README / getting-started overlap
Three docs currently share onboarding duties. Proposed split: README = pitch + 90-second path; TUTORIAL = hands-on demos; getting-started = the real-class launch checklist. Cross-link each at the top with "you are here."

## Tier 3 — New capabilities

### ✅ The semester story (`brain/class-story.md`)
A running, aggregate-only narrative the AI maintains: one short entry per week after each Class Pulse paste. Over a semester it becomes the experiment's logbook — and the raw material for the report card below. Wired into CLAUDE.md and the weekly rhythm.

### End-of-experiment report card
A template + protocol: at quarter's end the AI compiles `class-story.md`, snapshots, and the teacher's reflections into a shareable one-page report — "what we tried, what moved, what we'd change." This is the artifact teachers show admins to justify year two, and the thing that makes the project feel like a completed *experiment* rather than an abandoned tool.

### Persona packs
Three pre-built example personas (name, voice, signature phrases, mission) teachers can adopt or remix instead of facing blank brackets. Lowers the Option B cost to near zero and shows the range of what a persona can be.

### Student-voice loop upgrade
The anonymous-message flow (Google Form → teacher scrubs → paste) is described but has no tooling. A small local tool that takes pasted form exports, strips emails/names, and produces the aggregate would close the loop with the same privacy guarantee as Class Pulse.

## Tier 4 — Polish backlog

- Demo buttons in the remaining tools (badges/random-groups need a roster, not a gradebook — embed a name list in `CLASSAI_DEMO`).
- `_nav.js` localStorage isolation: the per-page customization caveat confuses people; consider removing per-page persistence entirely and making `DEFAULT_APPS` (edited via Cowork) the only source of truth.
- App-builder gallery: a page of example app ideas ("seating chart with constraints," "exit-ticket tallier") with one-line prompts to feed the skill.
- Link `content-templates/classroom-display-rules.md` to `docs/theme-preview.html` so the theme is seeable, not just describable.
- Fill in the "Next steps" README stub → link this roadmap.
