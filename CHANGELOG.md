# What's New

*Written for teachers, not developers. How to read version numbers: a **patch** (2.0.x) means fixes — nothing for you to do. A **minor** (2.x.0) adds things — new apps, new cards — without changing anything in your room. A **major** (x.0.0) changes something you'll notice, and the notes below say exactly what. Your AI can walk you through any update: just say "update my assistant."*

## Unreleased (2.1.0)

**The one-sentence version:** your AI now talks like a colleague, works on one challenge all year, one idea at a time, and uses plain names for everything.

**What you'll notice:**

- **A shorter first chat that ends with this week's plan.** Five quick questions, one at a time, then one thing to try starting now, on one page: what to do each day, what to say, and how you'll know on Friday. No waiting weeks for a starting number. Naming your AI, the practice run, and launch come later, one at a time, when you have room. If you have to stop partway, say "let's keep going" next time.
- **Missing work without the extra app.** Just type two numbers from your gradebook (total missing, kids with 3 or more). Class Pulse now puts those two numbers at the top of its summary, hides its optional settings, and says its groups in plain words.
- **Firmer help when a student may be at risk.** Your AI asks you to take it to the counselor today, in person, gives 911 and 988 for emergencies, and checks back until you say it's done.
- **Materials held to a higher bar:** set in the book you're actually teaching, checked before you get them, and never stating a late-work policy you didn't give. Progress Cards and Parent Messages no longer come with a built-in "full credit" line.
- **Your AI talks like a colleague:** shorter, plainer, no tech words, and no file names unless you ask where something is.
- **Less to keep track of, more follow-through.** Each week's plan is short enough to read before first period and is what happens in class, with at most one small ask outside class. Your AI reads each struggling kid's gradebook line for the likely reason, asks how your talks with kids went, and makes sure a kid with nothing turned in reaches the counselor that week. On Fridays it says honestly what one week can and can't show.
- **Plain names for the two options for student names and grades.** "Locked-Room" is now **the Offline option** (still the default). "Direct" is now **the Claude for Teachers option**, and it's only for teachers who use Claude for Teachers *and* whose district has given permission. On that option you can now share student information in the chat (paste or attach) as well as through the inbox folder. Either way, no student's name goes into your classroom's lasting notes or dashboards, or on anything shown to the class. On the Offline option, if you paste names by mistake, your AI won't use or repeat them, saves nothing, and still helps right away; it just asks you to leave names off next time.
- **One challenge, all year.** Your AI tries one idea at a time, checks about every two weeks whether the number moved, and you decide: keep, adjust, or switch.
- **Every idea it suggests says how strong the research is,** in plain words.
- **Better research.** We re-checked all the research behind the five ready-made challenges and corrected several overstated claims. The reading challenge now has an honest way to track progress.
- **The minimum week is about 10 minutes.** The first missing-work count is three numbers, about 2 minutes a class. For any challenge, you just type in your weekly count; Class Pulse can count missing work for you if you'd like.
- **Two plain names for two pages.** The browser page with the offline apps is now called **Class Tools** everywhere (sidebar, heading, guide), with a "How Class Tools works" panel at the top. The page your AI keeps in the chat is **your class page**. A new one-page guide, `setup/class-tools-guide.md`, says what each app is for.
- **Plainer apps.** Class Pulse has clear "Send this week's summary to your AI" steps, with a paste option. Every app uses plain words ("memory file," "comparison file," "Drop your gradebook file here"). Random Groups and Badges try the demo class in one click. Summaries made from the demo class are marked DEMO, so practice numbers never land in your class's record.
- **A simpler app builder:** fewer questions, each with an example; every new app has a **Try it with a made-up class** button; the install guide is rewritten step by step.

**Anything to do?** Say "update my assistant." If you added the app builder before, delete the old one in Claude under **Customize → Skills** and upload the new `teacher-app-builder-skill-upload.zip` (steps in `docs/teacher-app-builder.md`). If you're on the Claude for Teachers option, check that your district's permission covers sharing in the chat before you do it; if you're not sure, keep using the inbox folder.

## 2.0.0 — [release date]

**The one-sentence version:** your classroom now lives in one folder — `my-classroom/` — that updates will never touch, and copying that one folder is a complete backup.

**What you'll notice:**

- **Your stuff has a home.** Your AI's persona, your class story, your built apps, and your dashboard now live in `my-classroom/`. Everything else is the engine, safely replaceable. Existing setups: your AI migrates you automatically the first time you update — it copies first, deletes nothing without asking.
- **A data-mode choice.** Locked-Room stays the default (nothing changes unless you say so). If your district has approved Claude for student data, a documented Direct mode now exists — one page to record the approval, one folder for exports, and everything the AI keeps still stays name-free.
- **The Challenge Deck.** Five ready-made class challenges in `brain/challenge-deck/`, each with its research, its weekly rhythm, its metric, and a season finale. Pick a card; skip the blank page.
- **Mondays got shorter.** Class Pulse now has a *Download this pulse* button. Drop the file in `my-classroom/pulses/`, say "run Monday," and your AI reads it, updates your dashboard, and proposes the week's moves — with receipts. No more copy-paste.
- **A dashboard inside Cowork.** "Show my dashboard" now brings up your class's current-state page right in the chat, with a season scoreboard chart at the finale. (The browser dashboard is still your launcher for the offline tools.)
- **The app builder got cleaner.** New apps save to your `my-classroom/apps/` folder with their spec, appear under "Your apps" in the sidebar, and survive every update. Reinstall the skill zip once to get the new version.
- **Small fixes:** the Cowork install link actually links now; app counts and names line up across the docs.

**Anything to do?** Existing users: say "update my assistant" and let it run the migration (it will ask you to duplicate your folder first — do that). Then reinstall `teacher-app-builder-skill-upload.zip` in Claude under Customize → Skills. That's it.
