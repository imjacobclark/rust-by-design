# Authoring guide — *Rust by Design*

This file is the single source of truth for how the book is written. Every chapter
must follow it. Read it fully before writing or editing a chapter, and read
`book/01-foundations/01-the-design-mindset.md` as the reference for tone.

## 1. What this book is

A guide to Rust taught through **six real applications**, with a strong emphasis on:

- **Type-driven development**: design the types first, let the compiler guide the
  implementation, encode rules in types so wrong code doesn't compile.
- **Functional design**: pure functions, immutable values, expressions over
  statements, sum types, folds and iterator pipelines, *functional core /
  imperative shell*.
- **Domain-driven design**: ubiquitous language, value objects, aggregates and
  invariants, anti-corruption layers, ports and adapters.

The reader is a working programmer (comfortable with *some* language: TypeScript,
Python, Go, Java, C#) who is new or newish to Rust.

## 2. The golden rule: build up, never dump

**Never drop a large block of finished code on the reader.** We teach the way a
programmer actually solves problems:

1. **Start with the problem**, in plain words, ideally a concrete scenario
   ("At 03:12 your ISP hands you a new IP address...").
2. **Name the domain**: what are the nouns and verbs? What can go wrong?
3. **Try the obvious thing first**: a naive version, often stringly typed or
   with `bool` flags.
4. **Find the crack**: show the bug, ambiguity or compiler error the naive
   version invites. Show compiler errors verbatim in a ` ```text ` block. They must be
   real (produced by rustc 1.98 or later, edition 2024); trim paths and noise only.
5. **Refine with types**: introduce the Rust feature or pattern that closes the
   crack, *at the moment it's needed*.
6. **Consolidate**: name the pattern (a `> [!PATTERN]` callout), then move on.

Snippets are small: **typically 5–25 lines, hard ceiling ~40**. Use `// ...` to
elide code the reader has already seen. When a file grows across a chapter, show
only what changes. Each snippet is introduced by prose that says *why* we're
about to write it, and followed by prose that explains what is interesting
about it. Don't narrate line by line; point at the one or two ideas that matter.

Every chapter should leave the reader able to answer "why is it shaped like
this?", not just "what does it do?".

## 3. Voice and spelling

- **British English** in prose (behaviour, colour, organise, modelling,
  licence (noun)). Code identifiers follow Rust ecosystem conventions.
- First person plural: "we", "let's". Direct, warm, a little dry. No hype,
  no emoji, no exclamation marks in prose.
- Prefer short paragraphs. Use headings (`##`, `###`) generously: they become
  the PDF's numbered sections and the contents page shows `##`.
- Explain jargon the first time it appears (e.g. *monomorphisation*, *sum type*).
- Comparisons to other languages are welcome when they illuminate ("In
  TypeScript you'd reach for a discriminated union; Rust's `enum` is that,
  but checked exhaustively").

## 4. Markdown conventions (the PDF pipeline depends on these)

Each chapter is one file that starts with exactly one `# Title` (an h1). Do
**not** number chapters yourself; the pipeline does. Sections are `##`,
subsections `###`. Don't use `#` anywhere else (except inside code blocks).

Part files (`00-part.md`) contain only:

```markdown
# Part II: The Cloudflare DDNS Daemon

*One italic paragraph (2–3 sentences) saying what we build and what we learn.*
```

Appendices start with `# Appendix A: Title`.

### Code blocks

- Always tag the language: `rust`, `toml`, `nix`, `sh`, `text`, `json`, `diff`, `ini`, `lua`, `tla`, `lean`, `haskell`, `sql`.
- To show a filename tab, make the **first line** a comment
  `// file: src/domain/ip.rs` (or `# file: Cargo.toml` / `# file: flake.nix`).
  The pipeline strips that line and renders a tab. Use it whenever the reader
  should put code in a specific file.
- ` ```sh ` for commands the reader runs. Don't prefix with `$`.
- ` ```text ` for program output and compiler errors.
- Keep code lines ≤ 80 columns. The PDF wraps longer lines, but it's ugly.
  Real program output may run slightly over; don't falsify it to fit.
- Code that intentionally does **not** compile: first line
  `// does not compile` (after any `// file:` line), then show the
  real error in a ` ```text ` block straight after.

### Callouts

GitHub alert syntax, with an optional title on the marker line:

```markdown
> [!PATTERN] Newtype
> Wrap a primitive in a single-field struct so the compiler can tell apart
> values that share a representation but not a meaning.
```

Kinds and when to use them:

| Kind | Use for |
|---|---|
| `[!PATTERN] Name` | The **first** time a catalogue pattern (section 7) is introduced. 3–6 lines: what it is, when to use it, the Rust mechanism. Use the exact catalogue name. |
| `[!NOTE]` | Asides, "under the hood", deeper explanations |
| `[!TIP]` | Practical advice, tooling, idioms |
| `[!IMPORTANT]` | A rule the reader must not miss |
| `[!WARNING]` | Footguns, common mistakes |
| `[!CAUTION]` | Things that can lose data or cause security problems |
| `[!EXERCISE] Title` | End-of-chapter or mid-chapter exercises (2–4 per chapter) |
| `[!CHECKPOINT]` | "Your project should now look like this / tests should pass". Use after major milestones; may contain a `sh` block with `cargo test` and its expected output |

### Diagrams

Use ` ```mermaid ` blocks where a picture beats prose: architecture (ports and
adapters), state machines (`stateDiagram-v2`), data flow (`flowchart LR`),
interactions (`sequenceDiagram`), type relationships (`classDiagram`).
Aim for 1–3 per chapter, kept small (≤ ~12 nodes). Every diagram is introduced
by a sentence. Do not use mermaid `%%{init}%%` theme overrides.

Diagrams are scaled to the page width, so **wide diagrams become unreadably
small**. Prefer `flowchart TB` (top to bottom); use `LR` only when the longest
left-to-right chain is 4 nodes or fewer. Keep labels short (≤ ~4 words), quote
labels containing punctuation (`A["parse (pure)"]`), and avoid HTML entities.
Never start a label with `1. ` / `- ` etc. (mermaid renders it as
"Unsupported markdown: list"). To stack two subgraphs vertically rather than
side by side, link them with an invisible edge (`A ~~~ B`) and give each
`direction TB`. Avoid self-loop transitions in `stateDiagram-v2`; their labels
render confusingly, so describe them in prose.

### Chapter skeleton

```markdown
# Chapter title

Opening: 2–4 paragraphs. A concrete problem or scene, and what this chapter
will give the reader.

## ...sections that build up the solution...

## What we learned            <- always present, always this heading
A short bullet list: the Rust features and design patterns from this chapter,
each with one line on *why it matters*.

## Exercises                  <- always present
> [!EXERCISE] ...
```

Target length: **2,500–5,000 words per chapter** (Part I chapters can run long).

## 5. Code: verified, but not shipped

The repository contains **no finished implementations**. The reader builds
every project themselves by following the chapters, so the chapters must be
complete enough that each step compiles. Writers verify snippets privately in
a scratch crate outside the repository.

Rules:

- Rust **edition 2024**, toolchain rustc 1.98 or later (nixpkgs; it moved to 1.99 during writing, which is fine). Your scratch crate
  should pass `cargo test` and `cargo clippy --all-targets` cleanly.
- Every snippet shown as working code must compile in that scratch crate (minus
  elisions). Intermediate, naive versions must be plausible Rust; anything shown
  as compiling must compile.
- Never refer to a `code/` folder, a "companion crate" or "the finished version
  in the repository". Use `[!CHECKPOINT]` callouts to tell the reader what their
  project should contain and which tests should pass.
- Prefer these crate versions (resolve exact patch versions with cargo):
  `tokio 1`, `reqwest 0.13` (rustls), `serde 1`, `serde_json 1`, `toml 1`,
  `thiserror 2`, `anyhow 1`, `clap 4` (derive), `tracing 0.1`,
  `tracing-subscriber 0.3`, `proptest 1`, `winnow 1`, `sysinfo 0.39`,
  `jiff 0.2`, `directories 6`, `tokio-util 0.7`, `url 2`, `secrecy 0.10`,
  `axum 0.8`, `leptos 0.8` (latest stable 0.8.x, *not* 0.9 RCs), `futures 0.3`.
  Show the reader the `Cargo.toml` `[dependencies]` they need as each one is
  introduced.
- Error handling convention used throughout the book: **domain and library
  code returns typed error enums (`thiserror`)**; only `main` / the outermost
  shell uses `anyhow` for reporting.
- Async: native `async fn` in traits (no `async-trait` crate) where possible.
  Mention the `Send` bound wrinkle when it matters.

## 6. The outline

Folders under `book/` are parts; files are chapters; order is lexical.
Chapter numbers below are the book-wide numbers the pipeline will assign.

### `00-front`
- `00-preface.md`: **Preface** (unnumbered): who it's for, the philosophy, the
  six projects, how to read, conventions, building the PDF.

### `00-workshop`: Part 0: Your Workshop (unnumbered chapters, shown as "Workshop 1–5")
- `00-part.md`
- `01-nix.md`: Nix, flakes, per-project Rust dev shells, direnv, home-manager
- `02-zsh.md`: zsh via home-manager (completion, starship, fzf, zoxide, direnv)
- `03-tmux.md`: tmux config, a Rust layout, a sessionizer script
- `04-neovim.md`: Neovim via home-manager; treesitter, rustaceanvim + rust-analyzer, completion, formatting, debugging
- `05-the-daily-loop.md`: the type-driven workflow in the finished workshop

### `01-foundations`: Part I: Thinking in Types
- `00-part.md`
- `01-the-design-mindset.md`: **Ch 1 The design mindset**: programs as
  transformations of well-typed data; a tiny end-to-end example (parsing a
  temperature reading) done naively, then type-first; functional core /
  imperative shell introduced; toolchain via Nix; `cargo new`, `run`, `test`.
- `02-ownership.md`: **Ch 2 Ownership as a design tool**: values, moves,
  borrowing, `&` vs `&mut` as "many readers XOR one writer", lifetimes as
  *relationships*; why this makes pure functions natural; `Clone` as an
  explicit cost; `String` vs `&str`; slices. Problem-led (e.g. a function that
  summarises a list of readings, then a second caller wants the list back).
- `03-modelling-with-types.md`: **Ch 3 Modelling with types**: structs, enums,
  `match`; algebraic data types (product × sum); making illegal states
  unrepresentable; `Option`; newtypes; exhaustiveness as a refactoring tool.
  Running example: modelling an order/payment or connection lifecycle,
  naive `bool`s/`Option`s first.
- `04-errors-as-values.md`: **Ch 4 Errors are values**: `Result`, `?`, error
  enums, `From` conversions, `thiserror` vs `anyhow`, `panic!` as a bug, not an
  error; *parse, don't validate* with `TryFrom` smart constructors.
- `05-traits-and-generics.md`: **Ch 5 Traits and generics**: behaviour as
  contracts; generics + trait bounds; static vs dynamic dispatch (`impl Trait`,
  `dyn Trait`); standard traits (`Debug`, `Display`, `Clone`, `PartialEq`,
  `Ord`, `Hash`, `Default`, `From`/`TryFrom`, `FromStr`); derive; associated
  types; extension traits; traits as typeclasses; traits as ports (preview).
- `06-closures-and-iterators.md`: **Ch 6 Closures and iterators**: closures and
  capture (`Fn`/`FnMut`/`FnOnce`), higher-order functions, the `Iterator`
  trait, laziness, adaptors, `fold`, collecting into `Result`/`HashMap`,
  writing an iterator, iterator pipelines as the functional workhorse.
- `07-modules-tests-workflow.md`: **Ch 7 Modules, tests and the type-driven
  workflow**: modules and visibility as *encapsulation of invariants*
  (private fields make smart constructors mandatory); crates and workspaces;
  unit, integration, doc and property tests (`proptest`); `todo!()`-driven
  design; clippy and rustfmt; reading compiler errors.

### `02-ddns`: Part II: Project: A Cloudflare Dynamic DNS Daemon
- `00-part.md`
- `01-understanding-the-domain.md`: **Ch 8**: the problem; ubiquitous language
  (zone, record, observed address, desired state); value objects (`ZoneId`,
  `RecordId`, `DnsName`, `ApiToken` with redacted `Debug`); `std::net::IpAddr`
  / `Ipv4Addr`; configuration as raw DTO (`serde`, TOML) → validated `Config`
  via `TryFrom`.
- `02-the-functional-core.md`: **Ch 9**: the pure decision: given what we
  observed and what Cloudflare says, produce a `Plan` (enum); table-driven and
  property tests; no I/O anywhere.
- `03-ports-and-adapters.md`: **Ch 10**: traits for `IpSource` and
  `DnsProvider`; async fn in traits; `reqwest` adapters; Cloudflare API DTOs and
  an **anti-corruption layer**; fakes for tests; multiple IP sources with
  fallback (combinators over sources).
- `04-the-daemon.md`: **Ch 11**: the imperative shell: `tokio` loop,
  backoff schedule as a pure iterator, transient vs fatal errors as types,
  `tracing`, graceful shutdown (SIGTERM), CLI (`--once`, `--dry-run`,
  `--config`).
- `05-shipping-on-nix.md`: **Ch 12**: flake with `rustPlatform.buildRustPackage`,
  a NixOS module (typed options → generated TOML), systemd unit with
  hardening, secrets via `LoadCredential`/`EnvironmentFile`; installing on a
  NixOS host; brief note for non-NixOS (nix profile / systemd user unit).

### `03-todo`: Part III: Project: `tdo`, a command-line to-do list
- `00-part.md`
- `01-commands-as-data.md`: **Ch 13**: `clap` derive; the CLI layer parses
  into a *domain* `Command` enum (separate from clap structs); `Display`.
- `02-modelling-tasks.md`: **Ch 14**: `TaskId`, `Title` (non-empty, trimmed),
  `Priority`, due dates (`jiff`), `Status`; typestate explored
  (`Task<Open>` / `Task<Done>`) and its trade-offs vs an enum when tasks live
  in a collection and on disk.
- `03-event-sourcing.md`: **Ch 15**: commands vs events; pure
  `decide(&State, Command) -> Result<Vec<Event>, DomainError>` and
  `evolve(State, &Event) -> State`; rebuilding state by `fold`; undo and
  history for free.
- `04-persistence-and-the-shell.md`: **Ch 16**: `EventStore` trait; JSON-lines
  file store with atomic writes; XDG paths (`directories`); rendering output;
  integration tests over the binary; `proptest` for replay invariants.

### `04-netdash`: Part IV: Project: `netdash`, a live network dashboard with Leptos
- `00-part.md`
- `01-measuring-the-network.md`: **Ch 17**: counters vs rates; units of
  measure as newtypes (`Bytes`, `BytesPerSecond`, `InterfaceName`); counter
  resets/wraparound; pure `rate(prev, next, elapsed)`; reading interfaces via
  `sysinfo` behind a trait.
- `02-the-sampling-engine.md`: **Ch 18**: time series in a bounded ring buffer;
  sharing **immutable snapshots** (`Arc`) via `tokio::sync::watch`; why this
  beats a big `Mutex`; testability with a fake clock/source.
- `03-leptos-from-first-principles.md`: **Ch 19**: Leptos components as
  functions; signals, derived signals and memos as pure functions of state;
  `view!`; SSR + hydration; server functions; shared domain types between
  server and browser via cargo features (`ssr`, `hydrate`).
- `04-the-live-dashboard.md`: **Ch 20**: streaming snapshots to the browser
  (Server-Sent Events via axum); a client-side reducer; sparklines as SVG paths
  computed by pure functions; human-readable unit formatting; building with
  `cargo leptos`; running it under Nix.

### `05-ledger`: Part V: Project: `ledger`, double-entry bookkeeping
- `00-part.md`
- `01-money-is-not-a-float.md`: **Ch 21**: why `f64` fails; minor units;
  `Currency`; phantom types for compile-time currency vs runtime currency
  (and when to choose each); operator overloading (`Add`, `Neg`, `Sum`);
  checked arithmetic.
- `02-transactions-that-must-balance.md`: **Ch 22**: `AccountName` (hierarchical
  newtype), `Posting`, the `Transaction` **aggregate** whose constructor
  enforces "sums to zero per currency"; non-empty collections; the builder
  pattern (and a typestate builder).
- `03-reports-as-folds.md`: **Ch 23**: balances, trial balance, register
  reports as folds over the journal; `BTreeMap` for ordered output; date
  ranges; a small plain-text journal reader; property tests ("every journal
  sums to zero").

### `06-logq`: Part VI: Project: `logq`, a streaming log query tool
- `00-part.md`
- `01-parsing-is-design.md`: **Ch 24**: log lines as borrowed data
  (`LogLine<'a>`), lifetimes in domain types, `winnow` parser combinators built
  up from tiny parsers; errors with context.
- `02-a-tiny-query-language.md`: **Ch 25**: a query DSL (`level >= warn and
  msg ~ "timeout"`); AST as a recursive enum (`Box`); parsing it; evaluation as
  a recursive pure function (**interpreter** pattern); simplification as an
  AST → AST transformation; `Display` for round-tripping.
- `03-streaming-and-aggregation.md`: **Ch 26**: streaming stdin with
  `BufRead`; zero-copy where possible; `Cow`; aggregations (`count by`) as
  folds; output formats; quick performance notes.

### `07-linkcheck`: Part VII: Project: `linkcheck`, a concurrent link checker
- `00-part.md`
- `01-concurrency-with-actors.md`: **Ch 27**: `Send`/`Sync` explained through
  the compiler; threads vs async; the actor pattern with `tokio::mpsc`; the
  crawl frontier as a **pure state machine** fed by messages; `Url` handling.
- `02-backpressure-and-cancellation.md`: **Ch 28**: bounded channels,
  `Semaphore`, `JoinSet`, `CancellationToken`, timeouts; per-host politeness;
  reporting; testing with a fake fetcher.

### `08-proofs`: Part VIII: Types as Proofs (the `pay` payment core)
Inspired by Haskell's type system (source notes: Haskell article supplied by the
user). Each chapter shows the Haskell idea briefly, then what Rust can and can't
express, honestly.
- `00-part.md`
- `01-types-as-propositions.md`: **Ch 29**: the algebra of types (cardinality,
  `Option` = 1 + T, functions as exponentials, zippers as derivatives in a
  note); Curry–Howard (tuples ∧, enums ∨, `fn` →, `!`/`Infallible`/empty enums
  ⊥, `match v {}`); why Rust isn't a proof system (`loop`, `panic!`, `todo!`);
  kinds and the missing higher-kinded types (GATs as a partial answer);
  `map`/`and_then`/`?` as functor and monad; laws checked with `proptest`.
- `02-state-machines-in-the-type-system.md`: **Ch 30**: payments
  `Created → Authorised → Captured → Refunded`; sealed state traits; associated
  types as type families (`S::Evidence`); allowed transitions as trait impls;
  proof tokens (unforgeable evidence types); existential packaging revisited;
  const generics for sized data; an indexed protocol type
  (`Program<From, To, Out>`); branded scopes; affine vs linear.
- `03-beyond-the-type-checker.md`: **Ch 31**: refinement types (the
  LiquidHaskell idea) and Rust's verifiers (Kani, Flux, Prusti, Creusot, Verus);
  structural induction; machine-checked proofs in Lean 4; the double refund that
  types can't prevent (TLA+); the assurance ladder.
- `04-afterword.md`: **Afterword** (moved here from Part VII).

### Haskell ideas woven into earlier chapters
Short additions (500–1,500 words each), fitted into the existing flow:
Ch 2 (affine vs linear), Ch 3 (counting states algebraically), Ch 4
(applicative validation), Ch 5 (parametricity and free theorems), Ch 10
(capabilities vs effect rows), Ch 14 (existential packaging), Ch 26
(`thread::scope` as Rust's `runST`).

### `09-appendices`
- `01-pattern-catalogue.md`: **Appendix A: Pattern catalogue**
- `02-syntax-quick-reference.md`: **Appendix B: Rust syntax quick reference**
- `03-building-this-book.md`: **Appendix C: Building this book**
- `04-further-reading.md`: **Appendix D: Further reading**

## 6a. The TLA+ strand (interludes)

Woven through the book is a second strand that teaches **TLA+** (Leslie
Lamport's language for specifying systems as state machines, and its model
checker TLC) **from scratch**. It assumes the reader has never seen TLA+.

It's delivered as **interludes**: one unnumbered chapter at the end of a part,
modelling the system that part just built. An interlude's heading is
`# Interlude: Title`; the pipeline renders it as "TLA+ Interlude N" and keeps
book chapter numbers unchanged. Interludes are optional reading for the Rust
strand, but the TLA+ strand is cumulative: each interlude assumes the
previous ones.

### Placement and concept progression

Introduce **only** the listed concepts in each interlude (plus anything
trivially needed), and explain each one the first time it's used. Later
interludes refer back ("as in Interlude 2") rather than re-teach.

| # | File | Title | Models | New TLA+ concepts |
|---|---|---|---|---|
| 1 | `01-foundations/08-interlude-thinking-in-states.md` | Thinking in states | The Ch 7 thermostat | What TLA+ is and isn't; states and behaviours; `VARIABLES`; `Init`, `Next`; primed variables; `/\`, `\/`, `~`, `=>`; `UNCHANGED`; `TypeOK`; invariants; running TLC with a `.cfg`; reading an error trace; state counts; stuttering (briefly). Tooling via Nix. |
| 2 | `02-ddns/06-interlude-will-it-converge.md` | Will it converge? | The DDNS reconcile loop vs a changing ISP and Cloudflare | `CONSTANTS` and model values; sets and `\in`; `\E` to model the environment nondeterministically; abstraction (what to leave out); the `Spec` formula `Init /\ [][Next]_vars`; temporal operators `[]`, `<>`, `~>`, `<>[]`; liveness vs safety; fairness (`WF_vars`); lasso-shaped counterexamples |
| 3 | `03-todo/05-interlude-the-log-is-the-list.md` | The log is the list | tdo's event log and replay | Sequences (`<<>>`, `Append`, `Len`, `SubSeq`); records; functions `[x \in S \|-> e]` and `EXCEPT`; `LET`; `RECURSIVE` operators (replay as a fold); modelling crashes and torn writes; **refinement**: `INSTANCE ... WITH` and checking that the log implements an abstract to-do list |
| 4 | `04-netdash/05-interlude-latest-value-wins.md` | Latest value wins | The watch-channel snapshot engine vs a two-lock design | **PlusCal** from scratch: `--algorithm`, `process`, `self`, labels as units of atomicity, `await`, `either`/`or`, translating with `pcal`, reading the generated TLA+; multiple processes; `fair process` |
| 5 | `05-ledger/04-interlude-money-never-leaks.md` | Money never leaks | Concurrent postings against accounts | Functions as maps (balances); recursive sums over sets; `CHOOSE`; `FiniteSets`; a check-then-act race found by TLC; conservation vs non-negativity invariants; state-space explosion, symmetry sets, small-scope hypothesis |
| 6 | `07-linkcheck/03-interlude-does-the-crawl-finish.md` | Does the crawl finish? | Coordinator, workers, channels | Channels as sequences; **deadlock** checking (a cyclic bounded-channel deadlock TLC finds); termination detection; liveness of the whole crawl; cancellation; correspondence between the Rust `handle(Frontier, Msg)` and the spec's actions (trace validation as an idea) |

Part VI (`logq`) deliberately has no interlude: parsers and pure
transformations are better served by types and property tests, and the
Afterword says so. Interlude 6 sits before the Afterword
(`07-linkcheck/04-afterword.md`).

### How an interlude works

- **Start from a question tests can't answer well**: an interleaving, a crash
  at an awkward moment, "does this *always eventually* happen?". Show why
  example-based tests and `proptest` struggle with it.
- **Build the spec up in small pieces**, exactly like the Rust chapters: a
  first naive spec, run TLC, read what it says, refine. Never dump a whole
  module at once; show it growing, and use `\* ...` to elide.
- **Find something real.** Each interlude should have TLC discover at least
  one genuine problem (in a naive design, in a plausible alternative, or in an
  assumption), and say clearly how the Rust design in the chapters relates to
  it. If TLC finds a real flaw in the book's own Rust design, report it to
  the editor rather than quietly papering over it.
- **Map back to Rust** at the end: which Rust types, functions and tests
  correspond to which parts of the spec, and what the spec checked that the
  Rust tests couldn't (and vice versa: what the types guarantee that the spec
  takes for granted).
- **Be honest about limits**: a spec checks a model, not the code; TLC checks
  finite instances; the gap between spec and implementation is real.

### Conventions

- TLA+ and PlusCal code uses ` ```tla ` fences (the pipeline has a custom
  highlighter for both; PlusCal inside `(* --algorithm ... *)` is highlighted
  as code). First line `\* file: Thermostat.tla` gives a filename tab.
- TLC config files use ` ```text ` with first line `\* file: Thermostat.cfg`.
- TLC output goes in ` ```text ` blocks and must be **real** (from
  `nix shell nixpkgs#tlaplus`, which provides `tlc`, `pcal`, `tlasany`).
  Trim the version banner, timestamps and fingerprint noise only.
- Use mermaid `stateDiagram-v2` for small state spaces and `flowchart TB` for
  traces when they help.
- End with "## What we learned" and "## Exercises" like every chapter.
- Length: 3,500–5,000 words (Interlude 1 may run to 6,000).

## 7. Pattern catalogue (canonical names and where they're introduced)

Use these exact names in `[!PATTERN]` callouts. Introduce each **once**, in the
listed chapter; later chapters refer back in prose ("the *Newtype* pattern
from Chapter 3"). If you need a pattern not on this list, add it here.

| # | Pattern | Introduced |
|---|---|---|
| 1 | Functional Core, Imperative Shell | Ch 1 |
| 2 | Type-Driven Development | Ch 1 |
| 3 | Borrow, Don't Own | Ch 2 |
| 4 | Ownership as Resource Management (RAII) | Ch 2 |
| 5 | Algebraic Data Types | Ch 3 |
| 6 | Make Illegal States Unrepresentable | Ch 3 |
| 7 | Newtype | Ch 3 |
| 8 | Exhaustive Matching | Ch 3 |
| 9 | Errors as Values | Ch 4 |
| 10 | Parse, Don't Validate (Smart Constructor) | Ch 4 |
| 11 | Error Translation at Boundaries | Ch 4 |
| 12 | Traits as Contracts | Ch 5 |
| 13 | Static vs Dynamic Dispatch | Ch 5 |
| 14 | Extension Trait | Ch 5 |
| 15 | Conversion Traits (`From` / `TryFrom` / `FromStr`) | Ch 5 |
| 16 | Higher-Order Functions | Ch 6 |
| 17 | Iterator Pipeline | Ch 6 |
| 18 | Fold (Reduce) | Ch 6 |
| 19 | Encapsulated Invariants (Privacy as Proof) | Ch 7 |
| 20 | Property-Based Testing | Ch 7 |
| 21 | Ubiquitous Language | Ch 8 |
| 22 | Value Object | Ch 8 |
| 23 | Raw DTO → Validated Domain | Ch 8 |
| 24 | Decision as Data (Plan / Command result) | Ch 9 |
| 25 | Ports and Adapters | Ch 10 |
| 26 | Anti-Corruption Layer | Ch 10 |
| 26a | Tolerant Reader (prose only) | Ch 10 |
| 27 | Combinators over Strategies (fallback, retry, decorators) | Ch 10 |
| 28 | Schedule as Iterator (backoff) | Ch 11 |
| 29 | Error Classification by Type (transient vs fatal) | Ch 11 |
| 30 | Typed Configuration at Every Layer (Nix module) | Ch 12 |
| 31 | Parse the Boundary (CLI → Domain Command) | Ch 13 |
| 31a | Command–Query Separation (prose only, Ch 13) | Ch 13 |
| 32 | Typestate | Ch 14 |
| 33 | Event Sourcing (Decide / Evolve) | Ch 15 |
| 34 | Repository (Event Store) | Ch 16 |
| 35 | Units of Measure | Ch 17 |
| 36 | Immutable Snapshots over Shared Mutation | Ch 18 |
| 37 | Reactive Derived State | Ch 19 |
| 38 | Reducer (Elm Architecture) | Ch 20 |
| 39 | Phantom Types | Ch 21 |
| 40 | Aggregate with Invariants | Ch 22 |
| 41 | Builder (and Typestate Builder) | Ch 22 |
| 42 | Report as Fold | Ch 23 |
| 43 | Zero-Copy Borrowed Domain | Ch 24 |
| 44 | Parser Combinators | Ch 24 |
| 45 | Interpreter (AST + Eval) | Ch 25 |
| 46 | Tree Rewriting (Simplifier) | Ch 25 |
| 47 | Streaming Fold / Aggregation | Ch 26 |
| 47a | Monoid (Identity + Associative Combine) (previewed Ch 5, prose only) | Ch 26 |
| 48 | Actor | Ch 27 |
| 49 | Pure State Machine Driven by Messages | Ch 27 |
| 50 | Bounded Concurrency and Backpressure | Ch 28 |
| 51 | Structured Cancellation | Ch 28 |
| 52 | Specification as State Machine | Interlude 1 |
| 53 | Invariants over Behaviours (Safety) | Interlude 1 |
| 54 | Model the Environment as Nondeterminism | Interlude 2 |
| 55 | Liveness and Fairness | Interlude 2 |
| 56 | Refinement Mapping | Interlude 3 |
| 57 | Atomicity by Labels (PlusCal) | Interlude 4 |
| 58 | Small-Scope Model Checking | Interlude 5 |
| 59 | Spec–Code Correspondence | Interlude 6 |
| 60 | Applicative Validation (Accumulate Errors) | Ch 4 |
| 61 | Parametricity (Constraints as Permissions) | Ch 5 |
| 62 | Capabilities, Not Ambient Authority | Ch 10 |
| 63 | Existential Packaging | Ch 14 |
| 64 | Types as Propositions (Curry–Howard) | Ch 29 |
| 65 | Lawful Abstractions (Laws as Properties) | Ch 29 |
| 66 | Type-Level Functions (Associated Types) | Ch 30 |
| 67 | Proof Token (Unforgeable Evidence) | Ch 30 |
| 68 | Sized Types (Const Generics) | Ch 30 |
| 69 | Indexed Protocol (Composable Typestate) | Ch 30 |
| 70 | Branded Scope | Ch 30 |
| 71 | Refinement Types and Verified Contracts | Ch 31 |
| 72 | The Assurance Ladder | Ch 31 |

## 8. Checklist before you call a chapter done

- [ ] Starts with a problem, not a definition.
- [ ] No snippet over ~40 lines; most under 25. No "here's the whole file".
- [ ] Each new Rust feature is motivated by a need in the project.
- [ ] Patterns introduced with `[!PATTERN]` using catalogue names.
- [ ] At least one mermaid diagram where structure or flow matters.
- [ ] Compiler errors shown are real.
- [ ] Snippets verified in a scratch crate; `cargo test` and `cargo clippy --all-targets` pass there.
- [ ] No references to a `code/` folder or companion crate.
- [ ] Ends with *What we learned* and *Exercises*.
- [ ] British spelling in prose.
