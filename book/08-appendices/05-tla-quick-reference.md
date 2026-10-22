# Appendix E: TLA+ quick reference

A compact reminder of the TLA+, PlusCal and TLC used in the interludes. The
interludes explain each idea properly; this is for looking things up.

## Running the tools

```sh
nix shell nixpkgs#tlaplus              # provides tlc, pcal, tlasany
tlasany Spec.tla                       # parse and check the module only
pcal Spec.tla                          # translate PlusCal into TLA+ (in place)
tlc -workers 1 -config Spec.cfg Spec.tla
tlc -deadlock -config Spec.cfg Spec.tla   # don't treat "stuck" as an error
```

`-workers 1` makes exploration order, and therefore counterexample traces,
deterministic. `-workers auto` uses every core for big models.

## The shape of a module

```tla
\* file: Frontier.tla
------------------------------- MODULE Frontier ------------------------------
EXTENDS Integers, Sequences, FiniteSets, TLC

CONSTANT Urls                       \* fixed per model, set in the .cfg
VARIABLES queue, inFlight, seen     \* the state

vars == <<queue, inFlight, seen>>   \* handy for UNCHANGED and [Next]_vars

TypeOK == /\ queue \in Seq(Urls)    \* an invariant, not a declaration
          /\ inFlight \in SUBSET Urls
          /\ seen \in SUBSET Urls

Init == /\ queue = <<>>
        /\ inFlight = {}
        /\ seen = {}

\* ... the actions Discover(u), Start and Finish(u), shown below ...

Next == \/ \E u \in Urls : Discover(u)
        \/ Start
        \/ \E u \in inFlight : Finish(u)

Spec == /\ Init
        /\ [][Next]_vars
        /\ WF_vars(Start)
        /\ \A u \in Urls : WF_vars(Finish(u))

Responds == \A u \in Urls : (u \in inFlight) ~> (u \notin inFlight)
==========================================================================
```

Everything is a definition (`Name == expression`). A module ends at the line
of `=` signs; anything after it is ignored.

## Actions

An *action* is a formula relating the current state (unprimed variables) to
the next state (primed variables). It's enabled when its conditions can be
true.

```tla
Discover(u) == /\ u \notin seen                 \* guard: when it can happen
               /\ queue' = Append(queue, u)     \* effect on the next state
               /\ seen' = seen \cup {u}
               /\ UNCHANGED inFlight            \* say what doesn't change
```

The other two actions in `Frontier` follow the same shape:

```tla
Start == /\ queue /= <<>>
         /\ inFlight' = inFlight \cup {Head(queue)}
         /\ queue' = Tail(queue)
         /\ UNCHANGED seen

Finish(u) == /\ u \in inFlight
             /\ inFlight' = inFlight \ {u}
             /\ UNCHANGED <<queue, seen>>
```

Every variable must be given a next value in every action, either by
assigning its primed form or with `UNCHANGED`. Forgetting one is the commonest
beginner error; TLC reports that the variable isn't defined in the successor
state.

## Operators

| Kind | TLA+ | Meaning |
|---|---|---|
| Logic | `/\` `\/` `~` `=>` `<=>` | and, or, not, implies, iff |
| Definitions | `==` | define (not test) |
| Equality | `=` `/=` (or `#`) | equal, not equal |
| Quantifiers | `\A x \in S : P` / `\E x \in S : P` | for all / there exists |
| Choice | `CHOOSE x \in S : P` | *some* fixed `x` satisfying `P` (deterministic) |
| Conditionals | `IF c THEN a ELSE b`, `CASE c1 -> a [] OTHER -> b` | expressions, not statements |
| Local names | `LET x == e IN body` | |
| Integers | `+ - * \div %` `..` | `1..3` is the set `{1, 2, 3}` |

## Sets

| TLA+ | Meaning |
|---|---|
| `{1, 2, 3}`, `{}` | literal set, empty set |
| `x \in S`, `x \notin S` | membership |
| `S \cup T`, `S \cap T`, `S \ T` | union, intersection, difference |
| `S \subseteq T` | subset |
| `{x \in S : P(x)}` | filter |
| `{f(x) : x \in S}` | map |
| `SUBSET S` | all subsets of `S` (the power set) |
| `Cardinality(S)` | size (needs `FiniteSets`) |
| `BOOLEAN`, `Nat`, `Int` | `{TRUE, FALSE}`, the naturals, the integers |

## Functions and records

A TLA+ function is a mapping with a fixed domain, like a total `HashMap`.

| TLA+ | Meaning |
|---|---|
| `[a \in Accounts \|-> 0]` | function from each account to 0 |
| `f[a]` | apply |
| `DOMAIN f` | its domain |
| `[f EXCEPT ![a] = @ + 10]` | `f` with one entry changed (`@` is the old value) |
| `[S -> T]` | the set of *all* functions from `S` to `T` (for `TypeOK`) |
| `[url \|-> "a", depth \|-> 0]` | a record (a function on field names) |
| `r.depth`, `[r EXCEPT !.depth = @ + 1]` | field access, field update |
| `[url : Urls, depth : 0..3]` | the set of all such records |

## Sequences and tuples

Sequences are 1-indexed functions on `1..n` (needs `Sequences`).

| TLA+ | Meaning |
|---|---|
| `<<>>`, `<<a, b>>` | empty sequence, literal (also a tuple) |
| `s[1]`, `Len(s)` | first element, length |
| `Head(s)`, `Tail(s)` | first element, everything after it |
| `Append(s, x)`, `s \o t` | add to the end, concatenate |
| `SubSeq(s, m, n)` | elements `m..n` inclusive |
| `Seq(S)` | the set of all finite sequences over `S` |

## Recursion

```tla
RECURSIVE SumSeq(_)
SumSeq(s) == IF s = <<>> THEN 0 ELSE Head(s) + SumSeq(Tail(s))

Max(S) == CHOOSE x \in S : \A y \in S : x >= y
```

`RECURSIVE` must be declared before the definition. A fold over a sequence
(like replaying events, Interlude 3) is written this way.

## Temporal formulas

| TLA+ | Read as | Kind |
|---|---|---|
| `[]P` | P is always true | safety |
| `<>P` | P is eventually true | liveness |
| `[]<>P` | P is true infinitely often | liveness |
| `<>[]P` | eventually P stays true for ever | liveness |
| `P ~> Q` | whenever P, eventually Q ("leads to") | liveness |
| `[][A]_vars` | every step is an `A` step or leaves `vars` unchanged | the `Next` part of `Spec` |
| `WF_vars(A)` | if `A` stays enabled, it eventually happens (weak fairness) | |
| `SF_vars(A)` | if `A` is enabled infinitely often, it eventually happens (strong fairness) | |

**Safety** properties say nothing bad ever happens; a violation is a finite
trace. **Liveness** properties say something good eventually happens; a
violation is a trace that ends in a loop (a "lasso"). Liveness needs
fairness, because a spec without it allows a system to stop (stutter) for
ever.

## The TLC configuration file

```text
\* file: Frontier.cfg
SPECIFICATION Spec
CONSTANT Urls = {a, b}     \* a, b are model values: distinct, opaque
INVARIANT TypeOK           \* checked in every reachable state
PROPERTY Responds          \* temporal properties
CHECK_DEADLOCK FALSE       \* same as tlc -deadlock
```

Other directives you'll meet: several `INVARIANT` lines, `CONSTANTS` with one
assignment per line, and `SYMMETRY Perms` (with
`Perms == Permutations(Urls)` defined in the spec) to tell TLC that
renaming model values doesn't change anything, which shrinks the state
space.

`INIT Init` plus `NEXT Next` can replace `SPECIFICATION` when there are no
fairness conditions or temporal properties.

## Reading TLC's output

```text
Error: Deadlock reached.
Error: The behavior up to this point is:
State 1: <Initial predicate>
/\ inFlight = {}
/\ seen = {}
/\ queue = <<>>

State 2: <Discover line 17, col 16 to line 20, col 36 of module Frontier>
/\ inFlight = {}
/\ seen = {a}
/\ queue = <<a>>

...

State 7: <Next line 33, col 12 to line 33, col 40 of module Frontier>
/\ inFlight = {}
/\ seen = {a, b}
/\ queue = <<>>

25 states generated, 17 distinct states found, 0 states left on queue.
```

That's a real run of `Frontier` above, checked without
`CHECK_DEADLOCK FALSE`: both URLs were discovered, fetched and finished, and
then nothing more could happen. TLC calls that a deadlock. Here it's simply
*done*, which is the most common surprise on a first run. With
`CHECK_DEADLOCK FALSE` added, the same model reports `Model checking
completed. No error has been found.`, including the `Responds` property.

- Each state names the **action that produced it** and lists every variable.
  Read the trace like a story: what happened, in what order.
- **States generated** counts transitions explored; **distinct states** counts
  unique states. Their growth as you widen constants tells you how big a
  model you can afford.
- **`Deadlock reached`** means no action is enabled, as above. Sometimes that's a real
  deadlock; sometimes the system has simply *finished* and you need
  `CHECK_DEADLOCK FALSE` or an explicit "done" step that stutters.

## PlusCal

PlusCal is an algorithm language that translates into TLA+. It lives in a
comment inside the module, and `pcal` writes the translation below it.

```tla
(* --algorithm crawl
variables frontier = Urls, done = {};

define
    NothingLost == frontier \cup done \subseteq Urls
end define;

fair process worker \in 1..NumWorkers
variables mine = "none";
begin
  Take:
    while frontier /= {} do
      with u \in frontier do
        frontier := frontier \ {u};
        mine := u;
      end with;
  Fetch:
      either
        done := done \cup {mine};
      or
        frontier := frontier \cup {mine};   \* transient failure: retry
      end either;
    end while;
end process;
end algorithm; *)
```

| PlusCal | Meaning |
|---|---|
| `Label:` | everything up to the next label happens **atomically**, as one step |
| `x := e` | assignment (several in one step need `\|\|` or separate statements) |
| `await P` / `when P` | block until `P` is true |
| `either ... or ... end either` | nondeterministic choice |
| `with x \in S do ... end with` | nondeterministically pick an element |
| `process p \in 1..N` | `N` concurrent copies; `self` is the copy's id |
| `fair process` | weak fairness for that process's steps |
| `define ... end define` | TLA+ definitions that can see the variables |
| `macro`, `procedure` | inline reuse, and callable subroutines with `call`/`return` |
| `goto Label`, `skip` | jump, do nothing |

The rule that matters most: **labels decide atomicity.** Too few labels and
the model hides real interleavings; too many and the state space explodes.
Put a label wherever the real system can be interrupted (between a read and a
write, across an `.await`, before taking a lock).

## Rust ↔ TLA+

| In the Rust | In the spec |
|---|---|
| a type's valid values | `TypeOK` |
| a struct's state | the variables |
| a constructor, `Default` | `Init` |
| a method that changes state, an event, a message handler | an action |
| `match` over messages in a pure `handle` | `Next` as a disjunction of actions |
| `assert!` / an invariant a smart constructor guarantees | `INVARIANT` |
| "this eventually happens" | `PROPERTY` with `<>` or `~>`, plus fairness |
| the network, the clock, the user, an ISP | nondeterministic actions (`\E`, `either`) |
| a `.await` point, a lock release | a PlusCal label boundary |
| `proptest`'s random cases | TLC's *every* case, for a small model |
