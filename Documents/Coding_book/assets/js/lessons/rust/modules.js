/* ============================================
   lesson: Modules & packages
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"modules", nav:"Modules, crates, packages",
title:"Modules & packages — <em>the house has rooms</em>",
lead:"One file grows into a house: rooms (modules), a front door (main.rs), and borrowed boxes on shelves (crates).",
words:[
"A <b>crate</b> is one book. A <b>package</b> is the box the book ships in — one Cargo.toml card, at most one library, many binaries. A <b>module</b> is a chapter.",
"A <b>binary</b> crate is a book you read yourself. It has <code class='inline'>fn main</code>. <code class='inline'>src/main.rs</code> is page one. A <b>library</b> crate is a book you lend. No main. <code class='inline'>src/lib.rs</code> is page one.",
"Every house is locked at first. Each door needs a <code class='inline'>pub</code> key. <code class='inline'>pub fn</code> means come in. No <code class='inline'>pub</code> means family only.",
"Careful: a <code class='inline'>pub</code> room inside a private <code class='inline'>mod</code> is still locked from the street. You need <code class='inline'>pub</code> on <i>every</i> door.",
"<code class='inline'>use</code> is a short name for a long address. <code class='inline'>use crate::garden::veg::Carrot</code> means you just write <code class='inline'>Carrot</code> after that."
],
analogy:[["One book / a box of books / a chapter","=","crate / package / module"],["A locked house — a key at every door","=","private by default, pub opens"],["A shiny key inside a locked house","=","pub mod inside a private mod — still locked"],["A nickname for a long address","=","use — the shortcut"]],
coach:"Big house? No fear. Rename a door. Move a wall. The house still stands. Rust checks each wall as you build. A bad wall stops the build — before anyone lives in it.",
widget:{type:"modulemap"},
code:{
copy:`// One file version (runs as-is). Real projects split each mod
// into its own file: mod garden; finds src/garden.rs.
mod garden {
    pub mod veg { // veg = vegetables room
        pub struct Carrot;
    }
}
use crate::garden::veg::Carrot; // shortcut, Carrot = orange veg

// everything PRIVATE by default! need pub key at each door.
mod front { // private front room
    pub mod hosting { // public inside private = still not seen!
        pub fn add() { println!("welcome!"); }
    }
}
fn main() {
    let _c = Carrot;
    // front::hosting::add(); // ERROR: front is private, locked door
    println!("ok");
}`,
lines:[
["// One file version (runs as-is). Real projects split each mod","one file now, many files later"],
["mod garden {","a chapter named garden"],
["    pub mod veg { // veg = vegetables room","an open room inside it"],
["        pub struct Carrot;","an open toy inside the room"],
["use crate::garden::veg::Carrot;","the shortcut — just write Carrot now"],
["mod front { // private front room","no pub — this door is locked"],
["    pub mod hosting { // public inside private = still not seen!","a shiny key inside a locked house"],
["    let _c = Carrot;","the shortcut works"],
["    // front::hosting::add(); // ERROR: front is private, locked door","the locked door refuses — this line would not build"],
["}",""]
]},
tip:{h:"The three 'pub' powers:",b:"<code class='inline'>pub</code> = all may use it. <code class='inline'>pub(crate)</code> = only this house. <code class='inline'>pub(super)</code> = only the parent room. Start locked. Open a door only when someone outside knocks."},
why:{kick:"how teams use this in real code",
h:"Big projects are houses of rooms. The three pub levels keep the outside small and clean.",
points:[
"<b>pub(crate) does the daily work.</b> Helpers that are not public stay hidden. Other crates cannot use them.",
"<b>Paths tell the story.</b> crate::garden::veg::Carrot shows where it lives. One look, no messy imports.",
"<b>lib.rs holds shared code.</b> main.rs stays thin and uses it. That split is why the two files exist."
]},
done:"Organizes a program into modules"
}
);