/* ============================================
   lesson: Graphs
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"graphview", nav:"Graphs",
title:"Graphs — <em>maps of connected things</em>",
lead:"A tree was family. A graph is a city: roads everywhere, no root, no levels.",
words:[
"A <b>graph</b> is <b>nodes</b> (cities) and <b>edges</b> (roads) between them. No root, no top — just connections. Social networks (people linked), maps (cities linked), the web (pages linked): all graphs.",
"Walking a graph, you must be careful not to loop forever. Two classic recipes: <b>BFS</b> and <b>DFS</b>. They use the structures you already know.",
"<b>BFS — breadth-first</b> — explores like water flooding: all the roads out of your house, then all the roads out of <i>those</i> places, ring by ring. It finds the <b>shortest</b> route. It uses a <b>queue</b> — remember the bakery line?",
"<b>DFS — depth-first</b> — explores like a maze adventurer: follow one road to its dead end, then backtrack. It uses a <b>stack</b> — the plate pile of places still to try.",
"The trick: BFS = queue, DFS = stack. Your whole day of lessons just built a city.",
"🗣️ <b>Say it out loud:</b> <i>BFS = queue = flood = shortest path. DFS = stack = maze = explore everything.</i>"
],
analogy:[["Cities and roads","=","Nodes and edges"],["Flooding out ring by ring","=","BFS (breadth-first, queue)"],["Following one road to the end","=","DFS (depth-first, stack)"],["A tree with extra roads","=","A graph"]],
widget:{type:"graphview"},
code:{
copy:`let map = [
    vec![1, 2],        // city 0 connects to 1, 2
    vec![0, 3],        // city 1 connects to 0, 3
    vec![0],           // city 2 connects to 0
];`,
lines:[
["let map = [","the road map, as a list"],
["    vec![1, 2],","city 0: roads to cities 1 and 2"],
["    vec![0, 3],","city 1: roads to 0 and 3"],
["    vec![0],","city 2: just one road"]
]},
tip:{h:"The sentence that saves the interview:",b:"<b>BFS uses a queue, DFS uses a stack.</b> Also: a tree is a graph with no loops — so everything you learned about trees works here too, with one more rule: mark where you've been, or you'll walk forever."},
done:"Can explain BFS vs DFS"
}
);
