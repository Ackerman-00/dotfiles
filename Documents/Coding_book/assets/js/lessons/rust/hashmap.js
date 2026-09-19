/* ============================================
   lesson: HashMap
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"hashmap", nav:"HashMap",
title:"HashMap — <em>the label maker</em>",
lead:"A Vec finds things by spot number. A HashMap finds things by label — at once.",
words:[
"A Vec keeps items in a line. You find them by number. A <b>HashMap</b> keeps items with <b>labels</b>. You name each item. Later you say the name — and get it back at once.",
"Think of jars with labels: you write \"sugar\" on a jar and fill it. To find sugar, you do not open every jar. You read the labels and grab it.",
"In code: <code class='inline'>map.insert(\"sugar\", 2);</code> puts 2 in the jar labeled sugar. <code class='inline'>map.get(\"sugar\")</code> gives <code class='inline'>Some(&2)</code>. No such label? You get <code class='inline'>None</code>. That is why Option lives here.",
"Use HashMap for \"find it by name\": count words, game points, settings. Use Vec when order matters.",
"🗣️ <b>Say it out loud:</b> <i>labels on jars — say the label, get the jar.</i>"
],
analogy:[["Jars with printed labels","=","HashMap<String, i32>"],["Saying the label out loud","=","map.get(\"sugar\")"],["A jar with no label on it","=","None (Option)"]],
widget:{type:"labelmaker"},
code:{
copy:`let mut scores = HashMap::new();
scores.insert("rusty", 10);    // stick label "rusty" -> 10
scores.insert("frost", 8);
let got = scores.get("rusty"); // Some(&10) — label found!`,
lines:[
["let mut scores = HashMap::new();","an empty wall of jars"],
["scores.insert(\"rusty\", 10);","print label rusty, stick on jar, fill with 10"],
["scores.insert(\"frost\", 8);","another jar"],
["let got = scores.get(\"rusty\");","say the label — instant answer, Some(&10)"]
]},
tip:{h:"Remember the label:",b:"HashMap means \"jars with labels\". Option is the answer when a label is missing. The two almost always come together."},
done:"Uses HashMaps"
}
);
