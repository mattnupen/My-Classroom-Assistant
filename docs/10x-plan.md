# 10x Plan — Close the Surface Gap

*June 2026. Companion to [`10x-roadmap.md`](10x-roadmap.md), which tracks shipped items. This doc is the opinion: where the wow actually leaks, and the order I'd fix it in. Updated after Matt's review — priorities reflect his calls.*

## The one-line diagnosis

**The ideas here are a 10. The surfaces a teacher sees and feels in the first five minutes are a 6.** The privacy architecture, the Project Vend framing, the teaching principles, the Demo Semester — all excellent. The gap is almost entirely *presentation and payoff*: what a teacher sees on open, whether they can feel the AI's personality, and whether the thing actually buys back the time it promises.

So the whole plan is one move: **make the surfaces as good as the thinking.** No new mission, no new risk to the privacy boundary — that boundary is the moat. We make it *visible and beautiful*.

## The wow ladder (what a teacher should feel, in order)

1. **It works instantly.** Tools run on double-click, no setup. *(shipped)*
2. **The first conversation feels like meeting a colleague.** *(shipped: First Session Protocol)*
3. **I can picture the semester this becomes.** *(shipped: Demo Semester)*
4. **I just got something real done that I'd never have had time for.** A Monday opener, a strength-first note to every family, a new tool conjured in a sentence. This is the aha that makes the assistant feel indispensable.

---

## 1. The first chat — persona + goals  *(building this session)*

**What's strong:** the interview script is warm and well-sequenced; ending chat one with a drafted persona + a real slide is exactly right.

**Where the wow leaks:** the personality — the emotional core of the whole project — is *invisible* until you've installed Cowork and started typing. And both the persona and the mission start as blank brackets, the highest-friction possible starting point.

**Moves (all three approved):**

- **Persona packs (3 ready-to-remix).** `brain/persona-packs.md`: Otter (calm coach), Spark (warm hype), Sage (curious researcher) — each with name, pronouns, voice, signature phrases, never-do seeds. Pick one, edit a line, or let students remix. Kills the blank-bracket problem and shows the *range*.
- **Mission starters.** Four missions tied to the teaching principles (zero missing work, deeper reading, every voice, comeback culture), each noting what it changes about outputs. The mission shapes everything; don't make teachers invent it cold.
- **A visible "meet your AI" card.** `content-templates/persona-card.html`: one printable/projectable card — name, mark, mission, "what I'll never do." Generated at the end of setup. The artifact the class rallies around; the thing that makes the AI feel *real*.

## 2. How teachers think about — and build — offline apps  *(building this session)*

**What's strong:** the teacher-app-builder skill with its four enforced privacy invariants is genuinely special. "When the tool doesn't exist, your AI builds it" is a killer line.

**Where the wow leaks:** the apps read as a *fixed utility belt*, and the most magical capability (the AI builds you one) is buried in `docs/`. Teachers don't know to ask.

**Moves (all three approved):**

- **App Studio idea gallery** (`local-tools/app-studio.html`): a grid of real, copy-pasteable prompts — seating chart with a do-not-sit list, exit-ticket tallier, conferring tracker, warm-welcome door tool. One click copies the prompt to paste into Cowork.
- **A standing "Build a tool" entry in the sidebar** (App Studio, registered in `_nav.js`) — the build-your-own path is always one click away.
- **Onboarding language shift:** "These tools are a starting set. Your AI builds the next one." Said in the README and on the dashboard.

## 3. What's missing

- **End-of-semester report card — cut for now** (Matt's call). The experiment-as-story still wants a climax; revisit if the narrative needs one. `brain/class-story.md` already accumulates the raw material, so this stays cheap to add later.
- **Student-voice tool — build (this session).** `local-tools/student-voice.html` via the teacher-app-builder skill: paste a form export, it strips names/emails and produces the name-free aggregate, same guarantee as Class Pulse. Includes a paste-ready Google Form template in a modal so teachers can stand the loop up in minutes. Added to the default apps.
- **Visual proof in the README — build (this session).** 1–3 images of the real dashboard and slide. (Demo video: Matt.)
- **Privacy one-pager — build (this session).** A shareable page with the "your data stays in the blue box" diagram — the most persuasive single artifact for teachers and admins. Linked from the README.

## 4. What makes it a must-have — it gives time back

Teachers don't lack ideas; they lack hours. The assistant earns "must-have" by doing the work a teacher *would* do if they had the time — which means the things that fall off the list every week under time pressure finally get done:

- **Time back.** The weekly rhythm stays under ~45 minutes. The AI drafts; the teacher decides. Nothing here adds to the pile.
- **Reach.** The personalized, research-grounded, on-voice work that time pressure usually kills — a note to *every* family, a comeback badge, a tool for a one-off need — becomes feasible at the scale of a whole class.

That's the pitch: not "another tool to manage," but "the assistant that does what you never get to." The boundary (privacy) is the moat, not a constraint to design around — trust is the product. The trap to avoid: features that trade the boundary for a little convenience. The answer is always no.

---

## Build order

| # | Item | Wow it serves | Status |
|---|------|---------------|--------|
| 1 | Dashboard rebuilt in Ocean Depths | First 5 min | ✅ shipped |
| 2 | Theme coherent across the suite (sidebar) | First 5 min | ✅ shipped |
| 3 | Projectable slide template | Time back / proof | ✅ shipped |
| 4 | Persona packs + mission starters | Personality | ◐ this session |
| 5 | Meet-your-AI persona card | Personality | ◐ this session |
| 6 | App Studio gallery + "Build a tool" sidebar entry | Build-your-own | ◐ this session |
| 7 | Student-voice tool (added to default apps) | Close the loop | ◐ this session |
| 8 | Privacy one-pager + README link | The pitch | ◐ this session |
| 9 | README screenshots (1–3) | The pitch | ◐ this session |
| — | End-of-semester report card | Story climax | Cut — revisit later |
| — | 90-second demo video | The pitch | Matt |

## Guardrails honored

No student data anywhere; the dashboard stays aggregate-only with its data contract intact. No network calls, no `fetch()`, no browser storage of any roster. New tools that touch student data (the student-voice tool) are built through the `teacher-app-builder` skill, never by hand. Copy stays in teacher voice — no product hype, short buttons.
