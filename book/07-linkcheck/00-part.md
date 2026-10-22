# Part VII: linkcheck, a Concurrent Link Checker

*We build `linkcheck`, a command-line tool that crawls a website, checks every link it finds, and fails your CI build when something is broken. It is the book's deep dive into concurrency: `Send` and `Sync` as the compiler explains them, actors whose brains are pure state machines, and the bounded, cancellable, testable machinery that lets hundreds of requests run at once without melting anybody's server.*
