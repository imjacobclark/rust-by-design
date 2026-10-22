// Curated against the Markdown book. Correct indices are shuffled by the quiz engine.
window.QUIZ_BANK = {
  "sections": [
    {
      "id": "workshop",
      "part": "0",
      "title": "Your workshop",
      "folder": "00-workshop",
      "description": "A dependable environment for thinking in Rust.",
      "topics": "Nix · zsh · tmux · Neovim"
    },
    {
      "id": "foundations",
      "part": "I",
      "title": "Thinking in types",
      "folder": "01-foundations",
      "description": "Make the compiler a partner in your design.",
      "topics": "Ownership · types · traits · errors"
    },
    {
      "id": "ddns",
      "part": "II",
      "title": "Cloudflare DDNS",
      "folder": "02-ddns",
      "description": "Pure decisions, real services, reliable reconciliation.",
      "topics": "Domain modelling · ports · NixOS"
    },
    {
      "id": "todo",
      "part": "III",
      "title": "The to-do list",
      "folder": "03-todo",
      "description": "Model requests, record facts, replay the past.",
      "topics": "Commands · typestate · event sourcing"
    },
    {
      "id": "netdash",
      "part": "IV",
      "title": "The live dashboard",
      "folder": "04-netdash",
      "description": "Turn changing measurements into consistent views.",
      "topics": "Units · snapshots · Leptos · reducers"
    },
    {
      "id": "ledger",
      "part": "V",
      "title": "Double-entry ledger",
      "folder": "05-ledger",
      "description": "Make money and its conservation explicit.",
      "topics": "Money · aggregates · folds"
    },
    {
      "id": "logq",
      "part": "VI",
      "title": "The log query tool",
      "folder": "06-logq",
      "description": "Give text a grammar and process it as a stream.",
      "topics": "Parsing · lifetimes · interpreters"
    },
    {
      "id": "linkcheck",
      "part": "VII",
      "title": "Concurrent link checker",
      "folder": "07-linkcheck",
      "description": "Coordinate work with clear ownership and limits.",
      "topics": "Actors · backpressure · cancellation"
    },
    {
      "id": "proofs",
      "part": "VIII",
      "title": "Types as proofs",
      "folder": "08-proofs",
      "description": "Push Rust’s types toward propositions, protocols and proofs.",
      "topics": "Curry–Howard · typestate · verification"
    },
    {
      "id": "appendices",
      "part": "A–E",
      "title": "The reference shelf",
      "folder": "09-appendices",
      "description": "Connect the patterns and revisit the essentials.",
      "topics": "Patterns · syntax · tooling · TLA+"
    }
  ],
  "questions": [
    {
      "id": "workshop-01",
      "section": "workshop",
      "topic": "Reproducibility",
      "prompt": "A colleague gets different tool versions from the same flake.nix. Which file pins the input revisions?",
      "options": [
        "flake.lock",
        "Cargo.toml",
        ".envrc",
        "rustfmt.toml"
      ],
      "answer": 0,
      "explanation": "flake.nix declares the inputs; flake.lock records their exact revisions. Commit the lock file so collaborators resolve the same package set.",
      "code": "",
      "strand": "core",
      "source": "book/00-workshop/01-nix.md",
      "chapter": "Nix: a reproducible foundation"
    },
    {
      "id": "workshop-02",
      "section": "workshop",
      "topic": "Environment boundaries",
      "prompt": "Where should the compiler and rust-analyzer for a particular project be declared?",
      "options": [
        "In the project’s development shell",
        "Only in a global shell alias",
        "In a generated .zshrc",
        "In a tmux session name"
      ],
      "answer": 0,
      "explanation": "The project dev shell provides its toolchain. home-manager manages the personal environment, while direnv loads the project environment.",
      "code": "",
      "strand": "core",
      "source": "book/00-workshop/01-nix.md",
      "chapter": "Nix: a reproducible foundation"
    },
    {
      "id": "workshop-03",
      "section": "workshop",
      "topic": "Declarative configuration",
      "prompt": "You want to change a zsh alias managed by home-manager. What should you edit?",
      "options": [
        "The shellAliases option in the Nix configuration",
        "The generated read-only .zshrc",
        "A file inside /nix/store",
        "The flake.lock revision by hand"
      ],
      "answer": 0,
      "explanation": "Edit the declarative source and apply it with home-manager. Generated shell files are outputs and will be replaced.",
      "code": "",
      "strand": "core",
      "source": "book/00-workshop/02-zsh.md",
      "chapter": "zsh: a shell that works with you"
    },
    {
      "id": "workshop-04",
      "section": "workshop",
      "topic": "Shell integration",
      "prompt": "Why use each tool’s home-manager zsh integration instead of accumulating handwritten hooks?",
      "options": [
        "Enabling and removing a module also manages its shell hook",
        "It makes every shell command pure",
        "It removes the need for a project toolchain",
        "It runs all commands inside tmux"
      ],
      "answer": 0,
      "explanation": "Each module contributes its own integration. Keeping the untyped initContent escape hatch small reduces configuration that can drift.",
      "code": "",
      "strand": "core",
      "source": "book/00-workshop/02-zsh.md",
      "chapter": "zsh: a shell that works with you"
    },
    {
      "id": "workshop-05",
      "section": "workshop",
      "topic": "Persistent workspaces",
      "prompt": "Your SSH connection drops while work runs in tmux. Why can you reattach to it?",
      "options": [
        "The tmux server owns the session independently of the terminal",
        "The terminal saves and replays every command",
        "tmux serialises every process to disk",
        "Nix automatically restarts the shell"
      ],
      "answer": 0,
      "explanation": "tmux separates terminal clients from the server that owns sessions. This survives a disconnected client, not a machine reboot.",
      "code": "",
      "strand": "core",
      "source": "book/00-workshop/03-tmux.md",
      "chapter": "tmux: a workspace that survives"
    },
    {
      "id": "workshop-06",
      "section": "workshop",
      "topic": "Tooling feedback",
      "prompt": "Why run bacon clippy-all in a dedicated pane?",
      "options": [
        "To keep feedback for all targets, including tests, visible",
        "To execute every test on each keypress",
        "To replace rustfmt with compiler warnings",
        "To deploy each successful compilation"
      ],
      "answer": 0,
      "explanation": "The workshop keeps the compiler’s verdict in view. Checking all targets includes test code; checking is distinct from executing tests.",
      "code": "",
      "strand": "core",
      "source": "book/00-workshop/03-tmux.md",
      "chapter": "tmux: a workspace that survives"
    },
    {
      "id": "workshop-07",
      "section": "workshop",
      "topic": "Editor responsibilities",
      "prompt": "Which tool provides semantic Rust diagnostics and type information to the editor?",
      "options": [
        "rust-analyzer",
        "Tree-sitter",
        "tmux",
        "fzf-lua"
      ],
      "answer": 0,
      "explanation": "rust-analyzer is the language server. Tree-sitter handles syntax structure and highlighting; the project dev shell supplies the matching language server.",
      "code": "",
      "strand": "core",
      "source": "book/00-workshop/04-neovim.md",
      "chapter": "Neovim: an editor that understands Rust"
    },
    {
      "id": "workshop-08",
      "section": "workshop",
      "topic": "Declarative editor",
      "prompt": "What is the division of responsibility between Nix and Lua in this workshop?",
      "options": [
        "Nix selects plugins; Lua configures their behaviour",
        "Lua pins nixpkgs; Nix edits buffers",
        "Both independently install the same plugins",
        "Nix provides completion; Lua compiles Rust"
      ],
      "answer": 0,
      "explanation": "Nix pins and installs the editor’s components. The linked Lua configuration describes how those components behave.",
      "code": "",
      "strand": "core",
      "source": "book/00-workshop/04-neovim.md",
      "chapter": "Neovim: an editor that understands Rust"
    },
    {
      "id": "workshop-09",
      "section": "workshop",
      "topic": "Type-driven workflow",
      "prompt": "You have named the domain types but not implemented the logic. What is the next useful step?",
      "options": [
        "Write signatures with todo!() bodies and check the design",
        "Implement all I/O before choosing signatures",
        "Add Clone to every type",
        "Suppress compiler diagnostics until the project is finished"
      ],
      "answer": 0,
      "explanation": "Signatures let the compiler check the shape of the design before bodies exist. todo!() panics if executed, so it is a temporary implementation marker.",
      "code": "",
      "strand": "core",
      "source": "book/00-workshop/05-the-daily-loop.md",
      "chapter": "The daily loop"
    },
    {
      "id": "foundations-01",
      "section": "foundations",
      "topic": "Functional core",
      "prompt": "Which function best belongs in a functional core?",
      "options": [
        "A function that turns supplied readings into a summary",
        "A function that reads the current clock",
        "A function that fetches live DNS records",
        "A function that writes a report to disk"
      ],
      "answer": 0,
      "explanation": "The core transforms values into values. The shell obtains readings and performs effects, making the core testable with ordinary inputs.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/01-the-design-mindset.md",
      "chapter": "The design mindset"
    },
    {
      "id": "foundations-02",
      "section": "foundations",
      "topic": "Newtypes",
      "prompt": "Why wrap f64 in Celsius instead of using f64 everywhere?",
      "options": [
        "To distinguish a domain quantity from unrelated numbers",
        "To automatically reject every invalid floating-point value",
        "To make all arithmetic exact",
        "To allow implicit conversion from every number"
      ],
      "answer": 0,
      "explanation": "A newtype creates a distinct identity. Validation still needs an appropriate constructor; wrapping alone does not check a value.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/01-the-design-mindset.md",
      "chapter": "The design mindset"
    },
    {
      "id": "foundations-03",
      "section": "foundations",
      "topic": "Moves",
      "prompt": "What happens when this program is compiled?",
      "options": [
        "It fails because s was moved into t",
        "It prints Rust twice",
        "It clones s automatically",
        "It fails because String cannot be printed"
      ],
      "answer": 0,
      "explanation": "String is not Copy. Assigning it to t moves ownership, so the later use of s is invalid. Borrow or deliberately clone if both uses are needed.",
      "code": "let s = String::from(\"Rust\");\nlet t = s;\nprintln!(\"{s} {t}\");",
      "strand": "core",
      "source": "book/01-foundations/02-ownership.md",
      "chapter": "Ownership as a design tool"
    },
    {
      "id": "foundations-04",
      "section": "foundations",
      "topic": "Borrowed APIs",
      "prompt": "A function only reads a name and keeps nothing. Which parameter is the most flexible choice?",
      "options": [
        "&str",
        "String",
        "&mut String",
        "Box<String>"
      ],
      "answer": 0,
      "explanation": "A borrowed string slice accepts views of owned strings and literals without transferring ownership or requiring allocation.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/02-ownership.md",
      "chapter": "Ownership as a design tool"
    },
    {
      "id": "foundations-05",
      "section": "foundations",
      "topic": "Lifetimes",
      "prompt": "What does a lifetime parameter relating an input reference to an output reference express?",
      "options": [
        "The output borrow cannot outlive the input data it depends on",
        "The function must finish within a duration",
        "The input will be allocated on the heap",
        "The data is kept alive by the annotation"
      ],
      "answer": 0,
      "explanation": "Lifetime annotations describe relationships. They neither extend a value’s lifetime nor perform memory management.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/02-ownership.md",
      "chapter": "Ownership as a design tool"
    },
    {
      "id": "foundations-06",
      "section": "foundations",
      "topic": "State modelling",
      "prompt": "Only a shipped order has a tracking number. Which model expresses that rule directly?",
      "options": [
        "An enum with tracking data in the Shipped variant",
        "A shipped bool plus Option<String>",
        "Two independent booleans",
        "A tracking string where empty means not shipped"
      ],
      "answer": 0,
      "explanation": "An enum puts state-specific data in that state’s variant. Independent flags and options allow combinations the domain does not recognise.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/03-modelling-with-types.md",
      "chapter": "Modelling with types"
    },
    {
      "id": "foundations-07",
      "section": "foundations",
      "topic": "Exhaustive matching",
      "prompt": "Why avoid a wildcard arm when matching every variant of a domain event?",
      "options": [
        "A new variant will make the compiler identify handlers that need updating",
        "Wildcards always panic",
        "Explicit arms prevent allocation",
        "A wildcard disables all type checking"
      ],
      "answer": 0,
      "explanation": "Exhaustive matching turns a new variant into a checklist. A wildcard can silently absorb the new case.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/03-modelling-with-types.md",
      "chapter": "Modelling with types"
    },
    {
      "id": "foundations-08",
      "section": "foundations",
      "topic": "Smart constructors",
      "prompt": "Which design preserves evidence that a title is non-empty?",
      "options": [
        "A private field with a fallible constructor returning Title",
        "A public String field plus is_valid()",
        "A comment above a String parameter",
        "A bool returned separately from the original input"
      ],
      "answer": 0,
      "explanation": "A smart constructor returns a value whose type carries the checked fact. Privacy prevents callers from bypassing the constructor.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/04-errors-as-values.md",
      "chapter": "Errors are values"
    },
    {
      "id": "foundations-09",
      "section": "foundations",
      "topic": "Error propagation",
      "prompt": "When ? propagates an error into a different compatible error type, which conversion does it use?",
      "options": [
        "From",
        "Display",
        "Clone",
        "Default"
      ],
      "answer": 0,
      "explanation": "For Result, ? returns early on Err and converts the error using From. Display controls the message, not error conversion.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/04-errors-as-values.md",
      "chapter": "Errors are values"
    },
    {
      "id": "foundations-10",
      "section": "foundations",
      "topic": "Error boundaries",
      "prompt": "Which error strategy matches the book’s design?",
      "options": [
        "Typed domain errors inside; contextual reporting with anyhow in the shell",
        "Strings for every domain error",
        "panic! for malformed user input",
        "anyhow as the only type at every boundary"
      ],
      "answer": 0,
      "explanation": "Domain callers need variants they can act on. The outer shell adds context and reports an error chain to the person running the program.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/04-errors-as-values.md",
      "chapter": "Errors are values"
    },
    {
      "id": "foundations-11",
      "section": "foundations",
      "topic": "Dispatch",
      "prompt": "You need one collection containing several concrete implementations of a suitable trait. Which representation fits?",
      "options": [
        "Vec<Box<dyn Trait>>",
        "Vec<impl Trait> holding unrelated concrete types",
        "A generic Vec<T> with a different T for each element",
        "A tuple that automatically grows at runtime"
      ],
      "answer": 0,
      "explanation": "A trait object behind a pointer enables heterogeneous values with dynamic dispatch. A generic parameter denotes one concrete type for an instantiation.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/05-traits-and-generics.md",
      "chapter": "Traits and generics"
    },
    {
      "id": "foundations-12",
      "section": "foundations",
      "topic": "Trait contracts",
      "prompt": "Why can a generic function only call operations promised by its bounds?",
      "options": [
        "Its body must be valid for every type satisfying those bounds",
        "The compiler only checks the first call site",
        "Generics erase all type information",
        "Every generic operation uses reflection"
      ],
      "answer": 0,
      "explanation": "Trait bounds are the contract the function may rely on. A capability present in one caller’s type is not enough.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/05-traits-and-generics.md",
      "chapter": "Traits and generics"
    },
    {
      "id": "foundations-13",
      "section": "foundations",
      "topic": "Lazy iterators",
      "prompt": "What does this expression do by itself?",
      "options": [
        "Creates a lazy iterator; no calls to inspect happen yet",
        "Prints all three numbers immediately",
        "Consumes and drops all three numbers",
        "Fails because inspect requires a Vec"
      ],
      "answer": 0,
      "explanation": "Iterator adaptors are lazy. A consumer such as collect, count or a loop must pull items to execute the pipeline.",
      "code": "let values = [1, 2, 3];\nlet iter = values.iter().inspect(|x| println!(\"{x}\"));",
      "strand": "core",
      "source": "book/01-foundations/06-closures-and-iterators.md",
      "chapter": "Closures and iterators"
    },
    {
      "id": "foundations-14",
      "section": "foundations",
      "topic": "Fallible collection",
      "prompt": "What does collecting an iterator of Result<T, E> into Result<Vec<T>, E> do?",
      "options": [
        "Collects successes or stops at the first error",
        "Discards errors and keeps all successes",
        "Collects all errors into a Vec",
        "Panics on the first error"
      ],
      "answer": 0,
      "explanation": "The result type selects the collection behaviour. This form short-circuits with the first error rather than accumulating errors.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/06-closures-and-iterators.md",
      "chapter": "Closures and iterators"
    },
    {
      "id": "foundations-15",
      "section": "foundations",
      "topic": "Testing boundaries",
      "prompt": "Which tests exercise a crate like an external user through its public API?",
      "options": [
        "Integration tests in tests/",
        "Only tests inside the implementation module",
        "Only compiler warnings",
        "Only tests that inspect private fields"
      ],
      "answer": 0,
      "explanation": "Integration tests are separate crates. Unit tests in a child test module can inspect their parent module’s private implementation.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/07-modules-tests-workflow.md",
      "chapter": "Modules, tests and the type-driven workflow"
    },
    {
      "id": "foundations-16",
      "section": "foundations",
      "topic": "Property tests",
      "prompt": "What makes a property test different from a table of examples?",
      "options": [
        "It generates inputs to check a general rule and shrinks failures",
        "It proves the program correct for every possible input",
        "It only checks performance",
        "It requires a running production service"
      ],
      "answer": 0,
      "explanation": "A property describes a promise across generated inputs. Shrinking helps isolate a small counterexample; this is not an exhaustive proof.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/07-modules-tests-workflow.md",
      "chapter": "Modules, tests and the type-driven workflow"
    },
    {
      "id": "foundations-17",
      "section": "foundations",
      "topic": "TLA+ · state machines",
      "prompt": "What does TLC explore?",
      "options": [
        "Reachable states of the finite model you describe",
        "Every execution of your Rust binary",
        "All possible values of an unbounded production system",
        "Only the happy path in Init"
      ],
      "answer": 0,
      "explanation": "TLC checks the specification and its finite configuration. The model must faithfully capture the design; TLC does not read the Rust implementation.",
      "code": "",
      "strand": "tla",
      "source": "book/01-foundations/08-interlude-thinking-in-states.md",
      "chapter": "Interlude: Thinking in states"
    },
    {
      "id": "foundations-18",
      "section": "foundations",
      "topic": "TLA+ · actions",
      "prompt": "An action changes x but leaves y alone. How should it describe y?",
      "options": [
        "Explicitly state UNCHANGED y",
        "Omit y and assume it stays unchanged",
        "Set y to its default value",
        "Declare y as an invariant instead"
      ],
      "answer": 0,
      "explanation": "Every action must constrain all state variables. UNCHANGED describes equality between a variable’s current and next values.",
      "code": "",
      "strand": "tla",
      "source": "book/01-foundations/08-interlude-thinking-in-states.md",
      "chapter": "Interlude: Thinking in states"
    },
    {
      "id": "ddns-01",
      "section": "ddns",
      "topic": "Domain identity",
      "prompt": "Why give ZoneId and RecordId different types even when both contain strings?",
      "options": [
        "They have different meanings and validation rules",
        "Rust cannot pass two strings to a function",
        "All IDs must use heap-free storage",
        "The API returns them in different encodings"
      ],
      "answer": 0,
      "explanation": "Value objects prevent accidental interchange and capture distinct domain rules. The book is strict with user input and tolerant of partner-owned identifiers.",
      "code": "",
      "strand": "core",
      "source": "book/02-ddns/01-understanding-the-domain.md",
      "chapter": "Understanding the domain"
    },
    {
      "id": "ddns-02",
      "section": "ddns",
      "topic": "Typed records",
      "prompt": "What does DnsRecord<A> with an Address trait prevent?",
      "options": [
        "Constructing an AAAA record with an IPv4 address",
        "All network timeouts",
        "All authentication failures",
        "External edits to records"
      ],
      "answer": 0,
      "explanation": "The address type and its associated record kind encode a relationship that would otherwise be rejected by the remote service.",
      "code": "",
      "strand": "core",
      "source": "book/02-ddns/01-understanding-the-domain.md",
      "chapter": "Understanding the domain"
    },
    {
      "id": "ddns-03",
      "section": "ddns",
      "topic": "Decision as data",
      "prompt": "Why should reconciliation return a Plan rather than a bool meaning “update”?",
      "options": [
        "The plan contains the decision and the data needed to execute it",
        "Enums automatically perform HTTP requests",
        "A bool cannot be tested",
        "A Plan bypasses domain validation"
      ],
      "answer": 0,
      "explanation": "A bool makes the shell reconstruct what to do and why. A plan keeps decisions pure and makes dry runs and logging straightforward.",
      "code": "",
      "strand": "core",
      "source": "book/02-ddns/02-the-functional-core.md",
      "chapter": "The functional core"
    },
    {
      "id": "ddns-04",
      "section": "ddns",
      "topic": "Convergence",
      "prompt": "After executing a successful plan in an unchanged world, what should the next reconciliation do?",
      "options": [
        "Report that no further change is needed",
        "Always write the same record again",
        "Delete the newly created record",
        "Treat success as a fatal error"
      ],
      "answer": 0,
      "explanation": "Convergence means the applied decision moves the simulated world towards the desired state. Repeating reconciliation on that state should not demand another change.",
      "code": "",
      "strand": "core",
      "source": "book/02-ddns/02-the-functional-core.md",
      "chapter": "The functional core"
    },
    {
      "id": "ddns-05",
      "section": "ddns",
      "topic": "Ports and adapters",
      "prompt": "Who should define the vocabulary of DnsProvider?",
      "options": [
        "The application that needs the port",
        "The HTTP client library",
        "The remote JSON schema",
        "The logging framework"
      ],
      "answer": 0,
      "explanation": "The application owns its ports. Adapters translate remote DTOs and errors into that vocabulary, keeping dependencies pointed inwards.",
      "code": "",
      "strand": "core",
      "source": "book/02-ddns/03-ports-and-adapters.md",
      "chapter": "Ports and adapters"
    },
    {
      "id": "ddns-06",
      "section": "ddns",
      "topic": "Async contracts",
      "prompt": "A port must promise a Send future. Which signature makes that promise explicit?",
      "options": [
        "fn fetch(&self) -> impl Future<Output = Result<T, E>> + Send",
        "async fn fetch(&self) with no future bound always promises Send",
        "fn fetch(&self) -> Result<T, E> + Send",
        "fn fetch(&self) -> dyn Future with no pointer"
      ],
      "answer": 0,
      "explanation": "An explicit return-position future bound promises Send to generic callers. An async fn implementation can satisfy that contract.",
      "code": "",
      "strand": "core",
      "source": "book/02-ddns/03-ports-and-adapters.md",
      "chapter": "Ports and adapters"
    },
    {
      "id": "ddns-07",
      "section": "ddns",
      "topic": "Retry policy",
      "prompt": "How should the shell distinguish an authentication failure from a temporary connection failure?",
      "options": [
        "Classify errors into fatal and transient variants",
        "Retry every error forever",
        "Parse the displayed message for keywords",
        "Panic on both errors"
      ],
      "answer": 0,
      "explanation": "Types expose the decision the caller must make. Fatal errors should stop; transient failures can follow the retry schedule.",
      "code": "",
      "strand": "core",
      "source": "book/02-ddns/04-the-daemon.md",
      "chapter": "The daemon"
    },
    {
      "id": "ddns-08",
      "section": "ddns",
      "topic": "Deterministic tests",
      "prompt": "How can a jittered backoff schedule be tested deterministically?",
      "options": [
        "Inject the randomness as a function",
        "Remove all tests involving time",
        "Use the real network to decide delays",
        "Assert that every run produces a different answer"
      ],
      "answer": 0,
      "explanation": "Supplying randomness as an input keeps the scheduling logic predictable in tests while the shell can provide real randomness.",
      "code": "",
      "strand": "core",
      "source": "book/02-ddns/04-the-daemon.md",
      "chapter": "The daemon"
    },
    {
      "id": "ddns-09",
      "section": "ddns",
      "topic": "Secret handling",
      "prompt": "How does the book pass the API token to the NixOS service?",
      "options": [
        "Through a runtime credential file using LoadCredential",
        "By embedding it in generated store-backed TOML",
        "By committing it to flake.nix",
        "By including it in Debug output"
      ],
      "answer": 0,
      "explanation": "The token stays out of the Nix store. systemd makes the runtime credential available through the credentials directory.",
      "code": "",
      "strand": "core",
      "source": "book/02-ddns/05-shipping-on-nix.md",
      "chapter": "Shipping on Nix"
    },
    {
      "id": "ddns-10",
      "section": "ddns",
      "topic": "Layered validation",
      "prompt": "If Nix validates the configuration, why should Rust validate it too?",
      "options": [
        "The Rust program can receive configuration from other sources",
        "Rust cannot read generated TOML",
        "Nix validation only checks whitespace",
        "Both layers must perform network requests"
      ],
      "answer": 0,
      "explanation": "Each boundary protects its own assumptions. Typed Nix options catch host mistakes early; Rust validates any input it receives.",
      "code": "",
      "strand": "core",
      "source": "book/02-ddns/05-shipping-on-nix.md",
      "chapter": "Shipping on Nix"
    },
    {
      "id": "ddns-11",
      "section": "ddns",
      "topic": "TLA+ · liveness",
      "prompt": "Which claim is liveness rather than safety?",
      "options": [
        "DNS eventually converges after the world settles",
        "A record always has a valid address family",
        "A set never contains duplicate IDs",
        "A counter is never negative"
      ],
      "answer": 0,
      "explanation": "Liveness concerns eventual progress. Safety forbids a bad state; convergence also needs appropriate environment and fairness assumptions.",
      "code": "",
      "strand": "tla",
      "source": "book/02-ddns/06-interlude-will-it-converge.md",
      "chapter": "Interlude: Will it converge?"
    },
    {
      "id": "ddns-12",
      "section": "ddns",
      "topic": "TLA+ · source of truth",
      "prompt": "Why can remembering only the last address we wrote break convergence?",
      "options": [
        "An external edit can change DNS without changing our cache",
        "The cache makes every request slower",
        "A cached IP is always invalid",
        "TLC cannot model caches"
      ],
      "answer": 0,
      "explanation": "If we compare the observed IP only with our cached write, an external edit can remain invisible forever. Reconciliation must consult the real state.",
      "code": "",
      "strand": "tla",
      "source": "book/02-ddns/06-interlude-will-it-converge.md",
      "chapter": "Interlude: Will it converge?"
    },
    {
      "id": "todo-01",
      "section": "todo",
      "topic": "Commands and queries",
      "prompt": "Why separate Query from Command in the domain?",
      "options": [
        "Read-only requests cannot be passed to the state-changing handler",
        "Queries never need parsing",
        "Commands must contain I/O code",
        "clap requires two domain enums"
      ],
      "answer": 0,
      "explanation": "The type boundary expresses different capabilities. CLI syntax is translated into domain meaning before handling either request.",
      "code": "",
      "strand": "core",
      "source": "book/03-todo/01-commands-as-data.md",
      "chapter": "Commands as data"
    },
    {
      "id": "todo-02",
      "section": "todo",
      "topic": "Explicit context",
      "prompt": "Why pass today into the command parser?",
      "options": [
        "Relative dates can be interpreted without reading a hidden clock",
        "It guarantees every task is due today",
        "It removes all validation",
        "Dates can only be represented as strings"
      ],
      "answer": 0,
      "explanation": "The shell reads the clock. Passing that value in makes interpretation pure, reproducible and easy to test.",
      "code": "",
      "strand": "core",
      "source": "book/03-todo/01-commands-as-data.md",
      "chapter": "Commands as data"
    },
    {
      "id": "todo-03",
      "section": "todo",
      "topic": "Typestate",
      "prompt": "What does a consuming Task<Open> -> Task<Done> transition achieve?",
      "options": [
        "It prevents further use of the old open value after the transition",
        "It keeps both states independently mutable",
        "It removes the need to model persisted data",
        "It makes the transition happen at compile time"
      ],
      "answer": 0,
      "explanation": "Ownership consumes the previous state. Typestate restricts available methods; the actual transition still happens at runtime.",
      "code": "",
      "strand": "core",
      "source": "book/03-todo/02-modelling-tasks.md",
      "chapter": "Modelling tasks"
    },
    {
      "id": "todo-04",
      "section": "todo",
      "topic": "Runtime boundaries",
      "prompt": "How can one collection hold both Task<Open> and Task<Done>?",
      "options": [
        "Wrap them in an enum such as AnyTask",
        "Give each element a different Vec<T> type parameter",
        "Cast both to String and discard their state",
        "Make every method available in every state"
      ],
      "answer": 0,
      "explanation": "The enum represents the runtime choice. Matching a variant gives back the more precise typestate value.",
      "code": "",
      "strand": "core",
      "source": "book/03-todo/02-modelling-tasks.md",
      "chapter": "Modelling tasks"
    },
    {
      "id": "todo-05",
      "section": "todo",
      "topic": "Decide and evolve",
      "prompt": "Which function may reject a requested change?",
      "options": [
        "decide(&State, Command)",
        "evolve(State, &Event)",
        "The replay fold’s initial state",
        "The event’s Display implementation"
      ],
      "answer": 0,
      "explanation": "Commands are requests and can fail. Events record accepted facts; evolve applies those facts so replay remains total.",
      "code": "",
      "strand": "core",
      "source": "book/03-todo/03-event-sourcing.md",
      "chapter": "Event sourcing"
    },
    {
      "id": "todo-06",
      "section": "todo",
      "topic": "Replay",
      "prompt": "How is current state reconstructed from the event log?",
      "options": [
        "Fold evolve over the events from an initial state",
        "Run every old command against the live API",
        "Read only the final event",
        "Sort events alphabetically before applying them"
      ],
      "answer": 0,
      "explanation": "Replay applies facts in log order. A single event rarely contains all state, and replay must not redo external effects.",
      "code": "",
      "strand": "core",
      "source": "book/03-todo/03-event-sourcing.md",
      "chapter": "Event sourcing"
    },
    {
      "id": "todo-07",
      "section": "todo",
      "topic": "Crash recovery",
      "prompt": "A log ends with a partial write. Why is simply ignoring it on load insufficient?",
      "options": [
        "A later append can turn the fragment into corrupt interior data",
        "Ignoring it always erases earlier complete records",
        "JSON lines cannot be appended",
        "The compiler will reject the file"
      ],
      "answer": 0,
      "explanation": "The torn tail must be repaired before appending. Otherwise previously tolerable incomplete data becomes part of the middle of the log.",
      "code": "",
      "strand": "core",
      "source": "book/03-todo/04-persistence-and-the-shell.md",
      "chapter": "Persistence and the shell"
    },
    {
      "id": "todo-08",
      "section": "todo",
      "topic": "Persistence boundaries",
      "prompt": "Why route deserialisation through a smart constructor?",
      "options": [
        "Files are untrusted inputs that must preserve domain invariants",
        "serde always executes constructors automatically",
        "It makes file access pure",
        "It prevents every possible disk failure"
      ],
      "answer": 0,
      "explanation": "Deserialisation must not bypass validation. The book uses serde’s conversion support to rebuild validated domain values.",
      "code": "",
      "strand": "core",
      "source": "book/03-todo/04-persistence-and-the-shell.md",
      "chapter": "Persistence and the shell"
    },
    {
      "id": "todo-09",
      "section": "todo",
      "topic": "TLA+ · durability",
      "prompt": "When should a durable write be confirmed to the user in the model?",
      "options": [
        "After the data has been synchronised to storage",
        "Before the append starts",
        "As soon as the command is parsed",
        "Before repairing a torn tail"
      ],
      "answer": 0,
      "explanation": "The crash model distinguishes memory from durable storage. A confirmation before sync_data can promise an event that a crash loses.",
      "code": "",
      "strand": "tla",
      "source": "book/03-todo/05-interlude-the-log-is-the-list.md",
      "chapter": "Interlude: The log is the list"
    },
    {
      "id": "todo-10",
      "section": "todo",
      "topic": "TLA+ · undo",
      "prompt": "Why must the undo checkpoint correspond to a command batch?",
      "options": [
        "One command can produce several events that should be undone together",
        "Every event must always be a separate command",
        "Undo requires deleting the entire log",
        "Batching removes the need for event ordering"
      ],
      "answer": 0,
      "explanation": "A two-field edit can emit multiple events. Per-event checkpoints undo only part of the user’s command.",
      "code": "",
      "strand": "tla",
      "source": "book/03-todo/05-interlude-the-log-is-the-list.md",
      "chapter": "Interlude: The log is the list"
    },
    {
      "id": "netdash-01",
      "section": "netdash",
      "topic": "Counters and rates",
      "prompt": "A byte counter grows from 1,000 to 5,000 over two seconds. What is the rate?",
      "options": [
        "2,000 bytes per second",
        "4,000 bytes per second",
        "2,500 bytes per second",
        "5,000 bytes per second"
      ],
      "answer": 0,
      "explanation": "A rate is the difference in cumulative counters divided by elapsed time: (5,000 − 1,000) / 2.",
      "code": "",
      "strand": "core",
      "source": "book/04-netdash/01-measuring-the-network.md",
      "chapter": "Measuring the network"
    },
    {
      "id": "netdash-02",
      "section": "netdash",
      "topic": "Unknown measurements",
      "prompt": "A counter decreases between samples. What should the domain account for?",
      "options": [
        "A reset or discontinuity, rather than a negative traffic rate",
        "A guaranteed negative transfer",
        "Proof that no traffic occurred",
        "An automatic exact wraparound estimate without more information"
      ],
      "answer": 0,
      "explanation": "Counter resets and wraparound require deliberate modelling. A missing or discontinuous measurement should not be disguised as a trustworthy rate.",
      "code": "",
      "strand": "core",
      "source": "book/04-netdash/01-measuring-the-network.md",
      "chapter": "Measuring the network"
    },
    {
      "id": "netdash-03",
      "section": "netdash",
      "topic": "Snapshot channels",
      "prompt": "A slow watch receiver misses several updates. What does it receive next?",
      "options": [
        "The most recent value available",
        "Every missed value in an unbounded queue",
        "Only the first value ever sent",
        "An error for each skipped sample"
      ],
      "answer": 0,
      "explanation": "watch represents latest-value state rather than an event history. Slow consumers can skip intermediate values.",
      "code": "",
      "strand": "core",
      "source": "book/04-netdash/02-the-sampling-engine.md",
      "chapter": "The sampling engine"
    },
    {
      "id": "netdash-04",
      "section": "netdash",
      "topic": "Bounded history",
      "prompt": "Why keep samples in a bounded ring buffer?",
      "options": [
        "To cap retained history and memory as the daemon keeps running",
        "To guarantee zero allocations everywhere",
        "To retain every sample forever",
        "To make readers mutate the sampler"
      ],
      "answer": 0,
      "explanation": "The buffer holds a fixed recent window. Immutable snapshots let readers see consistent data without coordinating mutations.",
      "code": "",
      "strand": "core",
      "source": "book/04-netdash/02-the-sampling-engine.md",
      "chapter": "The sampling engine"
    },
    {
      "id": "netdash-05",
      "section": "netdash",
      "topic": "Derived state",
      "prompt": "A total can be calculated from two signals. How should it usually be represented?",
      "options": [
        "As a derived closure or memo",
        "As a third independently updated signal",
        "As a global mutable static",
        "As a value calculated only during server startup"
      ],
      "answer": 0,
      "explanation": "Derived state avoids separate copies that can disagree. A memo caches the calculation and propagates changes according to its reactive semantics.",
      "code": "",
      "strand": "core",
      "source": "book/04-netdash/03-leptos-from-first-principles.md",
      "chapter": "Leptos from first principles"
    },
    {
      "id": "netdash-06",
      "section": "netdash",
      "topic": "Hydration",
      "prompt": "What does hydration add to server-rendered HTML?",
      "options": [
        "Browser-side interactivity using the component code",
        "A second database for every component",
        "Automatic periodic full-page reloads",
        "Native system calls in the browser"
      ],
      "answer": 0,
      "explanation": "SSR provides initial HTML. Hydration connects browser behaviour to that markup; feature flags separate server-only and browser-only dependencies.",
      "code": "",
      "strand": "core",
      "source": "book/04-netdash/03-leptos-from-first-principles.md",
      "chapter": "Leptos from first principles"
    },
    {
      "id": "netdash-07",
      "section": "netdash",
      "topic": "One-way streaming",
      "prompt": "Why are Server-Sent Events a good fit for the dashboard?",
      "options": [
        "Updates flow from the server to the browser over HTTP",
        "They require a bidirectional binary protocol",
        "They guarantee delivery of every historical sample",
        "They allow direct access to server memory"
      ],
      "answer": 0,
      "explanation": "SSE fits a one-way snapshot stream and supports browser reconnection. It does not change the latest-value semantics of the source.",
      "code": "",
      "strand": "core",
      "source": "book/04-netdash/04-the-live-dashboard.md",
      "chapter": "The live dashboard"
    },
    {
      "id": "netdash-08",
      "section": "netdash",
      "topic": "Reactive identity",
      "prompt": "A keyed row keeps the same interface name but its measurements change. What must the row do?",
      "options": [
        "Read changing measurements through reactive state or a memo",
        "Change its identity on every sample",
        "Keep displaying the creation-time values",
        "Force the whole page to reload"
      ],
      "answer": 0,
      "explanation": "A stable key preserves identity; it is not itself a data binding. Row contents must depend reactively on the latest state.",
      "code": "",
      "strand": "core",
      "source": "book/04-netdash/04-the-live-dashboard.md",
      "chapter": "The live dashboard"
    },
    {
      "id": "netdash-09",
      "section": "netdash",
      "topic": "TLA+ · atomicity",
      "prompt": "What do PlusCal labels determine?",
      "options": [
        "The boundaries of atomic steps",
        "Only the displayed line numbers",
        "The Rust allocation strategy",
        "The scheduling priority of every process"
      ],
      "answer": 0,
      "explanation": "Everything between labels forms a step in the translated model. Those boundaries must reflect what other tasks can observe.",
      "code": "",
      "strand": "tla",
      "source": "book/04-netdash/05-interlude-latest-value-wins.md",
      "chapter": "Interlude: Latest value wins"
    },
    {
      "id": "netdash-10",
      "section": "netdash",
      "topic": "TLA+ · fairness",
      "prompt": "Can fairness make a reader proceed if its required condition never becomes true?",
      "options": [
        "No; fairness does not enable a disabled action",
        "Yes; fairness changes the shared data",
        "Yes; every fair process runs on every step",
        "Only if the reader has a smaller process ID"
      ],
      "answer": 0,
      "explanation": "Fairness constrains scheduling of enabled actions. It cannot manufacture the condition needed to enable an action.",
      "code": "",
      "strand": "tla",
      "source": "book/04-netdash/05-interlude-latest-value-wins.md",
      "chapter": "Interlude: Latest value wins"
    },
    {
      "id": "ledger-01",
      "section": "ledger",
      "topic": "Money representation",
      "prompt": "Which representation avoids binary floating-point rounding for monetary amounts?",
      "options": [
        "Integer minor units with explicit currency semantics",
        "An f64 rounded only when printed",
        "A number with no currency information",
        "A string concatenated during addition"
      ],
      "answer": 0,
      "explanation": "Integer minor units represent the supported decimal scale exactly. The currency’s exponent and checked arithmetic still matter.",
      "code": "",
      "strand": "core",
      "source": "book/05-ledger/01-money-is-not-a-float.md",
      "chapter": "Money is not a float"
    },
    {
      "id": "ledger-02",
      "section": "ledger",
      "topic": "Runtime currency",
      "prompt": "Currencies are read from a journal file. Which design naturally represents that runtime choice?",
      "options": [
        "A currency field validated as part of the value",
        "A new compile-time generic type for each line at runtime",
        "A PhantomData marker inferred from an arbitrary string",
        "An f64 that embeds currency in its precision"
      ],
      "answer": 0,
      "explanation": "Phantom types are useful when a distinction is fixed in code. A runtime currency value suits data-driven journals.",
      "code": "",
      "strand": "core",
      "source": "book/05-ledger/01-money-is-not-a-float.md",
      "chapter": "Money is not a float"
    },
    {
      "id": "ledger-03",
      "section": "ledger",
      "topic": "Checked arithmetic",
      "prompt": "Adding two valid money amounts may overflow. What API makes that failure explicit?",
      "options": [
        "checked_add returning a Result",
        "An Add implementation that silently wraps",
        "Converting the amounts to f32",
        "Dropping the larger amount"
      ],
      "answer": 0,
      "explanation": "Validity of each operand does not imply representability of the result. A fallible operation makes overflow a domain decision.",
      "code": "",
      "strand": "core",
      "source": "book/05-ledger/01-money-is-not-a-float.md",
      "chapter": "Money is not a float"
    },
    {
      "id": "ledger-04",
      "section": "ledger",
      "topic": "Aggregate invariants",
      "prompt": "A transaction has +100 GBP and −100 USD. Is it balanced under the book’s rule?",
      "options": [
        "No; postings must sum to zero separately in each currency",
        "Yes; the numeric values sum to zero",
        "Yes; all currencies are interchangeable",
        "Only if there are exactly two postings"
      ],
      "answer": 0,
      "explanation": "Conservation is per currency. Combining unlike units into one scalar total would hide money creation or destruction.",
      "code": "",
      "strand": "core",
      "source": "book/05-ledger/02-transactions-that-must-balance.md",
      "chapter": "Transactions that must balance"
    },
    {
      "id": "ledger-05",
      "section": "ledger",
      "topic": "Consistency boundary",
      "prompt": "Where should “this transaction balances” be enforced?",
      "options": [
        "In the aggregate constructor, protected by private fields",
        "Only when a report is printed",
        "Only in the CLI help text",
        "In every caller independently"
      ],
      "answer": 0,
      "explanation": "The aggregate establishes the invariant once at construction and controls mutation, so consumers can rely on it.",
      "code": "",
      "strand": "core",
      "source": "book/05-ledger/02-transactions-that-must-balance.md",
      "chapter": "Transactions that must balance"
    },
    {
      "id": "ledger-06",
      "section": "ledger",
      "topic": "Reports as folds",
      "prompt": "Which iterator tool is particularly suited to emitting each successive running balance?",
      "options": [
        "scan",
        "filter alone",
        "zip with an empty iterator",
        "cycle"
      ],
      "answer": 0,
      "explanation": "scan maintains an accumulator while emitting intermediate results. A fold returns only the final accumulator.",
      "code": "",
      "strand": "core",
      "source": "book/05-ledger/03-reports-as-folds.md",
      "chapter": "Reports as folds"
    },
    {
      "id": "ledger-07",
      "section": "ledger",
      "topic": "Date ranges",
      "prompt": "Why use half-open report ranges [from, to)?",
      "options": [
        "Adjacent periods compose without overlapping their shared boundary",
        "They include both endpoints",
        "They exclude every entry on the first day",
        "They require a timezone for every comparison"
      ],
      "answer": 0,
      "explanation": "One period excludes its upper endpoint and the next includes that same value as its lower endpoint.",
      "code": "",
      "strand": "core",
      "source": "book/05-ledger/03-reports-as-folds.md",
      "chapter": "Reports as folds"
    },
    {
      "id": "ledger-08",
      "section": "ledger",
      "topic": "TLA+ · check then act",
      "prompt": "Two clients check sufficient funds, then post separately. What closes the race?",
      "options": [
        "Make the check and update one atomic consistency operation",
        "Check twice without coordinating",
        "Add a longer delay before posting",
        "Only ensure each transaction sums to zero"
      ],
      "answer": 0,
      "explanation": "Conservation alone does not prevent overspending. The guard and the effect must share a consistency boundary, such as one owner, a lock or a version check.",
      "code": "",
      "strand": "tla",
      "source": "book/05-ledger/04-interlude-money-never-leaks.md",
      "chapter": "Interlude: Money never leaks"
    },
    {
      "id": "logq-01",
      "section": "logq",
      "topic": "Borrowed parsing",
      "prompt": "What does LogLine<'a> record when its fields borrow the input?",
      "options": [
        "The parsed fields cannot outlive the source text",
        "Every field has been cloned",
        "The parser owns all input forever",
        "The line can be kept after its buffer is overwritten"
      ],
      "answer": 0,
      "explanation": "The lifetime connects parsed views to their storage. Keeping data beyond buffer reuse requires owning the needed values.",
      "code": "",
      "strand": "core",
      "source": "book/06-logq/01-parsing-is-design.md",
      "chapter": "Parsing is design"
    },
    {
      "id": "logq-02",
      "section": "logq",
      "topic": "Conditional allocation",
      "prompt": "Why use Cow<str> when parsing escaped and unescaped text?",
      "options": [
        "Borrow unchanged text and own text that needed transformation",
        "Always allocate twice",
        "Allow mutation through any shared reference",
        "Make malformed quoting valid"
      ],
      "answer": 0,
      "explanation": "Cow expresses borrowed-or-owned data. Unchanged slices can remain borrowed; unescaping may require an allocated result.",
      "code": "",
      "strand": "core",
      "source": "book/06-logq/01-parsing-is-design.md",
      "chapter": "Parsing is design"
    },
    {
      "id": "logq-03",
      "section": "logq",
      "topic": "Recursive syntax",
      "prompt": "Why put Box<Expr> inside a recursive expression enum?",
      "options": [
        "Indirection gives the enum a finite size",
        "It automatically evaluates the expression",
        "It removes every allocation",
        "It permits references to expired buffers"
      ],
      "answer": 0,
      "explanation": "A recursive type containing itself directly would have no finite layout. Box provides owned indirection.",
      "code": "",
      "strand": "core",
      "source": "book/06-logq/02-a-tiny-query-language.md",
      "chapter": "A tiny query language"
    },
    {
      "id": "logq-04",
      "section": "logq",
      "topic": "Query checking",
      "prompt": "When should an invalid operator/type combination be rejected?",
      "options": [
        "When checking the parsed query, before reading log input",
        "After every matching log line",
        "Only during printing",
        "Never; silently treat it as false"
      ],
      "answer": 0,
      "explanation": "The query checker transforms raw comparisons into valid predicates. The evaluator then works with operations that make sense.",
      "code": "",
      "strand": "core",
      "source": "book/06-logq/02-a-tiny-query-language.md",
      "chapter": "A tiny query language"
    },
    {
      "id": "logq-05",
      "section": "logq",
      "topic": "Streaming memory",
      "prompt": "A streaming count-by query sees millions of distinct keys. What determines its aggregation memory?",
      "options": [
        "The number of distinct retained keys",
        "Exactly one line, regardless of key count",
        "The number of CPU cores only",
        "Always the full size of the input file"
      ],
      "answer": 0,
      "explanation": "Streaming avoids retaining all lines, but a grouping map still grows with distinct keys. The accumulator owns the keys it keeps.",
      "code": "",
      "strand": "core",
      "source": "book/06-logq/03-streaming-and-aggregation.md",
      "chapter": "Streaming and aggregation"
    },
    {
      "id": "logq-06",
      "section": "logq",
      "topic": "Parallel folds",
      "prompt": "Which law makes splitting and recombining an aggregation safe?",
      "options": [
        "Associativity of combine, with an identity element",
        "Every value must be Copy",
        "The input must be sorted alphabetically",
        "The combine function must perform I/O"
      ],
      "answer": 0,
      "explanation": "An associative combine with an identity forms a monoid. It allows regrouping partial results without changing the result, subject to the operation’s actual laws.",
      "code": "",
      "strand": "core",
      "source": "book/06-logq/03-streaming-and-aggregation.md",
      "chapter": "Streaming and aggregation"
    },
    {
      "id": "linkcheck-01",
      "section": "linkcheck",
      "topic": "Thread safety",
      "prompt": "What does Send mean?",
      "options": [
        "A value may be transferred to another thread",
        "A value can be shared by reference between threads",
        "A value is always immutable",
        "A value is automatically serialised"
      ],
      "answer": 0,
      "explanation": "Send governs transfer between threads. Sync governs sharing references; both depend on the type’s contents.",
      "code": "",
      "strand": "core",
      "source": "book/07-linkcheck/01-concurrency-with-actors.md",
      "chapter": "Concurrency with actors"
    },
    {
      "id": "linkcheck-02",
      "section": "linkcheck",
      "topic": "Actor ownership",
      "prompt": "How does an actor simplify mutable frontier state?",
      "options": [
        "One owner handles messages and decides effects",
        "Every worker directly edits a shared map",
        "It removes the possibility of all logic bugs",
        "It makes every send non-blocking"
      ],
      "answer": 0,
      "explanation": "Single ownership turns concurrent requests into a sequence of messages. A pure handle function can be tested independently of the runtime.",
      "code": "",
      "strand": "core",
      "source": "book/07-linkcheck/01-concurrency-with-actors.md",
      "chapter": "Concurrency with actors"
    },
    {
      "id": "linkcheck-03",
      "section": "linkcheck",
      "topic": "Async boundaries",
      "prompt": "A non-Send parser tree causes a spawned future to fail its Send bound. What design can help?",
      "options": [
        "Finish parsing synchronously and return owned Send data before awaiting",
        "Keep the tree across more await points",
        "Wrap it in Rc",
        "Ignore the compiler diagnostic"
      ],
      "answer": 0,
      "explanation": "Values held across await become part of the future. Keeping non-Send work inside a synchronous helper keeps it out of the suspended future.",
      "code": "",
      "strand": "core",
      "source": "book/07-linkcheck/01-concurrency-with-actors.md",
      "chapter": "Concurrency with actors"
    },
    {
      "id": "linkcheck-04",
      "section": "linkcheck",
      "topic": "Bounded concurrency",
      "prompt": "Why is a semaphore alone not enough to bound a task-per-URL crawler?",
      "options": [
        "Tasks waiting for permits can still form an unbounded queue",
        "Semaphores never limit concurrent work",
        "A semaphore drops every duplicate URL",
        "All tasks run synchronously behind a semaphore"
      ],
      "answer": 0,
      "explanation": "The permit limit caps active work, but spawning one waiting task per URL can still grow memory without bound. The frontier should own a bounded dispatch policy.",
      "code": "",
      "strand": "core",
      "source": "book/07-linkcheck/02-backpressure-and-cancellation.md",
      "chapter": "Backpressure and cancellation"
    },
    {
      "id": "linkcheck-05",
      "section": "linkcheck",
      "topic": "Backpressure",
      "prompt": "Why can a cycle of bounded channels deadlock?",
      "options": [
        "Every participant can wait to send while nobody is receiving",
        "Bounded channels cannot receive data",
        "Every send always drops a message",
        "The compiler rejects all channel cycles"
      ],
      "answer": 0,
      "explanation": "Backpressure is waiting for capacity. In a cycle, participants can wait on one another; the coordinator must preserve an opportunity to make progress.",
      "code": "",
      "strand": "core",
      "source": "book/07-linkcheck/02-backpressure-and-cancellation.md",
      "chapter": "Backpressure and cancellation"
    },
    {
      "id": "linkcheck-06",
      "section": "linkcheck",
      "topic": "Structured cancellation",
      "prompt": "Why keep spawned workers in a JoinSet?",
      "options": [
        "Their lifetime and results have an owner that can join or abort them",
        "It makes every worker immune to cancellation",
        "It makes worker failures impossible",
        "It stores all results permanently on disk"
      ],
      "answer": 0,
      "explanation": "JoinSet provides structured ownership of tasks and their completion results. Dropping the set aborts remaining tasks.",
      "code": "",
      "strand": "core",
      "source": "book/07-linkcheck/02-backpressure-and-cancellation.md",
      "chapter": "Backpressure and cancellation"
    },
    {
      "id": "linkcheck-07",
      "section": "linkcheck",
      "topic": "TLA+ · termination",
      "prompt": "Which condition is necessary before reporting a crawl as done?",
      "options": [
        "The pending queue is empty and no work is in flight",
        "The pending queue is empty, regardless of workers",
        "At least one worker completed",
        "No new URL arrived during the last millisecond"
      ],
      "answer": 0,
      "explanation": "An empty queue is not enough: an in-flight worker may discover more URLs. Safety of the Done state and eventual termination are separate claims.",
      "code": "",
      "strand": "tla",
      "source": "book/07-linkcheck/03-interlude-does-the-crawl-finish.md",
      "chapter": "Interlude: Does the crawl finish?"
    },
    {
      "id": "linkcheck-08",
      "section": "linkcheck",
      "topic": "TLA+ · model scope",
      "prompt": "TLC finds no deadlock on a tiny three-page site. What can you conclude?",
      "options": [
        "No deadlock was found within that checked model and its assumptions",
        "All crawls of all sizes are deadlock-free",
        "The Rust binary has been verified automatically",
        "Larger queue capacities cannot change behaviour"
      ],
      "answer": 0,
      "explanation": "A model must be large enough for the relevant interleaving to exist. Small-scope checking is powerful but its result is scoped to the model.",
      "code": "",
      "strand": "tla",
      "source": "book/07-linkcheck/03-interlude-does-the-crawl-finish.md",
      "chapter": "Interlude: Does the crawl finish?"
    },
    {
      "id": "proofs-01",
      "section": "proofs",
      "topic": "Algebra of types",
      "prompt": "Why does replacing three independent boolean flags with an enum often improve a domain model?",
      "options": [
        "The enum represents only the meaningful alternatives instead of all eight flag combinations",
        "Enums always use zero bytes at runtime",
        "Boolean fields cannot be pattern matched",
        "Enums allow every combination without validation"
      ],
      "answer": 0,
      "explanation": "Three booleans have 2 × 2 × 2 = 8 possible values, including contradictory states. A sum type can name exactly the alternatives the domain permits.",
      "code": "",
      "strand": "core",
      "source": "book/08-proofs/01-types-as-propositions.md",
      "chapter": "Types as propositions"
    },
    {
      "id": "proofs-02",
      "section": "proofs",
      "topic": "Curry–Howard",
      "prompt": "Under the Curry–Howard correspondence, what does a Rust function body represent?",
      "options": [
        "A proof of the proposition expressed by its signature",
        "A runtime benchmark of its signature",
        "A subtype of every argument",
        "A guarantee that the function terminates"
      ],
      "answer": 0,
      "explanation": "Types correspond to propositions and values to proofs: implementing a function constructs evidence for its result from evidence supplied as arguments. Panic, divergence and unsafe assumptions limit the analogy in ordinary Rust.",
      "code": "",
      "strand": "core",
      "source": "book/08-proofs/01-types-as-propositions.md",
      "chapter": "Types as propositions"
    },
    {
      "id": "proofs-03",
      "section": "proofs",
      "topic": "Higher-kinded types",
      "prompt": "Why can’t stable Rust express one fully general Haskell-style Functor trait for Option, Result and Vec?",
      "options": [
        "Rust cannot abstract directly over type constructors such as Option<_>",
        "Rust has no generic traits",
        "Those types do not support map operations",
        "Associated types can never mention generic parameters"
      ],
      "answer": 0,
      "explanation": "Haskell can quantify over a constructor of kind Type → Type. Rust abstracts over concrete types; generic associated types help in narrower designs but are not general higher-kinded types.",
      "code": "",
      "strand": "core",
      "source": "book/08-proofs/01-types-as-propositions.md",
      "chapter": "Types as propositions"
    },
    {
      "id": "proofs-04",
      "section": "proofs",
      "topic": "Lawful abstractions",
      "prompt": "How does the book recommend checking functor and monad laws in Rust?",
      "options": [
        "Encode the laws as property tests over many generated values",
        "Assume matching method names make an implementation lawful",
        "Check one handwritten example for each method",
        "Require the compiler to prove semantic equality"
      ],
      "answer": 0,
      "explanation": "Rust’s trait system cannot state equations such as mapping identity changes nothing. Property-based tests make those algebraic laws executable evidence.",
      "code": "",
      "strand": "core",
      "source": "book/08-proofs/01-types-as-propositions.md",
      "chapter": "Types as propositions"
    },
    {
      "id": "proofs-05",
      "section": "proofs",
      "topic": "Type-level functions",
      "prompt": "In Payment<S>, why give the sealed State trait an associated Evidence type?",
      "options": [
        "Each state selects exactly the evidence stored for that state",
        "It lets callers invent new payment states",
        "It converts every transition into a runtime string",
        "It makes all states store the same optional fields"
      ],
      "answer": 0,
      "explanation": "S::Evidence acts like a type-level function from state to data. Created can carry no evidence while Authorised and Captured carry the identifiers their states guarantee.",
      "code": "",
      "strand": "core",
      "source": "book/08-proofs/02-state-machines-in-the-type-system.md",
      "chapter": "State machines in the type system"
    },
    {
      "id": "proofs-06",
      "section": "proofs",
      "topic": "Proof tokens",
      "prompt": "What makes an Authorisation proof token meaningful evidence rather than a decorative wrapper?",
      "options": [
        "Its construction is private and only successful authorisation can produce one",
        "Its fields are all public",
        "It can be created from any boolean",
        "It is represented as a string"
      ],
      "answer": 0,
      "explanation": "An evidence type is useful only when it is unforgeable outside the trusted boundary. Possessing the token then records that the check or effect which creates it succeeded.",
      "code": "",
      "strand": "core",
      "source": "book/08-proofs/02-state-machines-in-the-type-system.md",
      "chapter": "State machines in the type system"
    },
    {
      "id": "proofs-07",
      "section": "proofs",
      "topic": "Indexed protocols",
      "prompt": "What does Program<From, To, Out> add beyond a single typestate transition?",
      "options": [
        "A composable value whose type records the protocol’s start state, end state and output",
        "A way to skip illegal intermediate states at runtime",
        "A guarantee that external services never fail",
        "A replacement for every enum in the program"
      ],
      "answer": 0,
      "explanation": "Indexing the program by its endpoints lets composition require one step’s end state to match the next step’s start state, making whole workflows type-check.",
      "code": "",
      "strand": "core",
      "source": "book/08-proofs/02-state-machines-in-the-type-system.md",
      "chapter": "State machines in the type system"
    },
    {
      "id": "proofs-08",
      "section": "proofs",
      "topic": "Branded scopes",
      "prompt": "What invariant does a fresh lifetime brand enforce for scoped values?",
      "options": [
        "Values from one scope cannot be mixed with another scope or escape it",
        "Every value must be copied into global storage",
        "The scope may outlive the program",
        "A value is guaranteed to be used exactly once"
      ],
      "answer": 0,
      "explanation": "A higher-ranked closure introduces a fresh lifetime that callers cannot name. Values branded with it stay tied to that invocation, much like Haskell’s runST isolates state threads.",
      "code": "",
      "strand": "core",
      "source": "book/08-proofs/02-state-machines-in-the-type-system.md",
      "chapter": "State machines in the type system"
    },
    {
      "id": "proofs-09",
      "section": "proofs",
      "topic": "Refinement types",
      "prompt": "What does a refinement type add to an ordinary base type?",
      "options": [
        "A logical predicate that values of the type must satisfy",
        "A second heap allocation for every value",
        "An automatically generated network adapter",
        "A requirement that all values implement Clone"
      ],
      "answer": 0,
      "explanation": "A refinement narrows a type with a proposition, such as an amount being positive or a refund not exceeding the captured amount. Tools discharge the resulting verification conditions.",
      "code": "",
      "strand": "core",
      "source": "book/08-proofs/03-beyond-the-type-checker.md",
      "chapter": "Beyond the type checker"
    },
    {
      "id": "proofs-10",
      "section": "proofs",
      "topic": "Assurance ladder",
      "prompt": "Why can a typed and locally verified refund function still allow a double refund?",
      "options": [
        "Concurrent calls can each observe the same pre-refund state before either update commits",
        "Typestate makes arithmetic overflow unavoidable",
        "A proof token always permits unlimited reuse",
        "Model checking ignores all state transitions"
      ],
      "answer": 0,
      "explanation": "Local contracts prove facts about one call. The double-refund bug is a system-level interleaving, so the read-check-write operation also needs atomicity and a concurrency model such as the PlusCal/TLA+ one in the chapter.",
      "code": "",
      "strand": "core",
      "source": "book/08-proofs/03-beyond-the-type-checker.md",
      "chapter": "Beyond the type checker"
    },
    {
      "id": "proofs-11",
      "section": "proofs",
      "topic": "Applicative validation",
      "prompt": "When is accumulating validation errors preferable to chaining checks with the ? operator?",
      "options": [
        "When independent fields should report all of their errors in one pass",
        "When later checks require the successful value from earlier checks",
        "When the first error must stop an irreversible effect",
        "When there are no possible validation failures"
      ],
      "answer": 0,
      "explanation": "Monadic sequencing with ? stops at the first error and supports dependency. Applicative-style validation combines independent results so a user can fix every field reported at once.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/04-errors-as-values.md",
      "chapter": "Errors are values"
    },
    {
      "id": "proofs-12",
      "section": "proofs",
      "topic": "Parametricity",
      "prompt": "What does a minimal generic signature tell a reviewer about an implementation?",
      "options": [
        "The absent trait bounds rule out operations the implementation has no permission to use",
        "The implementation can call any method on the type",
        "The function is necessarily implemented with unsafe code",
        "All instantiations have identical runtime representation"
      ],
      "answer": 0,
      "explanation": "Generic bounds are capabilities. If a function receives only T, without Clone, Display or other bounds, its signature sharply limits what it can observe or do with a T.",
      "code": "",
      "strand": "core",
      "source": "book/01-foundations/05-traits-and-generics.md",
      "chapter": "Traits and generics"
    },
    {
      "id": "proofs-13",
      "section": "proofs",
      "topic": "Capabilities",
      "prompt": "Why pass a narrow capability into domain logic instead of letting it access an ambient client?",
      "options": [
        "The signature exposes and limits the effects the logic is authorised to perform",
        "It proves the external service will always respond",
        "It removes every runtime error automatically",
        "It gives the domain access to all infrastructure"
      ],
      "answer": 0,
      "explanation": "Explicit capabilities make authority visible and reviewable. Rust traits cannot fully encode an effect row, but a narrow port still prevents accidental access to unrelated effects.",
      "code": "",
      "strand": "core",
      "source": "book/02-ddns/03-ports-and-adapters.md",
      "chapter": "Ports and adapters"
    },
    {
      "id": "proofs-14",
      "section": "proofs",
      "topic": "Existential packaging",
      "prompt": "Why does data loaded from storage need an enum such as AnyTask around typestate values?",
      "options": [
        "The precise state is known only at runtime, so the package hides it until pattern matching reveals it",
        "Rust requires every stored value to use dynamic dispatch",
        "Typestate values cannot contain ordinary fields",
        "The enum erases all state checks permanently"
      ],
      "answer": 0,
      "explanation": "The package says there exists some state S for Task<S>. Matching on the runtime sum type recovers a concrete variant and therefore the precise typestate needed by state-specific operations.",
      "code": "",
      "strand": "core",
      "source": "book/03-todo/02-modelling-tasks.md",
      "chapter": "Modelling tasks"
    },
    {
      "id": "appendices-01",
      "section": "appendices",
      "topic": "Pattern transfer",
      "prompt": "A port wraps a third-party API and translates its DTOs into domain values. Which pattern names that boundary?",
      "options": [
        "Anti-corruption layer",
        "Typestate",
        "Report as fold",
        "Phantom types"
      ],
      "answer": 0,
      "explanation": "The boundary prevents the external service’s representation and vocabulary from spreading through the domain.",
      "code": "",
      "strand": "core",
      "source": "book/09-appendices/01-pattern-catalogue.md",
      "chapter": "Appendix A: Pattern catalogue"
    },
    {
      "id": "appendices-02",
      "section": "appendices",
      "topic": "Pattern transfer",
      "prompt": "You need deterministic business rules with replaceable file and network access. Which patterns fit together?",
      "options": [
        "Functional core / imperative shell, plus ports and adapters",
        "Global mutable state, plus unchecked strings",
        "A parser with side effects in every branch",
        "A single concrete HTTP client throughout the domain"
      ],
      "answer": 0,
      "explanation": "Pure rules make decisions from values. Ports describe needed effects; adapters and the shell connect them to the outside world.",
      "code": "",
      "strand": "core",
      "source": "book/09-appendices/01-pattern-catalogue.md",
      "chapter": "Appendix A: Pattern catalogue"
    },
    {
      "id": "appendices-03",
      "section": "appendices",
      "topic": "Option and Result",
      "prompt": "What does Option<Result<T, E>>::transpose() return?",
      "options": [
        "Result<Option<T>, E>",
        "Result<T, Option<E>>",
        "Option<T>",
        "Vec<Result<T, E>>"
      ],
      "answer": 0,
      "explanation": "transpose moves the fallibility outward: None becomes Ok(None), Some(Ok(x)) becomes Ok(Some(x)), and Some(Err(e)) becomes Err(e).",
      "code": "",
      "strand": "core",
      "source": "book/09-appendices/02-syntax-quick-reference.md",
      "chapter": "Appendix B: Rust syntax quick reference"
    },
    {
      "id": "appendices-04",
      "section": "appendices",
      "topic": "Visibility",
      "prompt": "What does pub(crate) allow?",
      "options": [
        "Access from within the current crate",
        "Access only from the current function",
        "Access from every dependent crate",
        "Access only inside an integration test"
      ],
      "answer": 0,
      "explanation": "pub(crate) exposes an item across its own crate while keeping it out of the external public API.",
      "code": "",
      "strand": "core",
      "source": "book/09-appendices/02-syntax-quick-reference.md",
      "chapter": "Appendix B: Rust syntax quick reference"
    },
    {
      "id": "appendices-05",
      "section": "appendices",
      "topic": "Book toolchain",
      "prompt": "What is the book’s PDF pipeline?",
      "options": [
        "Markdown → Pandoc HTML → headless Chrome PDF",
        "Markdown → rustc → PDF",
        "Markdown → a database → Cargo",
        "Markdown → direct image screenshots only"
      ],
      "answer": 0,
      "explanation": "Pandoc and the Lua filter produce HTML, and Chrome renders diagrams and prints using the book’s paged styles.",
      "code": "",
      "strand": "core",
      "source": "book/09-appendices/03-building-this-book.md",
      "chapter": "Appendix C: Building this book"
    },
    {
      "id": "appendices-06",
      "section": "appendices",
      "topic": "Further study",
      "prompt": "Where does the book collect topic-specific resources for deeper study?",
      "options": [
        "Appendix D: Further reading",
        "The generated flake lock file",
        "Only the tmux configuration",
        "The event store format"
      ],
      "answer": 0,
      "explanation": "Appendix D groups resources for Rust, types and domain modelling, formal methods, and the individual projects.",
      "code": "",
      "strand": "core",
      "source": "book/09-appendices/04-further-reading.md",
      "chapter": "Appendix D: Further reading"
    },
    {
      "id": "appendices-07",
      "section": "appendices",
      "topic": "TLA+ · temporal logic",
      "prompt": "What does []P mean in a temporal formula?",
      "options": [
        "P holds in every state of the behaviour",
        "P eventually holds at least once",
        "P holds only in the next state",
        "P is a mutable array"
      ],
      "answer": 0,
      "explanation": "[] is “always”; <> is “eventually”. These describe behaviours rather than imperative control flow.",
      "code": "",
      "strand": "tla",
      "source": "book/09-appendices/05-tla-quick-reference.md",
      "chapter": "Appendix E: TLA+ quick reference"
    },
    {
      "id": "appendices-08",
      "section": "appendices",
      "topic": "TLA+ · state updates",
      "prompt": "What does x' refer to in a TLA+ action?",
      "options": [
        "The value of x in the next state",
        "The previous value of x",
        "The derivative of x",
        "A separate constant named x"
      ],
      "answer": 0,
      "explanation": "An unprimed variable refers to the current state; a primed variable refers to the next state. Actions relate those states.",
      "code": "",
      "strand": "tla",
      "source": "book/09-appendices/05-tla-quick-reference.md",
      "chapter": "Appendix E: TLA+ quick reference"
    }
  ]
};
