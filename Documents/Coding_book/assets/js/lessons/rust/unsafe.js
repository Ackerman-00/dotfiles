/* ============================================
   lesson: Unsafe
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"unsafe", nav:"Unsafe",
title:"Unsafe — <em>the unlocked door</em>",
lead:"Every rule so far, the bodyguard checked. unsafe is the one door the guard leaves open.",
words:[
"The borrow checker is the guard: it checks all before your program runs. <code class='inline'>unsafe { }</code> is a <b>door the guard leaves open</b>. Inside, the rules are <b>your job</b>. Rust stops checking there.",
"Five extra powers, the full list. 1) open a <b>raw pointer</b>. 2) call an <b>unsafe function</b>. 3) read/write a <code class='inline'>static mut</code>. 4) keep an <b>unsafe trait</b> promise. 5) touch a <b>union</b> field. Only these. Small and dull, not dark magic.",
"Why does it exist? To talk to C code. For rare speed wins. And to <b>build the safe parts you already use</b>. Vec and Box are safe outside, unsafe inside: safe door, unchecked engine.",
"The golden rule: <b>wrap unsafe in a safe function</b>. Callers never see the door. Rust's promise: <i>\"unsafe code must be as safe as safe code\"</i>. Keep the block small, wrap it, test it.",
"Real check: <b>95 of 100 Rust programs use zero unsafe</b>. You will write it rarely. You will READ it in famous tools (runtimes, game engines). Now you know the word.",
"🔮 <b>Guess before you click:</b> in safe Rust, can you open a raw pointer? (No promises, no opening.) Try it — then see inside the unsafe block.",
"🗣️ <b>Say it out loud:</b> <i>unsafe is the open door — keep it small, wrap it safe.</i>"
],
analogy:[["The guard at the door","=","Safe Rust"],["Walking through alone","=","The unsafe block"],["Safe door, unchecked engine","=","Vec: safe outside, unsafe inside"]],
widget:{type:"unsafeplay"},
code:{
copy:`let mut num = 5;
let r1 = &num as *const i32;  // a RAW pointer — no promises
unsafe {
    println!("{}", *r1);      // inside: YOU promise it's alive
}
// outside, the guard is back — rules enforced again`,
lines:[
["let mut num = 5;","a normal number"],
["let r1 = &num as *const i32;","a raw pointer — the guard doesn't track it"],
["unsafe {","the door the guard leaves"],
["    println!(\"{}\", *r1);","inside: you promise the pointer is alive"],
["}","guard back — safe rules enforced again"]
]},
tip:{h:"The whole trick:",b:"Keep the unsafe block SMALL. Wrap it in a safe function. Test it. The guard may leave the room — never the house."},
done:"Understands what unsafe really is"
}
);
