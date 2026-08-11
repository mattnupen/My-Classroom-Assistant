# Weekly Rhythm

This is how a typical week works once your classroom AI is up and running. Adjust the days, times, and steps to match your real schedule — the AI will follow whatever flow you describe here.

The whole rhythm is built around a simple principle: **you spend a few minutes a day telling the AI what's going on, and the AI uses that time to make your tomorrow easier.**

---

## Daily — 5 to 10 minutes

### Morning (before first period)

You open Cowork in this folder, say hi, and tell the AI:

- What you're teaching today (the lesson topic — one line)
- What you noticed yesterday (energy, attendance, anything off — 1-3 sentences)
- What you want to walk out of today with (a slide for tomorrow? A parent message? A reset?)

That's it. No data, no spreadsheets, no copy-pasting. Just your voice.

The AI:
- Drafts whatever you asked for
- Suggests one or two things you didn't ask for but might want
- Writes it to a file in `my-classroom/for-class/[today's date]/` so you can review and print/copy

### During class

You don't talk to the AI during class. The kids don't either. You use the printed materials, your slides, and the `local-tools/` you prepared.

If something interesting happens — a kid has a breakthrough, the period falls apart, a parent walks in — jot a one-line note somewhere (your phone, a sticky, a Google Doc). You'll feed that to the AI tomorrow morning in 30 seconds.

### End of day (optional, 2-3 minutes)

If you have it in you, open Cowork at the end of the day and say one or two things about how it went. The AI updates its understanding of your class. This is the magic — over weeks, the AI starts to know your room better than any tool you've used.

If you don't have it in you that day, skip it. Tomorrow morning's check-in can cover both days.

---

## Weekly — 30 to 45 minutes total

The week has two moments: a two-minute one on Friday, and the real one on Monday.

### Friday (or whenever your week ends) — two minutes

1. Open **Class Pulse** (`local-tools/class-pulse.html`) and drop in this week's gradebook export.
2. Click **Download this pulse**. You get `pulse-YYYY-MM-DD.md` — counts, tiers, and most-missed assignments, with no student names in it by construction.
3. Drag that file into **`my-classroom/pulses/`**.

That's the whole Friday job. Don't read it, don't summarize it, don't paste anything. Keep every pulse you ever generate — the folder *is* your trend line, and the AI reads back through it.

*(Optional, same screen: **Download snapshot** saves a small JSON that goes back into Class Pulse itself next week so the output can show week-over-week movement. Different file, different job — keep it out of `pulses/`.)*

### Monday — say "run Monday"

Open Cowork in this folder and say exactly that. The AI:

1. **Reads the newest file in `my-classroom/pulses/`.** If there isn't a new one, it says so and offers the paste fallback rather than guessing.
2. **Compares it to the trend and your season target**, and updates `my-classroom/dashboard.md` (and the browser dashboard's cards, if they changed).
3. **Proposes two or three moves for the week — each one tagged with the challenge-deck card or evidence-pack entry it draws from.** Receipts, every time. If a proposal shows up without a source, ask where it came from; that's the AI drifting.
4. **Generates what you approve** into `my-classroom/for-class/[date]/` — Monday's opening slide, a round of parent messages, badges to print, a note for yourself about what to keep doing and what to stop.

It also appends a short entry to `my-classroom/class-story.md`. You don't have to do anything for that; it's the AI's logbook, and it's what makes the end-of-quarter reflection write itself.

Then print and prep — usually fifteen minutes:
- Cards (student progress or missing work) → `student-cards.html`
- Badges → `badges.html`
- Slides → review what the AI wrote and project it
- Parent messages → review and send through ParentSquare or email

**The paste fallback.** If you can't get the file where it needs to go — a locked-down laptop, a downloads folder you can't find, whatever — Class Pulse still has **Copy** buttons on both output blocks. Paste either one into chat and say "run Monday." Same result, one extra step.

---

## Monthly — 60 to 90 minutes

### Last Friday of the month

This is the bigger reflection. The AI reads back across the month's pulses in `my-classroom/pulses/` — that's what the folder is for — and puts the trend in front of you. You and the AI ask each other:

- **What's moving in the right direction?** (specific kid patterns, class-level shifts)
- **What's stuck?**
- **What's a small experiment we could run for the next four weeks?**

The AI writes a short reflection — saved to `my-classroom/for-class/[date]/monthly-reflection.md` — and proposes the next month's small experiment. You decide whether to do it.

This is also when you might:
- Print certificates for the month's standout moments
- Send a class-wide parent update (using a "class-level" message template, no individuals named)
- Rotate your random-groups history (download a fresh `class-state.json` from `random-groups.html`)
- Ask the AI to refresh the research for your goal — it re-checks the trusted sources behind the active evidence pack and flags anything newer, stronger, or now in doubt (see `brain/evidence-engine.md`)

---

## Quarterly — 2 to 3 hours

### End of quarter

Bigger reflection. You and the AI look back at the whole quarter.

- What did the AI's name and mission accomplish? Did it shift student behavior?
- What did the local tools save you time on?
- Where did the AI miss?
- What do you want to be different next quarter?

You write a one-page reflection (the AI can draft it from your prose). You may:
- Rename the AI or shift its mission for next quarter
- Edit `my-classroom/your-classroom-ai.md` based on what you learned
- Add a new local tool if there's a repeated need the suite doesn't cover yet

Some teachers also do a **student debrief** at end of quarter — pulling the class into a conversation about what the AI did and didn't help with. Kids have sharp eyes for this; their feedback usually points at exactly the right adjustment.

---

## The "skip everything" minimum

If a week is rough and you can't keep up the rhythm, here's the minimum that keeps the project alive:

- **Once a week:** run Class Pulse, drop the file in `my-classroom/pulses/`, and say "run Monday." Even if you do nothing with what comes back, the trend keeps building and the story keeps writing itself.
- **Once a week:** print missing-work cards on Friday and hand them out.
- **Once a month:** send one round of parent messages.

Everything else can wait. The AI will remember where you left off when you come back.

---

## When something goes off the rails

If a week ends and you realize the AI's outputs have been getting worse — generic, off-tone, not specific to your class — the fix is usually one of these:

1. **Re-read your `my-classroom/your-classroom-ai.md`.** Drift happens when the persona file is too vague. Make the voice sharper.
2. **Tell the AI what's wrong.** "The last two parent messages sounded too corporate — your voice is supposed to be [trait]." It'll adjust.
3. **Start a fresh session.** Sometimes a context window has gotten cluttered with one-off requests. Closing and reopening Cowork in this folder resets things.

If you're stuck for more than a week, that's a sign to step back and reflect — maybe the mission or the persona needs a real edit, not a small fix.
