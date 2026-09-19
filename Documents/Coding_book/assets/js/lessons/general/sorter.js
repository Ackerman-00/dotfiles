/* ============================================
   lesson: Sorting
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"sorter", nav:"Sorting",
title:"Sorting — <em>cards in your hand</em>",
lead:"You sort cards without thinking. The computer needs explicit steps — and there are many recipes.",
words:[
"Humans sort cards instantly by feel. A computer is literal: it only knows the exact steps you give it. A <b>sorting algorithm</b> is such a recipe, and there are dozens of famous ones.",
"<b>Bubble sort</b>: walk along the line, and whenever two neighbors are in the wrong order, swap them. Repeat until nobody swaps — done. Slow (O(n²)) but dead simple.",
"<b>Selection sort</b>: find the smallest card, put it in position 1; find the next smallest, position 2… also O(n²), but fewer swaps than bubble.",
"<b>Merge sort</b>: split the deck in half, sort each half (by splitting again…), then merge the two sorted halves together. The \"split, sort, merge\" idea gets O(n log n) — fast enough for a billion cards.",
"In Rust you just write <code class='inline'>list.sort()</code> — but the widget below lets you watch what the computer actually does, swap by swap. That's what separates \"it works\" from \"I know why\".",
"🗣️ <b>Say it out loud:</b> <i>bubble swaps neighbors, selection picks the smallest, merge splits-sorts-merges.</i>"
],
analogy:[["Swapping neighbor cards","=","Bubble sort"],["Picking the smallest each round","=","Selection sort"],["Split the deck, sort halves, merge","=","Merge sort"],["\"Sorted in one line\"","=","list.sort()"]],
widget:{type:"sorter"},
code:{
copy:`let mut scores = vec![9, 2, 7, 1];
scores.sort();          // 1, 2, 7, 9
scores.sort_by(|a, b| b.cmp(a)); // 9, 7, 2, 1`,
lines:[
["let mut scores = vec![9, 2, 7, 1];","a messy line of numbers"],
["scores.sort();","Rust's kitchen does the dance for you"],
["scores.sort_by(|a, b| b.cmp(a));","flip the comparison — descending order"]
]},
tip:{h:"The recipe you should remember:",b:"<b>Merge sort's split-sort-merge</b> is the pattern behind every fast sort on Earth (Rust uses it too). If you ever must hand-write a sort for practice, write merge sort — not bubble."},
done:"Understands sorting"
}
);
