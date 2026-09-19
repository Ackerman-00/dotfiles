/* ============================================
   lesson: Traits
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"traits", nav:"Traits",
title:"Traits — <em>the skill cards</em>",
lead:"Traits answer: what can this thing DO? One shared skill, held by many kinds.",
words:[
"A Dog can bark. A Cat can meow. Different kinds, but both can do things. A <b>trait</b> lists skills: \"anything with this card can do these things\".",
"You have used traits since lesson one! <code class='inline'>println!</code> only prints things with the <b>Display</b> card — the skill to turn into text. Numbers have it. String has it. <code class='inline'>#[derive(Debug)]</code> on a struct says: \"give my struct the skill to print with {:?}\".",
"To promise: <code class='inline'>trait Describe { fn describe(&self) -> String; }</code> — just the promise, no code. To keep the promise: <code class='inline'>impl Describe for Dog { ... }</code> — the real skill, written for one kind.",
"The win: a function that takes <code class='inline'>impl Describe</code> does not care. Dog or Cat — any kind with the card works. No family trees needed.",
"🗣️ <b>Say it out loud:</b> <i>a trait is a skill card — any kind with the card can do these things.</i>"
],
analogy:[["Skill cards in a game (Bark, Meow)","=","Traits"],["Filling in a card for your animal","=","impl Bark for Dog"],["\"Anything with the Display card prints\"","=","println! takes Display kinds"]],
widget:{type:"ability"},
code:{
copy:`trait Describe {                       // the promise
    fn describe(&self) -> String;
}
impl Describe for Dog {                // Dog's version
    fn describe(&self) -> String { "woof".to_string() }
}
impl Describe for Cat {                // Cat's version
    fn describe(&self) -> String { "meow".to_string() }
}
fn announce<T: Describe>(x: T) {       // any Describe works
    println!("{}", x.describe());
}`,
lines:[
["trait Describe {","the promise: anything with this card can describe itself"],
["    fn describe(&self) -> String;","the required ability — just the signature"],
["impl Describe for Dog {","filling in the card for Dog"],
["    fn describe(&self) -> String { \"a good boy\".to_string() }","Dog's actual answer"],
["impl Describe for Cat {","filling in the same card for Cat"],
["fn announce<T: Describe>(x: T) {","T: Describe = \"any type that holds the card\""],
["    println!(\"{}\", x.describe());","works for Dog AND Cat — same function"]
]},
tip:{h:"Trait = what it CAN do:",b:"struct says what a thing IS. impl says how it acts. trait says what any kind must do to join a group. Read <code class='inline'>T: Describe</code> as \"T has the skill\"."},
done:"Uses traits"
}
);
