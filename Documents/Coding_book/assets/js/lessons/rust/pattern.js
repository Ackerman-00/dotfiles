/* ============================================
   lesson: Patterns & pattern matching
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"pattern", nav:"Patterns & matching",
title:"Patterns — <em>the blueprint the data must fit</em>",
lead:"A pattern is a shape test. You hold a value up to it: does it fit? What comes out?",
words:[
"<code class='inline'>match</code> is the biggest test: <code class='inline'>match value { SHAPE => … , _ => … }</code>. Arms run top to bottom. The first shape that fits wins. Three shape kinds: <b>exact</b> (fits just this), <b>name</b> (fits all, keeps it), <b>_</b> (fits all, drops it).",
"<code class='inline'>if let</code> asks one quick question: <code class='inline'>if let Some(x) = maybe { … }</code> — 'a full box? Then hand me x'. A match with one arm. No else needed.",
"<b>let-else</b> is the strict one: <code class='inline'>let Some(x) = maybe else { return; }</code> — 'open it, or leave'. Best at the top of a function, when None means 'nothing to do'.",
"Patterns also <b>open boxes up</b>: <code class='inline'>let (a, b) = pair;</code> splits pairs and structs into parts."
],
analogy:[["A shape sorter","=","a pattern"],["First shape that fits wins","=","match arms, top to bottom"],["Checking one pocket for a coin","=","if let Some(x)"],["Open it or walk out","=","let-else"]],
coach:"Slow down. The power is not the signs. It is this: some shapes always fit (x, _). Some can fail (Some(x)). A plain let needs one that always fits. If it can fail, use if let. Rust stops a bad let before it runs.",
widget:{type:"gym", q:[
  {q:"Which shape always fits AND keeps the value?", hint:"a plain small name",
   a:"x (any small name) — it fits all and keeps it. _ drops it.", why:"Small names always fit. The line _ says: fits, but I do not care."},
  {q:"I only care about the Some case. What starts the short form?", hint:"'if' plus a friend",
   a:"if let — if let Some(v) = maybe { … }", why:"A match with one arm. Best when None just means 'skip'."},
  {q:"let Some(v) = x else { return; } — what is this?", hint:"open or leave",
   a:"let-else: open it, or leave the function early.", why:"The else runs when the shape fails. It must leave (return/break/crash) — so after it, v is safe."},
  {q:"Which shape can fail?", hint:"it may not fit",
   a:"Some(v) — the box may be empty.", why:"Such shapes cannot sit in a plain let. The compiler says 'use if let'."},
  {q:"How to add one more check to a match arm?", hint:"a guard at the door",
   a:"Some(n) if n == 10 => ... — the arm runs only when the check is yes.", why:"Guards filter more. Check fails? Move to the next arm."},
  {q:"_ or _x — both drop it. What is different?", hint:"one moves, one does not",
   a:"_ never moves. _x moves but hides the warning.", why:"Some(_) peeks, no move. Some(_s) moves into _s."}
]},
code:{
copy:`let maybe = Some(5);

match maybe {
    Some(x) => println!("match: got {x}"),
    None    => println!("match: nothing"),
}

if let Some(x) = maybe { println!("if let: got {x}"); }

let level = 5;
match level {
    1 | 2     => println!("tiny"),
    3..=6     => println!("mid"),
    n if n > 100 => println!("huge {n}"),
    _         => println!("other"),
}

let Some(x) = maybe else {
    println!("nowhere to go — leaving");
    return;
};
println!("let-else guarantees x: {x}");`,
lines:[
["let maybe = Some(5);","a maybe-box with a 5 in it"],
["match maybe {","the full grammar — every case must be covered"],
["    Some(x) => println!(…),","shape: a Some box → grab inner as x"],
["    None    => println!(…),","shape: an empty box → say so"],
["if let Some(x) = maybe { … }","one question: is it Some? then use x"],
["let level = 5;","a plain number to grade"],
["    1 | 2     => println!(…),","shape: 1 or 2 (| means or)"],
["    3..=6     => println!(…),","shape: 3 to 6, end included (..= keeps the end)"],
["    n if n > 100 => println!(…),","shape: any number, but only if the guard holds"],
["    _         => println!(…),","shape: everything else"],
["let Some(x) = maybe else {","unwrap or leave…"],
["    return;","…and return must snap the function shut"],
["};","past this line, x is guaranteed real"],
[""]
]},
tip:{h:"One grammar for all:",b:"<code class='inline'>let (x, y) = pair;</code> opens a pair. The same shapes work in match, if let, let-else, while let, and function inputs."},
why:{kick:"why teams love match",
h:"match replaces long if-else chains. Forget a case? The compiler lights it up.",
points:[
"<b>Full cover stops bugs.</b> .unwrap() on None crashes. match makes you handle None. The compiler knows each enum and waits till all are covered.",
"<b>Open boxes read clean.</b> <code class='inline'>let (a, b) = pair;</code> says what is there. Short and clear.",
"<b>Guards add a check:</b> <code class='inline'>match x { n if n > 10 => …, _ => … }</code>. Check fails? Arm skipped."
]},
done:"Masters match, if let and let-else"
}
);