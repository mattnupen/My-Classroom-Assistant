# Demo Script: Presenting My Classroom Assistant

*This is the walkthrough for **showing** the project — a PD session, a colleague at lunch, a skeptical admin. It assumes an audience.*

*Setting it up for your own classroom is a different and much shorter thing: download the folder, open it in Cowork, say "set up my classroom." That's the [README](README.md). The full walkthrough is [`setup/getting-started.md`](setup/getting-started.md).*

This is a hands-on walkthrough of what this project does and how to drive it. Each section below is a self-contained demo with a prompt you can copy and paste straight into Claude Cowork. Run them in order the first time — they build on each other — or jump to whichever one you want to show.

If you're presenting this live, the four demos map to the four things people usually want to know: *Does it understand my curriculum? Can it read my class? Can it produce something I'd actually hand a kid? And what happens when I need a tool that doesn't exist yet?*

## Before you start

You need two things open:

1. **Claude Cowork**, with this project folder selected. That's where you type the prompts.
2. **Class Tools** — the page with the offline apps. Open the `local-tools` folder and double-click `ClassAI-dashboard`. The sidebar gets you to every app.

A note on the demo files. Two of these demos use files you supply:

- **A Canvas curriculum export (`.imscc`)** for Demo 1. This is curriculum, not student data, so it's safe to drop into the project folder.
- **A gradebook (`.xlsx` or `.csv`)** for Demos 2 and 3. This *is* student data. **Keep it out of the project folder** — leave it in Downloads, on your desktop, wherever. You only ever feed it to the offline apps, never to Claude. (To try it without your own file, every app has a **Load demo class** button with 24 made-up students.)

## The one idea behind all four demos

By default, the whole project runs on a single rule: **Claude never sees student names or grades.** Not names, not individual grades, not per-kid missing-work lists. That guarantee doesn't come from Claude promising to be careful — it comes from *where the data lives*. Student data only ever goes into the offline apps that run on your laptop and send nothing anywhere. Claude only sees class totals ("3 students behind on Unit 3") or content with no student information in it at all.

That's **the Offline option** — the default, what every demo below shows, and what you should present unless someone asks. There is also **the Claude for Teachers option**: if a teacher uses Claude for Teachers and their district has given permission, the teacher can share student information in the chat or drop files in the inbox folder. If it comes up in the room, the honest one-liner is: *"a district can give permission for that, the teacher records it on one page, and even then no student's name goes into the classroom's lasting notes or dashboards, or on anything shown to the class."* Details live in `setup/permissions/privacy-explainer.md`.

That's why the demos split into two kinds of step. Watch for these labels:

> 💬 **Cowork prompt** — something you type to Claude in chat. No student names or grades involved.
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

**What it shows:** How Claude "sees" your class without ever seeing your class. You run your gradebook through an offline app that boils it down to class totals, paste that summary into Cowork, and Claude reasons about where the class stands and what to do next.

> 🖥️ **Offline app step:**

1. From the Class Tools sidebar, open **Class Pulse**.
2. Drag in your gradebook (`.xlsx` or `.csv`). Everything is read in your browser — nothing uploads.
3. Click **Generate**. (The defaults are fine. **Optional settings** lets you change where the lines fall: Strong = nothing missing, Steady = 1–2, Struggling = 3 or more.)
4. Click **Copy** next to "This week's summary." That copied text is class totals only — counts and most-missed assignments, **zero names, zero individual grades.**

(Optional: click **Download comparison file**. Drop it back into Class Pulse next week and the summary will show what changed, like "Strong: 6 → 8 (+2)." Save it somewhere *outside* this folder.)

Using **Load demo class** instead of your own gradebook? The summary is marked DEMO CLASS, so your AI will talk it through but won't save practice numbers to your class page or Class Tools. That's on purpose. Leave off the last two lines of the prompt.

> 💬 **Cowork prompt** — paste this, then paste the copied summary where shown:

```
Here's this week's Class Pulse summary (class totals only, no names):

[paste the summary you copied from Class Pulse here]

Read this against our class goal. Tell me:
1. In plain language, where is the class right now?
2. What's the single most-missed assignment, and what does that suggest?
3. One concrete thing I could try this week to push toward the goal — something
   you can help me produce (a slide, a parent message, an opener).
Then update my class page and the cards on Class Tools with this week's
numbers, and show me the change before you save it.
```

**What to expect:** Claude reads the class totals, names the sticking point, and suggests one strategy tied to your goal, saying how strong the research behind it is. With a real gradebook, when it updates the cards on Class Tools, it edits `my-classroom/dashboard-data.js` (never the page itself), and it writes *only* class totals ("4 students behind on the Theme Essay"), never names. It'll show you the change before saving.

**Why this is the heart of the experiment:** This is the feedback loop. The offline tool counts, Claude reads the count, and every two weeks or so you check together whether the one strategy you're trying is working: keep it, adjust it, or switch.

---

## Demo 3 — Make missing-work cards for students

**What it shows:** The cleanest example of the privacy handoff. The *card message* — the encouraging note every kid reads — is something Claude writes, because it has no student data in it. The *cards themselves* — one per student, with names and individual missing assignments — are built entirely in an offline app. Claude writes the words; your laptop merges the names.

> 💬 **Cowork prompt** — paste this to get the card copy in your AI's voice:

```
I'm about to print Missing Work cards for students using the Progress Cards app.
That app takes three pieces of text and mail-merges them onto each kid's card
(it adds the names and their missing-assignment list locally — you won't see those).

Write me those three pieces, in our AI's voice, following our teaching
principles (strengths-first, specific, never shaming). My late-work policy
is: [your policy, e.g., "half credit until the end of the unit"].
1. Greeting — the top line. You can use {name} as a placeholder.
2. Student message — the body. Cover my late-work policy, one small first
   step, and how to check items off.
3. Footer — one small line about how to get help.

Keep it warm and short. Give me two options for each so I can pick.
```

> 🖥️ **Offline app step:**

1. From the Class Tools sidebar, open **Progress Cards**.
2. Drag in your gradebook (`.xlsx` or `.csv`).
3. Choose **Missing Work** as the card type.
4. Paste Claude's greeting, message, and footer into the "Personalize the message" fields.
5. Print. You get two-per-page cards, one per student, each showing only what that kid owes — cut them and hand them out at the door.

**What to expect:** Claude gives you polished, on-voice card copy and never asks for — or sees — a single student name. The names, periods, and per-student missing lists are introduced only inside the offline app, on your machine.

**The teaching point for your demo:** Pause here and say it out loud — "Notice Claude wrote the message but never touched the roster. The part that names kids happened entirely on my laptop." That's the architecture in one move.

---

## Demo 4 — Build a brand-new offline app

**What it shows:** When the included offline apps don't cover something you need — and it involves student data — you don't file a feature request. You ask your AI to build the tool, and it builds one app that runs on your computer and follows the same privacy rules as the others, every time.

**Setup:** This uses the app builder, an add-on that teaches Claude to build classroom apps safely. If Claude says it isn't available, add the app builder first (`docs/teacher-app-builder.md`), then come back.

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

**What to expect:** Claude asks a question or two, each with an example answer, then says back what it will build and waits for your yes. It builds one app that runs on your computer, checks quietly that it never sends anything off your computer, and adds it to Class Tools in the sidebar under **Your apps**. Click **Try it with a made-up class** first. If Claude says it needs an add-on first, follow `docs/teacher-app-builder.md`, then come back.

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

**Why this matters for the pitch:** The privacy boundary isn't a wall that limits what you can build — it's the thing that lets you safely build *anything*. The app builder follows the rules so you don't have to think about them.

---

## Putting it together: the 30-second version of the story

If someone asks "what is this thing," the four demos answer in sequence:

1. It knows your curriculum (Demo 1).
2. It reads your class without ever seeing your kids (Demo 2).
3. It produces real classroom materials, with the privacy line drawn right down the middle of the task (Demo 3).
4. And when you need something new, it builds you a safe tool on the spot (Demo 4).

Underneath all of it: one challenge all year, one strategy at a time. The AI suggests, you decide, the class tries it, the class totals come back, and every two weeks or so you decide together whether to keep, adjust, or switch. That's the loop the whole project exists to test.
