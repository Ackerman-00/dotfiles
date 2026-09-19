/* ============================================
   lesson: Files
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"files", nav:"Files",
title:"Files — <em>making the computer remember</em>",
lead:"Programs forget all when they close. Files help them remember — and help two programs talk.",
words:[
"<code class='inline'>fs::write(\"name.txt\", \"content\")</code> makes a file on disk (or writes over it). <code class='inline'>fs::read_to_string(\"name.txt\")</code> reads it back. <code class='inline'>fs::remove_file</code> deletes it.",
"Files are notes on the computer's desk. They stay after your program ends. Next run, it can read them again.",
"Reading can fail (no file). So read gives you a <code class='inline'>Result</code> — that is why the last lesson exists.",
"Try it: write a note, read it, delete it. Real programs use these same three moves every day."
],
widget:{type:"fileplay"},
code:{
copy:`fs::write("note.txt", "hello file!").ok();
let text = fs::read_to_string("note.txt")
    .expect("file should exist");
println!("{}", text);
fs::remove_file("note.txt").ok();`,
lines:[
["fs::write(\"note.txt\", \"hello file!\").ok();","save a note to disk"],
["let text = fs::read_to_string(\"note.txt\")","open the note back up"],
["    .expect(\"file should exist\");","...or crash with this message"],
["println!(\"{}\", text);","print the note"],
["fs::remove_file(\"note.txt\").ok();","delete the note"]
]},
tip:{h:"expect = unwrap with your words:",b:"<code class='inline'>expect(\"message\")</code> is <code class='inline'>unwrap()</code>, but on crash YOUR words show — much easier to find the bug. <code class='inline'>.ok()</code> means \"on fail, skip it\"."},
done:"Reads & writes files"
}
);
