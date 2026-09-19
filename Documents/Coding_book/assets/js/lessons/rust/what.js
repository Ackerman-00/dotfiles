/* ============================================
   lesson: What is programming?
   one file per lesson — edit here only
============================================ */
RUST_LESSONS.push({
id:"what", nav:"What is programming?",
title:"What is programming, <em>really?</em>",
lead:"Before any Rust — what are we doing here? Three minutes, simple words only.",
words:[
"<b>A computer is a very fast helper.</b> It follows steps exactly, from top to bottom. It cannot guess. It cannot understand hints.",
"<b>Programming</b> is writing those steps. The steps are called a <b>program</b>. Our language is <b>Rust</b>.",
"The computer only knows 0 and 1. So a tool called <b>cargo</b> changes your Rust words into 0 and 1 first. This change is called <b>compiling</b>.",
"<b>Why Rust?</b> Rust checks your code <i>before</i> it runs. If the code can break memory, Rust says no. Big teams (Discord, Microsoft, Firefox) trust it for hard jobs."
],
analogy:[["Recipe (steps to follow)","=","Program (code to run)"],["A helper that follows steps","=","Your computer"],["Translator","=","cargo (compile)"]],
tip:{h:"The golden rule of this course:",b:"The computer takes every word literally. One wrong comma = it stops. That is not failure — that is the check doing its job. Pros see errors every day. Copy the error text. Read the part after 'error'. It often tells you the fix."},
done:"What a program is"
}
);
