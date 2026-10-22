#!/usr/bin/env python3
"""
Build the Rust guide: Markdown -> (pandoc) -> HTML -> (headless Chrome) -> PDF.

    python3 pipeline/build.py              # whole book  -> dist/rust-by-design.pdf
    python3 pipeline/build.py --parts      # + one PDF per part
    python3 pipeline/build.py --only 02    # just the part whose folder starts "02"
    python3 pipeline/build.py --html       # stop after HTML (open build/*.html)

Requirements: pandoc >= 3.1 and Chrome/Chromium (set $CHROME to override).
Everything else (fonts, mermaid.js) is vendored in pipeline/vendor.
"""
from __future__ import annotations

import argparse
import os
import re
import shutil
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BOOK = ROOT / "book"
PIPE = ROOT / "pipeline"
BUILD = ROOT / "build"
DIST = ROOT / "dist"
SLUG = "rust-by-design"


@dataclass(frozen=True)
class Part:
    folder: Path
    files: list[Path]

    @property
    def key(self) -> str:
        return self.folder.name

    @property
    def title(self) -> str:
        for f in self.files:
            for line in non_code_lines(f):
                if line.startswith("# "):
                    return line[2:].strip()
        return self.key


def non_code_lines(path: Path):
    """Yield lines of a Markdown file that are outside fenced code blocks."""
    fence = None
    for line in path.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^\s*(`{3,}|~{3,})", line)
        if m:
            marker = m.group(1)
            if fence is None:
                fence = marker[0] * len(marker)
            elif marker.startswith(fence):
                fence = None
            continue
        if fence is None:
            yield line


def chapter_count(path: Path) -> int:
    """Number of numbered chapters (h1s that aren't parts/appendices/front matter)."""
    unnumbered = re.compile(r"^# (Part\s+[0IVXLC]+|Appendix|Interlude|Preface|Foreword|Afterword)")
    return sum(
        1 for l in non_code_lines(path) if l.startswith("# ") and not unnumbered.match(l)
    )


def interlude_count(path: Path) -> int:
    return sum(1 for l in non_code_lines(path) if l.startswith("# Interlude:"))


def discover() -> list[Part]:
    parts = []
    for folder in sorted(p for p in BOOK.iterdir() if p.is_dir()):
        files = sorted(folder.glob("*.md"))
        if files:
            parts.append(Part(folder, files))
    return parts


def find_chrome() -> str:
    candidates = [
        os.environ.get("CHROME"),
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    ] + [shutil.which(n) for n in ("chromium", "chromium-browser", "google-chrome", "google-chrome-stable")]
    for c in candidates:
        if c and Path(c).exists():
            return c
    sys.exit("error: could not find Chrome/Chromium. Set $CHROME to its executable.")


def stage_assets() -> None:
    BUILD.mkdir(exist_ok=True)
    shutil.copy2(PIPE / "style.css", BUILD / "style.css")
    shutil.copytree(PIPE / "vendor", BUILD / "vendor", dirs_exist_ok=True)
    # Images are referenced relative to book/ (e.g. 04-netdash/images/x.png),
    # and the HTML lives in build/, so mirror each part's images folder there.
    for images in BOOK.glob("*/images"):
        shutil.copytree(images, BUILD / images.relative_to(BOOK), dirs_exist_ok=True)


def pandoc(files: list[Path], out_html: Path, *, volume: str | None, offset: int,
           interludes: int = 0) -> None:
    cmd = [
        "pandoc",
        str(BOOK / "metadata.yaml"),
        *map(str, files),
        "--from=markdown+smart+pipe_tables+fenced_divs+gfm_auto_identifiers-implicit_figures",
        "--to=html5",
        "--standalone",
        f"--template={PIPE / 'template.html'}",
        f"--lua-filter={PIPE / 'filters' / 'book.lua'}",
        f"--highlight-style={PIPE / 'ferris-night.theme'}",
        *(f"--syntax-definition={x}" for x in sorted((PIPE / "syntax").glob("*.xml"))),
        "--css=style.css",
        "--toc",
        "--toc-depth=2",
        "--number-sections",
        f"--number-offset={offset}",
        "--section-divs=false",
        "--wrap=none",
        f"--resource-path={BOOK}",
        f"--output={out_html}",
    ]
    if volume:
        cmd.append(f"--metadata=volume:{volume}")
    if interludes:
        cmd.append(f"--metadata=interlude-offset:{interludes}")
    run(cmd)


def print_pdf(chrome: str, html: Path, pdf: Path) -> None:
    pdf.parent.mkdir(exist_ok=True)
    pdf.unlink(missing_ok=True)
    with tempfile.TemporaryDirectory(prefix="rbd-chrome-") as profile:
        res = subprocess.run([
            chrome,
            "--headless=new",
            "--disable-gpu",
            "--no-first-run",
            "--no-default-browser-check",
            "--allow-file-access-from-files",
            f"--user-data-dir={profile}",
            "--no-pdf-header-footer",
            "--generate-pdf-document-outline",
            "--run-all-compositor-stages-before-draw",
            "--virtual-time-budget=60000",
            f"--print-to-pdf={pdf}",
            html.as_uri(),
        ], capture_output=True, text=True)
    # Chrome sometimes exits non-zero during shutdown (notably when several
    # headless instances run at once) after writing a perfectly good PDF, so
    # judge success by the output file rather than the exit code.
    if not pdf.exists() or pdf.stat().st_size == 0:
        sys.stderr.write(res.stdout + res.stderr)
        sys.exit(f"error: Chrome did not produce {pdf} (exit {res.returncode})")
    note = f", chrome exit {res.returncode}" if res.returncode else ""
    print(f"  ✓ {pdf.relative_to(ROOT)}  ({pdf.stat().st_size / 1_048_576:.1f} MB{note})")


def run(cmd: list[str], quiet: bool = False) -> None:
    res = subprocess.run(cmd, capture_output=quiet, text=True)
    if res.returncode != 0:
        if quiet:
            sys.stderr.write(res.stdout + res.stderr)
        sys.exit(f"error: {Path(cmd[0]).name} exited with {res.returncode}")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--parts", action="store_true", help="also build one PDF per part")
    ap.add_argument("--only", metavar="PREFIX", help="build only the part folder starting with PREFIX")
    ap.add_argument("--html", action="store_true", help="stop after producing HTML")
    args = ap.parse_args()

    if not shutil.which("pandoc"):
        sys.exit("error: pandoc not found (try `nix develop` first)")
    chrome = None if args.html else find_chrome()

    parts = discover()
    stage_assets()

    # Chapter numbering offsets so per-part PDFs keep book-wide numbers.
    offsets, n = {}, 0
    ioffsets, k = {}, 0
    for p in parts:
        offsets[p.key] = n
        ioffsets[p.key] = k
        k += sum(interlude_count(f) for f in p.files)
        if not p.title.startswith("Part 0"):  # workshop chapters are unnumbered
            n += sum(chapter_count(f) for f in p.files)

    jobs: list[tuple[str, list[Path], str | None, int, int]] = []
    if args.only:
        sel = [p for p in parts if p.key.startswith(args.only)]
        if not sel:
            sys.exit(f"error: no part folder starts with {args.only!r}")
        for p in sel:
            jobs.append((f"{SLUG}-{p.key}", p.files, p.title, offsets[p.key], ioffsets[p.key]))
    else:
        jobs.append((SLUG, [f for p in parts for f in p.files], None, 0, 0))
        if args.parts:
            for p in parts:
                jobs.append((f"{SLUG}-{p.key}", p.files, p.title, offsets[p.key], ioffsets[p.key]))

    for name, files, volume, offset, ioffset in jobs:
        print(f"• {name}: {len(files)} file(s)")
        html = BUILD / f"{name}.html"
        pandoc(files, html, volume=volume, offset=offset, interludes=ioffset)
        if chrome:
            print_pdf(chrome, html, DIST / f"{name}.pdf")
        else:
            print(f"  ✓ {html.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
