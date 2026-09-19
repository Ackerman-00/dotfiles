/* ============================================
   lesson: Methods — impl
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"methods", nav:"Methods — impl",
title:"Methods — <em>the ID card gets superpowers</em>",
lead:"struct is the card. impl is where you give the card superpowers.",
words:[
"A struct holds data — it is the ID card. But a card that does nothing is boring. <b>Methods</b> are functions that live <i>on</i> the struct: <code class='inline'>player.hit(10)</code> — the player takes damage.",
"The <code class='inline'>impl</code> block is where methods live: <code class='inline'>impl Player { ... }</code>. Each method inside gets the card's own data as <code class='inline'>self</code>.",
"Two kinds: methods that <b>change</b> the card take <code class='inline'>&mut self</code> (and the card must be <code class='inline'>let mut</code>). Methods that only <b>read</b> take <code class='inline'>&self</code>. Same borrow rules as always.",
"This is how Rust gives things behavior — no classes, just structs + impl. You will see this same shape on every type, forever.",
"🗣️ <b>Say it out loud:</b> <i>a method lives on the struct — self is the card it works on.</i>"
],
analogy:[["The ID card (name, photo, data)","=","struct Player"],["The clubhouse with ability manuals","=","impl Player { ... }"],["Reading the card / updating the card","=","&self (look) / &mut self (change)"]],
widget:{type:"upgrade"},
code:{
copy:`impl Player {
    fn name(&self) -> String {        // looks at the card
        self.name.clone()
    }
    fn hit(&mut self, dmg: i32) {     // changes the card
        self.hp -= dmg;
    }
}
let mut rusty = Player { name: "Rusty".to_string(), hp: 100 };
rusty.hit(10);       // hp is now 90`,
lines:[
["impl Player {","the clubhouse — Player's superpowers live here"],
["    fn name(&self) -> String {","a reading method: &self = look, don't take"],
["        self.name.clone()","hand back a copy of the name"],
["    fn hit(&mut self, dmg: i32) {","a changing method: &mut self = update the card"],
["        self.hp -= dmg;","deal the damage"],
["let mut rusty = Player { name: \"Rusty\".to_string(), hp: 100 };","a fresh card — must be mut for hit()"],
["rusty.hit(10);","call the superpower: hp 100 → 90"]
]},
tip:{h:"self = the card itself:",b:"<code class='inline'>&self</code> means \"read my own card\". <code class='inline'>&mut self</code> means \"change my own card\". Borrow rules work the same inside methods."},
done:"Writes methods"
}
);
