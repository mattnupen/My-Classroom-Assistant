<div align="center">

# My Classroom Assistant

### Give your class its own AI — one goal, grounded in research, with student names kept on your computer by default.

**[🌊 myclassroomassistant.com →](https://myclassroomassistant.com)** · **[▶️ Demo video →](https://youtu.be/elIm51c1AZQ)**

</div>

It drafts your slides, your parent messages, and your encouragement cards — and adapts as your class changes. It runs inside **Claude Cowork**, which is free for verified US K-12 teachers through [Claude for Teachers](https://claude.com/solutions/teachers).

## Try it in 90 seconds — no setup, no account

1. Open **[Class Tools](https://myclassroomassistant.com/local-tools/ClassAI-dashboard.html)**, the page with the offline apps.
2. Click **Progress Cards** → click **Load demo class**. Print a card.
3. Click **Class Pulse** → **Load demo class** → **Generate**. That name-free summary is all the AI sees (on the default Offline option).

Want the long view? **Demo Semester** (same sidebar) shows a fictional class running this for 16 weeks — chats, slump, turnaround, final report.

## Install it in one sentence

Download this folder ([ZIP](https://github.com/mattnupen/My-Classroom-Assistant/archive/refs/heads/main.zip)), open it in Claude Cowork, and type:

> **"Set up my classroom."**

Your AI explains in a few lines how it works, then asks quick multiple-choice questions: your class, your one challenge and what it looks like in your room, what you have to work with, whether you'll share student names, and whether you or your students shape its personality. Then it gives you one thing to try this week, on one page: what to do each day and what to say. The full walkthrough, including everything to do before real students are involved, is in [`setup/getting-started.md`](setup/getting-started.md).

## How it handles student names and grades

- **The Offline option (default):** your gradebook and roster only ever go into the offline apps in [`local-tools/`](local-tools/), which run in your browser and send nothing anywhere. Only class totals reach the AI. The one-page version for your principal: [`setup/permissions/privacy-one-pager.html`](setup/permissions/privacy-one-pager.html).
- **The Claude for Teachers option:** only if you use Claude for Teachers and your district has given permission to share student information with it. Then you can share it in the chat or the inbox folder, and no student's name goes into your classroom's lasting notes or dashboards, or on anything shown to the class.

On the default Offline option, one rule governs everything: **if it has a name, it stays in your browser; if it's class totals, it can go to Claude.**

## What's inside

- **[`brain/challenge-deck/`](brain/challenge-deck/)** — five ready-made class challenges (missing work, attendance, participation, transitions, reading), each with the research behind it, a number to watch, and ideas to try one at a time, all year.
- **[`local-tools/`](local-tools/)** — **Class Tools**, the offline apps: progress cards, parent messages, gradebook analytics, Class Pulse, badges, groups, and more. What each one is for: [`setup/class-tools-guide.md`](setup/class-tools-guide.md).
- **An app builder** — ask Claude for an app your class needs and it builds one that runs on your computer and never sends anything anywhere. (Add it once: [`docs/teacher-app-builder.md`](docs/teacher-app-builder.md))
- **[`brain/`](brain/)** — the research, personas, safety rules, and weekly routine your AI runs on.
- **`my-classroom/`** — created at setup. *Yours.* Your AI's persona, your class's story, your apps. Updates never touch it; back it up by copying that one folder.

Where this came from, how the loop works, what every app and folder does: [`docs/about.md`](docs/about.md). Presenting to colleagues or at PD? [`TUTORIAL.md`](TUTORIAL.md) is the demo script.

## License

Released under the [MIT License](LICENSE) — free to use, adapt, and share, in your classroom or anyone else's.
