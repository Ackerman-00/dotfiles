/* ============================================
   lesson: Threads
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"threads", nav:"Threads",
title:"Threads — <em>more chefs in the kitchen</em>",
lead:"One chef is one thread. Two chefs, two threads. They cook at the same time.",
words:[
"<b>std::thread::spawn</b> hires a new chef. The new chef cooks its own dish. The main chef keeps cooking too. The recipe you give must <b>move</b>. The new chef owns its own food.",
"Chefs can share one board — but only one cuts at a time. The board has a <code class='inline'>Mutex&lt;T&gt;</code> lock. It says \"this chef cuts now\". Chef B waits its turn.",
"Why threads? New chips have many cores — real chefs. One dish at a time wastes nine of ten chefs.",
"The other trick is messages: the main chef shouts down the hall: <code class='inline'>tx.send(hay)</code>. The helper's mailbox brings it later with <code class='inline'>rx.recv()</code>. No shared board needed."
],
analogy:[["Chefs cooking at the same time","=","threads"],["One lock on the board","=","Mutex&lt;T> — one at a time"],["A note in the mailbox","=","channel send/recv"]],
coach:"Sharing is safe with a lock. Lock it. Use the value. Unlock. Rust unlocks for you at the end of the room.",
widget:{type:"threadplay"},
code:{
copy:`use std::thread;

let th = thread::spawn(|| {
    for i in 1..=3 { println!("helper {i}"); }
});
for i in 1..=3 { println!("main   {i}"); }
th.join().unwrap();   // wait for the helper`,
lines:[
["use std::thread;","pull the threading kitchen into scope"],
["let th = thread::spawn(|| {","new thread, new chef; closure must own its food"],
["    for i in 1..=3 { println!(\"helper {i}\"); }","helper's own loop"],
["});","new thread started"],
["for i in 1..=3 { println!(\"main   {i}\"); }","the main thread cooks in parallel"],
["th.join().unwrap();","main waits for the helper to finish — unwrap catches a panic"],
["",""]
]},
tip:{h:"Threads cost — and where you join matters:",b:"Each thread gets its own stack (8 MB). Ten threads are fine. Ten <i>thousand</i> are not. Join <i>after</i> the work: both run together. Join <i>before</i> the work: you just wait, no speed."},
why:{kick:"where you meet threads in real code",
h:"Browsers, games, servers — all use threads. Rust makes them safe: no data races, no extra cost.",
points:[
"<b>Arc&lt;Mutex&lt;T>> does the daily work.</b> Arc is Rc that threads may share. Mutex is RefCell with a lock. That is the map.",
"<b>Channels first.</b> Many Go users start with channels. Rust has both. Channels first; shared state when the story is cleaner.",
"<b>Data races do not build.</b> Share &mut across threads? Rust says no. C++ says yes — and crashes at night.",
"<b>Send + Sync are passports.</b> Send may travel to a new thread. Sync may be shared with &. Rc has no passport. That is why Arc exists."
]},
done:"Spawns threads and sends messages"
}
);