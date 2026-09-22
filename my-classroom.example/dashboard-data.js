// The browser dashboard's cards for YOUR class. Edited by your AI through chat.
// Aggregate text only — counts and movement, never a student's name.
//
// When this file is present it REPLACES the dashboard's built-in welcome cards.
// Delete it (or empty the cards array) to fall back to the shipped default.
//
// SCHEMA — matches local-tools/ClassAI-dashboard.html exactly.
//   title    — the dashboard hero heading (usually "[AI name] — [your class]")
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
  "title": "Your classroom AI",
  "subtitle": "Everything on this page updates through chat. Open this folder in Cowork and say \"set up my classroom.\"",
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
      "title": "Focus this week",
      "body": "The one move this week's slides, cards, and notes all aim at.",
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
