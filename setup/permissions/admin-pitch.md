# One-Page Pitch: Classroom AI Experiment

*Hand this to your principal or assistant principal. Most of them will read it in under five minutes. Fill in the bracketed bits with your specifics.*

---

## What I'm proposing

For [length of experiment — e.g., "the next quarter"], I'd like to run a small classroom AI experiment in my [grade / subject] class. The goal is [one specific outcome — e.g., "to reduce missing assignments and build stronger weekly communication with families"].

The AI is named, shaped, and given its mission by [me / me and my students together]. Students never talk to the AI directly. I am always the bridge.

## What the AI actually does

It helps me prepare materials I'd otherwise spend hours on:

- Weekly themed slides for the class
- Per-student missing-work cards (printed, handed to kids one-on-one)
- Parent messages tailored to each student's situation
- Celebration certificates for milestones
- Drafts of encouragement notes
- Weekly reflections on what's working

I review everything before it reaches students or families.

## What the AI does NOT do

- It does not interact with students.
- It does not make academic decisions or assign grades.
- It does not send anything to families without my review.
- It does not store or display any student's name — not in its notes, not on a dashboard, not on a slide. That holds no matter which data mode below I'm using.

## How student data is handled (the short version)

**The mode I'm using: Locked-Room (the project's default).**

Anything that requires per-student detail — reading the gradebook, generating individualized cards, picking groups — happens through small browser tools that run **only on my laptop**. No student data is transmitted anywhere.

The AI itself only ever sees:
- Aggregate class summaries with no names attached (e.g., "Period 3: 6 strong, 12 steady, 5 struggling")
- My own observations written as prose ("the class energy was low today; two students bounced back this week")
- Generic templates with placeholders the local tools fill in

This keeps the project on the safe side of FERPA and state student data privacy laws. The longer explanation is in `privacy-explainer.md`.

## An optional second mode, for districts that want it

*Read this only if you're curious about the alternative — the proposal above is the default, and it's what I'm asking for unless you tell me otherwise.*

Some districts, having reviewed Anthropic's education data terms, approve teachers to let Claude work with gradebook exports directly. It removes the export-summarize-paste step in the middle of my week.

This project supports that as an explicit, opt-in switch rather than a habit that drifts in:

- The district's approval is recorded — who approved it, when, and on what basis — on a one-page record: `setup/permissions/data-mode-record.md`.
- The AI's rules change in exactly one documented way: it may open exports I deliberately place in a single designated folder. Nothing else changes.
- Everything the AI *stores or displays* stays aggregate-only, with no student names, in both modes.

If that's of interest, the relevant terms are Anthropic's [Claude for Teachers data terms](https://support.claude.com/en/articles/15926041-claude-for-teachers-your-data-and-our-terms), which include a K-12 Data Processing Addendum written for FERPA. If it isn't, nothing above changes — Locked-Room is and remains the default.

## What I'm asking for

- **Your sign-off** to run this for [duration].
- **A note in my evaluation** that this is an experimental practice — not a baseline expectation, so if something doesn't work I'm not penalized for trying.
- **Optional:** a quick conversation about how families should be notified, given our district's typical communication norms.

## What I'm not asking for

- District funding (I'll cover any costs — typically under [$X/month])
- Tech support time
- Any change to existing curriculum or grading policy

## How you'll know it's working

I'll plan to share a one-page reflection at the end of the experiment that includes:
- What we tracked (missing-work rate, attendance, student feedback)
- What changed
- What I'd do differently
- Whether I'd recommend others try it

If at any point you have concerns, I'll pause immediately.

## Risk and what we'd do if something goes wrong

- **If a student or family objects:** I'll pull that student out of any AI-touched content immediately and find an alternative.
- **If the AI generates something inappropriate:** since I review everything before it reaches students, this would be a near-miss, not a public incident. I'll document and adjust.
- **If something I haven't anticipated comes up:** I'll bring it to you first.

---

**Project:** [Name your project — e.g., "Classroom AI for [class name]"]
**Teacher:** [Your name]
**Class(es) involved:** [Period / section]
**Number of students:** [N]
**Start date:** [Date]
**End date:** [Date]
**My signature:** ___________________  **Date:** _______

**Admin approval:**

___ Approved  ___ Approved with conditions (see below)  ___ Need to discuss further

Conditions / notes:

___________________________________________________________________________

___________________________________________________________________________

**Admin signature:** ___________________  **Date:** _______
