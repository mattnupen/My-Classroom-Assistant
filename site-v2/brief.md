# Brief — My Classroom Assistant homepage v2

## Who it's for

A tech-savvy K-12 teacher who saw this on social media. They'll give the page ~10 seconds
before deciding to scroll. They don't need the details — they need to understand **what it
does** and **how they'd use it**, and feel "I want that in my room."

## What it is (product truth — don't invent beyond this)

A free, open-source, **semi-autonomous AI agent** a teacher assigns to **one classroom
challenge** (attendance, missing work, participation…). It runs in **Claude Cowork** in the
Claude desktop app (the setup prompt only works there, because it downloads the project).

- It works **continuously on improving that challenge's numbers**, using class totals and
  student feedback, and it **evaluates and adjusts its own strategies** week to week.
- The teacher is always between the AI and the students. The AI works through the teacher,
  sending slides and other materials. The teacher can give it a **real $ budget** for
  in-class materials (prizes, a party); it plans the spending, the teacher buys and runs it.
- Why a teacher wants it: handing one challenge to the AI frees the teacher to focus on
  everything else while the AI keeps grinding on it.
- It's also a learning experiment: teachers and students see agentic AI beyond a chatbot,
  working on a real problem in their own room. Inspired by Anthropic's Project Vend; keep
  the semi-autonomous / Project Vend framing up front.

- The teacher (or the class, by vote) gives it **one goal** for the year — more work turned
  in, better attendance, more voices in the room, feeling heard, grades.
- It grounds itself in **evidence-based research for that specific goal** (it ships research
  packs for missing work, attendance, participation, calmer transitions and reading
  comprehension, and builds a new one for any other goal).
- Every week it reads how the class is doing plus teacher and student feedback, and
  **develops its own plan** — then proposes the week's move.
- It acts in the real world **through the teacher**: Monday slides, messages home, printable
  progress cards, badges, class events and celebrations. It never reaches students directly.
  The teacher reviews, changes what they want, and runs it.
- **It builds its own tools.** Need a tool that doesn't exist (a seating chart that keeps two
  kids apart, a reading tracker)? It writes a working single-file app that runs offline,
  privacy-checks it, and adds it to the sidebar.
- Setup is a ~10-minute conversation: it interviews the teacher (what they teach, what
  would be different if the year went well, whether students name it and vote on the goal).
- Students can help name it and shape its personality.

## Student data — two safe paths (be exact)

**What goes where.** Two kinds of input, handled differently:

- **Course data — always straight to the assistant:** the course/LMS export (units,
  assignments, due dates) and the teacher's own notes and feedback about the class.
- **Student data — never straight to the AI unless the teacher elects the online path:**
  the gradebook (names, grades) and student feedback (comments, often with names).
  By default it goes to the **offline apps**, which process and aggregate it on the laptop
  ("8 students behind on Unit 3"); only those aggregates go to the assistant.

**Why two paths:** it comes down to whether the teacher wants student data going to
Anthropic. **The assistant built the offline apps** that do this processing, and it builds
more apps whenever the teacher needs one.

1. **Online — Claude for Teachers.** Anthropic's offering, launched July 2026, free for
   verified US K-12 teachers. FERPA-aligned protections under a K-12 data processing
   addendum; data isn't used to train models. **Whether a teacher may upload identifiable
   student data is the district's decision, not Anthropic's** — the page must say so.
   Never claim Anthropic "handles FERPA" or "makes you compliant". Link:
   https://www.anthropic.com/news/claude-for-teachers
2. **Offline — on your own computer.** Free browser tools run locally with no internet and
   turn the gradebook into totals ("8 students behind on Unit 3"). Only that aggregate goes
   to the assistant. Names never leave the laptop.

Either way: same assistant, same materials, same weekly loop.

## Hard content rules

- The H1 uses "classroom problem" (the teacher chose it). Elsewhere "challenge" or "goal" are fine.
- **No pilot results, no statistics about outcomes, no "Nolan.AI"**, no named class persona.
  No testimonials or quotes attributed to real people. No invented numbers of users.
- Any student names shown must be obviously fictional sample data, and only ever shown in
  the context of being removed/aggregated. Never imply real student data.
- Don't imitate or name other companies' branding in the page itself.
- Plain, warm, specific language. No buzzwords ("revolutionize", "supercharge",
  "unlock", "seamless", "leverage", "AI-powered"). Write complete sentences with varied
  length. Avoid clipped fragment strings ("Pick one goal. It keeps at it.") — they read as
  AI-written ad copy. Say what it is before being clever. Avoid "move" as a noun; say
  "strategy" or "next step". Say "Claude Cowork", not just "Claude", where setup is concerned.

## Required elements

- Name: **My Classroom Assistant**.
- Primary CTA: a **copy-the-prompt button** (klemm.build pattern). Click copies exactly:
  `Set up My Classroom Assistant from https://github.com/mattnupen/My-Classroom-Assistant — download it, then interview me about my class and build my assistant.`
  With a caption like "Copy the prompt. Paste it into Claude." and a "Show the prompt"
  disclosure. Clipboard failure must fall back to revealing the prompt.
- Secondary CTA: **Try the live demo** → `{{ROOT}}local-tools/ClassAI-dashboard.html`
  (no install).
- Links: GitHub `https://github.com/mattnupen/My-Classroom-Assistant`, privacy one-pager
  `{{ROOT}}setup/permissions/privacy-one-pager.html`, `https://mattnupen.com`. MIT license.

## What the teacher already approved (keep the spirit)

- Headline (chosen Sept 2026): **"Hand one classroom problem to an AI, and it keeps working on
  it all year."** No eyebrow above it — the H1 must explain the product on its own.
- A scroll-driven set-piece captioned **"This is your assistant. It helps you do things."**
  where the things it makes assemble around the words. The teacher loved this — keep it as
  a centrepiece, make it better.
- Every section should have a scroll interaction that **shows** its one point in simple
  language, rather than telling it.
- The setup-as-a-conversation idea, the weekly loop with the teacher as the gate, and the
  "names dissolve, counts survive" privacy moment all landed well.
- Fun, cheerful, simple. The teacher rejected: pill-button pickers, a dark-oval "loop"
  diagram that didn't say what moves, and anything that felt like generic SaaS.

## Must work

Desktop 1440, laptop 1280, tablet 834, phone 390. Reduced motion. No horizontal scroll.
No console errors. Keyboard focus visible. Text contrast AA. Page weight sensible.
