/* ============================================
   lesson: Ownership
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"ownership", nav:"Ownership",
title:"Ownership — <em>the one who owns it</em>",
lead:"This is the famous Rust idea. It sounds hard. It is a simple story about who owns what.",
words:[
"<b>Rule 1:</b> Every value has exactly <b>one owner</b> — one box that holds it. <b>Rule 2:</b> only one owner at a time. <b>Rule 3:</b> when the owner goes away, Rust throws the value away for you.",
"<b>The move:</b> <code class='inline'>let s2 = s1;</code> does NOT copy. It <b>moves</b> the value from box s1 to box s2. Box s1 is now empty. Use s1 after that? Rust says NO. This stops bugs where two boxes change the same text.",
"<b>Small values are different:</b> numbers like <code class='inline'>i32</code> get <b>copied</b>. Both boxes keep a copy. No problem.",
"Try the toy: move the text, then try the old box. See what happens."
],
widget:{type:"ownplay"},
code:{
copy:`let s1 = String::from("hello");
let s2 = s1;           // s1 MOVES to s2
// println!("{}", s1); // ERROR! s1 is empty now
let a = 5;             // numbers are different...
let b = a;             // ...they get COPIED, a stays fine`,
lines:[
["let s1 = String::from(\"hello\");","s1 owns the text"],
["let s2 = s1;","the text MOVES to s2. s1 is now empty."],
["// println!(\"{}\", s1);","ERROR — using an empty box. Bodyguard!",null],
["let a = 5;","a number..."],
["let b = a;","...gets COPIED. a keeps its 5. No error."]
]},
tip:{h:"The question that saves you:",b:"When you see <code class='inline'>let x = y;</code>, ask: \"String or number?\" Strings move. Numbers copy. That is most of ownership, right there."},
done:"Understands ownership"
}
);
