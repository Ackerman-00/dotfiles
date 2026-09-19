/* ============================================
   lesson: Stacks & queues
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"stackque", nav:"Stacks & queues",
title:"Stacks & queues — <em>plates and lines</em>",
lead:"Two tiny structures, two everyday rules. You already use both every day.",
words:[
"A <b>stack</b> is a pile of <b>plates</b>. You only ever touch the top plate. Put a plate down, it lands on top; pick one up, you get the one that was put down <b>last</b>. Last In, First Out — <b>LIFO</b>. Every Undo button is a stack of your actions.",
"A <b>queue</b> is the <b>line at the bakery</b>. The first person in line gets served first. First In, First Out — <b>FIFO</b>. Printers, ticket queues, and \"please wait\" systems are queues.",
"Stack operations: <code class='inline'>push</code> (put on top) and <code class='inline'>pop</code> (take the top). Queue operations: <code class='inline'>push_back</code> (join the line) and <code class='inline'>pop_front</code> (the front leaves). Two words each. That's the entire lesson — the rest is choosing when to use which.",
"Back in a web browser? Back button = stack of pages. Back in a printer queue? First page in, first page out. Once you see it, you see it everywhere.",
"🗣️ <b>Say it out loud:</b> <i>stack = plates = LIFO = Undo. Queue = bakery line = FIFO = printers.</i>"
],
analogy:[["The pile of plates","=","Stack — last in, first out"],["Taking the top plate","=","pop"],["The bakery line","=","Queue — first in, first out"],["Joining at the back","=","push_back"]],
widget:{type:"stackque"},
code:{
copy:`let mut stack = vec![1, 2]; // plates
stack.push(3);              // put down a plate
let top = stack.pop();      // take the top one (3)

use std::collections::VecDeque;
let mut q = VecDeque::new(); // the line
q.push_back("ann");          // join the back
let first = q.pop_front();   // ann leaves first`,
lines:[
["let mut stack = vec![1, 2];","two plates on the pile"],
["stack.push(3);","plate 3 lands on top"],
["let top = stack.pop();","take the TOP plate (3)"],
["use std::collections::VecDeque;","the queue toolbox"],
["let mut q = VecDeque::new();","an empty line"],
["q.push_back(\"ann\");","ann joins the back"],
["let first = q.pop_front();","ann leaves first"]
]},
tip:{h:"One sentence each:",b:"<b>Stack = undo buttons.</b> <b>Queue = printers.</b> If you must undo/reverse → stack. If it's a line of fairness → queue."},
done:"Masters stacks & queues"
}
);
