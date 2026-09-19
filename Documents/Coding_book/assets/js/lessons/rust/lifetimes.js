/* ============================================
   lesson: Lifetimes
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"lifetimes", nav:"Lifetimes",
title:"Lifetimes — <em>how long the water stays</em>",
lead:"Borrowing says: you may look, not take. Lifetimes answer next: how long may you look?",
words:[
"Every value has a <b>lifetime</b> — the part of the code where it stays alive. Picture each pool with a timer: it starts when you make the pool. It ends when the pool drains.",
"A look can only live <i>while the pool still has water</i>. Keep looking after it drained? Rust stops the program before it runs: <b>borrowed value does not live long enough</b>.",
"You almost never write lifetimes yourself — <code class='inline'>'a</code> is just a name. But you will read them: <code class='inline'>fn longest<'a>(x: &'a str, y: &'a str) -> &'a str</code> says \"the answer lives as long as the questions\". The <code class='inline'>'a</code> links all three. The answer cannot outlive what it came from.",
"Try the lifeguard toy below: a look inside the zone is fine. A look outside the zone — where the water is gone — is the error real Rust shows you.",
"🗣️ <b>Say it out loud:</b> <i>a look lives only while the water is there.</i>"
],
analogy:[["A pool of water (alive only while the tap runs)","=","A value's lifetime"],["Carrying a cup out after the pool drained","=","A reference that outlives its value"],["The lifeguard enforcing the rule","=","The borrow checker"]],
widget:{type:"lifeguard"},
code:{
copy:`fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
// 'a = "as long as the inputs"`,
lines:[
["fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {","declare: one lifetime 'a shared by x, y and the answer"],
["    if x.len() > y.len() { x } else { y }","pick the longer one"],
["}","the answer can't outlive x or y — 'a says so"],
["// 'a = \"as long as the inputs\"","the one-sentence summary"]
]},
tip:{h:"The one-line rule:",b:"A look may only live while the value is still alive. That is all of lifetimes — the rest is Rust helping you keep that promise."},
done:"Understands lifetimes"
}
);
