/* ============================================
   lesson: Heaps & priority queues
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"heaps", nav:"Heaps & priority queues",
title:"Heaps & priority queues — <em>the hospital line</em>",
lead:"A line where the most urgent patient is always served first — and it stays fast no matter how long the line gets.",
words:[
"A <b>heap</b> is a line with one rule: <b>the smallest item always sits at the front</b> (that's a <b>min-heap</b>; flip the rule and you get a max-heap). The hospital triage line works exactly this way — the most urgent patient goes first. Computer scientists call it a <b>priority queue</b>.",
"Here's the clever part: a heap is a <b>tree hiding inside a list</b>. The rule is that a parent is always smaller than its children. Because of that rule, the front (index 0) is always the smallest thing in the list — you never have to hunt for it. The hospital picture ends here: a real line doesn't bubble — <b>the tree part does</b>. The line only answers <i>who's first</i>; the bubbles answer <i>how we keep the smallest first</i>.",
"When you <b>push</b>: drop the new item at the end, then <b>bubble up</b> — swap with your parent until you're not smaller than them anymore. When you <b>pop the min</b>: take the front, move the last item up to the front, then <b>bubble down</b> — swap with the smaller child until the rule holds again. Two operations, two bubbles.",
"Both bubbles take <b>O(log n)</b> hops — just the height of the tree. A thousand items, ten hops. A million, twenty. That's the superpower: task schedulers, Dijkstra's shortest path, and every \"top 10\" problem run on heaps. In Rust: <code class='inline'>BinaryHeap</code> (a max-heap) — wrap values in <code class='inline'>Reverse</code> for a min-heap.",
"🗣️ <b>Say it out loud:</b> <i>smallest always on top. Push = bubble up. Pop = bubble down. A tree hiding in a list — log n hops.</i>",
"🔮 <b>Predict before you push:</b> the first patient is 4, and the line starts [3, 8, 5]. Where will 4 land? Guess, then press Push and watch the bubble — right or wrong, the rule does the rest."
],
analogy:[["The hospital line — most urgent first","=","Priority queue"],["The smallest is always at the front","=","The heap rule"],["A new patient bubbles up to their spot","=","push — O(log n)"],["Treat the front, the last one bubbles down","=","pop-min — O(log n)"]],
widget:{type:"heaps"},
code:{
copy:`use std::collections::BinaryHeap;
use std::cmp::Reverse;

let mut pq = BinaryHeap::new();   // max-heap: biggest first
pq.push(3);
pq.push(1);
pq.push(2);
let top = pq.pop();               // Some(3) — biggest leaves first

let mut minq = BinaryHeap::new(); // min-heap: wrap in Reverse
minq.push(Reverse(1));
minq.pop();                       // Reverse(1) — smallest first`,
lines:[
["use std::collections::BinaryHeap;","the heap toolbox — biggest first"],
["use std::cmp::Reverse;","the tiny wrapper that flips the rule"],
["let mut pq = BinaryHeap::new();","an empty hospital line"],
["pq.push(1);","a patient arrives, bubbles to their spot"],
["let top = pq.pop();","Some(3) — the MOST urgent leaves first"],
["minq.push(Reverse(1));","wrap values to get a min-heap"],
["minq.pop();","Reverse(1) — the SMALLEST leaves first"]
]},
tip:{h:"One sentence:",b:"<b>Biggest first → BinaryHeap.</b> Smallest first → <b>wrap it in Reverse.</b> Push and pop both take log n hops — the tree never gets taller than that."},
done:"Heaps up a priority queue"
}
);
