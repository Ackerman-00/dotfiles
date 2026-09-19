/* ============================================
   lesson: Macros
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"macros", nav:"Macros",
title:"Macros — <em>the tiny robot writer</em>",
lead:"println! and vec! felt like magic till now. Meet the small robot behind them.",
words:[
"You have used macros since lesson one: <code class='inline'>println!</code>, <code class='inline'>vec!</code>, <code class='inline'>#[derive(Debug)]</code> — all macros. A <b>macro</b> is a small robot that <b>writes Rust code for you</b>, before your program runs.",
"<code class='inline'>vec![4, 2, 9]</code> looks like a function. But no function can do this: the robot sees three numbers and writes three <code class='inline'>push</code> lines. Function? Fixed list. Macro? <b>Writes what fits.</b> That is why 0, 3, or 100 items all work.",
"You teach the robot once with <code class='inline'>macro_rules!</code>: the shape to spot, and the code to write. After that, one short line turns into a full block — with no mistakes.",
"One more power: macros see <b>code, not answers</b>. <code class='inline'>sq!(5)</code> turns into <code class='inline'>5 * 5</code> — the robot copies the question itself. A function only ever gets the answer.",
"🔮 <b>Guess before you expand:</b> <code class='inline'>myvec![4, 2, 9]</code> — how many push lines will the robot write? Guess, press Expand, see it type.",
"🗣️ <b>Say it out loud:</b> <i>a macro is a small robot. It writes Rust code before the program runs.</i>"
],
analogy:[["A small robot that writes dull code for you","=","A macro"],["The note the robot follows","=","macro_rules! { shape => code }"],["The robot copying the question itself","=","Macros see code, not just answers"]],
widget:{type:"macroplay"},
code:{
copy:`macro_rules! myvec {
    ( $( $x:expr ),* ) => {
        {
            let mut tmp = Vec::new();
            $( tmp.push($x); )*
            tmp
        }
    };
}
let v = myvec![4, 2, 9];  // the robot writes the pushes`,
lines:[
["macro_rules! myvec {","teach the robot a recipe"],
["    ( $( $x:expr ),* ) => {","recognize: any list of expressions, any length"],
["            let mut tmp = Vec::new();","the code the robot writes, part 1"],
["            $( tmp.push($x); )*","part 2: one push per item — * means \"repeat for each\""],
["            tmp","part 3: the whole block becomes the Vec"],
["let v = myvec![4, 2, 9];","one short line… the robot writes the rest"],
["// the robot writes the pushes","that's the whole trick"]
]},
tip:{h:"When do you need one?",b:"Almost never at first! Functions do 99 of 100 jobs. Take a macro when: the count is open (println!), or you must copy code, not take answers. Knowing the trick is enough."},
done:"Knows what a macro is"
}
);
