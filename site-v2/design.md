# design.md: "Chalk & Marker" (r2)

> **Note, Sept 2026.** Where this says copy comes verbatim from `copy.md`, that's out of date: the
> section files hold the live wording. The visual system and motion notes still apply.

Owner: art director. This file is the visual system and the spec for every section. Builders follow it,
and copy comes **verbatim** from `copy.md`. Tokens and primitives are in `tokens.css` (all `.mca-*`).
The style tile is `sections/_styletile.html`. Preview it with
`python3 site-v2/tools/build.py --preview _styletile` (build.py matches the file stem, so the leading
underscore is required). Capture it with `?flat` for a whole-page view.

---

## 1. The idea

**A teacher’s desk at 7:40 on a Monday.** The desk has a chalkboard-dark pen, copy paper, one orange
marker, a pad of sticky notes, and the things the assistant made overnight, laid out and ready to use:
the slide, the note home and the stack of cards. Every section shows a real object, and the marker is
the only thing that points.

Why r2 is different from r1 (and from klemm.build):

| r1 (rejected) | r2 |
|---|---|
| Fredoka, navy #071746, orange copy button: read as the same brand as klemm | **Bricolage Grotesque 800** (tight, confident, warm quirks) + **Figtree**, **chalkboard green-black #14231F** ink, flat marker button with a **clipboard** glyph and a Caveat arrow note |
| Centred stack hero with a widget card | **Asymmetric hero.** A left-aligned headline, then CTA on the left and a desk of five sticky-note goals on the right, with a real slide print bleeding off the top-right edge |
| 40 orange pills | A paper **year ruler**: outlined pips that turn orange-tint as weeks pass, with one thin marker line over them and tiny product tokens (Slide, Note home, Badge…) dropping in above their weeks |
| Marker circle drawn over glyphs | **Measured ring**, placed behind the text from the phrase’s real baseline (`[data-mca-ring]`, shell.html) |
| Orange eyebrow dot, peach-ink = orange | Orange is spent **only** on the marker (§3) |

Three rules decide every choice:

1. **Show the object.** When a section talks about a note home, a note home is on screen with the real
   sentence on it. Icons never stand in for things.
2. **The marker is the only voice that points.** Rings, arrows, underlines, connectors, highlighter,
   Caveat notes, the rubber stamp and the primary button are orange. Nothing else is.
3. **One idea per viewport, and the scroll does the idea.** A section’s motion is the proof of its
   sentence: the goal really rides the year, the names really dissolve, and the week really stops at you.

The **signature system** is (a) sticky notes (the goals, student feedback, the ballot), (b) printed
paper objects with washi tape, and (c) marker doodles (ring, arrow, underline, check, star). Every
section uses at least one of them, so the page reads as one brand.

## 2. Type

| Role | Family | Use |
|---|---|---|
| Display | **Bricolage Grotesque** 800 (`opsz` 96), 750 for h2, 700 for h3, 650 for h4 | Headlines, object titles, wordmark, sticky-note text |
| Reading | **Figtree** 400 to 800 | Everything else. Button labels are Figtree 800 |
| The teacher’s pen | **Caveat** 650 | Margin notes and object labels only. **Minimum 24px**, at most 5 words, orange-ink on light and orange on chalk |
| Files and the prompt | **DM Mono** 400/500 | `period-4-grades.csv`, `seating-chart.html`, the setup prompt |

Scale (tokens): display 46→96 / lh 1.1 / −3% / word-spacing +.08em · h2 36→68 / 1.04 / −2.8% ·
h3 24→34 · h4 19→22 · lead 19→23 Figtree 500 `--ink-2` · body 17/1.55 · small 15 · micro 13.

- Headlines are always `text-wrap:balance`, and each designed line is a `<span class="mca-line">`.
  Phones must never end on a one-word line.
- **Two-tone trick** (`.mca-dim` on the second clause, same size) is allowed once per section. It is
  used in the assistant words and the loop headline.
- Eyebrows are Figtree 750 uppercase with a 14px `--ink-4` dash before them. They have **no orange dot**.

## 3. Colour

- **Ink:** `--ink #14231F` (chalkboard green-black) for text and the chalk sheet. `--ink-2 #3F4F49` is
  body (8:1). `--ink-3 #5A6862` is meta (≥4.9:1 on every tint). `--ink-4` is decorative only.
- **Paper:** `--paper #FAF6EE` (page), `--paper-2 #F3EDE1` (recessed: shelf, slot, ruler bed),
  `--card #FFF` (objects).
- **Marker:** `--orange #FF5A1F`, `--orange-ink #C24410` (orange text, 4.7:1), `--orange-tint #FFE3D3`
  (filled pips, highlighter base).
- **Supply-cupboard tints**, three strengths each:
  - sheet: `--sky --sun --mint --lilac --coral`
  - note: `--note-*`, more saturated, for sticky notes and swatches
  - stroke: `--*-ink`, for dots, meters and ticks, never for body text

  Section assignments: sky → setup, sun → research, lilac → data, mint → tools and ticks, coral → the
  students ballot and event chips.
- The primary button is orange with an **ink label** (5.3:1). Copied state is an ink button, cream
  label and orange check.

**The orange budget** (critic rule): on any screen, the primary button must be the largest orange
mass. Rings and arrows are 3 to 5px lines. The filled year strip uses orange-*tint* pips plus one 3px
orange line. The "New" badge uses orange-tint with orange-ink text. No orange fills anywhere else.
The event date chip is **coral**.

## 4. Surfaces and rhythm

- **Desk** = graph paper (`.mca-desk`, 32px grid at 5.5% ink, radial fade). Use it for the hero and
  assistant stages only.
- **Sheets** = rounded coloured paper, inset `--sheet-inset` from the viewport edge, radius
  `--r-sheet`. `.mca-sheet` already carries `margin: var(--sheet-inset)`.
- **Chalk** = the CTA sheet (`.mca-sheet--chalk`): chalk ink with two faint eraser hazes.
- Page order: hero *(desk)* → setup *(sky sheet)* → assistant *(desk)* → research *(sun sheet)* →
  loop *(paper)* → data *(lilac sheet)* → tools *(paper)* → cta *(chalk sheet)* → footer *(paper)*.
- Container 1200 (set-pieces 1320). Section padding is `--section` (88→160). The heading block is
  `.mca-head`.
- **Heading placement:** left-aligned for hero, setup, research, tools and data. Centred for assistant,
  loop and cta. Don't mix within a section.
- Nothing floats unexplained. Every object sits on a surface, casts its own shadow family
  (`--sh-note` for stickies, `--sh-3` for paper and windows) and has a Caveat label or a caption.

## 5. Objects (the page’s vocabulary)

| Primitive | What it is | Notes |
|---|---|---|
| `.mca-note` + `--n:var(--note-*)` | sticky note | Darker adhesive band on top, curl on the lower right. Bricolage 650 18px. Rotate ±2 to 5°. Set `width` per section (148 desktop, ~(100%−20px)/3 on phone) |
| `.mca-paper` | printed thing | Radius 8. Put `.mca-ruled` on the paragraph (`line-height:28px`) so text sits on the rules. Add `.mca-tape` to pin it |
| `.mca-card` (+`__label/__title/__foot`) | UI card | `__foot` is a dashed rule + micro ("Draft · you send it", "You run it") |
| `.mca-window` | app frame | Only around `dashboard.png`, `app-studio.png` and the **setup chat**. Tools must not use a chat window (§9.07) |
| `.mca-file` + `--f` | file chip | mono, folded-corner doc glyph |
| `.mca-badge` (`--mint/--sun/--lilac/--coral/--new`) | status pill | `white-space:nowrap` is built in |
| `.mca-tick` / `.mca-tick--todo` | check row | mint disc / empty ring |
| `.mca-bubble--ai / --you` | chat | setup only |
| `.mca-stamp` | rubber stamp | outline, orange-ink, −8°. Tools only |
| `.mca-meter` | evidence strength | 4 segments + **micro label to the right** ("Moderate") |
| `.mca-ruler` | year ruler | 40 pips (JS inserts `<i>` before `.mca-ruler__line`), `.on` = orange-tint, `__line` `--t` = progress, `__months` |
| `.mca-shelf` + `.mca-tab` (`--on`, `--new`) | research folder tabs | **44px tall, 12px top radius only, flat bottom sitting on a 2px `--line-2` shelf line, no hover state, not focusable, `aria-hidden` with a text list for AT.** `--on` = note-sun fill, `--new` = dashed outline |
| `.mca-hl` (orange) / `.mca-hl--sun` | highlighter, sweep via `--t` | **Research uses `--sun`** (it is the research colour). Orange highlight is reserved for marker emphasis in copy |
| `[data-mca-ring]` | measured marker ring | see below |
| `.mca-stroke` + `path.mca-draw` | any other doodle | author the viewBox at roughly the rendered pixel size. **Never** combine `pathLength` with `vector-effect:non-scaling-stroke` (Chrome drops part of the dash; that was r1’s broken circle) |

**Rings.** Wrap the phrase with `<span data-mca-ring="load">one goal.</span>` and put `.mca-ring-host`
on the heading. shell.html finds the phrase’s baseline, builds the loop in real pixels, pads it .22em
on x and .08em on y from the ascender and descender, and places it at `z-index:-1`, behind the glyphs.
Use `data-mca-ring="scroll"` to drive `--t` yourself on `.mca-ring path`. Headline line-height stays
≥1.1 wherever a ring is used, so the loop clears line 2. Checked at 1440 and 390 in the tile. Builders
must re-check at 1280 and 834.

Images from `{{IMG}}` always sit inside a frame: `.mca-paper` (6px padding) for slide and cards,
`.mca-window` for dashboard and app-studio. `img{height:auto}` is global. Always give `width` and
`height` attributes.

## 6. Motion

- Scroll **scrubs**. It never triggers timed animations. The only time-based motion is the ring
  drawing on load (750ms, 250ms delay), button micro-states (200ms), and the prompt panel dropping in.
- Arrivals translate 20 to 80px, settle a rotation into its resting angle, and use `MCA.ease`. Opacity
  alone is never the whole move for anything important.
- At most two things move at once. Stagger with `MCA.stepper`.
- Pinned sets use a `data-pin` wrapper and a sticky stage `height:100svh`. Keep composed content inside
  a max 920px-tall box that is vertically centred.
- Cache layout (rects) on resize, never inside `paint`. The tile hero shows the pattern.
- Every section must be complete at **p=1** and composed (not empty) at **p=0**. Moving things out of
  the way means dimming them (opacity .38, `saturate(.4)`), not removing them. Empty stages lose blind
  tests.
- Pins on phones are 85% of the desktop length. Phones get the same story with a simpler path
  (vertical or a stacked deck), never a shrunken desktop.

## 7. Buttons and the prompt

- One movement rule for all buttons: hover lifts 1px, press sinks 1px. Only the shadow and background
  change beyond that. There is no 3D lip.
- Primary: orange, radius 14, 60px, Figtree 800 18px, clipboard glyph on the left that swaps to an
  orange check when copied.
- **Hero and CTA group** (markup at `.mca-copy` in tokens.css): the button, with a Caveat note
  "Paste it into Claude." and a hand arrow curling in from the right. Below it sits one quiet meta row:
  `Show the prompt` (a caret chip that rotates when open) · "No install. Try the live demo →". The
  hint "A sample class with made-up names." goes on the demo link as its `title` and as the link’s
  trailing `.mca-sr` text.
- On phones the button is full width and the note sits under it, right-aligned, with the arrow
  pointing up.
- shell.html copies the exact prompt and toggles `.is-copied` for 2.4s. On clipboard failure it opens
  the panel, shows the fail line and selects the prompt. Leave `<code class="mca-copy__prompt">` empty;
  the shell fills it.
- Nav: `.mca-btn--primary.mca-btn--sm`, idle "Copy the prompt", done "Copied". It has no hand note.
- The secondary action is always `.mca-link`, never a second big button.

## 8. Page length: measured budget

| Section | Desktop height |
|---|---|
| hero | pin 120vh |
| setup (students folded in) | pin 140vh |
| assistant | pin 220vh |
| research | in-flow ≈110vh |
| loop | pin 170vh |
| data | pin 140vh + cards ≈70vh |
| tools | in-flow ≈100vh |
| cta | ≈85svh |
| footer | ≈35vh |

Total ≈ **11.9 viewports of document, about 10.9 viewports of scrolling** at 1440×900. It holds eight
distinct screens. The `students` beat is folded into setup (copy.md’s open question). Section builders
must report their real height from a `?flat&p=1` capture. If the sum passes 12 viewports, tighten the
storyboards rather than adding length.

---

## 9. Section specs (page order)

Storyboards list what is on screen at p = 0 · .25 · .5 · .75 · 1. "Beat" names the reference frames a
section must win against blind.

### 00 · nav — `sections/00-nav.html`
- **Point:** Where you are and the one thing to do.
- **Archetype:** floating bar, `position:fixed`, top 12px, inside the container, 60px tall, radius 18.
- **Layout:** Left is the wordmark: a 32px mark (chalk square, sun sticky, orange loop, as in the tile
  and favicon) and "My Classroom Assistant" in Bricolage 750 19px. Right are the links `How it works` ·
  `Privacy` · `GitHub ↗` (Figtree 650 15px `--ink-2`) and then the small primary copy button.
- **Motion (not a scrub):** register as `pass`, ignore `p`, and read the hero CTA’s rect. While the hero
  CTA is visible, the bar is transparent and the button is `visibility:hidden; opacity:0;
  translateY(-6px)`. Once the CTA bottom is above 64px, the bar becomes `rgb(250 246 238 / .84)` with
  `backdrop-filter: blur(14px) saturate(1.4)`, `--sh-2` and a 1px `--line` ring, and the button slides
  in (200ms). Frozen captures at the top show the transparent state.
- **Mobile:** mark, wordmark (text hidden below 360px) and the small copy button. The links live in the
  footer.
- **Beat:** raycast-hero nav, linear-hero nav.

### 01 · hero — `sections/01-hero.html`
- **Point:** One assistant for your whole class, one goal all year, started by pasting a prompt.
- **Archetype:** asymmetric product-object hero. **Build it from the style tile’s hero**, which is the
  reference implementation.
- **Surface:** desk, grid mask centred right (70% 55%).
- **Layout (1440):**
  - Headline: left-aligned, 94px, two lines, "one goal." ringed.
  - Lead: the **phone cut at every width** ("An AI assistant for your whole class. Give it one goal.
    Every week it plans a move and makes what you need."), max 24em.
  - The copy group as §7.
  - Right: five sticky notes in a loose 3 + 2 cluster (470×300, anchored bottom-right of the main area)
    with Caveat "pick one" and an arrow from the left.
  - Edge objects: the `slide.png` print (470px, +6°, washi tape) bleeds off the top-right. A note-home
    corner (+4°) bleeds off the right edge behind the mint sticky.
  - Bottom: the year ruler across the container, with Caveat "this week" pointing at pip 1 (pre-filled)
    and "all year" under the Jun end.
- **Motion (pin 120vh):**
  - p=0: everything as described above. This is the first impression and it must be the most beautiful
    frame.
  - p=.25: the other four notes dim (.38, `saturate(.4)`, +18px). "More work turned in" straightens,
    scales to .7 and lands above pip 1. "pick one" and "this week" fade out.
  - p=.5: the note has ridden to about Jan. Pips behind it are orange-tint and the marker line runs
    under it. Tokens have dropped in above their weeks: Slide (wk 2), Note home (6), Badge (12),
    Cards (18).
  - p=.75: the note is about Apr, and Event (25) and New tool (31) are in.
  - p=1: the note is parked at Jun, with a small mint check added at its corner. The strip is full.
    Hint "See what it does ↓" (micro, `--ink-3`) replaces "all year".
- **1280×720 / 1366×768:** headline 76px, sticky cluster scaled to .84 (as in the tile ≤1180 rule),
  note-home corner hidden, slide at `right:-230px`. The ruler must stay on screen with ≥32px bottom
  padding. Capture both.
- **Mobile (390):**
  - Headline 46px on three balanced lines (Pick one goal. / It keeps at / it all year.).
  - Full-width button with the note under it.
  - Three sticky notes in a row, no overlap, no occluded text; "pick one" sits above the right one.
  - No slide or note corner. The ruler has 40 pips, all ten months at 11px.
  - Not pinned. The ride plays as a `pass` over the ruler block.
  - Headline, lead and button fit in the first 844px.
- **Beat:** notion-hero, things-hero, klemm-hero.

### 02 · setup — `sections/02-setup.html` (students folded in)
- **Point:** Setup is a ten-minute conversation, not a form. (Your class can name it.)
- **Archetype:** split. Headline left (5 cols), a chat window right (7 cols). **Setup owns the chat
  window. No other section uses one.**
- **Surface:** sky sheet.
- **Layout:**
  - Left column: eyebrow "Setup" → h2 "Setting it up is just talking." → lead.
  - Under the lead, the **checklist on a sticky note** (`--note-sun`, 300px, −2°, 4 tick rows,
    unticked = `.mca-tick--todo`).
  - At p≥.9, the closing line "That’s the whole setup. Now it starts making things." with a marker
    arrow pointing down.
  - Right column: `.mca-window` titled "Your assistant", fixed 540px tall. Chat scrolls upward inside
    it (last 5 to 6 lines visible, older ones mask out at the top).
- **Students fold-in:** when the tick "Name and voice: up to your class" lands, three small ballot index
  cards (Otter · the calm coach · “One small step?” / Spark · the warm hype · “Look what you pulled
  off.” / Sage · the curious researcher · “Let’s find out.”) fan out of that sticky toward the window
  edge. Each is 150px, `.mca-paper`, with tally marks drawn in marker, labelled "Class vote · sample".
  The Caveat caption "Your class names it." sits beside them. No card wins; the choice is the class’s.
- **Motion (pin 140vh):** 9 chat lines via `MCA.stepper(lines, p, .04, .085, .06)`. Each AI line shows a
  3-dot typing bubble for the first half of its slot.
  - p=0: line 1. Checklist empty.
  - p=.25: lines 1–3.
  - p=.5: lines 1–5. Tick 1 "Goal: fewer missing assignments" pops (spring).
  - p=.75: lines 1–8. Tick 3 lands, the ballot cards fan out with tallies drawing, then tick 4 lands.
  - p=1: line 9. Tick 2 "Research loaded". Closing line and arrow.
- **Mobile:** head, then the window at full width and 420px tall, then the checklist sticky under it,
  then the ballot cards as a 3-up row at 104px. Pin 120svh.
- **Beat:** notion-3, linear-hero, klemm "Get started".

### 03 · assistant — `sections/03-assistant.html` ★ centrepiece
- **Point:** It makes the real things you use in your room.
- **Archetype:** full-stage assembly set-piece. **The resting state is the tile’s "things it makes"
  band.** Build from it.
- **Surface:** desk, full bleed, stage max 1400.
- **Layout:**
  - Centre words, Bricolage 800 clamp(40px, 1.6rem + 3.4vw, 76px): "This is your assistant." /
    "It helps you do things." Line 2 starts `.mca-dim` and turns ink at the end, with a marker
    underline under "things.".
  - Resting positions (left/top as % of the stage, desktop ≥1280 and ≥800px tall):

    | # | Object | Size | Position | Rotation |
    |---|---|---|---|---|
    | 1 | Monday’s slide (paper print) + caption "Fresh week. Fresh start." | 320 | (3%, 5%) | −4° |
    | 2 | A note home (ruled, "Monday’s a clean start." in `.mca-hl--sun`, foot "Draft · you send it") | 300 | right 3%, top 3% | +3° |
    | 3 | Cards to hand out (3-paper fan, `student-cards.png` on top) | 290 | (1.5%, 47%) | +2° |
    | 4 | A badge: sun sticker "★ Best question of the week", nowrap | — | right 6%, top 41% | −5° |
    | 5 | A class event: coral "FRI" chip, "Goal hit!", "Celebration Friday · 20 min" on one line (nowrap), foot "You run it" | 300 | right 2.5%, top 59% | +2° |
    | 6 | A tool it wrote: `seating-chart.html` + mint "Works offline" | — | (4%, 84%) | −2° |
    | 7 | Your home base: `dashboard.png` in a window | 640 | centred, top 60%, cropped by the stage bottom | — |

    Each object has a Caveat label above it.
- **Motion (pin 220vh):** each object flies in from its nearest edge (80 to 120px, +8° past rest,
  scale .92) and settles. Stepper start .05, step .095, dur .13. Its Caveat label writes on as it lands.
  - p=0: words alone, centred at 44% height, on the desk, line 2 dim.
  - p=.25: slide and note landed, cards arriving.
  - p=.5: 1–4 landed, event arriving.
  - p=.75: 1–6 landed. The dashboard rises from the bottom edge. The words glide up to 34%.
  - p=1: line 2 turns ink and the underline sweeps. The closing line "All of it comes to you first. You
    change what you want, then use it." (lead) sits under the words. The dashboard is at rest.
- **Short laptop table (viewport height < 800px, e.g. 1280×720, 1366×768):**

  | Item | Value |
  |---|---|
  | words | clamp(40px, 4.6vw, 64px), settle at 26% |
  | dashboard | 560px wide, max 56vh visible, always below the closing line (never under the words) |
  | objects | x ≤ 18% or ≥ 76% only. Slide 260, note 260, cards 240. Badge and event stack at right 3%: badge top 38%, event top 56% |
  | tool chip | moves to (3%, 80%) |

  Builders must capture 1280×720 at p=.5 and p=1, and nothing may overlap the words or the closing
  line.
- **Mobile:** the words at top (36px). Objects land one at a time into a **stacked deck** below the
  words. Each new object lands on top, alternating ±3°; earlier ones shift up 10px and scale .96 so
  their edges show like a pile. The Caveat label above the deck swaps to the current object. The
  dashboard lands last at full width, with the closing line under it. Pin 190svh. No object may be
  wider than 100vw − 32px.
- **Beat:** klemm-2 ("What you get"), signal-3, notion-3, framer-2.

### 04 · research — `sections/04-research.html`
- **Point:** Everything it makes comes from research on your goal, and you can read it.
- **Archetype:** proof link between two objects, plus a folder shelf.
- **Surface:** sun sheet.
- **Layout (in-flow, `pass`):**
  - `.mca-head` left (eyebrow "Research" → h2 "It does the reading first." → lead), 6 cols.
  - Below: on the left, the note-home draft (ruled paper, 380px, −2°). On the right, the evidence card
    stack: a white card of 420px (label, claim in h4, `.mca-meter` with "Moderate", meta line) with
    the second card (Leventhal) peeking behind it at +3°.
  - A marker connector (SVG cubic, viewBox at its pixel size) runs from the highlighted phrase to the
    claim. Caveat "Why it wrote that" sits at its midpoint.
  - Under both: micro "Research it already has", then the `.mca-shelf` of six tabs (Missing work is
    `--on`, "Your goal →" is `--new`) with "It builds a new set." beside the last tab. Microcopy goes
    under the shelf.
- **Motion:**
  - p=0: draft and card visible. The card is rotated 6° and 40px lower. No highlight, no connector.
  - p=.25: the sun highlighter sweeps "Monday’s a clean start."
  - p=.5: the connector draws. The card straightens and settles.
  - p=.75: the meter fills 3 of 4 and "Moderate" fades in. The caption writes on.
  - p=1: the tabs rise one by one onto the shelf, with "Your goal →" last.
- **Mobile:** head → draft → vertical marker connector → card → shelf as a 2-column wrap (tabs keep the
  flat bottom and each row gets its own shelf line). No horizontal scroll.
- **Beat:** stripe-2, proton-3, notion-3.

### 05 · loop — `sections/05-loop.html`
- **Point:** Every week it plans a move, and nothing happens until you say so.
- **Archetype:** a week travelling across a desk. **Each stop is the object it carries**, not a step
  card.
- **Surface:** paper.
- **Layout (pin 170vh):**
  - Centred `.mca-head`: h2 "Once a week, it makes a plan." / "You decide." The second line is ink,
    with a marker underline that draws at the gate.
  - Below, four stops joined by a dashed `--line-2` track. Each has its title (h4) and one body line
    underneath:
    1. **Your class**: a cluster of 3 small feedback stickies (coral, sky, mint) with short
       hand-lettered-style Figtree lines ("the reading was long", "loved Friday", "need more time").
       These are illustrative, not quotes from real people. Label them "sample".
    2. **You**: the CSV total chip, a white sticker reading **8 students behind on Unit 3**.
    3. **Your assistant**: a fanned mini slide, note and FRI event.
    4. **You, again**: a small desk blotter with the two gate controls, "Change it" (`.mca-btn--sm`)
       and "Run it Monday" (`.mca-btn--chalk.mca-btn--sm`), as spans in a `role="img"` group. Caveat
       "Your call. Every week." sits under them.
  - The **Week 6 folder** (manila `--sun`, 120px, "Week 6" tab) travels the track. The carried item is
    clipped to it as a slip.
- **Motion:**
  - p=0: stops visible at .55 opacity. The folder is at stop 1.
  - p=.25: at stop 2, carrying "how the week went". Stop 1 goes to full opacity.
  - p=.5: at stop 3, carrying “8 students behind on Unit 3”.
  - p=.75: arrives at stop 4 and **stops**. Controls appear, the underline draws, a marker ring draws
    round "Run it Monday".
  - p=1: a return arc draws under the row back to stop 1. The return line sits under the row.
- **Mobile:** a vertical track. The folder travels down the left rail and the stops stack. Pin 150svh.
- **Beat:** linear-4, linear-5, raycast-3. It must not resemble the rejected dark oval or a stock
  "How it works" row.

### 06 · data — `sections/06-data.html`
- **Point:** Two safe ways to handle student data, and both end with the same assistant.
- **Archetype:** fork-and-merge privacy set-piece, then two plain cards.
- **Surface:** lilac sheet.
- **Layout (pin 140vh, then the cards in flow inside the same sheet):**
  - Left-aligned head.
  - Stage left: the `period-4-grades.csv` chip above a gradebook paper with the micro label "Sample
    data · made-up names". **Each row also carries a tiny `made up` tag** at the right of the name, so
    the label survives any crop. Four rows and a faded "…".
  - The path forks into **Online** (top) and **Offline** (bottom) lanes with the fork labels from
    copy.md. They rejoin at "Your assistant": "Either way · Your assistant knows the class is behind.
    It starts on Monday’s slide.", with a mini slide thumb.
- **Motion:**
  - p=0: gradebook whole, lanes drawn faint.
  - p=.25: online. An intact copy slides along the top lane into a "Claude for Teachers" tray with a
    "District approved" check.
  - p=.5: offline. Names **dissolve** per letter (blur 0→8px, opacity →0, staggered), rows collapse,
    counts slide together.
  - p=.75: the counts fuse into a white sticker, **8 students behind on Unit 3**, which rides the lower
    lane.
  - p=1: both lanes arrive. The "Either way" card lifts (`--sh-3`) and the slide thumb appears.
- **Below the pin:** two `.mca-card`s (Online · Claude for Teachers ↗ / Offline · On your own
  computer). The district line is **bold ink at full size, never collapsed or muted**. Then "Either
  way: same assistant, same materials, same weekly loop." and "Read the privacy one-pager →".
- **Mobile:** lanes stack (online above, offline below), the join card sits at the bottom, and the cards
  stack. Pin 120svh.
- **Beat:** appleprivacy-hero, signal-4, proton-hero.

### 07 · tools — `sections/07-tools.html`
- **Point:** When it needs a tool that doesn’t exist, it builds one.
- **Archetype:** a file being made. **No chat window and no tick list in a card.** It must not look
  like setup.
- **Surface:** paper.
- **Layout (in-flow, `pass`):**
  - Left 5 cols: head (h2 "Need a tool nobody makes? It writes one." → lead → microcopy). Above the
    head, the request as a single typed line in a paper strip: “Can you make me a seating chart that
    keeps two kids apart?”, labelled **You**.
  - Right 7 cols: a desk slot (a `--paper-2` recessed bar, 12px tall, with an inner shadow). A
    `seating-chart.html` **printout** (`.mca-paper`, 330px) slides up out of it, showing a mini seating
    grid of 5×4 desk squares with two squares in coral and a marker line between them. An orange
    `.mca-stamp` "Privacy checked" lands on the printout. An **inspection slip** (cream `.mca-paper`,
    +3°, with a small staple) sits stapled to its corner, listing the four checks as `.mca-tick` rows.
  - At the far right, a slim sidebar strip (Class Tools list: Dashboard, Student Cards, Parent
    Messages, Badges…). `app-studio.png` sits behind at .35 opacity as the "more ideas" backdrop.
- **Motion:**
  - p=0: the slot, the request strip and the sidebar.
  - p=.25: the printout rises from the slot and the file name types by p.
  - p=.5: the seating grid fills and the coral pair separates.
  - p=.75: the slip staples in and its ticks land one by one. The stamp lands (scale 1.3→1, −8°, a
    tiny 2px jolt of the printout).
  - p=1: the printout shrinks and drops into the sidebar as a new row "Seating Chart" with
    `.mca-badge--new` "New". The row highlights `--mint`.
- **Mobile:** head, slot and printout at full width, the slip under the printout, and the sidebar as
  a 3-row strip under that.
- **Beat:** cursor-hero, raycast-3, linear-hero.

### 08 · cta — `sections/08-cta.html`
- **Point:** Start now: copy the prompt, or try the demo.
- **Archetype:** closing statement written on the chalkboard.
- **Surface:** chalk sheet, min 80svh.
- **Layout:**
  - Left-aligned in the container, not centred, to echo the hero: h2 "Give your class one goal."
    (on-chalk, 76px) with "one goal." ringed (`data-mca-ring="scroll"`).
  - Subhead, then the copy group as §7 with the caption "Paste it into Claude. It takes it from there."
    as the hand note, then "or try the live demo →".
  - Right: the finished year. The same sticky note "More work turned in" parked on a chalk-drawn ruler
    (pips in `--on-chalk-2` at 30%, filled `--orange-tint` at 25%) with its mint check, bringing the
    hero’s story home.
- **Motion (pass):** p=0 ruler empty · p=.25–.75 pips fill and the sticky rides · p=.75 the ring draws ·
  p=1 at rest. The button never pulses.
- **Mobile:** h2 40px, button full width, ruler under the CTA.
- **As built (approved at integration):** centred stack, klemm-style: the ruler sits above the
  headline on every width, and the last thing that moves is the hand-drawn arrow pointing at the
  button. Don't "fix" this back to the left-aligned layout above.
- **Beat:** linear-cta, klemm-hero CTA, raycast-6.

### 09 · footer — `sections/09-footer.html`
- **Point:** Links, license, author.
- **Layout:** Row 1: the wordmark on the left, the links on the right (Try the demo · GitHub ↗ ·
  Privacy one-pager · Claude for Teachers ↗). A hairline. Row 2 in micro: "Free and open source · MIT
  License" · "Made by a teacher · Matt Nupen" · "Sample names on this page are made up."
- **Motion:** none. The nav’s phone links live here.
- **Mobile:** stacked, with the links in a 2-column grid and 44px tap targets.
- **Beat:** linear and stripe footers.

---

## 10. Checklist every builder runs before handing in

- Copy is verbatim from copy.md, with real apostrophes and no exclamation marks except "Goal hit!".
- Captures at p = 0, .25, .5, .75 and 1 at 1440×900, plus **1280×720** and 834×1112.
- Phones: headless Chrome can’t lay out below 500px, so capture through a 390px iframe wrapper (see
  `preview/phone.html`) shot at 390 wide.
- No horizontal overflow at 390 (grid tracks `minmax(0,1fr)`).
- p=1 is complete and reduced motion looks finished.
- The orange budget holds: the primary button is the largest orange mass on screen.
- Rings and strokes are fully drawn with no glyph contact. Zoom a crop to check.
- Every image is framed, sized and alt-texted from copy.md. The focus ring is visible on every control.

## 11. Requests to the copy chief (not blocking)

- The hero caption mirrors klemm’s formula. r2 uses only "Paste it into Claude." as the hand note plus
  the meta row. A fresh caption would be welcome (e.g. "Paste it into Claude. It interviews you.").
- Sample names "Carlos Diaz / Maya Chen" read as real kids. Consider "Sam Sample / Alex Example" style.
  Until then, the per-row `made up` tag in data carries it.
- The loop’s stop 1 needs three short sample feedback lines approved (proposed: "the reading was long",
  "loved Friday", "need more time").
