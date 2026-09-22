// Season Snapshot — the scoreboard moment, rendered as a Cowork artifact.
// HOW THE AI USES THIS: copy into my-classroom/for-class/[date]/season-snapshot.jsx,
// replace everything between the DATA markers with real values from
// my-classroom/dashboard.md's trend table, and set the four LABEL fields.
// Cowork artifacts are self-contained: no local imports, no fetch, no browser
// storage — bake the data in. Derive colors from
// content-templates/classroom-display-rules.md (Ocean Depths) before shipping;
// the values below are placeholders in that spirit, not the theme itself.
// Aggregate numbers only. Never a student's name anywhere in this file.

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";

// ==== DATA — AI replaces this block ====
const LABELS = {
  aiName: "[AI name]",
  challenge: "[Challenge name]",
  metric: "[Metric, e.g., Missing assignments]",
  weekOf: "[Finale date]",
};
const TARGET = 50; // the number the class chose
const TREND = [
  { week: "Wk 1", value: 74 }, // baseline
  { week: "Wk 2", value: 71 },
  { week: "Wk 3", value: 66 },
  { week: "Wk 4", value: 68 },
  { week: "Wk 5", value: 58 },
  { week: "Wk 6", value: 49 },
];
// ==== END DATA ====

const C = {
  bg: "#0B2239",      // deep ocean — swap for the theme's background
  panel: "#123655",
  ink: "#F2F7FA",
  dim: "#9DB8CC",
  line: "#5FD4C4",    // the class's progress
  target: "#F2B84B",  // the goal they set
};

export default function SeasonSnapshot() {
  const baseline = TREND[0].value;
  const now = TREND[TREND.length - 1].value;
  const delta = baseline - now;
  const hit = now <= TARGET;

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: "system-ui, sans-serif", padding: 32, minHeight: 480 }}>
      <div style={{ fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: C.dim }}>
        {LABELS.aiName} · Season finale · {LABELS.weekOf}
      </div>
      <h1 style={{ fontSize: 34, margin: "8px 0 4px" }}>{LABELS.challenge}</h1>
      <div style={{ fontSize: 20, color: C.dim, marginBottom: 20 }}>
        {LABELS.metric}: <b style={{ color: C.ink }}>{baseline} → {now}</b>
        {" "}({delta >= 0 ? "down " + delta : "up " + -delta}) · target {TARGET} —{" "}
        <b style={{ color: hit ? C.line : C.target }}>{hit ? "made it" : "close — retro time"}</b>
      </div>
      <div style={{ background: C.panel, borderRadius: 12, padding: 16, height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={TREND} margin={{ top: 8, right: 16, bottom: 0, left: -8 }}>
            <CartesianGrid stroke={C.dim} strokeOpacity={0.2} strokeDasharray="3 3" />
            <XAxis dataKey="week" stroke={C.dim} tickLine={false} />
            <YAxis stroke={C.dim} tickLine={false} />
            <Tooltip contentStyle={{ background: C.panel, border: "none", color: C.ink }} />
            <ReferenceLine y={TARGET} stroke={C.target} strokeDasharray="6 4"
              label={{ value: "class target", fill: C.target, fontSize: 12, position: "insideTopRight" }} />
            <Line type="monotone" dataKey="value" stroke={C.line} strokeWidth={3}
              dot={{ r: 4, fill: C.line }} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginTop: 16, fontSize: 15, color: C.dim }}>
        Whole-class counts only — this chart has never met a name.
      </div>
    </div>
  );
}
