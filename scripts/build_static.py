"""Turn the Next.js static export (./out) into a self-contained static bundle (./static-site).

- Inlines the CSS with fonts embedded as data URIs (no external requests).
- Removes the Next.js runtime and replaces it with scripts/site.js.
- Rewrites every internal URL to a relative file path, so the site works from any
  host or sub-folder, including opening index.html straight from disk.

Usage:  STATIC_EXPORT=1 npm run build && python3 scripts/build_static.py
"""
import base64
import os
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "out"
DEST = ROOT / "static-site"
MAIN_TITLE = "Miracle Fordjour Portfolio"
STRIP_WRAPPER = "--fragment-index" in sys.argv  # host wraps index.html in its own skeleton

if not OUT.exists():
    sys.exit("Run `STATIC_EXPORT=1 npm run build` first.")

# ---- CSS with embedded fonts ----------------------------------------------
css_files = sorted((OUT / "_next/static/css").glob("*.css"))
css = "\n".join(f.read_text() for f in css_files)


def embed_font(m):
    url = m.group(1).strip("'\"")
    if url.endswith(".woff"):  # woff2 is enough for every current browser
        return "url(data:font/woff;base64,)"
    data = (OUT / url.lstrip("/")).read_bytes()
    return f"url(data:font/woff2;base64,{base64.b64encode(data).decode()})"


css = re.sub(r"url\((/_next/static/media/[^)]+)\)", embed_font, css)
# drop the empty woff fallbacks left behind
css = re.sub(r',url\(data:font/woff;base64,\) format\("woff"\)', "", css)
# Neutralise host page resets (some hosts set a 14px body font and margins)
css += "body{font-size:1rem;margin:0}"

site_js = (ROOT / "scripts/site.js").read_text()

# html classes (font CSS variables) and language, applied before paint
sample = (OUT / "index.html").read_text()
html_attrs = re.search(r"<html([^>]*)>", sample).group(1)
html_class = re.search(r'class="([^"]*)"', html_attrs).group(1)

HEAD_SCRIPT = (
    "<script>(function(){var r=document.documentElement;"
    f"r.lang='en-GB';'{html_class}'.split(' ').forEach(function(c){{c&&r.classList.add(c)}});"
    "var t=null;try{t=localStorage.getItem('theme')}catch(e){}"
    "var a=r.getAttribute('data-theme');"
    "var d=t?t==='dark':a?a==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;"
    "r.classList.toggle('dark',d);})();</script>"
)


def slug(c):
    return re.sub(r"[^a-z0-9]+", "-", c.lower())


def rewrite_url(url, prefix):
    if not url.startswith("/") or url.startswith("//"):
        return url
    path, _, frag = url.partition("#")
    path, _, query = path.partition("?")
    if path.startswith("/projects") and query.startswith("category="):
        from urllib.parse import unquote_plus
        cat = unquote_plus(query.split("=", 1)[1])
        return f"{prefix}projects/index.html#cat-{slug(cat)}"
    rel = path.lstrip("/")
    if rel == "" or rel.endswith("/"):
        rel += "index.html"
    elif "." not in rel.rsplit("/", 1)[-1]:
        rel += "/index.html"
    return prefix + rel + (f"#{frag}" if frag else "")


def resolve_suspense(html):
    """Do React's streaming swap ahead of time: move each <div hidden id="S:n"> payload
    into the place of its <template id="B:n"> fallback (normally done by inline scripts)."""
    while True:
        m = re.search(r'<div hidden id="S:([^"]+)">', html)
        if not m:
            return html
        key, start, i, depth = m.group(1), m.start(), m.end(), 1
        tag = re.compile(r"<div\b|</div>")
        while depth:
            t = tag.search(html, i)
            depth += 1 if t.group(0) == "<div" else -1
            i = t.end()
        content = html[m.end(): i - len("</div>")]
        html = html[:start] + html[i:]
        b = re.search(r'<template id="B:' + re.escape(key) + r'"></template>', html)
        if not b:
            continue
        end = html.find("<!--/$-->", b.end())
        html = html[: b.start()] + content + html[end:]


def process(html, depth, is_main):
    prefix = "../" * depth
    html = resolve_suspense(html)
    # remove every script (Next runtime and RSC payload) and script/font preloads
    html = re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.S)
    html = re.sub(r'<link[^>]+rel="(preload|modulepreload)"[^>]*/?>', "", html)
    html = re.sub(r'<link[^>]+rel="stylesheet"[^>]*/?>', "", html)
    html = re.sub(r"<!--\$!?-->|<!--/\$-->|<!--\$\?-->", "", html)
    html = re.sub(r'<template[^>]*data-dgst[^>]*>.*?</template>', "", html, flags=re.S)
    # internal URLs → relative
    html = re.sub(r'(href|src)="([^"]*)"', lambda m: f'{m.group(1)}="{rewrite_url(m.group(2), prefix)}"', html)
    html = re.sub(r'href="([^"]*icon\.svg)\?[^"]*"', r'href="\1"', html)
    # inject CSS + theme script in head, behaviour script at end of body
    head_inject = HEAD_SCRIPT + f"<style>{css}</style>"
    html = html.replace("</head>", head_inject + "</head>", 1)
    html = html.replace("</body>", f"<script>{site_js}</script></body>", 1)

    if is_main:
        html = re.sub(r"<title>[^<]*</title>", f"<title>{MAIN_TITLE}</title>", html, count=1)
        if STRIP_WRAPPER:
            title = re.search(r"<title>.*?</title>", html).group(0)
            head = re.search(r"<head>(.*?)</head>", html, re.S).group(1).replace(title, "")
            head = re.sub(r'<meta charSet="utf-8"/>|<meta name="viewport"[^>]*/>', "", head)
            body_attrs = re.search(r"<body([^>]*)>", html).group(1)
            body = re.search(r"<body[^>]*>(.*)</body>", html, re.S).group(1)
            cls = re.search(r'class="([^"]*)"', body_attrs).group(1)
            # body classes are applied by script because the host supplies <body>
            body_cls = f"<script>document.body.className+=' {cls}';</script>"
            html = title + head + body_cls + body
    return html


if DEST.exists():
    shutil.rmtree(DEST)
DEST.mkdir()

pages = [p for p in OUT.rglob("index.html") if "404" not in p.parts]
for page in pages:
    rel = page.relative_to(OUT)
    depth = len(rel.parts) - 1
    target = DEST / rel
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(process(page.read_text(), depth, rel == Path("index.html")))

# static assets referenced by pages
for sub in ["projects", "notebooks", "dashboards", "cv"]:
    for f in (OUT / sub).rglob("*"):
        if f.is_file() and f.suffix.lower() in {".webp", ".png", ".jpg", ".svg", ".html", ".pdf"} and f.name != "index.html":
            dst = DEST / f.relative_to(OUT)
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(f, dst)
shutil.copy2(OUT / "icon.svg", DEST / "icon.svg")

files = [f for f in DEST.rglob("*") if f.is_file()]
size = sum(f.stat().st_size for f in files)
print(f"{len(pages)} pages, {len(files)} files, {size / 1e6:.1f} MB → {DEST}")
