/* ============================================
   lesson: Numbers & math
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"math", nav:"Numbers & math",
title:"Numbers & math — <em>calculator time</em>",
lead:"Arithmetic in Rust looks like school math. But there's one sneaky rule.",
words:[
"<code class='inline'>+</code> <code class='inline'>-</code> <code class='inline'>*</code> <code class='inline'>/</code> all work like in school. <code class='inline'>%</code> is <b>remainder</b> — what is left over (7 % 3 = 1).",
"<b>One tricky rule:</b> whole number divided by whole number <i>stays whole</i>. <code class='inline'>7 / 2</code> in Rust = <b>3</b>, not 3.5! The rest gets dropped. For 3.5, use a dot: 7.0 / 2.",
"Times and divided-by come before plus and minus — same as school. Try the playground: watch 7 / 2."
],
widget:{type:"calc"},
code:{
copy:`let a = 7 / 2;      // = 3  (whole numbers: drops the rest!)
let b = 7 % 2;      // = 1  (the remainder)
let c = 7.0 / 2.0;  // = 3.5 (decimals keep everything)
let d = 2 + 3 * 4;  // = 14 (times first)`,
lines:[
["let a = 7 / 2;","whole ÷ whole = 3. The 0.5 is dropped!"],
["let b = 7 % 2;","remainder = 1. The '%' asks: what's left over?"],
["let c = 7.0 / 2.0;","decimals ÷ decimals = 3.5. No dropping."],
["let d = 2 + 3 * 4;","= 14, because 3*4 happens first"]
]},
tip:{h:"When in doubt, use ( ):",b:"<code class='inline'>(2 + 3) * 4</code> is 20. Clear math beats memory rules — Rust loves parentheses, and so will you."},
done:"Understands integer division"
}
);
