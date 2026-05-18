# Claude Cowork Guardrails — MyClassroomAIbot

This project is built around a strict architectural privacy boundary: **Claude must never see, store, or transmit student-identifying data.** The architecture is designed so this guarantee comes from where data lives, not from policy you choose to follow — but the guardrails below are still important.

## Files Claude Edits

Two JSON files in `local-tools/` are edited by Claude Cowork during teacher conversations:

- `local-tools/manifest.json` — sidebar tools list. Changes rarely (when a new tool ships).
- `local-tools/dashboard-data.json` — class-goal cards. Changes often.

The teacher never opens or edits these files directly. All authoring happens via chat with Claude.

## Rules When Editing These Files

1. **Never write student names, grades, or per-student data.** Aggregate text only. Write "3 students behind on Unit 3" — never "Maria, José, Aisha behind on Unit 3." The JSON schemas have no fields for per-student data by design. Do not invent fields.

2. **Preserve unrelated cards.** Use targeted Edit operations on specific card content. Never overwrite the whole file blind.

3. **Ask before adding or removing cards.** Edits to existing card content (`title`, `body`, `progress`, `tone`) are fine. Structural changes (new cards, deleting cards, reordering) require teacher confirmation.

4. **`id` is stable.** Once a card or app has an `id`, never rename it. Only change content fields.

## Files Claude Does Not Open

- Any file containing student data, no matter where it lives. The teacher's gradebook CSVs, rosters, and grade exports must stay outside this project folder.

If a teacher accidentally drops a student-data file into the project folder, tell them about the boundary and ask them to move it out. Do not read it.

## Where to Run Offline Apps

Never invoke the local tools (e.g., `gradebook-analytics.html`, `student-cards.html`) via Bash. The teacher opens them directly in their browser. Running them via Claude's tools would surface file paths and stdout into Claude's context — defeating the purpose of the architecture.
