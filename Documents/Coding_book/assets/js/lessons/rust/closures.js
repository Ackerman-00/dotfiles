/* ============================================
   lesson: Closures
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"closures", nav:"Closures & iterators",
title:"Closures — <em>small helpers with no name</em>",
lead:"A closure is a function with no name. It can use the values near it.",
words:[
"A <b>normal function</b> only sees what you hand it: <code class='inline'>feed(water, hay)</code>. It gets the inputs. Nothing else. It forgets all when done.",
"A <b>closure</b> also sees what sits near it. <code class='inline'>|| donut.clone()</code> — the pipes are hands, they grab, done. It <b>uses</b> the values around it. That is called <b>capture</b>.",
"Two shapes: <code class='inline'>|x| x + 5</code> takes x and adds 5. Empty pipes <code class='inline'>|| 5</code> take nothing — always 5.",
"The word <code class='inline'>move</code> changes the deal. <code class='inline'>move || …</code> means 'take these values with you'. It gives them to the new thread for good."
],
analogy:[["A named recipe — hand it all","=","calling a normal function"],["A helper that uses what is near","=","a closure using its space"],["Giving values to a new thread","=","move || gives ownership away"]],
coach:"Inside each closure, Rust builds a small hidden box. It holds what the closure took. Three kinds: <b>Fn</b> reads, <b>FnMut</b> changes, <b>FnOnce</b> eats. First use picks the kind. It never changes.",
widget:{type:"conveyor"},
code:{
copy:`let offset = 10;
let add_offset = |x: i32| x + offset;   // captures offset

let mut inventory = vec!["hay", "carrot"];
let push_feed = || { inventory.push("donut"); }; // FnMut

let heavy = String::from("box");
std::thread::spawn(move || { drop(heavy); })    // move`,
lines:[
["let offset = 10;","the ingredient sitting in the pocket"],
["let add_offset = |x: i32| x + offset;","a closure that borrows offset without being told"],
["let mut inventory = vec![…];","a Vec that might get fed"],
["let push_feed = || { inventory.push(\"donut\"); };","this closure needs to change it → FnMut"],
["let heavy = String::from(\"box\");","a String destined for another thread"],
["std::thread::spawn(move || { drop(heavy); })","move steals heavy for the new thread's cart"],
["",""]
]},
tip:{h:"The three Fn kinds:",b:"<code class='inline'>Fn</code> reads (borrows). <code class='inline'>FnMut</code> changes (borrows to change). <code class='inline'>FnOnce</code> eats (takes). First use picks the kind. It never changes."},
why:{kick:"why iterators need them",
h:"Iterators are belts. Closures are the hands on the belt. Made for each other.",
points:[
"<b>.filter(|x| …), .map(|x| …), .unwrap_or_else(|| …)</b> are all closures. Most iterator tools take them.",
"<b>Less passing around.</b> No long input lists. The closure just uses what is near.",
"<b>move feeds threads.</b> New thread, same values. The checker stays calm."
]},
done:"Writes closures and moves them between threads"
}
);