/* ============================================
   lesson: Generics
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"generics", nav:"Generics",
title:"Generics — <em>one mold, many doughs</em>",
lead:"Write the code once. Use it with any kind.",
words:[
"A <b>generic</b> is a mold: one shape, filled with what you like. <code class='inline'>Vec&lt;i32&gt;</code> and <code class='inline'>Vec&lt;String&gt;</code> are the same mold with a different fill. The Vec code was written once.",
"The angle brackets hold the kind: <code class='inline'>struct Rectangle&lt;T&gt; { width: T, height: T }</code> means \"width and height are some kind T\". Later you pick: <code class='inline'>Rectangle&lt;i32&gt;</code>, <code class='inline'>Rectangle&lt;f64&gt;</code> — all from one mold.",
"Why? You write the logic once. Sort, store, compare — the steps are the same, no matter the items. And Rust checks each fill <i>before</i> your program runs.",
"Two spots: <code class='inline'>struct</code>/<code class='inline'>fn</code> with <code class='inline'>&lt;T&gt;</code> is where you make the mold. Each real kind you write is a fill. Same shape, many fills.",
"🗣️ <b>Say it out loud:</b> <i>one mold, many fills — same code, any kind.</i>"
],
analogy:[["A cookie mold (one shape)","=","struct Rectangle<T>"],["Cookie dough / chocolate dough","=","Rectangle<i32> / Rectangle<String>"],["One mold takes any fill","=","Rust checks each fill before it runs"]],
widget:{type:"mold"},
code:{
copy:`struct Rectangle<T> { width: T, height: T }   // the mold
let a = Rectangle { width: 5, height: 3 };     // filled with numbers
let b = Rectangle { width: "wide", height: "tall" }; // filled with text`,
lines:[
["struct Rectangle<T> { width: T, height: T }","the mold — T is \"some type, decided later\""],
["let a = Rectangle { width: 5, height: 3 };","filling 1: numbers"],
["let b = Rectangle { width: \"wide\", height: \"tall\" };","filling 2: text — same mold, no new code"]
]},
tip:{h:"<T> = \"some kind, pick later\":",b:"Angle brackets always mean a mold. The kind inside is the fill. Same shape, many fills — that is generics."},
done:"Uses generics"
}
);
