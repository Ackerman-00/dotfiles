/* ============================================
   lesson: Cheat sheet — keywords, operators, tools
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"cheats", nav:"Cheat sheet — operators & tools",
title:"The cheat sheet — <em>operators, tools, old vs new</em>",
lead:"The whole course on one page. Eight cards, one example, zero new ideas.",
words:[
"This is not new. It is all you typed, pressed into eight cards. Front: one sign or tool. Back: what it means, in plain words.",
"Try the cards first. Cover the answer. Guess out loud. Then read the example — all eight ideas at once.",
"Two tools keep your code clean, forever. <code class='inline'>cargo fmt</code> makes code pretty. <code class='inline'>cargo fix</code> fixes warnings alone. <code class='inline'>cargo clippy</code> is the teacher: run it with <code class='inline'>-D warnings</code>."
],
analogy:[["Packing only the clothes you wear","=","the cheat sheet"],["One page, every sign","=","eight cards, zero new ideas"]],
coach:"Pros keep this page open for years. Learn nothing by heart. Know where to look.",
widget:{type:"gym", q:[
  {q:"`?` — pass bad up. What does it do?", hint:"bad goes up, good opens",
   a:"Ok(v) opens into v. Err(e) goes back to the caller at once.", why:"One sign does five lines of match. New CLIs read clean with it."},
  {q:"`..` or `..=` — which one keeps the end?", hint:"one more sign keeps it",
   a:"`..` stops before the end: 1..4 is 1, 2, 3. `..=` keeps it: 1..=4 adds 4.", why:"Old Rust wrote 0...3. That no longer builds. NEW is 0..=3."},
  {q:"println!(\"hi {x}\") — what is new?", hint:"the short way",
   a:"Short format. No more \"hi {}\", x. Shorter, same answer.", why:"The OLD way still builds. The NEW way is what this course uses."},
  {q:"Old `try!(x)` — what took its place?", hint:"one sign, same job",
   a:"`x?` — try! is gone. ? does the same job.", why:"Old books show try!. Read it as ?. Same meaning."},
  {q:"edition = \"2024\" in Cargo.toml — what is it?", hint:"new rules live here",
   a:"The rule set your code follows. Old code still builds. New async and let-chains live in 2024.", why:"cargo fix --edition moves old code to new rules for you."},
  {q:"`::` or `=>` or `|` — three signs, three jobs?", hint:"path, then, or",
   a:":: is a path: std::fs. => is then-do in match arms. | is or: 1 | 2.", why:"Say them out loud: path, then, or. All three on every page."},
  {q:"`&` or `*` or `_` — look, open, skip?", hint:"look, open, skip",
   a:"& looks, no taking. * opens a box (or times). _ skips a value.", why:"&str borrows text. *b opens Box b. _ means 'no care'."},
  {q:"cargo clippy or cargo fmt — who does what?", hint:"teacher or cleaner",
   a:"clippy is the teacher: style notes and classic mistakes. fmt cleans the shape of code.", why:"Run both before you share code. Teams block bad clippy."}
]},
code:{
copy:`fn main() -> Result<(), Box<dyn std::error::Error>> {
    let nums = vec![1, 2, 3, 4];
    for n in &nums[1..=2] { // ..= keeps the end: 2, 3
        println!("{n}");    // NEW short format
    }
    let doubled: Vec<_> = nums.iter().map(|x| x * 2).collect();
    println!("{doubled:?}");
    Ok(()) // ? would pass errors up; here all is good
}`,
lines:[
["fn main() -> Result<(), Box<dyn std::error::Error>> {","main can use ? — errors exit politely"],
["    let nums = vec![1, 2, 3, 4];","four numbers in a Vec"],
["    for n in &nums[1..=2] { // ..= keeps the end: 2, 3","borrow a slice; ..= keeps index 2"],
["        println!(\"{n}\");    // NEW short format","inline arg — no extra comma value"],
["    let doubled: Vec<_> = nums.iter().map(|x| x * 2).collect();","_ means: compiler, fill the type"],
["    println!(\"{doubled:?}\");","{:?} prints for debugging"],
["    Ok(()) // ? would pass errors up; here all is good","clean end — exit code 0"],
["}",""]
]},
tip:{h:"Keywords — locked words:",b:"<code class='inline'>as async await break const continue crate dyn else enum extern false fn for if impl in let loop match mod move mut pub ref return Self self static struct super trait true type union unsafe use where while</code> — never use these as names. Must you? Write <code class='inline'>r#match</code>. New words like <code class='inline'>gen</code> and <code class='inline'>try</code> wait in line."},
why:{kick:"where the page lives in real work",
h:"Your tools want this style. clippy notes it. rustfmt makes it. Each crate you take expects it.",
points:[
"<b>clippy is the guard.</b> cargo clippy turns style into notes. It finds needless borrows and shadow slips.",
"<b>Ownership is the safety plan.</b> Safe memory with no trash truck is Rust's headline. This page IS that headline.",
"<b>The slice is all over.</b> &str, &[u8], &[T] — a window on data that is not yours. Half of std looks like this."
]},
done:"Keeps the cheat sheet by the keyboard"
}
);