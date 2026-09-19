/* ============================================
   lesson: Async — one chef, many orders
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"async", nav:"Async — one chef, many orders",
title:"Async — <em>one chef, many orders</em>",
lead:"Threads are more chefs. Async is ONE brilliant chef who never stands still while waiting.",
words:[
"Imagine a chef making five dishes at once — alone. While the water boils, they don't stare at the pot: they peel onions. When the kettle whistles, they come back and pour. This <b>doing other work while waiting</b> is <b>async</b>.",
"In code, some steps are <i>slow but don't need the brain</i>: a network request, a file read, a database answer. While the computer waits, async lets it start the next task instead of sleeping.",
"<code class='inline'>async fn</code> marks a recipe as \"can pause\". <code class='inline'>.await</code> is the kettle whistle: \"pause me here, come back when this is ready\". The runtime (like <b>tokio</b>) is the sous-chef who manages the timer.",
"Threads = more chefs. Async = one chef with good time management. Real servers use both: a few threads, each doing async work.",
"🗣️ <b>Say it out loud:</b> <i>threads are more chefs. Async is one chef who does other work while the kettle boils.</i>"
],
analogy:[["Waiting for water to boil","=","A slow network request"],["Peeling onions meanwhile","=","Running another task"],["The kettle whistle","=",".await — \"come back when ready\""],["The timer manager","=","The async runtime (tokio)"]],
widget:{type:"asyncplay"},
code:{
copy:`async fn fetch_user() -> String {
    let data = http_get(url).await; // pause here
    String::from("user loaded")
}`,
lines:[
["async fn fetch_user() -> String {","a recipe that can pause"],
["    let data = http_get(url).await;","the kettle: pause, do other work, resume"],
["    String::from(\"user loaded\")","work continues after the whistle"]
]},
tip:{h:"Async is better waiting, not faster math:",b:"If your program is slow because it CALCULATES, async won't help — that's thread territory. If it's slow because it WAITS (network, disk, database), async is exactly right."},
done:"Can explain .await"
}
);
