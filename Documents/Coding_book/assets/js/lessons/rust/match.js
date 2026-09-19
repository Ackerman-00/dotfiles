/* ============================================
   lesson: match
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"match", nav:"match",
title:"match — <em>the sorting machine</em>",
lead:"if is a single door. match is a whole sorting machine with labelled baskets.",
words:[
"<code class='inline'>match</code> looks at one value and drops it in the basket that fits. Each <b>arm</b> is one basket: a label and an answer.",
"The <code class='inline'>_</code> arm is the <b>catch-all basket</b> — \"anything else goes here\". Rust wants a place for every value. Nothing ever falls on the floor.",
"match instead of if? If you add a new choice later, match <i>forces</i> you to handle it. No surprises.",
"Click a color — see the machine sort it."
],
widget:{type:"matchplay"},
code:{
copy:`let color = "green";
let msg = match color {
    "red"   => "stop",
    "green" => "go",
    _       => "wait for it...",
};
println!("{}", msg);`,
lines:[
["let color = \"green\";","the value we're sorting"],
["let msg = match color {","start the sorting machine"],
["    \"red\"   => \"stop\",","basket labeled 'red' → gives \"stop\""],
["    \"green\" => \"go\",","basket labeled 'green' → gives \"go\""],
["    _       => \"wait for it...\",","catch-all basket → anything else"],
["};","the machine hands back the result"],
["println!(\"{}\", msg);","print what came out"]
]},
tip:{h:"The arrow pattern:",b:"Every arm looks like <code class='inline'>label => answer</code>. Read it as: \"if it is this label, give back this answer\"."},
done:"Understands match"
}
);
