# What's New

*Written for teachers, not developers. How to read version numbers: a **patch** (2.0.x) means fixes — nothing for you to do. A **minor** (2.x.0) adds things — new apps, new cards — without changing anything in your room. A **major** (x.0.0) changes something you'll notice, and the notes below say exactly what. Your AI can walk you through any update: just say "update my assistant."*

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

**Anything to do?** Existing users: say "update my assistant" and let it run the migration (it will ask you to duplicate your folder first — do that). Then reinstall `teacher-app-builder-skill-upload.zip` in Cowork's skill settings. That's it.
