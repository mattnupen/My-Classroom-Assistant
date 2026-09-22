<div align="center">

# My Classroom Assistant

### Give your class its own AI — one goal, grounded in research, with student data locked on your laptop.

**[🌊 myclassroomassistant.com →](https://myclassroomassistant.com)** · **[▶️ Demo video →](https://youtu.be/elIm51c1AZQ)**

</div>

It drafts your slides, your parent messages, and your encouragement cards — and adapts as your class changes. It runs inside **Claude Cowork**, which is free for verified US K-12 teachers through [Claude for Teachers](https://claude.com/solutions/teachers).

## Try it in 90 seconds — no setup, no account

1. Open the **[live dashboard](https://myclassroomassistant.com/local-tools/ClassAI-dashboard.html)**.
2. Click **Progress Cards** → "Load the fictional demo class." Print a card.
3. Click **Class Pulse** → generate a summary. That name-free aggregate is *all the AI ever sees.*

Want the long view? **Demo Semester** (same sidebar) shows a fictional class running this for 16 weeks — chats, slump, turnaround, final report.

## Install it in one sentence

Download this folder ([ZIP](https://github.com/mattnupen/My-Classroom-Assistant/archive/refs/heads/main.zip)), open it in Claude Cowork, and type:

> **"Set up my classroom."**

Your AI interviews you for ten minutes — your class, your goal, your data choice — and ends by making something real you can use tomorrow. The full walkthrough, including everything to do before real students are involved, is in [`setup/getting-started.md`](setup/getting-started.md).

## How it handles student data

**Private by default, direct by permission.**

- **Locked-Room mode (default):** your gradebook and roster only ever touch the offline apps in [`local-tools/`](local-tools/) — they run in your browser with the wifi off. Only a name-free summary crosses to the AI. The one-page version for your principal: [`setup/permissions/privacy-one-pager.html`](setup/permissions/privacy-one-pager.html).
- **Direct mode (opt-in):** if your district has approved Claude for student data, the AI can work with your exports directly. You record the approval once, on one page, and even then everything the AI *keeps or displays* stays aggregate-only.

And the fifth rule that governs both: **if it touches a name, it opens in your browser; if it's aggregate-only, it can live in Cowork.**

## What's inside

- **[`brain/challenge-deck/`](brain/challenge-deck/)** — five ready-made class challenges (missing work, attendance, participation, transitions, reading), each pre-loaded with the research behind it, a weekly play pattern, and a season scoreboard.
- **[`local-tools/`](local-tools/)** — the offline apps: progress cards, parent messages, gradebook analytics, class pulse, badges, groups, and more.
- **A skill that builds new apps** — single offline files, privacy-checked automatically. ([`docs/teacher-app-builder.md`](docs/teacher-app-builder.md))
- **[`brain/`](brain/)** — the evidence library, personas, safety rules, and weekly rhythm your AI runs on.
- **`my-classroom/`** — created at setup. *Yours.* Your AI's persona, your class's story, your apps. Updates never touch it; back it up by copying that one folder.

Where this came from, how the loop works, what every app and folder does: [`docs/about.md`](docs/about.md). Presenting to colleagues or at PD? [`TUTORIAL.md`](TUTORIAL.md) is the demo script.

## License

Released under the [MIT License](LICENSE) — free to use, adapt, and share, in your classroom or anyone else's.
