/* ============================================
   lesson: The crate ecosystem
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"crates", nav:"The crate ecosystem",
title:"The crate store — <em>borrow superpowers from others</em>",
lead:"You can build all from zero. Or use 150,000 ready-made boxes made by others.",
words:[
"You learned modules (rooms in YOUR house) in the general track. A <b>crate</b> is someone else's box of code: a ready library, shared with the world. <b>crates.io</b> is the free shelf with 150,000+ crates. <code class='inline'>cargo add</code> is the one command that takes one.",
"Boxes you will meet soon: <b>serde</b> (struct to JSON and back — the most used crate). <b>anyhow</b> (easy errors: write <code class='inline'>?</code>, skip error kinds). <b>clap</b> (reads words like <code class='inline'>--name Bob</code>). <b>tokio</b> (the async kitchen, from your async lesson).",
"One command does all. <code class='inline'>cargo add serde</code> finds the newest version. It loads it down. It writes it in your list (Cargo.toml). Then one <code class='inline'>use</code> line opens their door. That is the whole trick.",
"Good Rust users check first: is it <b>used by many</b> (loads)? Is it <b>fresh</b> (new version)? The Rust group takes this seriously — that is why planes and cars trust it.",
"And when you are ready: <code class='inline'>cargo publish</code> puts YOUR box on the shelf. Your crate, your name, used by someone far away.",
"🔮 <b>Guess before you type:</b> what does <code class='inline'>cargo add serde</code> do? (Hint: find, load, write the list — all alone.) Then try the buttons.",
"🗣️ <b>Say it out loud:</b> <i>a crate is someone else's box. Cargo add takes it. crates.io is the free shelf.</i>"
],
analogy:[["Taking a box from a neighbor","=","Adding a crate"],["The free shelf of 150,000 boxes","=","crates.io"],["serde, anyhow, clap, tokio","=","The boxes all use"]],
widget:{type:"cargoplay"},
code:{
copy:`# Cargo.toml — the shopping list
[dependencies]
serde = { version = "1", features = ["derive"] }
anyhow = "1"

# main.rs — then use their doors!
fn main() -> anyhow::Result<()> {
    let data = serde_json::to_string_pretty(&["rust", "from", "zero"])?;
    println!("{data}");
    Ok(())
}`,
lines:[
["[dependencies]","the shopping list starts here"],
["serde = { version = \"1\", features = [\"derive\"] }","cargo add wrote this line for you"],
["anyhow = \"1\"","the friendly error bag"],
["fn main() -> anyhow::Result<()> {","any errors just ride along with ?"],
["    let data = serde_json::to_string_pretty(&[\"rust\", \"from\", \"zero\"])?;","their function, your data"],
["    println!(\"{data}\");","pretty JSON out"],
["    Ok(())","all good"]
]},
tip:{h:"The store rule:",b:"Before you build it yourself, search crates.io once. If a much-used crate exists, take it. Your job is the glue — not building twice what exists."},
done:"Can add and use a crate"
}
);
