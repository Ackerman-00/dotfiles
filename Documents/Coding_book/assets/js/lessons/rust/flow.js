/* ============================================
   lesson: How a program runs
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"flow", nav:"How a program runs",
title:"How a program runs — <em>the river</em>",
lead:"The secret mental model for ALL of coding: a program is a river, and your data is the water.",
words:[
"Think of your program as a <b>river</b>. It runs from the top of the file to the bottom. One line after another. It never skips a step.",
"The <b>data</b> — your numbers and text — is the <b>water</b>. The steps are the riverbed: they shape where the water goes. <code class='inline'>let score = 5;</code> makes a small pool with water in it. <code class='inline'>println!(\"{}\", score);</code> opens a gate. The water pours out onto the screen.",
"When you call a function, water runs <i>into</i> a machine. The machine changes it. Then it runs <i>out</i> into the next pool. Keep this picture: <b>code is the riverbed, data is the water.</b>",
"Rust's bodyguard (the compiler) stands on the bank. It checks the whole river <i>before</i> the water may run. If water could spill somewhere bad, it stops everything and tells you why."
],
analogy:[["The river (top to bottom)","=","A program (line by line)"],["Water flowing","=","Your data moving"],["The banks and riverbed","=","Your instructions"],["The lifeguard on the bank","=","Rust's compiler"]],
widget:{type:"flow", flow:["water enters","5 flows into score","println! pours it out","hello world on screen"]},
code:{
copy:`let score = 5;              // water pools here
let name = "Rust";           // another pool, separate
println!("{}", score);       // a gate: pours 5 out`,
lines:[
["let score = 5;","water fills the score pool"],
["let name = \"Rust\";","a second pool, a different stream"],
["println!(\"{}\", score);","the gate opens: 5 pours onto the screen"]
]},
tip:{h:"Remember the river:",b:"Lost in a lesson? Ask: <b>where is the water (my data)?</b> And <b>where does it run next?</b> The answer is almost always: down, to the next line."},
done:"Sees programs as rivers"
}
);
