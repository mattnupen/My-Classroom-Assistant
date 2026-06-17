# Tutorial: Four Demos of MyClassroomAIbot

This is a hands-on walkthrough of what this project does and how to drive it. Each section below is a self-contained demo with a prompt you can copy and paste straight into Claude Cowork. Run them in order the first time — they build on each other — or jump to whichever one you want to show.

If you're presenting this live, the four demos map to the four things people usually want to know: *Does it understand my curriculum? Can it read my class? Can it produce something I'd actually hand a kid? And what happens when I need a tool that doesn't exist yet?*

## Before you start

You need two things open:

1. **Claude Cowork**, with this project folder selected. That's where you type the prompts.
2. **Class Tools** — double-click `local-tools/ClassAI-dashboard.html`. The sidebar in there gets you to every offline app.

A note on the demo files. Two of these demos use files you supply:

- **A Canvas curriculum export (`.imscc`)** for Demo 1. This is curriculum, not student data, so it's safe to drop into the project folder.
- **A gradebook (`.xlsx` or `.csv`)** for Demos 2 and 3. This *is* student data. **Keep it out of the project folder** — leave it in Downloads, on your desktop, wherever. You only ever feed it to the offline apps, never to Claude. (If you just want to try the flow without your own file, the included `sandbox/fictional-gradebook.csv` works everywhere a gradebook is asked for.)

## The one idea behind all four demos

The whole project runs on a single rule: **Claude never sees student-identifying data.** Not names, not individual grades, not per-kid missing-work lists. That guarantee doesn't come from Claude promising to be careful — it comes from *where the data lives*. Student data only ever goes into the offline HTML apps that run on your laptop and never touch the internet. Claude only ever sees aggregates ("3 students behind on Unit 3") or content that has no student data in it at all.

That's why the demos split into two kinds of step. Watch for these labels:

> 💬 **Cowork prompt** — something you type to Claude in chat. Safe by design: no student data involved.
>
> 🖥️ **Offline app step** — something you do in one of the browser apps on your own machine. This is where real student data gets handled, with Claude nowhere near it.

A good demo makes that handoff visible. The interesting moment isn't "the AI did a thing" — it's "the AI did its part, the offline tool did the part that touches kids, and the two never overlapped."

---

## Demo 1 — Design a new activity from your curriculum

**What it shows:** Claude can read your actual course — a Canvas export of your units, pages, and assignments — and build a brand-new student activity that fits a specific lesson, in your AI's voice, using research-backed teaching moves. No student data is involved; this is pure curriculum.

**Setup:**

1. In Canvas, export the course (or just one module) as an IMS Common Cartridge — that's the `.imscc` file. (Course → Settings → Export Course Content → Course, or use a single module export.)
2. Drop the `.imscc` file directly into this project folder.
3. Start a **fresh Cowork session** in this folder so Claude picks up the new file and re-reads its instructions.

> 💬 **Cowork prompt** — paste this, then edit the bracketed parts:

```
I just added a Canvas export to this folder: [your-file-name.imscc]. It's an
IMS Common Cartridge of my course — curriculum only, no student data.

Please unpack it and read it, then design ONE new student activity for this
unit/lesson: [name the unit or topic, e.g. "the Theme Essay unit" or
"Chapter 4-6 reading"].

Constraints:
- Stay in our AI's voice and follow our teaching-principles.md defaults.
- The activity should take about [20] minutes of class time.
- It should ladder up to our class mission/goal.
- Give me: a one-line objective, the student-facing instructions, and a quick
  way for me to check understanding at the end.

Before you write it, tell me which lesson/standard you're anchoring to and why,
so I can redirect you if I had a different one in mind.
```

**What to expect:** Claude unzips the cartridge, reads the course structure, and comes back first with *which* part of the curriculum it's targeting and the teaching rationale (it asks before it writes — that's the "propose, you decide" loop). Once you confirm, it produces the activity. Ask it to "make this into a slide" or "lay it out as a printable handout" and it'll apply your classroom display theme automatically.

**Why this is safe:** A `.imscc` is your course content — readings, assignment titles, page text. There are no student records in it, which is exactly why it's fine to put in the folder and hand to Claude. (A gradebook is the opposite, which is what Demo 2 is about.)

---

## Demo 2 — Read the state of your class

**What it shows:** How Claude "sees" your class without ever seeing your class. You run your gradebook through an offline app that strips it down to aggregate counts, paste that summary into Cowork, and Claude reasons about where the class stands and what to do next.

> 🖥️ **Offline app step:**

1. From the Dashboard sidebar, open **Class Pulse**.
2. Drag in your gradebook (`.xlsx` or `.csv`). Everything is read in your browser — nothing uploads.
3. Set the tier thresholds if you want (defaults: Strong = 0 missing, Steady = up to 2, Struggling = 3+).
4. Click **Copy** under "Structured summary." That copied text is aggregate-only — tier counts and most-missed assignments, **zero names, zero individual grades.**

(Optional: download the snapshot JSON it offers. Drop it back into Class Pulse next week and the summary will show week-over-week movement like "Strong: 6 → 8 (+2)." Save it somewhere *outside* this folder.)

> 💬 **Cowork prompt** — paste this, then paste the copied summary where shown:

```
Here's this week's Class Pulse summary (aggregate only, no student data):

[paste the structured summary you copied from Class Pulse here]

Read this against our class goal. Tell me:
1. In plain language, where is the class right now?
2. What's the single most-missed assignment, and what does that suggest?
3. One concrete move I could make this week to push toward the goal — something
   you can help me produce (a slide, a parent message, an opener).
Then update the goal cards on the dashboard to reflect this week's numbers, and
show me the change before you save it.
```

**What to expect:** Claude interprets the aggregate, names the bottleneck, and proposes a next action tied to your goal. When it offers to update the dashboard cards, it edits `ClassAI-dashboard.html` — and per the project rules it writes *only* aggregate text ("4 students behind on the Theme Essay"), never names. It'll show you the change before saving.

**Why this is the heart of the experiment:** This is the feedback loop. The offline tool measures the class, Claude reads the measurement, Claude adjusts what it proposes. Run it weekly and you can actually watch whether the AI's actions move the numbers.

---

## Demo 3 — Make missing-work cards for students

**What it shows:** The cleanest example of the privacy handoff. The *card message* — the encouraging note every kid reads — is something Claude writes, because it has no student data in it. The *cards themselves* — one per student, with names and individual missing assignments — are built entirely in an offline app. Claude writes the words; your laptop merges the names.

> 💬 **Cowork prompt** — paste this to get the card copy in your AI's voice:

```
I'm about to print Missing Work cards for students using the Student Cards app.
That app takes three pieces of text and mail-merges them onto each kid's card
(it adds the names and their missing-assignment list locally — you won't see those).

Write me those three pieces, in our AI's voice, following our teaching
principles (strengths-first, specific, never shaming, "this can still earn full
credit" framing):
1. Greeting — the top line. You can use {name} as a placeholder.
2. Student message — the body. Cover that anything on the list can still earn
   full credit through the end of the unit, and how to check items off.
3. Footer — one small line about how to get help.

Keep it warm and short. Give me two options for each so I can pick.
```

> 🖥️ **Offline app step:**

1. From the Dashboard sidebar, open **Student Cards**.
2. Drag in your gradebook (`.xlsx` or `.csv`).
3. Choose **Missing Work** as the card type.
4. Paste Claude's greeting, message, and footer into the "Personalize the message" fields.
5. Print. You get two-per-page cards, one per student, each showing only what that kid owes — cut them and hand them out at the door.

**What to expect:** Claude gives you polished, on-voice card copy and never asks for — or sees — a single student name. The names, periods, and per-student missing lists are introduced only inside the offline app, on your machine.

**The teaching point for your demo:** Pause here and say it out loud — "Notice Claude wrote the message but never touched the roster. The part that names kids happened entirely on my laptop." That's the architecture in one move.

---

## Demo 4 — Build a brand-new offline app

**What it shows:** When the seven built-in apps don't cover something you need — and it involves student data — you don't file a feature request. You ask your AI to build the tool, and it generates a single offline HTML app that's safe by construction.

**Setup:** This uses the **teacher-app-builder** skill. If it's installed (it should be — it ships in `teacher-app-builder-skill-upload.zip` and the install steps are in `docs/teacher-app-builder.md`), the prompt below will trigger it. If Claude says it isn't available, install it first, then come back.

> 💬 **Cowork prompt** — here's a realistic example; swap in your own problem:

```
Build me a new offline tool. Here's the problem:

I cold-call during discussion and I worry I'm unconsciously calling on the same
few kids. I want a tool where I drop in my roster, and it gives me one random
student at a time to call on, keeps track of who's already been called this
session so nobody gets picked twice, and shows me a simple tally at the end so I
can see the spread. It needs to use my real roster, so it has to stay offline.

Walk me through whatever questions you need, then build it.
```

**What to expect:** The skill asks a few short questions, generates a single `.html` file under `local-tools/`, and runs an automatic privacy check before saving — it will refuse to ship anything that makes network calls, stores your roster in the browser, or saves student data into the project folder. When it's done, the new tool is registered in the Dashboard sidebar automatically (Claude edits `_nav.js`), so it shows up next to the others.

**A second example — a one-page parent-conference sheet.** This one's worth showing because the result is something a parent walks away holding. Notice the prompt is just a teacher describing a problem in plain words — you don't need to know how it gets built:

```
Build me a tool that helps me get ready for parent conferences.

Here's my problem: when I sit down with a parent I want one page I can talk
from, and I'd like to hand that same page to them to take home. Right now I make
these by hand for every kid and it eats my whole prep period.

I'm picturing this: it takes my gradebook, I pick a student, and it makes a
one-page sheet for that kid. It'd be great if the page showed a simple graph of
their grades so the parent can see how things are going at a glance, listed
anything that's missing, and had an empty box at the bottom where the parent and
I can write notes by hand during the meeting. Then I print it.

It uses real student info, so it needs to stay on my computer.
```

When Claude builds this, the graph, the missing-work list, and the student's name all get assembled inside the offline app on your machine — the same privacy line as every other tool. You pick the student, it draws the chart, you print, you hand it across the table.

**Other problems worth demoing** (each one needs student data, so each one is a legitimate offline-app build):

- A conferring-notes tracker: pick a student, jot a quick note, see who you haven't checked in with lately.
- A reading-group builder that splits the roster by a level column you paste in.
- A "warm welcome" door tool that surfaces one specific thing to greet each kid about.

**Why this matters for the pitch:** The privacy boundary isn't a wall that limits what you can build — it's the thing that lets you safely build *anything*. The skill enforces the rules so you don't have to think about them.

---

## Putting it together: the 30-second version of the story

If someone asks "what is this thing," the four demos answer in sequence:

1. It knows your curriculum (Demo 1).
2. It reads your class without ever seeing your kids (Demo 2).
3. It produces real classroom materials, with the privacy line drawn right down the middle of the task (Demo 3).
4. And when you need something new, it builds you a safe tool on the spot (Demo 4).

Underneath all of it: the AI proposes, you decide, the class moves, the aggregates come back, the AI adjusts. That's the loop the whole project exists to test.
