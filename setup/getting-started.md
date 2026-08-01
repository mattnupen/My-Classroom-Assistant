# Getting Started

There are two tracks here, and they run on completely different clocks.

**Track 1 — Try it today.** About 30 minutes, all on fictional students. Install Cowork, let your AI set itself up, run the offline tools against a fake gradebook, and pick a challenge. Nothing you do in Track 1 touches a real kid's data, so nothing in it needs anyone's permission.

**Track 2 — Launch with students.** Days, not minutes, and mostly on your district's clock: admin sign-off, family notification, your crisis card. This is the governance track.

**Do Track 1 first.** It takes an evening, it costs nothing, and it's the only honest way to know whether you want to spend the effort Track 2 asks for. Plenty of teachers stop after Track 1 and just use the offline tools — that's a completely legitimate place to land.

---

# Track 1 — Try it today

*~30 minutes · fictional data only · no permissions needed*

## 1. Install Claude Cowork

Download and install Claude from **[claude.com/download](https://claude.com/download)**. Confirm you can open the app and that it can see folders on your computer.

**If you teach K-12 in the US, this is very likely free for you.** Anthropic verifies educators through their school email and gives them Claude at no cost — see [Claude for Teachers](https://claude.com/solutions/teachers). Verification takes a day or two, so start it before the evening you actually want to use this.

Test that Cowork works:
- Open Cowork in this `MyClassroomAssistant/` folder
- Say "hi"
- Your AI should read its instructions and respond

If you get errors, that's a Cowork issue, not a project issue — check [support.claude.com](https://support.claude.com) first.

## 2. Say "set up my classroom"

Open Cowork in this folder and type exactly that. Your AI runs a ten-minute interview instead of handing you a form:

- What you teach and what the class is like
- What one thing would be different if this semester went well — that becomes the mission, and it'll offer you the challenge deck rather than a blank page
- **The data question**, asked once, plainly: Locked-Room (the default — your gradebook only ever touches the offline apps on your laptop) or Direct (only if your district has approved Claude for student data). If you're not sure, say so; it records Locked-Room and you can change it later. See Track 2 step 2 if the question comes up with your admin.
- Whether your students help name and shape the AI, or you decide solo
- Anything it should never do in your room

**You don't have to decide everything right then.** If you want to think about the student-involvement question, say so — your AI will move on and come back to it.

It writes your answers into `my-classroom/`, and ends by *making something*: a real opening slide for your class, in the built-in projector theme. That's the point of the first session — you leave with an artifact, not a to-do list.

## 3. Do a dry run with the fictional class

The `sandbox/` folder has a fictional gradebook (`fictional-gradebook.csv`) with 24 fake students. Use it to try every tool before touching real data.

- Open `local-tools/ClassAI-dashboard.html`. This is your home base — the sidebar gets you to every other app from one place.
- From the sidebar, open **Progress Cards**. Drop in the fictional gradebook. Print sample cards.
- Open **Class Pulse**. Generate a summary, then **Download this pulse** and drop the file into `my-classroom/pulses/`.
- Open **Gradebook Analytics**. Drop in the same gradebook. Sort by tier and skim the per-student view.
- Open **Parent Messages**. Load the sample templates. Generate messages.
- Open **Badges**. Start a new state file. Award some badges. Print certificates.
- Open **Random Groups**. Generate groups with the state file.

Then go back to Cowork and say **"run Monday."** Your AI reads the pulse you just dropped in, updates your dashboard, and proposes the week's moves — each one tagged with the research it draws from. That's the whole loop, running on fictional students.

After the dry run, you should have a real feel for what the project does — and you'll catch any tool that doesn't fit your style before students are involved.

You'll also have a `class-state.json` file from the badges/groups session. **Move it out of the project folder** to your Documents or Drive, where you'll keep it for your real class.

## 4. Meet the Challenge Deck

`brain/challenge-deck/` has five cards, one per classroom problem: missing work, attendance, participation, transitions, reading comprehension. Each card comes with its research, a weekly play pattern, a metric you can actually count, and a season length that ends.

Ask your AI to **"pitch me the challenge deck"** and it'll give you each card in a line. Pick one, or put two or three on a ballot and let the class vote (`content-templates/student-voting-form.md`). Picking a card is the whole setup — the mission, the moves, and the scoreboard come with it.

---

# Track 2 — Launch with students

*Days, on your district's clock · this is the governance track*

**Your AI project-manages this.** Ask it to **"run the launch checklist"** — it will draft the admin pitch and the parent letter with your details filled in, and track what's done in `my-classroom/`. The full checklist lives in `setup/permissions/checklist.md`; print it and tape it to your wall.

## 1. Make sure this fits your situation

Before you commit any more time, check the basics:

- **Devices.** The offline tools in `local-tools/` run in any modern browser on any device — Mac, Windows, **and Chromebooks**. It's the AI side that's pickier: Cowork is a desktop app for Mac or Windows. So a Chromebook classroom can use every tool in this project; you'd just need a Mac or Windows machine for the Cowork half. Cowork's platform support changes — check [support.claude.com](https://support.claude.com) before you rule anything out on this basis.
- **You teach at least one class regularly.** This works best in a class you see daily or every other day for at least a unit (~6 weeks).
- **Your school allows AI tools.** Some districts have policies banning AI in instruction. Check before you go further. If unsure, ask your tech coordinator.
- **You have a gradebook you can export.** Any system that lets you export a `.csv` or `.xlsx` (PowerSchool, Infinite Campus, Skyward, Canvas, Synergy, etc.) works.
- **You can spend 15–30 minutes a day on this for the duration of your experiment.** Some days less, Sundays more.
- **You're okay with this being an experiment.** Your students will know they're part of something new. That's actually a feature — but be ready for things to need adjustment.

If any of those is a no, this might not be the right project for you right now. That's totally fine — and the offline tools are still yours to use.

## 2. Get permission from your admin

This is the biggest barrier for most teachers. Don't skip it.

Open `setup/permissions/admin-pitch.md` — it's a one-page summary you can email to your principal or print and hand them. It explains what the project is, how student data is handled, what kids will and won't experience, and what you're asking permission for.

If your admin says yes — great, move on.

If they want more detail, hand them `setup/permissions/privacy-explainer.md`. That's the longer version that covers FERPA, district vendor agreements, and exactly how this project keeps student data out of the AI.

If they say no — respect that. Some districts have legitimate concerns about AI in classrooms. You can try again next year, or with a stripped-down version (just the local tools, no Claude integration).

**A note on data modes.** Everything above describes **Locked-Room mode** — the default, and the one you're in unless you deliberately change it. Student data stays on your laptop and the AI works from name-free summaries. You don't have to do anything to get this.

Some districts, having reviewed [Anthropic's Claude for Teachers data terms](https://support.claude.com/en/articles/15926041-claude-for-teachers-your-data-and-our-terms), approve teachers to hand gradebook exports to the AI directly — it saves the summarize-and-paste step. If that conversation comes up with your admin, `setup/permissions/data-mode-record.md` is the one-page record to fill in and keep on file, and your AI will set the mode when you tell it the approval exists. Don't go looking for this. Locked-Room is the right default for almost everyone, and nothing in this guide assumes you leave it.

## 3. Notify families

Some districts require active consent for any AI involvement; others only require notification. Check with your admin.

Either way, `setup/permissions/parent-letter.md` is a template you can adapt. It explains what's happening, what the AI does and doesn't do, what kids will see, and how families can opt out. Keep it brief, send it home in the first week.

If parents have questions, route them to you — not to the AI.

## 4. Set up your crisis card

This is the most important file in the whole project. Open `setup/crisis-card.md` and fill it in.

It's a one-page document with:
- Your school counselor's name and contact
- Your admin's name and contact
- Crisis hotline numbers (988, local mental health)
- Your district's mandated reporter protocol

You keep this card on your desk, in your bag, somewhere visible. **You do not paste it into Cowork.** The AI does not need to know any of this — the rule is that anything the AI flags as crisis-related becomes your problem to act on, and this card is what you act with.

## 5. Plan student involvement

If you chose to have students help shape the AI (Option A in `my-classroom/your-classroom-ai.md`), now's the time to plan the session.

Typically:
- **Week 0 or Week 1:** explain the project to students (a 10-minute mini-lesson — the script is in `content-templates/day-one-lesson-plan.md`)
- **Same day:** open a vote (Google Form or anonymous slips) for the AI's name and one or two personality traits
- **Within a few days:** narrow the top finalists, then a runoff vote
- **Same week:** your AI fills in the persona with what they chose
- **Next session in Cowork:** your AI introduces itself in its new voice

A template for the student voting form is in `content-templates/student-voting-form.md`.

## 6. Launch

You're ready. On launch day:

- Tell students what they're going to see ("you'll get cards from [AI name] this week — they're not graded, they're a tool to help you stay on top of things")
- Hand out the first round of missing-work cards or progress sheets
- Run the first few days as gently as possible — watch for confusion or pushback
- After Week 1, drop that Friday's pulse into `my-classroom/pulses/`, say "run Monday," and tell your AI what you noticed that the numbers don't show

If something breaks early, that's normal. Tell your AI what felt wrong and it will adjust the relevant file. Most teachers find the rhythm in 2–3 weeks.

---

## When you're stuck

- **Tool not working?** Check that you have internet (the tools download a small library on first use). Try a different browser.
- **AI sounds off?** Tell it so — or read `my-classroom/your-classroom-ai.md` and tighten the voice description.
- **Workflow feels heavy?** Read `brain/weekly-rhythm.md`'s "skip everything minimum" section.
- **Not sure anything's set up right?** Say **"check my setup"** in Cowork. Your AI runs a doctor check and tells you plainly what's missing.
- **Something more serious?** Take a week off. The project will be here when you come back.
