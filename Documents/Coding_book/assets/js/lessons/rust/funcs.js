/* ============================================
   lesson: Functions
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"funcs", nav:"Functions",
title:"Functions — <em>mini-recipes</em>",
lead:"A function is a small named machine inside the big machine. Write it once, use it many times.",
words:[
"<code class='inline'>fn double(x: i32) -> i32 { x * 2 }</code> reads: \"a machine named double. It takes one number (x). It gives back a number.\" The <code class='inline'>-></code> arrow points at what comes back.",
"To use it: <code class='inline'>double(5)</code> → the machine runs, and you get 10. The input has a name too: <b>argument</b>.",
"Why? Fix a bug once, and it is fixed everywhere. Your main machine stays short and easy to read.",
"Watch the machine: feed it a number and see it change."
],
widget:{type:"funcplay"},
code:{
copy:`fn double(x: i32) -> i32 {
    x * 2
}
fn main() {
    let result = double(5);   // = 10
    println!("{}", result);
}`,
lines:[
["fn double(x: i32) -> i32 {","mini-recipe: name double, takes x, returns a number"],
["    x * 2","the magic: last line without ; is the answer"],
["}","end of the mini-recipe"],
["fn main() {","the front door"],
["    let result = double(5);","call the machine with 5 → 10 in a box"],
["    println!(\"{}\", result);","print 10"],
["}","end"]
]},
tip:{h:"The no-semicolon trick:",b:"In Rust, the <b>last line of a function with no semicolon</b> is the answer the function gives back. <code class='inline'>x * 2</code> (no ;) = \"give back x times 2\". New, but that is the Rust way."},
done:"Writes functions"
}
);
