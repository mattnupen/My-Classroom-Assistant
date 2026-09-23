// Builds content-templates/slide-template.pptx: the default classroom slide template,
// "Chalk & Marker (Projection Edition)" from content-templates/classroom-display-rules.md.
// 13.333 x 7.5 in (the 960 x 540 pt PowerPoint grid, so pt sizes match the rules exactly).
// Rebuild after changing the theme:  npm i pptxgenjs@3 && node content-templates/tools/build-slide-template.js
const path = require('path');
const fs = require('fs');
const pptxgen = require('pptxgenjs');

const ROOT = path.join(__dirname, '..', '..');
const OUT = process.argv[2] || path.join(ROOT, 'content-templates', 'slide-template.pptx');

const C = { paper: 'FAF6EE', ink: '14231F', ink2: '3F4F49', chalk: '14231F', onChalk: 'F6F2E8',
  note: 'FFE67E', noteBand: 'F2D86C', marker: 'FF5A1F' };
const HEAD = 'Bricolage Grotesque';
const BODY = 'Figtree';
const X = 0.9, W = 11.55;          // content column (0.9in margins inside the sheet inset)

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.title = 'Classroom slide template';
pres.author = 'My Classroom Assistant';
pres.theme = { headFontFace: HEAD, bodyFontFace: BODY };

const shadow = () => ({ type: 'outer', color: C.ink, blur: 8, offset: 3, angle: 90, opacity: 0.22 });

// Shared pieces for every layout: plain paper and the chalk title sheet. No footer:
// classroom slides don't carry a class name, date, or logo.
function frame(extra) {
  return [
    { text: { text: '', options: { shape: pres.shapes.ROUNDED_RECTANGLE, x: 0.3, y: 0.3, w: 12.733, h: 1.95, fill: { color: C.chalk }, rectRadius: 0.28, line: { type: 'none' } } } },
    { placeholder: { options: { name: 'title', type: 'title', x: X, y: 0.42, w: W, h: 1.71,
        fontFace: HEAD, fontSize: 44, bold: true, color: C.onChalk, align: 'left', valign: 'middle', margin: 0, lineSpacingMultiple: 0.95 },
      text: 'One sentence the whole class should see' } },
    ...extra,
  ];
}
// A sticky note: yellow paper, a slightly darker adhesive strip, a soft lifted shadow.
function stickyNote(x, y, w, h) {
  return [
    { rect: { x, y, w, h, fill: { color: C.note }, line: { type: 'none' }, shadow: shadow() } },
    { rect: { x, y, w, h: 0.16, fill: { color: C.noteBand }, line: { type: 'none' } } },
  ];
}

pres.defineSlideMaster({
  title: 'Monday opening',
  background: { color: C.paper },
  objects: frame([
    { placeholder: { options: { name: 'lede', type: 'body', x: X, y: 2.72, w: W, h: 0.72,
        fontFace: BODY, fontSize: 30, color: C.ink, align: 'left', valign: 'middle', margin: 0 }, text: 'Why it matters, in one line' } },
    ...stickyNote(X, 3.72, 10.3, 1.6),
    { placeholder: { options: { name: 'move', type: 'body', x: X + 0.32, y: 3.98, w: 9.66, h: 1.22,
        fontFace: BODY, fontSize: 30, color: C.ink, align: 'left', valign: 'middle', margin: 0 }, text: 'Today’s one move: the one thing to do' } },
    { placeholder: { options: { name: 'close', type: 'body', x: X, y: 5.72, w: W, h: 0.72,
        fontFace: BODY, fontSize: 30, color: C.ink, align: 'left', valign: 'middle', margin: 0 }, text: 'A short, encouraging close' } },
  ]),
});

pres.defineSlideMaster({
  title: 'Big number',
  background: { color: C.paper },
  objects: frame([
    { placeholder: { options: { name: 'number', type: 'body', x: X, y: 2.62, w: 4.3, h: 2.55,
        fontFace: HEAD, fontSize: 150, bold: true, color: C.ink, align: 'left', valign: 'middle', margin: 0 }, text: '0' } },
    ...stickyNote(5.45, 2.92, 6.95, 1.95),
    { placeholder: { options: { name: 'label', type: 'body', x: 5.77, y: 3.17, w: 6.35, h: 1.55,
        fontFace: BODY, fontSize: 30, color: C.ink, align: 'left', valign: 'middle', margin: 0 }, text: 'What the number means, in class terms' } },
    { placeholder: { options: { name: 'close', type: 'body', x: X, y: 5.72, w: W, h: 0.72,
        fontFace: BODY, fontSize: 30, color: C.ink, align: 'left', valign: 'middle', margin: 0 }, text: 'What we do next' } },
  ]),
});

const stepRows = [2.8, 4.15, 5.5];
pres.defineSlideMaster({
  title: 'Steps',
  background: { color: C.paper },
  objects: frame(stepRows.flatMap((y, i) => [
    ...stickyNote(X, y, 0.9, 0.9),
    { text: { text: String(i + 1), options: { x: X, y: y + 0.08, w: 0.9, h: 0.82, fontFace: HEAD, fontSize: 32, bold: true,
        color: C.ink, align: 'center', valign: 'middle', margin: 0 } } },
    { placeholder: { options: { name: 'step' + (i + 1), type: 'body', x: X + 1.2, y: y - 0.02, w: 10.35, h: 0.94,
        fontFace: BODY, fontSize: 30, color: C.ink, align: 'left', valign: 'middle', margin: 0 }, text: 'Step ' + (i + 1) } },
  ])),
});

// ---- The three sample slides (the AI replaces the words; teachers can duplicate) ----
const marked = (text) => ({ text, options: { underline: { style: 'heavy', color: C.marker } } });

let s = pres.addSlide({ masterName: 'Monday opening' });
s.addText([{ text: 'We turned in ' }, marked('14 assignments'), { text: ' last week.' }], { placeholder: 'title' });
s.addText('That’s the most all quarter.', { placeholder: 'lede' });
s.addText([{ text: 'Today’s one move: open the doc you’re closest to finishing and write ' }, { text: 'one sentence', options: { bold: true } }, { text: '.' }], { placeholder: 'move' });
s.addText([{ text: 'That’s all it takes to ' }, { text: 'keep it going', options: { bold: true } }, { text: '.' }], { placeholder: 'close' });
s.addNotes('Say it plainly: "Fourteen. That\'s the most all quarter." Give them 3 minutes for the one sentence, then move on. No names, no call-outs; if a student wants to share, let them.');

s = pres.addSlide({ masterName: 'Big number' });
s.addText([{ text: 'This week, ' }, marked('we moved'), { text: '.' }], { placeholder: 'title' });
s.addText('6', { placeholder: 'number' });
s.addText('fewer missing assignments than last Friday', { placeholder: 'label' });
s.addText([{ text: 'Same move today: ' }, { text: 'one sentence', options: { bold: true } }, { text: ' on your closest doc.' }], { placeholder: 'close' });
s.addNotes('Class totals only, never who. Pause on the number for a beat, then point to the move. If the number went the other way, use "Our number this week" and skip the celebration.');

s = pres.addSlide({ masterName: 'Steps' });
s.addText('Before you leave today', { placeholder: 'title' });
s.addText('Open your closest-to-done assignment', { placeholder: 'step1' });
s.addText([{ text: 'Write ' }, { text: 'one sentence', options: { bold: true } }], { placeholder: 'step2' });
s.addText('Show me the sentence on your way out', { placeholder: 'step3' });
s.addNotes('Read the three steps aloud once. Stand at the door for step 3; a quick nod is enough feedback.');

pres.writeFile({ fileName: OUT }).then((f) => console.log('wrote', f));
