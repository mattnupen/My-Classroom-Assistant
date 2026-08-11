# AI Instructions

This folder is what the AI (running in Claude Cowork) reads to understand its job in your classroom. Each file is short, and you can read them in order to understand what your AI will do.

**This folder is the engine, not your classroom.** It ships with the project and gets replaced wholesale when you update — so nothing personal lives here. The parts that are *yours* — your AI's name and voice, your class's story, your data policy — live in `my-classroom/`, which updates never touch. If you're looking for the file where you name your AI, it's `my-classroom/your-classroom-ai.md`.

## The files

| File | What it's for | When to edit it |
|---|---|---|
| `challenge-deck/` | Five ready-made class challenges — missing work, attendance, participation, transitions, reading. Each card brings its own research, weekly moves, metric, and season length. | Read the cards, or ask your AI to pitch them. Picking one is the whole setup. |
| `persona-packs.md` | Starter personas and mission ideas — ready to remix, or to put on a ballot for a student vote. | Read it when you're stuck on a blank page. |
| `teaching-principles.md` | The research-backed approach the AI uses when generating content. | Read it. Light edits only — these are evidence-based defaults. |
| `research-foundations.md` | Citations and short summaries of the research behind the principles. The AI consults this when deciding how to frame things or when asked to explain a choice. | Add to it if you find research that should inform the AI's work in your room. |
| `evidence-engine.md` | How the AI gathers research for *your specific goal* just-in-time, checks it against trusted sources, and writes it down as evidence cards. | Read it once to see how grounding works. The AI runs it for you. |
| `evidence-packs/` | The goal-specific evidence cards that ship with the project (one file per goal). The AI checks the active pack whenever it generates content for students — and checks `my-classroom/evidence-packs/` first, where the packs built for *your* goals live. | These ship as-is. Packs the AI builds for you land in `my-classroom/`, where you can edit them freely. |
| `safety-rules.md` | Hard rules the AI must follow (mandated reporter, never naming students publicly, etc.). | Don't water these down. You can add more, not subtract. |
| `weekly-rhythm.md` | The day-to-day and week-to-week flow the AI expects. | Adjust to match your schedule. |

## How the AI uses these

When you open this folder in Cowork and say hi, the AI reads these files plus the `CLAUDE.md` file at the top level. From then on, it acts as your **Classroom AI** with the voice and rules you've set.

You don't need to tell it to re-read these every session — it will. If you change a file, the change shows up the next time you start a session.

## A note on tone

These files are written for two readers at once: you, the teacher, and Claude. That's why some sections speak directly to the AI ("You should…") and others speak to you ("Your AI will…"). Both are useful — you can see exactly what your AI has been told to do.

## If your AI starts acting wrong

Check these files first. Nine times out of ten, the AI is doing what it was told. If something feels off:

- **Too generic / not in-character?** → Edit `my-classroom/your-classroom-ai.md` to make the voice sharper.
- **Asking for or working with student names / grades?** → Re-read `safety-rules.md` to the AI by pasting it into chat — there's been a drift. Check `my-classroom/data-policy.md` says what you expect.
- **Suggesting strategies that don't fit your kids?** → Adjust `teaching-principles.md`, or edit the active pack in `evidence-packs/`, to reflect what's working in your room.
- **Workflow doesn't match your real day?** → Edit `weekly-rhythm.md`.
