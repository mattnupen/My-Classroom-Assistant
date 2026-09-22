# Conversation Flow

**Do not ask about the data mode.** Every app this skill builds is a Locked-Room tool by construction: it runs in the teacher's browser, makes no network calls beyond the SheetJS CDN, stores nothing, and writes nothing to the project folder. That is true whether the classroom is in Locked-Room or Direct mode, so the question would only be noise — offline tools are useful in both, and they are the only tools that ever touch student names. There is no question below that has anything to do with it.

The skill opens with exactly one question. Ask it verbatim:

> "Want me to walk you through a few quick questions, or would you rather describe what you need in your own words?"

Wait for the teacher's answer. Both paths converge on the same internal spec (see "Resolved spec format" below).

## Path A — Guided (5 questions, one at a time)

Use the AskUserQuestion tool when possible (multiple-choice keeps the cognitive load low for teachers). Ask one question per turn. Do not batch.

1. **Problem.** "In one sentence, what should this app help you do?" (free text — becomes `problem_solved`)
2. **Data input.** "Does this app take a file from you (like a gradebook), or does it generate output from scratch?" Options: CSV/XLSX file / typed text / nothing — generates from a template.
3. **Output style.** "What should it produce?" Options: Printable cards (one per row), On-screen sortable list, Downloadable CSV, On-screen text to copy.
4. **Name.** "What should we call it?" (free text — used to generate the slug and `title`)
5. **Anything else.** "Anything else it should do that the questions above didn't cover?" (free text — optional)

## Path B — Free-prose

> "Go ahead — describe what you want in a paragraph. I'll ask follow-ups only if I need them."

After the teacher's paragraph, ask at most TWO follow-up questions, only if the answer is genuinely ambiguous on:
- whether it takes a data file,
- what the output is (cards / list / CSV / text).

Do not ask follow-ups about styling, color, or naming — pick reasonable defaults and confirm at the end.

## Resolved spec format (internal)

Before generating, restate the resolved spec back to the teacher in plain language for confirmation. Use this format (markdown, not JSON, for readability):

> "OK, here's what I'll build:
> - **Name:** Parent Message Helper
> - **Problem it solves:** Generate parent-contact drafts for students missing assignments.
> - **Input:** CSV (gradebook export)
> - **Output style:** Downloadable CSV (one row per parent message)
> - **Sandbox file:** I'll generate `sandbox.csv` with 12 fictional students for you to test against first.
>
> Sound right? (yes / change something)"

If the teacher pushes back, revise and re-confirm. Only proceed to generation on an explicit "yes."

## Slug rules

Derive `slug` from the title:
- lowercase
- replace whitespace runs with single `-`
- strip every char outside `[a-z0-9-]`
- collapse repeated dashes
- trim leading/trailing dashes
- max length 40 chars (truncate, then re-trim)

If the resulting slug already exists at `my-classroom/apps/<slug>/`, ask the teacher: "An app called `<slug>` already exists. Overwrite it, or pick a new name?" If they choose to overwrite, read the existing `spec.md` first and say what's changing — a rebuild replaces both the app and its spec.
