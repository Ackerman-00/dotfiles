/* ============================================
   lesson: Hash tables
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"hashd", nav:"Hash tables",
title:"Hash tables — <em>the instant look-up machine</em>",
lead:"Why is finding \"sugar\" in a giant pantry instant? Because the label goes through a magic machine.",
words:[
"Imagine a pantry with 100 lockers. Finding sugar by checking every locker = O(n). Now imagine a <b>machine</b>: you feed it the word \"sugar\", it instantly prints \"locker 7\". One trip, always. That machine is a <b>hash function</b>, and the pantry is a <b>hash table</b>.",
"Rust's <code class='inline'>HashMap</code> is exactly this: a machine + a pantry. Put: <code class='inline'>map.insert(\"sugar\", 2)</code> — the machine says locker 7, place it. Get: <code class='inline'>map.get(\"sugar\")</code> — the machine says locker 7, fetch it. Both are <b>O(1)</b>, no matter how big the pantry.",
"The catch: sometimes two different labels map to the same locker — a <b>collision</b>. The pantry handles it by chaining a tiny line in that locker. A good hash function spreads labels evenly, so collisions stay rare.",
"When should you use it? Any time you ask \"do I have this?\" or \"what's stored under this name?\" — labels, caches, counting words, checking membership. The machine + pantry is the most used structure in real programs.",
"🗣️ <b>Say it out loud:</b> <i>a hash map is a machine plus a pantry — type the label, get the locker, every single time.</i>"
],
analogy:[["The label → locker machine","=","A hash function"],["The pantry of lockers","=","The hash table"],["Two labels, one locker","=","A collision — chained"],["\"Do I have sugar?\" — instant","=","O(1) look-up"]],
widget:{type:"labelmaker"},
code:{
copy:`use std::collections::HashMap;

let mut pantry = HashMap::new();
pantry.insert("sugar", 2);
let has = pantry.get("sugar"); // Some(&2), instantly`,
lines:[
["use std::collections::HashMap;","borrow the machine + pantry"],
["let mut pantry = HashMap::new();","empty pantry"],
["pantry.insert(\"sugar\", 2);","machine says locker 7 — place it"],
["let has = pantry.get(\"sugar\");","machine says locker 7 — fetch, instantly"]
]},
tip:{h:"HashMap vs Vec — the decision:",b:"If you know the locker number (index) → <code class='inline'>Vec</code>. If you know the <i>label</i> → <code class='inline'>HashMap</code>. That one question chooses the structure 90% of the time."},
done:"Understands hash maps"
}
);
