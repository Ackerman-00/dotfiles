/* ============================================
   lesson: Hello World
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"hello", nav:"Hello World",
title:"Hello, world! — <em>your first words</em>",
lead:"Every programmer on Earth started here. Five minutes, and you have programmed.",
words:[
"Every Rust program has a <b>front door</b>: <code class='inline'>fn main()</code>. The computer enters here. It starts at this exact spot.",
"<code class='inline'>println!</code> is a <b>megaphone</b>. It shows text on the screen. The <b>!</b> means \"this is built in\". Just remember: println! = print a line.",
"A <b>semicolon</b> <code class='inline'>;</code> ends one step, like a dot ends a sentence. The <b>braces</b> <code class='inline'>{ }</code> are the walls of a room. All steps inside belong to that room.",
"Try the playground below — then do it on your real computer."
],
widget:{type:"hello"},
code:{
copy:`fn main() {
    println!("Hello, world!");
    println!("I am learning Rust!");
}`,
lines:[
["fn main() {","the front door — the program starts here"],
["    println!(\"Hello, world!\");","shout these words to the screen"],
["    println!(\"I am learning Rust!\");","shout another line"],
["}","close the front door — program ends"]
]},
tip:{h:"Try it on your computer:",b:"<code class='inline'>cargo new first</code> → <code class='inline'>cd first</code> → open <code class='inline'>src/main.rs</code> in Neovim (<code class='inline'>nvim src/main.rs</code>) → replace the text with the code above → save with <code class='inline'>:wq</code> → <code class='inline'>cargo run</code>. See the words? You're a programmer now."},
done:"Ran Hello, world!"
}
);
