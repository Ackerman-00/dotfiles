/* ============================================
   lesson: Borrowing
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"borrow", nav:"Borrowing",
title:"Borrowing — <em>look, don't take</em>",
lead:"If everything moved, using data twice would be impossible. That's where borrowing comes in.",
words:[
"A <b>reference</b> <code class='inline'>&s</code> means: \"may I look at your book? I will not take it.\" You borrow the data. The owner keeps it. Nothing moves.",
"One rule for borrowing: <b>many readers, OR one writer — never both.</b> Many people may read (<code class='inline'>&</code>) the same book. Or one person may write (<code class='inline'>&mut</code>). A writer plus a reader at the same time = Rust says no.",
"Why so strict? In other languages, two people changing one thing brings crashes. Rust makes that impossible — before the program runs.",
"Try the tests below: mix it wrong and see what happens.",
"🗣️ <b>Say it out loud:</b> <i>many readers is fine. One writer is fine. Never both at once.</i>"
],
widget:{type:"borrowplay"},
code:{
copy:`let mut book = String::from("Rust");
let reader1 = &book;   // look at it (borrow) — ok
let reader2 = &book;   // another reader — ok
// let writer = &mut book; // ERROR while readers exist!
let writer = &mut book;   // no readers now — ok
writer.push_str("!");     // the writer can change it`,
lines:[
["let mut book = String::from(\"Rust\");","the owner of the data"],
["let reader1 = &book;","borrow #1 — looking only"],
["let reader2 = &book;","borrow #2 — many readers are fine"],
["// let writer = &mut book;","ERROR: can't write while readers read!"],
["let writer = &mut book;","readers gone — now one writer is allowed"],
["writer.push_str(\"!\");","the writer changes the text"]
]},
tip:{h:"One picture:",b:"& is reading glasses. &mut is a pen. You may hand out many glasses, or one pen — never both at once. That is the whole borrow checker."},
done:"Understands borrowing"
}
);
