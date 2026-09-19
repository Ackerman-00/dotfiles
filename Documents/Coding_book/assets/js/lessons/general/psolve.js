/* ============================================
   lesson: How to solve any problem
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"psolve", nav:"How to solve any problem",
title:"How to solve any problem — <em>the 4-step recipe</em>",
lead:"Stuck? There's a recipe for getting unstuck. Professionals follow it every single day.",
words:[
"<b>Step 1 — restate.</b> Say the problem in your own plain words. What goes IN? What comes OUT? If you can't say it in one sentence, you don't understand it yet — and that's the actual problem.",
"<b>Step 2 — hand-solve a tiny example.</b> Take paper. Solve a 3-item version by hand, slowly, writing every move. Computers only automate what you can do by hand — if you can't, neither can they.",
"<b>Step 3 — write the recipe.</b> Turn your hand steps into plain-language lines: \"find the smallest, put it first, repeat\". This is <b>pseudocode</b> — the skeleton with no language yet.",
"<b>Step 4 — translate and test.</b> Turn the skeleton into Rust, then test it on your tiny example, then on a weird one (empty input! one item! huge!). Weird inputs are where bugs hide.",
"One more weapon: <b>shrink it</b>. Stuck on a 1000-item problem? Make it 3. Then 4. The pattern of growth almost always becomes visible.",
"🗣️ <b>Say it out loud:</b> <i>restate → tiny example → pseudocode → test. Stuck? Make it 3 items.</i>"
],
analogy:[["Reading the recipe twice before cooking","=","Restating the problem"],["Peeling one potato before the sack","=","Tiny example by hand"],["Writing steps before chopping","=","Pseudocode first"],["Tasting before serving","=","Testing on weird inputs"]],
code:{
copy:`// Step 3 — pseudocode, no language needed
find the smallest card
put it in position 1
repeat for positions 2, 3, …
(that's selection sort!)`,
lines:[
["// Step 3 — pseudocode, no language needed","skeleton before Rust"],
["find the smallest card","the main idea, in words"],
["put it in position 1","one clear action"],
["repeat for positions 2, 3, …","the loop, visible"],
["(that's selection sort!)","recognizing the pattern"]
]},
tip:{h:"When you're stuck for 15 minutes:",b:"Stop coding. Go back to Step 2 — paper and a tiny example. The bug is almost always a misunderstanding, not a typo. The recipe fixes misunderstandings."},
done:"Has a problem-solving recipe"
}
);
