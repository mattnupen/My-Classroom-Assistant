# Challenge: Operation Turn-It-In
*"For the next six weeks, this class has one mission: more work in, less nagging."*

**The problem.** Missing assignments pile up quietly, and by the time the gradebook shows the damage, the nagging has already stopped working — for you and for them. This challenge replaces chasing with a system the students run themselves.

**Season length:** 6 weeks · **Evidence pack:** `brain/evidence-packs/reducing-missing-work.md`

**Why this works.** The pack's strongest card is student self-monitoring — the EEF's top-rated strand (≈ +7 months at secondary), with the sharp caveat that the effect disappears when an adult holds the list. Its second engine is if-then planning: across 94 studies, binding a task to a concrete time-and-place trigger produced a medium-to-large boost, biggest on *getting started* (d ≈ 0.61). This challenge is those two moves on a weekly rhythm.

## The metric

**Total missing assignments across the class**, counted weekly by Class Pulse from your gradebook export. It's already the pulse's headline number — no extra work.

Set the target *with* the class in week 1, after they've seen the baseline: a percentage cut by the finale ("from 74 missing to under 50") lands better than zero, which reads as impossible by week 2. Your AI will propose a range from the baseline; the class picks inside it.

## Week 1 — Baseline & launch

1. Run Class Pulse on the current gradebook **before changing anything**. Drop the pulse in `my-classroom/pulses/`. That number is the baseline — the AI records it in `my-classroom/dashboard.md`.
2. Run the launch: pitch the challenge (or put it on the ballot with `content-templates/student-voting-form.md`), reveal the baseline on the projector, set the target together.
3. The AI generates the kickoff slide and the first round of self-check quarter-sheets (below). If the class is also naming its AI this week, this is the moment.

## The weekly play pattern (weeks 2–6)

**Monday.** You drop Friday's pulse into `my-classroom/pulses/` and say "run Monday." The AI updates the dashboard, shows the week-over-week movement, and proposes this week's moves — each tagged to a pack card.

**Midweek — the one classroom move.** Rotate through the pack, one per week, never all at once:
- **Self-check quarter-sheets** (self-monitoring card): the same three prompts every week — *one thing I owe / when-and-where I'll start it / how I'll know it's done*. Students write it; nobody collects a list. If it starts feeling like surveillance or paperwork, it's being done badly — that's the pack's own warning.
- **If-then nudges** (implementation-intentions card): every nudge the AI writes is bound to a real trigger — "when you sit down in advisory Monday, open the lab doc and write the first sentence." Never "try to catch up."
- **Almost-too-small-to-refuse starts** (channel-factors card): the AI drafts openers that shrink the first action to one sentence, one problem, one upload.

**Friday.** Two minutes: the AI drafts a quick-win callout for the slide (aggregate only — "11 assignments came in this week that were overdue"), and one line goes into `my-classroom/class-story.md`.

## The finale

Week 6, the AI generates the season snapshot from `content-templates/season-snapshot.jsx` — baseline to finale, on the projector. Then the three-question retro, whole class: *What actually helped? What did we ignore? What should [AI name] do differently next season?* The answers go through the Feedback Cleaner into the class story. Then the deck comes back out.

Hit or miss, the season *ends*. A near-miss with a real retro beats a quietly abandoned streak — say that out loud to the class.

## Watch out

- **Don't let the adults repossess the list.** The moment tracking migrates back to you (or to the AI's dashboard as a per-student list — which it can't hold anyway), the highest-impact effect in the pack evaporates. Aggregate scoreboard public; individual lists in students' own hands only.
- **Vague nudges are decoration.** "Find some time this week" has no evidence behind it. If a nudge has no time-and-place trigger, the AI shouldn't ship it — and you shouldn't say it.
