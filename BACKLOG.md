# Backlog

What's next for My Classroom Assistant, roughly in priority order. Add to it freely; move finished items to `CHANGELOG.md`.

## Needs Matt

- [ ] **Homepage privacy claim.** The homepage (`index.html`, built from `site-v2/`) still says the AI never sees student data. That's no longer true for teachers on the Claude for Teachers option. Narrow it to "by default" (e.g. "private by default, direct only with your district's permission") and check the homepage uses the plain option names.
- [ ] **Reinstall the app builder** in your own Claude account: delete the old one under Customize → Skills and upload the current `teacher-app-builder-skill-upload.zip`. The installed copy is the pre-2.0 version.
- [ ] **Tag the 2.1.0 release** on GitHub.
- [ ] **Check the site's HTTPS certificate** (flagged as a release blocker in `INTEGRATION-REPORT.md`): myclassroomassistant.com should load with no browser warning.
- [ ] **Print-check the privacy one-pager** (`setup/permissions/privacy-one-pager.html`): it should still fit on one page.

## Try it for real

- [ ] **Pilot with 2–3 real teachers**, first chat through a full week, on the Offline option and (if a district allows) the Claude for Teachers option. Everything so far was tested with simulated teachers.
- [ ] **Open the slide template in Google Slides and PowerPoint.** Confirm Google Slides picks up the homepage fonts and PowerPoint's fallback font still fits every text box.
- [ ] **Run the whole thing inside Cowork**: setup, "run Monday," a slide hand-off, the app builder.
- [ ] **Answer the two Cowork rendering questions** from `INTEGRATION-REPORT.md` (do `test.md` / `test.jsx` render, and re-render when reopened), then delete those test files.
- [ ] **Pilot the 2.0 and 2.1 migrations** on a copy of a real pre-2.0 classroom folder.

## Match the new look ("Chalk & Marker")

- [ ] **The "meet your AI" card** (`content-templates/persona-card.html`): restyle, and remove its class-and-date footer like the slides.
- [ ] **The season scoreboard** (`content-templates/season-snapshot.jsx`).
- [ ] **The insides of each tool page** (drop zones, steps, results). The sidebar and header are done; the rest is still the old blue-green.
- [ ] **The app builder's page template** (`skills/teacher-app-builder/references/scaffold-base.html`), so new apps match. Rebuild the zip after.
- [ ] **Retire `docs/theme-preview.html`** (the old Ocean Depths preview) or replace it.
- [ ] **Slide template:** remove the blank "DEFAULT" layout the build tool adds (teachers see it under New Slide).

## Make the assistant better

From the last round of blind comparisons against a simulated instructional coach (ours won 3 of 4; the loss was the Claude for Teachers teacher):

- [ ] **Name solid sources for every strategy it uses** (warm calling, notes home, attendance outreach, beating the class's own record), at the right grade level.
- [ ] **When a routine stalls, ask what it actually looks like** (e.g., what the partner step looks like in 3rd period) before shrinking it.
- [ ] **When a teacher says they're drowning,** cut to the one most important thing, but keep one note home going out that week rather than postponing all of them.
- [ ] **When turning down an app request,** give the privacy reason in one line, and don't offer a weekend session to an overloaded teacher.
- [ ] **Link the homepage to the demo class:** `local-tools/ClassAI-dashboard.html#demo` opens Class Tools straight into the made-up class.
