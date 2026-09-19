/* ============================================
   lesson: Input
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"input", nav:"Input",
title:"Talking to the user — <em>input</em>",
lead:"Programs that only print are one-way. Real programs listen too. Here is how to hear the user.",
words:[
"<code class='inline'>std::io::stdin()</code> means \"the keyboard\" in Rust. <code class='inline'>read_line(&mut line)</code> takes what the user typed and puts it into a String box.",
"<b>One trick:</b> when the user presses Enter, the box holds their text <i>plus a hidden new line</i>. <code class='inline'>trim()</code> cuts it off — like dust off a shelf.",
"Then a useful move: <code class='inline'>let line = line.trim().to_string();</code> — this <b>replaces</b> the old box with a clean new one, same name. This is called <i>shadowing</i>. Same name, clean inside."
],
widget:{type:"echo"},
code:{
copy:`let mut name = String::new();
std::io::stdin().read_line(&mut name).ok();
let name = name.trim().to_string();
println!("Hello, {}!", name);`,
lines:[
["let mut name = String::new();","an empty, open box for their answer"],
["std::io::stdin().read_line(&mut name).ok();","listen to the keyboard, pour into the box"],
["let name = name.trim().to_string();","same name, clean copy — dust removed (shadowing)"],
["println!(\"Hello, {}!\", name);","shout it back with the placeholder"]
]},
tip:{h:"Try it:",b:"Run the playground — type your name and press Enter. Then build this same program on your computer in a <code class='inline'>cargo new</code> project. The <code class='inline'>.ok()</code> means \"if this fails, skip it — move on\"."},
done:"Reads user input"
}
);
