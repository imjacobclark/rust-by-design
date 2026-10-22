# Appendix B: Rust syntax quick reference

A compact reminder of the syntax used in this book, grouped by what you're trying
to do. Chapter references point to where each idea is explained properly.

## Bindings and basic types

```rust
let x = 5;                 // immutable binding, type inferred (i32)
let mut count = 0u64;      // mutable; literal suffix picks the type
let name: &str = "kitchen";// string slice (borrowed)
let owned = String::from("kitchen"); // owned, growable string
let x = x * 2;             // shadowing: a new binding with the same name
const MAX_RETRIES: u32 = 5;// compile-time constant
static BANNER: &str = "netdash"; // one value with a fixed address
```

| Kind | Types |
|---|---|
| Signed integers | `i8` `i16` `i32` `i64` `i128` `isize` |
| Unsigned integers | `u8` `u16` `u32` `u64` `u128` `usize` |
| Floats | `f32` `f64` |
| Other scalars | `bool`, `char` (a Unicode scalar value, 4 bytes) |
| Compound | tuples `(i32, &str)`, arrays `[u8; 4]`, slices `&[T]` |
| Unit | `()`, the "no meaningful value" type |
| Never | `!`, the type of expressions that never return (`panic!`, `loop {}`) |

## Functions and closures (Chapters 1, 6)

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b                  // last expression, no semicolon = return value
}

fn first_word(s: &str) -> &str {           // borrows in, borrows out
    s.split_whitespace().next().unwrap_or("")
}

let double = |x: i32| x * 2;               // closure
let threshold = 10;
let above = |x: &i32| *x > threshold;      // captures `threshold` by reference
let owned = move || println!("{threshold}"); // `move` captures by value

fn apply<F: Fn(i32) -> i32>(f: F, x: i32) -> i32 { f(x) }
fn apply_dyn(f: &dyn Fn(i32) -> i32, x: i32) -> i32 { f(x) }
fn make_adder(n: i32) -> impl Fn(i32) -> i32 { move |x| x + n }
```

## Ownership and borrowing (Chapter 2)

```rust
let a = String::from("hi");
let b = a;                 // move: `a` can no longer be used
let c = b.clone();         // explicit deep copy

fn read(s: &String) {}     // shared borrow: many readers
fn edit(s: &mut String) {} // exclusive borrow: one writer
read(&c);
let mut d = c;
edit(&mut d);

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { // lifetimes relate
    if x.len() >= y.len() { x } else { y }          // inputs to outputs
}
```

## Structs, enums and pattern matching (Chapter 3)

```rust
struct Point { x: f64, y: f64 }            // named fields
struct Celsius(f64);                       // tuple struct / newtype
struct Marker;                             // unit struct

enum Shape {
    Circle { radius: f64 },
    Rect { w: f64, h: f64 },
    Empty,
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle { radius } => std::f64::consts::PI * radius * radius,
            Shape::Rect { w, h } => w * h,
            Shape::Empty => 0.0,
        }
    }
}

let p = Point { x: 1.0, y: 2.0 };
let Point { x, y } = p;                    // destructuring
let q = Point { x: 0.0, ..p };             // struct update syntax
```

Patterns go anywhere a binding does:

```rust
match value {
    0 => "zero",
    1 | 2 => "small",                      // alternatives
    3..=9 => "single digit",               // ranges
    n if n < 0 => "negative",              // guards
    _ => "large",                          // wildcard
}

if let Some(x) = maybe { /* ... */ }
let Some(x) = maybe else { return };       // let-else: bind or bail
while let Some(job) = queue.pop() { /* ... */ }
match pair { (first, _) => first }         // tuple patterns
match slice { [] => 0, [x] => *x, [x, .., y] => x + y }
```

## Option, Result and `?` (Chapter 4)

```rust
fn find(id: u32) -> Option<Task> { /* Some(task) or None */ }
fn parse(s: &str) -> Result<Config, ConfigError> { /* Ok(..) or Err(..) */ }

let cfg = parse(text)?;                    // return early on Err
let name = task?.title;                    // in a fn returning Option

opt.map(|t| t.title)                       // transform the Some
   .filter(|t| !t.is_empty())
   .unwrap_or_default();
res.map_err(ConfigError::Io)?;             // convert the error type
opt.ok_or(Error::Missing)?;                // Option -> Result
res.ok();                                  // Result -> Option
```

Error enums with `thiserror`:

```rust
#[derive(Debug, thiserror::Error)]
pub enum ConfigError {
    #[error("could not read {path}")]
    Io { path: PathBuf, #[source] source: std::io::Error },
    #[error("zone id must not be empty")]
    EmptyZone,
}
```

## Traits and generics (Chapter 5)

```rust
trait Describe {
    fn describe(&self) -> String;
    fn shout(&self) -> String { self.describe().to_uppercase() } // default
}

impl Describe for Point {
    fn describe(&self) -> String { format!("({}, {})", self.x, self.y) }
}

fn show<T: Describe>(item: &T) {}          // static dispatch (generic)
fn show_impl(item: &impl Describe) {}      // same thing, shorter
fn show_dyn(item: &dyn Describe) {}        // dynamic dispatch (vtable)
fn show_where<T>(item: &T) where T: Describe + Clone {}

trait Store {
    type Error;                            // associated type
    fn load(&self) -> Result<Vec<Event>, Self::Error>;
}

trait IpSource {
    async fn current(&self) -> Result<IpAddr, LookupError>; // async fn in trait
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, PartialOrd, Ord, Default)]
struct Priority(u8);
```

Common standard traits:

| Trait | Gives you |
|---|---|
| `Debug` / `Display` | `{:?}` / `{}` formatting |
| `Clone` / `Copy` | explicit / implicit duplication |
| `PartialEq` / `Eq` | `==`; `Eq` promises reflexivity |
| `PartialOrd` / `Ord` | `<`, sorting; `Ord` is a total order |
| `Hash` | use as a `HashMap` / `HashSet` key |
| `Default` | `T::default()` |
| `From` / `Into` | infallible conversion |
| `TryFrom` / `TryInto` | fallible conversion |
| `FromStr` | `"..".parse::<T>()` |
| `AsRef` / `Borrow` | cheap reference conversion |
| `Deref` | `*x` and auto-deref (use sparingly) |
| `Iterator` / `IntoIterator` | `for` loops and adaptors |
| `Add`, `Sub`, `Neg`, `Mul`, ... | operator overloading |
| `Drop` | cleanup when a value goes out of scope |
| `Send` / `Sync` | safe to move / share across threads |

## Iterators (Chapter 6)

```rust
let total: u64 = items.iter().map(|i| i.size).sum();
let names: Vec<_> =
    tasks.iter().filter(|t| t.is_open()).map(|t| &t.title).collect();
let by_id: HashMap<_, _> = tasks.into_iter().map(|t| (t.id, t)).collect();
// stops at the first Err
let parsed: Result<Vec<_>, _> = lines.map(parse_line).collect();
let (ok, bad): (Vec<_>, Vec<_>) =
    results.into_iter().partition(Result::is_ok);
let balance = postings.iter().fold(0, |acc, p| acc + p.amount);
let running: Vec<_> = amounts
    .iter()
    .scan(0, |acc, a| { *acc += a; Some(*acc) })
    .collect();
for (i, line) in text.lines().enumerate() {}
xs.iter().zip(ys).take_while(|(a, b)| a == b).count();
xs.windows(2).all(|w| w[0] <= w[1]);       // is it sorted?
```

| Want | Use |
|---|---|
| borrow each element | `.iter()` |
| mutably borrow each | `.iter_mut()` |
| take ownership of each | `.into_iter()` |
| first match | `.find(..)`, `.position(..)` |
| any / all | `.any(..)`, `.all(..)` |
| flatten nested | `.flat_map(..)`, `.flatten()` |
| min / max by key | `.min_by_key(..)`, `.max_by(..)` |
| chunk a slice | `.chunks(n)`, `.windows(n)` |

## Modules and visibility (Chapter 7)

```rust
mod domain {                    // or a file: src/domain.rs / src/domain/mod.rs
    pub struct Title(String);   // type is public, field is private
    impl Title {
        pub fn new(s: &str) -> Option<Title> { /* validate */ }
    }
    pub(crate) fn helper() {}   // visible within this crate only
}

use crate::domain::Title;       // absolute path from crate root
use super::*;                   // everything from the parent module
pub use domain::Title;          // re-export
```

## Tests (Chapters 1, 7)

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rejects_empty_titles() {
        assert!(Title::new("  ").is_none());
    }

    #[test]
    #[should_panic(expected = "overflow")]
    fn panics_on_overflow() { /* ... */ }
}

proptest::proptest! {
    #[test]
    fn round_trips(s in "[a-z]{1,20}") {
        let t = Title::new(&s).unwrap();
        proptest::prop_assert_eq!(t.as_str(), s.as_str());
    }
}
```

## Smart pointers and shared state (Chapters 2, 18, 27)

| Type | Use when |
|---|---|
| `Box<T>` | heap allocation; recursive types; trait objects `Box<dyn Trait>` |
| `Rc<T>` / `Arc<T>` | shared ownership (single-threaded / thread-safe) |
| `RefCell<T>` | interior mutability, checked at runtime, single-threaded |
| `Mutex<T>` / `RwLock<T>` | interior mutability across threads |
| `Cow<'a, T>` | borrow when you can, own when you must |

## Async (Chapters 10, 11, 18, 27, 28)

```rust
#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let ip = source.current().await?;
    let handle = tokio::spawn(async move { work().await });
    let (a, b) = tokio::join!(fetch_a(), fetch_b());
    tokio::select! {
        _ = tokio::signal::ctrl_c() => {}
        r = handle => { r??; }
    }
    Ok(())
}
```

## Macros you'll meet

| Macro | Does |
|---|---|
| `println!`, `eprintln!`, `format!`, `write!` | formatting (`{}`, `{:?}`, `{name}`, `{:.2}`, `{:>8}`) |
| `vec![..]` | build a `Vec` |
| `assert!`, `assert_eq!`, `debug_assert!` | checks (debug_ only in debug builds) |
| `todo!()`, `unimplemented!()` | placeholders that panic |
| `unreachable!()` | "this can't happen" (a panic if it does) |
| `matches!(x, Pattern)` | pattern test as a `bool` |
| `dbg!(expr)` | print an expression and its value, return it |
