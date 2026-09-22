#!/usr/bin/env python3
"""Assemble the v2 homepage from section fragments.

  python3 site-v2/tools/build.py                 -> index.html (repo root, every section: the live homepage)
  python3 site-v2/tools/build.py --preview ID    -> site-v2/preview/ID.html (one section alone)

Section fragments live in site-v2/sections/NN-id.html (NN orders them).
Each fragment is plain HTML: a <section>, plus optional <style> and <script>.

Placeholders, rewritten per output location:
  {{IMG}}   -> path to the repo's images/ folder
  {{ROOT}}  -> path to the repo root, with trailing slash ("" at the root)

The shell (site-v2/shell.html) must contain {{TOKENS}}, {{ENGINE}} and {{SECTIONS}}.
tokens.css and engine.js are inlined so every output is a single self-contained file.
"""
import pathlib, re, sys

V2 = pathlib.Path(__file__).resolve().parent.parent
REPO = V2.parent


def sections():
    files = sorted(p for p in (V2 / "sections").glob("*.html") if re.match(r"\d\d-", p.name))
    return [(re.sub(r"^\d\d-", "", p.stem), p.read_text()) for p in files]


def render(parts, img, root):
    shell = (V2 / "shell.html").read_text()
    tokens = (V2 / "tokens.css").read_text() if (V2 / "tokens.css").exists() else ""
    engine = (V2 / "engine.js").read_text() if (V2 / "engine.js").exists() else ""
    body = "\n\n".join(parts)
    out = shell.replace("{{TOKENS}}", tokens).replace("{{ENGINE}}", engine).replace("{{SECTIONS}}", body)
    return out.replace("{{IMG}}", img).replace("{{ROOT}}", root)


def main():
    args = sys.argv[1:]
    all_secs = sections()
    if args[:1] == ["--preview"]:
        sid = args[1]
        # previews may also target unshipped scratch fragments like _styletile.html
        cands = [p for p in (V2 / "sections").glob("*.html")
                 if re.sub(r"^\d\d-", "", p.stem) == sid or p.stem == sid]
        match = [c.read_text() for c in cands]
        if not match:
            sys.exit(f"no section '{sid}'. have: {[i for i, _ in all_secs]}")
        out = V2 / "preview" / f"{sid}.html"
        out.write_text(render(match, "../../images", "../../"))
    else:
        out = REPO / "index.html"
        out.write_text(render([h for _, h in all_secs], "images", ""))
    print(f"wrote {out}")


if __name__ == "__main__":
    main()
