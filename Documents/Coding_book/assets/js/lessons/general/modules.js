/* ============================================
   lesson: Modules & crates
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"modules", nav:"Modules & crates",
title:"Modules & crates — <em>rooms and buildings</em>",
lead:"Big programs aren't one giant hall — they're a house of small rooms, connected by doors.",
words:[
"A <b>module</b> (<code class='inline'>mod</code>) is a <b>room</b> in your program. Each room has its own furniture: functions, types, data. Rooms keep related things together and hide messy details from the rest of the house.",
"Each room has a door policy. By default the door is <b>locked</b> — only the room itself sees inside. <code class='inline'>pub</code> is an <b>open door</b>: \"anyone may use this\". <code class='inline'>use kitchen::knife;</code> is walking through the hall to fetch something from another room.",
"A <b>crate</b> is the whole <b>building</b>: one program (binary) or one library. <code class='inline'>Cargo.toml</code> is the building's bill of materials — you list what you want from <b>crates.io</b>, the world's largest free workshop, and cargo builds it for you.",
"One room, one job. Many rooms, one house. That's how every serious program on Earth is organized.",
"🗣️ <b>Say it out loud:</b> <i>a module is a room, pub is an open door, and a crate is the whole building.</i>"
],
analogy:[["Rooms in a house","=","Modules"],["The locked door","=","Private by default"],["The open door","=","pub"],["The building","=","The crate"],["The hardware store","=","crates.io"]],
widget:{type:"modulemap"},
code:{
copy:`mod kitchen {
    pub fn knife() {}
    fn secret_recipe() {}
}
use kitchen::knife; // walk in, grab it`,
lines:[
["mod kitchen {","build a room called kitchen"],
["    pub fn knife() {}","open door — the world may use knife"],
["    fn secret_recipe() {}","locked door — only the kitchen knows"],
["}","room walls"],
["use kitchen::knife;","walk to the kitchen and grab knife"]
]},
tip:{h:"The naming habit:",b:"Files and functions should read like a sentence: <code class='inline'>payment::validate_card()</code>. If a function's name needs a paragraph to explain, the room is in the wrong place. And never fear <code class='inline'>use</code> — it's just the hallway."},
done:"Understands modules"
}
);
