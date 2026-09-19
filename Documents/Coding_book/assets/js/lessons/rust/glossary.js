/* ============================================
   lesson: glossary — from Arc to () in plain words
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"glossary", nav:"Glossary — A to Z",
title:"The dictionary — <em>every word, one line each</em>",
lead:"Twenty-six words you met all course, now in one deck. Flip them like a passport: name on the front, meaning on the back.",
words:[
"Each card works the same. The hard word is on the front. The plain meaning is on the back.",
"Do not try to pass the deck. Skip cards you know. The ones you flip twice show your real gaps.",
"Card zero holds the whole course. Read the deck once a month."
],
analogy:[["A passport, one stamp per land","=","one card per word"],["One card per word, A to Z","=","the full deck in order"]],
coach:"A glossary is for knowing, not memorizing. You should say 'I met this word — one owner per value'. Not read the book from memory.",
widget:{type:"gym", q:[
  {q:"A — Arc", hint:"one toy, shared with every thread",
   a:"Rc that threads may share. Arc::clone(&x) shares one value.", why:"Rc lives in one thread only. Arc counts safe, so many threads can hold on."},
  {q:"B — Borrow &", hint:"look, don't own",
   a:"Look, don't own. & to read. &mut to change.", why:"Many readers or one writer — never both. The compiler counts."},
  {q:"C — Cargo", hint:"the tool that builds",
   a:"The builder. new, run, check, build, test, doc, publish.", why:"One tool for a project's whole life. Use cargo, not rustc alone."},
  {q:"D — Deref *", hint:"open the box",
   a:"Open the box. Auto change: &Box&lt;String> becomes &str for you.", why:"Functions that want &str accept your Box too. No &(*m)[..] needed."},
  {q:"E — Enum", hint:"one shape at a time",
   a:"One shape at a time. Option ends null forever.", why:"Some(x) or None — no null hiding anywhere. match must cover every shape."},
  {q:"F — Future, async", hint:"a sleepy job",
   a:"A sleepy job. It needs .await GO plus a runner to wake it.", why:"Call an async fn: food ordered. .await: sit down and eat."},
  {q:"G — Generics &lt;T>", hint:"the empty box",
   a:"An empty box for any kind. No extra cost when it runs.", why:"Vec&lt;T> and Option&lt;T> are written once. They take every T, full speed."},
  {q:"H — HashMap", hint:"labels on jars",
   a:"Key to value, no order. entry().or_insert() counts in one line.", why:"Need 'how many times did I see X'? The entry API is the whole trick."},
  {q:"I — Impl", hint:"skills for your struct",
   a:"Skills for a struct or enum. &self reads. &mut self changes.", why:"Data sits in struct. Skills live in impl. That split is Rust's way."},
  {q:"J — Join", hint:"wait for the worker",
   a:"handle.join() waits for a thread to end.", why:"No join: main goes home early and the new thread never ends."},
  {q:"K — Keyword mut", hint:"the change word",
   a:"You can change it. let is locked. let mut is open.", why:"mut is a bright flag: CHANGES HERE. Readers search it first."},
  {q:"L — Lifetime 'a", hint:"how long the look lives",
   a:"How long the borrowed look stays valid.", why:"It stops a pointer to a dead thing. Mostly the compiler fills it in."},
  {q:"M — Match", hint:"check every shape",
   a:"Check all cases. if let is the short form for one case.", why:"Miss a branch? That is a build error, not a night bug."},
  {q:"N — None / Some", hint:"empty or full",
   a:"The maybe-box: empty (None) or full (Some).", why:"Two shapes, always handled. This pair killed the null pointer."},
  {q:"O — Ownership", hint:"one box, one owner",
   a:"One owner per value. Trash comes at }.", why:"Move means the old spot is done. Small kinds like i32 just copy."},
  {q:"P — Panic", hint:"stop now",
   a:"Stop now, crash loudly. Result is the one you can fix.", why:"Panic is for bugs that must never happen. Result is for errors users cause."},
  {q:"Q — ?", hint:"bad goes up, good opens",
   a:"Ok(v) opens into v. Err(e) goes back to the caller at once.", why:"Five lines of match turn into one sign. New tools read clean with it."},
  {q:"R — Rc", hint:"count the owners",
   a:"Counts owners. Ends at 0. One thread only.", why:"Rc::clone(&a) adds a count, not a copy. Threads need Arc."},
  {q:"S — Slice &s[0..2]", hint:"see a part, own nothing",
   a:"See a part, own nothing. &str is the slice for text.", why:"Slices borrow a window. The owner keeps the whole house."},
  {q:"T — Trait", hint:"a shared skill",
   a:"A shared skill. impl Summary for Post keeps the promise.", why:"Same skill, many kinds. Generics run fast with one kind. dyn mixes many."},
  {q:"U — Unsafe", hint:"the door you open yourself",
   a:"Five extra powers. Keep the block small, wrap it safe outside.", why:"Raw speed, C code, tiny chips. No unsafe in year one unless the book says."},
  {q:"V — Vec", hint:"a shelf that grows",
   a:"A list that grows: vec![], push, and get for safe reads.", why:"The normal shelf. Out-of-range reads stop — no silent bad data."},
  {q:"W — Where", hint:"long rules go last",
   a:"where T: Display moves long rules out of the brackets.", why:"Same promise as &lt;T: Display>. Easier to read when rules grow."},
  {q:"X — dyn", hint:"the zoo cage",
   a:"Box&lt;dyn Draw> holds many kinds in one box.", why:"Enums need all kinds up front. dyn lets new kinds in with no old change."},
  {q:"Y — Yank", hint:"hide the bad box you shared",
   a:"cargo yank hides a bad version you shared.", why:"Old builds keep working. No one new can take the bad one."},
  {q:"Z — ()", hint:"empty hands",
   a:"Empty hands: no value. The unit type.", why:"Functions that return nothing return (). Even println! gives you ()."}
]},
code:{
copy:`let pile: Vec<&str> = vec!["arc", "borrow", "cargo", "dyn"];
for term in pile {
    println!("- {term}");
}`,
lines:[
["let pile: Vec<&str> = vec![\"arc\", \"borrow\", \"cargo\", \"dyn\"];","a Vec can hold dictionary words"],
["for term in pile {","visit every entry"],
["    println!(\"- {term}\");","print it"],
["}",""]
]},
tip:{h:"A to Z — climb or search:",b:"The deck runs Arc to (). Same order as the book's last page. Flip any card. The back always shows the why."},
why:{kick:"why keep two word lists",
h:"You have this small deck AND the full Rust manual. The deck is how you talk. The manual is how you check.",
points:[
"<b>Know, don't memorize.</b> A glossary keeps words near while you work. rustc and docs fill the gaps while you code.",
"<b>Words are tools.</b> Real Rust code uses crates and kinds named with these words. Know the word, find the tool.",
"<b>Ownership is first.</b> A hard Rust sentence? It is almost always ownership — or lifetimes. Flip those cards again."
]},
done:"Can explain the core words, A to Z"
}
);