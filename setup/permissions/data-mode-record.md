# Data-Mode Record — My Classroom Assistant

*One page, on file with your IT department or privacy officer. The AI fills this in when a mode is set or changed; the teacher sends it. Plain language on purpose.*

**Teacher:** [name] · **School:** [school] · **Class(es):** [e.g., "Period 3 & 5, 8th-grade science"]
**Tool:** My Classroom Assistant (open source — myclassroomassistant.com) running in Claude Cowork
**Mode in effect:** [Locked-Room / Direct] · **Effective date:** [date]

## What this mode means for student data

**If Locked-Room (the default):**
Student-identifying data — rosters, gradebook exports, named student work — is never sent to, opened by, or stored by the AI. It is processed only by offline, single-file browser tools on the teacher's own computer; those tools make no network calls and store nothing. The AI receives only name-free aggregates (e.g., "8 students behind on Unit 3"). This is enforced by the project's architecture and by an automated check on every tool it builds.

**If Direct (requires the district approval recorded below):**
The teacher may provide gradebook/LMS exports directly to the AI by placing them in a single designated folder, under the district's data agreement with Anthropic covering Claude for education use. Two safeguards remain in force regardless: (1) everything the AI *stores or displays* — its running log, dashboard, slides, anything projected or printed — remains aggregate-only, with no student names; (2) all other student-data handling (feedback anonymization, crisis protocols, mandated-reporter obligations) is unchanged from Locked-Room mode.

## District approval (Direct mode only)

**Approved by:** [name, role] · **Date:** [date]
**Basis:** [e.g., "District DPA / data agreement with Anthropic, signed (date)" — attach or reference]

## Standing in both modes

- No student account, login, or direct student–AI interaction exists; the teacher mediates everything.
- Anonymous student feedback is scrubbed of identifying information on the teacher's computer before the AI sees it.
- The full privacy architecture, diagrams included: `setup/permissions/privacy-explainer.md` and `privacy-one-pager.html`, or the open-source repository itself.

**Teacher signature:** ______________________ **Date:** ____________
