/* ============================================
   lesson: The guessing game
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"guess", nav:"The guessing game",
title:"The guessing game — <em>your first real program</em>",
lead:"Type, if, loop, input — they all work together now. Three steps, one game.",
words:[
"<b>Step 1 — ask.</b> <code class='inline'>println!(\"guess 1-10:\")</code> shows the question. Then <code class='inline'>io::stdin().read_line(&mut g)</code> reads the answer. It puts the typed text into the box named <code class='inline'>g</code>.",
"<b>Step 2 — clean and change.</b> The text comes with the Enter key still on it: <code class='inline'>\"5\\n\"</code>. <code class='inline'>trim()</code> cuts the Enter off. Now <code class='inline'>\"5\"</code> is left. <code class='inline'>parse()</code> turns it into a real number.",
"<b>Step 3 — answer.</b> Three doors: <code class='inline'>if g == secret</code> prints win and <code class='inline'>break</code>s out. <code class='inline'>else if g < secret</code> prints small. <code class='inline'>else</code> prints big. All of it sits inside <code class='inline'>loop</code>. It repeats until you win.",
"So: <b>read</b> a number, <b>check</b> it, <b>repeat</b>. That is most of every program you will ever read. Flip the cards, then read the real code."
],
analogy:[["A quiz: \"I'm thinking of a number…\"","=","A loop that repeats the round"],["\"Too big — try again\"","=","An else-if that sends you around again"],["The secret number (7, fixed for now)","=","secret = 7 (dice come later)"]],
coach:"Step 1 uses <code>&mut</code>. Do not worry if it feels new. Copy it for now. The Core ideas chapter teaches <code>&mut</code> slowly. For now: copy, run, break it, fix it.",
widget:{type:"gym", q:[
  {q:"Which word makes a box changeable, so the answer can go in?", hint:"the box starts with let…",
   a:"mut — let mut g, not let g.", why:"No mut, no change. The keyboard must write into the box."},
  {q:"Why call trim() before parse()?", hint:"read_line keeps one extra thing",
   a:"read_line keeps the Enter key (\\n). trim() cuts it: \"5\\n\" turns into \"5\".", why:"No trim, no number. parse sees \"5\\n\" and stops."},
  {q:"Where does the round start again after small or big?", hint:"the walls that repeat",
   a:"loop holds the whole game. break after win! is the only way out.", why:"loop repeats until break. small and big just go back to the top."}
]},
code:{
copy:`use std::io;
fn main() {
    let secret = 7; // note: the real book rolls dice. We use 7 first. Easy.
    loop {
        println!("guess 1-10:");
        let mut g = String::new();
        io::stdin().read_line(&mut g).expect("no read");
        let g: u32 = g.trim().parse().expect("type a number");
        if g == secret { println!("win!"); break; }
        else if g < secret { println!("small"); }
        else { println!("big"); }
    }
}`,
lines:[
["use std::io;","the keyboard room"],
["let secret = 7; // note: the real book rolls dice. We use 7 first. Easy.","the secret number — fixed for now"],
["loop {","this wall repeats forever… until break"],
["    println!(\"guess 1-10:\");","invite the player in"],
["    let mut g = String::new();","a new, empty, changeable text box"],
["    io::stdin().read_line(&mut g).expect(\"no read\");","the keyboard writes into the box"],
["    let g: u32 = g.trim().parse().expect(\"type a number\");","same name, new box: text becomes a number"],
["    if g == secret { println!(\"win!\"); break; }","the win door — and the escape"],
["    else if g < secret { println!(\"small\"); }","too low, round restarts"],
["    else { println!(\"big\"); }","too high, round restarts"],
["    }",""]
]},
tip:{h:"Same name twice — on purpose:",b:"Rust lets you reuse a name: first <code class='inline'>let g = String::new();</code>, later <code class='inline'>let g = g.trim().parse()…</code>. The second box <b>hides</b> the first. Same name, new value. This is called shadowing."},
why:{kick:"where you meet this in real code",
h:"Most software is this loop. Wait for input. Check it. Answer. Repeat.",
points:[
"<b>Bad input is normal.</b> Real tools do not crash on bad input. They print 'type a number' and ask again. Later lessons teach the no-crash way.",
"<b>if-else-if fits three doors.</b> win, small, big — one chain, read top to bottom. You meet match in the Core ideas chapter.",
"<b>Shadowing keeps names short.</b> g, then g again. No messy names like g, g2, g_final. Same name, new box."
]},
done:"Built a guessing game"
}
);