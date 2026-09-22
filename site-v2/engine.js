/* MCA scroll engine — one rAF loop drives every animated section.
 *
 *   MCA.register(el, mode, paint)
 *     el    : the section element that owns the sequence
 *     mode  : "pin"  — el is a tall wrapper holding a position:sticky stage;
 *                      progress runs 0→1 across el's scrollable span
 *             "pass" — el is in normal flow; 0 as it enters from below,
 *                      1 while it is still comfortably in view
 *     paint : function(p) — draw yourself at progress p (0..1). Must be pure
 *             and cheap: it is called every frame while scrolling.
 *
 *   MCA.stepper(els, p, start, step, dur)  reveal a list one after another:
 *     sets --t (0..1) on each and toggles .on
 *   MCA.clamp01(n), MCA.ease(t) (easeOutCubic)
 *
 * Deterministic capture:  append ?p=0.6 to the URL and every sequence is
 * painted at 0.6 with all CSS transitions/animations disabled
 * (html.mca-freeze). This is how screenshots of mid-animation states are taken.
 *
 * Overview capture: ?flat (usually with ?p=1) collapses every pinned wrapper
 * (mark them data-pin) to its stage height, so the full page reads top to bottom.
 *
 * Reduced motion: every sequence is painted once at p=1 (html.mca-reduced)
 * and never again. Sections must look complete and correct at p=1.
 *
 * Rect math only — no IntersectionObserver, no scroll-timeline CSS.
 */
(function () {
  "use strict";
  var clamp01 = function (n) { return n < 0 ? 0 : n > 1 ? 1 : n; };
  var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
  var seqs = [], queued = false, started = false;

  var q = /[?&]p=([0-9.]+)/.exec(location.search);
  var frozen = q ? clamp01(parseFloat(q[1])) : null;
  var reduced = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var root = document.documentElement;
  if (frozen !== null) root.classList.add("mca-freeze");
  if (reduced) root.classList.add("mca-reduced");
  // ?flat collapses every [data-pin] wrapper so a whole-page overview fits one capture
  if (/[?&]flat\b/.test(location.search)) root.classList.add("mca-flat");

  var readers = {
    pin: function (el) {
      var span = el.offsetHeight - innerHeight;
      return span > 0 ? clamp01(-el.getBoundingClientRect().top / span) : 0;
    },
    pass: function (el) {
      var r = el.getBoundingClientRect(), vh = innerHeight;
      return clamp01((vh * 0.85 - r.top) / (r.height + vh * 0.25));
    }
  };

  var paintAll = function () {
    queued = false;
    for (var i = 0; i < seqs.length; i++) {
      var s = seqs[i];
      var p = frozen !== null ? frozen : reduced ? 1 : readers[s.mode](s.el);
      try { s.paint(p); } catch (e) { if (window.console) console.error("[MCA] paint failed", e); }
    }
  };
  var onScroll = function () { if (!queued) { queued = true; requestAnimationFrame(paintAll); } };

  var start = function () {
    if (started) return; started = true;
    if (frozen === null && !reduced) {
      addEventListener("scroll", onScroll, { passive: true });
      addEventListener("resize", onScroll);
      addEventListener("load", onScroll);
    }
    paintAll();
  };

  window.MCA = {
    clamp01: clamp01,
    ease: ease,
    frozen: frozen,
    reduced: reduced,
    register: function (el, mode, paint) {
      if (!el || !readers[mode]) return;
      seqs.push({ el: el, mode: mode, paint: paint });
      if (started) paintAll();
    },
    stepper: function (els, p, start, step, dur) {
      for (var i = 0; i < els.length; i++) {
        var t = clamp01((p - (start + i * step)) / dur);
        els[i].style.setProperty("--t", t.toFixed(3));
        els[i].classList.toggle("on", t > 0.015);
      }
    },
    refresh: onScroll
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
