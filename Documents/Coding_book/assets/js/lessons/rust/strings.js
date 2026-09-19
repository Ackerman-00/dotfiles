/* ============================================
   lesson: Text
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"strings", nav:"Text",
title:"Text — <em>String vs &str</em>",
lead:"Computers love text. Rust has two kinds, and it's simpler than it sounds.",
words:[
"<b>String</b> is text that can <i>grow</i> — you can add letters. It can change. <b>&str</b> (say \"string slice\") is text that just <i>is there</i> — like words on a sign. You read it. You do not change it.",
"To grow a String, use <code class='inline'>push_str</code>: <code class='inline'>my_name.push_str(\"suffix\");</code> — and it must be <code class='inline'>mut</code>. Growing is changing!",
"To put values inside printed text, use <b>placeholders</b>: <code class='inline'>println!(\"Hi {}, you are {}\", name, age);</code> — each <code class='inline'>{}</code> means \"put the next value here\"."
],
widget:{type:"strings"},
code:{
copy:`let mut greeting = String::from("Hello");
greeting.push_str(", world!");          // grows the text
println!("{}", greeting);              // prints: Hello, world!
let label: &str = "welcome sign";      // fixed text, just read it`,
lines:[
["let mut greeting = String::from(\"Hello\");","make a growable String — note mut!"],
["greeting.push_str(\", world!\");","glue more text onto it — it grows"],
["println!(\"{}\", greeting);","{} is a placeholder for greeting"],
["let label: &str = \"welcome sign\";","&str = fixed sign text, just read it"]
]},
tip:{h:"The simplest rule:",b:"Need to <b>change</b> or <b>build</b> text → String. Just a fixed text to read → &str. Not sure? Rust errors tell you a lot — read them."},
done:"Understands String vs &str"
}
);
