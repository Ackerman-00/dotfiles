/* ============================================
   lesson: Errors
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"errors", nav:"Errors",
title:"Result & errors — <em>the safe way to fail</em>",
lead:"Things fail in real life: files go missing, networks drop. Rust handles failure with Result.",
words:[
"<b>Result</b> is like Option, but with a reason. <code class='inline'>Ok(value)</code> — it worked! <code class='inline'>Err(problem)</code> — it failed, here is why.",
"Rust <b>makes</b> you look at failure. A function that can fail gives you a Result. You must choose what to do with it. You cannot quietly ignore it.",
"<code class='inline'>unwrap()</code> means \"I am sure this works, give me the value\". If it is really an Err, the program <b>crashes</b> with a message. Fine for practice. Bad for real programs. <code class='inline'>match</code> is the safe way.",
"Try the conveyor: read files. Some are there. Some are not. See what unwrap does when it is wrong.",
"🗣️ <b>Say it out loud:</b> <i>Result is Ok or Err — look at both, match is safe, unwrap can crash.</i>"
],
widget:{type:"resultplay"},
code:{
copy:`let result = std::fs::read_to_string("notes.txt");
match result {
    Ok(text)   => println!("content: {}", text),
    Err(e)     => println!("oops: {}", e),
}
// let text = result.unwrap(); // CRASH if Err!`,
lines:[
["let result = std::fs::read_to_string(\"notes.txt\");","try to read the file — may fail"],
["match result {","open the result box"],
["    Ok(text)   => println!(\"content: {}\", text),","worked! → print the text"],
["    Err(e)     => println!(\"oops: {}\", e),","failed! → print the reason"],
["}","handled safely"],
["// let text = result.unwrap();","unwrap = trust me... CRASH if it's Err!"]
]},
tip:{h:"unwrap or match:",b:"<code class='inline'>unwrap</code> = fast (crashes on failure). <code class='inline'>match</code> = safe (handles both). For practice, unwrap is fine. For real programs, handle your errors."},
done:"Understands Result & errors"
}
);
