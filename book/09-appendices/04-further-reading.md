# Appendix D: Further reading

This book deliberately covers a path through Rust rather than all of it. These
are the resources we'd point you to next, grouped by what you want to get better
at.

## Rust itself

- ***The Rust Programming Language*** (Klabnik, Nichols and contributors), "the
  book", free at doc.rust-lang.org/book. The canonical tour of the language; read
  it alongside Part I for a second explanation of anything that didn't click.
- ***Rust for Rustaceans*** (Jon Gjengset). The best next step once you're
  comfortable: API design, trait coherence, variance, unsafe, async internals.
- ***Programming Rust*** (Blandy, Orendorff and Tindall). Thorough and precise,
  especially on ownership, traits and concurrency.
- ***The Rustonomicon***, free online. What `unsafe` really means. You won't need
  it for anything in this book; read it when you're curious about what's under
  the floor.
- ***Rust API Guidelines***, free online. Conventions for naming, conversions,
  documentation and error types in public APIs.
- ***Rust by Example*** and **Rustlings**: short, runnable drills, good for
  building muscle memory.

## Types, functional design and domain modelling

- ***Domain Modeling Made Functional*** (Scott Wlaschin). Written in F#, but the
  closest book in spirit to this one: making illegal states unrepresentable,
  workflows as pipelines, errors as values. Almost everything translates directly
  to Rust.
- Scott Wlaschin's essays and talks at fsharpforfunandprofit.com, especially
  *Designing with Types* and *Railway Oriented Programming*.
- ***Parse, Don't Validate*** (Alexis King), an essay. The clearest statement of
  the idea behind every smart constructor in this book.
- ***Functional Core, Imperative Shell***: Gary Bernhardt's *Boundaries* talk and
  his screencast of the same name.
- ***Domain-Driven Design*** (Eric Evans) and ***Implementing Domain-Driven
  Design*** (Vaughn Vernon). The source of ubiquitous language, value objects,
  aggregates and anti-corruption layers. Heavy going; the first four chapters of
  Evans repay the effort.
- ***Algebra-Driven Design*** (Sandy Maguire). Designing APIs from laws, which
  pairs well with property-based testing.
- ***Type-Driven Development with Idris*** (Edwin Brady). Takes "the compiler as
  design partner" much further than Rust can, and is illuminating for that reason.

## Haskell and type-level design

- ***Thinking with Types*** (Sandy Maguire). Type-level programming in Haskell:
  kinds, data kinds, type families, GADTs, existentials. The book behind most of
  Chapter 30's ideas.
- ***Theorems for Free!*** (Philip Wadler, 1989), the paper on parametricity, and
  ***Propositions as Types*** (Wadler, 2015), the most readable account of
  Curry–Howard (Chapter 29).
- ***Ghosts of Departed Proofs*** (Matt Noonan, 2018). Proof tokens and
  unforgeable evidence in an ordinary language, closely related to Chapter 30's
  approach.
- ***Haskell Programming from First Principles*** (Allen and Moronuki) if you
  want to learn Haskell itself properly.
- ***Types and Programming Languages*** (Benjamin Pierce). The textbook on type
  systems, for when you want the theory underneath.
- ***GhostCell: Separating Permissions from Data in Rust*** (Yanovski et al.,
  ICFP 2021). Branded lifetimes, Rust's answer to `runST`.

## Verification beyond types

- ***The LiquidHaskell documentation and tutorial*** (ucsd-progsys.github.io).
  Refinement types in practice.
- ***The Kani Rust Verifier*** book (model-checking.github.io/kani), and the
  documentation for **Verus**, **Flux**, **Prusti** and **Creusot**: the Rust
  verifiers surveyed in Chapter 31.
- ***Theorem Proving in Lean 4*** and ***Functional Programming in Lean***, both
  free at lean-lang.org. Where to go after Chapter 31's proofs.
- **Aeneas** and **hax**: tools that translate Rust into Lean, F* or Coq/Rocq
  so proofs are about the real code rather than a hand-written model, which
  narrows the gap Chapter 31 describes.
- ***Software Foundations*** (Pierce et al.), free online. Logic, proof and
  programming-language semantics, in Coq/Rocq; slow and wonderful.

## TLA+ and formal methods

- ***The TLA+ Video Course*** (Leslie Lamport), free at lamport.azurewebsites.net.
  The best place to go after the interludes, from the person who invented it.
- ***Specifying Systems*** (Leslie Lamport), free online. The reference book
  for TLA+; Part I is a readable tutorial, the rest is the language manual.
- ***Learn TLA+*** (Hillel Wayne), free at learntla.com, and his book
  ***Practical TLA+***. Pragmatic, PlusCal-first, and full of the kind of
  real-world modelling the interludes do.
- ***A PlusCal User's Manual*** (Leslie Lamport): the definitive description of
  PlusCal and its translation.
- ***How Amazon Web Services Uses Formal Methods*** (Newcombe et al.,
  *Communications of the ACM*, 2015). The paper that convinced a generation of
  engineers that TLA+ pays for itself on real systems.
- The **TLA+ Examples** repository (github.com/tlaplus/Examples): dozens of
  specs, from Paxos to tiny puzzles, to read and adapt.

## Specific topics from the projects

- **Event sourcing** (Part III): Greg Young's talks and writing on CQRS and event
  sourcing; Jérémie Chassaing's *Functional Event Sourcing Decider* pattern, the
  `decide` / `evolve` shape used in Chapter 15.
- **Leptos** (Part IV): the official Leptos book at book.leptos.dev; the
  *Elm Architecture* guide at guide.elm-lang.org for the reducer idea.
- **Plain-text accounting** (Part V): plaintextaccounting.org, and the manuals for
  hledger and Beancount, which explain double-entry better than most accounting
  textbooks.
- **Parsing** (Part VI): the `winnow` tutorial in its documentation; Bob
  Nystrom's ***Crafting Interpreters***, free online, for everything about ASTs,
  precedence and evaluation.
- **Async and concurrency** (Part VII): the Tokio tutorial at tokio.rs; Alice
  Ryhl's essay *Actors with Tokio*, which the design in Chapter 27 owes a lot to;
  Mara Bos's ***Rust Atomics and Locks***, for what sits underneath `Mutex` and
  channels.
- **Nix** (Part II): ***nix.dev***, the NixOS manual's chapter on writing modules,
  and the `systemd.exec(5)` man page for the hardening options used in
  Chapter 12.

## Keeping up

- **This Week in Rust**, a weekly newsletter.
- The **Rust blog** (blog.rust-lang.org) for release notes; each six-weekly
  release usually has something worth knowing.
- **clippy's lint list**. Reading the lints is a surprisingly good way to learn
  idioms.
