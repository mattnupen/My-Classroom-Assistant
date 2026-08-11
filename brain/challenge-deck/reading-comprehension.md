# Challenge: Past the Words
*"For the next six weeks we're working on the part after you can read the sentence — what it actually means, and how you'd prove it."*

**The problem.** Students who can decode every word on the page still finish it holding nothing. They aren't struggling readers in the usual sense, so nothing flags them, and "read it again" is the only advice on offer. What's missing is a small set of habits nobody ever taught them out loud.

**Season length:** 6 weeks · **Evidence pack:** `brain/evidence-packs/reading-comprehension.md`

**Why this works.** The pack's strongest card is one of the highest-value entries in the whole EEF toolkit: explicitly teaching a **small** set of comprehension strategies — predict, question, clarify, summarize — runs about **+7 months** across 184 studies. The gain comes from students using a few strategies independently, not from meeting many. Its second engine is structured talk about the text, worth roughly **+6 months** on its own, strongest when students have to reason and cite rather than recall. This challenge is those two moves on a weekly rhythm. Six weeks, not four: the EEF is explicit that this is a sustained change to teaching habits, and dabbling doesn't move it.

## The metric

**This is the one card in the deck whose metric is teacher judgment, not a number a tool can hand you.** Say that plainly to yourself before you start, because it changes how much weight the line on the dashboard deserves.

The workable version: **a weekly three-question quick-check on a short unseen passage — one right-there question, one inference, one "which line proves it" — scored 0–3, reported as the class mean.** Same shape every week, different passage. Five minutes to give, ten to score, and the class average is a name-free number you can hand your AI.

Two honest caveats:

- **It's a proxy.** Three questions on one passage is a small, noisy measure of something that genuinely takes months to move. Read six weeks of it as a rough direction, not a result.
- **Comprehension gains are slow.** The +7 months in the research is a year's teaching, not a season's. A flat line at week 4 is the normal shape of this work, not a sign the challenge failed. Decide that now, while you're calm, rather than in week 4.

**Class Pulse can't produce this one** unless you enter the quick-check into your gradebook as an assignment — which is a perfectly good option, and then the pulse picks it up like anything else. Otherwise, type the class mean into chat.

Set the target *with* the class in week 1 as a range, not a number: "we're averaging 1.8 out of 3; let's finish the season somewhere above 2.2."

## Week 1 — Baseline & launch

1. Run the quick-check once **before teaching any strategy**. That mean is the baseline — the AI records it in `my-classroom/dashboard.md`.
2. Run the launch: name the four strategies, tell them these same four are all they'll get for six weeks, and that the point is doing them without the card by the end. Set the target range together.
3. The AI generates the strategy prompt cards and the first week's slide — the *same* four, which it will reuse all season.

## The weekly play pattern (weeks 2–6)

**Monday.** You give the AI this week's quick-check mean and say "run Monday." It updates the dashboard, shows the movement, and proposes this week's moves — each tagged to a pack card.

**Midweek — the one classroom move.** Rotate through the pack, one per week, never all at once:
- **The same four strategies, again** (explicit-strategies card): predict, clarify, question, summarize — reused until students do them without looking at the card. The AI's discipline here is refusing to generate a fifth strategy in week 3. More variety is the failure mode; the impact is in the reps.
- **Reciprocal teaching roles** (Palincsar & Brown card): four printable role cards, a one-page how-to, and a teacher script for the first sessions that *fades*. You model it, then hand it over. If you're still leading every turn in week 5, it has become a read-aloud worksheet and the gains are gone — that's the pack's own warning.
- **Talk about the text, not just through it** (oral-language card): discussion prompts with several defensible answers, structured think → pair → share so everyone rehearses once at low stakes. Questions people can genuinely disagree on; single-answer prompts kill the discussion they're meant to start.
- **Front-load what the text assumes** (background-knowledge card): before a hard text, three or four key terms and one paragraph of background aimed exactly at what the text takes for granted. Short. A pre-read that does the comprehension for them defeats the point.

**Friday.** Two minutes: the AI drafts an aggregate callout for the slide and one line goes into `my-classroom/class-story.md`.

## The finale

Week 6, the AI generates the season snapshot from `content-templates/season-snapshot.jsx` — baseline to finale, on the projector. Then the three-question retro, whole class: *What actually helped? What did we ignore? What should [AI name] do differently next season?* The answers go through the Feedback Cleaner into the class story. Then the deck comes back out.

Hit or miss, the season *ends*. A near-miss with a real retro beats a quietly abandoned streak — say that out loud to the class. With this challenge in particular, "we kept doing the four strategies and the number barely moved" is a genuinely good outcome to report, because the habit is the thing that pays off later.

## Watch out

- **No round-robin reading, no minutes-only logs.** The pack rules both out: popcorn reading has little comprehension benefit, raises anxiety, and disengages most of the room while they wait their turn; minutes-only logs without a strategy or a real reason to read turn reading into a chore. Neither will show up in anything the AI generates for this season.
- **Don't let the strategy cards become paperwork.** The moment students are filling in a predict/clarify/summarize sheet to hand you, the strategy has stopped being a reading habit and become an assignment about reading. Cards are for the student's own use. Nobody collects them.

---

## TODO for Matt

The evidence pack has no assessment cadence in it — no recommended measure, no interval, no guidance on what a reasonable weekly gain looks like. **The three-question quick-check above is a practical proposal, not something the pack or its sources specify**, and it's the only metric in the deck that isn't traceable to its pack.

Two ways to close the gap, whenever you get to it: add an assessment-cadence card to `brain/evidence-packs/reading-comprehension.md` via the evidence engine (maze/cloze and curriculum-based measurement are the obvious places to look, and both have real literature on sensitivity to short-term growth), or decide the season is deliberately unmeasured and rewrite this metric section around a qualitative finale instead. Either is defensible. Inventing a research-backed number here would not have been.
