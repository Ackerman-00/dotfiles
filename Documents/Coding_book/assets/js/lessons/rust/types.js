/* ============================================
   lesson: Types
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"types", nav:"Types",
title:"Types — <em>what kind of thing</em>",
lead:"Everything in Rust has a type — what kind of thing it is. A whole number, a decimal, a yes/no, a letter.",
words:[
"<b>i32</b> — whole numbers (42, -7, 0). <b>f64</b> — numbers with a dot (3.14). <b>bool</b> — yes or no: <code class='inline'>true</code> or <code class='inline'>false</code>. <b>char</b> — one letter in single quotes: <code class='inline'>'a'</code>.",
"Most of the time you do not write the type. Rust sees it for you. You can also say it out loud: <code class='inline'>let x: i32 = 5;</code> — the <code class='inline'>:</code> means \"x is this kind\".",
"Think of four labeled boxes. A decimal does not fit in the whole-number box. Rust will not squeeze it in. It tells you to choose.",
"Play the sorting game: put each value in its box."
],
widget:{type:"typesort"},
code:{
copy:`let age: i32 = 25;       // whole number
let price: f64 = 9.99;   // decimal
let is_ready: bool = true; // truth
let letter: char = 'R';  // one character`,
lines:[
["let age: i32 = 25;","a whole number (integer)"],
["let price: f64 = 9.99;","a decimal (float)"],
["let is_ready: bool = true;","a truth value (boolean)"],
["let letter: char = 'R';","a single character, with single quotes"]
]},
tip:{h:"Rust sees it for you:",b:"If you write <code class='inline'>let age = 25;</code>, Rust knows it is an i32 all by itself. Write the type only when you want to be clear — or when Rust is not sure."},
done:"Knows the 4 basic types"
}
);
