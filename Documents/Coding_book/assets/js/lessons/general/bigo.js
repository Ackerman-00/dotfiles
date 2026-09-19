/* ============================================
   lesson: Big O — how fast?
   one file per lesson — edit here only
============================================ */
GENERAL_LESSONS.push({
id:"bigo", nav:"Big O — how fast?",
title:"Big O — <em>how long will it take?</em>",
lead:"Same recipe, twice the ingredients — does it take twice as long? Or a thousand times? Big O answers in one symbol.",
words:[
"<b>Big O</b> is a label on a recipe that says what happens as the data grows. It never gives exact seconds — it gives the <b>shape of the growth</b>: does the time stay flat, climb gently, or explode?",
"<b>O(1)</b> means <i>instant, always</i>. Your locker: locker 7 is as fast as locker 700. <b>O(log n)</b> means <i>grows, but barely</i>: a billion items needs only 30 checks if you halve each time.",
"<b>O(n)</b> means <i>once per item</i> — like reading a book, page by page. <b>O(n²)</b> means <i>compare each item with every other</i>: two shopping lists of 100 items = 10,000 comparisons.",
"The letter <b>n</b> is just \"how much data\". When a pro says \"that's an O(n) algorithm\", they mean: double the data, double the time. The first question every pro asks: <i>what's the shape of this recipe?</i>",
"The lesson of Big O: the fastest recipe is useless if its shape is wrong. A sorted list lets you search in O(log n). An unsorted list only offers O(n).",
"🗣️ <b>Say it out loud:</b> <i>O(1) is a locker. O(log n) is the phone book trick. O(n) is reading pages. O(n²) is checking every pair.</i>"
],
analogy:[["Lockers: instant, always","=","O(1)"],["Halving the phone book each step","=","O(log n)"],["Reading every page","=","O(n)"],["Comparing every pair of items","=","O(n²)"]],
widget:{type:"bigo"},
code:{
copy:`// look up by index:  O(1)
let x = list[7];
// search an unsorted list:  O(n)
for item in &list { if *item == target {} }`,
lines:[
["// look up by index:  O(1)","instant — know the locker number"],
["let x = list[7];","locker 7, no searching"],
["// search an unsorted list:  O(n)","must check items one by one"],
["for item in &list {","look at each"],
["    if *item == target {}","until found — worst case, all of them"]
]},
tip:{h:"Read it like this:",b:"<b>O(1)</b> = flat line. <b>O(log n)</b> = gentle hill. <b>O(n)</b> = straight slope. <b>O(n²)</b> = a wall. When you pick a data structure, you're choosing the shape of your future."},
done:"Can read Big O"
}
);
