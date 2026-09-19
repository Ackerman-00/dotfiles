/* ============================================
   lesson: Recursion
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"recursion", nav:"Recursion",
title:"Recursion — <em>a function that calls itself</em>",
lead:"The Russian-doll trick: a function whose recipe includes itself. Trippy — then obvious.",
words:[
"<b>Recursion</b> is a function that calls <b>itself</b>. Like Russian dolls: a big doll contains a smaller copy of itself, which contains a smaller copy… A recipe that repeats with a smaller version of the same job.",
"Every recursion needs a <b>stopping rule</b> (the <b>base case</b>): the smallest doll that doesn't open. Without it, the function calls itself forever — a <b>stack overflow</b>, the computer running out of memory for the endless to-do list.",
"Read recursion with <b>trust</b>: \"if <code class='inline'>countdown(4)</code> works, then <code class='inline'>countdown(5)</code> works\". It's the same trick as proofs: make the smallest case work, then the next one follows automatically.",
"Where does it appear? Folders inside folders. Family trees. Menus in menus. Anything that contains a smaller copy of itself is naturally recursive.",
"🗣️ <b>Say it out loud:</b> <i>a function that calls itself needs a stopping rule — the smallest doll that doesn't open.</i>"
],
analogy:[["Russian dolls inside dolls","=","A function calling itself"],["The smallest doll that doesn't open","=","The base case"],["Dolls that never stop opening","=","Stack overflow"],["Folders inside folders","=","Recursive structure in real life"]],
widget:{type:"recursion"},
code:{
copy:`fn countdown(n: u32) {
    if n == 0 { return; }   // base case: stop
    println!("{n}");
    countdown(n - 1);       // the smaller copy
}`,
lines:[
["fn countdown(n: u32) {","the recipe"],
["    if n == 0 { return; }","the smallest doll — stop here"],
["    println!(\"{n}\");","say the number"],
["    countdown(n - 1);","start the same recipe, one smaller"]
]},
tip:{h:"The trust rule:",b:"Don't trace every nested call — you'll drown. Check the base case works, then trust the smaller version. <b>Base case + smaller version = recursion.</b>"},
done:"Understands recursion"
}
);
