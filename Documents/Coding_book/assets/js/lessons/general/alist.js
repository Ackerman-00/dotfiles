/* ============================================
   lesson: Arrays vs linked lists
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"alist", nav:"Arrays vs linked lists",
title:"Arrays vs linked lists — <em>lockers vs train cars</em>",
lead:"The oldest trade-off in computing: instant picking, or easy inserting?",
words:[
"An <b>array</b> is a row of <b>lockers</b>. You know locker 7 is exactly there — so grabbing it is instant. But to insert a new locker in the middle, you must shove every locker from that point on, one by one.",
"A <b>linked list</b> is a <b>train</b>. Each car carries a value and a note pointing to the next car. Adding a new car is easy: just re-link two notes. But finding car number 7 means walking from the front, counting cars.",
"So: <b>fast access</b> → array. <b>lots of inserting</b> → linked list. That's the whole trade-off — and it's why real code uses arrays (Vec) 95% of the time: access matters more.",
"Rust's <code class='inline'>Vec</code> is an array with a stretchy body — it can grow by moving to bigger lockers when full. Rust's linked list lives in <code class='inline'>std::collections::LinkedList</code>, which you'll almost never need.",
"🗣️ <b>Say it out loud:</b> <i>arrays are lockers — instant pick, slow shove. Linked lists are trains — easy hook-up, slow walk.</i>"
],
analogy:[["Lockers in a row","=","Array — instant pick, slow insert"],["Shoving lockers to fit a new one","=","Inserting into an array"],["Train cars, each pointing to the next","=","Linked list — easy insert, slow search"],["Counting cars from the front","=","Finding index 7 in a list"]],
widget:{type:"alist"},
code:{
copy:`let mut v = vec![1, 2, 3];     // lockers
v.insert(1, 99);                // shove everything right
let x = v[2];                   // instant pick`,
lines:[
["let mut v = vec![1, 2, 3];","three lockers in a row"],
["v.insert(1, 99);","shove: 99 goes between, others move"],
["let x = v[2];","instant — locker 2 is right there"]
]},
tip:{h:"The one-liner to remember:",b:"<b>Arrays pick fast, lists insert fast.</b> When in doubt, use <code class='inline'>Vec</code> — it does both well enough for anything you'll build now."},
done:"Knows arrays vs lists"
}
);
