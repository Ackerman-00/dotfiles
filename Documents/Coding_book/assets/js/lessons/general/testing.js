/* ============================================
   lesson: Testing — the safety net
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"testing", nav:"Testing — the safety net",
title:"Testing — <em>the safety net</em>",
lead:"A test is a tiny program that checks one claim about your code. One command runs them all: cargo test.",
words:[
"A <b>test</b> is a tiny program that makes one claim: \"when I feed <code class='inline'>add(2, 3)</code>, I expect <code class='inline'>5</code>\". If the claim is wrong, the test <b>fails</b> loudly and tells you exactly where.",
"Tests are your <b>safety net</b>. Later you'll fix a bug in one corner of your program and accidentally break something else — <i>regression</i>. Without tests, you won't notice until a user does. With tests, the net catches you instantly.",
"Mark a function with <code class='inline'>#[test]</code> and it's a test. <code class='inline'>assert_eq!(a, b)</code> means \"check these are equal\". Then run <code class='inline'>cargo test</code> and read the verdict: green for pass, red for fail.",
"The golden habit: when a bug appears, first write a test that fails because of it, then fix the code until the test passes. The bug can never come back in disguise.",
"🗣️ <b>Say it out loud:</b> <i>a test is a promise — \"feed this, expect that\" — and the net catches regressions instantly.</i>"
],
analogy:[["A safety net under a trapeze artist","=","Tests under your code"],["Checking the scale every morning","=","Rerunning tests"],["\"Expected 5, got 4!\"","=","A failing assert_eq!"],["Fixing the net before the trick","=","Test first, then fix"]],
widget:{type:"testplay"},
code:{
copy:`#[test]
fn adds_two_and_three() {
    assert_eq!(add(2, 3), 5);
}`,
lines:[
["#[test]","this function is a test — cargo test runs it"],
["fn adds_two_and_three() {","name it like a claim: adds_two_and_three"],
["    assert_eq!(add(2, 3), 5);","\"I expect add(2,3) to be 5\""],
["}","green = trust, red = a bug is caught"]
]},
tip:{h:"Test names are sentences:",b:"Name tests in plain words: <code class='inline'>fn adding_negative_numbers_errors()</code>. When a test fails, the name alone tells you what broke. And remember: code without tests is code that only <i>seems</i> to work."},
done:"Wrote my first test"
}
);
