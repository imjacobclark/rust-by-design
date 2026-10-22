# Afterword

We started with a file of temperature readings and a program that crashed on
the first Fahrenheit value. We've ended with a crawler that runs hundreds of
requests at once, keeps to a budget, stops cleanly when asked, and is tested
down to the millisecond without touching a network. In between we built a DNS
daemon you can deploy, a to-do list with a full history, a live dashboard, a
ledger that refuses to unbalance and a query language for logs.

Those six projects look very different from one another. That was the point. If
the same handful of moves works for a systemd daemon, a reactive web page, a
bookkeeping engine and a concurrent crawler, then they aren't tricks for one
kind of program. They're a way of working. Let's name them one last time.

## Types first

Every project began with words before code: zone and record, task and event,
counter and rate, posting and transaction, log line and query, page and
referrer. We wrote those words down as types and signatures, often with
`todo!()` bodies, before writing any logic. Then we made the types say as much
as we knew.

An `ApiToken` that can't be printed by accident. A `Title` that can't be empty.
`BytesPerSecond` that won't be added to `Bytes`. `Money<Gbp>` that won't be
added to `Money<Eur>`. A `Transaction` that can't exist unless it balances. A
`PageUrl` that's always canonical, so equality really means "same page". Each
of these moved a rule out of a reviewer's head, or a comment, or a test that
someone might forget to write, and into the one place that's checked every
time the program is built.

You don't need to type everything. Part III weighed typestate against a plain
enum, and Part V weighed compile-time currencies against runtime ones; in both
cases the right answer depended on where the values came from and where they
had to live. The skill isn't maximal typing. It's asking, for each rule, "where
is the cheapest place to make breaking this impossible?", and noticing how
often the answer is a type.

## A pure core

In every project the interesting decisions ended up in ordinary functions from
values to values. The DDNS daemon's `Plan`. `tdo`'s `decide` and `evolve`. The
dashboard's `rate` and its reducer. The ledger's reports as folds. `logq`'s
evaluator. `linkcheck`'s `handle`, the brain of an actor, which never learned
that it was running concurrently.

The reasons were always the same. Pure functions are trivially testable: no
mocks, no setup, no clock, no flakiness. They can be called in any order, from
anywhere, as often as you like. And they make *decisions into data*: a `Plan`,
a `Vec<Event>`, a `Vec<Effect>`. Data can be logged, asserted on, replayed,
dry-run and reasoned about in a way that a function call buried in an `if`
statement can't.

## I/O at the edges

The other half of that move is that the world is held at arm's length. Ports
(`DnsProvider`, `EventStore`, `Fetcher`) said what the core needed in the
core's own language, and adapters translated from whatever `reqwest`, the
filesystem or the operating system actually provided. Anti-corruption layers
kept foreign error types and JSON shapes from leaking inward. Shells stayed
thin enough that a bug had nowhere to hide.

The edges got harder as the book went on: a loop with backoff, then a reactive
UI, then a streaming pipeline, and finally a concurrent coordinator with
cancellation and backpressure. The core's shape barely changed. That's the
strongest argument for the pattern we know of: the shell can become as
demanding as the problem requires without the decisions becoming any harder to
test.

## Checking designs, not just code

If you followed the TLA+ interludes, you picked up a fourth habit. Types check
values, and tests check the executions we think to run, but some bugs live in
neither: they live in the order things happen. A thermostat that flickers,
whether a reconcile loop settles, a check-then-act race between postings, two
bounded channels each waiting on the other: every one of those is a fact
about time or interleaving, and TLC found or settled each by exploring every
behaviour of a small model. The specs stayed short because the designs were
already shaped for them. A pure `handle(State, Msg) -> (State, Vec<Effect>)`
is most of a spec before you've written one. It's the same habit as the other
three, in a different notation: say the design precisely enough that a
machine can check it, before the code has to.

## The compiler as a partner

The first chapter promised that the compiler would become a design partner
rather than a gatekeeper. Look back at what it actually did for us. It listed
every `match` that needed to learn about kelvin. It refused to let an `Rc`
cross a thread, explained that a `MutexGuard` held across an `.await` would be
unlocked on the wrong thread, and traced a non-`Send` cell deep inside an HTML
parser back to the exact line of our code that kept it alive. It walked us to
every place a new `Msg` variant needed handling.

None of that is the compiler being strict for its own sake. It's the compiler
doing the tedious, exhaustive part of a change, so that you can do the part
that needs judgement. The more of your design you say in types, the more of
that work it can take on. Learning to read its errors calmly, as a to-do list
written by a colleague who has read every line, is the most valuable Rust skill
there is, and by now you have a lot of practice.

## Where to go next

Some directions, depending on what drew you to Rust:

- **Go deeper on async.** Read the Tokio tutorial end to end, then the Async
  Book's chapters on pinning and on how futures are polled. You've used
  `select!`, `JoinSet` and cancellation tokens. Understanding the machinery
  beneath them will make the next "future is not `Send`" error obvious rather
  than mysterious.
- **Go deeper on types.** Traits with associated types and generic associated
  types, `PhantomData` variance, and sealed traits are the next steps from the
  phantom types and typestate you've already used.
- **Go lower.** *The Rustonomicon* explains what `unsafe` means and what the
  `Send` and `Sync` you've relied on actually promise. You may never write
  `unsafe` code, but knowing what's underneath makes the safe layer easier to
  trust.
- **Build something of your own.** Pick a tool you use every week and write a
  small version of it, starting with the nouns. If you get stuck, ask which of
  the moves in this afterword you're not making yet.
- **Make the workshop yours.** The Nix flake, editor and terminal setup from
  the start of the book were a starting point, not a prescription. Tune them
  until running the tests is a keystroke away.

Appendix D lists books, articles and talks for each of these directions.

## A catalogue to keep

Every pattern in the book was introduced with a callout and a name, so that
you'd recognise it when you met it again. Appendix A collects all of them in
one place: what each is, when to reach for it, the Rust mechanism behind it,
and the chapter where it first appeared. It's meant to be used, not read
straight through. Next time you're staring at a design problem, skim it. The
answer is often a pattern you've already built once, in a different costume.

Thank you for building these six programs with us. Go and write something
that's hard to get wrong.
