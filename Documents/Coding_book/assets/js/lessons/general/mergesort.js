/* ============================================
   lesson: Merge sort — divide & conquer
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"mergesort", nav:"Merge sort",
title:"Merge sort — <em>divide & conquer</em>",
lead:"The sorting algorithm that promises: always fast, no bad days. It works with one idea used twice.",
words:[
"Merge sort runs on one move: <b>split the list in half, sort each half, then merge</b> the two sorted halves back into one sorted list. Sounds circular — it is, and that's the point. The base case saves you: <b>a list of one is already sorted</b>.",
"So: keep splitting until every pile has exactly one card. Then merge your way back up. Merging two sorted piles is one clever loop: <b>always take the smaller front card</b>. Watch: <b>[1, 4]</b> and <b>[2, 3]</b> → 1 vs 2, take 1; 4 vs 2, take 2; take 3, then 4 → <b>[1, 2, 3, 4]</b>. One pass, sorted.",
"Because each pile is sorted, the merge never has to look back — the smallest remaining card is always one of the two fronts. That's why merging is so cheap: two front fingers, sliding together like a zipper. The deck picture ends here: real lists don't physically split — <b>the split is just how you think about it</b>. What's real is the merge: two sorted piles, one zipper pass.",
"How fast? Every card is touched once per level, and the list halves each level: <b>O(n log n)</b>, every time, no exceptions. Even a worst-case shuffled deck is as fast as a nearly sorted one. Rust's <code class='inline'>sort()</code> is a merge-sort cousin — stable and calm.",
"🗣️ <b>Say it out loud:</b> <i>split to one card, then merge sorted piles — always take the smaller front. n log n, no matter what.</i>",
"🔮 <b>Predict before you play:</b> the deck starts [8, 3, 7, 1, 9, 2, 5, 4]. Guess the first merged pile — the zipper always takes the smaller front. Then press Play."
],
analogy:[["Split the deck until one card each","=","Divide"],["Two sorted piles become one line","=","Merge — smaller front first"],["Split, solve, combine","=","Divide & conquer"],["Every card touched once per level","=","O(n log n)"]],
widget:{type:"mergesort"},
code:{
copy:`fn merge(a: &[i32], b: &[i32]) -> Vec<i32> {
    let mut out = Vec::new();
    let (mut i, mut j) = (0, 0);
    while i < a.len() && j < b.len() {
        if a[i] <= b[j] { out.push(a[i]); i += 1; }
        else            { out.push(b[j]); j += 1; }
    }
    out.extend(&a[i..]);
    out.extend(&b[j..]);
    out
}`,
lines:[
["fn merge(a: &[i32], b: &[i32]) -> Vec<i32> {","two sorted piles in, one sorted pile out"],
["let (mut i, mut j) = (0, 0);","two front fingers — the smallest of each pile"],
["while i < a.len() && j < b.len() {","keep zipping while both piles have cards"],
["if a[i] <= b[j] { out.push(a[i]); i += 1; }","take the smaller FRONT card, advance"],
["else            { out.push(b[j]); j += 1; }","or the other front — always the smaller"],
["out.extend(&a[i..]);","leftovers are already sorted — glue them on"],
["out.extend(&b[j..]);","same for the other pile"]
]},
tip:{h:"The whole trick:",b:"<b>One card is already sorted.</b> Split until you get there, then merge sorted piles by always taking the smaller front. Sorted in, sorted out — <b>O(n log n)</b>, always."},
done:"Divides & conquers"
}
);
