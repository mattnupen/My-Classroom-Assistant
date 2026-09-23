// The cards on Class Tools (the browser page that opens the offline apps) for
// YOUR class. Edited by your AI through chat; keep them matching the class page
// (dashboard.md). Class totals only — counts and movement, never a student's name.
//
// When this file is present it REPLACES Class Tools' built-in welcome cards.
// Once `title` is no longer "Class Tools" (the AI has a name), the "How Class
// Tools works" panel folds to one line. Delete this file (or empty the cards
// array) to fall back to the shipped default.
//
// SCHEMA — matches local-tools/ClassAI-dashboard.html exactly.
//   title    — the big heading: "Class Tools" until the AI has a name, then "[AI name] — [your class]"
//   subtitle — one line under it
//   cards[]  — each card needs id, size, type, title, body, tone
//     id       stable forever, never renamed
//     size     "large" | "medium" | "small"
//     tone     "good" | "warn" | "neutral"
//     type     decides what `body` must look like:
//       "text"      → body is a string
//       "progress"  → body is a string, plus a numeric `progress` from 0.0 to 1.0
//       "checklist" → body is an array of { text, done }
//       "dates"     → body is an array of strings
//       "files"     → body is an array of { name, type: "folder"|"file", children: [], href? }
//
window.DASHBOARD_DATA = {
  "title": "Class Tools",
  "subtitle": "Your offline apps are in the sidebar. Your AI keeps these cards matching your class page in the chat.",
  "cards": [
    {
      "id": "mission",
      "size": "large",
      "type": "text",
      "title": "Your mission",
      "body": "Set during your first chat — the one thing that would be different if this season went well.",
      "tone": "neutral"
    },
    {
      "id": "season-progress",
      "size": "medium",
      "type": "progress",
      "title": "This season",
      "body": "Your challenge's progress shows up here once a season is running.",
      "progress": 0.0,
      "tone": "neutral"
    },
    {
      "id": "focus-this-week",
      "size": "medium",
      "type": "text",
      "title": "What we're trying",
      "body": "The one move we're trying right now, and when we'll check whether it's working.",
      "tone": "neutral"
    },
    {
      "id": "upcoming",
      "size": "small",
      "type": "dates",
      "title": "Upcoming",
      "body": [
        "Key dates land here from chat"
      ],
      "tone": "neutral"
    }
  ]
};
