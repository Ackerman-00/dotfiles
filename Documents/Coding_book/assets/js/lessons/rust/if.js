/* ============================================
   lesson: if / else
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"if", nav:"if / else",
title:"if / else — <em>the yes/no door</em>",
lead:"Programs make decisions. The simplest decision-maker: if / else. One question, two doors.",
words:[
"<code class='inline'>if</code> asks a yes/no question. Yes → run the first room. No → run the else room (if there is one).",
"Signs that ask questions: <code class='inline'>==</code> same, <code class='inline'>!=</code> not same, <code class='inline'>></code> <code class='inline'><</code> <code class='inline'>>=</code> <code class='inline'><=</code>.",
"More doors? Chain them: <code class='inline'>else if</code> — \"too big… too small… just right\".",
"Play with the gate: move the number and see which door lights up."
],
widget:{type:"gate"},
code:{
copy:`let n = 15;
if n > 10 {
    println!("big!");
} else if n > 5 {
    println!("medium");
} else {
    println!("small");
}`,
lines:[
["let n = 15;","the value we're asking about"],
["if n > 10 {","Q: is n bigger than 10?"],
["    println!(\"big!\");","true → this room runs"],
["} else if n > 5 {","not true → next question: bigger than 5?"],
["    println!(\"medium\");","true → this room runs"],
["} else {","none of the above?"],
["    println!(\"small\");","then this room runs"],
["}","end of the decision"]
]},
tip:{h:"The walls matter:",b:"Each room has its own <code class='inline'>{ }</code> walls. Only the walls of the YES room run. The rest are skipped. That is the whole trick."},
done:"Understands if / else"
}
);
