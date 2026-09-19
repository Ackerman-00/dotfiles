/* ============================================
   lesson: Smart pointers
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"smartp", nav:"Smart pointers",
title:"Smart pointers — <em>what owns the value now?</em>",
lead:"Plain boxes hold values. Smart pointers hold values — and clean up by themselves.",
words:[
"Two memories. The <b>stack</b> is fast and small. The <b>heap</b> is big and slow to set up. A Box puts the value on the heap.",
"<code class='inline'>Box&lt;T&gt;</code> holds one heap box. One owner only — when the Box ends, the value ends. Good when the kind is big, or its size is not fixed.",
"<code class='inline'>Rc&lt;T&gt;</code> lets one value have many owners. Each <code class='inline'>Rc::clone</code> adds 1 to the count. Last one out turns off the light: the value ends at 0. That is reference-counting.",
"<code class='inline'>RefCell&lt;T&gt;</code> moves the borrow check to <i>run time</i>. You may borrow more than once. Break the rules? It crashes while running — not while building.",
"Deref means <code class='inline'>*</code> opens the box. <code class='inline'>hi(&m)</code> with a big box just works. Rust changes <code class='inline'>&Box&lt;String&gt;</code> into <code class='inline'>&str</code> for you.",
"Drop means clean up when the value ends. Last made, first cleaned. <code class='inline'>drop(toy)</code> ends it early.",
"One warning: <code class='inline'>Rc</code> can loop. Owners holding each other never reach 0. <code class='inline'>Weak</code> breaks the loop. That is the extra note for graphs.",
"The classic mix: <code class='inline'>Rc&lt;RefCell&lt;T&gt;&gt;</code> — many owners, and each may change it."
],
analogy:[["One book lent to many readers, with a count list","=","Rc&lt;T> — many owners"],["One locked box, one key","=","Box&lt;T> — one owner"],["Rules checked late, while running","=","RefCell&lt;T>"]],
coach:"One rule beats all: each value has one true owner somewhere. Box is the normal pick. The rest are special tools for rare jobs. Use <code>Rc&lt;RefCell&lt;T>></code> only when one value truly has owners who must all change it.",
widget:{type:"smartptr"},
code:{
copy:`let note = Box::new("hi");   // heap
println!("The note says: {note}");

let shared = Rc::new("hay");
let second = Rc::clone(&shared);  // +1 on the sheet`,
lines:[
["let note = Box::new(\"hi\");","a box on the heap, with \"hi\" inside"],
["println!(\"The note says: {note}\");","open the box — Rust opens it for you"],
["let shared = Rc::new(\"hay\");","reference-counted — single shared string"],
["let second = Rc::clone(&shared);","+1 on the sign-up sheet — same string, two owners"],
["",""],
]},
tip:{h:"Rc::clone is cheap:",b:"<code class='inline'>Rc::clone(&x)</code> adds 1 to the count. It does not copy the data. <code class='inline'>x.clone()</code> may copy all — slow. So write the Rc form: <code class='inline'>Rc::clone(&x)</code>."},
why:{kick:"where you meet them in real code",
h:"Languages with trash trucks never think of owners. Smart pointers give you that — with no extra cost, no truck.",
points:[
"<b>Box is the normal one.</b> A tree node holds children — children live on the heap. Box is how.",
"<b>Rc + RefCell is strong.</b> Use it little. It cannot stop all bugs the way Send/Sync stop data races.",
"<b>Arc&lt;Mutex&lt;T>> is the threads answer.</b> Arc = Rc that threads may share. Mutex = a lock. Together they hold state across threads."
]},
done:"Uses Box and Rc in real code"
}
);