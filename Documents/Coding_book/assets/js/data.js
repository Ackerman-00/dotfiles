/* ============================================
   data — track meta (hero text, graduation roadmap)
   lesson arrays are filled by lessons/<track>/*.js
   ADD A TRACK (C++, Python…):
     1) create assets/js/lessons/<id>/*.js (same push format)
     2) add <id>_LESSONS array above + script tags in index.html
     3) add TRACKS[id] in tracks.js + TRACK_ORDER.push("<id>")
     4) add TRACK_META[id] below (pill, short, color, projects…)
   Nothing else changes — router, search, switcher, home cards
   and progress all read TRACK_ORDER + TRACK_META.
============================================ */
var RUST_LESSONS = [];
var GENERAL_LESSONS = [];

var TRACK_META = {
  rust: {
    pillIcon:"🦀", pill:"Rust", short:"",
    color:"#ce422b", projects:true,
    name:"Rust, from zero", tag:"Ownership, lifetimes, macros, unsafe — the whole language in plain words.",
    head:"Learn Rust <span class=\"grad\">from zero</span>",
    heroP:"Forty-five lessons across five chapters, and no shortcuts past the hard part — just the hard part in plain words. Every lesson has a playground to touch, code to read line by line, and an analogy that sticks. Chapter scores count: 12 lessons to start, 11 core ideas, 10 error tools, 8 big builds, then the finale.",
    start:"Start Lesson 0", gradH:"Now go build something.",
    gradP:"Follow the proven path: the free official Rust Book (chapters 1–6), then Rustlings — tiny broken programs you fix one by one — and Rust by Example as your forever reference.",
    road:[
      ["1 · The Rust Book","Free, official. Read chapters 1–6 only — that's you, but deeper.","https://doc.rust-lang.org/book"],
      ["2 · Rustlings","Broken mini-programs you fix. The best practice there is.","https://rustlings.cool"],
      ["3 · Rust by Example","Your reference shelf. Lost? Search here.","https://doc.rust-lang.org/rust-by-example"],
      ["4 · Build something","Any tiny idea. Make it. Break it. Fix it. That's how you level up.",""]
    ]
  },
  general: {
    pillIcon:"🧠", pill:"General", short:"G",
    color:"#0e9f8a", projects:false,
    name:"Programming, from zero", tag:"Big O, sorting, trees, heaps, threads — the toolkit every developer carries.",
    head:"Learn programming <span class=\"grad\">from zero</span>",
    heroP:"Twenty lessons: threads, async, and the classic toolkit every developer carries — Big O, search, sorting, recursion, trees, graphs, heaps, and hash maps. All in plain words, with a playground in every lesson.",
    start:"Start Lesson 0", gradH:"Now go see them everywhere.",
    gradP:"Follow the proven path: practice implementing each structure yourself from scratch, then one small problem a day, and always have a visual reference open.",
    road:[
      ["1 · Practice from scratch","Write your own stack, queue, and hash map by hand — that's the real test.","https://exercism.org/tracks/rust"],
      ["2 · See it move","VisuAlgo animates every algorithm step by step. Watch before you read.","https://visualgo.net"],
      ["3 · The friendly book","Grokking Algorithms — pictures first, math never. The best first algorithms book.","https://www.manning.com/books/grokking-algorithms"],
      ["4 · Build something","A to-do app with undo (stack!), search (hash map!), paths (graph!).",""]
    ]
  }
};
