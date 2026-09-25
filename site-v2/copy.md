# copy.md — My Classroom Assistant homepage v2

> **Historical, Sept 2026.** This was the starting copy plan. The live wording now lives in
> `sections/NN-id.html`, and those files are the source of truth. Don't copy lines from here
> back into the page. The red-team log and fact checks below are still useful background.

Owner: copy chief. Section builders use this text **verbatim**. If a line doesn't fit your layout,
ask for a cut. Don't write a new line yourself.

Voice: a teacher talking to another teacher in the hallway. Short sentences. Concrete nouns
(slide, note home, card, Friday). Cheerful, never breathless. "Goal", never "problem".

Typographic rules: real apostrophes and quotes (’ “ ”), em dashes with no spaces (—), "K-12",
"US", ellipsis as one character (…). File names in monospace. No exclamation marks, with one
exception: "Goal hit!" on the event card, because that is what a teacher would write on the board.

Recommended order (it follows the teacher's own first week: hear it, set it up, see what it
makes, learn why, see the rhythm, trust it, stretch it, share it):

| # | id | One point |
|---|----|-----------|
| 00 | `nav` | Where you are and the one thing to do. |
| 01 | `hero` | It’s one assistant for your whole class, it works on one goal all year, and you start it by pasting a prompt. |
| 02 | `setup` | Setup is a ten-minute conversation, not a form. |
| 03 | `assistant` | It makes the real things you use in your room. |
| 04 | `research` | Everything it makes comes from research on your goal, and you can read that research. |
| 05 | `loop` | Every week it plans a move, and nothing happens until you say so. |
| 06 | `data` | There are two safe ways to handle student data, and both end with the same assistant. |
| 07 | `tools` | When it needs a tool that doesn’t exist, it builds one. |
| 08 | `students` | Your students can name it and shape who it is. |
| 09 | `cta` | Start now: copy the prompt, or try the demo. |
| 10 | `footer` | Links, license, author. |

Changes from the approved page: research gets its own beat (it was only one chat line), and
students get their own beat (they were only one loop step). Both are core to the product, and
both needed a picture of their own. Nothing approved was cut.

---

## 00 · nav

**Point:** Where you are and the one thing to do.

- Wordmark: **My Classroom Assistant**
- Links: `How it works` (→ #setup) · `Privacy` (→ #data) · `GitHub ↗`
- Nav button (after the hero scrolls away): **Copy the prompt**
  - On success it changes to: **Copied**, then goes back after 2 s.
- Mobile: wordmark + **Copy the prompt** only. The links go in the footer.

---

## 01 · hero

**Point:** It’s one assistant for your whole class, it works on one goal all year, and you start it by pasting a prompt.

### Headline options

1. **Pick one goal. It works all year.** (the approved line. Shortest, but "works" can read as "functions")
2. **Pick one goal. It keeps at it all year.** ← **PICK**
3. **Your class picks one goal. It works on it all year.**

Why 2: same theme, same rhythm, same two beats. "Keeps at it" is how a teacher talks, and it
says effort, not uptime. It also hints at persistence without making a promise about results.
Set it as two lines: *Pick one goal.* / *It keeps at it all year.*

### Eyebrow (above headline)
Free · open source · runs in Claude

### Subhead
An AI assistant for your whole class. Give it one goal—more work turned in, better attendance,
more voices in the room—and every week it plans a move and makes what you need. You look it
over and run it.

(Phone cut, if the builder needs it: *An AI assistant for your whole class. Give it one goal.
Every week it plans a move and makes what you need.*)

### Primary CTA: copy-the-prompt
- Button: **Copy the setup prompt**
- Caption under it: Copy the prompt. Paste it into Claude. That’s the install.
- Disclosure toggle: **Show the prompt** / **Hide the prompt**
- Prompt shown and copied (exact, do not edit):
  `Set up My Classroom Assistant from https://github.com/mattnupen/My-Classroom-Assistant — download it, then interview me about my class and build my assistant.`
- Success state (button): **Copied. Now paste it into Claude.**
- Failure fallback (clipboard blocked; reveal the prompt and select it):
  Your browser blocked copying. Here it is. Select it and copy.

### Secondary CTA
- Link: **Try the live demo →**
- Label before it: No install.
- Hint shown under the link: A sample class with made-up names.

### Scroll cue (optional)
See what it does ↓

---

## 02 · setup

**Point:** Setup is a ten-minute conversation, not a form.

- Headline: **Setting it up is just talking.**
- Subhead: Paste the prompt and it interviews you. About ten minutes. No settings screen.

### On-screen chat (animation; appears line by line)
Speaker label for assistant lines: **Your assistant** (it has no name yet, on purpose).
Speaker label for teacher lines: **You**

1. **Your assistant:** Hi. I’m your class’s new assistant. No name yet. First, what do you teach?
2. **You:** 8th grade English. 26 kids, last period.
3. **Your assistant:** If this year went well, what would be different?
4. **You:** Fewer kids with missing work.
5. **Your assistant:** Want your students to name me?
6. **You:** Yes. Let them pick.
7. **Your assistant:** Anything I should never do in your room?
8. **You:** Never call a kid out in front of the class.
9. **Your assistant:** Got it. I’ve pulled the research on missing work. Ready when your class is.

### Checklist that ticks in as the chat resolves
- ✓ Goal: fewer missing assignments
- ✓ Name and voice: up to your class
- ✓ House rule: no calling kids out
- ✓ Research loaded

(Order follows the chat: each tick lands on the answer that settles it. Approved at integration.)
Ballot chip end state: **Spark · picked Monday**; margin note: "Monday, your class names it." (the vote is shown as a later moment, not part of the 10-minute setup).

### Closing line (under the chat)
That’s the whole setup. Now it starts making things.

---

## 03 · assistant (the set-piece)

**Point:** It makes the real things you use in your room.

- Centre words (fixed; the things assemble around them):
  **This is your assistant.**
  **It helps you do things.**
- No subhead. The objects are the subhead.

### Objects that assemble (order of arrival; label above each)

1. **Monday’s slide** (use `{{IMG}}/slide.png`)
   Caption: Fresh week. Fresh start.
2. **A note home**
   Card text: “Hi. A quick note about this week. Nothing’s wrong. I just want us on the same page. Monday’s a clean start.”
   Footer: Draft · you send it
3. **Cards to hand out** (use `{{IMG}}/student-cards.png`)
   Caption: Printed, one per student
4. **A badge**
   Card text: ★ Best question of the week
5. **A class event**
   Card text: **Goal hit!** Celebration Friday · 20 minutes
   Footer: You run it
6. **A tool it wrote**
   Card text: `seating-chart.html`
   Footer: Works offline
7. **Your home base** (use `{{IMG}}/dashboard.png`, arrives last, largest)

### Line after the assembly resolves
All of it comes to you first. You change what you want, then use it.

---

## 04 · research

**Point:** Everything it makes comes from research on your goal, and you can read that research.

- Headline: **It does the reading first.**
- Subhead: Name your goal and it looks up what works for it, starting with trusted education
  research. It writes what it finds on plain cards, so you can check its work.

### On-screen evidence card (animation: a note-home draft on the left, a line connects it to the card it came from)
Card, exactly as in the repo’s missing-work pack:
- Label: **Evidence card · Missing work**
- Claim: **Use natural fresh starts instead of “you’re behind.”**
- Meta: Evidence strength: Moderate · Dai, Milkman & Riis (2014)
- Linked phrase highlighted in the draft: “Monday’s a clean start.”
- Connector caption: Why it wrote that

Second card, stacked behind (optional):
- Claim: **Make the next action almost too small to refuse.**
- Meta: Evidence strength: Moderate · Leventhal, Singer & Jones (1965)

### Goal shelf (tabs are fine as a list of labels, not pill buttons)
Label: Research it already has
- Missing work
- Attendance
- Participation
- Calmer transitions
- Reading comprehension
- **Your goal →** It builds a new set.

### Microcopy under the shelf
Each card says how strong the evidence is. When the evidence is weak, the card says that too.

---

## 05 · loop

**Point:** Every week it plans a move, and nothing happens until you say so.

- Headline: **Once a week, it makes a plan. You decide.**
- Subhead: It reads how the class is doing and what you and your students said. Then it plans
  the week’s move. Nothing reaches your students except through you.

### On-screen week (animation: one week moves from left to right through four stops; show what is carried at each hand-off)

| Stop | Title | Body | What moves to the next stop |
|---|---|---|---|
| 1 | **Your class** | Says what’s working and what isn’t. | how the week went |
| 2 | **You** | Hand over the totals. | “8 students behind on Unit 3” |
| 3 | **Your assistant** | Checks its research, reads the trend, plans the move. | a slide, a note home, a Friday event |
| 4 | **You, again** | Look it over. Change anything. Run it Monday. | the class responds |

The gate (drawn on stop 4, the moment the animation pauses):
- Two controls, visual only: **Change it** · **Run it Monday**
- Caption: Your call. Every week.

Return line (under the loop):
Then the next week starts, and it plans again with what it learned.

---

## 06 · data

**Point:** There are two safe ways to handle student data, and both end with the same assistant.

- Headline: **Two safe ways to handle student data.**
- Subhead: Work online with Claude for Teachers, or offline on your own computer. Use whichever
  your district allows. The assistant works the same either way.

### On-screen animation ("names dissolve, counts survive")
- File chip: `period-4-grades.csv`
- Label over the rows: Sample data · made-up names
- Rows (fictional): Carlos Diaz · 4 missing / Devon Edwards · 1 missing / Maya Chen · 3 missing / Amari Johnson · 5 missing
- Fork labels:
  - **Online:** Your district approved Claude for Teachers. The file goes straight in.
  - **Offline:** No approval? The names dissolve on your laptop first. Only the total goes.
- What survives on the offline path: **8 students behind on Unit 3**
- Where the paths meet: **Either way** · Your assistant knows the class is behind. It starts on Monday’s slide.

### Two cards (static, under the animation)

**Online · Claude for Teachers ↗** (links to https://www.anthropic.com/news/claude-for-teachers)
- Lead: Upload your gradebook directly.
- Body: Anthropic’s offering, launched July 2026, free for verified US K-12 teachers. FERPA-aligned
  protections under a K-12 data processing addendum. Your data isn’t used to train models.
- Required line (keep it bold and visible): **Whether you may upload identifiable student data
  is your district’s decision, not Anthropic’s. Ask first.**

**Offline · On your own computer**
- Lead: Names never leave your laptop.
- Body: Free browser tools run on your computer with no internet. They turn your gradebook into
  totals, like “8 students behind on Unit 3.” Only that total goes to the assistant.

### Line under both cards
Either way: same assistant, same materials, same weekly loop.
Link: **Read the privacy one-pager →** (`{{ROOT}}setup/permissions/privacy-one-pager.html`)

---

## 07 · tools

**Point:** When it needs a tool that doesn’t exist, it builds one.

- Headline: **Need a tool nobody makes? It writes one.**
- Subhead: Ask for a seating chart that keeps two kids apart, or a reading tracker for your room.
  It builds a working app, checks it for privacy leaks, and adds it to your sidebar.

### On-screen sequence
1. Chat bubble, **You:** “Can you make me a seating chart that keeps two kids apart?”
2. Build line: `seating-chart.html`
3. Checks tick in one by one:
   - ✓ One file
   - ✓ No internet calls
   - ✓ Doesn’t save student data
   - ✓ Added to your sidebar
4. Sidebar row appears, highlighted: **Seating Chart** · New
   (Optional context: use `{{IMG}}/app-studio.png` as the "more ideas" backdrop)

### Microcopy
Each tool is one file you double-click. No install. No account. No internet.

---

## 08 · students

**Point:** Your students can name it and shape who it is.

- Headline: **Your class names it.**
- Subhead: Students can vote on its name, its personality and the goal. A room that picks its
  assistant tends to care what it says. Or you choose. Your call.

(Fact check: "tends to care" is the ownership effect cited for Option A in `brain/your-classroom-ai.md`. It is a
general claim, not a pilot result. Keep "tends to". Don't make it stronger.)

### On-screen ballot (animation: tally marks fill in on paper-style cards, one wins, then its "meet your assistant" card flips up)
Label: Class vote · sample
Three starter personalities (these ship with the repo, and they are starting points only, not named class personas):
- **Otter** · the calm coach · “One small step?”
- **Spark** · the warm hype · “Look what you pulled off.”
- **Sage** · the curious researcher · “Let’s find out.”

Winning card flips to:
- Label: Meet your assistant
- Name field: **[Your class decides]** (typed in cursor-style; never resolves to a real class’s name)
- Line: Name, voice, and the one thing it never does. Your students write it.

### Microcopy
It comes with a 15-minute day-one lesson for introducing it to your class.

---

## 09 · cta

**Point:** Start now: copy the prompt, or try the demo.

- Headline: **Give your class one goal.**
- Subhead: Free, open source, and yours to change.
- Primary: **Copy the setup prompt** (same behaviour, states and fallback as the hero)
- Caption: Paste it into Claude. It takes it from there.
- Secondary: or **try the live demo →**

---

## 10 · footer

- Wordmark: **My Classroom Assistant**
- Links: `Try the demo` · `GitHub ↗` · `Privacy one-pager` · `Claude for Teachers ↗`
- Line: Free and open source · MIT License
- Credit: Made by a teacher · **Matt Nupen** (→ https://mattnupen.com)
  (Fact check: the README says it "started as an experiment in my own classroom." Say no more than that. No pilot details.)
- Fine print: Sample names on this page are made up.

---

## Global microcopy

- Copy button, all instances: idle **Copy the setup prompt** · success **Copied. Now paste it into Claude.** · fallback reveals the prompt with "Your browser blocked copying. Here it is. Select it and copy."
- Image alt text:
  - slide.png: “A Monday opening slide on a classroom projector”
  - student-cards.png: “Printable progress cards, one per student, with sample names”
  - dashboard.png: “The Class Tools dashboard showing a sample class”
  - app-studio.png: “A gallery of tools the assistant can build”
- Reduced-motion: every sequence shows its final state. All text above must read correctly with
  no animation.

---

## Red-team log (applied to this draft)

**Cut or changed**
- "in about a minute" (old tools line): not in the brief. Cut.
- "Hand over the totals, never a name, unless your district cleared it": a double negative in
  seven words. Now "Hand over the totals." The data section carries the district rule in full.
- "protected there" (old online fork): vague, and close to "Anthropic handles it". Now it says only
  that the file goes in. The district line sits in the card.
- "Nothing alarming": swapped for "Nothing’s wrong." Shorter, and it doesn’t put "alarm" in a
  parent’s head.
- "24 kids" changed to "26 kids". Neutral either way. No real class is implied.
- "decides this week's move" is now "plans the move". The assistant proposes, and the teacher decides.
  The copy has to say that every single time.
- Every exclamation mark is gone except "Goal hit!".
- Buzzword sweep: no revolutionize / supercharge / unlock / seamless / leverage / AI-powered /
  empower / effortless / smart. "AI assistant" appears once, in the hero subhead.
- "problem" appears nowhere on the page.

**Fact checks against the repo and brief**
- Research packs listed (5) match `brain/evidence-packs/` exactly. "It builds a new set" for any
  other goal matches `brain/evidence-engine.md`.
- The evidence card text, strength and citation are copied from `reducing-missing-work.md`.
  Effect sizes are left out on purpose, so no outcome statistics appear on the page.
- The tool checks (one file, no internet calls, no saved student data, added to the sidebar) match the
  privacy invariants in CLAUDE.md and the teacher-app-builder skill.
- The Otter, Spark and Sage phrases are copied from `brain/persona-packs.md`. They are starter templates, not a
  named class persona, and none is presented as a real class’s choice.
- The day-one lesson is 15 minutes (`content-templates/day-one-lesson-plan.md`, per the README).
- Claude for Teachers: launched July 2026, free for verified US K-12 teachers, FERPA-aligned under a K-12
  DPA, data not used for training. The district line is included word for word in spirit, with no
  "handles FERPA" or "makes you compliant" wording.
- Offline: "no internet" and "only the total goes" match the brief.
- No pilot results, no user counts, no testimonials, no "Nolan.AI". Sample names are labelled as
  made up in both places they appear.

**10-second phone test**
Headline (7 words) + phone subhead (19 words) + one button. A teacher reading only those three
things knows what it is (an assistant for the class), what it does (works on one goal, makes
things weekly), and what to do (copy, paste into Claude).

**Open question for the art director**
- The `students` beat can be merged into `setup` if the page runs long. If so, keep the
  headline "Your class names it." as a caption on the checklist item "Name and voice: up to your class."
