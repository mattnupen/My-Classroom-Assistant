# Evidence Engine

`teaching-principles.md` holds the eleven moves your AI uses by default. `research-foundations.md` is the universal base — the research every classroom gets for free. But your goal isn't every classroom's goal. A class working toward *zero missing assignments* needs different research than one working toward *deeper reading* or *calmer transitions*.

This file is how your AI closes that gap. It doesn't stock a library in advance and hope your goal is in it. It gathers the research for **your** goal at the moment your goal becomes known, checks it against trusted sources, and writes it down as a small, reviewable set of evidence cards your AI then treats as its primary guide for that goal.

You don't run this. Your AI does, during the conversations you're already having.

---

## Why this works without pre-loading

There's one AI here: Claude, in Cowork, online. It can read research the moment you name a goal — so nothing has to be stocked in advance. "We can't prepare the research ahead of time" stops being a problem, because the AI prepares it exactly when there's a goal to prepare it for.

So why write findings into evidence packs at all, instead of just looking things up live each time? Because writing them down buys five things a quick search can't:

- **Durability.** Each Cowork session starts fresh, but the brain files persist. A pack means the research is remembered and reused — not re-derived, and re-derived differently, every session.
- **Vetting.** Building a pack is a deliberate step — search the canon, label the strength, run the handle-with-care check — which beats whatever a mid-conversation search happens to turn up.
- **Reviewability.** You can read, question, and edit the evidence base. That's the whole point of "grounded": you can check the work.
- **Reuse.** A pack holds zero classroom-specific content, so it's portable — the next teacher with the same goal starts from it, not a blank page.
- **Consistency.** Every slide, poster, and card checks the same vetted pack, so the AI's grounding doesn't drift with the day's search results.

A note on where this sits relative to the privacy boundary. The *offline* part of this project — the local HTML tools teachers use to process student data — has no AI in it at all. That separation is deliberate: it's how student data stays away from Claude. The evidence engine lives entirely on the online side, with the AI you actually talk to. It never touches student data because it only ever works with published research about teaching *methods* — no card contains a name, a grade, or anything about a specific child. It stays on the safe side of the boundary by its nature.

---

## When the engine fires

The AI runs this routine when any of these happens — building right away in steady state, but *offering first* during a first session rather than running off silently:

1. **A mission is set or changed** in `your-classroom-ai.md`. A new mission means a new evidence pack.
2. **You name a recurring challenge** in conversation ("the late-work thing is getting worse," "they freeze on word problems"). The AI offers to build a pack for it.
3. **You ask directly** — "what does the research actually say about X?"
4. **The monthly freshness check** (see below) finds the field has moved.

When it fires, the AI tells you in one plain sentence what it's doing and shows you the result. It never silently rewrites how it teaches.

---

## The trusted-source canon

The AI does **not** search the open web and grab the first confident-sounding blog. Education is full of appealing claims with nothing under them. The AI searches these sources first, in roughly this order of trust:

1. **EEF Teaching & Learning Toolkit** (Education Endowment Foundation) — already meta-analyzed; gives an effect size in *months of progress*, a cost, and an evidence-strength rating. The single best starting point.
2. **What Works Clearinghouse** (US Dept. of Education, IES) — vetted intervention reports with effect sizes and study quality.
3. **ERIC** and peer-reviewed journals — for primary studies and meta-analyses.
4. **Named, replicated researchers** — Hattie's *Visible Learning* syntheses, Dunlosky et al. (2013) on learning techniques, the Deans for Impact *Science of Learning* summary.

A claim that can't be traced to something in this tier does not become a card. If the AI can only find weak support, it says so on the card rather than dressing it up.

---

## The unit: an evidence card

Every finding the AI adopts becomes one card with the same shape — two layers. The **top line** is the index: what to reach for and how sure we are. The block **below** is what the AI actually generates from. This is what makes grounding *visible* instead of vague, and reliable instead of hit-or-miss:

```
### [Plain-language claim — what works]

- **Evidence strength:** [Very strong / Strong / Moderate / Mixed / Weak] · **Source:** [Author (year) and/or EEF/WWC] · **Effect:** [e.g. d ≈ 0.65, or "+7 months" — omit if none] · **Retrieved:** [YYYY-MM-DD]

**What the research found.** [2–3 sentences with the specifics: what was measured, in whom, how big — and, most important, the condition the effect depends on. This is where the nuance that's easy to lose lives.]

**The move.** [How the AI applies this when it writes slides/cards/messages. Must obey the eleven principles in teaching-principles.md.]

**Worked example.**
> [A real mini-artifact — the actual words or format the AI should produce. An anchor the AI matches in tone and shape, not something it copies verbatim.]

**Done well vs. done badly.** [One line each: the difference that decides whether the effect actually shows up.]

**Watch out.** [The condition under which this backfires or doesn't transfer.]
```

Two parts carry the weight. The **worked example** — an LLM produces far more consistent output when it has one to match than when it works from a description alone. And **done well vs. done badly** — it encodes the implementation condition the research hinges on, because many high-impact moves fail when done badly and the AI needs to know the difference. A card without these is an index entry, not something to act from.

---

## The "handle with care" list

A grounding system earns trust by knowing what's **not** true. The AI keeps a running list of popular ideas it will not ground itself in, and will gently push back if you ask for them:

- **Learning styles** (visual/auditory/kinesthetic matching) — repeatedly tested, no effect on learning (Pashler et al., 2008). The AI does not tailor content to "styles."
- **Brain Gym / hemisphere "training"** — no credible support.
- **"Digital natives" learn differently** — not supported.
- Anything the AI itself flagged as weak when building a pack gets added here.

This list grows. When a card's evidence turns out thin, it moves here rather than quietly staying in rotation.

---

## How the AI builds a pack (the steps)

1. **Name the goal in plain terms.** "Reduce missing/late assignments," not "improve compliance metrics."
2. **Search the canon** (above), newest strong evidence first.
3. **Draft 3–6 cards.** Prefer fewer, stronger cards over a long weak list.
4. **Translate each into a classroom move *and a worked example*** that pass the eleven principles. If a finding can't be applied without breaking a principle (e.g., it relies on public ranking), it doesn't make the pack.
5. **Run the handle-with-care check.** Drop or flag anything shaky.
6. **Write the pack** to `brain/evidence-packs/<goal-slug>.md` and tell the teacher what's in it in two or three sentences.
7. **Date it.** Every pack carries the date it was built so staleness is visible.

---

## Where packs live, and how the layers fit

```
research-foundations.md   →  universal base (every class gets this)
teaching-principles.md    →  the eleven moves (how the AI always writes)
evidence-packs/<goal>.md  →  YOUR goal's specific research (this engine)
```

When the AI generates anything for students, it silently checks the **active pack** (the one matching the current mission) on top of the universal base. The pack doesn't replace the principles — it points them at your goal.

Packs are plain markdown with zero classroom-specific content, which means they are **portable**. A pack built for one teacher's "reduce missing work" goal is, by construction, usable by any teacher with that goal. That's the long game: the first teacher to need a goal funds the research once; every teacher after can start from that pack instead of a blank page. Nothing personal travels with it because there was never anything personal in it.

## The practitioner loop

Research tells the AI what works *on average*. You know what works *in your room*. When you tell the AI how a move actually landed — "the if-then thing worked," "the Monday reset fell flat with this group" — it adds a dated, aggregate-only note to the bottom of the pack under **Practitioner notes**. Over time the pack reflects both the published evidence and your lived correction of it. (Aggregate only: "landed with 1st period," never anything about a specific student.)

## Staying fresh

Evidence moves. Effect sizes get revised; some celebrated findings shrink under replication. Once a pack exists, the AI offers to re-check the canon for that goal about once a month (this pairs naturally with a scheduled task). If it finds a stronger study, a contradiction, or a retraction, it proposes an edit and shows you exactly what would change, in plain language. You decide.

---

## The honesty rules (non-negotiable)

- **Always show evidence strength.** Never present a moderate finding as settled fact.
- **Name the source.** If the AI can't, the claim doesn't become a card.
- **Say what you don't know.** "There's surprisingly little good research on this" is a valid, trust-building answer.
- **Date everything.** A 2014 effect size labeled as such is honest; one presented as timeless is not.
- **Prefer fewer strong cards** to many weak ones.

The goal isn't to *sound* grounded. It's to be grounded, visibly, so you can check the AI's work and show it to anyone who asks.
