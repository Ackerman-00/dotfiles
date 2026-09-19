/* ============================================
   lesson: Dynamic programming
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"dp", nav:"Dynamic programming",
title:"Dynamic programming — <em>the notebook</em>",
lead:"Same problem, smaller pieces — but write every answer down. Solving the same small problem twice is one time too many.",
words:[
"Dynamic programming is <b>recursion with a notebook</b>. You solve the big problem by solving small problems — and every answer you compute, you <b>write down</b>. Nobody ever solves the same small problem twice.",
"Meet Fibonacci: <code class='inline'>fib(n) = fib(n-1) + fib(n-2)</code>. Naively, fib(6) computes fib(2) <b>five times</b> — the same tiny answer, recomputed each time. With a notebook (computer scientists call it <b>memoization</b>): the first time you compute fib(2), write it down. Every later call just <b>reads the notebook</b>.",
"Watch the difference: naive fib(6) makes <b>25 calls</b>. With a notebook: <b>11</b>. The gap explodes — naive fib(40) makes over a <b>billion</b> calls; memoized fib(40) makes <b>79</b>. The notebook turns a runaway into a calm walk. The picture ends here: notebooks cost paper, and memoization costs memory — <b>you trade a little space for a lot of time</b>. For a few dozen answers, it's always worth it.",
"The staircase version is the same idea from the other direction: ways to climb n stairs taking 1 or 2 steps is <code class='inline'>ways[n] = ways[n-1] + ways[n-2]</code>. Instead of starting big and remembering, you <b>fill the table from the bottom up</b> — and every row is free because the row below is already written.",
"🗣️ <b>Say it out loud:</b> <i>break it into small pieces, write every answer down, never recompute. A notebook turns exponential into linear.</i>",
"🔮 <b>Predict before you run:</b> naive fib(6) makes 25 calls. How many of those are recomputed fib(2)s? Guess, press Naive — then press Memo and watch the same tree shrink."
],
analogy:[["Recursion","=","Same problem, smaller pieces"],["The notebook","=","Memoization — store every answer"],["fib(2) computed five times","=","The naive waste"],["25 calls → 11 calls","=","The notebook wins"]],
widget:{type:"dp"},
code:{
copy:`fn fib_memo(n: usize, memo: &mut Vec<u64>) -> u64 {
    if memo[n] != 0 { return memo[n]; }   // already in the notebook?
    if n < 2 { return n as u64; }         // base case: fib(0), fib(1)
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo);
    memo[n]                              // write it down, hand it back
}`,
lines:[
["fn fib_memo(n: usize, memo: &mut Vec<u64>) -> u64 {","fibonacci with a notebook"],
["if memo[n] != 0 { return memo[n]; }","already computed? just read it"],
["if n < 2 { return n as u64; }","the base case: fib(0) = 0, fib(1) = 1"],
["memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo);","compute once…"],
["memo[n]","…write it down for next time"]
]},
tip:{h:"The whole trick:",b:"<b>Compute once, store, reuse.</b> Recursion explores; the notebook makes sure each sub-problem is solved exactly once. Same idea fills tables bottom-up: <code class='inline'>dp[i] = dp[i-1] + dp[i-2]</code>."},
done:"Never recomputes twice"
}
);
