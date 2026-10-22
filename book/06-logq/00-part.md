# Part VI: logq, a Streaming Log Query Tool

*We build `logq`, a command-line tool that reads structured logs from files or standard input, filters them with a small query language and prints matches or aggregates. On the way we meet lifetimes as a performance tool, parser combinators, an interpreter with a simplifier that property tests keep honest, and aggregation as a fold over a monoid, which turns out to be all you need for parallelism.*
