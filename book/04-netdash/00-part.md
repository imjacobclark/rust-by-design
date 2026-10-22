# Part IV: netdash, a Live Network Dashboard

*We build `netdash`, a web page that shows how fast every network interface on your machine is sending and receiving, updating every second with a small history graph for each. Along the way we give units of measure their own types, share immutable snapshots between tasks instead of locking a shared map, and learn Leptos from first principles: reactive signals, server rendering, hydration and a browser-side reducer, all built on one pure domain crate that compiles for both the server and WebAssembly.*
