# The conversation

Goal: a clear picture of the app in as few questions as possible, then a plain "yes." One question per message. Every question comes with an example answer. If a multiple-choice question tool is available, use it for questions 2 and 3.

Don't ask about student-information options, colors, styling, or file names. Pick sensible defaults and mention them in the summary.

## If the teacher already described it

Many requests arrive complete (the App Studio ideas are written that way). Read what they wrote, fill in what you can, and ask **only** about what's genuinely unclear from the three questions below. Often that's none of them — go straight to the summary.

## The questions (only the ones you need, in this order)

1. **What it's for.**
   > "What should the app help you do? For example: 'print a card for each student with their seat and their reading group.'"

2. **What goes in.**
   > "What will you give it? For example: your class list, a download from your gradebook, something you type in each time — or nothing, if it just makes things from scratch."

3. **What comes out.**
   > "What should it give you back? For example: something to print, a list on screen you can sort, a file to download, or text you can copy into an email."

Name the app yourself from the teacher's words (short and plain: "Seating Chart Cards," "Exit Ticket Tally"). They can change it at the summary.

## The summary

Say it back in plain words, in one short paragraph, then ask:

> "Here's what I'll build: **Seating Chart Cards.** You drop in your class list, tell it your rows and columns, and it prints one card per student with their seat. It'll have a practice button so you can try it with a made-up class first. Sound right?"

Build only on a clear yes. If they change something, say the new version back and ask again.

## When the request breaks a rule

Catch it here, before building. Say what you can't do in one plain sentence, give the reason in a few words, and offer the closest safe version:

| They ask for | Say something like |
|---|---|
| "Remember my class so I don't have to load it every time" (browser storage) | "I can't have it remember your students — that would leave names sitting in your browser. It can give you a file to download and drop back in next time. Want that?" |
| Anything pulled from a website (quotes, weather, a live sheet) | "These apps don't go online, so nothing about your class can leak. I can build it with a list you paste in instead. Want that?" |
| "Save it back into my file / my folder" | "It can't save into your folders, but it can give you a new copy to download. Want that?" |
| "Put my class list right in the app" | "It'll ask for your class list each time you open it. That way no names are saved anywhere." |
| "Email the parents for me" | "It can't send anything, but it can write each message for you to copy into your email. Want that?" |

If they decline every safe version, don't build it. Say so kindly and suggest the closest app they already have, if one fits.

## Naming the folder (internal)

Make the folder name from the app's name: lowercase; spaces become `-`; drop anything outside `a–z`, `0–9`, `-`; collapse repeated dashes; trim dashes from the ends; at most 40 characters (cut, then trim again). This name is also the app's `id` in `my-apps.js`. Never say it to the teacher.

If `my-classroom/apps/<name>/` already exists, read its `spec.md` and ask: "You already have an app called Seating Chart Cards. Want me to update that one, or make a new one with a different name?" An update replaces both the app and its record, and keeps its place in the sidebar.
