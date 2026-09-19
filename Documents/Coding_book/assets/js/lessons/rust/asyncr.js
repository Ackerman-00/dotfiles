/* ============================================
   lesson: Async & await
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"asyncr", nav:"Async & await",
title:"Async — <em>the chef with many whistles</em>",
lead:"Threads hire more chefs. Async gives ONE chef more timers. Start the rice, start the soup, run back when a whistle blows.",
words:[
"One chef, one pot at a time: 3 minutes on soup, then start the rice. Wasteful — the soup just sits there while you wait.",
"<b>Async</b> is a timer per pot. <code class='inline'>.await</code> sets a whistle. The chef starts the soup. Starts the rice. Then runs back to the pot that whistles first. One chef, many pots at once.",
"Rust needs a <b>runtime</b> to hear the whistles: a small engine that sleeps and wakes. <b>tokio</b> is the most used one. <code class='inline'>#[tokio::main]</code> is the front door.",
"The big rule: an <code class='inline'>async fn</code> does NOT run when you call it. It gives back a future. You must <code class='inline'>.await</code> it. Call = order the food. Await = sit down and eat."
],
analogy:[["Hiring more chefs","=","threads — at the same time"],["One chef, many timers","=","async — take turns"],["Standing and staring at one pot","=","blocking code"],["Ordering food (not eating yet)","=","calling async fn gives a Future"]],
coach:"Async fixes <i>waiting</i>, not <i>working</i>. One thread can hold ten thousand waiting lines at almost no cost. Ten thousand threads would each need a big stack. One chef, many whistles.",
widget:{type:"asyncplay"},
code:{
copy:`use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    let rice = sleep_boil("rice", 2);
    let soup = sleep_boil("soup", 3);
    rice.await;   // whistle blows after 2s
    soup.await;   // whistle blows after 3s
}

async fn sleep_boil(name: &str, secs: u64) {
    sleep(Duration::from_secs(secs)).await;
    println!("{name} is done!");
}`,
lines:[
["use tokio::time::{sleep, Duration};","the whistle-box: tokio provides the sleep"],
["#[tokio::main]","the front door — tokio runtime boots here"],
["async fn main() {","main itself is async: everything can await"],
["    let rice = sleep_boil(\"rice\", 2);","ordering the rice — NOT cooked yet (a Future)"],
["    let soup = sleep_boil(\"soup\", 3);","ordering the soup — still not cooked"],
["    rice.await;","now the whistle blows — chef returns to the pot"],
["    soup.await;","and then the second pot"],
["}",""]
]},
tip:{h:"Why 3 seconds, not 5 — plus the lazy rule:",b:"We ordered both <i>before</i> awaiting either. Order soup, order rice, then sit down. And: a future is lazy. An <code class='inline'>unused future</code> warning means you forgot <code class='inline'>.await</code> — the job never starts."},
why:{kick:"where you meet async in real code",
h:"Browsers, shops, chats — all wait on thousands of small things at once. That is async land.",
points:[
"<b>tokio is the standard.</b> axum, reqwest, most company servers sit on tokio. #[tokio::main] is your door to all of it.",
"<b>.await can wait with a limit.</b> Pot too slow? Cut the whistle. No need to kill the thread.",
"<b>Threads + async are friends.</b> tokio runs futures on a team of threads. Async is the plan. Threads are the workers."
]},
done:"Awaits futures like a real server dev"
}
);