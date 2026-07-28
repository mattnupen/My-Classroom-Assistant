# Data Policy — this classroom

*This file is the one rule the AI honors above everything else. It's written during setup and changed only through an explicit conversation. Plain language on purpose — hand it to anyone who asks.*

## Current mode

**Mode:** Locked-Room *(default)*
**Set on:** [date — written during setup]
**Set by:** [teacher name]
**District approval on file:** n/a *(required for Direct mode — record who approved and when)*

## What the modes mean

**Locked-Room (default).** Student-identifying data — rosters, gradebook exports, named work — never enters this folder and is never opened by the AI, anywhere, in any form. It lives only in the offline apps that run in the teacher's browser. The AI works from name-free aggregates: the pulse files in `my-classroom/pulses/` and what the teacher pastes by hand.

**Direct (district-approved, opt-in).** Exactly one thing changes: the AI may open files the teacher deliberately places in `my-classroom/inbox/` — and nothing else. Everything the AI *writes or keeps* — the class story, the dashboard, slides, anything projected or printed for the wall — stays aggregate-only, exactly as in Locked-Room. Direct processing, never direct storage. The inbox is the teacher's to empty.

**In both modes, always:** anonymous student feedback goes through the Feedback Cleaner first; no student's name appears in anything the AI stores or displays; every rule in `brain/safety-rules.md` stands.

## Changing modes

Tell the AI "I want to change the data mode." It will confirm what changes, update this file with the date, note the change in the class story, and — for Direct mode — record the district approval and generate the one-page record from `setup/permissions/data-mode-record.md` for your IT department.

## Change log

- [date] — Locked-Room mode set at first setup.
