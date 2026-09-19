/* ============================================
   lesson: Arrays, Tuples, Slices
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"shapes", nav:"Arrays, Tuples, Slices",
title:"Arrays, tuples & slices — <em>the shelf, the box set, the window</em>",
lead:"You already have Vec — a shelf that can grow. Now meet three more shapes for storing things.",
words:[
"<b>Array</b> <code class='inline'>[i32; 3]</code>: a shelf with a <b>fixed size</b> — you pick the size first, and it never changes. Like lockers fixed to a wall. Rust must know the size before it runs.",
"<b>Tuple</b> <code class='inline'>(i32, &str, bool)</code>: one box where each slot can hold a <i>different kind</i> of thing. <code class='inline'>(\"hello\", 5, true)</code> is fine. Good for small groups that belong together.",
"<b>Slice</b> <code class='inline'>&[T]</code>: no new box at all — it is a <b>window</b> into someone else's shelf. No owning, no copying. That is why it starts with <code class='inline'>&</code>: a view, not a shelf.",
"Few fixed items → array. Mixed group → tuple. Look at part of a list, no copy → slice."
],
analogy:[["A wall of lockers (decided up front, never changes)","=","Array [i32; 3]"],["A mixed snack box (sweet + salty together)","=","Tuple (i32, &str, bool)"],["Looking through a shop window (you see it, you don't own it)","=","Slice &[T]"]],
widget:{type:"shaperack"},
code:{
copy:`let numbers: [i32; 3] = [5, 9, 1];  // locker wall, 3 slots
let trio = (5, "rust", true);          // snack box, mixed kinds
let window = &numbers[0..2];           // a window over slots 0..2`,
lines:[
["let numbers: [i32; 3] = [5, 9, 1];","locker wall — exactly 3 slots, all numbers"],
["let trio = (5, \"rust\", true);","snack box — a number, text and truth together"],
["let window = &numbers[0..2];","a window showing slots 0 and 1 — no copying!"]
]},
tip:{h:"Spot the &:",b:"When you see <code class='inline'>&</code> in a type — like <code class='inline'>&[T]</code> or <code class='inline'>&str</code> — it means \"a view, not mine\". You look, you do not take. This idea matters a lot in the ownership lessons."},
done:"Knows arrays, tuples, slices"
}
);
