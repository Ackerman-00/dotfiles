/* ============================================
   lesson: Iterators & Closures
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"iterators", nav:"Iterators & Closures",
title:"Iterators & closures — <em>the conveyor belt</em>",
lead:"The most Rust-like code you will write: say what you want. Let the belt walk.",
words:[
"An <b>iterator</b> is a belt running over your shelf. It does not move until you ask. That laziness is on purpose: the belt only does the work you really need.",
"<b>Closures</b> are small functions with no name: <code class='inline'>|x| x * 2</code> means \"take x, give back x doubled\". The pipes <code class='inline'>| |</code> are hands that catch each item.",
"The classic chain: <code class='inline'>.iter()</code> puts items on the belt → <code class='inline'>.map(|x| x * 2)</code> changes each → <code class='inline'>.filter(|x| x > 4)</code> drops the small ones → <code class='inline'>.collect()</code> packs what is left into a new Vec.",
"A for-loop walks and pushes by hand. The belt version says <i>what</i> you want, not <i>how</i> to walk. Real Rust code looks like this.",
"🗣️ <b>Say it out loud:</b> <i>map changes each item. Filter keeps some. Collect packs the box.</i>"
],
analogy:[["A factory conveyor belt","=","An iterator"],["A worker that catches and transforms each item","=","A closure |x| x * 2"],["Dumping the result into a new box","=",".collect()"]],
widget:{type:"conveyor"},
code:{
copy:`let nums = vec![1, 2, 3, 4, 5];
let big = nums.iter()
    .map(|x| x * 2)        // every item doubled
    .filter(|x| x > 4)     // keep only the big ones
    .collect::<Vec<_>>();  // pour the rest into a new Vec
// big = [6, 8, 10]`,
lines:[
["let nums = vec![1, 2, 3, 4, 5];","five items on the loading dock"],
["let big = nums.iter()","put them on the belt"],
["    .map(|x| x * 2)","each item caught and doubled"],
["    .filter(|x| x > 4)","drop the ones that aren't bigger than 4"],
["    .collect::<Vec<_>>();","pour the survivors into a fresh Vec"],
["// big = [6, 8, 10]","the belt's final answer"]
]},
tip:{h:"Read |x| as \"hands take x\":",b:"A closure is a function with no name, given to something else. The belt calls it once per item. <code class='inline'>|x| x * 2</code> — hands take, body doubles."},
done:"Uses iterators & closures"
}
);
