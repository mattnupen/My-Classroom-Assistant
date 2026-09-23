# Classroom Display Rules

These are the design rules your AI follows whenever it generates anything students will see — slides, posters, printed cards, signs on the wall, certificates. They exist because kids in the back of the room shouldn't have to squint, color-blind students shouldn't be locked out, and overloaded slides shouldn't drown the message.

Your AI follows these; you can change them. They come from web accessibility standards (WCAG AA) and from what works in real classrooms.

---

## Default theme: Chalk & Marker (Projection Edition)

The colors, fonts, and text sizes the AI uses for slides and handouts by default. It's the look of the project's homepage and Class Tools (chalkboard ink, warm paper, one orange marker, sticky notes), tuned for the worst case: a small screen, a dim projector, and students in the back row. Every text and background pair is well above WCAG AA (4.5:1 for body text); the lowest text pair on a slide is 8:1. The template is `content-templates/slide-template.pptx` (see "The slide template" below).

### Palette

| Role | Name | Hex | Contrast |
|------|------|-----|----------|
| Slide / page background (plain, never a grid or texture) | Paper | `#FAF6EE` | — |
| Primary text | Ink | `#14231F` | 15:1 on Paper |
| Title band fill | Chalk | `#14231F` | — |
| Text on the Chalk band | Chalk white | `#F6F2E8` | 14.6:1 on Chalk |
| The one move / callout box (Ink text only) | Sticky note | `#FFE67E` | Ink 13:1 on it |
| Secondary text (a caption, if any) | Ink 2 | `#3F4F49` | 8:1 on Paper |
| The marker: one underline or circle, never text | Orange | `#FF5A1F` | 5.2:1 against Chalk |

- Body text is always **Ink on Paper** (or on the sticky note).
- **Orange is never a text color, a fill, or a background.** It is the one marker stroke on a slide (an underline under the words that matter), and only on the dark Chalk band, where it stands out. On Paper it's too faint (2.9:1) to carry anything.
- Emphasis inside a sentence is **bold Ink**, not color.
- The homepage's pale tints (sky, mint, coral…) are for the teacher's pages, not slides: too low-contrast on a projector.

### Font

**Bricolage Grotesque** for slide titles, **Figtree** for everything else (both clean sans-serifs, bundled in `local-tools/fonts/`, nothing downloaded), then **Arial / Helvetica** if they're missing. Serif fonts only for ceremonial pieces. The handwritten Caveat font from the homepage is **not** used on anything students read: it's harder for early and struggling readers.

### Type scale

**Slides** (at or above the minimums in the "Text size" section below):

- Slide title: **44 pt** extra-bold (on the Chalk band)
- Section header: **40 pt** bold (Ink)
- Body: **30 pt** regular (never below 28)
- **No footer.** Classroom slides don't carry the class name, date, page numbers, or a logo; it's a lesson, not a pitch deck.

**Documents (handouts):** H1 24 pt · H2 18 pt · H3 14 pt · body 12 pt, line spacing 1.5, Ink on white.

**Why a light background with a dark title band, not a dark slide:** dim projectors can't push whites bright and smear dark tones together, so a Paper background with near-black text is the reliable choice. The Chalk color is used for the title band only.

---

## Slides (projected to the whole class)

### The slide template

Teachers get slides as a **PowerPoint file** (`.pptx`), because that's what opens everywhere: double-click for PowerPoint or Keynote, or drag it into Google Drive and open it with Google Slides (or, in an open Google Slides deck, File → Import slides). The template is `content-templates/slide-template.pptx`, 16:9, with three layouts built in, each with a sample slide:

- **Monday opening:** the title on the chalk sheet, one line under it, the one move on a sticky note, a short close.
- **Big number:** one class-wide number, huge, with what it means on a sticky note. Class totals only.
- **Steps:** up to three numbered steps.

How the AI makes a slide from it: copy the file into `my-classroom/for-class/[date]/`, keep only the sample slides you need (duplicate a slide for more of the same layout; a teacher can also pick a layout from New Slide), and replace the words, keeping each text box's formatting. Put the teacher's script in the speaker notes, not on the slide. At most one phrase in the title gets the orange marker underline; nothing else is orange.

**Fonts:** Google Slides has both theme fonts built in, so it matches exactly. PowerPoint on a computer without them swaps in its own default font, which is a little wider or narrower, so leave room: a text box should look no more than about 85% full, and a title no longer than two lines. If a line won't fit, cut words or split the slide, never shrink below the sizes below.

(`content-templates/slide-template.html` is the same design as a web page, for a teacher who wants to project straight from the browser.)

### Text size

- **Body text:** 28-point minimum. 32+ is better.
- **Headers:** 40-point minimum.
- **Anything small** (a caption or a source), if you need it at all: 18-point minimum.

If anyone in the back row would have to squint, the font is too small. Most slides in most classrooms have text that's far too small. The fix is usually to put less text on the slide, not to fight for a smaller font.

### How much text per slide

- **Maximum 8 lines** per slide.
- **Maximum ~50 words** per slide.
- **One main idea per slide.** If you have two ideas, that's two slides.

If the AI generates a slide with more than this, it's wrong. Reject it and ask for a tighter version.

### Color and contrast

- **Background:** plain. White, off-white, or a very pale neutral. Never a busy texture, photo, or pattern behind text.
- **Body text:** dark on light (default: near-black on white) OR light on dark (default: white on deep navy or charcoal). Never light text on a light background. Never tiny dark text on a very saturated background.
- **Contrast ratio:** WCAG AA minimum (4.5:1 for body text, 3:1 for large text). The AI's defaults already meet this.
- **Color-coding:** if used, always pair color with another signal (icon, label, position) — never use color alone to convey meaning. Around 8% of boys and ~0.5% of girls have some form of color blindness.
- **Red/green together:** avoid. The two most common forms of color blindness make these hard to distinguish.

### Visual hierarchy

- **One thing is biggest.** The most important thing on the slide is the biggest thing. If everything is the same size, the slide is failing.
- **White space is information.** Generous margins and line spacing aren't wasted space — they direct attention.
- **No center-aligned long text.** Left-align body content. Center alignment is for short headers only.

### Animations and transitions

- **None by default.** Animation should never carry meaning a student could miss by blinking. If used at all, only for revealing one bullet at a time on lists — and only if the lesson actually benefits.
- **No spinning, flashing, bouncing.** Flashing can trigger seizures in some students. Motion distracts everyone.

### Decorative elements

- **Sparingly.** A single decorative element on a slide (a small icon, a thin accent line, an emoji used once) is fine. A slide cluttered with stickers, doodads, and "fun" graphics is not.
- **Emoji:** use as a small accent or visual anchor, not as the main content. Never use emoji to convey something important (e.g., a flame emoji is not a replacement for the word "hot").

---

## Printed materials (cards, certificates, handouts)

### Text size

- **Body text:** 11-point minimum. 12 is the better default. Larger if the audience needs it.
- **Headers:** 16-point minimum.
- **Signatures and footer notes:** 9-point minimum.

### Paper layout

- **Margins:** at least 0.5 inch on all sides.
- **Line spacing:** 1.15 to 1.5 for body text. Never 1.0 (squished) or 2.0+ (looks like a draft).
- **Cards meant to be cut:** include clear cut lines or visible margins between cards.

### Color

- **Most printed material is black on white.** Save color for certificates, badges, or visual milestones — places where the color is part of the moment.
- **Never print critical content in light color on white.** Pale gray text might look elegant on screen but disappears on a printed page, especially after photocopying.

### Readability for students with reading challenges

- **Use sans-serif for dense text** (e.g., Arial, Helvetica). It's what dyslexia style guides recommend; the research on font choice itself is thin, so don't go further than that. Serifs only for ceremonial pieces like certificate names.
- **Avoid italic for body text.** Use it for emphasis only; long italic passages are harder to read.
- **Avoid all-caps blocks.** Long runs of capitals read more slowly; use caps for a word or two at most.

---

## Posters (wall display, visible all year)

### Text size

- **Anything important visible from across the room.** That's roughly 60-point minimum for the main message on a standard 17×11 poster, larger for bigger formats.
- **Body text:** 24-point minimum if there's any narrative.

### Content density

- **One message per poster.** Posters compete with everything else on your walls. A poster that's trying to say five things ends up saying zero.
- **No fine-print disclaimers.** If a poster needs a fine-print explanation, the poster's wrong.

### Lifespan

- **Date the back of every poster** the AI helps generate, so you know what's current and what's been on the wall too long.
- **Take them down when they're no longer relevant.** A stale celebration poster (last quarter's perfect-week winners) becomes a quiet message that nobody's tracking anymore.

---

## Specific never-do rules

- **Never put a list of struggling students on a slide, poster, or any class-wide display.** Ever. (See `brain/safety-rules.md`.)
- **Never put a student's exact words in a class-wide display.** Synthesize themes, never quote.
- **Never compare** students or sections in anything students see. ("Period 2 is ahead of Period 4" → no.)
- **Never use shaming visuals.** Frowning faces, "WARNING" badges, red flashing graphics next to a student's name — not in any form.
- **Never assume every student can see a slide.** Some students have low vision or are temporarily seated where they can't see well. Read aloud anything critical.

---

## How the AI uses these

When the teacher asks the AI to generate slides, posters, or printed materials, the AI silently checks the draft against these rules. If the draft violates them — text too dense, contrast too low, names listed where they shouldn't be — the AI rewrites or pushes back.

If the teacher specifically asks for something that breaks the rules ("can you make the font smaller so it all fits?"), the AI offers an alternative ("we could split this into two slides instead — that'll keep the size up").

The rules are how the AI thinks about visual content. The teacher doesn't have to read this file weekly; the AI does the work of following it.
