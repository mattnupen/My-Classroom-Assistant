#!/bin/bash
# shoot.sh URL OUT.png [WIDTH] [HEIGHT]
# Headless-Chrome screenshot. Chrome writes the PNG then lingers, so we watch for
# the file and kill Chrome as soon as it is complete (hard cap 45s).
# Safe to run many in parallel: each call gets its own throwaway profile.
URL="$1"; OUT="$2"; W="${3:-1440}"; H="${4:-900}"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PROF="$(mktemp -d /tmp/mca-shot.XXXXXX)"
rm -f "$OUT"
# Headless Chrome will not lay out narrower than ~500px, so a "390" capture used to be
# a cropped 500px render. For narrow widths, render the page inside a true-width iframe
# centred on a 520px canvas, then crop back to WxH (sips crops from the centre).
CAPW="$W"; TARGET="$URL"; NARROW=0
if [ "$W" -lt 520 ]; then
  NARROW=1; CAPW=520
  WRAP="$PROF/wrap.html"
  printf '<!doctype html><html><body style="margin:0;background:#fff"><iframe src="%s" style="border:0;display:block;margin:0 auto;width:%spx;height:%spx"></iframe></body></html>' "$URL" "$W" "$H" > "$WRAP"
  TARGET="file://$WRAP"
fi
"$CH" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --user-data-dir="$PROF" \
  --window-size="$CAPW,$H" --virtual-time-budget=3500 --screenshot="$OUT" "$TARGET" >/dev/null 2>&1 &
PID=$!
last=-1; stable=0
for i in $(seq 1 90); do
  sleep 0.5
  if [ -s "$OUT" ]; then
    sz=$(stat -f%z "$OUT")
    if [ "$sz" = "$last" ]; then stable=$((stable+1)); else stable=0; fi
    last=$sz
    [ $stable -ge 2 ] && break
  fi
  kill -0 $PID 2>/dev/null || break
done
kill $PID 2>/dev/null; sleep 0.3; kill -9 $PID 2>/dev/null; wait $PID 2>/dev/null
if [ "$NARROW" = 1 ] && [ -s "$OUT" ]; then
  sips -c "$H" "$W" "$OUT" --out "$OUT" >/dev/null 2>&1
fi
rm -rf "$PROF"
[ -s "$OUT" ] && echo "ok $OUT" || { echo "FAILED $OUT"; exit 1; }
