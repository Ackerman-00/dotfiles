/* ============================================
   lesson: Variables
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"vars", nav:"Variables",
title:"Variables — <em>boxes on a shelf</em>",
lead:"Variables are how programs remember things. Think of them as labelled boxes on a shelf.",
words:[
"<code class='inline'>let</code> puts a new box on the shelf: <code class='inline'>let score = 5;</code> — a box named <b>score</b> with the number 5 inside.",
"The box is <b>sealed</b> at first — Rust will not let you change what is inside. That sounds strict, but it stops easy mistakes.",
"To change it later, say so: <code class='inline'>let mut score = 5;</code> — <b>mut</b> means \"you can change it\". The lid is open.",
"Play with the two boxes below. Try to write into the sealed one — and see how Rust says no."
],
widget:{type:"boxes"},
code:{
copy:`let score = 5;          // sealed box — cannot change
let mut name = "Bob";   // open box — can change
name = "Alice";         // fine! lid is open
// score = 10;          // ERROR: box is sealed`,
lines:[
["let score = 5;","a sealed box holding 5"],
["let mut name = \"Bob\";","an open box — we say 'mut' to open the lid"],
["name = \"Alice\";","putting a new value in the open box — allowed"],
["// score = 10;","this would ERROR — the box is sealed!","<b>This is the bodyguard working.</b> You <i>couldn't</i> change a sealed box even by accident, because Rust checks before running. Annoying now, life-saving later."]
]},
tip:{h:"Naming rules:",b:"Box names start with a small letter. No spaces — use _ instead: <code class='inline'>my_score</code>. The name should say what is inside. Rust will stop you if the name is wrong."},
done:"Understands variables"
}
);
