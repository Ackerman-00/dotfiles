/* ============================================
   lesson: Trait objects (dyn)
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"dyn", nav:"Trait objects (dyn)",
title:"dyn Trait — <em>the shape-shifting box</em>",
lead:"Generics print a fresh copy per kind. dyn is ONE box that holds ANY kind.",
words:[
"You met skill cards (traits) and the mold (generics). With generics, Rust <b>prints a fresh copy</b> for each kind you use. Like a printer: new page per animal. Fast. But the kind must be fixed before the program runs.",
"<b>dyn</b> is one box for <b>any</b> kind. <code class='inline'>Box&lt;dyn Speak&gt;</code> can hold a Dog, a Cat, or a Robot. Same box, always one small note (8 bytes). The real animal lives on the heap. The box just says where.",
"The price: the computer must <b>peek in the box</b> before each <code class='inline'>speak()</code> call, to find the real animal. That is <i>dynamic dispatch</i> — a tiny extra check when it runs. Generics check before running. dyn checks while running.",
"When? When <b>one list must hold mixed kinds</b> — a game with ghosts AND goblins, a plugin box, screen shapes. One fixed kind per spot? Stay with generics. That is the normal pick.",
"🔮 <b>Guess before you click:</b> how big is a <code class='inline'>Box&lt;dyn Speak&gt;</code>? One note, always 8 bytes — no matter what is inside. Click an animal. See the same box change shape.",
"🗣️ <b>Say it out loud:</b> <i>generics print a fresh copy per kind. dyn is one box for many kinds.</i>"
],
analogy:[["A printer, fresh page per animal","=","Generics — one copy per kind"],["One box holding any animal","=","Box<dyn Speak> — one box, many kinds"],["Peeking in the box first","=","Dynamic dispatch"]],
widget:{type:"dynplay"},
code:{
copy:`trait Speak { fn speak(&self) -> String; }
struct Dog; struct Cat; struct Robot;
impl Speak for Dog { fn speak(&self) -> String { "woof!".into() } }
impl Speak for Cat { fn speak(&self) -> String { "meow!".into() } }
impl Speak for Robot { fn speak(&self) -> String { "beep boop".into() } }

let boxed: Box<dyn Speak> = Box::new(Dog);  // one box…
let boxed: Box<dyn Speak> = Box::new(Cat);  // …any shape
println!("{}", boxed.speak());`,
lines:[
["trait Speak { fn speak(&self) -> String; }","the ability card"],
["struct Dog; struct Cat; struct Robot;","three different types"],
["impl Speak for Dog { … }","three cards filled in"],
["let boxed: Box<dyn Speak> = Box::new(Dog);","one box holds the Dog…"],
["let boxed: Box<dyn Speak> = Box::new(Cat);","…then the same box holds the Cat"],
["println!(\"{}\", boxed.speak());","the box speaks — whatever is inside"]
]},
tip:{h:"The one-line pick:",b:"One fixed kind per spot → generic (fast, normal). One box with a MIX of kinds → dyn (flexible). Most Rust code is generic. dyn shows up when lists must hold many shapes."},
done:"Knows when to reach for dyn"
}
);
