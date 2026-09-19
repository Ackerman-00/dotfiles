/* ============================================
   app — render engine, progress, theme, boot
============================================ */
var ROAD_ICONS = [
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>',
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>'
];

/* ============================================================
   RUST CHAPTERS (the book's growth arc, one row at a time)
   The 45 rust lessons are grouped into five chapters — that's
   how the map reads: 12 lessons to stand, 11 to talk, 10 to
   decide, 8 to build, then the finale. RZ_PHASE_AT[n] is the
   index where chapter n starts; 0-based chapter index = phase.
   ============================================================ */
var RZ_PHASES = {
  rust: {
    at: [0, 12, 23, 33, 41],
    meta: [
      { n: 1, name: "First steps", icon: "🌱", sum: "your first hello world and the blocks of every program — data, ifs, loops, functions, and one little guessing game." },
      { n: 2, name: "Core ideas", icon: "🔑", sum: "ownership, borrowing, and your own types — how Rust keeps memory safe without a trash truck." },
      { n: 3, name: "Handle errors", icon: "🛡️", sum: "errors, generics, traits, lifetimes, tests — code that the compiler checks before it runs." },
      { n: 4, name: "Build big", icon: "🚀", sum: "smart pointers, threads, async, unsafe — the parts real programs are built from." },
      { n: 5, name: "Finish", icon: "🎓", sum: "cheat sheets, the A–Z dictionary, where to go next, and the final exam." }
    ]
  }
};
/* phases are per-track: tracks without an entry (general, and any
   future language) render a flat map — no chapters, no chips. */
function rzPhaseOf(track, i){
  const P = RZ_PHASES[track];
  if (!P) return -1;
  let n = 0;
  while (n < P.at.length - 1 && i >= P.at[n + 1]) n++;
  return n;
}
function rzPhaseMeta(track, i){
  const P = RZ_PHASES[track];
  const p = rzPhaseOf(track, i);
  return (P && p >= 0) ? P.meta[p] : null;
}
function rzPhaseInline(track, i){
  const m = rzPhaseMeta(track, i);
  if (!m) return "";
  return "<span class='phase-inline'><span class='pi-ic'>" + m.icon + "</span>Chapter " + m.n + " — " + m.name + "</span>";
}
function rzPhaseDivider(track, p, lessons, done){
  const P = RZ_PHASES[track];
  if (!P) return "";
  const m = P.meta[p];
  const start = P.at[p];
  const end = p + 1 < P.at.length ? P.at[p + 1] : lessons.length;
  const n = lessons.slice(start, end).filter(L => done[L.id]).length;
  const total = end - start;
  return `
  <div class="syl-phase reveal" id="sylPhase-${m.n}">
    <div class="sp-rail">
      <span class="sp-num">${String(m.n).padStart(2, "0")}</span>
      <span class="sp-ic" aria-hidden="true">${m.icon}</span>
      <span class="sp-name">${m.name}</span>
      <span class="sp-dots" aria-hidden="true">${Array.from({length: total}, (_, k) => `<i class="${done[lessons[start + k].id] ? "on" : ""}"></i>`).join("")}</span>
    </div>
    <div class="sp-meta">${n} of ${total} done · ${m.sum}</div>
  </div>`;
}

/* ============================================================
   PROJECTS — the rust track's "zero to hero" workshop track
   (real, tested, mature projects with source; university-style tiers)
   ============================================================ */
var TIER_ORDER = ["Foundation", "Core", "Advanced", "Pro"];
var TIER_DESC = {
  "Foundation": "Your first real programs — finish these and the language stops being scary.",
  "Core": "Real tools with real state — file I/O, parsing, parallelism.",
  "Advanced": "Production patterns — async servers, templating, parsers that eat real formats.",
  "Pro": "Systems-level work — the projects that get you hired."
};
var TIER_UNLOCK = {
  "Foundation": "read and tweak any beginner Rust code — the compiler stops being scary",
  "Core": "write your own tools — files, parsing, and parallelism are no longer magic",
  "Advanced": "build production-shaped systems — async, templating, real formats",
  "Pro": "walk into an interview — systems internals from first principles"
};
var RUST_PROJECTS = [
  {
    id: "pj-minigrep", tier: "Foundation", time: "2–3 hours", crates: "std only",
    title: "minigrep", tag: "your first real CLI — search files like a pro",
    level: 1,
    goal: "Build the grep tool from the Rust Book: a command-line program that reads a query and a file and prints every matching line, with a case-insensitive flag and proper error messages for missing files.",
    use: [
      ["std only", "The whole point is NOTHING between you and the language. Every borrow-checker error is a lesson, and Rust's compiler is famously the best teacher — it literally suggests the fix. This is how the official Book teaches it."]
    ],
    pre: ["Lessons 01–16 (strings, input, if, functions, loops)", "No previous projects — this is the entrance exam"],
    skills: ["Reading the command line", "File I/O with Result", "Iterators and lifetimes", "Writing unit tests"],
    steps: ["Parse two arguments (query + path), exit with a friendly message when they're missing", "Read the file and print lines that contain the query", "Add the CASE_INSENSITIVE env flag", "Refactor with iterators and cover everything with #[test]s"],
    note: "This is the project every Rust teacher assigns first — it touches ownership, borrowing, and error handling without needing a single crate. If you can explain each line of this program, you've understood half the language.",
    src: "https://doc.rust-lang.org/book/ch12-00-an-io-project.html", srcLabel: "The Rust Book — ch 12"
  },
  {
    id: "pj-todo", tier: "Foundation", time: "3–4 hours", crates: "clap · serde",
    title: "todo-cli", tag: "a to-do list that survives reboot",
    level: 2,
    goal: "Build a command-line to-do manager with add, list, complete, and delete commands. Tasks persist to a JSON file, so your list survives restarts — your first taste of real state.",
    use: [
      ["clap", "The de-facto CLI standard — cargo itself uses it. Subcommands, flags, and --help text for free, so you spend your time on logic, not on parsing argv by hand."],
      ["serde", "Rust's official serialization layer. One attribute turns a struct into JSON — the same code every real Rust project uses for config and saved state."]
    ],
    pre: ["Lessons 01–22 (structs, enums, vecs)", "Project 01 — minigrep, done"],
    skills: ["Structs and enums", "serde serialization", "clap subcommands", "Graceful error handling"],
    steps: ["Model a Task struct and serialize it to JSON", "Add clap subcommands: add, list, done, rm", "Persist to ~/.todo.json and load it at boot", "Handle a malformed file without crashing"],
    note: "Save yourself: write the tests FIRST this time. A to-do list is small enough to fully specify, and passing tests on day one feels completely different from debugging forever.",
    src: "https://github.com/clap-rs/clap", srcLabel: "clap docs"
  },
  {
    id: "pj-webserver", tier: "Foundation", time: "4–6 hours", crates: "std only",
    title: "threaded web server", tag: "HTTP without the framework",
    level: 3,
    goal: "Build a multi-threaded web server from the Rust Book chapter 20: a TCP listener that serves HTML, handles each connection on a thread from a hand-built pool, and shuts down gracefully.",
    use: [
      ["std only", "Hand-rolling TCP + threads first means you'll never mistake the framework for the thing. When you meet axum or actix later, you'll know exactly what they're doing for you."]
    ],
    pre: ["Lessons 01–18 (ownership, borrow, structs, methods)", "Project 02 — todo-cli, done"],
    skills: ["TCP and sockets", "Threads and channels", "Arc<Mutex<T>> sharing", "Graceful shutdown patterns"],
    steps: ["Listen on 127.0.0.1:7878 and respond with a static HTML page", "Parse the request line and route GET / vs 404", "Build a ThreadPool with a worker queue", "Shut down cleanly when the pool drops"],
    note: "This is where it clicks for most students: you'll fight the borrow checker while sharing state between threads, and win. After this project, 'send to a server' is never magic again.",
    src: "https://doc.rust-lang.org/book/ch20-00-final-project-a-web-server.html", srcLabel: "The Rust Book — ch 20"
  },
  {
    id: "pj-kvs", tier: "Core", time: "6–8 hours", crates: "serde · anyhow",
    title: "kvs", tag: "a key-value store with a real log",
    level: 4,
    goal: "Build a key-value store with a set/get/rm command-line interface backed by an append-only log on disk — the same design SQLite and Redis started with. This is the exact project used in PingCAP's university course.",
    use: [
      ["serde", "Writes and reads every command to the log file — same serializer as Project 02, now doing real systems work."],
      ["anyhow", "Error handling for binaries: human-friendly errors with context (where, what, why), zero boilerplate. The standard choice for tools that people actually run."]
    ],
    pre: ["Lessons 01–27 (errors, generics, traits)", "The whole Foundation tier — projects 01–03"],
    skills: ["Log-structured storage", "serde + file I/O", "Command design", "Integration tests"],
    steps: ["In-memory HashMap with set/get/rm CLI commands", "Append every command to a log file and replay it on boot", "Compaction: rewrite the log when stale entries pass a threshold", "Ship an integration test that exercises the whole lifecycle"],
    note: "The 'log' idea here is one of the most important in systems programming — Redis, Kafka, and countless databases are logs with clever indexes on top. You'll walk out understanding why.",
    src: "https://github.com/pingcap/talent-plan", srcLabel: "PingCAP Talent Plan (kvs project)"
  },
  {
    id: "pj-calc", tier: "Core", time: "4–6 hours", crates: "pest",
    title: "calc", tag: "a calculator that understands grammar",
    level: 5,
    goal: "Write a calculator that parses and evaluates arithmetic expressions with precedence, parentheses, variables, and functions — the gateway to every parser and compiler you'll ever write.",
    use: [
      ["pest", "Grammar-based parsing: you write the grammar, pest generates the parser — the closest thing to 'the textbook way' without hand-rolling a lexer."],
      ["std only for the evaluator", "An AST evaluated with match and enums is pure language — no crates hiding the interesting part."]
    ],
    pre: ["Lessons 01–20 (match, enums, methods)", "Project 04 — kvs, done"],
    skills: ["Grammar design", "Parser combinators (pest)", "Abstract syntax trees", "Unit-testing a parser"],
    steps: ["Parse + - * / with correct precedence using pest", "Evaluate a tree with an interpreter", "Add variables (x = 5; x * 2)", "Add functions like sin() and cos()"],
    note: "Parsers scare people until they've written one. Then they're the easiest thing in the world and you'll never read a config format the same way again.",
    src: "https://pest.rs", srcLabel: "pest.rs"
  },
  {
    id: "pj-thumbs", tier: "Core", time: "4–6 hours", crates: "image · rayon",
    title: "thumbs", tag: "a parallel thumbnail factory",
    level: 6,
    goal: "Build a CLI that walks a folder tree, resizes every image into a thumbnails/ directory — and make it fast with rayon's parallel iterators. Slow at first, fast after one line.",
    use: [
      ["image", "The standard Rust image crate — decode, resize, and encode every common format with one API. What every real image tool sits on."],
      ["rayon", "One line of parallelism: par_iter() instead of iter() is how every real Rust tool gets multi-core speed without spawning a single thread yourself."]
    ],
    pre: ["Lessons 01–32 (iterators, closures, errors)", "Project 05 — calc, done"],
    skills: ["Binary file I/O", "The image crate", "rayon parallelism", "Walking directories"],
    steps: ["Walk a folder and resize images into thumbnails/", "Handle unsupported files with warnings, not crashes", "Parallelize with rayon's par_iter", "Recurse into subfolders and add a --quality flag"],
    note: "Try it single-threaded first, time it, then add rayon. Feeling a 8x speedup from one line of code is the moment parallelism stops being a scary word.",
    src: "https://github.com/image-rs/image", srcLabel: "image crate"
  },
  {
    id: "pj-ssg", tier: "Advanced", time: "6–10 hours", crates: "pulldown-cmark · tera",
    title: "ssg", tag: "a static site generator",
    level: 7,
    goal: "Build a static site generator: Markdown posts in, a full website out — templates, an index page, and an RSS feed. Zola and mdBook started as exactly this.",
    use: [
      ["pulldown-cmark", "The same Markdown parser GitHub and mdBook use — battle-tested and spec-complete, so your output is right on day one."],
      ["tera", "Handlebars-style templates with layouts and inheritance — the askama alternative if you prefer compile-time-checked templates."]
    ],
    pre: ["Lessons 01–32 (files, errors, iterators)", "The whole Core tier — projects 04–06"],
    skills: ["Markdown parsing", "Template rendering", "Build pipelines", "CLI ergonomics"],
    steps: ["Convert Markdown to HTML with pulldown-cmark", "Render posts through a Tera template", "Generate an index page listing every post", "Add an RSS feed and a --watch flag"],
    note: "This project teaches 'turning input files into output files' — which is what every compiler, bundler, and CI pipeline actually does. It's a taste of being a tool-builder, not a tool-user.",
    src: "https://github.com/pulldown-cmark/pulldown-cmark", srcLabel: "pulldown-cmark"
  },
  {
    id: "pj-parser", tier: "Advanced", time: "6–10 hours", crates: "nom",
    title: "ini-parser", tag: "eat file formats with nom",
    level: 8,
    goal: "Write a parser for a real file format — start with INI, then JSON, then CSV — using the nom parser-combinator library. File parsers are the classic 'if you can build this you know Rust' project.",
    use: [
      ["nom", "Parser combinators — small, reusable functions that compose into a full format parser. The ecosystem uses it for everything from TOML to binary formats."]
    ],
    pre: ["Lessons 01–25, especially errors and files", "Project 07 — ssg, done"],
    skills: ["Parser combinators", "Nom and error recovery", "Format edge cases", "Fuzzing your own parser"],
    steps: ["Parse INI files: sections, keys, comments", "Add error messages that point at the line number", "Handle JSON: strings, escapes, nested objects", "Stress-test with malformed input until it never panics"],
    note: "Every company has a pile of weird legacy files that need parsing. The person who can calmly say 'give me the spec' writes their own ticket.",
    src: "https://github.com/rust-bakery/nom", srcLabel: "nom"
  },
  {
    id: "pj-chat", tier: "Advanced", time: "8–12 hours", crates: "tokio",
    title: "chat", tag: "an async chat server",
    level: 9,
    goal: "Build a multi-client chat server with tokio: every connection gets its own task, messages broadcast to every other client, and nobody ever blocks the event loop. The official tokio tutorial project, made yours.",
    use: [
      ["tokio", "The async runtime Rust's entire web ecosystem is built on — axum, reqwest, everything sits on tokio. Learning it here is learning the foundation of production Rust."],
      ["tokio::sync::broadcast", "Multi-consumer channels — the exact primitive real chat and event systems use to fan messages out."]
    ],
    pre: ["Lessons 01–39 (threads, dyn, unsafe, crates)", "Project 08 — ini-parser, done"],
    skills: ["async/await", "tokio tasks", "Broadcast channels", "Protocol design"],
    steps: ["Accept connections on a TcpListener", "Handle each client in a spawned task", "Broadcast messages with a broadcast channel", "Handle disconnects and clean shutdown"],
    note: "Async scares people because it's invisible. This project makes it visible: you'll SEE the difference between blocking and awaiting. Rust async is a different world from JS callbacks — this is the key.",
    src: "https://github.com/tokio-rs/tokio", srcLabel: "tokio tutorial"
  },
  {
    id: "pj-chain", tier: "Pro", time: "10–16 hours", crates: "sha2 · serde",
    title: "minichain", tag: "a blockchain you can mine",
    level: 10,
    goal: "Implement a working blockchain: blocks with hashes, proof-of-work mining, and chain validation. Not a toy clone — the real algorithms, small enough to hold in your head.",
    use: [
      ["sha2", "The audited RustCrypto SHA-256 — production-grade hashing, not a toy implementation. This is the same code real chains and systems use."],
      ["serde", "Persist blocks to disk as JSON — you already know it from Project 02; watch it scale to a real data structure."]
    ],
    pre: ["Everything — traits, generics, errors, files, at peace", "The whole Advanced tier — projects 07–09"],
    skills: ["Hashing (sha2)", "Proof-of-work", "Chain validation", "Serde persistence"],
    steps: ["Block struct: index, timestamp, data, hash, previous hash", "Mine blocks by finding a hash with N leading zeros", "Validate an incoming chain — reject tampering", "Persist the chain and add transactions to blocks"],
    note: "After this, whenever someone in a meeting says 'we need blockchain', you can politely explain what it actually is. That alone is worth the weekend.",
    src: "https://github.com/RustCrypto/hashes", srcLabel: "sha2 (RustCrypto)"
  },
  {
    id: "pj-kernel", tier: "Pro", time: "20–40 hours", crates: "no_std · bootloader",
    title: "kernel", tag: "boot an operating system of your own",
    level: 11,
    goal: "Follow the legendary blog_os series and write a real OS kernel: bootloader, VGA text output, interrupts, and finally a heap allocator. The most respected learning project in the entire Rust ecosystem.",
    use: [
      ["bootloader", "Phil Oppermann's battle-tested bootloader crate — it handles the impossible part (multiboot, paging setup) so you spend your energy on OS logic."],
      ["no_std", "Everything you learn here — no heap, no std, raw interrupts — is exactly what embedded Rust engineers do every day."]
    ],
    pre: ["The whole path, calmly — this is a marathon, not a sprint", "Project 10 — minichain, done"],
    skills: ["no_std programming", "Interrupt handling", "Memory and heap allocators", "Reading specs and hardware docs"],
    steps: ["Boot a freestanding binary with the bootloader crate", "Print to the VGA text buffer", "Handle interrupts and exceptions", "Implement a linked-list heap allocator"],
    note: "Nobody finishes this and remains a junior. It is long, it is hard, and it is the single strongest signal on any Rust resume. Do one chapter a week — it's the university capstone, for free.",
    src: "https://github.com/phil-opp/blog_os", srcLabel: "Writing an OS in Rust"
  },
  {
    id: "pj-lint", tier: "Pro", time: "15–30 hours", crates: "clap · syn",
    title: "mini-lint", tag: "a linter for a toy language",
    level: 12,
    goal: "Build a linter: tokenize a small language, parse it into an AST, run rule checks that flag common mistakes, and report them with line numbers. The architecture of clippy, in miniature.",
    use: [
      ["syn", "The de-facto Rust source-parsing crate — how proc macros and clippy itself read code. You're using the exact library that powers the Rust toolchain."],
      ["clap", "CLI ergonomics for your tool — the standard from Project 02, now in a developer tool."]
    ],
    pre: ["The whole path, calmly", "Project 11 — kernel (or run them in parallel)"],
    skills: ["Tokenizing and lexing", "AST design", "Rule engines", "Tooling UX"],
    steps: ["Lexer: tokens with positions for a toy language", "Parser: build a small AST", "Rules: unused variable, shadowing, unreachable code", "Report findings with line numbers and fix suggestions"],
    note: "Linters are the friendliest introduction to compiler tech — the input is real code, the output is genuinely useful, and you'll use it every day forever. Ship this and you've built a developer tool.",
    src: "https://github.com/rust-lang/rust-clippy", srcLabel: "clippy (inspiration)"
  }
];
function projectsByTier(){
  const m = {};
  RUST_PROJECTS.forEach(p => (m[p.tier] = m[p.tier] || []).push(p));
  return m;
}

function homeCard(tr){
  const t = TRACKS[tr];
  const meta = TRACK_META[tr] || {};
  return `
  <a class="track-card" data-track-card="${tr}" id="homeCard-${tr}" href="#${tr}" style="--track-accent:${meta.color || "var(--violet)"}">
    <div class="tc-top"><span class="tc-ic">${meta.pillIcon || "📚"}</span><span class="tc-num">${t.length} lessons</span><span class="tc-arrow">↗</span></div>
    <h3>${meta.name || meta.pill || tr}</h3>
    <p>${meta.tag || ""}</p>
    <div class="tc-progress"><div class="tc-bar"><div class="tc-fill" id="homeFill-${tr}"></div></div><span class="tc-pct" id="homePct-${tr}">0%</span></div>
    <span class="tc-cta" id="homeCta-${tr}">Start the path →</span>
  </a>`;
}

/* ============================================================
   HOME — the portal page: search + the two path cards, nothing else
   (no lessons live here — that's the wiki "portal page" pattern)
============================================================ */
function homeHtml(){
  const order = trackList();
  const all = order.flatMap(tr => TRACKS[tr]);
  return `
  <section class="hero home-hero" id="home">
    <div class="hero-pill reveal"><span class="dot"></span> ${all.length} lessons · ${order.length} paths · zero knowledge needed</div>
    <h1 class="reveal">Learn to code <span class="grad">from zero</span></h1>
    <p class="reveal">${order.length} paths, one promise: every hard idea — ownership, heaps, async — explained like a bedtime story, with a playground to touch and code to read line by line.</p>
    <div class="search-wrap reveal">
      <div class="search-box">
        <svg class="search-ic" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input id="searchInput" type="text" placeholder="Search all ${all.length} lessons — try “ownership”, “big o”, “threads”" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="false" aria-controls="searchResults" aria-autocomplete="list" aria-label="Search lessons across all paths">
        <span class="search-kbd"><kbd>Ctrl K</kbd></span>
      </div>
      <div class="search-results" id="searchResults" role="listbox" aria-label="Lesson results"></div>
    </div>
    <div class="home-bento reveal">${order.map(homeCard).join("")}</div>
    <div class="home-features reveal">
      <div class="hf"><span>📖</span><b>Plain words</b><p>No hard words. Ever.</p></div>
      <div class="hf"><span>🧩</span><b>Playgrounds</b><p>${all.filter(L => L.widget).length} things to touch.</p></div>
      <div class="hf"><span>🗺️</span><b>Analogies</b><p>Life → code maps.</p></div>
      <div class="hf"><span>✅</span><b>Progress saved</b><p>Right in this browser.</p></div>
    </div>
    <div class="hero-stats reveal">
      <div class="stat"><b>${all.length}</b><span>lessons</span></div>
      <div class="stat"><b>${all.filter(L => L.widget).length}</b><span>playgrounds</span></div>
      <div class="stat"><b>0</b><span>prior knowledge needed</span></div>
    </div>
  </section>`;
}

function renderHome(){
  RZ_TIMERS.forEach(clearInterval);
  RZ_TIMERS.length = 0;
  document.body.dataset.page = "home";
  sidebar.innerHTML = "";
  main.innerHTML = homeHtml();
  const bar = $("#progressbar"), pct = $("#pct");
  if (bar) bar.style.width = "0%";
  if (pct) pct.textContent = "—";
  setHomeProgress();
  initSearch();
  observeAll();
  document.title = "Learn to Code from Zero";
  announcePage("Home");
  scrollTopInstant();
}

/* ============================================================
   TRACK OVERVIEW — #rust / #general: the course map.
   One row per lesson; clicking opens that lesson on its own
   page (2026 e-learning pattern: syllabus + Next navigation)
   ============================================================ */
function rzReadMins(L){
  /* ~200 wpm over the lesson's own prose (words + tips + cards) */
  let n = 0;
  const grab = s => { n += String(s == null ? "" : s).replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length; };
  (L.words || []).forEach(grab);
  if (L.tip){ grab(L.tip.h); grab(L.tip.b); }
  if (L.coach) grab(L.coach);
  if (L.why){ grab(L.why.h); (L.why.points || []).forEach(grab); }
  if (L.widget && L.widget.q) L.widget.q.forEach(q => { grab(q.q); grab(q.a); });
  return Math.max(1, Math.round(n / 200));
}
function trackRow(L, i, done, ph){
  const isDone = !!done[L.id];
  const chip = (ph != null && ph >= 0) ? rzPhaseChip(currentTrack, ph) : "";
  return `
  <a class="syl-row reveal${isDone ? " done" : ""}" id="syl-${L.id}" href="#${currentTrack}/${L.id}" style="--ri:${i}">
    <span class="syl-num">${isDone ? "✓" : String(i).padStart(2, "0")}</span>
    <span class="syl-main">
      <span class="syl-title">${esc(L.title)}${chip}</span>
      <span class="syl-lead">${esc(L.lead)}</span>
    </span>
    <span class="syl-badges">
      ${L.widget ? '<span class="syl-chip w">🧩 playground</span>' : ""}
      <span class="syl-chip min">~${rzReadMins(L)} min</span>
      <span class="syl-chip">${isDone ? "done" : "lesson " + i}</span>
      <span class="syl-arrow">→</span>
    </span>
  </a>`;
}
function rzPhaseChip(track, ph){
  const m = (RZ_PHASES[track] || {}).meta;
  if (!m || !m[ph]) return "";
  return ` <span class="syl-chip ph">${m[ph].icon} ${m[ph].name}</span>`;
}
function rzCrumbChapter(track, i){
  const m = rzPhaseMeta(track, i);
  return m ? `${m.icon} Chapter ${m.n} — ` : "";
}
function rzHeadEyebrow(track, i){
  const m = rzPhaseMeta(track, i);
  return m ? `${m.icon} ${m.name} — Lesson ${i}` : `Lesson ${i}`;
}
function renderTrack(){
  RZ_TIMERS.forEach(clearInterval);
  RZ_TIMERS.length = 0;
  document.body.dataset.page = currentTrack;
  rzSyncTrackChrome();
  const lessons = TRACKS[currentTrack];
  const meta = TRACK_META[currentTrack];
  let done = {};
  try { done = JSON.parse(localStorage.getItem("rz-progress-" + currentTrack)) || {}; } catch(e){}

  renderSidebar();

  main.innerHTML = `
  <section class="track-head reveal">
    <nav class="crumbs reveal" aria-label="Breadcrumb">
      <a class="crumb" href="#home"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span>Home</span></a>
      <span class="cr-sep">›</span>
      <span class="crumb current">${meta.pillIcon} ${meta.pill} path</span>
    </nav>
    <div class="hero-panel">
      <div class="hero-glass">
        <h1>${meta.head}</h1>
        <p>${meta.heroP}</p>
        <div class="hero-cta">
          <a class="btn btn-primary" href="#${currentTrack}/${lessons[0].id}">${meta.start}</a>
          ${lessons.some(L => L.id === "quiz") ? `<a class="btn btn-ghost" href="#${currentTrack}/quiz">Skip to the quiz</a>` : ""}
          ${meta.projects ? `<a class="btn btn-ghost" href="#${currentTrack}/projects">Projects →</a>` : ""}
        </div>
        <div class="hero-stats">
          <span class="stat-chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>${lessons.length} lessons</span>
          <span class="stat-chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>a playground almost every lesson</span>
          <span class="stat-chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3Z"/></svg>zero setup</span>
        </div>
      </div>
    </div>
  </section>
  <section class="syl-list reveal">
    <div class="syl-head">
      <div>
        <span class="eyebrow">the course map</span>
        <h2 class="serif">${meta.pill} path — ${lessons.length} lessons</h2>
      </div>
      <span class="syl-count" id="sylCount"></span>
    </div>
    <div class="syl-rows" id="sylRows">${lessons.map((L, i) => {
      const ph = rzPhaseOf(currentTrack, i);
      const div = ph > 0 && ph !== rzPhaseOf(currentTrack, i - 1) ? rzPhaseDivider(currentTrack, ph, lessons, done) : "";
      return div + trackRow(L, i, done, ph);
    }).join("")}</div>
  </section>`;

  // graduation + roadmap — the finish line lives on the map
  const grad = document.createElement("div");
  grad.className = "graduation reveal";
  grad.innerHTML = `
    <div class="g-ic"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21 1.18.54 2.03 2.03 2.03 3.79"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></div>
    <h2>${meta.gradH}</h2>
    <p>${meta.gradP}</p>
    <div class="road">
      ${meta.road.map((r, ri) => `
      <div class="road-node"><div class="road-dot">${ROAD_ICONS[ri]}</div><h4>${r[0]}</h4><p>${r[1]}</p>${r[2] ? `<button class="road-btn" data-url="${r[2]}">Open →</button>` : ""}</div>`).join("")}
    </div>
  `;
  main.appendChild(grad);

  initProgress(currentTrack);
  initSearch();
  observeAll();
  const sc = $("#sylCount");
  if (sc) sc.textContent = lessons.filter(x => done[x.id]).length + " of " + lessons.length + " done";
  titleFromHeading();
  announcePage(meta.pill + " path");
  if (vtBooted) focusPageHeading();
}

/* ============================================================
   LESSON PAGE — #rust/<id> / #general/<id>: ONE topic per page
   with Prev / "Mark done & continue" / Next navigation
   ============================================================ */
function renderLesson(id){
  RZ_TIMERS.forEach(clearInterval);
  RZ_TIMERS.length = 0;
  searchCloser = null;
  document.body.dataset.page = currentTrack;
  rzSyncTrackChrome();
  const lessons = TRACKS[currentTrack];
  const meta = TRACK_META[currentTrack];
  const i = Math.max(0, lessons.findIndex(L => L.id === id));
  const L = lessons[i];
  const prev = i > 0 ? lessons[i - 1] : null;
  const next = i < lessons.length - 1 ? lessons[i + 1] : null;

  renderSidebar();

  main.innerHTML = `
  <section class="lesson-page">
    <nav class="crumbs reveal" aria-label="Breadcrumb">
      <a class="crumb" href="#home"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span>Home</span></a>
      <span class="cr-sep">›</span>
      <a class="crumb" href="#${currentTrack}">${meta.pillIcon} ${meta.pill} path</a>
      <span class="cr-sep">›</span>
      <span class="crumb current">${rzCrumbChapter(currentTrack, i)}Lesson ${i}</span>
    </nav>
    <h1 class="sr-only">${esc(L.title)}</h1>
    <div class="lp-bar-row reveal">
      <span class="lp-count">Lesson ${i} of ${lessons.length}</span>
      <div class="lp-bar"><div class="lp-fill" id="lpFill"></div></div>
      <span class="lp-pct" id="lpPct">0%</span>
    </div>
  </section>`;

  main.appendChild(lessonEl(L, i));

  const end = document.createElement("div");
  end.className = "lesson-end reveal";
  end.innerHTML = `
    <div class="le-nav">
      ${prev ? `<a class="btn btn-ghost le-prev" href="#${currentTrack}/${prev.id}"><span class="le-dir">←</span><span><b>${esc(prev.nav)}</b><small>previous lesson</small></span></a>` : '<span class="le-spacer"></span>'}
      <button class="btn btn-primary le-next" data-done="${L.id}" data-next="${next ? currentTrack + "/" + next.id : ""}">
        ${next ? "<span>Mark done & continue</span><span class='le-arr'>→</span>" : "<span>Track complete 🎓</span>"}
      </button>
      ${next ? `<a class="btn btn-ghost le-after" href="#${currentTrack}/${next.id}"><span><b>${esc(next.nav)}</b><small>next lesson</small></span><span class="le-dir">→</span></a>` : `<a class="btn btn-ghost le-after" href="#${currentTrack}"><span><b>Review the map</b><small>back to the course</small></span></a>`}
    </div>`;
  main.appendChild(end);
  end.querySelector(".le-next").addEventListener("click", () => {
    const KEY = "rz-progress-" + currentTrack;
    let done = {};
    try { done = JSON.parse(localStorage.getItem(KEY)) || {}; } catch(err){}
    if (!done[L.id]){
      done[L.id] = true;
      try { localStorage.setItem(KEY, JSON.stringify(done)); } catch(err){}
      confetti(end.querySelector(".le-next"));
    }
    go(next ? "#" + currentTrack + "/" + next.id : "#" + currentTrack);
  });

  const doneState = initProgress(currentTrack);
  initAllWidgets([L]);
  observeAll();
  const pct = $("#lpPct"), fill = $("#lpFill");
  if (pct && fill){
    const n = lessons.filter(x => doneState[x.id]).length;
    const pctV = Math.round(n / lessons.length * 100);
    fill.style.width = pctV + "%";
    pct.textContent = pctV + "%";
  }
  document.title = "Lesson " + i + " — " + stripTags(L.title) + " · Learn to Code from Zero";
  announcePage("Lesson " + i + ": " + stripTags(L.title));
  if (vtBooted) focusPageHeading();
}

/* ============================================================
   SIDEBAR + DRAWER — shared by path pages and project pages
============================================================ */
function renderSidebar(){
  const lessons = TRACKS[currentTrack];
  const meta = TRACK_META[currentTrack];
  const prevDD = sidebar.querySelector(".side-dd");
  const ddWasOpen = prevDD ? prevDD.open : false;
  sidebar.innerHTML = "";

  // sidebar header — progress strip (the % lives only in the nav bar; here: bar + counts + next step)
  const head = document.createElement("div");
  head.className = "side-progress";
  head.innerHTML = `
    <div class="sp-top"><span class="sp-count" id="pcount">0 of ${lessons.length} done</span></div>
    <div class="sp-bar"><div class="sp-fill" id="pbar-fill"></div></div>
    <a class="sp-next" id="pnext" href="#${currentTrack}/${lessons[0].id}">
      <span class="spn-eyebrow">Up next</span>
      <span class="spn-title">${esc(lessons[0].nav)}</span>
      <span class="spn-arrow">→</span>
    </a>`;
  sidebar.appendChild(head);
  sidebar.appendChild(Object.assign(document.createElement("h4"), { textContent: "Lessons" }));

  // sidebar — the numbered path: done → ✓, first undone → "up next" pill, current → active
  lessons.forEach((L, i) => {
    const s = document.createElement("a");
    s.setAttribute("href", "#" + currentTrack + "/" + L.id);
    s.innerHTML = '<span class="s-num">' + String(i).padStart(2,"0") + '</span>' + esc(L.nav) + '<span class="s-ck">✓</span><span class="s-next">up next</span>';
    sidebar.appendChild(s);
  });

  // projects dropdown — any track with meta.projects gets a workshop track
  if (TRACK_META[currentTrack] && TRACK_META[currentTrack].projects){
    const byTier = projectsByTier();
    const dd = document.createElement("details");
    dd.className = "side-dd";
    dd.innerHTML = "<summary>" + ROAD_ICONS[1] + "<span>Projects</span><span class='sdd-count'>" + RUST_PROJECTS.length + "</span><svg class='sdd-chev' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg></summary>" +
      TIER_ORDER.map(t =>
        '<div class="sdd-tier">' + t + '</div>' +
        byTier[t].map(p => '<a class="sdd-link" href="#' + currentTrack + '/project/' + p.id + '">' + esc(p.title) + '</a>').join("")
      ).join("");
    if (ddWasOpen) dd.open = true;   // keep the dropdown open across route changes
    sidebar.appendChild(dd);
  }

  // mobile drawer — same path as the sidebar, glass drawer for small screens
  $("#drawerIcon").textContent = meta.pillIcon;
  $("#drawerTitle").textContent = meta.pill + " path";
  $("#drawerSub").textContent = lessons.length + " lessons";
  const dl = $("#drawerList");
  dl.innerHTML = "";
  lessons.forEach((L, i) => {
    const s = document.createElement("a");
    s.setAttribute("href", "#" + currentTrack + "/" + L.id);
    s.innerHTML = '<span class="s-num">' + String(i).padStart(2,"0") + '</span>' + esc(L.nav) + '<span class="s-ck">✓</span><span class="s-next">up next</span>';
    dl.appendChild(s);
  });
  const dnext = $("#lessonDrawer").querySelector(".sp-next");
  dnext.setAttribute("href", "#" + currentTrack + "/" + lessons[0].id);
  dnext.querySelector(".spn-title").textContent = lessons[0].nav;
}

/* ============================================================
   PROJECT PAGES — #rust/projects and #rust/project/<id>
============================================================ */
function projectCard(p, n){
  return `
  <a class="pj-card reveal" href="#${currentTrack}/project/${p.id}" style="--ri:${n}">
    <div class="pj-card-top">
      <span class="pj-level">Level ${String(n).padStart(2, "0")}</span>
      <span class="pj-tier-chip">${p.tier}</span>
    </div>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.tag)}</p>
    <div class="pj-skills">${p.skills.slice(0, 3).map(s => "<span>" + esc(s) + "</span>").join("")}</div>
    <span class="pj-card-cta"><span>Start this project</span><span class="pj-arr">→</span></span>
  </a>`;
}
function renderProjects(){
  RZ_TIMERS.forEach(clearInterval);
  RZ_TIMERS.length = 0;
  searchCloser = null;
  document.body.dataset.page = currentTrack;
  rzSyncTrackChrome();
  renderSidebar();
  const meta = TRACK_META[currentTrack] || {};
  const byTier = projectsByTier();
  let n = 0;
  main.innerHTML = `
  <section class="track-head reveal">
    <nav class="crumbs reveal" aria-label="Breadcrumb">
      <a class="crumb" href="#home"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span>Home</span></a>
      <span class="cr-sep">›</span>
      <a class="crumb" href="#${currentTrack}">${meta.pillIcon} ${meta.pill} path</a>
      <span class="cr-sep">›</span>
      <span class="crumb current">Projects</span>
    </nav>
    <div class="hero-panel">
      <div class="hero-glass">
        <h1>Projects — <span class="grad">zero to hero</span></h1>
        <p>Twelve projects, one ladder: every rung tells you exactly which lessons you need, which crate to use and why, and what you'll be able to do when you climb off. Small steps in, professional developer out.</p>
        <div class="hero-stats">
          <span class="stat-chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>12 projects · 12 levels</span>
          <span class="stat-chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>~1 month to useful · 3 to comfortable · 6 to hired</span>
          <span class="stat-chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>every project real, tested, and linked</span>
        </div>
      </div>
    </div>
  </section>` +
  TIER_ORDER.map(t => `
  <section class="pj-tier reveal" id="tier-${t.toLowerCase()}">
    <div class="pj-tier-head">
      <span class="pj-tier-badge">${TIER_ORDER.indexOf(t) + 1}</span>
      <div><h2>${t}</h2><p>${TIER_DESC[t]}</p></div>
    </div>
    <div class="pj-unlock">🏁 Climb off this rung → you can <b>${TIER_UNLOCK[t]}</b></div>
    <div class="pj-grid">${byTier[t].map(p => projectCard(p, ++n)).join("")}</div>
  </section>`).join("");
  initProgress(currentTrack);
  observeAll();
  document.title = "Projects — Learn to Code from Zero";
  announcePage("Projects");
  if (vtBooted) focusPageHeading();
  scrollTopInstant();
}
function renderProject(id){
  RZ_TIMERS.forEach(clearInterval);
  RZ_TIMERS.length = 0;
  searchCloser = null;
  document.body.dataset.page = currentTrack;
  rzSyncTrackChrome();
  renderSidebar();
  const meta = TRACK_META[currentTrack] || {};
  const p = RUST_PROJECTS.find(x => x.id === id) || RUST_PROJECTS[0];
  main.innerHTML = `
  <section class="track-head reveal">
    <nav class="crumbs reveal" aria-label="Breadcrumb">
      <a class="crumb" href="#home"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span>Home</span></a>
      <span class="cr-sep">›</span>
      <a class="crumb" href="#${currentTrack}">${meta.pillIcon} ${meta.pill} path</a>
      <span class="cr-sep">›</span>
      <a class="crumb" href="#${currentTrack}/projects">Projects</a>
      <span class="cr-sep">›</span>
      <span class="crumb current">${esc(p.title)}</span>
    </nav>
    <div class="hero-panel">
      <div class="hero-glass">
        <h1>${esc(p.title)}</h1>
        <p>${esc(p.tag)}</p>
        <div class="mini-chips">
          <span class="mini-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="M12 8v4M9 10h6"/></svg>Level ${String(p.level).padStart(2, "0")} · ${p.tier}</span>
          <span class="mini-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>${p.time}</span>
          <span class="mini-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>uses ${p.crates}</span>
        </div>
        <div class="hero-cta">
          <a class="btn btn-primary" href="${p.src}" target="_blank" rel="noopener">Start building <span class="btn-arr">↗</span></a>
          <a class="btn btn-ghost" href="#${currentTrack}/projects">← All projects</a>
        </div>
      </div>
    </div>
  </section>
  <section class="pj-body reveal">
    <div class="plain-card">
      <h3><span class="ic">🎯</span> The goal</h3>
      <p>${esc(p.goal)}</p>
    </div>
    <div class="pj-block pj-use">
      <h3>What you'll use — and why</h3>
      <div class="pj-use-list">${p.use.map(([name, why]) => '<div class="pj-use-row"><code class="pj-use-name">' + esc(name) + '</code><p>' + esc(why) + '</p></div>').join("")}</div>
    </div>
    <div class="pj-block pj-pre">
      <h3>Before you start</h3>
      <div class="pj-pre-list">${p.pre.map(x => '<span class="pj-pre-chip">✓ ' + esc(x) + '</span>').join("")}</div>
    </div>
    <div class="pj-block map-card">
      <h3>Why this makes you a better dev</h3>
      <div class="pj-skills pj-skills-lg">${p.skills.map(s => "<span>" + esc(s) + "</span>").join("")}</div>
    </div>
    <div class="pj-block">
      <h3>Milestones</h3>
      <div class="pj-steps">${p.steps.map((s, i) => '<div class="pj-step" style="--ri:' + i + '"><span class="pj-step-num">' + (i + 1) + '</span><p>' + esc(s) + '</p></div>').join("")}</div>
    </div>
    <div class="pj-block pj-note">
      <h3>👨‍🏫 Mentor's note</h3>
      <p>${esc(p.note)}</p>
    </div>
  </section>`;
  initProgress(currentTrack);
  observeAll();
  document.title = p.title + " — Projects · Learn to Code from Zero";
  announcePage("Project: " + p.title);
  if (vtBooted) focusPageHeading();
  scrollTopInstant();
}

/* ============================================================
   ROUTER — hash pages, wiki-style:
     #home              → portal page (default)
     #<track>           → path page, top (any TRACK_ORDER track)
     #<track>/<id>      → path page, scrolled to that lesson
     #<track>/projects  → that track's workshop (meta.projects)
     #<track>/project/<id> → one project's brief + milestones
     #<id> (legacy)     → resolved across all paths, in order
============================================================ */
var page = null;
var lastHash = null;
function parseHash(h){
  h = String(h || "").replace(/^#/, "");
  if (!h || h === "home") return { page: "home" };
  const order = trackList();
  if (order.includes(h)) return { page: "track", track: h };
  for (const tr of order){
    if (h === tr + "/projects" && TRACK_META[tr] && TRACK_META[tr].projects) return { page: "projects", track: tr };
  }
  for (const tr of order){
    if (h.indexOf(tr + "/project/") === 0){
      const id = h.slice((tr + "/project/").length);
      if (RUST_PROJECTS.some(p => p.id === id)) return { page: "project", track: tr, id };
    }
  }
  const parts = h.split("/");
  if (parts.length === 2 && order.includes(parts[0])){
    if (TRACKS[parts[0]].some(L => L.id === parts[1])) return { page: "lesson", track: parts[0], id: parts[1] };
  }
  for (const tr of order){
    if (TRACKS[tr].some(L => L.id === h)) return { page: "lesson", track: tr, id: h };
  }
  return { page: "home" };
}
function route(hash){
  hash = hash || "#home";
  if (hash === lastHash) return;
  lastHash = hash;
  const r = parseHash(hash);
  if (r.page === "home"){
    if (page !== "home") transRender(renderHome);
    page = "home";
  } else if (r.page === "projects"){
    if (page !== "projects"){
      currentTrack = r.track;
      transRender(renderProjects);
      page = "projects";
    }
  } else if (r.page === "project"){
    if (page !== "project-" + r.id){
      currentTrack = r.track;
      transRender(() => renderProject(r.id));
      page = "project-" + r.id;
    }
  } else if (r.page === "lesson"){
    const key = "lesson-" + r.track + "-" + r.id;
    if (page !== key){
      currentTrack = r.track;
      transRender(() => renderLesson(r.id), lessonDir(r.track, r.id));
      page = key;
    }
  } else {
    if (page !== r.track){
      currentTrack = r.track;
      transRender(renderTrack);
      scrollTopInstant();
      page = r.track;
    }
  }
}
/* in-app navigation: update the URL (fires hashchange in a real browser,
   which is a no-op re-render thanks to lastHash) and route immediately */
function go(hash){
  location.hash = hash;
  route(hash);
}

/* route changes must jump instantly, never smooth-glide (html has
   scroll-behavior:smooth for same-page lesson jumps) */
function scrollTopInstant(){
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

/* ============================================================
   PREMIUM LAYER — native View Transitions on route change,
   route meta (tab title + aria-live announce), and above-fold
   reveal sync so the new page snapshot is never blank
   ============================================================ */
var vtBooted = false;
var mqReduce = null;
function reduceMotion(){
  if (!mqReduce && window.matchMedia) mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mqReduce ? mqReduce.matches : false;
}
function revealVisible(){
  const els = main.querySelectorAll(".reveal:not(.in)");
  const h = window.innerHeight;
  for (let i = 0; i < els.length; i++){
    const r = els[i].getBoundingClientRect();
    if (r.top < h && r.bottom > 0) els[i].classList.add("in");
  }
}
var vtBusy = false;
/* The browser applies the content group's box (width/height/transform) as
   INLINE styles and morphs width+height between old and new by default —
   that height morph is the vertical "squeeze". Inline styles beat plain
   author CSS, so every pinned value here is !important: the group is forced
   to exactly the OUTGOING main rect (position via transform), the old
   snapshot fills it 1:1, and the new snapshot is its own size, positioned
   by the vtShimIn keyframes (rise/slide + rect delta baked in). With the
   group static and snapshots pixel-exact, no engine can stretch or squash. */
var vtShim = null;
function vtShimRect(oldRect, newRect, type){
  if (!vtShim){
    vtShim = document.createElement("style");
    vtShim.id = "vt-shim";
    document.head.appendChild(vtShim);
  }
  if (!oldRect || !newRect){ vtShim.textContent = ""; return; }
  const dx = newRect.left - oldRect.left;
  const dy = newRect.top - oldRect.top;
  const ow = Math.round(oldRect.width), oh = Math.round(oldRect.height);
  const nw = Math.round(newRect.width), nh = Math.round(newRect.height);
  const ox = Math.round(oldRect.left), oy = Math.round(oldRect.top);
  const from = type === "back"
    ? "translate(" + (dx - 18) + "px," + dy + "px)"
    : "translate(" + dx + "px," + (dy + 14) + "px)";
  const to = "translate(" + dx + "px," + dy + "px)";
  vtShim.textContent =
    "::view-transition-group(page-content){position:absolute!important;top:0!important;left:0!important;width:" + ow + "px!important;height:" + oh + "px!important;transform:translate(" + ox + "px," + oy + "px)!important;animation:none!important}" +
    "::view-transition-image-pair(page-content){inset:0!important}" +
    "::view-transition-old(page-content){inline-size:" + ow + "px!important;block-size:" + oh + "px!important}" +
    "::view-transition-new(page-content){inline-size:" + nw + "px!important;block-size:" + nh + "px!important;animation:vtShimIn .28s cubic-bezier(.22,.9,.3,1) both!important}" +
    "@keyframes vtShimIn{from{opacity:0;transform:" + from + "}to{opacity:1;transform:" + to + "}}";
}
function transRender(fn, type){
  const html = document.documentElement;
  const run = () => { try { fn(); } catch(err){} revealVisible(); };
  const onDone = () => { html.classList.remove("vt-anim"); vtShimRect(0, 0); vtBusy = false; };
  if (!vtBooted || !document.startViewTransition || reduceMotion()){
    run();
    return;
  }
  if (vtBusy){ run(); return; }
  vtBusy = true;
  html.classList.add("vt-anim");
  scrollTopInstant();
  const oldRect = main.getBoundingClientRect();
  const shim = () => { vtShimRect(oldRect, main.getBoundingClientRect(), type); };
  let vt = null;
  if (typeof document.startViewTransition === "function"){
    try {
      vt = document.startViewTransition({ update: () => { run(); shim(); }, types: type ? [type] : [] });
    } catch(err){
      try { vt = document.startViewTransition(() => { run(); shim(); }); } catch(err2){ vt = null; }
    }
  }
  if (!vt) onDone();
  else if (vt.finished) vt.finished.then(onDone, onDone);
  else onDone();
}
/* direction-aware transition types for lesson prev/next navigation:
   forward (next lesson) rises in, backward (previous lesson) slides in
   from the left; browser back/forward and cross-shell routes stay default */
function lessonDir(track, id){
  var pre = "lesson-" + track + "-";
  if (typeof page !== "string" || page.indexOf(pre) !== 0) return null;
  var a = TRACKS[track].findIndex(L => L.id === page.slice(pre.length));
  var b = TRACKS[track].findIndex(L => L.id === id);
  if (a < 0 || b < 0 || a === b) return null;
  return a < b ? "fwd" : "back";
}
function announcePage(label){
  var live = $("#routeLive");
  if (live) live.textContent = label;
}
function focusPageHeading(){
  var h1 = main.querySelector("h1");
  if (!h1) return;
  h1.setAttribute("tabindex", "-1");
  h1.focus({ preventScroll: true });
}
function titleFromHeading(){
  var h1 = main.querySelector("h1");
  if (h1) document.title = h1.textContent.trim() + " — Learn to Code from Zero";
}

function observeAll(){
  if (io) io.disconnect();
  io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .1 });
  $$(".reveal").forEach(el => io.observe(el));
  if (navIO) navIO.disconnect();
  const lessonLinks = [...$$(".sidebar a"), ...$$(".drawer-list a")].filter(a => !a.classList.contains("sp-next"));
  const byLesson = new Map();
  lessonLinks.forEach(a => {
    const href = a.getAttribute("href");
    const id = href.slice(href.lastIndexOf("/") + 1);
    if (!byLesson.has(id)) byLesson.set(id, []);
    byLesson.get(id).push(a);
  });
  let activeLinks = [];
  navIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const targets = byLesson.get(e.target.id);
      if (!targets) return;
      if (e.isIntersecting){
        if (activeLinks[0] !== targets[0]){
          activeLinks.forEach(a => a.classList.remove("active"));
          activeLinks = targets;
          targets.forEach(a => a.classList.add("active"));
        }
      } else if (activeLinks[0] === targets[0]){
        targets.forEach(a => a.classList.remove("active"));
        activeLinks = [];
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  $$(".lesson").forEach(el => navIO.observe(el));
  if (typeof rzObserveGlow === "function") rzObserveGlow();
}

var MAP_ICONS = [
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></svg>',
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>',
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3L4 7l4 4"/><path d="M4 7h16"/><path d="M16 21l4-4-4-4"/><path d="M20 17H4"/></svg>',
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/><path d="M6 17h12"/></svg>',
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.7a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z"/></svg>'
];

function lessonEl(L, i){
  const sec = document.createElement("section");
  sec.className = "lesson reveal";
  sec.id = L.id;
  const num = String(i).padStart(2,"0");
  let html = `
    <div class="lesson-head">
      <div class="lesson-num">${num}</div>
      <div>
        <div class="eyebrow">${rzHeadEyebrow(currentTrack, i)}</div>
        <h2 class="serif">${L.title}</h2>
        <p class="lead">${L.lead}</p>
      </div>
    </div>
    <div class="plain-card">
      <h3><span class="ic">📖</span> In plain words</h3>
      ${(L.words || []).map(p => "<p>" + p + "</p>").join("")}
    </div>`;
  if (L.analogy){
    html += `<div class="map-card">
      <div class="map-head"><div class="mh left">everyday life</div><div class="mh right">programming world</div></div>
      ${L.analogy.map((pair, ri) => `
      <div class="map-row" style="--ri:${ri}">
        <div class="map-side left">
          <span class="m-ic">${MAP_ICONS[ri % MAP_ICONS.length]}</span>
          <div><div class="m-label">you know this</div><div class="m-value">${pair[0]}</div></div>
        </div>
        <div class="map-link"><span class="ml-line"></span><span class="ml-arrow"></span></div>
        <div class="map-side right">
          <span class="m-ic">${MAP_ICONS[(ri + 1) % MAP_ICONS.length]}</span>
          <div><div class="m-label">now you know this</div><div class="m-value">${pair[2]}</div></div>
        </div>
      </div>`).join("")}
    </div>`;
  }
  if (L.coach){
    html += `<div class="coach-card">
      <div class="ch-head"><span class="ch-ic" aria-hidden="true">💬</span><span>Coach note</span></div>
      <p>${L.coach}</p>
    </div>`;
  }
  if (L.widget){
    html += `<div class="widget"><div class="widget-title">${widgetTitle(L.widget.type)}</div><div id="w-${L.id}">${widgetHtml(L.widget.type, L.id, L.widget)}</div></div>`;
  }
  if (L.code){
    html += codeBlock(L.code);
  }
  if (L.tip) html += fmtTip(L.tip);
  if (L.why){
    html += `<div class="why-card">
      <div class="wy-head"><span class="wy-ic" aria-hidden="true">💡</span><span>Real-world use</span><span class="wy-kick">${L.why.kick || "how teams use this in real code"}</span></div>
      <p>${L.why.h}</p>
      ${(L.why.points || []).length ? `<ul>${L.why.points.map(p => "<li>" + p + "</li>").join("")}</ul>` : ""}
    </div>`;
  }
  if (L.done){
    html += `<button class="done-btn" data-done="${L.id}">Mark lesson done <small>— ${L.done}</small></button>`;
  }
  sec.innerHTML = html;
  if (L.code) wireCode(sec, L.code);
  return sec;
}

/* ============================================================
   CODE BLOCKS
============================================================ */
function codeBlock(code){
  let body = code.lines.map((ln, i) => {
    const cm = ln[1] ? '<span class="cm"> // ' + ln[1] + "</span>" : "";
    return `<div class="code-line" data-li="${i}"><span class="code-no">${i + 1}</span><span class="code-text">${hlCode(ln[0])}${cm}</span></div>`;
  }).join("");
  return `
  <div class="code-wrap">
    <div class="code-header">
      <span class="fname"><span class="rust-logo">◉</span> main.rs — example</span>
      <button class="copy-btn" data-copy="${esc(code.copy)}">Copy</button>
    </div>
    <div class="code-body">${body}</div>
    <div class="explain-panel"><div class="ep-title"></div><p></p></div>
  </div>`;
}
function wireCode(sec, code){
  const panel = sec.querySelector(".explain-panel");
  sec.querySelectorAll(".code-wrap").forEach(wrap => {
    wrap.addEventListener("click", e => {
      const line = e.target.closest(".code-line");
      if (!line || line.parentElement !== wrap.querySelector(".code-body")) return;
      const li = +line.dataset.li;
      const info = code.lines[li];
      sec.querySelectorAll(".code-line").forEach(l => l.classList.remove("lit"));
      if (info[2]){
        line.classList.add("lit");
        panel.querySelector(".ep-title").textContent = "Line " + (li + 1);
        panel.querySelector("p").innerHTML = info[2];
        panel.classList.add("show");
      } else if (info[1]){
        line.classList.add("lit");
        panel.querySelector(".ep-title").textContent = "Line " + (li + 1);
        panel.querySelector("p").innerHTML = "<b>" + info[1] + ".</b> Click lines with a purple highlight for a deeper dive.";
        panel.classList.add("show");
      }
    });
  });
}

/* ============================================================
   PROGRESS, THEME, NAV
============================================================ */
function initProgress(track){
  const KEY = "rz-progress-" + track;
  let done = {};
  try { done = JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){}
  if (track === "rust"){
    try {
      const legacy = JSON.parse(localStorage.getItem("rz-progress")) || {};
      if (Object.keys(legacy).length && !Object.keys(done).length){
        done = legacy;
        localStorage.setItem(KEY, JSON.stringify(done));
        localStorage.removeItem("rz-progress");
      }
    } catch(e){}
  }
  const pctEl = $("#pct"), bar = $("#progressbar");
  const lessons = TRACKS[track].filter(L => L.done);
  const fills = [...$$(".sp-fill")], counts = [...$$(".sp-count")], nexts = [...$$(".sp-next")];
  const links = [...$$(".sidebar a"), ...$$(".drawer-list a")]
    .filter(a => !a.classList.contains("sp-next"))
    .map(a => ({ a, href: a.getAttribute("href"), L: null }));
  const byHref = new Map();
  lessons.forEach(L => { byHref.set("#" + track + "/" + L.id, L); byHref.set("#" + L.id, L); });
  links.forEach(l => { l.L = byHref.get(l.href) || null; });
  const render = () => {
    const n = lessons.filter(L => done[L.id]).length;
    const total = lessons.length;
    const pct = Math.round(n / total * 100);
    bar.style.width = pct + "%";
    pctEl.textContent = pct + "%";
    fills.forEach(f => f.style.width = pct + "%");
    counts.forEach(c => c.textContent = n + " of " + total + " done");
    const first = lessons.find(L => !done[L.id]);
    const firstHref = "#" + track + "/" + (first ? first.id : lessons[lessons.length - 1].id);
    nexts.forEach(card => {
      const ey = card.querySelector(".spn-eyebrow");
      const ti = card.querySelector(".spn-title");
      const ar = card.querySelector(".spn-arrow");
      if (first){
        if (ey) ey.textContent = "Up next";
        if (ti) ti.textContent = first.nav;
        if (ar) ar.textContent = "→";
        card.setAttribute("href", firstHref);
      } else {
        if (ey) ey.textContent = "You did it!";
        if (ti) ti.textContent = "Track complete! 🎓";
        if (ar) ar.textContent = "";
        card.setAttribute("href", firstHref);
      }
    });
    links.forEach(l => {
      l.a.classList.toggle("done", !!(l.L && done[l.L.id]));
      l.a.classList.toggle("next", l.href === firstHref);
    });
    setHomeProgress();
  };
  $$(".done-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.done;
      done[id] = !done[id];
      try { localStorage.setItem(KEY, JSON.stringify(done)); } catch(err){}
      btn.classList.toggle("is-done", !!done[id]);
      if (done[id]) confetti(btn);
      render();
    });
  });
  $$(".done-btn").forEach(btn => btn.classList.toggle("is-done", !!done[btn.dataset.done]));
  render();
  return done;
}

var CONFETTI_COLORS = ["#e08a64", "#8f75ff", "#35b8ab", "#d4a53f", "#e05f5f"];
function confetti(btn){
  const r = btn.getBoundingClientRect();
  const x = r.left + r.width / 2, y = r.top + 4;
  const parts = [];
  const n = RZ_LOW ? 8 : 16;
  for (let i = 0; i < n; i++){
    const c = document.createElement("span");
    c.className = "confetti";
    c.style.left = x + "px";
    c.style.top = y + "px";
    c.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    if (c.style.setProperty) c.style.setProperty("--dx", Math.round(Math.random() * 180 - 90) + "px");
    document.body.appendChild(c);
    parts.push(c);
  }
  setTimeout(() => {
    for (let i = 0; i < parts.length; i++) parts[i].remove();
  }, 1250);
}

/* theme — handled by themes.js (RZ_THEMES picker + persistence) */

/* reveal + nav active */
var io = null;
var navIO = null;

/* focus-ring etiquette — a mouse click must never flash a ring:
   pointer-mode hides rings for pointer users; pressing Tab restores
   them instantly for keyboard navigation (WCAG 2.4.7 kept intact). */
document.addEventListener("pointerdown", () => document.documentElement.classList.add("pointer-mode"));
document.addEventListener("keydown", e => { if (e.key === "Tab") document.documentElement.classList.remove("pointer-mode"); });

/* copy buttons (delegated) */
document.addEventListener("click", e => {
  const btn = e.target.closest(".copy-btn");
  if (!btn) return;
  const text = btn.dataset.copy.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  const done = () => {
    const old = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => btn.textContent = old, 1400);
  };
  const fallback = () => {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch(err){}
    document.body.removeChild(ta);
    done();
  };
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(done).catch(fallback);
  } else {
    fallback();
  }
});

/* graduation road — "Open →" buttons open real external sources.
   Delegated (no inline handlers anywhere → CSP can stay strict) */
document.addEventListener("click", e => {
  const btn = e.target.closest ? e.target.closest(".road-btn") : null;
  if (!btn || !btn.dataset.url) return;
  window.open(btn.dataset.url, "_blank", "noopener");
});

/* track switcher — navigates to the path pages.
   Buttons render from TRACK_ORDER (index.html ships rust+general as the
   no-JS fallback; anything else in TRACK_ORDER is appended here), and the
   pill is MEASURED from the active button — 2 tracks or 10, it just fits. */
function rzBuildTrackSwitch(){
  const sw = $("#trackSwitch");
  if (!sw) return;
  trackList().forEach(tr => {
    if (sw.querySelector('.track-btn[data-track="' + tr + '"]')) return;
    const meta = TRACK_META[tr] || {};
    const b = document.createElement("button");
    b.className = "track-btn";
    b.dataset.track = tr;
    b.innerHTML = '<span class="t-ic">' + (meta.pillIcon || "📚") + "</span> " + (meta.pill || tr);
    sw.appendChild(b);
  });
  rzMovePill();
}
function rzMovePill(){
  const sw = $("#trackSwitch");
  if (!sw) return;
  const pill = sw.querySelector(".track-pill");
  const active = sw.querySelector(".track-btn.active");
  if (!pill || !active || typeof active.offsetLeft !== "number") return;
  pill.style.width = active.offsetWidth + "px";
  pill.style.transform = "translateX(" + (active.offsetLeft - 4) + "px)";
}
function rzSyncTrackChrome(){
  document.body.dataset.track = currentTrack;
  const sw = $("#trackSwitch");
  if (sw){
    sw.dataset.track = currentTrack;
    sw.querySelectorAll(".track-btn").forEach(b => b.classList.toggle("active", b.dataset.track === currentTrack));
  }
  rzBuildTrackSwitch();
  rzMovePill();
}
$("#trackSwitch").addEventListener("click", e => {
  const btn = e.target.closest(".track-btn");
  if (btn) go("#" + btn.dataset.track);
});
if (typeof window !== "undefined" && window.addEventListener){
  window.addEventListener("resize", () => rzMovePill());
}

/* search palette close-on-outside — ONE delegated listener (bound once),
   not one per renderHome: re-binding inside initSearch would accumulate
   document listeners and pin stale DOM for the whole session.
   Renderers without a search box null it so the last palette subtree
   (detached DOM + closure) is released instead of pinned. */
var searchCloser = null;
document.addEventListener("click", e => {
  const wrap = e.target.closest ? e.target.closest(".search-wrap") : null;
  if (!wrap && searchCloser) searchCloser();
});

/* mobile lesson drawer */
const drawer = $("#lessonDrawer"), backdrop = $("#drawerBackdrop");
function openDrawer(open){
  drawer.classList.toggle("open", open);
  backdrop.classList.toggle("open", open);
  document.body.classList.toggle("drawer-locked", open);
}
$("#lessonMenuBtn").addEventListener("click", () => openDrawer(true));
$("#drawerClose").addEventListener("click", () => openDrawer(false));
backdrop.addEventListener("click", () => openDrawer(false));
drawer.addEventListener("click", e => { if (e.target.closest("a")) openDrawer(false); });

/* ============================================================
   HOME — per-track progress cards + cross-track search
============================================================ */
function setHomeProgress(){
  trackList().forEach(tr => {
    const t = TRACKS[tr].filter(L => L.done);
    let done = {};
    try { done = JSON.parse(localStorage.getItem("rz-progress-" + tr)) || {}; } catch(e){}
    const n = t.filter(L => done[L.id]).length;
    const total = t.length || 1;
    const pct = Math.round(n / total * 100);
    const fill = $("#homeFill-" + tr), pctEl = $("#homePct-" + tr), cta = $("#homeCta-" + tr), card = $("#homeCard-" + tr);
    if (fill) fill.style.width = pct + "%";
    if (pctEl) pctEl.textContent = pct + "%";
    const first = t.find(L => !done[L.id]);
    if (cta) cta.textContent = !first ? "Track complete — review →" : (n === 0 ? "Start the path →" : "Continue →");
    if (card) card.setAttribute("href", !first ? "#" + tr : "#" + tr + "/" + first.id);
  });
}

function highlight(text, q){
  const plain = text.replace(/<[^>]+>/g, "");
  const i = plain.toLowerCase().indexOf(q);
  if (i < 0) return esc(text);
  return esc(plain.slice(0, i)) + "<mark>" + esc(plain.slice(i, i + q.length)) + "</mark>" + esc(plain.slice(i + q.length));
}

function initSearch(){
  const box = $("#searchInput"), list = $("#searchResults");
  if (!box || !list) return;
  const data = trackList().flatMap(tr => TRACKS[tr].map((L, i) => ({ L, i, track: tr })));
  let sel = -1;
  const close = () => { list.classList.remove("open"); list.innerHTML = ""; sel = -1; box.setAttribute("aria-expanded", "false"); };
  const paint = () => {
    const q = box.value.trim().toLowerCase();
    if (!q) return close();
    const hits = data.filter(s => (s.L.nav + " " + s.L.title + " " + s.L.id).toLowerCase().includes(q)).slice(0, 8);
    if (sel > hits.length - 1) sel = hits.length - 1;
    if (sel < -1) sel = -1;
    list.innerHTML = hits.length
      ? hits.map((s, i) => {
          const sm = TRACK_META[s.track] || {};
          return '<div class="sr-item' + (i === sel ? " sel" : "") + '" role="option" aria-selected="' + (i === sel) + '" data-track="' + s.track + '" data-id="' + s.L.id + '">' +
            '<span class="sr-num">' + (sm.short || "") + String(s.i).padStart(2, "0") + '</span>' +
            '<span class="sr-name">' + highlight(s.L.title, q) + '</span>' +
            '<span class="sr-track" style="--track-accent:' + (sm.color || "var(--violet)") + '">' + (sm.pillIcon || "") + " " + (sm.pill || s.track) + '</span>' +
          '</div>'; }).join("") +
        '<div class="sr-foot" aria-hidden="true"><span><kbd>↑↓</kbd> navigate</span><span><kbd>Enter</kbd> open</span><span><kbd>Esc</kbd> close</span></div>'
      : '<div class="sr-empty">Nothing matches “' + esc(q) + '” — try “ownership”, “heaps”, “threads”…</div>';
    list.classList.add("open");
    box.setAttribute("aria-expanded", "true");
  };
  const pick = item => {
    const track = item.dataset.track;
    close();
    if (box.blur) box.blur();
    go("#" + track + "/" + item.dataset.id);
  };
  box.addEventListener("input", () => { sel = -1; paint(); });
  box.addEventListener("focus", paint);
  box.addEventListener("keydown", e => {
    const items = list.querySelectorAll(".sr-item");
    if (e.key === "ArrowDown"){
      if (e.preventDefault) e.preventDefault();
      if (items.length){ sel = sel < items.length - 1 ? sel + 1 : 0; paint(); }
    } else if (e.key === "ArrowUp"){
      if (e.preventDefault) e.preventDefault();
      if (items.length){ sel = sel > 0 ? sel - 1 : items.length - 1; paint(); }
    } else if (e.key === "Enter"){
      if (items.length) pick(items[sel >= 0 ? sel : 0]);
    } else if (e.key === "Escape"){
      close();
      if (box.blur) box.blur();
    }
  });
  list.addEventListener("click", e => {
    const item = e.target.closest(".sr-item");
    if (item) pick(item);
  });
  searchCloser = close;
}

/* scroll-motion budget — one passive listener toggles html.scrolling while
   a scroll gesture runs; base.css pauses the main-thread repaint animations
   (headline gradient sweep, pulse dots) during the gesture and resumes them
   120ms after it stops. No timer churn mid-scroll: the idle timer is armed
   once and only fires when scrolling actually stops. */
(function(){
  var t = null;
  window.addEventListener("scroll", function(){
    var h = document.documentElement;
    h.classList.add("scrolling");
    if (!t) t = setTimeout(function(){ t = null; h.classList.remove("scrolling"); }, 120);
  }, { passive: true });
})();

/* ============================================================
   READING SYSTEM — the Aa panel (Readwise/Kindle pattern).
   Four axes (size/measure/spacing/font) + four aids (easy
   spacing, focus, calm, motion), all persisted in `rz-read`
   and applied as html[data-*] attributes BEFORE first render
   so there is no flash of default type. Everything degrades
   silently (fresh profile, private mode, DOM shim).
   ============================================================ */
var RZ_READ_KEY = "rz-read";
var RZ_READ_DEF = { size:"m", measure:"regular", spacing:"cozy", font:"sans",
  easy:false, focus:false, calm:false, motion:"auto" };
function rzReadState(){
  let s = null;
  try { s = JSON.parse(localStorage.getItem(RZ_READ_KEY)) || null; } catch(e){}
  const out = {};
  for (const k in RZ_READ_DEF) out[k] = (s && s[k] !== undefined) ? s[k] : RZ_READ_DEF[k];
  if (["s","m","l","xl"].indexOf(out.size) < 0) out.size = "m";
  if (["narrow","regular","wide"].indexOf(out.measure) < 0) out.measure = "regular";
  if (["cozy","roomy"].indexOf(out.spacing) < 0) out.spacing = "cozy";
  if (["serif","sans"].indexOf(out.font) < 0) out.font = "sans";
  if (["auto","reduce"].indexOf(out.motion) < 0) out.motion = "auto";
  return out;
}
function rzApplyRead(){
  const h = document.documentElement;
  const s = rzReadState();
  h.dataset.rzSize = s.size;
  h.dataset.rzMeasure = s.measure;
  h.dataset.rzSpacing = s.spacing;
  h.dataset.rzFont = s.font;
  if (s.easy) h.dataset.rzEasy = ""; else delete h.dataset.rzEasy;
  if (s.focus) h.dataset.focus = ""; else delete h.dataset.focus;
  if (s.calm) h.dataset.calm = ""; else delete h.dataset.calm;
  if (s.motion === "reduce") h.dataset.rmotion = ""; else delete h.dataset.rmotion;
  if (typeof rzPaintRead === "function") rzPaintRead();
}
function rzSaveRead(patch){
  const s = rzReadState();
  for (const k in patch) s[k] = patch[k];
  try { localStorage.setItem(RZ_READ_KEY, JSON.stringify(s)); } catch(e){}
  rzApplyRead();
}
function rzReadVals(kind){
  if (kind === "size") return [["s","A−"],["m","A"],["l","A+"],["xl","A++"]];
  if (kind === "measure") return [["narrow","Narrow"],["regular","Regular"],["wide","Wide"]];
  if (kind === "spacing") return [["cozy","Cozy"],["roomy","Roomy"]];
  return [["serif","Serif"],["sans","Sans"]];
}
function rzReadToggles(){
  return [
    ["easy", "Easy spacing", "Wide letters + tall lines"],
    ["focus", "Focus mode", "Chrome fades, column centers"],
    ["calm", "Calm mode", "Ambient art off, memory down"],
    ["motion", "Reduce motion", "Still page, instant swaps", true]
  ];
}
function rzBuildReadPanel(){
  const trigger = document.getElementById("readBtn");
  const menu = document.getElementById("readMenu");
  if (!trigger || !menu || menu.dataset.built) return;
  menu.dataset.built = "1";
  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", "readMenu");
  const mkSeg = (kind, label) => {
    const sec = document.createElement("div");
    sec.className = "rm-sec";
    const lab = document.createElement("div");
    lab.className = "rm-label";
    lab.textContent = label;
    sec.appendChild(lab);
    const seg = document.createElement("div");
    seg.className = "rm-seg";
    seg.setAttribute("role", "group");
    seg.setAttribute("aria-label", label);
    rzReadVals(kind).forEach(([v, name]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.kind = kind;
      b.dataset.val = v;
      b.setAttribute("aria-pressed", "false");
      b.textContent = name;
      b.addEventListener("click", () => rzSaveRead({ [kind]: v }));
      seg.appendChild(b);
    });
    sec.appendChild(seg);
    return sec;
  };
  menu.appendChild(mkSeg("size", "Text size"));
  menu.appendChild(mkSeg("measure", "Line width"));
  menu.appendChild(mkSeg("spacing", "Line spacing"));
  menu.appendChild(mkSeg("font", "Body font"));
  const tsec = document.createElement("div");
  tsec.className = "rm-sec";
  const tlab = document.createElement("div");
  tlab.className = "rm-label";
  tlab.textContent = "Reading aids";
  tsec.appendChild(tlab);
  const twrap = document.createElement("div");
  twrap.className = "rm-toggles";
  rzReadToggles().forEach(([key, name, sub, isMotion]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "rm-toggle";
    b.dataset.toggle = key;
    b.setAttribute("aria-pressed", "false");
    const txt = document.createElement("span");
    txt.innerHTML = "<b>" + name + "</b><br><small style='font-weight:600;color:var(--muted)'>" + sub + "</small>";
    const sw = document.createElement("span");
    sw.className = "rm-sw";
    sw.setAttribute("aria-hidden", "true");
    b.appendChild(txt);
    b.appendChild(sw);
    b.addEventListener("click", () => {
      if (isMotion){
        const cur = rzReadState().motion;
        rzSaveRead({ motion: cur === "reduce" ? "auto" : "reduce" });
      } else {
        const cur = rzReadState();
        const patch = {};
        patch[key] = !cur[key];
        rzSaveRead(patch);
      }
    });
    twrap.appendChild(b);
  });
  tsec.appendChild(twrap);
  const note = document.createElement("div");
  note.className = "rm-note";
  note.textContent = "Saved in this browser. Calm mode also quiets the page for low-end devices.";
  tsec.appendChild(note);
  menu.appendChild(tsec);
  const setOpen = open => {
    menu.hidden = !open;
    trigger.setAttribute("aria-expanded", String(open));
    if (open && typeof rzPaintRead === "function") rzPaintRead();
  };
  trigger.addEventListener("click", () => setOpen(menu.hidden));
  document.addEventListener("pointerdown", e => {
    if (!menu.hidden && !menu.contains(e.target) && e.target !== trigger && !trigger.contains(e.target)) setOpen(false);
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !menu.hidden){ setOpen(false); trigger.focus(); }
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.shiftKey && (e.key === "a" || e.key === "A")){
      if (e.preventDefault) e.preventDefault();
      setOpen(menu.hidden);
    }
  });
  rzPaintRead();
}
function rzPaintRead(){
  const menu = document.getElementById("readMenu");
  if (!menu || !menu.dataset.built) return;
  const s = rzReadState();
  menu.querySelectorAll(".rm-seg button").forEach(b => {
    b.setAttribute("aria-pressed", String(s[b.dataset.kind] === b.dataset.val));
  });
  menu.querySelectorAll(".rm-toggle").forEach(b => {
    const key = b.dataset.toggle;
    const on = key === "motion" ? s.motion === "reduce" : !!s[key];
    b.setAttribute("aria-pressed", String(on));
  });
}
/* hidden-tab gate: pause decorative ambient work while nobody watches.
   (Browsers already throttle hidden tabs; this also freezes the
   gradient sweep/pulse class so wake-up never re-rasterizes a storm.) */
if (typeof document !== "undefined" && document.addEventListener){
  document.addEventListener("visibilitychange", () => {
    try {
      if (document.hidden) document.documentElement.dataset.tabhidden = "";
      else delete document.documentElement.dataset.tabhidden;
    } catch(e){}
  });
}

/* boot — pin to top: browsers restore the old scroll position on reload,
   which lands you mid-course instead of on the portal page */
rzApplyRead();
rzBuildReadPanel();
if (typeof history !== "undefined" && "scrollRestoration" in history) history.scrollRestoration = "manual";
if (window.scrollTo) scrollTopInstant();
if (window.addEventListener) window.addEventListener("hashchange", () => route(location.hash));
route(location.hash || "#home");
vtBooted = true;

/* ⌘K / Ctrl K — search from anywhere: go home if needed, then focus */
document.addEventListener("keydown", e => {
  if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")){
    if (e.preventDefault) e.preventDefault();
    if (page !== "home") go("#home");
    rzNextFrame(() => {
      const box = $("#searchInput");
      if (!box) return;
      box.focus();
      if (box.select) box.select();
    });
  }
});

/* brand — always takes you back to the portal page */
const brand = $(".brand");
if (brand) brand.addEventListener("click", () => go("#home"));