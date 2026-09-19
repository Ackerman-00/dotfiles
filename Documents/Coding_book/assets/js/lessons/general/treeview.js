/* ============================================
   lesson: Trees
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"treeview", nav:"Trees",
title:"Trees — <em>family trees of data</em>",
lead:"Your filesystem is a tree. Your family is a tree. Data loves trees.",
words:[
"A <b>tree</b> is data organized like a family tree: one <b>root</b> on top, <b>branches</b> below, and <b>leaves</b> at the ends. Every node has children; every child has one parent. No loops, no circles — a tree never points back up.",
"Your computer is full of trees: the folder <b>Documents</b> contains <b>school</b>, which contains <b>essays</b>, which contains files. Menus, org charts, HTML pages — nesting is a tree.",
"The superstar is the <b>binary search tree</b>: each node has at most two children, and <i>everything smaller goes left, everything bigger goes right</i>. Searching it is binary search in disguise: halve and discard, level by level. O(log n) look-ups.",
"To walk a tree, you <b>traverse</b> it: visit a node, then visit its children (recursively — each child is the root of a smaller tree). One function, walking the whole structure, levels deep.",
"🗣️ <b>Say it out loud:</b> <i>smaller goes left, bigger goes right — a binary search tree is binary search with branches.</i>"
],
analogy:[["Family tree","=","A tree data structure"],["A folder inside a folder","=","Nesting — the filesystem tree"],["Left smaller, right bigger","=","Binary search tree"],["Visiting every branch","=","Traversal (recursion)"]],
widget:{type:"treeview"},
code:{
copy:`struct Node {
    value: i32,
    left: Option<Box<Node>>,
    right: Option<Box<Node>>,
}`,
lines:[
["struct Node {","one person in the family tree"],
["    value: i32,","their name"],
["    left: Option<Box<Node>>,","maybe a left child… (also a Node!)"],
["    right: Option<Box<Node>>,","…maybe a right child"]
]},
tip:{h:"Spot-the-tree game:",b:"Look around: menus, folders, tables of contents. Ask \"is there a root and branches?\" If yes, a tree is underneath — and now you know how to search it."},
done:"Can see trees in data"
}
);
