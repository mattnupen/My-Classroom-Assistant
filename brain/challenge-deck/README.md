# The Challenge Deck

One card per classroom problem. Picking a card is the whole setup: the research, the weekly moves, the metric, and the season length come with it. No blank pages.

**How the AI uses this deck.** When a teacher is choosing a mission (first session, or a new season), offer these cards before anything freeform. When a card is chosen: load its evidence pack, set the mission in `my-classroom/your-classroom-ai.md`, record the baseline plan in `my-classroom/dashboard.md`, and follow the card's weekly play pattern in the Monday ritual. Every proposed move gets tagged with the card entry it draws from — receipts, every time.

**How a teacher uses this deck.** Read the five cards (or have your AI pitch them in one line each). Pick one — or put two or three on the ballot and let your class vote, using `content-templates/student-voting-form.md`. If none fit, your AI can build a new card: it runs the evidence engine (`brain/evidence-engine.md`) to research your goal, then writes the card into `my-classroom/evidence-packs/` alongside a matching pack.

**Seasons, not settings.** Every card is time-boxed. A season has a baseline week, weekly moves, and a finale with a scoreboard and a retro. Then the deck comes back out. Finishing matters more than streaks — a class that completes a six-week season and chooses again is the engine of this whole project.

---

## Card template

Every card follows this exact structure (see `reducing-missing-work.md` for the finished example):

```markdown
# Challenge: [Student-facing name]
*[One-line version a teacher would say out loud to the class]*

**The problem.** [2–3 sentences, teacher-eye view.]

**Season length:** [4–6] weeks · **Evidence pack:** `brain/evidence-packs/[pack].md`

**Why this works.** [2–3 sentences naming the strongest evidence in the pack, with its headline effect.]

## The metric
[What gets counted, where it comes from (Class Pulse / a simple tally),
and how to set the target WITH the class — a range, not a demand.]

## Week 1 — Baseline & launch
[Capture the starting number before changing anything. Run the launch ritual:
pitch or vote, name the target, project the kickoff slide.]

## The weekly play pattern (weeks 2 through finale)
[Monday: what the AI does with the new pulse. Midweek: the one classroom move,
drawn from the pack. Friday: the quick win + one line in the class story.]

## The finale
[The scoreboard moment (season-snapshot), the 3-question class retro,
and drawing the next card.]

## Watch out
[The 1–2 ways this challenge goes wrong, taken from the pack's own warnings.]
```

Rules for card authors (human or AI): every claim traces to the linked pack — cards never introduce research the pack doesn't contain; metrics must be countable weekly with what a teacher actually has; the tone is the pack's tone — plain, honest about evidence strength, allergic to hype.
