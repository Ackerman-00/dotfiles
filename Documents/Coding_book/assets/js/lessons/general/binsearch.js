/* ============================================
   lesson: Binary search
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"binsearch", nav:"Binary search",
title:"Binary search — <em>the guessing game</em>",
lead:"The number game you played as a kid is a world-famous algorithm. You already know it.",
words:[
"The game: I think of a number 1–100. You guess 50. \"Higher.\" You guess 75. \"Lower.\" You guess 62… Each guess <b>halves</b> the possibilities. You always find the number in at most 7 guesses — even though there are 100 numbers.",
"That's <b>binary search</b>: leap to the middle, compare, and throw away half. It only works when the list is <b>sorted</b> — a phone book, a dictionary, a sorted scoreboard. The middle tells you which half can possibly contain your target.",
"Why does it matter? Look at the growth: 100 items → 7 guesses. 1,000 → 10. A <b>billion</b> → only 30. The time grows like <b>O(log n)</b> — the gentle hill, the best kind of search.",
"Rust doesn't have a magic built-in you must write, but <code class='inline'>binary_search()</code> exists on slices — and now you know exactly what it does: halve, compare, discard. The dictionary trick, formalized.",
"🗣️ <b>Say it out loud:</b> <i>sorted list → leap to the middle, throw half away, repeat. A billion items, thirty leaps.</i>"
],
analogy:[["Guessing the number by halving","=","Binary search"],["The dictionary — open to the middle","=","Compare & discard half"],["A phone book must be sorted","=","Sorted data required"],["100 items, 7 guesses; a billion, 30","=","O(log n) growth"]],
widget:{type:"binsearch"},
code:{
copy:`let numbers = vec![2, 5, 8, 12, 20];
let target = 12;
let found = numbers.binary_search(&target);`,
lines:[
["let numbers = vec![2, 5, 8, 12, 20];","sorted — the only requirement"],
["let target = 12;","what we're hunting"],
["let found = numbers.binary_search(&target);","halve, compare, discard — done in 2 leaps"]
]},
tip:{h:"Never binary-search an unsorted list:",b:"The middle of a shuffled list tells you nothing. Sort first (Rust: <code class='inline'>sort()</code>), then search. And the same idea powers dictionaries, index look-ups, and git's internals."},
done:"Can explain binary search"
}
);
