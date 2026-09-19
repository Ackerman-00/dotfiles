/* ============================================
   lesson: Threads — many workers
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"threads", nav:"Threads — many workers",
title:"Threads — <em>many chefs in one kitchen</em>",
lead:"One robot chef is fast. What if we hire four? That's threads — and Rust makes sure they never fight.",
words:[
"Up to now, every program used <b>one robot chef</b>: it followed your recipe line by line, alone. A <b>thread</b> is another chef. Your program can hire several, and they cook <i>at the same time</i> — the program finishes sooner. This is called <b>concurrency</b>.",
"All chefs share one kitchen — the program's memory. Two chefs grabbing the <b>same egg</b> at the same moment: it's gone before either sees it. In code that's a <b>data race</b> — a crash that happens <i>sometimes</i>, which is the worst kind.",
"Rust's bodyguard refuses to let you write data races <i>before the program even runs</i>. If two threads touch the same memory unsafely, the compiler says: <b>not today</b>. That guarantee — threads without fear — is why Rust is loved for servers.",
"<code class='inline'>std::thread::spawn</code> hires a chef; <code class='inline'>handle.join()</code> waits for that chef to finish before the program leaves the building.",
"🗣️ <b>Say it out loud:</b> <i>a thread is a chef, and Rust refuses to let two chefs fight over one egg.</i>"
],
analogy:[["Several chefs in one kitchen","=","Threads running at once"],["The shared fridge and counter","=","Shared memory"],["Two chefs grabbing the same egg","=","A data race — Rust blocks it"],["Calling a waiter: \"serve when done\"","=","handle.join()"]],
widget:{type:"threadplay"},
code:{
copy:`use std::thread;

let handle = thread::spawn(|| {
    println!("chef 2: peeling onions");
});
println!("chef 1: boiling water");
handle.join().unwrap(); // wait for chef 2`,
lines:[
["use std::thread;","borrow the thread toolbox"],
["let handle = thread::spawn(|| {","hire chef 2 — they start immediately"],
["    println!(\"chef 2: peeling onions\");","chef 2's work, in parallel"],
["});","chef 2's shift ends here"],
["println!(\"chef 1: boiling water\");","chef 1 works at the same time"],
["handle.join().unwrap();","wait for chef 2 to finish before leaving"]
]},
tip:{h:"More chefs ≠ always faster:",b:"Kitchens with one chef and one egg get nothing from a second chef — they'd just bump elbows. Threads speed up work that can genuinely overlap (many files, many requests). And the joining rule: the main thread must wait for everyone with <code class='inline'>join()</code>."},
done:"Spun up a thread"
}
);
