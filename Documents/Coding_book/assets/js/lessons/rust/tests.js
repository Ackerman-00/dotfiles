/* ============================================
   lesson: Automated tests
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"tests", nav:"Automated tests",
title:"Testing — <em>the safety net</em>",
lead:"A net under a walker: you may fall as much as you want. The net catches you.",
words:[
"A test is a small program that checks one promise. Like this: <i>you feed it 5 — does it really answer 10?</i>",
"You write <code class='inline'>#[test]</code> over a function. You run <code class='inline'>cargo test</code>. A green check means yes.",
"Three lines start every test room. <code class='inline'>#[cfg(test)]</code> means this room is only there when testing. <code class='inline'>mod tests</code> is the test room. Inside sit small functions full of <code class='inline'>assert_eq!</code>.",
"Why? Because <b>code changes</b>. One day you rewrite <code class='inline'>double()</code> in a new style. The small net warns at once: <i>you broke the 5→10 promise</i>.",
"Two more tools teams use daily. <code class='inline'>#[should_panic(expected = \"...\")]</code> passes only when the code stops with those words. And <code class='inline'>cargo test it_works</code> runs just one test by name.",
"<b>Rule:</b> <code class='inline'>assert_eq!</code> needs <code class='inline'>PartialEq + Debug</code>. Add <code class='inline'>#[derive(PartialEq, Debug)]</code> to your structs. Then the net can compare them."
],
analogy:[["A safety net","=","assert_eq! catching a broken promise"],["A practice run before the show","=","cargo test"],["A list of promise checks","=","one #[test] function each"]],
coach:"Tests look like extra lines. They are not. They are the reason you can change code fast. Pros write them first, then the code. Try that order once — it feels good.",
widget:{type:"testplay"},
code:{
copy:`#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn double_works() {
        assert_eq!(double(5), 10);
    }
}`,
lines:[
["#[cfg(test)]","'build this room only during cargo test'"],
["mod tests {","the test room"],
["    use super::*;","bring the real code in from the parent"],
["    #[test]","'this function is a promise'"],
["    fn double_works() {","a test that checks one behavior"],
["        assert_eq!(double(5), 10);","'5 in must give 10 out' — if not, the net shakes"],
["    }",""]
]},
tip:{h:"Test names tell stories:",b:"Name tests like short stories: <code class='inline'>double_works</code>, <code class='inline'>empty_string_adds_nothing</code>. When one fails, <code class='inline'>cargo test</code> shows the name. You know at once which promise broke."},
why:{kick:"why teams test first",
h:"Write the test first. Then make the code keep the promise. That order has a name: TDD.",
points:[
"<b>Tests are notes that cannot lie.</b> 'What happens for \"--file x\"?' The answer is not in a comment. It is an assert_eq! that runs.",
"<b>Change code with no fear.</b> New style, same answers — the tests say 'still good'.",
"<b>Read left to right.</b> assert_eq!(actual, wanted) is the style all use. 'double(5) must be 10'."
]},
done:"Writes tests that check the code"
}
);