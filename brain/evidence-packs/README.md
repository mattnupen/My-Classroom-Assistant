# Evidence Packs

This folder holds the goal-specific research the evidence engine has built (see `../evidence-engine.md`). Each file is one teaching goal: a short set of evidence cards, each ending in a concrete move the AI uses when it writes for students. The AI checks the pack matching the current mission alongside the universal base in `../research-foundations.md` and the eleven principles in `../teaching-principles.md`.

## Packs built so far

| Pack | Goal |
|---|---|
| `reducing-missing-work.md` | More work turned in, with less nagging |
| `reading-comprehension.md` | Understanding more of what you read, not just decoding |
| `class-participation.md` | More voices in the room, with less fear |
| `calmer-transitions.md` | Smoother starts, stops, and switches |
| `improving-attendance.md` | Fewer absences, worked through families |

## How a new one gets added

When a teacher sets a mission this folder doesn't cover, the AI runs the engine, builds a pack here named for the goal (lowercase-kebab), and tells the teacher in a sentence or two. If a mission matches a pack above, the AI reuses it instead of starting from a blank page — that reuse is the whole point of keeping them.

Every pack holds zero classroom-specific content by design. That's what makes them safe to reuse across classes and to share between teachers.
