/* ============================================
   lesson: Enums & Option
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"enums", nav:"Enums & Option",
title:"Enums & Option — <em>choices, and maybe-nothing</em>",
lead:"Enums are about choices. Option is about 'maybe there's something here, maybe not'.",
words:[
"An <b>enum</b> lists the allowed choices: <code class='inline'>enum Light { Red, Yellow, Green }</code> — the light can only be one of these. Never purple. The compiler checks it.",
"<b>Option</b> is Rust's built-in \"maybe\" box. It is <code class='inline'>Some(value)</code> — something is inside — or <code class='inline'>None</code> — empty. Like a pocket: a coin, or nothing.",
"Why must you think about None? In other languages, \"nothing\" crashes the program at the worst time. Rust makes you handle it first.",
"Pull the lever: sometimes a coin, sometimes nothing — match handles both, no crash.",
"🗣️ <b>Say it out loud:</b> <i>an enum is one box with named choices.</i>"
],
widget:{type:"optionplay"},
code:{
copy:`enum Light { Red, Yellow, Green }

let pocket: Option<i32> = Some(7);
match pocket {
    Some(c) => println!("coin: {}", c),
    None    => println!("nothing there"),
}`,
lines:[
["enum Light { Red, Yellow, Green }","the allowed choices for a light"],
["","(blank line — just for eyes)"],
["let pocket: Option<i32> = Some(7);","a maybe-box, holding 7"],
["match pocket {","sort the maybe-box"],
["    Some(c) => println!(\"coin: {}\", c),","something inside → show the coin"],
["    None    => println!(\"nothing there\"),","empty → say so"],
["}","sorted"]
]},
tip:{h:"Rule of thumb:",b:"Might it not exist — a file, a list entry? Rust gives you an Option. <code class='inline'>Some</code> = it is there. <code class='inline'>None</code> = it is not. Handle both, and missing things never crash you."},
done:"Understands enums & Option"
}
);
