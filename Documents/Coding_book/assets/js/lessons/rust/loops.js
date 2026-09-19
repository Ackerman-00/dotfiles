/* ============================================
   lesson: Loops
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"loops", nav:"Loops",
title:"Loops — <em>don't repeat yourself</em>",
lead:"Doing something 10 times shouldn't mean writing it 10 times. That's what loops are for.",
words:[
"<code class='inline'>loop</code> = repeat forever (until <code class='inline'>break</code> jumps out). Like a shop that never closes.",
"<code class='inline'>while</code> = repeat <i>while a question is yes</i>. The guard checks each time before you may enter.",
"<code class='inline'>for</code> = repeat over numbers: <code class='inline'>for i in 1..5</code> counts 1, 2, 3, 4 — the <code class='inline'>..</code> stops <i>before</i> 5. With <code class='inline'>..=5</code> it counts to 5.",
"Watch the counter: press play and see it count."
],
widget:{type:"loopplay"},
code:{
copy:`loop {
    // forever, until break
    break;
}
let mut x = 0;
while x < 3 {          // repeats while true
    x += 1;
}
for i in 1..=3 {       // counts 1, 2, 3
    println!("{}", i);
}`,
lines:[
["loop {","repeat forever..."],
["    // forever, until break","comment (ignored by Rust)"],
["    break;","...until this jumps out"],
["}","end of the forever room"],
["let mut x = 0;","a counting box — open lid"],
["while x < 3 {","repeat WHILE x is less than 3"],
["    x += 1;","x = x + 1, written short"],
["}","check the question again..."],
["for i in 1..=3 {","count i = 1, 2, 3 (..= means include 3)"],
["    println!(\"{}\", i);","print the count"],
["}","next i, until the range ends"]
]},
tip:{h:"If it never stops:",b:"If your program runs forever, press <code class='inline'>Ctrl + C</code> in the terminal. That means 'stop!' for any running program."},
done:"Understands the 3 loops"
}
);
