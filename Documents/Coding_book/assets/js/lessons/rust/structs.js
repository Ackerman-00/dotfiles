/* ============================================
   lesson: Structs
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"structs", nav:"Structs",
title:"Structs — <em>the ID card</em>",
lead:"Sometimes one box isn't enough — you need a card with many labelled slots. That's a struct.",
words:[
"A <b>struct</b> is a card you design yourself: you pick the named slots it has. <code class='inline'>struct Player { name: String, level: i32 }</code> — every player has a name and a level.",
"To make one: <code class='inline'>let p = Player { name: ..., level: 1 };</code>. To read a slot, use a dot: <code class='inline'>p.name</code>. To change it, the card must be <code class='inline'>mut</code>: <code class='inline'>p.level += 1;</code>.",
"Why? Programs track things with many facts — players, files, orders. A struct keeps all facts of one thing on one card.",
"Build your own ID card below.",
"🗣️ <b>Say it out loud:</b> <i>a struct holds many named facts in one box.</i>"
],
widget:{type:"structbuild"},
code:{
copy:`struct Player {
    name: String,
    level: i32,
}
let mut p = Player {
    name: String::from("Quiet"),
    level: 1,
};
p.level += 1;   // level up! card must be mut`,
lines:[
["struct Player {","define the card template"],
["    name: String,","slot 1: a name"],
["    level: i32,","slot 2: a level number"],
["}","template done"],
["let mut p = Player {","make a real card — lid open"],
["    name: String::from(\"Quiet\"),","fill slot 1"],
["    level: 1,","fill slot 2"],
["};","card complete"],
["p.level += 1;","dot = reach into the card. Level up!"]
]},
tip:{h:"Struct or enum?",b:"One thing with many facts (a player) → struct. A choice between options → enum, next lesson."},
done:"Builds structs"
}
);
