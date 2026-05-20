# Claude Cowork Guardrails — MyClassroomAIbot

This project is built around a strict architectural privacy boundary: **Claude must never see, store, or transmit student-identifying data.** The architecture is designed so this guarantee comes from where data lives, not from policy you choose to follow — but the guardrails below are still important.

## Context Claude Loads Each Session

This file sets the rules, but it isn't the whole picture. At the start of a session, Claude reads the following files and acts on them (re-read any of them if the teacher says behavior has drifted):

- **`ai-instructions/your-classroom-ai.md`** — the AI's name, voice, and current mission. This is the personality the students know; lead with it.
- **`ai-instructions/teaching-principles.md`** — research-backed defaults for how the AI generates content.
- **`ai-instructions/research-foundations.md`** — the research behind those principles; consult when explaining a choice.
- **`ai-instructions/safety-rules.md`** — hard safety limits (mandated reporter, never naming students publicly, etc.). Non-negotiable; you can add to these, never water them down.
- **`ai-instructions/weekly-rhythm.md`** — the day/week/month cadence the AI works to.
- **`content-templates/classroom-display-rules.md`** — accessibility + design rules **and the default visual theme (Ocean Depths — Projection Edition: palette, font, type scale)** for anything students will see: slides, posters, printed materials. Apply this whenever generating visual content.

Used on request (not every session): the teacher-facing templates in `content-templates/` (`day-one-lesson-plan.md`, `lms-intro-page.md`, `student-voting-form.md`) and the onboarding docs in `setup/` (`getting-started.md`, `crisis-card.md`, `permissions/`).

## Files Claude Edits

Two files hold the data Claude Cowork updates during teacher conversations:

- **`local-tools/_nav.js`** — the universal sidebar nav. Contains a top-level `DEFAULT_APPS` array (a JS literal, same fields as a JSON object: `id`, `label`, `file`, `description`). Edit this when a new tool ships. The sidebar appears on every tool page via `<script src="./_nav.js"></script>`.

- **`local-tools/ClassAI-dashboard.html`** — the dashboard's class-goal cards live inside an inline `<script type="application/json" id="dashboard-data">…</script>` block. Edit the JSON content inside that block. Changes often.

Both files are embedded/included inline (no `fetch()` calls) so the dashboard works via double-click. Modern browsers block `fetch()` to sibling files under the `file://` protocol; `<script src=...>` resource loads are allowed.

The teacher never opens or edits these files directly. All authoring happens via chat with Claude.

## Rules When Editing These Files

1. **Never write student names, grades, or per-student data.** Aggregate text only. Write "3 students behind on Unit 3" — never "Maria, José, Aisha behind on Unit 3." The schemas have no fields for per-student data by design. Do not invent fields.

2. **Preserve unrelated entries.** Use targeted Edit operations on specific card or app content. Never overwrite the whole file blind.

3. **Ask before adding or removing entries.** Edits to existing card content (`title`, `body`, `progress`, `tone`) or app metadata (`label`, `description`) are fine. Structural changes — adding/deleting/reordering cards or apps — require teacher confirmation.

4. **`id` is stable.** Once a card or app has an `id`, never rename it. Only change content fields.

5. **When a new tool ships, register it in `_nav.js`.** Add a new entry to the `DEFAULT_APPS` array. No change to the other tools required — they all read from `_nav.js` on load.

## Files Claude Does Not Open

- Any file containing student data, no matter where it lives. The teacher's gradebook CSVs, rosters, and grade exports must stay outside this project folder.

If a teacher accidentally drops a student-data file into the project folder, tell them about the boundary and ask them to move it out. Do not read it.

## Where to Run Offline Apps

Never invoke the local tools (e.g., `gradebook-analytics.html`, `student-cards.html`) via Bash. The teacher opens them directly in their browser. Running them via Claude's tools would surface file paths and stdout into Claude's context — defeating the purpose of the architecture.

## Building New Local Tools — Use the `teacher-app-builder` Skill

When the teacher asks for a new browser tool ("make me a tool that…", "build an app that…", "I want a new local-tool for X"), check whether the `teacher-app-builder` skill is in this session's available-skills list.

- **If it IS available:** invoke it via the Skill tool. Do not hand-roll. The skill enforces the four privacy invariants (single static HTML file, no outbound calls except the SheetJS CDN, no browser storage of uploaded data, no save-to-project-folder) by construction and runs an automated check before saving the result. Hand-rolling silently risks invariant violations that the skill catches.

- **If it is NOT available:** stop and tell the teacher to install it. Use language like:

  > "I can build that — but the safe way is to install the `teacher-app-builder` skill first. It enforces the project's privacy rules by construction so I can't accidentally leak student data through the new tool. The installer is `teacher-app-builder-skill-upload.zip` in this folder; install instructions are in README.md under 'Build your own tools.' Let me know when it's installed and I'll run it."

  Do **not** start writing the HTML manually as a fallback. The privacy boundary is the whole point of this project; the skill exists to enforce it. If the teacher insists on a hand-rolled tool anyway, walk them through it but explicitly state which invariants you're trusting them to maintain.
