# RUST Baby Book: 0 to Solid Middle + Your Road to Master
### Wrote for new people. Very short. Very easy. With examples you can type.
> Honest scope Sep 2026: this = 0-100% of official Rust Book = solid middle, NOT full master. Master for compositor/GUI/video needs AFTER + AA road below. Title keeps old name so links do not break.
> Source: I read the full official Rust Book live (https://doc.rust-lang.org/book/ - Edition 2024, Chapters 1-21 + end pages). Then I wrote it again in simple words.
> Verified on (run these yourself, Sep 17 2026):
> - `rustc 1.98.1 (48a229cea 2026-09-01)` — stable Sep 3 2026, fixes vtable miscompilation. Check: `rustc --version`, `cargo --version`, `rustup show`.
> - `cargo 1.98.1`, Edition 2024, `resolver = "3"` automatic. All code below runs on stable unless marked NIGHTLY.
> - Re-verified live via blog.rust-lang.org + releases.rs. Last checked: Sep 17 2026.

**How to read this (easy English):**
1. Go top to bottom. Do not skip.
2. NEW Q-FIRST RULE (Sep 2026: struggle first, then look): for each `Q` box, COVER answer with hand. Read Q only. Try for 5 minutes first. Write steps in words, then code. It is okay to be wrong.
3. Then read `Baby why` line by line below. I trace real values like `x=1 -> 3`.
4. Type each answer with `cargo run`. Break 1 line on purpose, see error, fix it.
5. `Common mistake` = where most new people stop. Read it.
6. Friday check: close book, explain 3 boxes out loud. If you cannot, do again. No copy-paste.
7. One Q at a time. Do not see full code first. Full code is below, after you try.

**I use easy words (for non-native readers):**
- I use short lines. One line = one idea. Max 15 words.
- This rule is for code + `Baby idea` + `Baby why` only.
- `Why need? / Senior use?` boxes are HARD English.
- SKIP IF HARD: skip those boxes first time. Code first.
- I use `you` and present tense: `you give`, `you see`.
- I use the same word for the same thing.
- Rust words stay the same. I say what they mean in `()` first time.
- Easy-English rules Sep 2026: US plain-words guide, California easy-words guide (grade 8 or less), Garbl many-languages guide 2026-07-26, ISO plain words.
- `New person mistake` = where most new people stop. Read it.
- Old word `Noob mistake` = same as `New person mistake`. I use new words now.

**Hard Rust word = easy meaning (official term paired every time):**
- `mut` = you can change it
- `move` = you give ownership away, old variable is gone
- `borrow &` = shared borrow, you look, you do not take (official: shared reference)
- `&mut` = mutable borrow, you look and change (official: mutable reference)
- `lifetime 'a` = how long the borrow lives
- `trait` = shared skill, says what a type can do (official: trait)
- `generic <T>` = type placeholder for any type (official: generic parameter, NOT a box)
- `panic!` = program stops now
- `Result` = success/failure container, `Ok` or `Err`, you can fix (official: Result, NOT a box)
- `Option` = maybe container, `Some` or `None` (official: Option, NOT a box)
- `?` = if bad, pass error up; if good, keep value
- `Box<T>` = heap box, one owner (official: Box, the ONLY heap box)
- `Rc/Arc` = shared owners, count owners (official: Rc single-thread, Arc multi-thread)
- `Mutex/RefCell` = safe change inside with checks
- `async/.await` = wait without blocking, start later
- `drop` = cleanup at end of scope (official: drop, NOT dead/kill)

**`Box` word is used 5 ways — do not mix (Qwen fix):**
- heap box = `Box<T>` only.
- maybe container = `Option`, never call it box.
- success container = `Result`, never call it box.
- type placeholder = `<T>`, never call it box.
- package = crate/package/library, never call it box.

**Controlled words I use (CEFR A2-B1, translates clean):**
- I use: make, give, take, look, change, keep, drop, check, run, stop, fix, show, use, need, want.
- I avoid: fancy phrasal verbs, sarcasm, color-only hints, hidden meaning.
- Company names (Stripe, Discord, Cloudflare) = OPTIONAL real-world notes, skip if hard. Universal examples (names, scores, files) come first.

**Rust in 1 sentence:** Rust is a strict checker for memory. No trash truck. It checks all before you run.

**Donkey story in this book (MAIN picture, use this first):** You = baby. Value = donkey (String, Vec...). `&` = rope to look. `&mut` = ride and change. Heap = stable. One donkey has one owner. Two owners pull at once = Rust says no.
- Other small pictures are HELP ONLY, not new rules:
- backpack with pockets = struct. zoo cage = trait `dyn`. chef + pots = async. carts + villages = threads. Same donkey idea, new clothes.
- Each picture links to a real compiler error:
- move rope = E0382 (use of moved value). look + ride = E0502. two rides = E0499. short life = E0597. return dead look = E0515. need `mut` = E0596. wrong type = E0308. Search `E0382` in this book to see all.
- I write plain subject-verb-object sentences so DeepL/Google Translate works. Example: "You move the value to B." Not broken English.

**Hard English help (idioms I use):**
- house on fire = big bug, stop now (`panic!`).
- bring umbrella = be ready (`Result`).
- workhorse = tool you use a lot (`assert_eq!`).
- boss corner = hard extra Q, skip is ok.
- penny = 1 cent, nickel = 5 cents, quarter = 25 cents (US coins).
- 7878 = RUST on old phone keys (7=R/S, 8=T, 7=P/R/S, 8=T). Just a port number. No need to remember.

**How to code yourself:** each `Try it` / `Do now` / `Q` answer box is tagged. FULL PROGRAM = copy to `src/main.rs` and run. INSIDE MAIN = put lines inside `fn main(){...}`. NEEDS DEP = add to `Cargo.toml` first (version given). NEEDS FILE = make the file first. SHAPE ONLY = do not run, read only.
- Use practice name `cargo new learn_rust` (not `cargo new test` — `test` confuses with `cargo test`). Then `src/main.rs` -> `cargo run`.
- Teaching snippets with bare `let` and no `fn main` around go INSIDE `fn main(){...}`. Multi-file `mod garden` needs real files. `use` example lines are 7 separate choices, pick one, not all.
- Rule for `unwrap`: baby examples may use `.expect("why")` so you see the reason. Prod code uses `Result` + `?`. Every `.unwrap()` below is TEACHING ONLY unless tests need it.

**4 phases: baby walk -> talk -> decide -> adult (do not skip):**
- Based on Sep 2026 help: brain full (max 3-4 new things), full->half->you do, small steps with names, guess before run, Watch->Build->Change->Test->Explain->Design.
- PHASE 1 WALK (0,A,B,C,D,E): you see result. Print, vars, types, small fn, if/loops. No `String`, no `&`, no `?`.
- PHASE 2 TALK (F,G,H,I,J,K): you use data. Own, look, make own toy, choose with match, folders, lists. Small `String` ok.
- PHASE 3 DECIDE (L,M,N,O,P,Q): you decide + fix. Errors, shared skills, tests, small project, shortcuts.
- PHASE 4 ADULT (R,S,T,U,V,W): you share + wait + build. Smart boxes, many jobs same time, async, extra powers, web server.
- Rule for each phase: max 3 new ideas. Full code first, then half code with `// TODO you write`, then you write all.
- Before you run any `Try it`: first GUESS what it shows. Then run. Then change 1 number. Then fix 1 bug. This is Predict-Before-Run.
- Ready to go next phase? You can: 1) change code with no help, 2) guess right before run, 3) say what 1 error means. If no, stay 1 more day.

---
- [0. SETUP](#0-setup-install-once)
- [A. Hello World + Cargo](#a-hello-world--cargo-your-toy-box)
- [B. Variables](#b-variables-mut-const-shadowing)
- [C. Data Types](#c-data-types-the-lego-blocks)
- [D. Functions](#d-functions-little-machines)
- [E. Control Flow](#e-control-flow-if--loops)
- [F. Ownership](#f-ownership-the-1-big-idea-of-rust)
- [G. Borrowing + Slices](#g-borrowing--slices-dont-take-just-point)
- [H. Structs + Methods](#h-structs--methods-make-your-own-toy)
- [I. Enums + Match](#i-enums-match-option-no-null)
- [J. Modules](#j-packages-crates-modules-folders-for-code)
- [K. Groups](#k-groups-vec-string-hashmap-book-calls-them-collections)
- [L. Errors](#l-errors-panic-vs-result)
- [M. Generics + Traits + Lifetimes](#m-generics-traits-lifetimes-write-the-code-one-time-and-reuse-it)
- [N. Tests](#n-tests-prove-it-works)
- [O. Mini Project](#o-mini-project-minigrep-search-tool)
- [P. Closures + Iterators](#p-closures--iterators-shortcuts)
- [Q. Cargo Pro](#q-cargo-pro-publish--workspaces)
- [R. Smart Pointers](#r-smart-pointers-box-rc-refcell-deref-drop)
- [S. Threads](#s-many-jobs-same-time-threads--messages-book-calls-it-fearless-concurrency)
- [T. Async](#t-async-await-do-many-things-while-waiting)
- [U. OOP + Patterns](#u-oop-with-traits--patterns)
- [V. Unsafe + Macros](#v-unsafe--macros-extra-powers)
- [W. Final Project](#w-final-project-web-server)
- [AFTER: projects road + YOUR graphics road](#after-9-real-projects-road-from-live-practice-rust-elegant-page)
- [X. Cheat Sheets](#x-cheat-sheets-keywords-operators-tools)
- [Y. 0-to-Master Plan](#y-0-to-master-plan)
- [Z. A-Z Dictionary](#z-a-z-dictionary-in-30-seconds)
<!-- TOC anchors tested for GitHub Sep 2026: GitHub drops `+ & :` etc, keeps `-`. If a link misses, search header text with Ctrl+F. Headers kept short on purpose. -->

---

## PHASE 1 - WALK: see result first (baby stands; Basics)
### You learn: setup, print, vars, types, fn, if/loops. Max 3 ideas at once. No `&`, no `String` move yet.
### How: Watch -> Type same -> Change 1 word -> Run -> Say what happened.

## 0. SETUP (install once)

**Baby idea:** `rustup` = app store for Rust. It gives you `rustc` (compiler) + `cargo` (builder) + docs.

> Why need? New free Rust comes every 6 weeks. All team computers + build servers must use the SAME tools, or "works on my machine" bugs appear. rustup locks exact tools per project + opens docs with no internet.
> Senior use? Yes — all teams. SKIP IF HARD. Firefox has many Rust libs with exact versions. Linux kernel Rust + AWS Firecracker (runs Lambda mini-computers) build in locked boxes. Which part? Start, team setup, build servers.

```bash
# Linux / Mac:
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh

# check:
rustc --version
cargo --version
rustup update
rustup doc --book   # offline book
```

**Rule:** If `rustc not found`, close + open terminal again. On Linux you need helper to make exe: `sudo apt install build-essential`. On Windows install Visual Studio MSVC.

> Fetched from: ch01-01-installation

---

## A. Hello World + Cargo (your toy box)

**Baby idea:** `rustc` = cook one file. `cargo` = cook whole kitchen. Always use cargo for real work.

> Why need? Real apps have 100s of files + outside libs. Cargo builds all, gets libs, locks exact versions (`Cargo.lock`) so your friend's build = yours. `cargo check` = fast check while you type. `--release` = fast exe to share.
> Senior use? Yes. SKIP IF HARD. ripgrep (super-fast file search, one exe). Deno (runs JavaScript + TypeScript). Cloudflare Pingora (Rust net door, 1T asks/day, ~70% less CPU + ~67% less mem vs old NGINX/Lua, cloudflare blog). Which part? Build, share, ship.

```rust
// file: src/main.rs
fn main() {
    println!("Hello, world!");
}
```

Shows:

```text
Hello, world!
```
`fn main` = door where program enters. `println!` with `!` = macro (code that writes code), not normal function.

> Gentle gem from 1-basics you pasted (easy way):
> No `!`? `println("hi")` -> E0425 `did you mean println!`? Compiler helps, not shouts. See it as strict friend.
> Spell bad `answr`? Compiler says `did you mean answer`? Spelling = build error, not run crash like Python. Good.
> `assert_eq!(x,3)` = workhorse check. Good = no show. Bad `42 vs 40` = first run stop with left/right + `RUST_BACKTRACE=1`.

```bash
cargo new hello
cd hello
cargo run        # build + run
cargo check      # fast check, no exe (use while typing)
cargo build --release  # fast exe for sharing -> target/release/
```

`Cargo.toml` = ID card of project:
```toml
[package]
name = "hello"
version = "0.1.0"
edition = "2024"

[dependencies]
# NEEDS DEP example (Sep 2026: rand 0.9, API changed from 0.8):
# rand = "0.9"  # external toys from crates.io. Run `cargo add rand@0.9` to pin it.
```

**New person mistake:** typing `$` prompt. `$ cargo run` means type only `cargo run`.

> Fetched from: ch01-02, ch01-03

---

## B. Variables: mut, const, shadowing

**Baby idea:** By default Rust locks your toy box. `mut` = unlock.

> Why need? In big code, surprise writes = surprise bugs. `let` = read-only promise. `mut` = bright flag "CHANGES HERE" for readers + compiler. `const` = one true number (change once, fixed everywhere, no hidden copies). Shadowing = clean new shape, no name soup (`name`, `name2`, `final_name`).
> Senior use? Yes, in every file. SKIP IF HARD. Microsoft says ~70% of CVE bugs each year are memory bugs (MSRC 2019, CISA). Rust `let` by default kills that group. Discord Read States Go -> Rust 2020 killed GC spikes every 2 min (discord.com/blog). Reviewers search `mut` first. Clippy even warns on extra `mut`. Which part? Every line — readers trust non-`mut` at a glance.

> Gentle gem add1/add3 (why explicit):
> `sum += i` needs same types. `0.0 + i` fails E0277 need `AddAssign` trait for `+=`. Rust never hides int->float change. Fix `i as f64` cast you write. Fn types same: `fn sqr(x:f64)->f64` must write, on purpose (Haskell style). No `sqr(2)` with int, must `2.0`.

```rust
fn main() {
    let x = 5;
    // x = 6; // ERROR E0384: cannot assign twice (open to see red)

    let mut y = 5; // y starts at 5
    println!("y first {y}"); // shows: y first 5. Read before you change = no warning.
    y = 6; // y = 6 now

    const THREE_HOURS: u32 = 60*60*3; // always locked, needs type, UPPER_SNAKE_CASE = 10800. Used once = inside main is fine. Shared consts live ABOVE fn main.

    let spaces = "   "; // 3 spaces text
    let spaces = spaces.len(); // SHADOWING: new box same name, now number 3. OK
    // let mut s = "   "; s = s.len(); // ERROR: mut cannot change type
    println!("{x} {y} {spaces} {THREE_HOURS}");
}
```

Shows:

```text
y first 5
5 6 3 10800
```

> `.len()` counts bytes, not letters. `"   "` = 3 spaces = 3 bytes, so new `spaces` is number 3. Spaces are 1 byte each, easy. Warning: `"ƒoo".len()` is 4 (fancy f = 2 bytes). Full lesson in K.

Shadowing in scope:
```rust
fn main() {
    let x = 5; // x = 5
    let x = x + 1; // x = 6 new box
    { let x = x * 2; println!("in {x}"); } // 12 only inside {}
    println!("out {x}"); // here x = 6
}
```

Shows:

```text
inside 12
outside 6
```

**Rule:** Use `let` (locked). Add `mut` only if you must change (else `unused_mut` warning). Read a value before you overwrite it (else `unused_assignments` warning). Use `const` for fixed numbers (UPPER_SNAKE_CASE). One use = inside main is fine. Many uses = put it above `fn main` so all functions see it. Use shadowing to transform type.

> Do now 30 sec (from live practice-rust variables 🌟):
> Guess, then run. Fix `__`:
> ```rust
> fn main() {
>     let mut x = 1; // baby: mut = you can change
>     x += 2;
>     assert_eq!(x, 3);
>     let y = 4; let y = "you can be text too!"; // shadow = new box same name
>     println!("ok {x} {y}");
> }
> ```
> Why? `let x;` with no value + use = error. `mut` lets you do `+=`. Shadow lets you change type.

> Fetched from: ch03-01 + live https://practice-rust.beatai.org/variables.html

---

## C. Data Types: the Lego blocks

**Baby idea:** Rust must know size of everything at compile time.

> Why need? Same memory on laptop AND tiny chip — no surprise. `u8` fits network bytes. Tuple gives back 2 things with no new struct. Array holds 5 sensors with no heap — super fast.
> Senior use? Yes, daily. SKIP IF HARD. Cloudflare Pingora counts bytes for 1T asks/day. Firefox net code shares one box for packets — borrow checker proves sharing safe. AWS Firecracker counts every byte for mini-computers. Which part? Network bytes, buffers, sensors, game pixels.

Numbers (pick the right box):
```rust
fn main() {
    // i = can be negative, u = only 0+, number = bits
    let a: i32 = -5;   // default int
    let b: u8 = 255;   // max 1-byte box
    let big = 98_222;  // _ just for eyes = 98222
    println!("{a} {b} {big}"); // shows: -5 255 98222
}
```
// shows means: what you see when you run. Check yours matches.

Other number writings (same values, short ways):
```rust
fn main() {
    let hex = 0xff; let bin = 0b1010; let oct = 0o77; // 255, 10, 63
    let byte_only = b'A'; // u8 letter A = 65
    let f = 2.0; // f64 decimal, default
    println!("{hex} {bin} {oct} {byte_only} {f}"); // shows: 255 10 63 65 2
}
```
// SKIP FOR NOW (adult extra, Phase 4): if number box is full, what to do?
// `wrapping_add` starts again at 0. `checked_add` gives `None` (no value).
// `saturating_add` stays at top (255). Come back later.

True/false + letters:
```rust
fn main() {
    let t = true; // bool, yes/no, 1 byte
    let c = 'z'; let emoji = '😻'; // char = 4 bytes, ' ' single marks, any language
    println!("{t} {c} {emoji}"); // shows: true z 😻
}
```

Tuple = mixed box, fixed size (e.g. score + name):
```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
    let (x, y, z) = tup; // unpack: x=500 y=6.4 z=1
    let five = tup.0; // .0 first pocket -> 500
    println!("{x} {y} {z} {five}"); // shows: 500 6.4 1 500
}
```

Array = same-kind list, fixed size, fast stack box:
```rust
fn main() {
    let arr = [1,2,3,4,5];
    let arr2: [i32; 5] = [3; 5]; // five 3s: [3,3,3,3,3]
    let first = arr[0]; // counting starts at 0 -> 1
    println!("{first} {arr2:?}"); // shows: 1 [3, 3, 3, 3, 3]
    // arr[10] with fixed number = build error (Rust knows size). arr[i] with var = run stop. Both safe, no bad memory.
    // Show arrays with {:?}, not {}. Type `[i32;4]` has size inside, so hard to pass to fn. Use slice `&[i32]` next.
}
```

**New person mistake:**
- `"a"` = string, `'a'` = char. Don't mix.
- `-5 / 3 = -1` (cuts toward zero, not floor).
- `let guess: u32 = "42".parse().expect("!")` needs `:u32` else E0284 compiler can't guess.

> Fetched from: ch03-02

---

## D. Functions: little machines

**Baby idea:** `fn` takes in, gives out. Last line with no `;` = answer.

> Why need? Reader sees the deal (in: number, out: text) with no running. Types written always (`x: i32`). Compiler checks ALL callers free. Last-line value = less noise, happy path shines. Early `return` only for fast exits.
> Senior use? Yes. SKIP IF HARD. Web handlers in axum read like `fn name(args) -> Answer`. Real Rust pay code uses `async-stripe` crate + `match` + `Result`. Types catch old bugs at build. Which part? Every API, every handler, every lib door.

```rust
fn hello(x: i32, unit: char) { // must write types! x=5 number, unit='h' letter
    println!("{x}{unit}"); // shows: 5h
}
fn main() {
    hello(5, 'h');
}
```

Shows:

```text
5h
```

Give back an answer (last line with no `;`):
```rust
fn five() -> i32 {
    5 // no ; = give back 5
}
fn plus_one(x: i32) -> i32 {
    // x + 1; // WRONG: ; eats it into () empty, error E0308
    x + 1 // RIGHT: gives 6 for 5
}
fn main() {
    println!("{} {}", five(), plus_one(5));
}
```

Shows:

```text
5 6
```

Statement vs Expression:
- Statement = does action, no value: `let x = 5;`
- Expression = gives value: `5+6`, `my_fn()`, `{ let x=3; x+1 }` -> 4

**Rule:** `;` kills value. Return = last expression no `;`, or `return x;` for early exit.

> Donkey: `;` = donkey swallows word. `5` = shows apple. `5;` = eats apple, shows empty hands `()`.
> Try it (see error, then fix):
> ```rust
> fn five() -> i32 { 5; } // ERROR E0308: expected i32 found ()
> fn five() -> i32 { 5 }  // OK
> ```

> Fetched from: ch03-03, ch03-04 comments = `//`, `/* */`, `///` for docs

---

## E. Control Flow: if + loops

> Why need? Hand count misses by one = crash or hacker door. `for` cannot miss. `if` giving a value kills temp vars (`let x = if ...`).
> Senior use? Yes. ripgrep walks billions of bytes with loops (zero index bugs, super fast). Firefox walks packets in batches. Which part? Walking data: files, packets, lists, users.

Choose with `if` (runs first true door only):
```rust
fn main() {
    let n = 3; // n = 3
    if n < 5 { println!("small"); } // 3<5 true -> shows: small
    else if n == 5 { println!("five"); }
    else { println!("big"); }

    // if gives a value (both doors SAME type!):
    let x = if true { 5 } else { 6 }; // x = 5
    println!("{x}"); // shows: 5
    // if n { } // ERROR: n must be yes/no (bool). Rust has no 1 == true.
}
```

Repeat with `loop` (forever until `break`):
```rust
fn main() {
    let mut c = 0; // c = 0
    let result = loop {
        c += 1; // c = 1..10
        if c == 10 { break c * 2; } // break carries value 20 out
    };
    println!("{result}"); // shows: 20
}
```

Repeat with `while` (runs while true) and `for` (best, never counts wrong):
```rust
fn main() {
    let mut m = 3; // m = 3,2,1
    while m != 0 { println!("{m}"); m -= 1; } // shows: 3 2 1
    for e in [1,2,3] { println!("{e}"); } // shows: 1 2 3
    for i in (1..4).rev() { println!("{i}"); } // shows: 3 2 1 (1..4 excludes 4)
    // name tag for nested rings (break the outer one):
    'outer: loop { loop { break 'outer; } }
}
```

**Rule:** Use `for`, not `while index`. `while` + manual index = panic risk.

> Do now Phase 1 boss - guessing game baby (from Rust Book ch02, no extra crate):
> First DO, then DOWN read why.
> MAGIC WARNING: `String`, `&mut`, `expect`, `trim`, `parse` below are Phase 2 + L ideas. Cover them on first read. Learn only the `if/else` choice now.
> ```rust
> use std::io;
> fn main() {
>     let secret = 7; // baby: real book uses rand crate. We use 7 first. Easy.
>     println!("guess 1-10:");
>     let mut g = String::new();
>     io::stdin().read_line(&mut g).expect("no read");
>     let g: u32 = g.trim().parse().expect("type a number"); // trim eats \n
>     if g == secret { println!("win!"); }
>     else if g < secret { println!("small"); }
>     else { println!("big"); }
> }
> ```
> Baby why line by line: `secret=7`. `g=""` then `"5\n"`. `trim` makes `"5"`. `parse` makes `5`. `5<7` so `small`. Try `7` -> `win`. Try `abc` -> stop. Why `trim`? `read_line` keeps Enter `\n`.
> Next: add `loop` + `break` when win. NEEDS DEP for real game (Sep 2026: `cargo add rand@0.9`, API is `rand::Rng::random_range(1..=100)`, old `gen_range` was 0.8).

> Fetched from: ch03-05 + ch02 guessing-game (baby cut)

---

### Q-FIRST GYM Phase 1 - TRY YOU FIRST (no full code up). Cover answers. Try 5 min each.

**How (Sep 2026 struggle-first):** 1. Read Q. 2. Say steps in words (no code). 3. Try code 5 min. 4. Then see answer DOWN. Be wrong = good.

> New tool first (taught before use, 1 line): `"a b".split_whitespace().count()` = 2. Counts words. `v.sort_unstable()` puts small first. `vec![...]` = growable list (full lesson in K).

**Q1 count words (LeetCode 2114 baby, needs only B+C+E + tool up):** `words=["hi","hello world","rust is fun"]` How many words in all? `hi`=1, `hello world`=2, `rust is fun`=3. Answer = 6.
> Hint 1 (one word): `sum`. Hint 2 (steps): `for w in words` + `w.split_whitespace().count()` + `sum+=`. Stuck? Read the answer below, no shame.
> COVER, try first. Answer DOWN:
> ```rust
> fn main() {
>     let words = ["hi","hello world","rust is fun"];
>     let mut sum = 0; // sum=0
>     for w in words { sum += w.split_whitespace().count(); } // 0+1=1, 1+2=3, 3+3=6
>     assert_eq!(sum, 6); println!("ok {sum}");
> }
> ```
> Baby why: `sum` starts 0. Each `w` gives count. Add to sum. End 6.

**Q2 rich man (LeetCode 1672 baby, needs only E):** `bags=[[1,2],[10],[3,3,3]]` Who has most? Man0=3, man1=10, man2=9. Answer man1=10.
> Hint: `for bag in bags` + inner `for n` + `s+=n` + keep `big`. NOTE: inner lists diff sizes, so use `Vec<Vec<i32>>`, not array (arrays need same size).
> COVER, try first. Answer DOWN:
> ```rust
> fn main() {
>     let bags = vec![vec![1,2], vec![10], vec![3,3,3]];
>     let mut big = 0;
>     for b in bags { let mut s = 0; for n in b { s += n; } if s > big { big = s; } }
>     assert_eq!(big, 10); println!("ok {big}");
> }
> ```
> Baby why: `big=0`. Bag0 s=3 big=3. Bag1 s=10 big=10. Bag2 s=9 big stays 10.

**Q3 fizz (needs D+E):** Print 1-15. If %3==0 and %5==0 say `fizzbuzz`. If %3==0 say `fizz`. If %5==0 say `buzz`. Else say number.
> Hint: `for i in 1..=15` + `if i%15==0` first, then 3, then 5.
> COVER, try first. Answer DOWN: run, see `3->fizz, 5->buzz, 15->fizzbuzz`.

> Fill the blank (30 sec, no peeking): `for i in 1..=15 { if i % 15 == 0 { println!(___); } }` — answer: `"fizzbuzz"`.

---

## PHASE 2 - TALK: use data (baby says words; Data and Ownership)
### You learn: own, look, own toy, choose, folders, lists. You need Phase 1 done. Ready check: can you write `for` + `fn` with no help?
### How: Full code -> Half code (`TODO you fill`) -> You write. Guess before run each time.

## F. Ownership: THE 1 Big Idea of Rust

**Baby idea:** Every toy has one owner. When owner leaves the room, toy goes in trash. No two owners. No trash truck.

Why these rules? They give memory safety with no garbage collector. No truck stops your program to clean up. The compiler frees memory at the right time. The rules are not arbitrary. They prevent crashes and hacks at build time.

> Why need? Without this, C programs free the same memory two times. That causes a crash or a hack. Rust stops it at build time, not at user time.
> Senior use? Yes, always. SKIP IF HARD. Big backends live on this. Linux kernel drivers use it. Microsoft MSRC 2019 says ~70% CVE bugs are memory bugs. Rust kills that group. Which part? All heap code: `String`, `Vec`, `Box`. (Brown visual book shows this with boxes+arrows pictures + quiz. Gentle intro says: compiler is strict friend, not shout.)

> Donkey: 1 donkey = 1 rope = 1 owner. `let s2 = s1` = give rope to new baby. Old baby has no rope now. If both pull, donkey splits - so Rust kills old rope.

3 Rules:
1. Each value has one owner.
2. Only one owner at a time.
3. When owner goes out of `{}`, value dropped.

```rust
fn takes(s: String) { println!("took {s}"); } // takes the toy, drops at end
fn main() {
    { let s = "hello"; println!("{s}"); } // s lives only here, dead after }

    let mut s = String::from("hello"); // heap text "hello" you can grow
    s.push_str(", world"); // s = "hello, world"
    println!("{s}"); // shows: hello, world
}
```

Copy vs move (the whole game in 5 lines):
```rust
fn main() {
    let x = 5; let y = x; // Copy: numbers cheap. x=5 y=5, both alive
    println!("{x} {y}"); // shows: 5 5

    let s1 = String::from("hi"); // s1 = "hi"
    let s2 = s1; // MOVE: s1 dead! println!("{s1}") // ERROR E0382 borrow of moved value
    // let s2 = s1.clone(); // deep copy: two texts, both alive, but slow (new heap)
    println!("{s2}"); // shows: hi
}
```

Fixes when you see E0382:

1. Use the new variable (`s2`).
2. Borrow (`&s1`) so `s1` stays alive.
3. Clone (`s1.clone()`) if you truly need two copies.

Give to a function = same as giving to a friend (moves too):
```rust
fn takes(s: String) { println!("took {s}"); } // toy moves in, dies at end
fn main() {
    let gift = String::from("cake"); // gift = "cake"
    takes(gift); // shows: took cake. gift dead after.
    // println!("{gift}"); // ERROR: already given away
}
```

> Try it yourself (copy-paste, see error):
> ```rust
> fn main() {
>     let donkey = String::from("hee-haw");
>     let baby2 = donkey; // move rope
>     // println!("{donkey}"); // ERROR: old baby cries, no donkey
>     println!("{baby2}"); // OK: new baby has donkey
> }
> ```

Stack vs Heap baby version:
- Stack = plates stack, fast, fixed size.
- Heap = warehouse, slow to find space, for growable stuff like String.

> Gentle gem - what String really is (easy picture):
> `String` on stack = 3 small numbers: addr + size + cap (24 bytes). Text lives on heap.
> `&str` = 2 numbers: addr + size. Cheap photo, no new heap.
> `f64` = 8 bytes, no heap. Copy = copy bytes only, cheap.
> Move `let y=x` for String = copy 3 numbers only, no new text. Fast. Old dead.
> Clone `x.clone()` for a big book (1 million letters) = new heap + copy all text. Slow. Use `&` look if you can.
> Picture (boxes + arrows):
> ```
> String | addr | ---> hello... (text on heap)
>        | size |
>        | cap  |
> &str   | addr | ---| (same text, no new heap)
>        | size |
> ```

**New person mistake:** Thinking `let s2 = s1` copies. For heap it MOVES. If you want copy, write `.clone()`.

> Do now 1 min (from live practice-rust ownership 🌟🌟):
> Baby steps: 1. Make 2. Give 3. Fix.
> ```rust
> fn main() {
>     let x = String::from("hi");
>     // let y = x; println!("{x} {y}"); // BAD: x moved, x dead
>     let y = x.clone(); println!("{x} {y}"); // GOOD: clone = two donkeys
>     print_str(&x); println!("{x}"); // GOOD: & = look only, x lives
> }
> fn print_str(s: &String) { println!("{s}"); } // & = no take
> ```
> Guess: which line keeps `x` alive? Change `.clone()` to `=` and see error E0382.

> Fetched from: ch04-01 + live https://practice-rust.beatai.org/ownership/ownership.html

---

## G. Borrowing + Slices: don't take, just point

**Baby idea:** Borrowing = look but don't own. `&` = borrow.

> Why need? You want fn to read big text with no copy, no take. Borrow = fast + safe.
> Senior use? Yes, daily. Web handlers take `&str` not `String` to skip moves. Slices `&[i32]` skip copy (no copy = fast for many users). Which part? All fn args: use `&str`, `&[T]` for read.

```rust
fn len(s: &String) -> usize { s.len() } // borrow, no move
fn change(s: &mut String) { s.push_str("!"); }
fn main() {
    let s1 = String::from("hi"); // s1 = "hi" (2 letters)
    let l = len(&s1); // look only, s1 lives. l = 2
    println!("{s1} len {l}");
    let mut s = String::from("hi");
    change(&mut s); // look + change, s = "hi!"
    println!("{s}");
}
```

**Borrow rules (so two hands do not break the toy):**
- EITHER 1x `&mut` OR many `&`, never both at same time.
- Later: reborrowing (`&mut *r`) passes a ride along to another function. Skip first time.

> Donkey: Many babies can LOOK at donkey `&` at once. Only ONE baby can RIDE `&mut` at a time. Can't look + ride same time, donkey kicks (data race).

```rust
fn main() {
    let mut s = String::from("hi");
    let r1 = &s; let r2 = &s; // OK many looks
    println!("{r1}{r2}"); // looks done here (last use)
    let r3 = &mut s; // OK now, old looks finished
    r3.push_str("!"); // ride: s = "hi!"
    println!("{r3}");
    // let r1 = &s; let r2 = &mut s; // ERROR E0502: look + ride same time
}
```

> Try it: look then ride (OK vs BAD). INSIDE MAIN (paste inside `fn main`):
> ```rust
> let mut donkey = String::from("donk");
> let look1 = &donkey; let look2 = &donkey;
> println!("{look1} {look2}"); // looks done here
> let ride = &mut donkey; ride.push_str("!");
> println!("{ride}");
> ```
> Do now 30 sec (from live practice-rust borrowing 🌟): fix `__` with `&` or `&mut`:
> ```rust
> fn main() {
>     let mut s = String::from("hi, ");
>     borrow(&s); // baby: look only
>     push(&mut s); // baby: look + change
>     println!("{s}"); // hi, hi, world
> }
> fn borrow(s: &String) { println!("{s}"); }
> fn push(s: &mut String) { s.push_str("world"); }
> ```
> Why? If fn takes `&String`, you give `&s`. If `&mut String`, you give `&mut s` + `let mut`.

Bad point = point to dead toy. Rust says no:
```rust
// fn dangle() -> &String { let s = String::from("hi"); &s } // ERROR E0106
fn ok() -> String { let s = String::from("hi"); s } // return owned, move out
```

> Gentle gem - tmp dies in block (lifetimes bite, easy):
> ```rust
> let s1 = String::from("hi");
> let mut r = &s1; // look at s1, ok
> { let tmp = String::from("world"); r = &tmp; } // tmp dies at }
> // println!("{r}"); // ERROR tmp does not live long. r points to dead.
> ```
> Baby why: `tmp` lives only inside `{}`. `r` wants to live outside. Rust says no. Fix: give owned `String`, not look. Same as `makes_a() -> A` with `&string` inside fn = never works, string dies at end.

**Slices:** see part of it, do not own it.

> Donkey: `String` = whole donkey you own. `&str` = photo of donkey. Photo is cheap, can't feed it to grow. Function taking `&str` accepts both whole donkey photo `&String` and internet photo `"hi"`. Always take `&str` in args.

**Step 1 baby first (only what you know: `let`, `&s[..]`):**
```rust
fn main() {
    // Small steps: 1. Make toy 2. Cut part 3. Show
    let s = String::from("hello world"); // 11 letters, space at 5
    let h = &s[0..5]; // "hello", end is not with
    let w = &s[6..];  // "world" (skip space at 5)
    let all = &s[..]; // all
    println!("{h} {w}");
    let a = [1,2,3,4,5];
    let sl = &a[1..3]; // [2,3]
    println!("{sl:?}");
    // WARNING: `&s[0..1]` on `"¡"` (2 bytes) or `"😻"` (4 bytes) = runtime panic, program stops. You cut in the middle of a letter. Only cut ASCII or where `find()` says. Use `.chars()` or `find()` for non-English text.
}
```
> Guess before run: what is `{h}`? Change `[0..5]` to `[0..4]`. Run again.

**Step 2 adult later (needs loops + iter, Phase 3):**
```rust
// Small steps: 1. Look each byte 2. If space, cut 3. If no space, give all
// MAGIC FOR NOW: `.as_bytes().iter().enumerate()` = look each letter with number. You learn it in P. Just use it now.
fn first_word(s: &str) -> &str { // take &str not &String = takes both!
    for (i, &b) in s.as_bytes().iter().enumerate() {
        if b == b' ' { return &s[0..i]; }
    }
    &s[..]
}
```

Why slice > index? Index gets old after `s.clear()`. Slice makes compiler stop you.

> Fetched from: ch04-02, ch04-03

---

## H. Structs + Methods: make your own toy

> Why need? Loose vars `name, age, mail` mix up. Struct packs + names + one type. `impl` puts skills with toy.
> Senior use? Yes, all code. Handlers take `Config`, `User`, `Order` structs, not 5 strings. `new()` + `&self` getters keep rules inside. Which part? Models, configs, APIs.

**Baby idea:** Struct = backpack with labeled pockets. Tuple struct = backpack with numbers only.

```rust
struct User {
    active: bool,
    username: String, // use String not &str, else need lifetimes
    email: String,
    count: u64, // count = logins, starts at 1
}
fn build(email: String, username: String) -> User {
    User { active: true, username, email, count: 1 } // shorthand when names match
}
fn main() {
    let mut u = User {
        email: String::from("a@a.com"),
        username: String::from("bob"),
        active: true,
        count: 1,
    };
    u.email = String::from("b@b.com"); // need whole `mut u`
    let u2 = User { email: String::from("c@c.com"), ..u }; // fill rest from u (moves String!)
    println!("{} {}", u2.username, u2.email); // shows: bob c@c.com

    struct Color(i32,i32,i32); // tuple struct: red, green, blue 0-255
    let black = Color(0,0,0);
    println!("{} {} {}", black.0, black.1, black.2);
    struct AlwaysEqual; // unit struct, no pockets, for traits
    let _e = AlwaysEqual;
}
```

> Gentle gem - senior `new` takes photo (easy + why):
> Best is `fn new(first: &str) -> Person { first.to_string() }`. Takes both `"John"` literal + `&String`. If you take `String`, caller must make temp ugly. `&str` + `to_string` inside = clean. Same for `dump(s: &str)`, not `&String`.

Methods = skills inside `impl` (what the toy can do):
```rust
#[derive(Debug)]
struct Rect { w: u32, h: u32 } // w = width 3, h = height 4 in main

impl Rect {
    fn area(&self) -> u32 { self.w * self.h } // &self = borrow read
    fn can_hold(&self, o: &Rect) -> bool { self.w > o.w && self.h > o.h }
    fn square(size: u32) -> Self { Self { w: size, h: size } } // no self = associated fn, call Rect::square(3)
}
fn main() {
    let r = Rect::square(3); // 3x3, area = 9
    println!("area {}", r.area()); // shows: area 9
    let big = Rect { w: 8, h: 7 };
    println!("hold? {}", big.can_hold(&r)); // shows: hold? true
}
```

**Rule:** `&self` for read, `&mut self` for change, `self` to eat it. Rust auto-adds `&` so `r.area()` = `(&r).area()`.

> Fetched from: ch05-01, ch05-02 (use `#[derive(Debug)]` + `println!("{r:?}")` or `{r:#?}`), ch05-03

---

## I. Enums, Match, Option: no null!

**Baby idea:** Enum = toy can be ONE shape at a time. `Option` = maybe-toy-or-nothing. Replaces `null` (Rust has no null).

> Why need? `null` in other langs = crash at user. `Option` forces you to open box first with `match`/`if let`. No surprise.
> Senior use? Yes, always. `get()` gives `Option`, file read gives `Result`. APIs use `Option<Config>`, `match` for state. Which part? All lookups, parse, find.

> Donkey: `Option<Donkey>` = stable either has donkey `Some(donkey)` or empty `None`. You can't ride `Option<Donkey>`, must open door first with `match` / `if let`. Other languages let you ride empty stable -> crash (null).

```rust
enum Ip { V4(u8,u8,u8,u8), V6(String) } // V4 = 4 numbers like 127.0.0.1

enum Msg {
    Quit, // empty pockets
    Move { x: i32, y: i32 }, // named pockets
    Write(String), // one unnamed pocket
    Color(i32,i32,i32), // three unnamed pockets
}
impl Msg { fn call(&self) { println!("got msg"); } } // skill for all shapes
fn main() {
    let home = Ip::V4(127,0,0,1); // home = your own computer
    let m = Msg::Write(String::from("hi")); // m holds text "hi"
    m.call(); // shows: got msg
    let _ = home;
}
```

Shows:

```text
got msg
```

THE most important enum (already in std — shape shown only, do NOT type it):
```rust
// enum Option<T> { None, Some(T) } // <-- shape only
fn main() {
    let x = Some(5); // full box with 5
    let y: Option<i32> = None; // None = empty, need type!
    println!("{x:?} {y:?}"); // shows: Some(5) None
    // let sum = 5 + None; // ERROR: number + maybe container. Open first with match.
}
```

`match` = sorter, must handle ALL cases:
```rust
enum Coin { Penny, Nickel, Quarter(String) } // US coins, quarter holds state name
fn val(c: Coin) -> u8 {
    match c {
        Coin::Penny => 1, // 1 cent
        Coin::Nickel => 5, // 5 cents
        Coin::Quarter(state) => { println!("{state}"); 25 } // 25 cents
    }
}
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x { None => None, Some(i) => Some(i+1) } // None->None, Some(5)->Some(6)
}
fn main() {
    println!("{}", val(Coin::Quarter(String::from("Alaska")))); // 25
    println!("{:?}", plus_one(Some(5))); // Some(6)
}
// catch-all SHAPE (not runnable, dice game pieces not defined here):
// match dice { 3 => hat(), 7 => no_hat(), other => move_it(other), _ => () }
// _ = ignore, other = bind + use
```

`if let` = lazy match for 1 case:
```rust
if let Some(max) = config_max { println!("{max}"); }
// same as match ... { Some(max)=>..., _=>() } but short. You lose full check.

// SHAPE ONLY (needs a function returning Option; `return None` works only there):
let Coin::Quarter(s) = coin else { return None; }; // let-else: happy path. else MUST diverge = must end with return/break/continue/panic. No normal end allowed, else build error.
```

> Donkey: `match` = check every stable door (safe, compiler shouts if you miss one). `if let` = peek only 1 door, ignore rest (short but unsafe if new door added). `let-else` = "give me donkey or I go home".
> Do now 30 sec (from live practice-rust match 🌟):
> ```rust
> fn main() {
>     let b = true;
>     let n = match b { true => 1, false => 0 }; // baby: match gives value
>     assert_eq!(n, 1);
>     if let Some(d) = Some(String::from("gray")) { println!("ride {d}"); }
> }
> ```
> Guess: what is `n` if `b=false`? Change and run.
> Try it:
> ```rust
> let maybe_donkey: Option<String> = Some(String::from("gray"));
> if let Some(d) = maybe_donkey { println!("ride {d}"); } // opens if full
> // match forces you to write None case too
> ```

**Rule:** Use `match` when new variants must break code (safe). Use `if let` when you only care about one.

> Fetched from: ch06-01, ch06-02, ch06-03

---

## J. Packages, Crates, Modules: folders for code

> Why need? 100 lines ok in 1 file. 10,000 lines need rooms + doors + keys. Else names crash.
> Senior use? Yes, all big apps. `lib.rs` + `mod` + `pub use` for clean API. One team one folder. Which part? All projects over 500 lines.

**Baby idea:** Crate = one book. Package = box with books + ID card. Module = chapters.

> Donkey: House `crate` locked by default. Each door needs `pub` key. `pub mod` inside private `mod` = shiny key inside locked house, still can't enter from street. Need `pub` at every door.

- Binary crate: has `fn main`, makes exe. `src/main.rs` is root.
- Library crate: no main, for sharing. `src/lib.rs` is root.
- Package: 1 Cargo.toml + max 1 lib + many bins (`src/bin/*.rs`).

```rust
// One file version (runs as-is). Real project splits each `mod x { }`
// into its own file: `mod garden;` finds src/garden.rs.
mod garden {
    pub mod veg { // veg = vegetables room
        pub struct Carrot;
    }
}
use crate::garden::veg::Carrot; // shortcut, Carrot = orange veg

// everything PRIVATE by default! need `pub` key at each door.
mod room { // private room: visible to root children, but insides stay locked
    fn secret() { println!("shh"); } // locked: only room itself can use
    pub fn call() { // open door: anyone who sees room can call
        secret(); // OK: same room
    }
}
fn main() {
    let _c = Carrot;
    room::call(); // shows: shh
    // room::secret(); // ERROR E0603: secret is private to room. main stands outside room.
    println!("ok");
}
// Rule: you can use an item only if every door on its path is `pub` AND you stand where the first door is visible.
```

Shows:

```text
ok
```

`use` ways (7 separate choices — pick ONE per program, not all at once):
```rust
mod front { pub mod hosting { pub fn add() {} } }
use crate::front::hosting; // for fn: keep parent -> hosting::add()
fn main() { hosting::add(); }
// Other choices (each alone, not together):
// use std::collections::HashMap; // for struct: full path
// use std::io::Result as IoResult; // alias when two Results clash
// pub use crate::front::hosting; // re-export: make public at new place (good API)
// use std::{cmp::Ordering, io}; // nested: two in one line
// use std::io::{self, Write}; // self = io itself
// use std::collections::*; // glob: all, only for tests/prelude
```

> Fetched from: ch07-01 to ch07-05

---

## K. Groups: Vec, String, HashMap (book calls them Collections)

> Why need? Array size fixed, cannot grow. Real data grows: users, words, scores. These grow on heap.
> Senior use? Yes, daily. `Vec` for lists, `HashMap` for Two Sum/cache/count, `String` + `&str` for text (bytes vs letters). Fast APIs take `&[u8]`/`&str` views, not owned (no copy). Which part? All business data.

### 1. Vec = list that grows, same type
```rust
fn main() {
    // Small steps: 1. Make list 2. Add 3. Read safe 4. Loop
    let v = vec![1,2,3]; // v = [1,2,3]
    println!("{v:?}");
    let mut w: Vec<i32> = Vec::new(); // w = [] empty
    w.push(5); // need mut = you can change. w = [5]
    let maybe = w.get(2); // safe -> None (only 1 item). Use this first!
    println!("{maybe:?}");
    // let third = &w[2]; // stops if missing. Use `get` first as baby.
    for i in &w { println!("{i}"); } // look at each
    // SKIP first time: for i in &mut w { *i += 50; } // * = open and change. Learn * in R.
    // SKIP first time different types enum below. Learn enum in I first.
}
```

Shows:

```text
[1, 2, 3]
None
5
```

### 2. String = text that grows (`String` you own vs `&str` photo)
```rust
fn main() {
    // Small steps: 1. Make 2. Add 3. Join safe
    let s = String::from("hi"); // s = "hi" owned
    println!("{s}");
    let mut t = String::new(); // t = "" empty
    t.push_str("bar"); // add photo, no steal. t = "bar"
    t.push('!'); // add one letter. t = "bar!"
    println!("{t}");
    // Baby way first (safe, keeps both):
    // MAGIC FOR NOW: `s1 + &s2` eats left. Learn why in F+G. Use this now:
    let s1 = String::from("hee-"); let s2 = String::from("haw");
    let s3 = format!("{s1}-{s2}"); // photo copy, eats nothing. Both live.
    println!("{s1} {s2} {s3}");

    // NO s[0]! len = bytes not letters:
    println!("{}", "hola".len()); // 4
}
```

Shows:

```text
bar!
hee- haw hee--haw
4
```

> Gentle gem many-letters (bytes vs letters, easy):
> `"Hi! ¡Hola! привет!"` len=25 bytes but count=18 letters. `char` = 4 bytes, strings are NOT char arrays.
> `find('п')` gives good cut number. `&s[idx..]` with that number = safe Russian `привет!`. `&s[0..1]` on `¡` (2 bytes) = stop. Only cut where `find` says.

> Gentle gem - string WTFs (easy, saves 1 hour):
> `s1 == &s2` fails. `String` vs `&String` diff types. Fix `s1.as_str() == &s2` or `s1 == s2`. `&` does not auto-change here, only in fn args.
> `s1 + s2` fails. Can do `String + &str` only, eats left. Mostly use `format!("{s1}{s2}")`.
> `split(',')` gives iterator, not vec. Add `.collect::<Vec<_>>()` to make vec. `max()` on empty = `None`, add `.unwrap_or(0)`.

> Donkey: `s1 + &s2` = donkey eats left hay `s1` (gone!), sniffs right hay `s2` (stays). If you need both hays after, use `format!("{s1}{s2}")` = photo copy, eats nothing.
> Try it:
> ```rust
> let left = String::from("hee-");
> let right = String::from("haw");
> // let both = left + &right; println!("{left}"); // ERROR left eaten
> let both = format!("{left}{right}"); println!("{left} {both}"); // OK both alive
> ```

### 3. HashMap = label -> value, no order
```rust
use std::collections::HashMap;
fn main() {
    // Blue team = 10 points, then 25 (overwrite). Yellow new = 50.
    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Blue"), 25); // overwrite old 10
    let s = scores.get("Blue").copied().unwrap_or(0); // s = 25
    println!("Blue {s}");
    for (k,v) in &scores { println!("{k}:{v}"); }
    scores.entry(String::from("Yellow")).or_insert(50); // only if missing
    println!("Yellow {}", scores.get("Yellow").copied().unwrap_or(0)); // safe: entry() above put 50, so no panic
}
```

Shows:

```text
Blue 25
Blue:25
Yellow 50
```

> Do now 1 min (from live practice-rust vector 🌟🌟):
> ```rust
> fn main() {
>     let mut v1 = Vec::from([1,2,4]);
>     v1.pop(); v1.push(3); // baby: take last out, put 3
>     let mut v2 = Vec::new();
>     v2.extend([1,2,3]); // baby: add many at once
>     assert_eq!(v1, v2);
>     // let x = v1[10]; // BAD: stop. Use v1.get(10) = None.
>     println!("ok {:?}", v1.get(0)); // Some(1)
> }
> ```
> Guess: what is `v1` after pop+push? Change `[1,2,3]` and run.

> Fetched from: ch08-01, ch08-02, ch08-03 + live https://practice-rust.beatai.org/collections/vector.html

---

### Q-FIRST GYM Phase 2 - TRY YOU FIRST (needs only F+G+H+I+K). Cover answers.

**Q4 which value lives? (needs F):** Read, guess what shows, then run:
```rust
fn main() {
    let a = String::from("cake"); // a = "cake"
    let b = a; // move rope to b. a dead? = E0382 if you use `a`
    // println!("{a}"); // would this line work? YES or NO — guess first!
    println!("{b}"); // shows: ?
}
```
> COVER, guess first (which 2 lines show?). Answer DOWN: `a` is dead after move, so the `//` line would be ERROR E0382 if opened. Only `cake` (from b) shows. Change `let b = a;` to `let b = a.clone();` — now both live. Run again.

**Q5 full or empty? (needs I):** Guess what shows:
```rust
fn main() {
    let lunch: Option<String> = Some(String::from("rice")); // full box
    let dinner: Option<String> = None; // empty (None). Why type here? (no value to guess from!)
    match lunch {
        Some(food) => println!("eat {food}"), // shows: ?
        None => println!("hungry"),
    }
    println!("{dinner:?}"); // shows: ?
}
```
> COVER, guess both `?` first. Answer DOWN: `eat rice` then `None`. Change `lunch` to `None` — now `hungry` + `None`. Run again.

**Q6 safe peek (needs K):** Guess, no crash:
```rust
fn main() {
    let mut box_: Vec<i32> = Vec::new(); // box_ = [] (box is taken by Box, so box_)
    box_.push(7); box_.push(8); // box_ = [7,8]
    println!("{:?}", box_.get(0)); // shows: ?
    println!("{:?}", box_.get(10)); // shows: ? (no crash — why?)
}
```
> COVER, guess both first. Answer DOWN: `Some(7)` then `None`. `get` never stops the program — `box_[10]` would. Change 10 to 1 — see `Some(8)`.

> Review checkpoint (2 min, say out loud): 1) What does E0382 mean? 2) When do you use `.clone()` vs `&`? 3) What does `get(10)` give on 2 items? If stuck, re-read F + K.

---

## PHASE 3 - DECIDE: decide + fix (kid chooses; Control and Testing)
### You learn: errors, shared skills, tests, small project, shortcuts. You need Phase 2 done. Ready check: can you fix E0382 move error with `&` or `.clone()`?
### How: Plan on paper (small steps) -> Code -> Test -> Fix. Never more than 3 new things.

## L. Errors: panic vs Result

**Baby idea:** Stop-panic = house on fire, end now. Result = maybe rain, bring umbrella.

> Why need? Real app cannot die on bad file or bad number. `Result` + `?` passes bad up clean, no crash.
> Senior use? Yes, all prod. Axum/sqlx APIs: no `panic` in request path, all `Result`, `?` chain, `tracing` log. Which part? IO, parse, net, DB. `unwrap` only in tests + baby code.

```rust
// Small steps: 1. See stop 2. See Result box 3. Match it (no crash yet)
fn main() {
    let v = vec![1,2,3]; // 3 numbers
    // v[99]; // baby try: open this line, run, see stop "out of bounds". Then close it.
    println!("len {}", v.len()); // len 3

    // Result = box with Good Ok or Bad Err (std already has this enum)
    use std::fs::File;
    let f = File::open("hi.txt"); // missing file = Err value, no crash yet
    match f {
        Ok(f) => println!("opened, len {}", f.metadata().map(|m| m.len()).unwrap_or(0)),
        Err(e) => println!("no file, but no crash. Err = {e:?}"),
    }
}
```

`expect` = `unwrap` with your words (Good->value, Bad->stop + message). Use this while learning, not `unwrap`:
```rust
use std::fs::File;
fn main() {
    // needs a real file to see Ok — missing file stops with YOUR words:
    // let f = File::open("a.txt").expect("need a.txt!"); // try: open this line, see your message
    println!("ok");
}
```

`?` = pass up: if bad, give back to caller. If good, open and go on:
```rust
use std::fs::File;
fn read() -> Result<String, std::io::Error> {
    use std::io::Read; // needed for read_to_string
    let mut s = String::new();
    File::open("hi.txt")?.read_to_string(&mut s)?;
    Ok(s)
}
// MAGIC FOR NOW `Box<dyn Error>` = box for any bad. You learn `dyn` in U. Just copy it now:
use std::error::Error; // needed for `dyn Error` box
fn main() -> Result<(), Box<dyn Error>> {
    match read() {
        Ok(s) => println!("read {} bytes", s.len()),
        Err(e) => println!("clean Err, no stop-panic: {e}"),
    }
    Ok(())
}
```

> Donkey: `?` = you pass bad news up. If `Err`, you return it to boss. If `Ok`, you open it and go on. Without `?` you write 5-line match each time.
> Do now 1 min (from live practice-rust result 🌟🌟): no `unwrap`, use `?`:
> ```rust
> use std::num::ParseIntError;
> fn multiply(s1: &str, s2: &str) -> Result<i32, ParseIntError> {
>     let n1 = s1.parse::<i32>()?; // baby: if bad, pass up. If good, open.
>     let n2 = s2.parse::<i32>()?;
>     Ok(n1 * n2)
> }
> fn main() { assert_eq!(multiply("3","4").unwrap(), 12); println!("ok"); }
> ```
> Guess: what is `multiply("t","2")`? `Ok` or `Err`? Run and see.

When to stop-panic? Use for examples and tests. Use for bugs that cannot happen. For user input or no file -> use `Result`.

**Debug:** `RUST_BACKTRACE=1 cargo run` shows where panic came from (top = your file).

> Error dictionary - in order you hit them (Sep 2026 top 15, baby fix):
> - E0382 moved value `let y=x; print x` -> use `&x` look, or `x.clone()` two donkeys, or use `y`. `i32` copies, `String` moves.
> - E0384 cannot assign twice `x=6` with no mut -> add `mut`: `let mut x`.
> - E0502 look + ride same time -> finish look first, then ride. Move `println!(r)` up before `&mut`.
> - E0499 two rides `let a=&mut s; let b=&mut s` -> use 1 at a time, or `{}` scope, or `split_at_mut`.
> - E0597 lives short -> give owned `String` back, not `&`. Or keep owner alive longer.
> - E0515 give back point to dead local -> give back owned `String`, not `&str`.
> - E0596 want ride but no `mut` -> add `mut`: `let mut s`, `&mut s`.
> - E0308 wrong type `fn f()->i32{5;}` -> remove `;`. `5` gives, `5;` gives empty `()`.
> - E0282/E0284 need type `let x = "42".parse()` -> add type: `parse::<u32>()` or `let x: u32`.
> - E0277 trait not met `0.0 + i` -> convert: `i as f64`. Read `help:` line, do what it says.
> - E0425 not found `println("hi")` -> add `!`: `println!`. Or fix spelling, compiler suggests.
> - E0432/E0433 bad import -> check `mod`, `pub`, `use` path. File must exist.
> - E0106 missing lifetime `fn bad(x:&str,y:&str)->&str` -> add `'a` or return owned `String`.
> - E0752 async main -> keep `fn main`, use `block_on` (school) or `#[tokio::main]` (real).
> - E0603 private item `room::secret` -> add `pub`, or call from inside `room`.
> How to read any error: 1) code (E0382). 2) main message (1 line). 3) `note:` (why). 4) `help:` (fix, do it). 5) line:col (where). Run `rustc --explain E0382`. Use `cargo check` fast (not full build).

> 4 new person traps (Sep 2026):
> - Too much `.clone()` -> slow. Ask: need own? If no, use `&`.
> - `unwrap()` in real app -> dies. Use `expect("why")` to learn, `?` + `Result` to ship.
> - `String` vs `&str`: take `&str` in fn args (takes both). Keep `String` in struct.
> - Skip `cargo clippy` + `cargo fmt` -> turn on early. `clippy` is free teacher.

> Fetched from: ch09-01, ch09-02, ch09-03 + live https://practice-rust.beatai.org/result-panic/result.html

---

## M. Generics, Traits, Lifetimes: write the code one time and reuse it

> Why need? Write `largest` once for `i32` + `char`, not two fns. Trait = one skill paper for many animals. Lifetime = proof look lives long enough.
> Senior use? Yes. `serde`, `tokio`, `sqlx` all generic + trait bounds. `impl Display`, `From`, `AsyncFn` (Rust 1.85). Lifetimes mostly auto-filled by compiler; you write `'a` only when fn gives back a look. Which part? Libs, APIs, shared code.

### Generics `<T>` = type placeholder for any type
```rust
fn largest<T: PartialOrd>(list: &[T]) -> &T { // need PartialOrd to use `>`. WARNING: empty list panics ([0] missing). Prod returns Option<&T>.
    let mut big = &list[0]; // big = first, e.g. 3 in [3,1,2]
    for x in list { if x > big { big = x; } }
    big // give back biggest
}
struct Point<T,U> { x: T, y: U } // x one kind, y maybe other kind
fn main() {
    let p = Point { x: 5, y: 4.0 }; // x:i32=5, y:f64=4.0
    println!("{} {}", p.x, p.y);
    let n = [3,1,2];
    println!("big {}", largest(&n)); // 3
}
```
Zero cost: no extra cost at run. Compiler makes one copy for `i32`. One more copy for `char`.

> Gentle gem - listen to compiler 3 steps (sqr story, easy):
> `fn sqr<T>(x:T)->T {x*x}` fails 3 times, each hint fixes 1. 1) need `Mul` to use `*`. 2) give back `T::Output` not `T` (vec dot = scalar). 3) need `Copy` else `x*x` moves `x` twice. Final `where T: Mul<Output=T> + Copy`. Baby rule: read `help:` line, do what it says, run again.
> Type trick when lost: `let x: () = var;` compiler shows real type in error. `collect()` needs hint too: `let v: Vec<_> = iter.collect();` else it does not know the type.

### Traits = shared skill

> Donkey: Trait = skill paper that says "can carry". Donkey and horse both have it. `fn ride(x: &impl Carry)` = take any animal with this paper. You need only one function.
```rust
pub trait Summary {
    fn author(&self) -> String;
    fn summarize(&self) -> String { // default, can call other fn
        format!("Read more from {}...", self.author())
    }
}
struct Post { user: String }
impl Summary for Post {
    fn author(&self) -> String { format!("@{}", self.user) }
}
// use:
fn notify(item: &impl Summary) { println!("{}", item.summarize()); }
// = fn notify<T: Summary>(item: &T)
// multi: fn f(x: &(impl Summary + Display))
// where: fn f<T,U>(t:&T,u:&U) where T: Display+Clone, U: Debug
// return hidden type: fn make() -> impl Summary { Post{...} } // only ONE concrete type!
// blanket: impl<T: Display> ToString for T // everyone Display gets to_string()
```
Orphan rule (whose toy?): you can add skill only if the skill paper is yours. Or if the animal type is yours. You cannot add `Display` to `Vec`. Both are not yours.

### Lifetimes `'a` = how long the look lives. It stops bad point to dead thing.

> Donkey: Two bridges `x` long, `y` short. Result donkey must use shorter bridge `'a`. Can't walk after short bridge falls. `'a` doesn't build longer bridge, just tells checker when it falls.
> Try it (fails on purpose, learn to predict):
> ```rust
> fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { if x.len()>y.len(){x}else{y} }
> let s1 = String::from("long donkey");
> let r; { let s2 = String::from("hi"); r = longest(&s1, &s2); } // ERROR s2 dead, r can't live
> ```
```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
// 'a = shorter of x,y. Caller can't use result after shorter dies.
struct Excerpt<'a> { part: &'a str } // struct holding borrow needs 'a

// Elision (3 auto-rules, you don't write):
// 1. each input look gets its own life.
// 2. one input -> output uses the same life: fn first(s: &str) -> &str // OK
// 3. `&self` input -> output uses the self life.
// fn bad(x: &str, y: &str) -> &str // ERROR E0106 need 'a (two inputs, compiler cannot guess)
// 'static = whole program: let s: &'static str = "hi"; // in binary
```

E0597 timeline (most common lifetime error, learn to predict):
```text
s1 lives  |---------------x  (long)
s2 lives       |-----x        (short)
r wants   |------------------x  TOO LONG -> ERROR E0597
```
Baby why: `r` wants to live as long as `s1`. But `r` may point to `s2`, which dies early. Fix: return owned `String`, not a look. Or keep the owner alive longer.

**Rule:** Lifetimes don't make things live longer. They describe to checker so it rejects bad code. Do NOT memorize all lifetime rules now. Write 20 small programs first. The compiler teaches you.

### M2. Advanced types you need for master work (NEW Sep 2026, baby words)
**Baby idea:** You know `<T>`. Now you learn 5 more tools. Each tool solves 1 real pain.

1. Associated type vs generic: one output vs many outputs.
```rust
trait Iter { type Item; } // ONE Item per type. Vec<i32> gives i32 only.
trait Seq<T> { fn get(&self) -> T; } // MANY T per type. One type can be Seq<i32> AND Seq<String>.
fn main() {
    // Rule: Iterator uses associated type because one list has one item kind.
    let v = vec![1,2,3];
    let sum: i32 = v.iter().sum(); // Item = &i32
    println!("sum {sum}");
}
```
- You write `type Item;` when one impl has one answer. You write `<T>` when one type needs many answers.

2. GATs = associated type with its own `<...>` (stable 1.65 Nov 2022).
- You need it for lending look: `type Item<'a>` borrows from self.
```rust
trait Lend { type Item<'a> where Self: 'a; } // Item borrows self for 'a
// Real use: async traits without Box. If you do not need lending, skip GATs first time.
```
- Status Sep 2026: GATs stable. Full async `dyn` still needs new solver (nightly Aug 2026, stabilizes soon).

3. `for<'a>` = for ALL lives, not one life (HRTB).
```rust
fn call<F>(f: F) where for<'a> F: Fn(&'a i32) { // F works with ANY borrow
    let zero = 0; f(&zero); // zero lives short, still ok
}
fn main() { call(|x| println!("{x}")); }
```
- You read `for<'a>` as "for any borrow time". Closures that take `&` need it.

4. `dyn` safety = can you make a zoo cage? (old name: object safety, now dyn-compat).
- `dyn Trait` works ONLY if: no `Self: Sized` need, no generic fn, no `Self` return, no associated const, no generic associated type.
```rust
trait Draw { fn draw(&self); } // OK for dyn. No generics, no Self return.
trait Bad { fn make(&self) -> Self; } // NO dyn. Self unknown at run time.
// fn print(a: Box<dyn Draw>) // OK. Box<dyn Bad> // ERROR E0038 not dyn-compatible.
```
- Trade: generics = fast, one kind, big exe (monomorphization = compiler copies fn per type). `dyn` = small exe, many kinds, small run cost (vtable = address book, no inline).

5. Const generics = number in type (min stable, full in 2026 goals).
```rust
struct Buf<const N: usize> { data: [u8; N] } // N = size in type
fn main() {
    let b = Buf::<4> { data: [0; 4] }; // 4-byte buf
    println!("{}", b.data.len()); // 4
}
```
- Today stable: `u32/bool/char` numbers only. Full structs in const (e.g. `Dimension{w,h}`) = 2026 goal, not yet stable. If you hit wall, use `Vec` or macro first.

### M3. Memory layout: size, align, padding (NEW, you need for video/C)
**Baby idea:** Size = bytes you use. Align = address must divide. Padding = empty bytes to keep align.
```rust
use std::mem::{size_of, align_of};
#[repr(C)] // C order, stable size. Default Rust order can change, do NOT trust it for C/video.
struct Demo { a: u8, b: u32 } // a=1 byte, pad 3, b=4 bytes = 8 total
fn main() {
    assert_eq!(size_of::<Demo>(), 8); // not 5! 3 pad bytes inside.
    assert_eq!(align_of::<u32>(), 4); // u32 lives at 0,4,8...
    println!("ok 8");
}
```
- `#[repr(C)]` = C order, stable. Use for C, Wayland, video headers.
- `#[repr(transparent)]` = same as inner field. Use for `struct Meters(u32)` wrappers.
- `#[repr(packed)]` = NO padding, size smallest. DANGER: unaligned read = UB. Use `read_unaligned`, or avoid. Only for hardware maps.
- Default `repr(Rust)` = compiler may reorder to save space. Good for speed, BAD for C. Never use for FFI.
- Custom alloc: `#[global_allocator] static A: MyAlloc = MyAlloc;` with `std::alloc::GlobalAlloc`. Video editor uses pools/arenas, not malloc per frame. Start with `bumpalo` crate.

> Fetched from: ch10-01, ch10-02, ch10-03

---

## N. Tests: prove it works

> Why need? You change code, break old work, no cry. Test catches now, not user.
> Senior use? Yes, must. SKIP IF HARD. Big prod apps keep 100s of tests on pure fns (parse, thread, sanitize). Unit + `cargo test` + doc tests + `assert_eq`. Which part? All logic fns, parsers, money math.

Tests live in a test room (only built for `cargo test`). Put this in `src/lib.rs`, run `cargo test`, see `ok`:
```rust
pub fn add(a: u64, b: u64) -> u64 { a + b } // 2+2=4

pub struct Guess { v: u32 } // Guess = game number 1-100
impl Guess {
    pub fn new(v: u32) -> Guess {
        if v < 1 || v > 100 { panic!("need 1-100, got {v}"); } // bad = stop
        Guess { v }
    }
}

#[cfg(test)] // room opens only for `cargo test`
mod tests {
    use super::*; // bring add + Guess from above
    #[test]
    fn it_works() {
        assert_eq!(add(2,2), 4); // shows: ok
        assert_ne!(add(2,2), 5);
    }
    #[test]
    #[should_panic(expected = "1-100")] // passes only if stop words match
    fn bad_guess() { Guess::new(200); } // 200>100 -> stop. shows: ok
}
```
```bash
cargo test
cargo test it_works  # one test
```

**Rule:** `assert_eq!` needs `PartialEq + Debug`. Add `#[derive(PartialEq, Debug)]` to your structs. Always add `expected=` to should_panic.

### N2. Integration tests in `tests/` (MISSING before, now fixed)
**Baby idea:** Unit test = test 1 room. Integration test = test whole house from street.
- Make folder `tests/` next to `src/`. Each file there = own box.
- No `#[cfg(test)]` needed. Cargo runs it only for `cargo test`.
- You must `use` your lib, like a stranger. Tests private fn? No. Only public.
```rust
// file: src/lib.rs
pub fn add_two(x: i32) -> i32 { x + 2 } // 2 -> 4
// file: tests/integration_test.rs
use adder::add_two; // adder = your lib name
#[test]
fn it_adds_two() { assert_eq!(add_two(2), 4); }
```
```bash
cargo test                  # runs all: unit + integration + doc
cargo test --test integration_test  # runs 1 file only
cargo test -- --nocapture   # show println
```
- Share setup? Make `tests/common/mod.rs` with `pub fn setup()`. Then `mod common;` in test.
- Rule: unit for small, integration for join, doc test for examples.

### L2. Real errors: `thiserror` + `anyhow` (MISSING before, now fixed)
**Baby idea:** `Box<dyn Error>` you know = plain box. Real apps need nicer boxes.
- Lib = make own error with `thiserror`. App = use `anyhow` easy box.
- Rule: lib never gives `anyhow`. App never makes big enum. Lib -> App at door.
```toml
# Cargo.toml (Sep 2026: thiserror 2, anyhow 1, both stable)
[dependencies]
thiserror = "2"  # lib: own error kind
anyhow = "1"     # app: easy error + context
```
```rust
use thiserror::Error; // lib side
#[derive(Error, Debug)]
pub enum ReadErr {
    #[error("no file {0}")]
    NoFile(String),
    #[error("bad number")]
    BadNum(#[from] std::num::ParseIntError), // auto from parse err
}
fn parse_age(s: &str) -> Result<i32, ReadErr> {
    Ok(s.parse::<i32>()?) // `?` auto-changes type via From
}
// app side:
fn main() -> anyhow::Result<()> {
    let n = parse_age("42").map_err(|e| anyhow::anyhow!(e))?;
    println!("{n}");
    Ok(())
}
```
- `anyhow::Context` adds words: `read().context("need poem.txt")?`.
- `miette` = pretty errors with lines. Use later for CLI.

> Fetched from: ch11-01 to ch11-03 (also `cargo test -- --nocapture` to see println, `--test-threads=1` for one-by-one)

---

## O. Mini Project: minigrep search tool

> Why need? Small pieces alone easy. Real job joins args + files + errors + tests. This joins all Phase 1-3 once.
> Senior use? Yes, same shape as CLIs, APIs, jobs. `Config::build` + `run()?` + `search` + `eprintln` + tests. Which part? Tools, scripts, backends.

**Baby idea:** `cargo run -- needle poem.txt` finds needle in file. `--` separates cargo args from yours.

> Gentle gem args/files (easy way you pasted):
> `std::env::args()` gives program name + args as iterator. `args.skip(1).collect::<Vec<String>>()` skips name. `nth(1)` takes 2nd. `parse::<i32>()` needs type: `let n:i32 = s.parse().expect("not number")`.
> `File` closes at `}` (drop). No `close()` needed. `read_to_string` fails on bad UTF-8, use `read_to_end` + `Vec<u8>` then.

```rust
use std::env;
fn main() {
    let args: Vec<String> = env::args().collect(); // need type!
    // args[0] = program name!
    let query = &args[1]; // panics if missing (fix later with Result)
    let file = &args[2];
    println!("Search {query} in {file}");
}
```

Try it: first make a test file (`echo hello > poem.txt`; Windows: `Set-Content poem.txt "hello"`), then run `cargo run -- hello poem.txt` from the project root (where `Cargo.toml` lives).

Full pro version (ch12) splits into `lib.rs`:
- `struct Config { query: String, file: String }`
- `Config::build(args) -> Result<Config, &'static str>` (no panic, return Err)
- `run(config) -> Result<(), Box<dyn Error>>` uses `fs::read_to_string` + `?`
- `search(query, contents) -> Vec<&str>` + same for BIG/small letters with `to_lowercase` ("ABC" finds "abc")
- env var `IGNORE_CASE=1 cargo run -- ...` via `env::var("IGNORE_CASE").is_ok()`
- errors to stderr: `eprintln!("Error: {e}")` + `process::exit(1)`
- TDD: write test first, then code.

> Fetched from: ch12-01 to ch12-06

---

## P. Closures + Iterators: shortcuts

> Why need? Loop + mut + push is long + slow to read. `map/filter/collect/sum` says what, not how. Same speed (compiler makes loop).
> Senior use? Yes, daily. `iter().map().filter().collect()`, `sum()`, `windows/chunks`, `retain`. `for` for side work (print), iter for make new list. Which part? Data change, parse, reports.

### Closures `||` = nameless fn that can steal from around

> Donkey: Normal `fn` = donkey stays outside, can't eat baby's food. Closure `||` = baby donkey in your backpack, eats food around it. `move ||` = steals food and runs to new thread cart.

> Gentle gem - closure = secret struct (easy, why Fn kinds):
> `let lin = |x| m*x + c;` compiler makes secret struct `{m:&f64, c:&f64}` with lifetime (borrows env). `Fn` = call with `&self` (look). `FnMut` = `&mut self` (change). `FnOnce` = `self` (eat). First call locks types: `f(10)` then `f(1.2)` fails. `move` takes own copy, good for threads where home dies.
```rust
// INSIDE MAIN (paste inside fn main).
let add = |x: i32| x + 1; // baby: no name, type written once so compiler knows. First use locks type.
assert_eq!(add(1), 2);
let x = 1; let c = |v| v + x; // baby: eats `x` from around
assert_eq!(c(2), 3);
```

> Do now 30 sec (from live practice-rust closure 🌟): no `move` borrows, `move` takes.
> ```rust
> fn main() {
>     let s = String::from("hi");
>     let c = || println!("{s}"); // baby: borrows s, OK here (s alive)
>     c(); // shows: hi
>     let m = move || println!("{s}"); // baby: takes s, needed for threads
>     m(); // shows: hi
> }
> ```
> Why? No `move` fails only if the closure outlives `s` (example: `thread::spawn` without `move` = ERROR E0373). `move` takes the donkey to the new cart, always safe for threads.

### Iterators = lazy conveyor belt. Does nothing until you consume.

> Donkey: Iterator = sleepy donkey. `.map().filter()` = whisper plans, donkey sleeps. `.collect().sum()` = shout GO! then he walks. No shout = warning `lazy`.
```rust
fn main() {
    let v = vec![1,2,3];
    for x in &v { println!("{x}"); } // look at each: 1,2,3. v lives.
    // &v = look (&i32), v.into_iter() = eat (i32), &mut v = change

    // next() needs mut (moves finger):
    let mut it = v.iter(); // finger at start
    assert_eq!(it.next(), Some(&1)); // finger moves: 1
    assert_eq!(it.next(), Some(&2)); // 2

    // consuming (eats): sum, collect
    let sum: i32 = v.iter().sum();     // baby: need `:i32` else compiler does not know the type. sum = 6
    println!("sum {sum}");
    let v2: Vec<_> = v.iter().map(|x| x+1).collect(); // whisper +1 then GO = [2,3,4]
    println!("{v2:?}");
    // filter keeps big only (needs owned values, so last use of v):
    let big: Vec<_> = v.into_iter().filter(|x| *x > 1).collect(); // [2,3]
    println!("{big:?}");
}
```
**New person mistake:** `v.iter().map(|x| x+1);` alone does NOTHING + warning. Must end with `collect/sum`.

> Fetched from: ch13-01 to ch13-04 (loops vs iterators same speed, iterators often faster - zero-cost)

---

## Q. Cargo Pro: publish + workspaces

> Why need? Share code with team + world. No copy-paste. One fix helps all.
> Senior use? Yes. `cargo publish` for libs (serde, tokio). Workspace for app + lib together. `cargo doc` = web docs + tests. Which part? Team libs, open source.

Doc comments become web pages + tests (two places — `///` before item, `//!` top of lib.rs only):
````rust
/// Adds one.
///
/// # Examples
/// ```
/// let a = my_crate::add_one(5);
/// assert_eq!(6, a);
/// ```
pub fn add_one(x: i32) -> i32 { x + 1 }
// //! # My Crate docs go at very top of lib.rs, not here
````
```bash
cargo doc --open
cargo test # also runs doc examples!
cargo login # paste token from crates.io/me
cargo publish # forever! can't overwrite, bump version for fix
cargo yank --vers 1.0.1 # hide bad version (old locks still work)
```

Workspace = many packages share lock + target:
```toml
# root Cargo.toml (no [package])
[workspace]
resolver = "3"
members = ["adder", "add_one"]
# adder/Cargo.toml
[dependencies]
add_one = { path = "../add_one" }
```
```bash
cargo new adder # inside workspace auto-adds
cargo run -p adder # -p picks which
cargo test # runs all, -p to filter
```

### Q2. Cargo extras you really need (MISSING before, now fixed Sep 2026)
**Baby idea:** Cargo can do more than run. Features = on/off doors. `build.rs` = small cook before main cook.

1. `serde` = change struct <-> text (JSON/TOML). Almost all apps use it. NEEDS DEP, Sep 2026 verified: `serde 1.0.229` + `serde_json 1.0.151`, MSRV 1.56.
```toml
[dependencies]
serde = { version = "1.0.229", features = ["derive"] }
serde_json = "1.0.151"
```
```rust
use serde::{Serialize, Deserialize}; // Serialize = to text, Deserialize = from text
#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct User { name: String, age: u8 } // User { bob, 7 }
fn main() {
    let u = User { name: "bob".into(), age: 7 };
    let s = serde_json::to_string(&u).unwrap(); // to text
    println!("{s}"); // {"name":"bob","age":7}
    let back: User = serde_json::from_str(&s).unwrap(); // back to struct
    assert_eq!(back, u);
}
```

2. `clap` derive = CLI args with no pain. Use this, not manual `args[1]`. NEEDS DEP, Sep 2026: `clap 4.6.6`, MSRV 1.85.
```toml
[dependencies]
clap = { version = "4.6.6", features = ["derive"] }
```
```rust
use clap::Parser; // Parser = auto read args
#[derive(Parser, Debug)]
struct Args {
    #[arg(short, long)] // --name bob, -n bob
    name: String,
    #[arg(short, long, default_value_t = 1)] // --count 3
    count: u8,
}
fn main() {
    let a = Args::parse(); // reads real CLI
    for _ in 0..a.count { println!("hi {}", a.name); }
}
```
```bash
cargo run -- --name bob --count 2
```

3. Features + `cfg` + `build.rs` + cross.
```toml
# Cargo.toml
[features]
default = ["gui"] # on by default
gui = ["dep:winit"] # gui needs winit
tiny = [] # no gui, for small chip
[dependencies]
winit = { version = "0.30", optional = true }
```
```rust
#[cfg(feature = "gui")] // only if gui on
fn open_window() { println!("gui on"); }
#[cfg(not(feature = "gui"))] // only if gui off
fn open_window() { println!("tiny, no gui"); }
fn main() { open_window(); }
```
```bash
cargo run --no-default-features --features tiny # tiny build
cargo run # gui build
```
- `build.rs` next to `Cargo.toml` runs BEFORE build. Use to make C code, check libs.
```rust
// build.rs
fn main() {
    println!("cargo::rustc-check-cfg=cfg(has_ffmpeg)"); // tell cargo: has_ffmpeg is ok
    // println!("cargo::rustc-cfg=has_ffmpeg"); // uncomment if you find ffmpeg
}
```
- Rule: in `build.rs` do NOT use `cfg!(target_os)`. That checks HOST. Use `CARGO_CFG_TARGET_OS` env. Host = where you build. Target = where exe runs.
- Cross: `rustup target add aarch64-unknown-linux-gnu` then `cargo build --target aarch64-unknown-linux-gnu`. For hard cases use `cross-rs/cross` (zero-setup, uses docker).
- `#[cfg(target_os = "linux")]` for OS code. `cfg!()` for values, `#[cfg()]` to drop code.

4. Make your own Iterator (MISSING before). Only 2 things: `type Item` + `fn next`.
```rust
struct CountUp { cur: u32, top: u32 } // cur=1 top=3 -> 1,2,3
impl Iterator for CountUp {
    type Item = u32; // gives numbers
    fn next(&mut self) -> Option<u32> {
        if self.cur > self.top { return None; } // done
        let v = self.cur; self.cur += 1; Some(v)
    }
}
fn main() {
    let v: Vec<_> = CountUp { cur: 1, top: 3 }.collect(); // [1,2,3]
    assert_eq!(v, vec![1,2,3]); println!("ok {v:?}");
}
```

5. Bench + fuzz + safe supply (adult, copy for now).
```bash
cargo add criterion --dev # bench = how fast?
cargo test # unit + integration + doc
cargo bench # bench report
cargo audit # check bad libs (RUSTSEC). Install: cargo install cargo-audit
cargo deny check # licenses + bans, for teams
```
- `criterion` = pro bench. `proptest` = random tests find edge bugs. `cargo-fuzz` = feed random bytes.
- WASM = Rust in browser. `rustup target add wasm32-unknown-unknown`. `wgpu` + `winit` both work on wasm. Start with `trunk` or `wasm-pack`. Same code, new target.
- Proc macros: `#[derive(Debug)]` you know = proc macro. Full how-to is in V4. Keep small. Most apps never make one, just use `serde`/`thiserror`/`clap` derives.

6. Release tune: `lto`, `codegen-units`, `opt-level` (NEW, copy for prod).
```toml
# Cargo.toml — only root workspace reads this, deps ignore it
[profile.release]
opt-level = 3 # 0 none, 3 max. dev default 0, release default 3.
lto = "thin" # thin = fast link + good speed. "fat" = slowest link, fastest run. false = fast build.
codegen-units = 16 # release default 16. dev default 256 (fast build, slow run). 1 = slowest build, fastest run.
strip = true # drop symbols, small exe. Use "debuginfo" if you need crash lines.
panic = "unwind" # "abort" = smaller, no cleanup. Use unwind first.
```
```bash
cargo build --release # uses above
cargo install cargo-bloat # see: what makes exe big (monomorphization!)
cargo bloat --release -n 20 # top 20 big fns
```
- Baby rule: dev = fast build. release thin-LTO = good default. fat-LTO + codegen-units=1 only for final ship (video editor export).
- `tokio` vs `async-std` Sep 2026: use `tokio` + `axum` + `sqlx` for jobs here. `async-std` is smaller, less used now. Both need same `Pin/Waker` idea from T2.

> Fetched from: ch14-01 (release profile opt-level), ch14-02, ch14-03, ch14-04 `cargo install ripgrep`, ch14-05 custom commands

---

### Q-FIRST GYM Phase 3 - TRY YOU FIRST (needs only L+M+N+P). Cover answers.

**Q7 does the list have a duplicate value? (LeetCode 217 baby, needs P iter):** `[1,2,3,1]` is true (1 appears two times). `[1,2,3]` is false.
> Hint steps: sort then near same? Or `HashSet`. Baby way: sort, look near.
> COVER, try first. Answer DOWN:
> ```rust
> fn has_two(mut v: Vec<i32>) -> bool {
>     v.sort_unstable(); // [1,1,2,3]
>     for i in 1..v.len() { if v[i]==v[i-1] { return true; } } // near same?
>     false
> }
> fn main() { assert!(has_two(vec![1,2,3,1])); assert!(!has_two(vec![1,2,3])); println!("ok"); }
> ```
> Baby why: sort puts same near. Look pair. Found = true.

**Q8 add with bad text (practice-rust result, needs L):** `"4"` -> `Ok(6)` (4+2). `"a"` -> `Err`.
> Hint: `s.parse::<i32>()?` pass bad up, else `+2`.
> COVER, try first. Answer DOWN:
> ```rust
> use std::num::ParseIntError;
> fn add2(s: &str) -> Result<i32, ParseIntError> { Ok(s.parse::<i32>()? + 2) }
> fn main() { assert_eq!(add2("4").unwrap(), 6); assert!(add2("a").is_err()); println!("ok"); }
> ```
> Baby why: `"4"` opens to 4+2=6. `"a"` bad, `?` gives back Err.

**Q9 make double (practice-rust iterator, needs P):** `[1,2,3]` -> `[2,3,4]`.
> Hint: `v.iter().map(|x| x+1).collect()`. Lazy needs `collect`.
> COVER, try first. Answer DOWN:
> ```rust
> fn main() {
>     let v1 = vec![1,2,3];
>     let v2: Vec<_> = v1.iter().map(|x| x+1).collect(); // whisper then GO
>     assert_eq!(v2, vec![2,3,4]); println!("ok {v2:?}");
> }
> ```
> Baby why: `map` whispers +1, sleeps. `collect` shouts GO, makes list.

> Review checkpoint (2 min, say out loud): 1) What wakes a lazy iterator? 2) What does `?` do on `Err`? 3) Where do integration tests live? If stuck, re-read P + L + N2.

---

### BOSS CORNER (optional challenge: hard, skip freely). Famous LeetCode kid-versions. Needs only E+K tools + 1 new tool below. Try 10 min each. Stuck 10 min? See answer, no shame — bosses are for Phase 3+.

> New tool first (1 line): `"abc".chars()` = letters a,b,c one by one. `.collect::<Vec<char>>()` catches them into a list.

**BOSS 1 same back and front? (LeetCode 9):** `121` reads same back and front (true). `10` does not (false). No text tricks first time, use math.
> Hint steps in words: 1. Below 0 = false. 2. Build back-number: take last digit (`%10`), glue (`*10+`). 3. Same? TEACHING ONLY: uses `i64` to avoid overflow. Prod would reverse half or use checked math.
> COVER, try first. Answer DOWN:
> ```rust
> fn is_pal(x: i32) -> bool {
>     if x < 0 { return false; } // -121 never same back
>     let mut back: i64 = 0; let mut t: i64 = x as i64; // i64 avoids overflow for big i32
>     while t > 0 { back = back*10 + t%10; t /= 10; } // back: 1, 12, 121
>     back == x as i64
> }
> fn main() { assert!(is_pal(121)); assert!(!is_pal(10)); println!("ok"); }
> ```
> Baby why: 121 -> back 1->12->121 == 121 true. 10 -> back 1, 1 != 10 false.

**BOSS 2 same letters? (LeetCode 242):** `"rat"` vs `"car"` = no. `"ab"` vs `"ba"` = yes.
> Hint: put letters in order (sort), then same order = same letters.
> COVER, try first. Answer DOWN:
> ```rust
> fn is_ana(s: &str, t: &str) -> bool {
>     let mut a: Vec<char> = s.chars().collect(); // ['r','a','t']
>     let mut b: Vec<char> = t.chars().collect();
>     a.sort_unstable(); b.sort_unstable(); // both ['a','r','t']?
>     a == b
> }
> fn main() { assert!(!is_ana("rat","car")); assert!(is_ana("ab","ba")); println!("ok"); }
> ```
> Baby why: order hides sameness. Sort shows truth.

**BOSS 3 two add up (LeetCode 1):** `nums=[2,7,11,15]` target `9` -> places `[0,1]` because `2+7=9`.
> Hint steps in words: 1. Empty notebook `seen` (value->place). 2. For each place i: need = target-n. 3. Notebook has need? Give back. 4. Else write n->i.
> COVER, try first. Answer DOWN:
> ```rust
> use std::collections::HashMap;
> fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
>     let mut seen = HashMap::new(); // notebook, starts empty
>     for i in 0..nums.len() { // plain for + len (no enumerate yet, learn in P)
>         let n = nums[i]; // i=0 n=2 need=7 not in book -> write 2->0. i=1 n=7 need=2 HAVE it!
>         let need = target - n;
>         if let Some(&j) = seen.get(&need) { return vec![j as i32, i as i32]; }
>         seen.insert(n, i);
>     }
>     vec![]
> }
> fn main() { assert_eq!(two_sum(vec![2,7,11,15],9), vec![0,1]); println!("ok"); }
> ```
> Baby why: walk 2 (keep), 7 (need 2, have it) -> [0,1]. Notebook makes it fast: no re-scan.

---

## PHASE 4 - ADULT: share + wait + build (adult works; Concurrency and Projects)
### You learn: smart boxes, many jobs same time, async wait, extra powers, web server. You need Phase 3 done. Ready check: can you use `Result` + `?` + `test` with no help?
### How: You design small, then build. Change 1 var, see what happens, explain why.

## R. Smart Pointers: Box, Rc, RefCell, Deref, Drop

**Baby idea:** Smart pointer = box with extra help + it cleans itself when done.

> Why need? `Box` for big or endless size (list in list). `Rc/Arc` when many owners need one toy. `RefCell/Mutex` when you must change with only look `&`.
> Senior use? Mixed. `Box` + `Arc` yes (async tasks must be `Send`, `Arc<Mutex>` share). `Rc/RefCell` mostly single-thread tests/tools, not hot prod (late check cost). Which part? Trees, graphs, shared config, caches.

> Donkey map (pick in 2 sec):
> - `Box` = put donkey in stable (heap) alone. 1 owner.
> - `Rc` = 1 donkey, many kids count ropes `strong_count`. Dies at 0. Single village (thread) only.
> - `Arc` = same as Rc but for many villages (threads).
> - `RefCell` = cheat: day rule says no ride while looking, night you do it and guards check late (stop while running). `Mutex` = same but for threads.
> Try combo: `Rc<RefCell<donkey>>` = many kids can feed same donkey.

### Box<T> = put on heap. For: unknown size (recursive), big data, trait objects.
```rust
// INSIDE MAIN (paste inside fn main). Baby: Box = put toy in stable. * = open door.
let b = Box::new(5);
assert_eq!(*b, 5); // open and see 5
// enum List { Cons(i32, Box<List>), Nil } // adult: needs Box or size is bad E0072. Skip first time.
```

> Do now 30 sec (from live practice-rust box 🌟): fill type:
> ```rust
> fn main() {
>     let b = Box::new(String::from("hi")); // baby: box holds text
>     print_box(b); // moves box, old dead
> }
> fn print_box(b: Box<String>) { println!("{b}"); }
> ```
> Guess: can you use `b` after `print_box(b)`? No. Move = gone.

### Deref = `*` to open box. Auto change: `&Box` becomes `&str` for you.

> Donkey: `*y` = open stable door to touch donkey. Auto change = baby shouts `hi(&m)` with big box, guard auto-unboxes `&Box<String>` -> `&str`. No need `&(*m)[..]`.
```rust
// INSIDE MAIN (paste inside fn main).
let x = 5; let y = Box::new(x);
assert_eq!(5, *y); // * = go inside
fn hi(name: &str) { println!("Hi {name}"); }
let m = Box::new(String::from("Rust"));
hi(&m); // auto &Box<String> -> &String -> &str, no need &(*m)[..]
```

### Drop = cleanup when dies. Reverse order.
```rust
struct Toy { d: String }
impl Drop for Toy { fn drop(&mut self) { println!("Bye {}", self.d); } }
// drop(toy); // early kill. Can't call toy.drop() E0040
```

### Rc<T> = many owners, single thread. Counts owners, dies at 0.
```rust
use std::rc::Rc;
enum List { Cons(i32, Rc<List>), Nil } // tail shared by many lists
use List::{Cons, Nil};
fn main() {
    let a = Rc::new(Cons(5, Rc::new(Nil))); // a: 5 -> end. count = 1
    let _b = Cons(3, Rc::clone(&a)); // _b: 3 -> shares a. count = 2 (lives to end of main)
    let _c = Cons(4, Rc::clone(&a)); // _c: 4 -> shares a. count = 3
    println!("owners {}", Rc::strong_count(&a)); // 3
}
// Rc::clone(&a) not a.clone() to show it's cheap count, not deep copy
```

### RefCell<T> = bend borrow rules, check at RUNTIME (panics if bad). For `&self` that must mutate.
```rust
use std::cell::RefCell;
use std::rc::Rc;
struct Mock { msgs: RefCell<Vec<String>> } // msgs = notes list, starts empty
impl Mock {
    fn send(&self, m: &str) { self.msgs.borrow_mut().push(m.into()); } // &self but mutates!
}
fn main() {
    let mk = Mock { msgs: RefCell::new(vec![]) };
    mk.send("hi"); // looks like read (&self) but adds note inside
    println!("notes {}", mk.msgs.borrow().len()); // 1
    // Combo multi-owner + mutable:
    let v = Rc::new(RefCell::new(5)); // v = 5 shared
    *v.borrow_mut() += 10; // v = 15
    println!("v {}", v.borrow()); // 15
}
```
Matrix:

| Tool | Owners | Threads | Change inside? |
|---|---|---|---|
| `Box<T>` | one | one | through `&mut` |
| `Rc<T>` | many | one | no |
| `RefCell<T>` | one | one | yes, checked late |
| `Rc<RefCell<T>>` | many | one | yes |
| `Arc<T>` | many | many | no |
| `Arc<Mutex<T>>` | many | many | yes |

> Fetched from: ch15-01 to ch15-06 (Weak to break cycles)

---

## S. Many jobs same time: threads + messages (book calls it Fearless Concurrency)

> Why need? One job slow blocks all. Web must serve many users at once, fast answer.
> Senior use? Yes, all prod 2026. SKIP IF HARD. `tokio` + `axum` + `sqlx` is standard stack now. `mpsc` send to one, `broadcast` send to many, locks for share, count with atomic. Wrong lock = dead or no build. Which part? Servers, queues, games.

> Donkey: `thread::spawn(move ||...)` = give donkey to new cart, old cart can't use him after `move`. No `join` = main cart drives home early, baby cart never arrives. `join` after work = both carts run together. `join` before work = wait, no speed.
```rust
use std::thread;
use std::time::Duration;
fn main() {
    // 1. spawn (2 hello carts):
    let h = thread::spawn(|| {
        for i in 1..3 { println!("hi {i}"); thread::sleep(Duration::from_millis(1)); }
    });
    h.join().unwrap(); // wait! Without join, main may kill child early.

    // move to give ownership:
    let v = vec![1,2,3]; // v = [1,2,3]
    let h2 = thread::spawn(move || println!("{v:?}")); // need move else E0373
    h2.join().unwrap(); // wait for cart 2 as well
}
```

Channels: share by talking, not sharing memory.
```rust
use std::sync::mpsc;
use std::thread;
fn main() {
    let (tx, rx) = mpsc::channel(); // tx = sender, rx = receiver. Clone tx for more senders.
    thread::spawn(move || tx.send(String::from("hi")).unwrap()); // send MOVES "hi"
    let got = rx.recv().unwrap(); // wait for mail. try_recv() = peek, no wait.
    println!("Got: {got}"); // Got: hi
} // channel ends when all senders dropped
```

Shared memory with Mutex + Arc:

> Donkey: `Mutex` = 1 saddle, only rider with lock rides. Lock auto-returns at `}`. `Arc` = many ropes to same donkey across villages (threads). `Rc` breaks between villages (not Send) - use `Arc`.
```rust
// INSIDE MAIN (paste inside fn main).
use std::sync::{Arc, Mutex};
let counter = Arc::new(Mutex::new(0)); // Arc = thread-safe Rc, Mutex = thread-safe RefCell
let mut hs = vec![];
for _ in 0..10 {
    let c = Arc::clone(&counter);
    hs.push(thread::spawn(move || { *c.lock().unwrap() += 1; }));
}
for h in hs { h.join().unwrap(); }
println!("{}", *counter.lock().unwrap()); // 10
// lock auto-unlocks at } via Drop.
// `.lock().unwrap()` : lock gives Result because Mutex gets poisoned if another thread panicked while holding it. Poisoned = "maybe bad data". Unwrap = "stop if poisoned". Prod code handles Err, baby code unwraps.
```
`Send` = can travel between threads, `Sync` = can be shared via `&` between threads. `Rc/RefCell` are NOT Send/Sync -> use Arc/Mutex. Deadlock (two mutexes waiting) Rust can't stop - be careful.

> Fetched from: ch16-01 to ch16-04

---

## T. Async Await: do many things while waiting

> Why need? Threads cost big (1MB each). 30k users need light jobs, not 30k threads. Async = one chef many pots.
> Senior use? Yes, for IO wait (net, DB, files). `tokio` + `axum` + `sqlx`. CPU work stays sync threads. `async ||` 1.85 + `AsyncFn` lets future borrow. Which part? APIs, proxies, chat, feeds. Skip async for baby scripts.

**Baby idea:** Thread = hire new chef. Async = one chef starts pasta, while water boils cuts veggies.

> Donkey: Future = sleepy baby donkey, does nothing until you say `.await` GO! No runner = no mom to wake him. `trpl::block_on` (school toy) / `tokio` (real work) = mom. Forgot `.await` = warning + donkey never moves.
> WARNING: `trpl` is a school crate from the Rust Book only (Sep 2026: `trpl 0.3.0`, re-exports `tokio` + `futures`, `block_on` runs on bespoke Tokio runtime). Real jobs use `tokio` or `async-std` directly. Learn `trpl` here, then use `tokio` below for real code.
> NEEDS DEP for all T school code:
> ```toml
> [dependencies]
> trpl = "0.3" # school only, pins tokio+futures so book never breaks
> ```
```rust
// Future = promise, lazy! Does nothing until .await (like iterator)
async fn page_title(url: &str) -> Option<String> {
    let text = trpl::get(url).await.text().await; // two awaits: headers then body. SCHOOL WAY.
    trpl::Html::parse(&text).select_first("title").map(|t| t.inner_html())
}
fn main() {
    trpl::block_on(async { // need a runner to run futures! std has none, use tokio/trpl
        match page_title("https://example.com").await {
            Some(t) => println!("{t}"),
            None => println!("no title"),
        }
    });
}
// race two (SHAPE ONLY, needs two urls + async main):
let f1 = page_title(url1); // lazy, not running yet!
let f2 = page_title(url2);
match trpl::select(f1, f2).await { trpl::Either::Left(l)=>..., trpl::Either::Right(r)=>... }
```
**Real work way (use this after school, needs `tokio = { version="1", features=["full"] }` — Sep 2026: tokio 1.53.1, MSRV 1.71):**
```rust
#[tokio::main] // real runner, makes async main work
async fn main() -> anyhow::Result<()> {
    let t1 = tokio::spawn(async { 1 + 1 }); // new job on pool
    println!("spawned {}", t1.await?); // shows: 2
    tokio::time::sleep(std::time::Duration::from_millis(10)).await; // wait 10ms, no block
    Ok(())
}
```
**Rule:** Plain `async fn main` does not run by itself. You need an executor. Compiler says E0752 `main function is not allowed to be async`. Fix: keep `fn main` + `block_on` for school, or `#[tokio::main]` for real work (needs `tokio` with `macros` + `rt` features).

### T2. How Future works inside (NEW, you need for compositor, Sep 2026)
**Baby idea:** Future = job with 2 answers: Ready (done) or Pending (come later). Runner calls `poll` again when woken.
```rust
use std::future::Future; // Output = done value
use std::pin::Pin; // Pin = do not move in memory (self-looks need stable address)
use std::task::{Context, Poll}; // Context brings Waker. Waker = wake me later.
// Shape only (std 1.36+):
// fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Output>
// Poll::Ready(v) = done. Poll::Pending = not yet, I saved Waker, call me when ready.
fn main() {
    // Tiny runner idea (school shape, real tokio does more):
    // loop { match fut.poll(&mut cx) { Ready(v) => return v, Pending => park thread } }
    println!("poll = ask, waker = call me later");
}
```
- `Pin<&mut Self>` = you promise not to move the job in memory. Async jobs hold looks into themselves, move would break looks.
- `Context` + `Waker` = runner gives you a bell. You save bell on Pending, ring bell (`wake()`) when net/file ready. Runner polls again. Only last bell counts.
- Make your own runner? Copy `std::task::Wake` example (`block_on` with `thread::park/unpark`). Real `tokio` adds pool + timer + net reactor (epoll/kqueue/io_uring) + work steal. `async-std` = smaller, same idea. Use `tokio` for jobs here.
- Cancel danger: `await` dropped = job stops mid-way. If you took a lock or half-wrote a file, you leave mess. Rule: keep `await` outside locks, use `tokio::select!` with `biased;` + cleanup, or `Drop` guard. `tokio::spawn` jobs die on drop of handle unless detached.
- Streams = async iterators (`poll_next`). Use for video frames, chat feed.

> Fetched from: ch17-01 to ch17-06 (Futures, Streams = async iterators, traits, tasks vs threads)

---

## U. OOP with Traits + Patterns

Trait objects = different toys in same box:

> Why need? Enum needs all kinds up front. Shop app adds new pay way each month. `dyn` lets new kinds in with no old change.
> Senior use? Yes for plugins, UI, pay ways. Generics = fast one kind. `dyn` = many kinds small slow. Which part? Plugin boxes, screens.
> Donkey: `Vec<Button>` = cage only buttons. `Vec<Box<dyn Draw>>` = zoo cage, button donkey + slide donkey together. Generics = fast small road (one kind). `dyn` = big road with lights (many kinds, small slow).
```rust
pub trait Draw { fn draw(&self); }
pub struct Screen { pub comps: Vec<Box<dyn Draw>> } // dyn = finds right skill while running
impl Screen { pub fn run(&self) { for c in &self.comps { c.draw(); } } }
struct Button;
impl Draw for Button { fn draw(&self) { println!("btn"); } }
// downstream can add SelectBox without changing Screen! Enum (ch8) can't.
// Generics <T: Draw> = static, fast, but one type only. dyn = flexible, small cost.
```

Patterns everywhere (`match`, `if let`, `let`, fn args, `for`) — SHAPES tour (each arm shows one shape, `...` = your code here, not runnable as-is):

> Why need? New shape added later (new pay way, new message kind) + forgotten branch = live bug at 3am. `match` must cover ALL shapes, compiler shouts at build instead. This "forgotten case" check is why banks and pay code love `match` + `Result`.
> Senior use? Yes. serde_json matches all JSON kinds. Pay code uses types Unpaid->Paid->Shipped so wrong order won't build. Firefox matches packet kinds. rustc itself matches all code shapes. Which part? States, messages, errors, parsers.
```rust
// SHAPE ONLY (`...` are placeholders, do not run)
match x {
    1 => ..., // exact number 1
    1 | 2 => ..., // 1 or 2
    1..=5 => ..., // 1 to 5 with end (`..` without `=` excludes end)
    Some(y) => ..., // full box, new y shadows outer! use guard to compare outer:
    Some(n) if n == outer => ..., // guard: extra `if` check
    Point { x, y: 0 } => ..., // point on x-line (y is 0)
    (first, _, third, .., last) => ..., // _ ignore one, `..` ignore rest (once only)
    id @ 3..=7 => ..., // @ catch number into id + test range
    _ => ..., // all else
}
```
`_` never moves, `_x` moves but hides warning. `Some(_)` doesn't steal, `Some(_s)` steals.

> Fetched from: ch18-01 to ch18-03 (state pattern with blog Post), ch19-01 to ch19-03

---

## V. Unsafe + Macros: extra powers

> Why need? Safe Rust says no to 1% fast needs (raw speed, C code, tiny chips). `unsafe` opens door small + you guard it. Macros write same code for you.
> Senior use? Little but key. `unsafe` only in drivers, fast paths, FFI, with bench + `Miri` check. `derive` daily (`Debug`, `Clone`, `serde`). Which part? Kernels, hot loops, libs. Baby rule: no `unsafe` first year unless book says.

Unsafe = "trust me compiler". Only 5 extra powers, rest still checked. Keep small, wrap safe.
Baby rule: no `unsafe` first year unless book says. Each needs `unsafe` wrapper to run. FULL PROGRAM below, stable Sep 2026.
```rust
fn main() {
    // 1. raw finger (may point nowhere, no check):
    let mut n = 5; // n = 5
    let r1 = &raw const n; // look-only finger (stable, preferred). OLD toolchain fallback: `std::ptr::addr_of!(n)`.
    let r2 = &raw mut n;   // change finger (stable, preferred). OLD fallback: `std::ptr::addr_of_mut!(n)`.
    unsafe { println!("{} {}", *r1, *r2); } // shows: 5 5
    // 2. unsafe fn (caller promises safety):
    unsafe fn danger() { println!("careful!"); }
    unsafe { danger(); } // shows: careful! (Edition 2024 needs inner `unsafe` even inside `unsafe fn`, lint `unsafe_op_in_unsafe_fn`)
}
```
```rust
// FULL PROGRAM, Edition 2024, stable. 3. talk to C code:
// `unsafe extern` is REQUIRED in Edition 2024 (optional before, RFC 3484, Rust 1.82+). Items default to unsafe unless marked `safe`.
// This links to C `abs` from libc. Needs C toolchain + libc on target. If link fails, use `libc = "2"` crate instead.
unsafe extern "C" { fn abs(x: i32) -> i32; } // C's abs, takes -3 gives 3
fn main() { unsafe { println!("{}", abs(-3)); } } // shows: 3
```
// 4. global changeable — DO NOT USE IN REAL CODE (Edition 2024 `static_mut_refs` = deny by default, taking `&` is instant UB):
```rust
static mut COUNT: u32 = 0; // shared counter, starts 0. SCHOOL ONLY to show syntax.
fn main() { unsafe { COUNT += 1; } } // COUNT = 1 now. New Rust forbids `&COUNT`. Use raw ptr or better below.
// REAL CODE uses one of these instead:
use std::sync::atomic::{AtomicU32, Ordering}; // lock-free counter
static COUNT2: AtomicU32 = AtomicU32::new(0); // safe global
fn main2() { COUNT2.fetch_add(1, Ordering::SeqCst); } // no unsafe
// OR `Mutex`, `OnceLock`, `LazyLock` for complex globals.
// 5. unsafe skill paper / shared-memory union (drivers only, skip first year)
```
Check with Miri: `rustup +nightly component add miri; cargo +nightly miri test`.

### V2. Real FFI for Wayland/C libs (you need this for compositor, Sep 2026)
**Baby idea:** C talks different. You must use same shape + same order.
- `#[repr(C)]` = same order as C. No re-order. Always for C structs.
- `bindgen` = auto-make Rust from C `.h`. `cbindgen` = other way.
- `unsafe` stays SMALL. Wrap safe fn outside.
```rust
#[repr(C)] // same as C, do not re-order
pub struct WlSize { w: i32, h: i32 } // width, height
unsafe extern "C" {
    fn abs(x: i32) -> i32; // C's abs, real one
}
fn abs_safe(x: i32) -> i32 { unsafe { abs(x) } } // safe wrap
fn main() { assert_eq!(abs_safe(-3), 3); println!("ok"); }
```
```bash
cargo add bindgen # then: bindgen wayland.h -o src/wayland_bind.rs
cargo install cargo-audit # check C libs too
```
- Rule: owned `String` -> C? Use `CString`. C -> Rust? Use `CStr`. Never pass `&str` direct.
- Alignment: C `int` may be 32-bit, Rust `i32` = same. `long` differs! Check with `std::os::raw::c_long`. Use it, not `i64`.
- For Smithay you rarely write this by hand. `wayland-client/server` + `drm-rs` already did it. Learn shape, then use their safe wrap.

### V3. Soundness: when `unsafe` is wrong (NEW, baby words, Sep 2026 Reference)
**Baby idea:** `unsafe` does NOT turn off rules. You promise YOU checked. If you lie, whole program is bad (UB = undefined behavior).
- Sound = safe users cannot break it. Unsound = safe code can crash via your code. You must be sound.
- NEVER do this (short UB list, Reference "Behavior considered undefined"):
- no null/dangling point touch. no unaligned read (use `read_unaligned`). no read of garbage/uninit mem. no data race. no bad `bool` (not 0/1), bad `char`, bad enum number. no bad UTF-8 in `str`. no break of borrow rules (`&T` = no write while live, `&mut T` = no other use while live, except inside `UnsafeCell`).
```rust
fn main() {
    let mut n = 5;
    let r = &raw mut n; // raw finger, may be bad
    unsafe {
        // *r = 6; // OK: r is live, no other use. n = 6.
        // let x = *r.offset(100); // NEVER: far outside object = UB.
        *r = 6; // OK
        // Use offset only inside same object + 1 past end max:
        let p = r.offset(0); // same place, OK
        assert_eq!(*p, 6);
    }
    println!("{n}"); // 6
}
```
- Aliasing in plain words: `&` = many readers, no writer. `&mut` = one writer, no readers. Raw fingers inherit rules from the `&` they came from (Stacked/Tree Borrows model, still research, Miri checks it).
- Make a safe cover: keep `unsafe` small, check all inputs, test with Miri.
```bash
rustup +nightly component add miri
cargo +nightly miri test # runs tests + finds UB: bad bool, bad alias, race, leak
```
- Miri cannot prove sound. It only finds bad runs you test. You still think + cover all paths. POPL 2026 Miri paper: finds all UB in tested runs, not all possible runs.
- Rule: no `unsafe` first year unless book says. When you must, wrap safe + Miri + review.

Macros = code writes code:
```rust
// declarative (FULL PROGRAM, own name so it never fights std `vec!`):
macro_rules! make_list {
    ( $( $x:expr ),* ) => { { let mut v = Vec::new(); $( v.push($x); )* v } };
}
fn main() {
    println!("{:?}", make_list![1, 2, 3]); // shows: [1, 2, 3]
    println!("{:?}", vec![4, 5]); // real vec! still works
}
// procedural: #[derive(Debug)] etc live in own crate proc-macro=true, use syn+quote
#[derive(HelloMacro)] struct Pancakes; // custom derive
#[route(GET, "/")] fn index() {} // attribute macro
sql!(SELECT * FROM x); // function-like
```

### V4. Make your own derive: `syn` + `quote` (NEW, copy shape first)
**Baby idea:** Proc macro = fn from code to code at build time. `syn` reads code to tree (AST). `quote` writes tree to code.
- 3 kinds: derive (`#[derive(Hello)]`), attribute (`#[route]`), function-like (`sql!()`).
- Must live in own box with `proc-macro = true`. Cannot use in same box.
```toml
# PROC MACRO CRATE (own crate, needs proc-macro = true)
# hello-macro-derive/Cargo.toml
[lib]
proc-macro = true
[dependencies]
syn = "2.0"
quote = "1.0"
```
```rust
// hello-macro-derive/src/lib.rs
use proc_macro::TokenStream; // compiler code stream
use quote::quote; // write code
// SHAPE ONLY (own proc-macro crate; user crate must define `trait HelloMacro { fn hello(&self); }`)
#[proc_macro_derive(HelloMacro)] // derive kind
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
    let ast: syn::DeriveInput = syn::parse(input).unwrap(); // read to tree
    let name = &ast.ident; // struct name
    let out = quote! { impl HelloMacro for #name { fn hello(&self) { println!("hi"); } } };
    out.into() // give code back to compiler
}
```
- Hygiene: proc macros are NOT clean (unhygienic). Output acts as if you typed it there. It sees outside names + pollutes outside. Use full paths (`::my_crate::Trait`) + keep names rare.
- AST = tree of code (`File` > `Item` > `Expr` > `Type`). `syn::DeriveInput` = struct/enum header. Spans = line numbers for errors. Keep spans from input so errors point to user code.
- Errors: `panic!("bad input")` = build error. Or emit `compile_error!("use struct")`.
- Rule: most apps never make one. Use `serde`/`thiserror`/`clap` derives. Make one only for repeat boring code.

> Fetched from: ch20-01 to ch20-05, Appendix G nightly

---

## W. Final Project: web server (SCHOOL ONLY, do not ship)

> WARNING: This teaches the SHAPE of a server only. Do NOT ship this. No async, no TLS, no timeouts, no limits, many `unwrap()`. Prod uses `tokio` + `axum` + `rustls` (see AFTER + AA road). All `unwrap()` below = TEACHING ONLY.
> Senior use? Yes shape, not code. Prod uses `tokio` + `axum`, not std threads. Same ideas: bind, handle, pool, clean stop. Which part? APIs, sites, games.

**Baby idea:** TCP = pipes, HTTP = language in pipe. `GET / HTTP/1.1` asks, `HTTP/1.1 200 OK + Content-Length + body` answers.

```rust
// FULL PROGRAM, NEEDS FILE (make files first, else panic):
// bash: echo '<h1>hi</h1>' > hello.html && echo '<h1>no page</h1>' > 404.html (Windows PowerShell: Set-Content hello.html "<h1>hi</h1>" — or make both files by hand)
use std::{fs, net::TcpListener, io::{BufReader, prelude::*}};
// Needs 2 files next to main.rs (make them first):
// hello.html with `<h1>hi</h1>`, 404.html with `<h1>no page</h1>`
fn main() {
    let l = TcpListener::bind("127.0.0.1:7878").unwrap(); // 7878 = RUST on phone keys
    for s in l.incoming() { handle(s.unwrap()); } // one guest at a time!
}
fn handle(mut stream: std::net::TcpStream) {
    let line = BufReader::new(&stream).lines().next().unwrap().unwrap();
    let (status, file) = if line == "GET / HTTP/1.1" {
        ("HTTP/1.1 200 OK", "hello.html")
    } else { ("HTTP/1.1 404 NOT FOUND", "404.html") };
    let body = fs::read_to_string(file).unwrap();
    let resp = format!("{status}\r\nContent-Length: {}\r\n\r\n{body}", body.len());
    stream.write_all(resp.as_bytes()).unwrap();
} // drop stream = close
```
Next steps in book: threadpool (4 workers + `mpsc` jobs) for multi-thread, then graceful shutdown (drop + join).

> Fetched from: ch21-01 to ch21-03

---

### Q-FIRST GYM Phase 4 - TRY YOU FIRST (needs R+S). Cover answers. Adult easy.

**Q10 count with many hands (needs Arc+Mutex, live threads):** 10 hands add 1 to 0. End 10?
> Hint steps: `Arc::new(Mutex::new(0))` + `Arc::clone` per hand + `lock` + `+=1` + `join`.
> COVER, try first. Answer DOWN:
> ```rust
> use std::sync::{Arc, Mutex}; use std::thread;
> fn main() {
>     let c = Arc::new(Mutex::new(0)); // baby: one donkey many ropes + one saddle
>     let mut hs = vec![];
>     for _ in 0..10 { let cc = Arc::clone(&c); hs.push(thread::spawn(move || *cc.lock().unwrap() += 1)); }
>     for h in hs { h.join().unwrap(); }
>     assert_eq!(*c.lock().unwrap(), 10); println!("ok 10");
> }
> ```
> Baby why: each hand locks, adds 1, frees. 0->10. No lock = kick.

**Q11 box open (needs R Box):** Make `Box(5)`, open with `*`, see 5?
> Hint: `Box::new(5)` then `*b`.
> COVER, try first. Answer DOWN:
> ```rust
> fn main() { let b = Box::new(5); assert_eq!(*b, 5); println!("ok"); }
> ```
> Baby why: Box = stable. `*` = open door. See 5.

**Q12 async wait (needs T, simplified):** Two sleepy jobs, who first? Use `trpl::block_on` + `.await`.
> Hint: future sleeps until `.await` GO. No runner = no mom.
> COVER, try first. Baby code (INSIDE MAIN, NEEDS DEP trpl): `trpl::block_on(async { println!("hi"); });` Run, see hi. Full async in book T.

---

## AFTER: 9 real projects road (from live practice-rust elegant page)

> You finished this book. Now build. Easy first, hard last. Each project says: what it is, which book parts you need, when to start, what is NEW (not in this book — honest).
> Rule: read code 1 hour, type 3 hours. If stuck 30 min, ask. Done > perfect.
> For EVERY project: done = it builds + its tests pass. Stretch = change 1 feature. Review = explain your code out loud in 2 minutes.

### FIRST — start here after Phase 3

**4. Command-Line Rust (book + code).** Make 14 mini tools: hello, echo, cat, head, wc, grep, ls.
> Needs: O args, N tests, K String, L Result. New: `clap` arg lib (1 lib). Why: same shape as minigrep, but 14 small wins + tests. Link: https://github.com/kyclark/command-line-rust
> First 3 steps: 1. Clone + `cd 01_hello`, run `cargo test`, then `cargo run -- Hello` (see: Hello). 2. Open `02_echor`, do echo clone the same way. 3. `03_catr` (reads files). Each room has tests — run them before you code.

**5. pngme (free book, middle level).** Hide secret text inside PNG pictures. 4 commands: hide, read, erase, list.
> Needs: K bytes/Vec, L Result, N tests, O args, M traits. Says "read The Book first" — this baby book counts! New: PNG chunk rules + CRC math lib + reading docs (its goal #2). Tests + hints given. Link: https://jrdngr.github.io/pngme_book/
> First 3 steps: 1. `cargo new pngme`, copy chapter-1 tests in, make ChunkType pass them (4 letters like `RuSt`). 2. Chapter 2: chunks (size + type + data + check number). 3. Chapter 4: 4 commands with `clap`. Stuck? Hint page per chapter, in order.

**2. hecto (free blog, ~3000 lines).** Build a text editor from zero: type, save, find, colors.
> Needs: K String/Vec, E loops, I match, O files. Tiny steps, run after each step (like this book!). New: raw screen mode (1 small lib). Link: https://www.flenker.blog/hecto/ (also https://philippflenker.com/hecto/)
> Honest baby-check (I read it): steps = baby YES (type a few lines, run, see change; later: try-first assignments). Words = NOT baby (long jokes, Mac-first, backtrace deep-dive in chapter 1 — skip that prose freely, author says so).
> First 3 steps: 1. Chapter 1: install, `cargo init hecto --vcs none`, `cargo run` (see: Hello World). 2. Chapter 2: program reads keys, `q` quits (hard system-call words ok to copy now, learn later). 3. Chapter 4: open a file, see its text on screen. Then follow assignments, skip long prose.

### NEXT — after Phase 4

**7. CodeCrafters (hands-on, 154k learners).** Rebuild Shell, Redis, Git, Docker, SQLite piece by piece with tests checking each step.
> Needs: W TCP server (Redis), O files/args (Git/Shell), K bytes. Start with Redis or Shell (easiest). New: each tool's message rules (small docs). Link: https://codecrafters.io/for/rust
> First 3 steps: 1. Sign in with GitHub, pick Redis. 2. Stage 1: open port (bind), push, their tests turn green. 3. Next stages one by one: answer PING, then ECHO, then SET/GET. Tests tell you each next step — follow them.

**8. mini-redis (free, tokio team, 4.8k stars).** Small Redis server to LEARN async: net server, shared data box, message frames, clean stop, pub/sub, tests.
> Needs: T async, S Mutex/channels, L Result, N tests. NOT for shipping (says so itself). New: `tokio` lib itself — this IS the tokio school. Best async #2 after our T. Link: https://github.com/tokio-rs/mini-redis
> First 3 steps: 1. Clone, run `cargo run --bin mini-redis-server` (see log lines). 2. New window: `cargo run --example hello_world` (see: talks to server). 3. `cargo run --bin mini-redis-cli set foo bar`, then `get foo` (see: bar). Then read code in order: server → connection/frame → db.

**1. ripgrep (read first, 68.2k stars).** Fastest file search. NOT small — read, don't rebuild.
> Needs to READ: P iterators, S threads, L errors, Q workspaces. New: `regex` + parallel-walk libs. Link: https://github.com/BurntSushi/ripgrep
> First 3 steps: 1. Install (`cargo install ripgrep` or app store), run `rg TODO` in any folder (see: matching lines). 2. Clone + `cargo build --release` (see: builds). 3. Read `GUIDE.md`, then `crates/ignore` room (how it skips files). Read, don't rebuild.

**3. ncspot (read + small fixes, 6.8k stars).** Music player in terminal. Small, tidy rooms, async.
> Needs: T async, S channels, O config files. New: screen-draw lib + music API (needs paid music account!). Start by reading, fix 1 tiny bug. Link: https://github.com/hrkfdn/ncspot
> First 3 steps: 1. Check: paid music account? No = stop here, pick another project (honest). 2. Build needs Rust + Python3 on computer, then `cargo build` (see: builds). 3. Run, move with `hjkl` keys (vim ways), quit. Then read `src/` one room, fix 1 tiny thing.

### LAST — expert, needs new big tools (honest gaps)

**9. Interpreters (free book, HARD).** Build a language: memory manager of your own, VM, compiler. Book itself says read Crafting Interpreters first.
> Needs from us: I enums/match, R Rc, M traits, V unsafe basics. Gap: custom GC memory + VM design NOT in this book — that IS the book's topic. Do after 2-3 projects above. Link: https://rust-hosted-langs.github.io/book/
> First 3 steps: 1. Read Crafting Interpreters intro (their own advice — free online). 2. In our book's tools only, build tiny calculator: `enum Expr { Num(i32), Add(Box<Expr>, Box<Expr>) }` + `match` eval (see: 1+2=3). 3. Open their chapter 4.1 (names + pairs) when the calculator feels easy.

**6. OS in Rust (free blog, 17.7k stars).** Build a tiny computer brain: boot, screen text, interrupts, memory pages, heap, async.
> Needs from us: V unsafe, T async ideas, N tests. Gap (honest): NO standard library (`no_std`), nightly Rust, QEMU fake computer, starter program (bootloader) — NONE in this book. Follow blog post 1 first. Do last. Link: https://os.phil-opp.com
> First 3 steps: 1. Install nightly Rust + QEMU fake computer (new tools — follow their post 1 exactly). 2. Build the no-library hello (see: words on fake screen, not your terminal!). 3. Post 2: boot picture that prints. If step 1 fights you over 1 hour, park this project and finish 2 easier ones first.

### YOUR ROAD — graphics / compositor / GUI / video (for YOU, Sep 2026 verified)
> This book = 0-100% of Rust Book = solid middle. Your goal = Wayland compositor + GUI kit + video editor. That needs one more layer below. All versions checked Sep 17 2026.

**AA1. Window first: `winit` 0.30 + `wgpu` 30 (draw a triangle).**
> Needs: P iter, S threads, L Result, Q2 features. New: GPU breeds (Vulkan/Metal/DX12/GL). `wgpu` = safe Rust GPU (WebGPU shape). Runs on Vulkan, Metal, D3D12, GL ES, plus wasm WebGPU. MSRV 1.87. `winit` 0.30.13 (0.31 beta) = window + keys + Wayland.
> First 3 steps: 1. `git clone https://github.com/gfx-rs/wgpu` and `cd wgpu` (examples live in THEIR repo, not your new project). 2. Run `cargo run --bin wgpu-examples cube` (see: spinning cube). For YOUR own app: `cargo new my_gpu && cargo add wgpu winit`, then copy a standalone example as starter. 3. Read https://sotrh.github.io/learn-wgpu/ ch1-3 (window + surface + shader). Change clear color 1 line, run again. Docs: https://wgpu.rs/ https://docs.rs/winit
```toml
[dependencies]
wgpu = "30" # Sep 2026: v30.0.0, MSRV 1.87
winit = "0.30" # window + Wayland + keys
```

**AA2. Wayland ideas + Smithay (your compositor).**
**Baby idea:** Wayland = talk rules. Compositor = boss. Client = app. Boss draws all apps.
- `wayland-client` = talk as app. `wayland-server` = talk as boss. `Smithay` 3.2k stars = Lego for boss in Rust.
- Smithay gives: surface tree, double-buffer state, shell, shm, drm/GPU, input, `calloop` event ring (wait + react, no threads).
- Real bosses using it: Cosmic (System76 desktop), Niri (scroll tiling), Pinnacle, MagmaWM. Sample boss = `anvil` in Smithay repo.
> Needs: S Arc/Mutex/calloop, R Box/dyn, V2 repr(C). New: Wayland XML protocol, drm (screen), libinput (keys/mouse).
> First 3 steps: 1. Clone https://github.com/Smithay/smithay, run `cargo run --example compositor` (see: tiny boss, examples run inside THEIR repo). 2. `cd anvil && cargo run -- --winit` (runs nested in your session; needs libwayland + libxkbcommon system libs). 3. Read `docs.rs/smithay` -> `wayland::compositor` (CompositorState + CompositorHandler). Change 1 log line, run again.
```rust
// shape only, from Smithay docs:
use smithay::wayland::compositor::{CompositorState, CompositorHandler};
// 1. make CompositorState::new::<State>(&display.handle())
// 2. keep it in your State
// 3. impl CompositorHandler for State
// 4. delegate_dispatch2!(State); // auto wire Wayland msgs
```

**AA3. GUI kit shape: kept vs fast mode + text.**
- Kept (retained) = tree of buttons, easy, more mem. Fast (immediate, egui) = draw each frame, easy to code, hard for big text.
- Layout = where boxes go (flex/constraints). Text = hardest: font + shape + bidi. Use `cosmic-text` / `parley` + `fontdb`, not your own.
- Start: `egui` + `eframe` for tools. Then `iced` or `druid`-style for kept. Your video editor = kept timeline + fast preview.
- Rule: 60 fps = 16.6 ms per frame. More = drop. Measure with `tracy` or `puffin`.

**AA4. Video: frames + sound (your editor).**
- Frame = bytes `Vec<u8>` RGBA. 1920x1080x4 = ~8 MB per frame. 60 fps = ~500 MB/s. No clone per frame! Use `&`, `Arc`, pools.
- Decode/encode: `ffmpeg-next` (needs ffmpeg C lib) or `gstreamer-rs`. Color: YUV (video) vs RGB (screen). Wrong change = bad skin.
- First 3 steps: 1. `cargo add ffmpeg-next`, open mp4, print width/height/fps (see: 1920 1080 30). 2. Get 1 frame as bytes, save as PNG. 3. Show it with `wgpu` texture. Then add seek + cut.
- Sound: `cpal` for out, `rubato` for resample. Video + sound drift? Use PTS time, not frame count.

**AA5. Speed for compositor: frame budget + vsync + bench.**
**Baby idea:** vsync = screen says GO (60/120/144 Hz). Double-buffer = draw back, flip front. No tear.
- Budget: 60 Hz = 16.6 ms. Draw > budget = miss. Keep hot loop < 8 ms.
- Tools: `criterion` for micro bench, `cargo flamegraph` + `perf` for hot fn, `wgpu` timestamp queries for GPU time. `cargo bench`, then fix 1 hot fn.
- SIMD = 1 order, many numbers at once. Use `std::simd` (portable) or `wide`. Only after `perf` says slow. Most wins = less copy + less alloc, not SIMD.
```bash
cargo install flamegraph cargo-criterion
cargo bench
cargo flamegraph --bin my-compositor # see: wide bar = slow fn
```

**AA6. Async inside compositor (more than book T).**
- Book T = `block_on` toy. Real = `tokio` OR `calloop` + `io_uring` (Linux fast IO, 2026 stable path). Compositor = 1 event ring, not 100 threads.
- `Pin` = do not move in mem (needed for futures). Executor = mom that wakes sleepy jobs. `tokio::main` = mom for net. `calloop` = mom for Wayland/drm/input/vblank.
- Rule: CPU draw stays sync. Net/DB/file wait = async. Never block event ring. If must block, `spawn_blocking`.
- Learn order: `tokio` mini-redis (above) -> `calloop` Smithay anvil -> `io_uring` (`tokio-uring` crate) last.

> Fetched live Sep 17 2026: wgpu 30 MSRV 1.87 + winit 0.30.13/0.31-beta + Smithay/anvil/calloop/drm-rs + wayland-rs + cosmic-text/parley + ffmpeg-next/gstreamer-rs + criterion/flamegraph + tokio-uring. All links above are real.

> Fetched live: practice-rust elegant page + ripgrep + hecto + ncspot + command-line-rust + pngme + blog_os + codecrafters + mini-redis + interpreters book.

---

## AB. Prod mastery stubs (Qwen audit, Sep 2026 — copy patterns, learn after Phase 4)
> Each stub = what senior does + baby pattern + first command. NOT baby now. Mark ADULT LATER. Versions verified Sep 17 2026.

**AB1. Std you will use daily.** `Path/PathBuf` (not String for files), `OsStr/OsString` (OS text may be non-UTF8), `OpenOptions` (read/write/create), `Read/Write/BufRead/Seek` + `BufReader`, `Command` (run apps), `env::var` (config), `Duration/Instant` (time), `thread::scope` (safe threads, stable), `OnceLock/LazyLock` (safe globals), `Cow<str>` (borrow or own).
```rust
// FULL PROGRAM
use std::path::PathBuf; // PathBuf = owned path
fn main() {
    let mut p = PathBuf::from("/tmp"); p.push("a.txt"); // /tmp/a.txt
    println!("{}", p.display()); // shows: /tmp/a.txt
}
```

**AB2. Collections: which box?** `HashSet` (no dup), `BTreeMap/Set` (sorted), `VecDeque` (push both ends), `BinaryHeap` (top biggest). Rule: default `HashMap/HashSet`, need order = `BTree`, need queue = `VecDeque`. `Eq+Hash` must match (if a==b then hash same). `with_capacity(n)` avoids regrow. `retain/drain/split_off/dedup` = proverbs, learn via `cargo doc`.
```bash
cargo doc --open # read std::collections
```

**AB3. Unicode for world text.** `char` = scalar (not grapheme). `len()` = bytes, not letters. `&s[i]` forbidden. Grapheme = human letter (e.g. `é` = 2 codepoints). Use `unicode-segmentation` crate for graphemes, `Cow<str>` to avoid copy, `from_utf8_lossy` for bad bytes. Case change breaks Turkish `i`. Sort != byte sort. Test with `¡Hola! привет! 😻`.
```toml
[dependencies]
unicode-segmentation = "1" # graphemes
```

**AB4. Error patterns senior uses.** `map_err` (change error), `and_then/or_else` (chain), `unwrap_or_else` (default), `context` (anyhow: add words), source chain (`#[from]` + `#[source]`), `#[must_use]` on Result (warn if ignored), lib = `thiserror`, app = `anyhow`. Async: `?` works same, `JoinHandle` gives `JoinError`. FFI: error code, never panic across C (use `catch_unwind`).
```rust
// INSIDE MAIN idea: add context, then pass up
// read().context("need poem.txt")?; // anyhow Context, shows file + cause
```

**AB5. Threads senior uses.** `thread::scope` (no leak, borrow stack), `std::thread::Builder` (name/stack), `RwLock` (many readers), `Condvar/Barrier` (wait/wake), `AtomicU32` + `Ordering::SeqCst` (counter, no lock), `rayon` (data parallel: `par_iter`), `crossbeam-channel` (bounded). Lock rule: small scope, same order, never hold across `await`. False sharing = keep counters apart.
```toml
[dependencies]
rayon = "1" # par_iter
```

**AB6. Web backend mini (axum Sep 2026: 0.8.9, MSRV 1.80, `forbid(unsafe_code)`).**
```toml
[dependencies]
axum = "0.8" # router
tokio = { version = "1.53", features = ["full"] }
serde = { version = "1", features = ["derive"] }
tracing = "0.1" # log API (Sep 2026: 0.1.44)
tracing-subscriber = "0.3" # logs (Sep 2026: 0.3.23)
```
```rust
// FULL PROGRAM shape (needs deps above, run, open http://localhost:3000/)
use axum::{routing::get, Router}; // Router = road map
async fn hi() -> &'static str { "hi" } // handler gives text
#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init(); // logs on
    tracing::info!("server up"); // shows: server up (set RUST_LOG=debug for more)
    let app = Router::new().route("/", get(hi)); // GET / -> hi
    let l = tokio::net::TcpListener::bind("127.0.0.1:3000").await.unwrap(); // TEACHING ONLY unwrap (localhost only, safe default)
    axum::serve(l, app).await.unwrap(); // serve forever
}
```
- Next: extractors (`Json/Path/State`), middleware (`tower-http`: cors, timeout, limits), health `/health`, graceful stop (`tokio::signal`), TLS (`rustls`), rate limit, metrics.
- HTTP client: `reqwest 0.13` + `serde_json` (Sep 2026, MSRV 1.85, rustls by default). Tiny fetcher, SHAPE ONLY:
```rust
// SHAPE ONLY (needs: reqwest 0.13 with json + tokio 1.53, net access)
// let t = reqwest::get("https://example.com").await?.text().await?;
// println!("{}", &t[..t.len().min(100)]); // first 100 letters
```

**AB7. DB mini (sqlx, async).** `sqlx` = async SQL + compile-time check. Pool = shared connections. Migrate = versioned SQL files. Tx = all-or-nothing.
```bash
cargo add sqlx --features runtime-tokio,postgres,macros
cargo install sqlx-cli # sqlx migrate run
```
- Rule: pool once (`PgPool::connect`), query with `query_as!`, never build SQL with `format!` (injection). N+1 = 1 query in loop, fix with JOIN.

**AB8. Test/prod quality.** `#[tokio::test]` (async test), `proptest`/`quickcheck` (random props), `insta` (snapshot), `mockall`/`wiremock` (fake HTTP), `cargo nextest` (fast runner), `cargo-llvm-cov` (coverage), `cargo-fuzz` (bytes), `cargo-mutants` (kill mutants), `trybuild`/`compile_fail` (error UI).
```bash
cargo add proptest insta --dev
cargo install cargo-nextest cargo-llvm-cov
cargo nextest run
cargo llvm-cov --html
```

**AB9. Perf mini.** `criterion` + `black_box` (no cheat), `samply`/`perf`/`flamegraph` (hot fn), `with_capacity` + reuse bufs + `Cow` (no clone), zero-copy parse, `#[inline]` small hot, data-local (Vec, not LinkedList), SIMD last.
```bash
cargo bench
cargo install samply
samply record ./target/release/myapp
```

**AB10. Security/supply mini.** Validate input, cap len, check paths (`..` escape), no `format!` SQL/shell, guard secrets (zeroize), `cargo audit` (RUSTSEC) + `cargo deny` (licenses), pin `Cargo.lock` for bins, MSRV policy, fuzz parsers, review `unsafe`.
```bash
cargo install cargo-audit cargo-deny
cargo audit
cargo deny check
```

**AB11. API design (libs live long).** Follow api-guidelines. Semver: break = major. `#[non_exhaustive]` (add fields later), builder (`with_x()`), typestate (`Unpaid->Paid`), newtype (`Meters(u32)`), `Display` for users + `Debug` for devs, `Default/From/TryFrom`, `impl Trait` in args (not return in public unless 1 type), docs + examples = tests, deprecate before remove, feature flags (no break).

**AB12. `no_std`/WASM/FFI in 5 lines.** `no_std` = no OS (`#![no_std]`, `core`+`alloc`, own panic + alloc, Embassy for chips). WASM = `wasm32-unknown-unknown` + `wasm-bindgen` + `web-sys` + `trunk`. FFI out = `#[unsafe(no_mangle)] pub extern "C" fn`, in = `unsafe extern`, `CString/CStr`, `bindgen`/`cbindgen`, `catch_unwind`, `repr(C)`.
```bash
rustup target add wasm32-unknown-unknown
cargo install trunk
```

**AB13. Big project shape.** 1 crate = 1 job. `workspace` + path deps. deps point one way (no cycles). layers: `api -> logic -> db`. errors: lib `thiserror`, app `anyhow`. config via env. logs `tracing`. tests: unit + `tests/` + e2e. CI: `fmt --check`, `clippy -D warnings`, `test`, `audit`, MSRV check. Review: small PR, 1 idea, tests + docs.

> Pedagogy (Qwen fix): hint levels for every Q = 1) words only 2) steps 3) skeleton `// TODO` 4) full answer. Checkpoints = Phase gates above + `Can you fix E0382?` quiz. Review = ownership/borrow/lifetime re-quiz after each Phase. Do NOT memorize lifetimes/generics early — compiler is your loop. Spaced = Friday 3-box talk.

---

## X. Cheat Sheets: keywords, operators, tools

**Tools you must use:**
```bash
cargo fmt       # pretty code (rustfmt)
cargo fix       # auto-fix warnings
cargo clippy    # teacher: cargo clippy -- -D warnings
# rust-analyzer in VSCode for autocomplete
```

**Common macros:** `println!`, `eprintln!`, `format!`, `vec!`, `assert_eq!`, `assert_ne!`, `panic!`.

**Common traits:** `Copy`, `Clone`, `Debug`, `Display`, `PartialEq`, `Eq`, `PartialOrd`, `Ord`, `Hash`, `Default`, `From`, `Into`, `Iterator`, `Drop`, `Deref`, `Fn`, `FnMut`, `FnOnce`, `Send`, `Sync`.

**Keywords (can't use as names unless `r#match`):**
`as async await break const continue crate dyn else enum extern false fn for if impl in let loop match mod move mut pub ref return Self self static struct super trait true type union unsafe use where while` + future: `abstract become box do final gen macro override priv try typeof unsized virtual yield`

**Operators quick:**
`!` no/macro, `?` pass bad up, `&` look, `*` open box or times, `..` up to but not with / rest, `..=` up to and with, `::` path, `=>` then do, `|` or in pattern, `||` or, `&&` and, `->` gives back, `.` part of, `:` type is, `;` end, `_` skip, `'` how long/label, `#[]` note, `$` macro word.

**Editions:** `edition="2024"` in Cargo.toml = new rules. Old code still works. `cargo fix --edition` moves it to new.

> OLD vs NEW (gentle intro 2018 vs latest 1.98.1 Sep 3 2026, verified Sep 17 2026):
> You are right, gentle book is old. Do NOT copy these old ways:
> - Old `0...3` three dots -> NEW `0..=3`. Three dots no longer builds.
> - Old `try!(x)` -> NEW `x?`. `try!` is gone, `?` does same short.
> - Old `println!("hi {}", x)` still builds, but NEW `println!("hi {x}")` is short (this book uses NEW).
> - Old edition 2015 -> NEW `edition="2024"` in Cargo.toml. New async `||` (1.85), let-chains (1.88, 2024 only) live here. `gen` is ONLY a reserved word now. `gen {}` blocks are still nightly (#117078). Do NOT try `gen {}` on stable.
> Edition 2024 checklist (all stable unless marked): `resolver="3"` auto, `unsafe extern` REQUIRED, `&raw const/mut` stable (fallback `addr_of!`), `static_mut_refs` deny, `unsafe_op_in_unsafe_fn` warn, async closures + `AsyncFn` (1.85), let-chains 2024-only (1.88), `LazyLock`/`OnceLock` stable, `thread::scope` stable, let-else stable, `core::error::Error` stable, `offset_of!` stable. `gen` blocks = NIGHTLY ONLY.
> All codes in this book ran on `rustc 1.98.1 --edition=2024` = ok. Run `cargo test` on stable. If you use nightly code, mark NIGHTLY.
> CI idea (do this for your own repo): test all examples with `cargo test` on Linux + macOS + Windows, stable channel. Use `mdbook test` if you use mdBook. Pin deps with `Cargo.lock` for bins, `--locked` in CI.

> Fetched from: appendix-01 to appendix-07

---

## Y. 0-to-Master Plan

**PHASE 1 WALK Week 1-2 - baby stands:**
- [ ] `cargo new` + `println!` + `cargo check`. Change 1 word, run, guess first.
- [ ] vars, `mut`, `if`, `loop`, `for`. Only 3 new ideas at once.
- [ ] Ready? Can you change code with no help + guess before run + say 1 error? If yes, go Phase 2.

**PHASE 2 TALK Week 3-6 - baby talks (hardest, slow is ok):**
- [ ] Move `String`, fix with `&` / `.clone()`. Write 10 tiny moves. Rust plan 2026 says 5-6 weeks here, do not rush.
- [ ] `&s[..]`, struct, `impl`, enum, `match` + `Option`
- [ ] Vec/String/HashMap: median, pig latin, employee book (ch8). Ready? Can you fix E0382 + E0502?

**PHASE 3 DECIDE Week 7-12 - kid decides:**
- [ ] `Result` + `?`, generics `<T>`, traits, lifetimes `'a` + M2: assoc type vs generic, GAT idea, `for<'a>`, `dyn` safety, const `<N>`
- [ ] `cargo test` + `tests/` integration, minigrep ch12, closures + iterators `.map().filter().collect()`
- [ ] L2 `thiserror` (lib) + `anyhow` (app), Q2 `serde` + `clap` + features/cfg + own Iterator, Q3 release `lto`/`codegen-units`
- [ ] Ready? Can you plan with small steps + test + fix?

**PHASE 4 ADULT Month 4-8 - adult builds:**
- [ ] Box/Rc/RefCell, threads/channels/Mutex/Arc (poison = Err), async + T2 `poll`/`Pin`/`Waker`/cancel
- [ ] trait `dyn`, patterns, unsafe small + V2 `repr(C)`/bindgen + V3 sound/UB/Miri, macros `#[derive]` + V4 `syn`/`quote`/hygiene
- [ ] M3 layout `size`/`align`/`repr(transparent/packed)` + custom alloc idea
- [ ] Web server ch21, publish crate, `cargo fmt` + `clippy` clean. 7-10 months to job-ready is normal (Rust plan 2026).

**YOUR ROAD Month 8-14 - compositor/GUI/video (for you):**
- [ ] AA1 `winit` + `wgpu` triangle, AA2 Wayland + Smithay anvil
- [ ] AA3 GUI kept vs fast + text, AA4 video frames + `ffmpeg`/`gstreamer`
- [ ] AA5 frame budget 16.6ms + `flamegraph` + `criterion`, AA6 `calloop` + `tokio` + `io_uring` idea
- [ ] AB1-AB13 prod stubs: std/collections/unicode/errors/threads/axum/DB/tests/perf/security/API/no_std/big shape
- [ ] `cargo audit` + `cargo deny` clean, bench + WASM build ok

Master check: can you build minigrep + web server + say ownership in 1 min with no notes? Then you are Rustacean `🦀`. Compositor master = + anvil change + wgpu triangle + frame budget talk with no notes.

Ladder to master (Sep 2026 Build Ladder): 1) Read line by line, say what each does. 2) Change 1 field. 3) Close book, rebuild blank. 4) Keep 1 project 1 month, fix, test. 5) Explain 3 boxes Friday out loud.

---

## COVERAGE: core Rust Book chapters in baby form (not all mastery).

**Rust Book 21 chapters:**
- ✅ 1 setup/hello/cargo kept baby. 2 guessing game kept baby 10-line (rand=adult extra). 3 vars/types/fn/if/loops kept.
- ✅ 4 own/look/slice kept. Hard `as_bytes iter` marked adult later.
- ✅ 5 struct/method kept. 6 enum/match/Option/`if let` kept.
- ✅ 7 packages/modules/`use`/`pub` kept. 8 Vec/String/HashMap kept baby (`get`, `format!`, `entry`).
- ✅ 9 panic/Result/`?` kept + error dictionary E0382/E0502/E0499/E0597/E0515/E0596/E0308. + L2 NEW: `thiserror`/`anyhow`/`miette` pattern.
- ✅ 10 generics/traits/lifetimes kept baby. Elision = compiler fills, you skip first time. + M2 NEW Sep 2026: assoc vs generic, GATs (1.65), `for<'a>` HRTB, `dyn` safety/E0038, const `<N>`, mono bloat vs `dyn`.
- ✅ 11 tests kept `assert_eq`, `should_panic`. + N2 NEW: `tests/` integration + `common/mod.rs` + doc tests. 12 minigrep kept steps + `eprintln`.
- ✅ 13 closures/iterators kept baby. `Fn/FnMut/FnOnce` = read/change/take, details adult. + NEW: own `Iterator` impl example.
- ✅ 14 cargo publish/workspace kept. + Q2 NEW: `serde`/`clap` mini, features/cfg/`build.rs`/cross, `criterion`/`cargo audit`/`deny`, WASM, `syn`/`quote` idea. + Q3 NEW: `[profile.release]` `opt-level`/`lto`/`codegen-units`/`strip` + `cargo-bloat` + tokio vs async-std. Release profile = adult extra note.
- ✅ 15 Box/Deref/Drop/Rc/RefCell kept baby. `Weak` cycle = adult extra note. + M3 NEW: `size_of`/`align_of`/`repr(C)`/`transparent`/`packed`, Rust reorder, custom alloc/`bumpalo`.
- ✅ 16 threads/channel/Mutex/Arc + Send/Sync kept baby. + FIXED: poison = `lock()` gives `Result`, unwrap = stop if poisoned. Deadlock = Rust cannot stop, be small.
- ✅ 17 async/.await/Future kept baby. + FIXED: `trpl` = school toy only, real = `tokio` example added. + T2 NEW: `poll`/`Pin`/`Context`/`Waker`, own `block_on` idea, cancel safety, `select!`, Streams.
- ✅ 18 trait `dyn` vs generics kept. Blog state pattern = adult extra.
- ✅ 19 patterns `|`, `..=`, `@`, guard, `..` kept. + FIXED: let-else MUST diverge (`return`/`break`/`continue`/`panic`). Refutability = compiler tells, no extra.
- ✅ 20 unsafe 5 powers + macros `vec!`/`derive` kept baby. + V2 NEW: `repr(C)`/`CString`/`bindgen`/`c_long` for Wayland/C. + V3 NEW: sound/UB list/offset/aliasing/Miri POPL 2026. + V4 NEW: own derive `syn`/`quote`/hygiene/AST/spans. Advanced traits/types/fns = adult extra, use book when need.
- ✅ 4 slices FIXED: `&s[0..1]` on `¡`/`😻` = runtime panic. Cut only ASCII or `find()` spot.
- ✅ Plain English FIXED Sep 2026: SVO sentences for DeepL/Translate, M title + Q4/Q7 reworded, vocab links E0382/E0502/E0499/E0597/E0515/E0596/E0308 up top.
- ✅ 21 web server single kept. Multi-thread pool + graceful = Phase 4 task, steps listed.
- ✅ X keywords/operators/tools/editions kept. `gen` fixed: reserved only, not usable.
- ✅ AA NEW for YOU: wgpu 30 + winit 0.30 + Wayland/Smithay/calloop + GUI kept/fast + video ffmpeg/gstreamer + 16.6ms budget + flamegraph + tokio/io_uring. Versions verified Sep 17 2026.
- ✅ AB NEW (Qwen audit Sep 2026): std paths/OsStr/scope/LazyLock/Cow, collections table, unicode graphemes, error map_err/context, scope/RwLock/atomics/rayon, axum 0.8.9 mini + tower, sqlx pool/migrate, proptest/insta/nextest/cov/fuzz/mutants, criterion/samply, audit/deny/fuzz/validation, API semver/non_exhaustive/builder/typestate, no_std/WASM/FFI 5-lines, big-project layers/CI. All copy patterns, ADULT LATER.

**Practice-rust live (https://practice-rust.beatai.org/why-exercise.html):**
- ✅ vars `mut`/shadow, ownership move/clone, borrowing `&/&mut`, struct Debug, match/`if let`, vector `extend/get`, result `?`, closure `move`, box `*` all in `Do now` boxes with baby why + real values.
- ⏭️ Skipped repeats to stay short: char-bool-unit, numbers edge, const-generics, trait-object adv, atomic, pin-unpin, stream, newtype DST, self-referential. Why? Same idea as kept baby, or Phase 4 adult. See book links when ready.
- Pattern now: Q first (cover answer, try 5 min, steps in words). Then DOWN answer + Baby why with values. Break 1 line, fix. All easy words, max 15 words per line.

**Order check (teach before use, verified):**
- ✅ Phase1 Q1-3 use only B+C+D+E + 1-line teach-first. No `&`, no `String` move, no `?`.
- ✅ Phase2 Q4-6 are guess-the-output baby Qs (move, Option, get) using only F+I+K. No new algorithms.
- ✅ BOSS corner (palindrome/anagram/two-sum) sits in Phase 3, uses only E+K + 1-line `chars()` teach-first. Optional, skippable.
- ✅ Phase3 Q7-9 use only L+P taught before. Phase4 Q10-12 use R+S+T taught before.
- ✅ Each hard code has `MAGIC FOR NOW` or `SKIP first time` + where to learn later. Reading book in order = you can do each Q.

**Best teaching taken (deep read):**
- Brown book https://rust-book.cs.brown.edu/ : boxes+arrows, quiz to 100%, see build+run. I use donkey boxes + Q to 100%.
- Gentle intro https://stevedonovan.github.io/rust-gentle-intro/1-basics.html : compiler is friend not shout. `assert_eq` checks work. `mut` shows writes. Fn types on purpose. `;` makes `()`. Slice keeps size. `Option` maybe-box. `Vec` owns, slice borrows, drop frees. `sum()` pro way. `String` vs `&str` like `Vec` vs slice. Bytes vs letters. `find` gives good cut. `Result` Ok/Err + `?`. `match` covers all. All here in baby lines.
- Sep 2026 senior truth (verified Sep 17 2026, SKIP IF HARD): tokio/axum/sqlx is standard stack. Linux kernel has Rust drivers. Microsoft MSRC 2019 + CISA: ~70% CVE bugs are memory bugs. Cloudflare Pingora (Rust): 1T asks/day, ~70% less CPU, ~67% less mem vs old NGINX/Lua (cloudflare blog 2022-2024). Discord Read States Go->Rust 2020 killed GC spikes. Each part has `Why? Senior? Which part?`. Skip = `adult extra`.

**Sources for numbers (so you trust, Sep 2026 check):**
- rustc 1.98.1 Sep 3 2026 = real stable. 1.98.0 Aug 20 2026. Check: `rustup update stable`.
- Edition 2024 + `resolver="3"` auto. let-chains 2024-only (1.88). async `||` + `AsyncFn` (1.85 Feb 2025). `gen` = reserved word only, `gen {}` still nightly #117078.
- GATs stable 1.65 (2022). Const generics min stable, ADT const + generic const args = 2026 goals. Next trait solver nightly Aug 2026, stabilizes soon (fixes GAT/TAIT/RTN bugs).
- `dyn` safety = Reference "dyn compatibility" (old name object safety). No `Self: Sized`, no generics, no Self return, no assoc const, no GAT. E0038 if bad.
- Layout = Reference "Type layout". `repr(C)` stable order, `transparent` same as inner, `packed` no pad + unaligned danger. Default Rust order can change.
- UB = Reference "Behavior considered undefined" + sound = safe users cannot break. Miri = UB finder (POPL 2026 paper, 100k libs tested), not sound prover. Stacked/Tree Borrows = aliasing models Miri checks.
- Future = `core::future::Future::poll(Pin<&mut Self>, Context) -> Poll`. Waker/Wake = std::task docs + `block_on` example. Cancel = drop future mid-await, guard locks/files.
- Proc macros = Reference "Procedural macros" (derive/attribute/function-like, `proc-macro=true`, unhygienic). `syn` 2.0 + `quote` 1.0 = standard. Hygiene/Span = Little Book of Rust Macros.
- Profiles = Cargo Book "Profiles" + rustc "Codegen Options". dev 256 units fast build, release 16 units, `lto thin/fat`, `codegen-units 1` slowest build fastest run.
- Microsoft ~70%: MSRC blog 2019 Matt Miller BlueHat + CISA memory-safety page. Same ~70% at Google Chromium.
- Pingora: cloudflare.com blog "How we built Pingora" = 1T/day, ~70% less CPU, ~67% less mem. Now open source (github cloudflare/pingora, MSRV 1.85).
- Discord: discord.com/blog "Why Discord is switching from Go to Rust" 2020. Read States, GC every 2 min, ms -> microseconds, no spikes. No "60% alerts" claim — that was wrong, now fixed.
- Stripe 120k-line C++->Rust story was wrong, now removed. Real Stripe Rust = `async-stripe` bindings crate. Do not quote old line.
- `Noob` -> now `New person mistake`. Old coin/T9 jokes now have help up top.
---

## Z. A-Z Dictionary in 30 seconds

- **A Arc:** thread-safe Rc. `Arc::clone(&x)` to share between threads.
- **B Borrow `&`:** look don't own. `&mut` to change.
- **C Cargo:** builder. `new/run/check/build/test/doc/publish`.
- **D Deref `*`:** open box. Auto change `&Box<String>`->`&str`.
- **E Enum:** one shape at a time. `Option` ends null.
- **F Future async:** sleepy job, needs `.await` + mom to run.
- **G Generics `<T>`:** type placeholder for any type, no extra cost.
- **H HashMap:** key->value, `entry().or_insert()`.
- **I Impl:** skills for struct/enum. `&self` read, `&mut self` change.
- **J Join:** `handle.join()` waits for thread.
- **K Keyword `mut`:** you can change it.
- **L Lifetime `'a`:** how long the look lives.
- **M Match:** check all cases. `if let` for 1 case.
- **N None/Some:** empty or full.
- **O Ownership:** 1 owner, trash at `}`.
- **P Panic:** stop now. `Result` you can fix.
- **Q `?`:** if bad pass up, if good open.
- **R Rc:** count owners, one thread.
- **S Slice `&s[0..2]`:** see part, do not own. `&str` for text.
- **T Trait:** shared skill. `impl Summary for Post`.
- **U Unsafe:** 5 extra powers, keep small and safe outside.
- **V Vec:** list that grows `vec![]`, `push`, `get` safe.
- **W Where:** `where T: Display` clean bound.
- **X `dyn`:** `Box<dyn Draw>` many kinds same box.
- **Y Yank:** hide bad version you sent.
- **Z `()`:** empty hands, no value.

---

## Appendix: Newbie Mistake List

Common mistakes from real learners:

1. Thinking `let b = a` copies `String` (it moves, E0382).
2. Using `.clone()` everywhere (slow; use `&` if you only read).
3. Using `.unwrap()` everywhere (dies; use `?` + `Result` in prod).
4. Confusing `String` and `&str` (take `&str` in args, keep `String` in structs).
5. Forgetting `mut` (E0596).
6. Forgetting `.await` (future never runs).
7. Expecting async code to run without runtime (E0752; need `tokio`).
8. Borrowing from a temporary value (E0597).
9. Returning reference to local variable (E0515; return owned `String`).
10. Fighting lifetimes instead of returning owned data.
11. Using array index instead of `.get()` (panics).
12. Slicing non-ASCII strings by byte index (runtime panic; use `.chars()`/`find()`).
13. Forgetting `collect()` after iterator adapters (lazy, warning).
14. Writing `fn` return with trailing `;` (gives `()`, E0308).
15. Calling private module items (E0603; add `pub`).
16. Using `Rc` across threads instead of `Arc` (not `Send`; use `Arc`).
17. Holding Mutex lock too long (small scope).
18. Holding Mutex lock across `.await` (cancel danger; drop guard first).
19. Not reading compiler `help:` line (do what it says).
20. Trying to master everything at once (Phase 2 first, rest later).

---

## Appendix: Self-Check Pattern

Every exercise should have:

1. Task
2. Hints
3. Cover answer
4. Try first
5. Full program answer
6. `assert_eq!`
7. Baby why
8. Break it
9. Fix it

Example:

```rust
assert_eq!(2 + 2, 4);
```

If the assert passes, your program says nothing. If it fails, it stops and shows left and right. This is automated feedback.

---

## Appendix: Zero-Setup Survival (true zero learners)

Terminal baby: terminal = text window for commands. `cd hello` = go to folder. `ls` = list files. `cargo run` = build + run. Path = folder address. Env var = named setting (example: `IGNORE_CASE=1`).

Read cargo output: `Compiling` = normal work. `Finished` = success. `Running` = your program starts. `warning` = hint, not error (fix later). `error` = must fix now. Extra `Compiling` lines for deps are normal.

Make files by hand: web server needs `hello.html` + `404.html` next to `src/main.rs`. Minigrep needs `poem.txt` in project root. Always run `cargo run` from the project root (where `Cargo.toml` lives).

Port busy? Another program uses 7878. Stop the old program, or change code to `127.0.0.1:7879`.

Offline? Web examples (`trpl::get`, page titles) need internet and fail without it. Learn the async shape from `tokio::time::sleep` examples instead (no net needed).

Ask for help: copy the exact error + the smallest code that breaks + what you expected + what happened. Run `cargo check` first, then `rustc --explain E0308` (put your code).

---

*End. You now know every chapter of the Rust Book in baby form + real extras (tests/, thiserror/anyhow, serde/clap, features/build.rs, own Iterator, repr(C)/bindgen, wgpu/winit/Smithay road). Go back to code. When stuck, run `rustup doc`, `cargo doc --open`, `RUST_BACKTRACE=1 cargo run`. Practice > reading. Last verified Sep 17 2026 on stable 1.98.1.*
