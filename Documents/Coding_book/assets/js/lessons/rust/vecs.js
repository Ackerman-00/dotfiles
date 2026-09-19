/* ============================================
   lesson: Vectors
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"vecs", nav:"Vectors",
title:"Vectors — <em>a shelf of items</em>",
lead:"One box holds one thing. A Vec is a shelf that holds many in a row and can grow.",
words:[
"You start with <code>Vec::new()</code> — empty. Then you <code>push</code> one value in.",
"You read safe with <code>get(0)</code>. It gives <code>Some(&value)</code>. Or <code>None</code> if the spot is empty.",
"You read fast with <code>v[0]</code>. But a missing spot crashes the program.",
"You add many at once with <code>extend([2,3])</code>. And you can ask for <code>len</code> and <code>capacity</code>.",
"<code>len</code> is how many items now. <code>capacity</code> is how much room is ready."
],
widget:{type:"shelf"},
code:{
copy:`fn main() {
    let mut v: Vec<i32> = Vec::new(); // v = [] len 0 cap 0
    v.push(1); // v = [1] len 1
    v.push(2); // v = [1, 2] len 2
    v.extend([3, 4]); // v = [1, 2, 3, 4] len 4 — add many at once
    println!("len {} cap {}", v.len(), v.capacity()); // shows: len 4 cap 4
    println!("{:?}", v.get(0)); // shows: Some(&1) — safe, no stop
    println!("{:?}", v.get(10)); // shows: None — missing, no stop
    println!("{}", v[0]); // shows: 1 — fast, but v[10] would stop
}`,
lines:[
["fn main() {","you open the program door"],
["    let mut v: Vec<i32> = Vec::new();","v = [] empty, len 0 cap 0"],
["    v.push(1);","push 1 → v = [1] len 1"],
["    v.push(2);","push 2 → v = [1, 2] len 2"],
["    v.extend([3, 4]);","extend adds 3,4 → v = [1,2,3,4] len 4"],
["    println!(\"len {} cap {}\", v.len(), v.capacity());","shows: len 4 cap 4 — count vs room"],
["    println!(\"{:?}\", v.get(0));","shows: Some(&1) — safe look"],
["    println!(\"{:?}\", v.get(10));","shows: None — out of range, no crash"],
["    println!(\"{}\", v[0]);","shows: 1 — fast index, but [10] would stop"],
["}","door closes"]
]},
tip:{h:"Which one to use?",b:"Not sure the spot is full? Use <code>get(i)</code> — it gives <code>None</code>. Sure it is full? Use <code>v[i]</code>. <code>len</code> is how many you have. <code>capacity</code> is ready room."},
done:"Uses Vecs"
}
);
