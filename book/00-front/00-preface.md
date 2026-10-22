# Preface

Most Rust books teach the language first and design later, if at all. You learn
what a `struct` is, then an `enum`, then a trait, and somewhere around chapter
twelve you're shown a program that uses them together. This book runs the other
way round. It starts from problems: real programs you'd want to run on your own
machines. Each Rust feature appears at the moment a design problem demands it.

The thesis is simple. **Rust rewards a particular way of thinking.** Model your
domain with precise types, keep your decisions in pure functions, and push every
side effect to the edge of the program. Then the borrow checker, the type system
and the compiler's exhaustiveness checks stop feeling like obstacles and start
doing real design work for you. Fight that grain and Rust is a hard language.
Go with it and Rust is one of the most productive languages there is for software
that has to keep working.

## Who this book is for

You're a working programmer. You're comfortable in at least one language
(TypeScript, Python, Go, Java, C#, Kotlin, Swift) and you've shipped code that
other people depend on. You may have tried Rust and bounced off the borrow
checker, or you may be starting fresh.

You don't need a background in functional programming or domain-driven design.
Both are introduced from scratch, through code, and named as we go. If you
*do* know Haskell, F# or OCaml, you'll recognise a lot. Rust is closer to that
family than its C-like syntax suggests.

## The three ideas

Every chapter comes back to the same three moves:

1. **Types first.** Before writing logic, decide what is true about your data and
   write it down as types. A `DnsName` is not a `String`. A transaction that
   doesn't balance is not a `Transaction`. An AAAA record cannot hold an IPv4
   address. When those statements are types, the compiler enforces them
   everywhere, forever, for free.
2. **A pure core.** The interesting decisions (should we update this DNS record?
   what does this command do to the to-do list? what's the balance of this
   account?) are ordinary functions from values to values. They don't read
   files, call APIs or look at the clock. That makes them trivial to test and
   easy to change.
3. **Effects at the edges.** Networking, disk, time and randomness live in a
   thin outer shell that gathers inputs, calls the core and carries out its
   decisions. The shell is boring on purpose.

On top of those sit a set of named patterns, nearly sixty of them, from
*Newtype* and *Make Illegal States Unrepresentable* to *Event Sourcing*,
*Interpreter* and *Actor*. Each is introduced in a highlighted box the first
time it appears, and Appendix A collects them all with pointers back to where
they're used.

## The workshop

Before any Rust, Part 0 sets up a development environment worth working in:
**Nix** for reproducible toolchains and per-project dev shells, **zsh** as a
shell that helps rather than hinders, **tmux** for persistent workspaces, and
**Neovim** wired to rust-analyzer so the compiler talks to you as you type. It's
all declared in one dotfiles flake with home-manager, so the whole workshop can
be rebuilt on a new machine with one command. If you already have a setup you
love, skim it or skip it. The rest of the book doesn't depend on your editor.

## The projects

After the workshop and a short foundations part, the book is six projects. Each
is a real, runnable program that you build yourself, chapter by chapter.

| Part | Project | What you'll build | Where the design focus is |
|---|---|---|---|
| 0 | *workshop* | A dotfiles flake: Nix, zsh, tmux, Neovim | Reproducible, declarative, typed configuration |
| I | *foundations* | Small programs, one idea at a time | Ownership, ADTs, errors, traits, iterators, modules, the type-driven workflow |
| II | `cf-ddns` | A daemon that keeps Cloudflare DNS records pointed at your changing home IP, packaged as a NixOS module | Value objects, functional core, ports and adapters, anti-corruption layers, typed config from Nix to Rust |
| III | `tdo` | A command-line to-do list with undo and history | Commands as data, typestate, event sourcing, repositories |
| IV | `netdash` | A live web dashboard of network traffic per interface, built with Leptos | Units of measure, immutable snapshots, reactive state, the Elm architecture |
| V | `ledger` | A double-entry bookkeeping engine and CLI | Money types, phantom types, aggregates and invariants, reports as folds |
| VI | `logq` | A fast streaming log query tool with its own query language | Lifetimes and zero-copy parsing, parser combinators, interpreters, streaming aggregation |
| VII | `linkcheck` | A concurrent website link checker | `Send` and `Sync`, actors, backpressure, structured cancellation |

The projects get harder as you go, and later parts assume the earlier ones.

## The TLA+ strand

Types make whole classes of wrong *values* impossible, and tests check the
executions you thought of. Neither is good at the questions that make
concurrent and long-running systems hard: what if these two things happen in
the other order? What if we crash *here*? Does this *always eventually*
finish? For those, the book weaves in a second strand: **TLA+**, Leslie
Lamport's language for describing systems as state machines, and **TLC**, the
model checker that explores every behaviour of a small model of them.

It arrives as six short **TLA+ interludes**, one at the end of most parts,
each modelling the system that part just built: the thermostat from Part I,
the DNS reconciler, the event log, the snapshot channel, concurrent postings
to a ledger, and the crawler's coordinator. You need no prior knowledge;
the first interlude starts from zero, and each one adds a few ideas. Every
interlude has the model checker find something real. The interludes are
optional if you only want Rust, but they're where the book's design
instincts get checked rather than argued for.
Each part is still self-contained enough to dip into if you're after one topic.

## How the chapters work

Rather than presenting finished code, each chapter builds it up the way you'd
actually write it. We start with a concrete situation, try the obvious approach,
and find where it cracks: a bug, an ambiguity, or a compiler error. The crack is
what motivates the Rust feature or design pattern that fixes it. Code arrives in
small pieces, each with a reason.

That means you'll see wrong code on purpose. Code marked `// does not compile`
is there to show you a real compiler error and teach you to read it. Rust's
error messages are among the best of any language, and learning to read them
calmly is the most transferable Rust skill there is.

There's no finished code to copy. The book is the source. Type the code
yourself, in your own project, as you go; the snippets are complete enough that
each step compiles, and `[!CHECKPOINT]` boxes tell you which tests should pass
before you move on. Getting stuck, reading the error, and getting unstuck is
most of what learning Rust is.

## Conventions

Code blocks with a filename tab show where code lives:

```rust
// file: src/domain/ip.rs
pub struct ZoneId(String);
```

Commands you run look like this:

```sh
cargo test
```

and their output, or compiler errors, like this:

```text
test result: ok. 12 passed; 0 failed
```

Highlighted boxes mark things worth pausing on:

> [!PATTERN] Pattern name
> A named design pattern, introduced for the first time.

> [!NOTE]
> Background, or what's going on under the hood.

> [!TIP]
> Practical advice about tools and idioms.

> [!WARNING]
> A common mistake or footgun.

> [!EXERCISE] Something to try
> Exercises appear throughout and at the end of every chapter. They're where the
> learning sticks, so do at least one per chapter.

> [!CHECKPOINT]
> Where your project should be, and which tests should pass, before moving on.

## Tools and versions

The book targets **Rust 1.98 or later, edition 2024**. The repository includes a Nix flake
that provides the exact toolchain, plus everything needed to build this book, so

```sh
nix develop
```

is all the setup you need to build the book. Part 0 shows you how to give each
of your own projects a dev shell like it, and Chapter 1 covers installing with
`rustup` instead if you don't use Nix. Where a crate version matters, the
chapter says which version it was written against.

## Building the PDF

The book is written in Markdown under `book/` and built with pandoc and headless
Chrome. Syntax highlighting and Mermaid diagrams are rendered at build time:

```sh
make pdf       # the whole book  -> dist/rust-by-design.pdf
make parts     # plus one PDF per part
```

Appendix C explains how the pipeline works if you want to change it.
