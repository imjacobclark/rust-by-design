# Rust by Design

*Types, functions and domains: learning Rust by building real software.*

A multi-part guide to Rust. It starts by building a Nix + zsh + tmux + Neovim
workshop, then teaches the language through six real applications, with a
strong emphasis on **type-driven development**, **functional design patterns**
and **domain-driven design**. Code is never
dumped; each chapter starts from a problem and builds up to the solution the way
a programmer actually would.

## What's inside

| Part | Folder | What you build |
|---|---|---|
| Preface | `book/00-front` | |
| 0. Your Workshop | `book/00-workshop` | Nix dev shells + home-manager, zsh, tmux, Neovim with rust-analyzer |
| I. Thinking in Types | `book/01-foundations` | Small focused programs |
| II. Cloudflare DDNS daemon | `book/02-ddns` | Keeps DNS pointed at your home IP; NixOS module |
| III. `tdo` | `book/03-todo` | Event-sourced CLI to-do list |
| IV. `netdash` | `book/04-netdash` | Live network ingress/egress dashboard (Leptos) |
| V. `ledger` | `book/05-ledger` | Double-entry bookkeeping engine |
| VI. `logq` | `book/06-logq` | Streaming log query language |
| VII. `linkcheck` | `book/07-linkcheck` | Concurrent link checker (actors) |
| VIII. Types as Proofs | `book/08-proofs` | A payment core: Haskell-style type-level design in Rust, refinement types, proofs |
| Appendices | `book/09-appendices` | Pattern catalogue, syntax reference, pipeline, reading |

Woven through the parts is a **TLA+ strand**: six interludes that teach TLA+
and the TLC model checker from scratch by modelling the systems the book
builds.

There's no finished code in the repository: the reader builds every project
by following the chapters.

## Build the PDF

```sh
nix develop        # or install pandoc >= 3.1, python3 and Chrome yourself
make pdf           # -> dist/rust-by-design.pdf
make parts         # also one PDF per part
make html          # HTML only, for quick previews
```

The pipeline is Markdown → pandoc (with a Lua filter and a custom syntax theme)
→ HTML → headless Chrome → PDF. Mermaid diagrams are drawn by mermaid.js at
print time. See *Appendix C* (`book/09-appendices/03-building-this-book.md`)
for details.

## Contributing / writing

`AUTHORING.md` is the style guide: teaching approach, Markdown conventions
(callouts, filename tabs, diagrams), the pattern catalogue, and a pre-flight
checklist for chapters.
