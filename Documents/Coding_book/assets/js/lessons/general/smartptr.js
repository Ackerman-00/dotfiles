/* ============================================
   lesson: Smart pointers
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"smartptr", nav:"Smart pointers",
title:"Smart pointers — <em>notes with superpowers</em>",
lead:"A pointer is a note saying \"the real thing lives over there\". Smart pointers are notes with rules and superpowers.",
words:[
"Sometimes a value is big (a giant photo), and you don't want to move it around — you pass a <b>note</b> saying where it lives. That note is a <b>pointer</b>. Rust's <code class='inline'>&amp;</code> borrow is a <i>supervised</i> pointer: the lifeguard watches where notes go.",
"<b>Box&lt;T&gt;</b> is the moving-company crate: it picks up the big value and stores it in the <b>heap</b> (the big warehouse), leaving just a tiny note in your code. One owner, one note.",
"<b>Rc&lt;T&gt;</b> is the book-club shelf: <i>many</i> people hold a note to the same book, and the shelf is only cleaned when the last person leaves. Shared ownership.",
"<b>RefCell&lt;T&gt;</b> is the nervous librarian: the borrow rules are still enforced, but checked at the door (while running) instead of by the guard before you enter (at compile time). Use it only when you must.",
"🗣️ <b>Say it out loud:</b> <i>Box is a moving crate, Rc is a book club, and the borrow-checker is the lifeguard.</i>"
],
analogy:[["A note: \"it's in the warehouse\"","=","A pointer"],["The moving company","=","Box<T> — heap, one owner"],["A book club — same book, many notes","=","Rc<T> — shared ownership"],["A librarian who checks at the door","=","RefCell<T> — runtime rules"]],
widget:{type:"smartptr"},
code:{
copy:`let big = Box::new(vec![1, 2, 3]);
// the numbers live in the heap;
// big is just a tiny note`,
lines:[
["let big = Box::new(vec![1, 2, 3]);","the numbers move to the warehouse (heap)"],
["// the numbers live in the heap;","big is just the note"],
["// big is just a tiny note","one owner — dropped when the note is torn up"]
]},
tip:{h:"You rarely need these early on:",b:"99% of the time Rust's normal boxes and borrows are enough. Smart pointers are for special situations: big data (Box), shared ownership (Rc), or interior mutation (RefCell). Know they exist — reach for them when the compiler tells you to."},
done:"Knows Box, Rc, RefCell"
}
);
