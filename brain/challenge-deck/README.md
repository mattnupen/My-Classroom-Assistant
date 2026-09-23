# The Challenge Deck

Five ready-made classroom challenges. To the teacher, these are "five ready-made challenges, each with the research behind it." Each card brings its number to watch, its moves in order, and its warnings. Picking one is most of the setup.

**How you use it.** When a teacher is choosing what to work on, pitch the five in one line each before offering anything freeform. When they pick one:
1. Load its evidence pack (the shipped one, plus anything in `my-classroom/evidence-packs/`).
2. Set the mission in `my-classroom/your-classroom-ai.md`.
3. Ask the card's "Ask first" question, take today's number, and start the first move this week (the card's "Week 1").
4. Run the challenge through the try, check, decide loop in `../challenge-cycle.md`: one move at a time, a check about every two weeks, and the teacher decides.

If none of the five fits, build a new card and pack with `../evidence-engine.md`, and save both in `my-classroom/evidence-packs/`.

**One challenge, all year.** A card isn't used once and thrown away. A season (4–6 weeks) is two or three moves, then a finale. After the finale, the class keeps the same challenge by default and starts the next move. The deck only comes back out if the teacher decides the challenge is done or wrong for the class.

**The finale (every card).** In the last week of a season, make the scoreboard (from `content-templates/season-snapshot.jsx`): the starting number, then each week, class totals only. Then run a three-question class look-back as a short anonymous survey, with the answers put through the Feedback Cleaner app to take out names: *What actually helped? What did we ignore? What should [AI name] do differently?* Add one class-story entry. Say out loud that a near miss is a fine result. Then decide the next move together.

---

## Card template

```markdown
# Challenge: [name students hear]
*"[The one line a teacher would say to the class]"*

**The problem.** [2–3 sentences, from the teacher's side of the desk.]

**Ask first:** [one question about how it goes now; the answer is the rough starting number]

**The number to watch.** [What to count, how, how long it takes, where it comes
from in each option.] **Evidence:** `brain/evidence-packs/[pack].md`

## Week 1: start now
[Today's number is the starting number; the first move starts this week. What to look for in the numbers. Set a target range with the class.]

## The moves, one at a time (about two weeks each)
1. **[Move]**: what the teacher does. *[Plain-words strength (source, year; who was studied).]*
...

## Watch out
[The one or two ways this goes wrong, from the pack.]
```

Rules for card writers (you or a person): every claim comes from the linked pack. The number has to be countable each week with what a teacher already has, and must never need a student's name. The strength words come from `../evidence-engine.md`.
