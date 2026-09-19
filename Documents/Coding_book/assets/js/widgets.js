/* ============================================
   widgets — every playground: HTML + behaviors
   widgetTitle | widgetHtml | QUIZ | init*
============================================ */
/* ============================================================
   WIDGETS
============================================================ */
function widgetTitle(t){
  const map = {
    term:"Your terminal — try it",
    hello:"The megaphone — press run",
    boxes:"Two boxes — try to break the sealed one",
    typesort:"Sorting game — which box?",
    calc:"Calculator — watch 7 / 2",
    strings:"Text builder — grow the string",
    echo:"Echo machine — type your name",
    gate:"The yes/no door — slide the number",
    matchplay:"The sorting machine — pick a color",
    loopplay:"The counter — watch it count",
    funcplay:"The machine — feed it a number",
    shelf:"The shelf — add items",
    ownplay:"The move game — feel the move",
    borrowplay:"The book — try the combinations",
    structbuild:"Build your ID card",
    optionplay:"The slot machine — pull the lever",
    resultplay:"The file conveyor — read files",
    fileplay:"The disk — write, read, delete",
    quiz:"Graduation quiz — 6 questions",
    flow:"The river — press run, watch the water",
    shaperack:"Pick the wrapping — which shape fits?",
    labelmaker:"The label maker — stick labels, look them up",
    conveyor:"The conveyor belt — watch the transformation",
    lifeguard:"The lifeguard — test where the water lives",
    upgrade:"The ID card — try the superpowers",
    ability:"The skill cards — pick an animal",
    mold:"The mold — same shape, different fillings",
    threadplay:"The kitchen — hire more chefs",
    asyncplay:"The chef — watch the whistles",
    smartptr:"The note — where does the value live?",
    testplay:"The safety net — run the checks",
    modulemap:"The house — open the doors",
    bigo:"The shapes of time — slide the size",
    alist:"Lockers vs train — pick a tool",
    stackque:"Plates & lines — push, pop, queue",
    binsearch:"The guessing game — find the number",
    sorter:"The card dance — watch it sort",
    recursion:"The mirror box — dive and resurface",
    treeview:"The family tree — grow a node",
    graphview:"The city map — walk the roads",
    heaps:"The hospital line — push, pop, watch the rule",
    mergesort:"The zipper — split, merge, win",
    backtrack:"The maze — walk, hit a wall, walk back",
    dp:"The notebook — watch answers get reused",
    macroplay:"The tiny robot — expand a macro",
    dynplay:"The shape-shifting box — pick a creature",
    unsafeplay:"The door — try the unsafe scenarios",
    cargoplay:"The crate store — try the commands",
    gym:"The gym — flip the cards"
  };
  return map[t] || "Playground";
}
function widgetHtml(t, id, W){
  switch(t){
    case "term": return termHtml();
    case "hello": return `
      <div class="w-row">
        <button class="w-btn" id="hw-${id}-1">Run println!("Hello, world!")</button>
        <button class="w-btn violet" id="hw-${id}-2">Run println!("I am learning Rust!")</button>
        <button class="w-btn gray" id="hw-${id}-r">Clear</button>
      </div>
      <div class="w-msg" id="hw-${id}-out"></div>`;
    case "boxes": return `
      <div class="w-row">
        <input class="w-input" id="bx-${id}-in" placeholder="type a value, e.g. 5 or hello">
        <select class="w-input" id="bx-${id}-box" style="max-width:220px">
          <option value="a">score (sealed box)</option>
          <option value="b">name (open box, mut)</option>
        </select>
        <button class="w-btn" id="bx-${id}-store">Store in box</button>
        <button class="w-btn gray" id="bx-${id}-reset">Reset</button>
      </div>
      <div class="box-stage">
        <div class="vbox sealed">
          <div class="v-status"></div>
          <div class="v-head">
            <span class="v-ic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
            <div>
              <div class="v-label">no mut — can't change</div>
              <div class="v-name">let score = ...</div>
            </div>
            <span class="v-seal"><span class="dot"></span>sealed</span>
          </div>
          <div class="v-body">
            <div class="v-value empty" id="bx-${id}-a">empty box</div>
          </div>
        </div>
        <div class="vbox open">
          <div class="v-status"></div>
          <div class="v-head">
            <span class="v-ic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg></span>
            <div>
              <div class="v-label">mut — can change anytime</div>
              <div class="v-name">let mut name = ...</div>
            </div>
            <span class="v-seal"><span class="dot"></span>open</span>
          </div>
          <div class="v-body">
            <div class="v-value empty" id="bx-${id}-b">empty box</div>
          </div>
        </div>
      </div>
      <div class="w-msg" id="bx-${id}-msg"></div>`;
    case "typesort": return `
      <div class="ts-value" id="tp-${id}-val"></div>
      <div class="ts-opts">
        <button class="ts-opt" data-t="i32">i32 — whole number</button>
        <button class="ts-opt" data-t="f64">f64 — decimal</button>
        <button class="ts-opt" data-t="bool">bool — truth</button>
        <button class="ts-opt" data-t="char">char — one letter</button>
      </div>
      <div class="ts-score" id="tp-${id}-score"></div>`;
    case "calc": return `
      <div class="w-row">
        <input class="w-input" style="max-width:120px" id="cl-${id}-a" value="7">
        <select class="w-input" style="max-width:90px" id="cl-${id}-op">
          <option>+</option><option>-</option><option>*</option><option>/</option><option>%</option>
        </select>
        <input class="w-input" style="max-width:120px" id="cl-${id}-b" value="2">
        <button class="w-btn" id="cl-${id}-go">Compute</button>
      </div>
      <div class="calc-screen" id="cl-${id}-screen"><span class="hint" style="color:#8d8574">click Compute…</span></div>`;
    case "strings": return `
      <div class="w-row">
        <input class="w-input" id="sg-${id}-in" placeholder="text to glue on, e.g. world!">
        <button class="w-btn teal" id="sg-${id}-push">push_str</button>
        <button class="w-btn gray" id="sg-${id}-reset">New String</button>
      </div>
      <div class="calc-screen" style="margin-top:14px" id="sg-${id}-screen"><span class="hint" style="color:#8d8574">let mut greeting = String::from("Hello");</span></div>
      <div class="w-msg" id="sg-${id}-msg"></div>`;
    case "echo": return `
      <div class="terminal" style="margin-top:0">
        <div class="term-bar"><div class="term-dot td-r"></div><div class="term-dot td-y"></div><div class="term-dot td-g"></div><div class="term-title">the echo machine</div></div>
        <div class="term-body" id="ec-${id}-body"><span class="hint">What's your name?</span></div>
        <div class="term-input-wrap">
          <span style="color:#7fb069;font-family:var(--mono);font-size:13.5px;font-weight:600">you&gt;</span>
          <input class="term-input" id="ec-${id}-in" placeholder="type your name, press Enter" autocomplete="off">
        </div>
      </div>
      <div class="w-msg" id="ec-${id}-msg"></div>`;
    case "gate": return `
      <div class="gate-num" id="gt-${id}-num">10</div>
      <input type="range" min="0" max="20" value="10" class="gate-slider" id="gt-${id}-slider">
      <div class="gate-track">
        <div class="gate-half g1"><span class="g-label">n > 10 — big!</span></div>
        <div class="gate-arrow">?</div>
        <div class="gate-half g2"><span class="g-label">else — small</span></div>
      </div>
      <div class="w-msg" id="gt-${id}-msg"></div>`;
    case "matchplay": return `
      <div class="match-pick">
        <button class="match-swatch" style="background:#d64545" data-c="red" title="red"></button>
        <button class="match-swatch" style="background:#0d9488" data-c="green" title="green"></button>
        <button class="match-swatch" style="background:#7c5cff" data-c="blue" title="blue"></button>
        <button class="match-swatch" style="background:#f0c674" data-c="yellow" title="yellow"></button>
        <button class="match-swatch" style="background:#26211a" data-c="pink" title="mystery color"></button>
      </div>
      <div class="match-arms">
        <div class="match-arm" data-arm="red">"red" =&gt; <span class="arm-res">"stop"</span></div>
        <div class="match-arm" data-arm="green">"green" =&gt; <span class="arm-res">"go"</span></div>
        <div class="match-arm" data-arm="blue">"blue" =&gt; <span class="arm-res">"swim"</span></div>
        <div class="match-arm" data-arm="other">_ =&gt; <span class="arm-res">"wait for it..."</span></div>
      </div>
      <div class="w-msg" id="mc-${id}-msg"></div>`;
    case "loopplay": return `
      <div class="w-row" style="justify-content:center">
        <button class="w-btn" id="lp-${id}-play">Play: for i in 1..=5</button>
        <button class="w-btn gray" id="lp-${id}-while">Play: while x < 5</button>
        <button class="w-btn gray" id="lp-${id}-reset">Reset</button>
      </div>
      <div class="loop-count" id="lp-${id}-count">0</div>
      <div class="loop-bar"><div class="loop-fill" id="lp-${id}-fill"></div></div>
      <div class="w-msg" id="lp-${id}-msg"></div>`;
    case "funcplay": return `
      <div class="w-row" style="justify-content:center">
        <input class="w-input" style="max-width:100px" id="fc-${id}-in" value="5">
        <button class="w-btn gray" id="fc-${id}-double">double(x)</button>
        <button class="w-btn gray" id="fc-${id}-square">square(x)</button>
        <button class="w-btn gray" id="fc-${id}-add">add10(x)</button>
      </div>
      <div class="func-machine">
        <div class="func-io in" id="fc-${id}-inbox">5</div>
        <div class="func-arrow">→</div>
        <div class="func-core"><div class="f-name" id="fc-${id}-core">fn double(x)<br>x * 2</div></div>
        <div class="func-arrow">→</div>
        <div class="func-io out" id="fc-${id}-outbox">?</div>
      </div>
      <div class="w-msg" id="fc-${id}-msg" style="text-align:center"></div>`;
    case "shelf": return `
      <div class="w-row">
        <input class="w-input" id="sf-${id}-in" placeholder="item, e.g. apple">
        <button class="w-btn" id="sf-${id}-add">items.push(...)</button>
        <button class="w-btn gray" id="sf-${id}-clear">clear()</button>
      </div>
      <div class="shelf" id="sf-${id}-shelf"><span style="color:var(--muted);font-size:13px">empty shelf — add something</span></div>
      <div class="w-msg" id="sf-${id}-msg"></div>`;
    case "ownplay": return `
      <div class="own-mode w-row">
        <button class="w-btn gray" data-mode="string" id="ow-${id}-mstring">String (moves)</button>
        <button class="w-btn gray" data-mode="number" id="ow-${id}-mnum">i32 (copies)</button>
      </div>
      <div class="own-stage">
        <div class="own-box owner" id="ow-${id}-a">
          <div class="o-name"><code>s1</code><span id="ow-${id}-aflag" class="o-flag">owns the value</span></div>
          <div class="o-val" id="ow-${id}-aval">"hello"</div>
        </div>
        <div class="own-box" id="ow-${id}-b">
          <div class="o-name"><code>s2</code><span id="ow-${id}-bflag" class="o-flag">empty</span></div>
          <div class="o-val" id="ow-${id}-bval">—</div>
        </div>
      </div>
      <div class="w-row" style="margin-top:14px;justify-content:center">
        <button class="w-btn" id="ow-${id}-move">let s2 = s1;</button>
        <button class="w-btn gray" id="ow-${id}-reset">Reset</button>
      </div>
      <div class="w-msg" id="ow-${id}-msg" style="text-align:center"></div>`;
    case "borrowplay": return `
      <div class="w-row" style="justify-content:center">
        <button class="w-btn gray" id="br-${id}-read">reader = &amp;book</button>
        <button class="w-btn gray" id="br-${id}-read2">another reader</button>
        <button class="w-btn teal" id="br-${id}-write">writer = &amp;mut book</button>
        <button class="w-btn gray" id="br-${id}-reset">Reset</button>
      </div>
      <div class="borrow-book">
        <div class="book-emoji">📖</div>
        <div class="borrow-people" id="br-${id}-people"></div>
      </div>
      <div class="borrow-status" id="br-${id}-status">No one is using the book. Try a scenario!</div>`;
    case "structbuild": return `
      <div class="struct-form">
        <div><label>name</label><input class="w-input" id="sb-${id}-name" placeholder="Quiet"></div>
        <div><label>level</label><input class="w-input" id="sb-${id}-level" placeholder="3"></div>
        <div><label>pet</label><input class="w-input" id="sb-${id}-pet" placeholder="cat"></div>
        <div style="display:flex;align-items:flex-end"><button class="w-btn" id="sb-${id}-go" style="width:100%">Generate Player card</button></div>
      </div>
      <div class="id-card" id="sb-${id}-card">
        <div class="ic-name" id="sb-${id}-cname">Player</div>
        <div class="ic-sub">struct Player</div>
        <div class="ic-field"><b>name</b><span id="sb-${id}-fname"></span></div>
        <div class="ic-field"><b>level</b><span id="sb-${id}-flevel"></span></div>
        <div class="ic-field"><b>pet</b><span id="sb-${id}-fpet"></span></div>
      </div>`;
    case "optionplay": return `
      <div class="slot-machine">
        <div class="slot-window" id="op-${id}-win">?</div>
        <div class="slot-message" id="op-${id}-msg">pull the lever!</div>
        <button class="w-btn violet" id="op-${id}-lever">Pull the lever</button>
      </div>`;
    case "resultplay": return `
      <div class="w-row" style="justify-content:center">
        <button class="w-btn" id="rp-${id}-read">read_to_string("notes.txt")</button>
        <button class="w-btn gray" id="rp-${id}-unwrap">unwrap() it (risky!)</button>
      </div>
      <div class="result-box" id="rp-${id}-box"></div>
      <div class="w-msg" id="rp-${id}-msg" style="text-align:center"></div>`;
    case "fileplay": return `
      <div class="disk">
        <div class="disk-zone">
          <div class="dz-label">write note</div>
          <input class="w-input" id="fl-${id}-in" placeholder="note content">
          <button class="w-btn teal" id="fl-${id}-write">fs::write</button>
        </div>
        <div class="disk-zone">
          <div class="dz-label">the disk</div>
          <div id="fl-${id}-file" style="min-height:62px;display:grid;place-items:center"></div>
          <div class="dz-out" id="fl-${id}-meta">no file yet</div>
        </div>
        <div class="disk-zone">
          <div class="dz-label">read / delete</div>
          <button class="w-btn gray" id="fl-${id}-read">fs::read_to_string</button>
          <button class="w-btn gray" id="fl-${id}-del">fs::remove_file</button>
          <div class="dz-out" id="fl-${id}-out"></div>
        </div>
      </div>
      <div class="w-msg" id="fl-${id}-msg"></div>`;
    case "quiz": return quizHtml(id);
    case "flow": return `
      <div class="w-row"><button class="w-btn teal" id="flw-${id}-run">Run the water ▶</button></div>
      <div class="flow" id="flw-${id}-belt">${(W.flow || []).map((s, i) => `
        <div class="flow-node" style="--si:${i}"><span class="f-dot"></span>${s}</div>
        ${i < W.flow.length - 1 ? `<div class="flow-pipe" style="--si:${i + 1}"><span class="drop"></span></div>` : ""}`).join("")}</div>`;
    case "shaperack": return `
      <div class="w-row">
        <span class="mini-chip">values: 5, 9, 1</span>
        <button class="w-btn" id="sr-${id}-arr">wrap as array [ ]</button>
        <button class="w-btn" id="sr-${id}-tup">wrap as tuple ( )</button>
        <button class="w-btn gray" id="sr-${id}-sli">view through a slice</button>
      </div>
      <div class="calc-screen" id="sr-${id}-out"><span class="hint">pick a wrapping…</span></div>
      <div class="w-msg" id="sr-${id}-msg"></div>`;
    case "labelmaker": return `
      <div class="w-row">
        <input class="w-input" id="lm-${id}-key" placeholder="label, e.g. sugar" style="max-width:150px">
        <input class="w-input" id="lm-${id}-val" placeholder="value, e.g. 2" style="max-width:110px">
        <button class="w-btn teal" id="lm-${id}-put">Stick label</button>
        <button class="w-btn gray" id="lm-${id}-get">Look up</button>
        <button class="w-btn gray" id="lm-${id}-clear">Empty shelf</button>
      </div>
      <div class="lm-shelf" id="lm-${id}-shelf"></div>
      <div class="w-msg" id="lm-${id}-msg"></div>`;
    case "conveyor": return `
      <div class="w-row">
        <button class="w-btn violet" id="cv-${id}-run">Run the belt ▶</button>
        <button class="w-btn gray" id="cv-${id}-reset">Reset</button>
      </div>
      <div class="cv-line" id="cv-${id}-line"></div>
      <div class="w-msg" id="cv-${id}-msg"></div>`;
    case "lifeguard": return `
      <div class="lg-zone"><b>Zone A — the value's lifetime (the riverbank)</b>
        <div class="lg-box" id="lg-${id}-box">let s = String::from("hello"); — the water lives here</div>
      </div>
      <div class="w-row" style="margin-top:12px">
        <button class="w-btn teal" id="lg-${id}-in">borrow INSIDE the zone</button>
        <button class="w-btn" id="lg-${id}-out">carry it OUTSIDE the zone</button>
      </div>
      <div class="w-msg" id="lg-${id}-msg"></div>`;
    case "upgrade": return `
      <div class="pg-card">
        <div class="pg-name">Player: Rusty</div>
        <div class="pg-hpbar"><div class="pg-hp" id="pg-${id}-hp" style="width:100%"></div></div>
        <div class="pg-hptext" id="pg-${id}-hptext">HP 100 / 100</div>
        <div class="w-row">
          <button class="w-btn" id="pg-${id}-hit">player.hit(10)</button>
          <button class="w-btn teal" id="pg-${id}-heal">player.heal(5)</button>
          <button class="w-btn gray" id="pg-${id}-name">player.name()</button>
        </div>
        <div class="w-msg" id="pg-${id}-msg"></div>
      </div>`;
    case "ability": return `
      <div class="w-row">
        <button class="w-btn" id="ab-${id}-dog">Dog</button>
        <button class="w-btn" id="ab-${id}-cat">Cat</button>
        <button class="w-btn gray" id="ab-${id}-bird">Bird</button>
      </div>
      <div class="ab-card" id="ab-${id}-card"></div>
      <div class="w-msg" id="ab-${id}-msg"></div>`;
    case "mold": return `
      <div class="w-row">
        <span class="mini-chip">Rectangle&lt;T&gt; — one mold</span>
        <button class="w-btn" id="md-${id}-i">fill with number</button>
        <button class="w-btn violet" id="md-${id}-f">fill with decimal</button>
        <button class="w-btn teal" id="md-${id}-s">fill with text</button>
      </div>
      <div class="md-mold" id="md-${id}-mold"></div>
      <div class="w-msg" id="md-${id}-msg"></div>`;
    case "threadplay": return `
      <div class="w-row">
        <button class="w-btn teal" id="th-${id}-run">Hire 3 chefs ▶</button>
        <button class="w-btn gray" id="th-${id}-reset">Reset kitchen</button>
      </div>
      <div class="race" id="th-${id}-race"></div>
      <div class="w-msg" id="th-${id}-msg"></div>`;
    case "asyncplay": return `
      <div class="w-row">
        <button class="w-btn teal" id="as-${id}-run">Open the kitchen ▶</button>
        <button class="w-btn gray" id="as-${id}-reset">Reset</button>
      </div>
      <div class="w-msg" id="as-${id}-msg"></div>`;
    case "smartptr": return `
      <div class="w-row">
        <button class="w-btn" id="sp-${id}-plain">plain box</button>
        <button class="w-btn violet" id="sp-${id}-box">Box&lt;T&gt;</button>
        <button class="w-btn teal" id="sp-${id}-rc">Rc&lt;T&gt; ×3</button>
      </div>
      <div class="sp-stage" id="sp-${id}-stage"></div>
      <div class="w-msg" id="sp-${id}-msg"></div>`;
    case "testplay": return `
      <div class="w-row">
        <button class="w-btn teal" id="ts-${id}-run">Run cargo test ▶</button>
        <button class="w-btn gray" id="ts-${id}-reset">Reset</button>
      </div>
      <div class="test-dots" id="ts-${id}-dots"></div>
      <div class="w-msg" id="ts-${id}-msg"></div>`;
    case "modulemap": return `
      <div class="mod-tree">
        <div class="mod-node open" id="mn-${id}-main"><span class="m-ic">🏠</span> main.rs <span class="m-items">front door</span></div>
        <div class="mod-kids">
          <div class="mod-node" id="mn-${id}-pay"><span class="m-ic">💳</span> mod payment <span class="m-items">pub: validate_card()</span></div>
          <div class="mod-kids" id="mn-${id}-paykids"></div>
          <div class="mod-node" id="mn-${id}-mail"><span class="m-ic">✉️</span> mod mailer <span class="m-items">pub: send()</span></div>
          <div class="mod-kids" id="mn-${id}-mailkids"></div>
        </div>
      </div>
      <div class="w-msg" id="mn-${id}-msg"></div>`;
    case "bigo": return `
      <div class="bigo">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <span style="font-weight:800;font-size:13px">items in the list</span>
          <input type="range" min="1" max="50" value="10" class="bigo-slider" id="bg-${id}-n" style="flex:1">
          <span class="mini-chip" id="bg-${id}-val">n = 10</span>
        </div>
        <div class="bigo-bar-row"><span class="bb-name">O(1)</span><div class="bb-rail"><div class="bb-fill o1" id="bg-${id}-o1"></div></div></div>
        <div class="bigo-bar-row"><span class="bb-name">O(log n)</span><div class="bb-rail"><div class="bb-fill olog" id="bg-${id}-olog"></div></div></div>
        <div class="bigo-bar-row"><span class="bb-name">O(n)</span><div class="bb-rail"><div class="bb-fill on" id="bg-${id}-on"></div></div></div>
        <div class="bigo-bar-row"><span class="bb-name">O(n²)</span><div class="bb-rail"><div class="bb-fill on2" id="bg-${id}-on2"></div></div></div>
        <div class="w-msg" id="bg-${id}-msg" style="margin-top:10px"></div>
      </div>`;
    case "alist": return `
      <div class="w-row">
        <button class="w-btn" id="al-${id}-look">array: grab index 2</button>
        <button class="w-btn violet" id="al-${id}-ins">array: insert in middle</button>
        <button class="w-btn teal" id="al-${id}-walk">list: find index 2</button>
        <button class="w-btn gray" id="al-${id}-reset">Reset</button>
      </div>
      <div class="al-stage">
        <div class="al-panel"><h5>Array — lockers</h5><div class="al-lockers" id="al-${id}-arr"></div><div class="w-msg" id="al-${id}-msg"></div></div>
        <div class="al-panel"><h5>Linked list — train</h5><div class="al-train" id="al-${id}-lst"></div></div>
      </div>`;
    case "stackque": return `
      <div class="w-row">
        <button class="w-btn" id="sq-${id}-push">stack.push(plate)</button>
        <button class="w-btn violet" id="sq-${id}-pop">stack.pop()</button>
        <button class="w-btn teal" id="sq-${id}-join">queue.join(person)</button>
        <button class="w-btn gray" id="sq-${id}-serve">queue.serve()</button>
      </div>
      <div class="sq-stage">
        <div class="sq-panel"><h5>Stack — last in, first out</h5><div class="sq-stack" id="sq-${id}-stack"></div><div class="w-msg" id="sq-${id}-msg"></div></div>
        <div class="sq-panel"><h5>Queue — first in, first out</h5><div class="sq-queue" id="sq-${id}-queue"></div></div>
      </div>`;
    case "binsearch": return `
      <div class="w-row">
        <button class="w-btn teal" id="bs-${id}-find">Start the hunt ▶</button>
        <button class="w-btn gray" id="bs-${id}-reset">Reset</button>
      </div>
      <div class="bin-range">
        <span class="bin-low" id="bs-${id}-low">low: 0</span>
        <span class="bin-mid" id="bs-${id}-mid">target: 12</span>
        <span class="bin-high" id="bs-${id}-high">high: 4</span>
        <span class="bin-step" id="bs-${id}-step">sorted [2, 5, 8, 12, 20]</span>
      </div>
      <div class="w-msg" id="bs-${id}-msg"></div>`;
    case "sorter": return `
      <div class="w-row">
        <button class="w-btn teal" id="so-${id}-run">Sort the cards ▶</button>
        <button class="w-btn gray" id="so-${id}-reset">Reset</button>
      </div>
      <div class="sort-bars" id="so-${id}-bars"></div>
      <div class="w-msg" id="so-${id}-msg"></div>`;
    case "recursion": return `
      <div class="w-row">
        <button class="w-btn violet" id="rc-${id}-run">Dive — countdown(5) ▶</button>
        <button class="w-btn gray" id="rc-${id}-reset">Reset</button>
      </div>
      <div id="rc-${id}-line"></div>
      <div class="w-msg" id="rc-${id}-msg"></div>`;
    case "treeview": return `
      <div class="w-row">
        <button class="w-btn teal" id="tr-${id}-add">insert 1 →</button>
        <button class="w-btn" id="tr-${id}-find">find 8</button>
        <button class="w-btn violet" id="tr-${id}-traverse">traverse (in-order)</button>
        <button class="w-btn gray" id="tr-${id}-reset">Reset</button>
      </div>
      <div class="tree-stage" id="tr-${id}-stage"></div>
      <div class="w-msg" id="tr-${id}-msg"></div>`;
    case "graphview": return `
      <div class="w-row">
        <button class="w-btn teal" id="gr-${id}-bfs">BFS — flood from city 0</button>
        <button class="w-btn violet" id="gr-${id}-dfs">DFS — maze from city 0</button>
        <button class="w-btn gray" id="gr-${id}-reset">Reset</button>
      </div>
      <div class="graph-stage" id="gr-${id}-stage"></div>
      <div class="w-msg" id="gr-${id}-msg"></div>`;
    case "heaps": return `
      <div class="w-row">
        <button class="w-btn" id="hp-${id}-push">Push — a patient arrives</button>
        <button class="w-btn violet" id="hp-${id}-pop">Pop min — treat the front</button>
        <button class="w-btn gray" id="hp-${id}-reset">Reset</button>
      </div>
      <div class="hp-stage" id="hp-${id}-stage"></div>
      <div class="w-msg" id="hp-${id}-msg"></div>`;
    case "mergesort": return `
      <div class="w-row">
        <button class="w-btn" id="ms-${id}-play">Play merge sort</button>
        <button class="w-btn gray" id="ms-${id}-reset">Reset</button>
      </div>
      <div class="ms-row" id="ms-${id}-row"></div>
      <div class="ms-step" id="ms-${id}-step"></div>
      <div class="w-msg" id="ms-${id}-msg"></div>`;
    case "backtrack": return `
      <div class="w-row">
        <button class="w-btn" id="bt-${id}-go">Walk the maze</button>
        <button class="w-btn gray" id="bt-${id}-reset">Reset</button>
      </div>
      <div class="bt-maze" id="bt-${id}-maze"></div>
      <div class="w-msg" id="bt-${id}-msg"></div>`;
    case "dp": return `
      <div class="w-row">
        <button class="w-btn" id="dp-${id}-naive">Naive — watch the waste</button>
        <button class="w-btn violet" id="dp-${id}-memo">Memo — watch the notebook</button>
        <button class="w-btn gray" id="dp-${id}-reset">Reset</button>
      </div>
      <div class="dp-tree" id="dp-${id}-tree"></div>
      <div class="dp-stat" id="dp-${id}-stat"></div>
      <div class="w-msg" id="dp-${id}-msg"></div>`;
    case "macroplay": return `
      <div class="mc-stage">
        <div class="mc-source" id="mc-${id}-source">Press Expand — the robot reads the line above…</div>
        <div class="mc-arrow">🤖 <span id="mc-${id}-arrow">the robot starts typing…</span></div>
        <div class="mc-out" id="mc-${id}-out"></div>
      </div>
      <div class="w-row">
        <button class="w-btn" id="mc-${id}-myvec">Expand myvec![4, 2, 9]</button>
        <button class="w-btn" id="mc-${id}-sq">Expand sq!(5)</button>
        <button class="w-btn gray" id="mc-${id}-reset">Reset</button>
      </div>
      <div class="w-msg" id="mc-${id}-msg"></div>`;
    case "dynplay": return `
      <div class="dy-stage">
        <div class="dy-box" id="dy-${id}-box"><span class="dy-empty">empty box —<br>just an 8-byte pointer</span></div>
        <div class="dy-shelf" id="dy-${id}-shelf">
          <span class="dy-empty">Generics: a fresh box per type</span>
          <div class="dy-shelf-boxes">
            <div class="dy-sbox">🐶 Dog-speaker</div>
            <div class="dy-sbox">🐱 Cat-speaker</div>
            <div class="dy-sbox">🤖 Robot-speaker</div>
          </div>
        </div>
      </div>
      <div class="w-row">
        <button class="w-btn" id="dy-${id}-dog">Put 🐶 Dog in</button>
        <button class="w-btn" id="dy-${id}-cat">Put 🐱 Cat in</button>
        <button class="w-btn" id="dy-${id}-robot">Put 🤖 Robot in</button>
        <button class="w-btn violet" id="dy-${id}-speak">Speak!</button>
        <button class="w-btn gray" id="dy-${id}-generic">Generic instead?</button>
        <button class="w-btn gray" id="dy-${id}-reset">Empty</button>
      </div>
      <div class="w-msg" id="dy-${id}-msg"></div>`;
    case "unsafeplay": return `
      <div class="un-stage">
        <div class="un-scene">
          <div class="un-guard" id="un-${id}-guard">🛡️</div>
          <div class="un-door" id="un-${id}-door">🚪</div>
        </div>
        <div class="un-sign" id="un-${id}-sign">Safe Rust — the guard watches everything</div>
      </div>
      <div class="w-row">
        <button class="w-btn" id="un-${id}-safe">Read a book (safe)</button>
        <button class="w-btn" id="un-${id}-raw">Dereference a raw pointer</button>
        <button class="w-btn" id="un-${id}-static">Change a static mut</button>
        <button class="w-btn violet" id="un-${id}-wrap">The Rust way: wrap it safe</button>
        <button class="w-btn gray" id="un-${id}-reset">Reset</button>
      </div>
      <div class="w-msg" id="un-${id}-msg"></div>`;
    case "cargoplay": return `
      <div class="terminal" style="margin-top:0">
        <div class="term-bar"><div class="term-dot td-r"></div><div class="term-dot td-y"></div><div class="term-dot td-g"></div><div class="term-title">quietcraft@zero: ~/my-first-crate</div></div>
        <div class="term-body" id="cp-${id}-body"><span class="hint">The store is open — borrow a crate.</span></div>
      </div>
      <div class="w-row">
        <button class="w-btn" data-crate="serde">cargo add serde</button>
        <button class="w-btn" data-crate="anyhow">cargo add anyhow</button>
        <button class="w-btn" data-crate="clap">cargo add clap</button>
        <button class="w-btn" data-crate="build">cargo build</button>
        <button class="w-btn" data-crate="test">cargo test</button>
        <button class="w-btn" data-crate="publish">cargo publish</button>
        <button class="w-btn gray" data-crate="clear">clear</button>
      </div>
      <div class="w-msg" id="cp-${id}-msg"></div>`;
    case "gym": return gymHtml(id, W);
    default: return "";
  }
}

/* ---------- gym (Q-first flip cards) ---------- */
function gymHtml(id, W){
  const qs = (W && W.q || []).filter(x => x && x.q);
  if (!qs.length) return "";
  return `
  <div class="gym" id="gym-${id}">
    <div class="gym-stack">
      ${qs.map((Q, qi) => `
      <div class="gym-card" data-gi="${qi}">
        <button class="gym-face gym-front" data-flip="${qi}" aria-expanded="false">
          <span class="gym-q">${Q.q}</span>
          <span class="gym-hint">${Q.hint || "👀 tap to check yourself"}</span>
          <span class="gym-more" aria-hidden="true">tap to flip →</span>
        </button>
        <div class="gym-face gym-back">
          <div class="gym-a">${Q.a}</div>
          <div class="gym-why">${Q.why || "in plain words — " + Q.a}</div>
          <button class="w-btn gray gym-flip" data-flip="${qi}" aria-label="flip back">flip back</button>
        </div>
      </div>`).join("")}
    </div>
    <div class="gym-foot">
      <span class="gym-score" id="gym-${id}-score" role="status">0 / ${qs.length} flipped</span>
      <button class="w-btn gray" id="gym-${id}-reset">Reset</button>
    </div>
  </div>`;
}
function initGym(root, id){
  const cards = [...root.querySelectorAll(".gym-card")];
  if (!cards.length) return;
  const scoreEl = root.querySelector(".gym-score");
  const reset = root.querySelector("#gym-" + id + "-reset");
  const repaint = () => {
    const n = cards.filter(c => c.classList.contains("flipped")).length;
    if (scoreEl) scoreEl.textContent = n + " / " + cards.length + " flipped";
    cards.forEach(c => {
      const front = c.querySelector(".gym-front");
      if (front) front.setAttribute("aria-expanded", c.classList.contains("flipped") ? "true" : "false");
    });
  };
  root.addEventListener("click", e => {
    const flip = e.target.closest("[data-flip]");
    if (flip){
      const card = cards[+flip.dataset.flip];
      if (!card) return;
      card.classList.toggle("flipped");
      repaint();
      return;
    }
    if (reset && (e.target === reset || reset.contains(e.target))){
      cards.forEach(c => c.classList.remove("flipped"));
      repaint();
    }
  });
  repaint();
}
function termHtml(){
  return `
  <div class="terminal" style="margin-top:0">
    <div class="term-bar"><div class="term-dot td-r"></div><div class="term-dot td-y"></div><div class="term-dot td-g"></div><div class="term-title">quietcraft@zero: ~</div></div>
    <div class="term-body" id="tm-body"></div>
    <div class="term-input-wrap">
      <span style="color:#7fb069;font-family:var(--mono);font-size:13.5px;font-weight:600">$</span>
      <input class="term-input" id="tm-input" placeholder="type: cargo --version  (or click a button)" autocomplete="off" spellcheck="false">
    </div>
    <div class="term-btns">
      <button data-cmd="curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh">install Rust</button>
      <button data-cmd="cargo --version">cargo --version</button>
      <button data-cmd="rustc --version">rustc --version</button>
      <button data-cmd="cargo new first">cargo new first</button>
      <button data-cmd="cargo run">cargo run</button>
      <button data-cmd="clear">clear</button>
    </div>
  </div>`;
}

/* ---------- quiz ---------- */
var QUIZ = [
  {q:"Every Rust program starts its instructions inside…",
   o:["println!","fn main()","cargo","loop"],
   a:1,
   why:"fn main() is the front door — the computer always starts there."},
  {q:"You write: let x = 5; — can you change x later?",
   o:["Yes, anytime","No, unless I used mut","Only with match","Only on Tuesdays"],
   a:1,
   why:"Without mut, the box is sealed. Add mut to open the lid."},
  {q:"What does 7 / 2 give you in Rust?",
   o:["3.5","3","3 remainder 1","Error"],
   a:1,
   why:"Whole numbers divided stay whole — the 0.5 gets dropped. Use 7.0 / 2.0 for 3.5."},
  {q:"for i in 1..4 — how many times does it repeat?",
   o:["4","3","2","Infinity"],
   a:1,
   why:".. stops BEFORE 4: so 1, 2, 3 — three times. ..=4 would include 4."},
  {q:"After let s2 = s1; (both Strings), what's in s1?",
   o:["The same text (copied)","Nothing — it moved to s2","An error","A number"],
   a:1,
   why:"Strings MOVE. s1 is now empty, and using it is a compile error. Numbers copy; Strings move."},
  {q:"Your pocket may contain a coin… or not. Which type describes it?",
   o:["Result","Vec","Option","Struct"],
   a:2,
   why:"Option is the maybe-box: Some(coin) or None. Result is for ok-or-error, Vec is a shelf, Struct is an ID card."}
];
function quizHtml(id){
  let cards = QUIZ.map((Q, qi) => `
    <div class="quiz-card" data-qi="${qi}">
      <div class="quiz-q">Q${qi + 1}. ${Q.q}</div>
      <div class="quiz-opts">
        ${Q.o.map((o, oi) => `<button class="quiz-opt" data-oi="${oi}"><span class="q-key">${String.fromCharCode(65 + oi)}</span><span>${o}</span></button>`).join("")}
      </div>
      <div class="quiz-explain" id="qz-${id}-why-${qi}"></div>
    </div>`).join("");
  return `
    <div id="qz-${id}-cards">${cards}</div>
    <div class="quiz-score" id="qz-${id}-score">0 / ${QUIZ.length} — answer all six, then read the wisdom.</div>`;
}

/* ============================================================
   WIDGET BEHAVIORS
============================================================ */
function initAllWidgets(lessons){
  lessons.forEach(L => {
    if (L.widget) initWidget(L.widget.type, L.id);
  });
}

function initWidget(t, id){
  const root = $("#w-" + id);
  if (!root) return;
  switch(t){
    case "term": initTerm(root); break;
    case "hello": initHello(root, id); break;
    case "boxes": initBoxes(root, id); break;
    case "typesort": initTypeSort(root, id); break;
    case "calc": initCalc(root, id); break;
    case "strings": initStrings(root, id); break;
    case "echo": initEcho(root, id); break;
    case "gate": initGate(root, id); break;
    case "matchplay": initMatch(root, id); break;
    case "loopplay": initLoop(root, id); break;
    case "funcplay": initFunc(root, id); break;
    case "shelf": initShelf(root, id); break;
    case "ownplay": initOwn(root, id); break;
    case "borrowplay": initBorrow(root, id); break;
    case "structbuild": initStruct(root, id); break;
    case "optionplay": initOption(root, id); break;
    case "resultplay": initResult(root, id); break;
    case "fileplay": initFiles(root, id); break;
    case "quiz": initQuiz(root, id); break;
    case "flow": initFlow(root, id); break;
    case "shaperack": initShapeRack(root, id); break;
    case "labelmaker": initLabelMaker(root, id); break;
    case "conveyor": initConveyor(root, id); break;
    case "lifeguard": initLifeguard(root, id); break;
    case "upgrade": initUpgrade(root, id); break;
    case "ability": initAbility(root, id); break;
    case "mold": initMold(root, id); break;
    case "threadplay": initThreads(root, id); break;
    case "asyncplay": initAsyncPlay(root, id); break;
    case "smartptr": initSmartPtr(root, id); break;
    case "testplay": initTestPlay(root, id); break;
    case "modulemap": initModuleMap(root, id); break;
    case "bigo": initBigO(root, id); break;
    case "alist": initAList(root, id); break;
    case "stackque": initStackQue(root, id); break;
    case "binsearch": initBinSearch(root, id); break;
    case "sorter": initSorter(root, id); break;
    case "recursion": initRecursion(root, id); break;
    case "treeview": initTreeView(root, id); break;
    case "graphview": initGraphView(root, id); break;
    case "heaps": initHeaps(root, id); break;
    case "mergesort": initMergeSort(root, id); break;
    case "backtrack": initBacktrack(root, id); break;
    case "dp": initDP(root, id); break;
    case "macroplay": initMacroPlay(root, id); break;
    case "dynplay": initDynPlay(root, id); break;
    case "unsafeplay": initUnsafePlay(root, id); break;
    case "cargoplay": initCargoPlay(root, id); break;
    case "gym": initGym(root, id); break;
  }
}

function setMsg(el, text, cls){
  if (!el) return;
  el.className = "w-msg" + (cls ? " " + cls : "");
  el.innerHTML = text;
}

/* terminal */
function initTerm(root){
  const body = $("#tm-body"), input = $("#tm-input");
  const cmds = {
    ls: [['<span class="dir">Desktop/</span> <span class="dir">Documents/</span> <span class="dir">Downloads/</span> <span class="dir">Pictures/</span> <span class="file">calc-collab.html</span>',"out"]],
    "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh": [
      ['<span class="hint">info: downloading installer</span>',"out"],
      ['<span class="hint">Welcome to Rust!</span>',"out"],
      ['<span class="ok">Rust is installed now. Great job!</span>',"ok"],
      ['<span class="hint">To get started you may need to restart your terminal (or the computer) so the new tools are found.</span>',"hint"]],
    "cargo --version": [['<span class="ok">cargo 1.85.0 (d73c2cda2a 2025-02-10)</span>',"ok"]],
    "rustc --version": [['<span class="ok">rustc 1.85.0 (4d91de4e4 2025-02-17)</span>',"ok"]],
    "cargo new first": [['<span class="ok">Created binary (application) `first` package</span>',"ok"]],
    "cargo run": [
      ['<span class="hint">Compiling first v0.1.0</span>',"out"],
      ['<span class="hint">Finished `dev` profile</span>',"out"],
      ['<span class="ok">Running `target/debug/first`</span>',"out"],
      ['<span class="ok">Hello, world!</span>',"ok"]],
    clear: []
  };
  const line = (html, cls) => {
    const d = document.createElement("div");
    d.className = cls || "";
    d.innerHTML = html;
    body.appendChild(d);
    /* scrollback cap — a spammed terminal must not grow the DOM forever */
    while (body.children.length > 200) body.firstChild.remove();
    body.scrollTop = body.scrollHeight;
    return d;
  };
  const rzReduce = () => { try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch(e){ return false; } };
  let active = null, runId = 0;
  /* aborting a stream mid-line completes that line instantly (full HTML) and
     drops the caret — never leaves a partial line behind when the next
     command starts. */
  const stopStream = () => {
    if (active){
      clearInterval(active.t);
      active.caret.remove();
      active.el.innerHTML = active.html;
      body.scrollTop = body.scrollHeight;
      active = null;
    }
  };
  /* streaming output line: plain text reveals char-by-char behind a caret,
     then the styled HTML swaps in. Reduced-motion and low-perf devices print
     instantly — same content, zero wait (the CSS contract kills the caret's
     blink there too). */
  const streamLine = (html, cls, el, done) => {
    const d = el || document.createElement("div");
    if (!el) body.appendChild(d);
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const text = tmp.textContent;
    if (rzReduce() || RZ_LOW || text.length <= 1){
      d.className = cls || "";
      d.innerHTML = html;
      body.scrollTop = body.scrollHeight;
      if (done) done();
      return;
    }
    d.className = cls || "";
    d.textContent = "";
    const caret = document.createElement("span");
    caret.className = "cursor";
    d.appendChild(caret);
    let i = 0;
    const t = rzInterval(() => {
      if (!body.isConnected){
        clearInterval(t);
        if (active && active.t === t) active = null;
        return;
      }
      if (i >= text.length){
        clearInterval(t);
        active = null;
        caret.remove();
        d.innerHTML = html;
        if (done) done();
        return;
      }
      d.insertBefore(document.createTextNode(text[i]), caret);
      i++;
      body.scrollTop = body.scrollHeight;
    }, 14);
    active = { t, el: d, caret, html };
  };
  const thinkDots = '<span class="tk-dot">.</span><span class="tk-dot">.</span><span class="tk-dot">.</span>';
  let thinkEl = null;
  const run = cmd => {
    const c = cmd.trim();
    runId++;
    const id = runId;
    stopStream();
    /* a superseded command that never started printing leaves its
       "Running…" line stranded — drop it before the new echo prints */
    if (thinkEl && thinkEl.isConnected && thinkEl.classList.contains("term-thinking")) thinkEl.remove();
    thinkEl = null;
    if (c === "clear"){ body.innerHTML = ""; return; }
    line('<span class="prompt">$</span> ' + esc(c));
    const out = cmds[c];
    if (out === undefined){
      streamLine('<span class="err">command not found — try: cargo --version, cargo new first, or click a button. (psst: install Rust first!)</span>', "err");
      return;
    }
    if (out.length === 0) return;
    const think = document.createElement("div");
    think.className = "term-thinking";
    think.innerHTML = "Running" + thinkDots;
    if (!rzReduce() && !RZ_LOW) body.appendChild(think);
    thinkEl = think;
    body.scrollTop = body.scrollHeight;
    let i = 0;
    const next = () => {
      if (id !== runId || !body.isConnected) return;
      if (i >= out.length) return;
      const [h, cl] = out[i];
      const first = i === 0;
      i++;
      if (first && think.isConnected){
        think.className = "";
        streamLine(h, cl, think, next);
      } else {
        streamLine(h, cl, null, next);
      }
    };
    setTimeout(next, rzReduce() || RZ_LOW ? 0 : 260);
  };
  root.querySelectorAll("[data-cmd]").forEach(b => b.addEventListener("click", () => run(b.dataset.cmd)));
  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && input.value.trim()){ run(input.value); input.value = ""; }
  });
  line('<span class="hint">— this is your terminal, but safe to play with —</span>');
  line('<span class="hint">type commands or click the buttons. Start with the big one: install Rust.</span>');
  line("");
}

/* hello megaphone */
function initHello(root, id){
  const out = $("#hw-" + id + "-out");
  let t = null;
  const type = (text, done) => {
    if (t) clearInterval(t);
    out.className = "w-msg";
    out.textContent = "";
    let i = 0;
    t = rzInterval(() => {
      i++;
      out.textContent = "> " + text.slice(0, i);
      if (i >= text.length){ clearInterval(t); t = null; done && done(); }
    }, 24);
  };
  $("#hw-" + id + "-1").addEventListener("click", () => type("Hello, world!"));
  $("#hw-" + id + "-2").addEventListener("click", () => type("I am learning Rust!"));
  $("#hw-" + id + "-r").addEventListener("click", () => { if (t) clearInterval(t); t = null; out.textContent = ""; });
}

/* boxes */
function initBoxes(root, id){
  const valA = $("#bx-" + id + "-a"), valB = $("#bx-" + id + "-b"), msg = $("#bx-" + id + "-msg");
  const inp = $("#bx-" + id + "-in"), sel = $("#bx-" + id + "-box");
  let a = null, b = null;
  const render = () => {
    valA.innerHTML = a === null ? "empty box" : esc(String(a));
    valA.className = "v-value" + (a === null ? " empty" : "");
    valB.innerHTML = b === null ? "empty box" : esc(String(b));
    valB.className = "v-value" + (b === null ? " empty" : "");
  };
  $("#bx-" + id + "-store").addEventListener("click", () => {
    const v = inp.value.trim();
    if (!v){ setMsg(msg, "type a value first!", "err"); return; }
    if (sel.value === "a"){
      if (a !== null){
        msg.className = "w-msg err shake";
        msg.textContent = "ERROR: sealed box! Rust says no. No mut, no change.";
        valA.classList.add("shake");
        setTimeout(() => valA.classList.remove("shake"), 700);
        return;
      }
      a = v;
      setMsg(msg, 'sealed box: let score = "' + esc(v) + '" — stored. Now try to overwrite it!', "ok");
    } else {
      b = v;
      setMsg(msg, 'open box: let mut name = "' + esc(v) + '" — stored, and the lid stays open. Change it anytime.', "ok");
    }
    render();
  });
  $("#bx-" + id + "-reset").addEventListener("click", () => { a = null; b = null; render(); setMsg(msg, ""); });
  render();
}

/* type sort */
function initTypeSort(root, id){
  const ROUNDS = [
    {v:"42", t:"i32"}, {v:"3.14", t:"f64"}, {v:"true", t:"bool"},
    {v:"'R'", t:"char"}, {v:"-7", t:"i32"}, {v:"99.9", t:"f64"},
    {v:"'?'", t:"char"}, {v:"false", t:"bool"}
  ];
  let round = 0, score = 0;
  const val = $("#tp-" + id + "-val"), scoreEl = $("#tp-" + id + "-score");
  const show = () => {
    val.innerHTML = "<span>" + esc(ROUNDS[round].v) + "</span> <span style='font-size:13px;color:var(--muted)'>— where does it live?</span>";
    scoreEl.textContent = "round " + (round + 1) + " / " + ROUNDS.length + " · score " + score;
  };
  root.querySelectorAll(".ts-opt").forEach(btn => {
    btn.addEventListener("click", () => {
      if (round >= ROUNDS.length){ round = 0; score = 0; show(); return; }
      const correct = btn.dataset.t === ROUNDS[round].t;
      root.querySelectorAll(".ts-opt").forEach(b => b.classList.remove("right","wrong"));
      btn.classList.add(correct ? "right" : "wrong");
      if (correct) score++;
      setTimeout(() => {
        root.querySelectorAll(".ts-opt").forEach(b => b.classList.remove("right","wrong"));
        round++;
        if (round >= ROUNDS.length){
          val.innerHTML = score === ROUNDS.length ? "<span>PERFECT! " + score + "/" + ROUNDS.length + " — you know your types.</span>" : "<span>Done! " + score + " / " + ROUNDS.length + " — replay to get them all.</span>";
          scoreEl.textContent = "";
        } else show();
      }, 700);
    });
  });
  show();
}

/* calc */
function initCalc(root, id){
  const screen = $("#cl-" + id + "-screen");
  $("#cl-" + id + "-go").addEventListener("click", () => {
    const a = parseFloat($("#cl-" + id + "-a").value);
    const op = $("#cl-" + id + "-op").value;
    const b = parseFloat($("#cl-" + id + "-b").value);
    if (isNaN(a) || isNaN(b)){ screen.innerHTML = '<span class="err" style="color:#ff6b6b">type two numbers first!</span>'; return; }
    let res, note = "";
    switch(op){
      case "+": res = a + b; break;
      case "-": res = a - b; break;
      case "*": res = a * b; break;
      case "/":
        if (b === 0){ screen.innerHTML = '<span class="err" style="color:#ff6b6b">division by zero — Rust says no!</span>'; return; }
        res = Math.trunc(a / b);
        const rem = a % b;
        note = rem !== 0 ? Math.abs(a / b - Math.trunc(a / b)).toFixed(2).replace(/0+$/,"") : "exact";
        break;
      case "%": res = a % b; break;
    }
    const whole = (Number.isInteger(a) && Number.isInteger(b));
    screen.innerHTML = '<span class="eq">' + a + " " + op + " " + b + " =</span> <span class=\"res\">" + res + "</span>" +
      (op === "/" && whole && note !== "exact" ? ' <span class="note">whole ÷ whole — the ' + note + ' got dropped!</span>' :       op === "/" && whole ? ' <span class="note">whole ÷ whole — exact, lucky!</span>' : ' <span class="note">decimals keep everything</span>');
  });
}

/* strings */
function initStrings(root, id){
  const screen = $("#sg-" + id + "-screen");
  let s = "Hello";
  const render = () => {
    screen.innerHTML = 'let mut greeting = String::from("Hello");<br><span style="color:#7dd3fc">// greeting now = "' + esc(s) + '"</span>';
  };
  $("#sg-" + id + "-push").addEventListener("click", () => {
    const v = $("#sg-" + id + "-in").value.trim();
    if (!v) return;
    s += v;
    screen.innerHTML = 'let mut greeting = String::from("Hello");<br><span style="color:#7dd3fc">// greeting = "' + esc(s) + '"</span>';
    $("#sg-" + id + "-in").value = "";
  });
  $("#sg-" + id + "-reset").addEventListener("click", () => { s = "Hello"; render(); });
  render();
}

/* echo */
function initEcho(root, id){
  const body = $("#ec-" + id + "-body"), inp = $("#ec-" + id + "-in"), msg = $("#ec-" + id + "-msg");
  const line = (h, cls) => {
    const d = document.createElement("div");
    d.className = cls || "";
    d.innerHTML = h;
    body.appendChild(d);
    while (body.children.length > 200) body.firstChild.remove();
    body.scrollTop = body.scrollHeight;
  };
  inp.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    const v = inp.value.trim();
    if (!v) return;
    line('<span class="prompt">you&gt;</span> ' + esc(v));
    line('<span class="hint">// read_line pours your text into the box</span>', "hint");
    line('<span class="hint">// trim() shakes off the hidden Enter character</span>', "hint");
    setTimeout(() => line('<span class="ok">Hello, ' + esc(v) + '!</span>', "ok"), 700);
    setMsg(msg, "read_line → trim → println!. That's the whole pipeline.", "ok");
    inp.value = "";
  });
}

/* gate */
function initGate(root, id){
  const slider = $("#gt-" + id + "-slider"), num = $("#gt-" + id + "-num"), msg = $("#gt-" + id + "-msg");
  const halves = root.querySelectorAll(".gate-half");
  const render = () => {
    const n = +slider.value;
    num.textContent = n;
    const big = n > 10;
    halves[0].classList.toggle("lit", big);
    halves[1].classList.toggle("lit", !big);
    setMsg(msg, big
      ? 'n &gt; 10 is TRUE → runs: <span class="chip">println!("big!")</span>'
      : 'n &gt; 10 is FALSE → runs: <span class="chip">else println!("small")</span>', big ? "ok" : "");
  };
  slider.addEventListener("input", render);
  render();
}

/* match */
function initMatch(root, id){
  const msg = $("#mc-" + id + "-msg");
  const arms = root.querySelectorAll(".match-arm");
  const results = { red:"\"stop\" — the red basket spoke", green:"\"go\" — the green basket spoke", blue:"\"swim\" — the blue basket spoke", other:"\"wait for it...\" — the _ catch-all basket caught it" };
  root.querySelectorAll(".match-swatch").forEach(b => {
    b.addEventListener("click", () => {
      const c = b.dataset.c;
      const matched = c === "red" ? "red" : c === "green" ? "green" : c === "blue" ? "blue" : "other";
      arms.forEach(a => a.classList.toggle("lit", a.dataset.arm === matched));
      setMsg(msg, 'match sorted <span class="chip">"' + esc(c) + '"</span> → ' + esc(results[matched]), "ok");
    });
  });
}

/* loop */
function initLoop(root, id){
  const count = $("#lp-" + id + "-count"), fill = $("#lp-" + id + "-fill"), msg = $("#lp-" + id + "-msg");
  let timer = null;
  const stop = () => { if (timer){ clearInterval(timer); timer = null; } };
  const start = (mode) => {
    stop();
    const total = 5;
    let i = 0;
    fill.style.width = "0%";
    count.textContent = "0";
    timer = rzInterval(() => {
      i++;
      count.textContent = String(i);
      fill.style.width = (i / total * 100) + "%";
      setMsg(msg, mode === "for"
        ? "for i in 1..=5 — iteration " + i + " of 5"
        : "while x < 5 — iteration " + i + " of 5", "");
      if (i >= total){
        stop();
        count.textContent = "done";
        setMsg(msg, mode === "for" ? "The for loop counted 1,2,3,4,5 by itself. The range 1..=5 includes 5." : "The while loop kept checking 'x < 5' and stopped when it became false.", "ok");
      }
    }, 650);
  };
  $("#lp-" + id + "-play").addEventListener("click", () => start("for"));
  $("#lp-" + id + "-while").addEventListener("click", () => start("while"));
  $("#lp-" + id + "-reset").addEventListener("click", () => { stop(); count.textContent = "0"; fill.style.width = "0%"; setMsg(msg, ""); });
}

/* func */
function initFunc(root, id){
  const inbox = $("#fc-" + id + "-inbox"), outbox = $("#fc-" + id + "-outbox"), core = $("#fc-" + id + "-core"), msg = $("#fc-" + id + "-msg");
  const fns = {
    double: ["fn double(x: i32) -> i32", "x * 2", x => x * 2],
    square: ["fn square(x: i32) -> i32", "x * x", x => x * x],
    add: ["fn add10(x: i32) -> i32", "x + 10", x => x + 10]
  };
  const call = (key) => {
    const x = parseInt($("#fc-" + id + "-in").value, 10);
    if (isNaN(x)){ setMsg(msg, "type a number first!", "err"); return; }
    const [name, body, f] = fns[key];
    core.innerHTML = esc(name) + "<br>" + esc(body);
    inbox.textContent = x;
    outbox.textContent = "?";
    core.classList.add("pulse");
    setMsg(msg, "calling " + key + "(" + x + ") … the machine is working…", "");
    setTimeout(() => {
      const r = f(x);
      outbox.textContent = r;
      core.classList.remove("pulse");
      setMsg(msg, "the machine handed back " + r + " — the last line without ; was the answer.", "ok");
    }, 800);
  };
  $("#fc-" + id + "-double").addEventListener("click", () => call("double"));
  $("#fc-" + id + "-square").addEventListener("click", () => call("square"));
  $("#fc-" + id + "-add").addEventListener("click", () => call("add"));
}

/* shelf */
function initShelf(root, id){
  const shelf = $("#sf-" + id + "-shelf"), msg = $("#sf-" + id + "-msg"), inp = $("#sf-" + id + "-in");
  let items = [];
  const render = () => {
    shelf.innerHTML = items.length ? items.map((it, i) =>
      '<div class="shelf-item">' + esc(it) + '<div style="font-size:10px;color:var(--muted)">[' + i + ']</div></div>').join("")
      : '<span style="color:var(--muted);font-size:13px">empty shelf — add something</span>';
  };
  $("#sf-" + id + "-add").addEventListener("click", () => {
    const v = inp.value.trim();
    if (!v){ setMsg(msg, "type an item first!", "err"); return; }
    items.push(v);
    inp.value = "";
    setMsg(msg, 'items.push("' + esc(v) + '") → now ' + items.length + " item(s). First one lives at index [0]!", "ok");
    render();
  });
  $("#sf-" + id + "-clear").addEventListener("click", () => { items = []; setMsg(msg, "items.clear() — the shelf is empty again."); render(); });
  render();
}

/* ownership */
function initOwn(root, id){
  const aval = $("#ow-" + id + "-aval"), bval = $("#ow-" + id + "-bval");
  const aflag = $("#ow-" + id + "-aflag"), bflag = $("#ow-" + id + "-bflag");
  const boxA = $("#ow-" + id + "-a"), boxB = $("#ow-" + id + "-b"), msg = $("#ow-" + id + "-msg");
  let mode = "string", moved = false;
  const render = () => {
    const val = mode === "string" ? '"hello"' : "5";
    boxA.classList.toggle("owner", !moved);
    boxB.classList.toggle("owner", moved);
    boxA.classList.toggle("abandoned", moved);
    if (moved){
      aval.innerHTML = mode === "string" ? "moved away!" : "5";
      aval.className = "o-val gone";
      bval.innerHTML = val;
      bval.className = "o-val";
      aflag.textContent = mode === "string" ? "empty — cannot use!" : "still has a copy";
      bflag.textContent = "owns the value";
    } else {
      aval.innerHTML = val;
      aval.className = "o-val";
      bval.innerHTML = "—";
      bval.className = "o-val";
      aflag.textContent = "owns the value";
      bflag.textContent = "empty";
    }
  };
  $("#ow-" + id + "-mstring").addEventListener("click", () => { mode = "string"; moved = false; setMsg(msg, "String mode: Strings MOVE. Watch what happens to s1."); render(); });
  $("#ow-" + id + "-mnum").addEventListener("click", () => { mode = "number"; moved = false; setMsg(msg, "i32 mode: numbers get COPIED. Watch s1 keep its value."); render(); });
  $("#ow-" + id + "-move").addEventListener("click", () => {
    if (moved){ setMsg(msg, "already moved! press Reset and try again.", "err"); return; }
    moved = true;
    if (mode === "string") setMsg(msg, "let s2 = s1; — the String MOVED. s1 is empty now. Using s1 = compile error. That's rule 2.", "ok");
    else setMsg(msg, "let b = a; — numbers get photocopied. Both keep a 5. No drama at all.", "ok");
    render();
  });
  $("#ow-" + id + "-reset").addEventListener("click", () => { moved = false; setMsg(msg, ""); render(); });
  render();
}

/* borrow */
function initBorrow(root, id){
  const people = $("#br-" + id + "-people"), status = $("#br-" + id + "-status");
  let readers = 0, writer = false;
  const render = () => {
    people.innerHTML = "";
    for (let i = 0; i < readers; i++){
      const d = document.createElement("div");
      d.className = "borrow-person bp-reader";
      d.textContent = "👓";
      d.title = "reader " + (i + 1);
      people.appendChild(d);
    }
    if (writer){
      const d = document.createElement("div");
      d.className = "borrow-person bp-writer";
      d.textContent = "✏️";
      d.title = "writer";
      people.appendChild(d);
    }
    if (!readers && !writer) status.textContent = "No one is using the book.";
    else if (readers > 0 && writer){
      status.textContent = "COMPILE ERROR: a writer and a reader at the same time! Rust refuses to run.";
      status.style.color = "var(--danger)";
      status.parentElement.classList.add("shake");
      setTimeout(() => status.parentElement.classList.remove("shake"), 600);
    } else if (writer){
      status.textContent = "One writer. The pen is the only tool. Perfectly legal.";
      status.style.color = "var(--teal)";
    } else {
      status.textContent = readers + " reader(s) with glasses. Many readers, one book — perfectly legal.";
      status.style.color = "var(--success)";
    }
  };
  $("#br-" + id + "-read").addEventListener("click", () => { readers++; render(); });
  $("#br-" + id + "-read2").addEventListener("click", () => { if (readers) readers++; render(); });
  $("#br-" + id + "-write").addEventListener("click", () => { writer = true; render(); });
  $("#br-" + id + "-reset").addEventListener("click", () => { readers = 0; writer = false; status.style.color = ""; render(); });
  render();
}

/* struct */
function initStruct(root, id){
  const card = $("#sb-" + id + "-card");
  $("#sb-" + id + "-go").addEventListener("click", () => {
    const name = $("#sb-" + id + "-name").value.trim() || "Unnamed";
    const level = $("#sb-" + id + "-level").value.trim() || "1";
    const pet = $("#sb-" + id + "-pet").value.trim() || "none";
    $("#sb-" + id + "-cname").textContent = name;
    $("#sb-" + id + "-fname").textContent = name;
    $("#sb-" + id + "-flevel").textContent = level;
    $("#sb-" + id + "-fpet").textContent = pet;
    card.classList.add("show");
  });
}

/* option */
function initOption(root, id){
  const win = $("#op-" + id + "-win"), msg = $("#op-" + id + "-msg");
  $("#op-" + id + "-lever").addEventListener("click", () => {
    win.classList.add("flip");
    win.textContent = "…";
    msg.textContent = "you reach into the pocket…";
    setTimeout(() => {
      const some = Math.random() > 0.4;
      if (some){
        win.textContent = "🪙";
        msg.innerHTML = '<span style="color:var(--success)">Some(7) — there was a coin! The Some arm ran: println!("coin: 7")</span>';
      } else {
        win.textContent = "·";
        msg.innerHTML = '<span style="color:var(--muted)">None — empty pocket. The None arm ran: println!("nothing there")</span>';
      }
      win.classList.remove("flip");
    }, 600);
  });
}

/* result */
function initResult(root, id){
  const box = $("#rp-" + id + "-box"), msg = $("#rp-" + id + "-msg");
  $("#rp-" + id + "-read").addEventListener("click", () => {
    box.innerHTML = "";
    const ok = Math.random() > 0.45;
    const item = document.createElement("div");
    item.className = "result-item " + (ok ? "ok" : "err");
    item.textContent = ok ? 'Ok("hello from notes.txt")' : "Err(NotFound)";
    box.appendChild(item);
    setMsg(msg, ok
      ? 'match caught <span class="chip">Ok(text)</span> → printed the content. Safe.'
      : 'match caught <span class="chip">Err(e)</span> → printed the reason. Safe. No crash. This is why Rust forces you to look.', ok ? "ok" : "");
  });
  $("#rp-" + id + "-unwrap").addEventListener("click", () => {
    box.innerHTML = "";
    const ok = Math.random() > 0.45;
    if (ok){
      const item = document.createElement("div");
      item.className = "result-item ok";
      item.textContent = 'Ok("hello") — unwrap() worked this time';
      box.appendChild(item);
      setMsg(msg, "unwrap() got lucky — it was Ok. But…", "ok");
    } else {
      const item = document.createElement("div");
      item.className = "result-item panic";
      item.textContent = "PANIC! thread 'main' panicked: called `Result::unwrap()` on an `Err` value";
      box.appendChild(item);
      setMsg(msg, "unwrap() was WRONG — the program panicked and stopped. That's the crash match protects you from.", "err");
    }
  });
}

/* files */
function initFiles(root, id){
  const fileZone = $("#fl-" + id + "-file"), meta = $("#fl-" + id + "-meta"), out = $("#fl-" + id + "-out"), msg = $("#fl-" + id + "-msg");
  let exists = false;
  const render = () => {
    fileZone.innerHTML = exists
      ? '<div class="file-icon"><div class="fold"></div>📄</div>'
      : "";
    meta.textContent = exists ? "note.txt — 12 bytes on disk" : "no file on the disk";
  };
  $("#fl-" + id + "-write").addEventListener("click", () => {
    const v = $("#fl-" + id + "-in").value.trim() || "hello file!";
    exists = true;
    out.textContent = "";
    setMsg(msg, 'fs::write("note.txt", "' + esc(v) + '") — the note is saved to disk.', "ok");
    render();
  });
  $("#fl-" + id + "-read").addEventListener("click", () => {
    if (!exists){ out.textContent = "Err: file not found"; setMsg(msg, "no file! fs::read_to_string gives you Err — that's why we handle Result.", "err"); return; }
    const v = $("#fl-" + id + "-in").value.trim() || "hello file!";
    out.textContent = 'Ok("' + esc(v) + '")';
    setMsg(msg, "read back Ok. The file survived between clicks — that's what files are for.", "ok");
  });
  $("#fl-" + id + "-del").addEventListener("click", () => {
    if (!exists){ setMsg(msg, "nothing to delete.", "err"); return; }
    exists = false;
    out.textContent = "";
    setMsg(msg, "fs::remove_file — note deleted. It's really gone from the disk.", "ok");
    render();
  });
  render();
}

/* quiz */
function initQuiz(root, id){
  const scoreEl = $("#qz-" + id + "-score");
  let answered = 0, score = 0;
  root.querySelectorAll(".quiz-card").forEach(card => {
    const qi = +card.dataset.qi;
    card.querySelectorAll(".quiz-opt").forEach(btn => {
      btn.addEventListener("click", () => {
        if (card.dataset.done) return;
        card.dataset.done = "1";
        const oi = +btn.dataset.oi;
        const right = oi === QUIZ[qi].a;
        if (right) score++;
        answered++;
        card.querySelectorAll(".quiz-opt").forEach(b => {
          b.classList.add(+b.dataset.oi === QUIZ[qi].a ? "right" : "wrong");
        });
        const why = $("#qz-" + id + "-why-" + qi);
        why.innerHTML = (right ? "<b>✅ Correct!</b> " : "<b>❌ Not quite.</b> ") + QUIZ[qi].why;
        scoreEl.textContent = score + " / " + QUIZ.length + (answered === QUIZ.length
          ? (score === QUIZ.length ? " — PERFECT. The foundation is solid. Go build." : " — revisit the lessons you missed, then come back.")
          : " — keep going, " + (QUIZ.length - answered) + " to go");
        if (answered === QUIZ.length){
          scoreEl.style.color = score === QUIZ.length ? "var(--success)" : "var(--muted)";
        }
      });
    });
  });
}

/* water flow */
function initFlow(root, id){
  const belt = $("#flw-" + id + "-belt");
  const run = $("#flw-" + id + "-run");
  if (!belt || !run) return;
  let t = null;
  const play = () => {
    if (t) clearTimeout(t);
    belt.dataset.on = "1";
    t = setTimeout(() => { belt.dataset.on = "0"; t = null; }, 3200 + (belt.children.length * 700));
  };
  run.addEventListener("click", play);
}

/* shape rack */
function initShapeRack(root, id){
  const out = $("#sr-" + id + "-out"), msg = $("#sr-" + id + "-msg");
  const show = (html, note, cls) => { out.innerHTML = html; setMsg(msg, note, cls); };
  $("#sr-" + id + "-arr").addEventListener("click", () =>
    show("<span class='eq'>let numbers: [i32; 3]</span> = <span class='res'>[5, 9, 1]</span>",
      "Array — a locker wall: <b>same kind</b>, <b>fixed size</b> decided up front.", "ok"));
  $("#sr-" + id + "-tup").addEventListener("click", () =>
    show("<span class='eq'>let trio: (i32, &str, bool)</span> = <span class='res'>(5, \"rust\", true)</span>",
      "Tuple — a snack box: <b>mixed kinds</b> travel together.", "ok"));
  $("#sr-" + id + "-sli").addEventListener("click", () =>
    show("<span class='eq'>let window = &numbers[0..2];</span> <span class='res'>// looks at 2 slots</span>",
      "Slice — a window: you <b>see</b> the items, you don't own or copy them.", "ok"));
}

/* label maker */
function initLabelMaker(root, id){
  const shelf = $("#lm-" + id + "-shelf"), msg = $("#lm-" + id + "-msg");
  const keyIn = $("#lm-" + id + "-key"), valIn = $("#lm-" + id + "-val");
  const map = Object.create(null);
  const render = () => {
    const keys = Object.keys(map);
    shelf.innerHTML = keys.length
      ? keys.map(k => `<div class="lm-tag"><b>[${esc(k)}]</b> ${esc(map[k])}</div>`).join("")
      : "";
  };
  $("#lm-" + id + "-put").addEventListener("click", () => {
    const k = keyIn.value.trim(), v = valIn.value.trim();
    if (!k || !v){ setMsg(msg, "give it a label AND a value first!", "err"); return; }
    map[k] = v;
    render();
    setMsg(msg, "map.insert(\"" + esc(k) + "\", \"" + esc(v) + "\") — label stuck. Now try Look up.", "ok");
  });
  $("#lm-" + id + "-get").addEventListener("click", () => {
    const k = keyIn.value.trim();
    if (!k){ setMsg(msg, "type a label to look up!", "err"); return; }
    if (k in map){ setMsg(msg, "map.get(\"" + esc(k) + "\") → Some(\"" + esc(map[k]) + "\") — found instantly.", "ok"); }
    else { setMsg(msg, "map.get(\"" + esc(k) + "\") → <b>None</b> — no jar with that label. Option to the rescue!", "err"); }
  });
  $("#lm-" + id + "-clear").addEventListener("click", () => { Object.keys(map).forEach(k => delete map[k]); render(); setMsg(msg, "shelf emptied.", ""); });
  render();
}

/* conveyor */
function initConveyor(root, id){
  const line = $("#cv-" + id + "-line"), msg = $("#cv-" + id + "-msg");
  const STAGES = [
    ["[1, 2, 3, 4, 5]", ".iter() — on the belt"],
    ["× 2", ".map(|x| x * 2)"],
    ["[2, 4, 6, 8, 10]", "every item doubled"],
    ["keep > 4", ".filter(|x| x > 4)"],
    ["[6, 8, 10]", ".collect() → a new Vec!"]
  ];
  let token = 0;
  const stop = () => token++;
  const run = () => {
    stop(); const t = token;
    line.innerHTML = "";
    setMsg(msg, "");
    STAGES.forEach((s, i) => {
      setTimeout(() => {
        if (t !== token) return;
        const node = document.createElement("div");
        node.className = "cv-node" + (i === STAGES.length - 1 ? " out" : " done");
        node.textContent = s[0];
        line.appendChild(node);
        if (i < STAGES.length - 1){
          const arrow = document.createElement("span");
          arrow.className = "cv-arrow";
          arrow.textContent = "→";
          line.appendChild(arrow);
        }
        if (i === STAGES.length - 1){
          setMsg(msg, "<b>[1,2,3,4,5]</b> entered the belt and came out as <b>[6, 8, 10]</b> — the closure was called on every item.", "ok");
        }
      }, 420 * i);
    });
  };
  $("#cv-" + id + "-run").addEventListener("click", run);
  $("#cv-" + id + "-reset").addEventListener("click", () => { stop(); line.innerHTML = ""; setMsg(msg, ""); });
}

/* lifeguard */
function initLifeguard(root, id){
  const zone = root.querySelector(".lg-zone"), box = $("#lg-" + id + "-box"), msg = $("#lg-" + id + "-msg");
  const flash = (ok) => {
    box.classList.remove("shake");
    void box.offsetWidth;
    if (!ok) box.classList.add("shake");
  };
  $("#lg-" + id + "-in").addEventListener("click", () => {
    flash(true);
    setMsg(msg, "<b>&amp;s inside the zone</b> — the water is still there, the borrow is fine. <b>OK</b>.", "ok");
  });
  $("#lg-" + id + "-out").addEventListener("click", () => {
    flash(false);
    setMsg(msg, "<b>ERROR: borrowed value does not live long enough.</b> You carried the cup outside the zone, but the pool drained at the zone's end. Lifeguard says no.", "err");
  });
}

/* player upgrade */
function initUpgrade(root, id){
  const hp = $("#pg-" + id + "-hp"), hptext = $("#pg-" + id + "-hptext"), msg = $("#pg-" + id + "-msg");
  let health = 100;
  const render = () => {
    const pct = Math.max(0, health);
    hp.style.width = pct + "%";
    hp.style.background = pct > 50 ? "" : "linear-gradient(90deg,#e08a64,#b0562f)";
    hptext.textContent = "HP " + pct + " / 100";
  };
  $("#pg-" + id + "-hit").addEventListener("click", () => {
    health = Math.max(0, health - 10);
    render();
    setMsg(msg, "fn hit(&mut self, dmg: i32) — <b>&mut self</b>: the method <i>changes</i> the card. hp 100 → " + health, "ok");
  });
  $("#pg-" + id + "-heal").addEventListener("click", () => {
    health = Math.min(100, health + 5);
    render();
    setMsg(msg, "fn heal(&mut self, amount: i32) — another <b>&mut self</b> method. hp → " + health, "ok");
  });
  $("#pg-" + id + "-name").addEventListener("click", () => {
    setMsg(msg, "fn name(&self) -> String — <b>&self</b>: only <i>reads</i> the card. Returns \"Rusty\" — no mut needed.", "ok");
  });
  render();
}

/* ability cards */
function initAbility(root, id){
  const card = $("#ab-" + id + "-card"), msg = $("#ab-" + id + "-msg");
  const ANIMALS = {
    dog:{icon:"🐶", name:"Dog", traits:["Bark (bark trait)","Fetch (fetch trait)","Describe (describe trait)"], note:"impl Describe for Dog — Dog's own version of the ability."},
    cat:{icon:"🐱", name:"Cat", traits:["Meow (meow trait)","Sneak (sneak trait)","Describe (describe trait)"], note:"impl Describe for Cat — same card, Cat's version."},
    bird:{icon:"🐦", name:"Bird", traits:["Fly (fly trait)","Sing (sing trait)","Describe (describe trait)"], note:"All three hold the Describe card — one function works for all of them."}
  };
  const show = (key) => {
    const a = ANIMALS[key];
    card.innerHTML = `
      <div class="ab-name">${a.icon} ${a.name}</div>
      ${a.traits.map(t => `<span class="ab-trait">${t}</span>`).join("")}`;
    setMsg(msg, a.note, "ok");
  };
  $("#ab-" + id + "-dog").addEventListener("click", () => show("dog"));
  $("#ab-" + id + "-cat").addEventListener("click", () => show("cat"));
  $("#ab-" + id + "-bird").addEventListener("click", () => show("bird"));
  show("dog");
}

/* mold */
function initMold(root, id){
  const mold = $("#md-" + id + "-mold"), msg = $("#md-" + id + "-msg");
  const FILLS = {
    i:{t:"Rectangle<i32>", body:"{ width: 5, height: 3 }", note:"Filling 1: numbers. Same mold, decided later."},
    f:{t:"Rectangle<f64>", body:"{ width: 2.5, height: 1.5 }", note:"Filling 2: decimals. The mold never changed — only the dough."},
    s:{t:"Rectangle<String>", body:"{ width: \"wide\", height: \"tall\" }", note:"Filling 3: text! One mold, any type. That's generics."}
  };
  const show = (k) => {
    const f = FILLS[k];
    mold.innerHTML = `<div class="md-shape"><b>${f.t}</b>${f.body}</div>`;
    setMsg(msg, f.note, "ok");
  };
  $("#md-" + id + "-i").addEventListener("click", () => show("i"));
  $("#md-" + id + "-f").addEventListener("click", () => show("f"));
  $("#md-" + id + "-s").addEventListener("click", () => show("s"));
  show("i");
}

/* ============================================================
   GENERAL TRACK WIDGETS
============================================================ */
/* threads — chefs race */
function initThreads(root, id){
  const race = $("#th-" + id + "-race"), msg = $("#th-" + id + "-msg");
  const CHEFS = [
    { n:"chef 1 — boiling water", c:"t1", speed:90, finish:"water is boiling!" },
    { n:"chef 2 — peeling onions", c:"t2", speed:70, finish:"onions are peeled!" },
    { n:"chef 3 — setting the table", c:"t3", speed:55, finish:"table is set!" }
  ];
  const mine = [];
  let runs = 0, done = 0;
  const build = () => {
    race.innerHTML = CHEFS.map(c => `
      <div class="race-track"><span class="r-name">${c.n}</span><div class="r-rail"><div class="r-fill ${c.c}"></div></div></div>`).join("");
  };
  $("#th-" + id + "-run").addEventListener("click", () => {
    rzStop(mine);
    done = 0; runs++;
    build();
    CHEFS.forEach((c, ci) => {
      const fill = race.children[ci].querySelector(".r-fill");
      let p = 0;
      const t = rzInterval(() => {
        p += 2 + (runs % 3) * 0.4;
        if (p >= 100){
          p = 100; clearInterval(t);
          done++;
          if (done === CHEFS.length) setMsg(msg, "<b>All 3 chefs finished.</b> The main thread waited with <code class='inline'>join()</code> until the LAST chef was done — nobody left the kitchen early. That's concurrency.", "ok");
        }
        fill.style.width = Math.min(100, p) + "%";
      }, c.speed, mine);
    });
    setMsg(msg, "Hired 3 chefs — they cook <b>at the same time</b>. Each has its own counter and its own speed, just like real threads.", "");
  });
  $("#th-" + id + "-reset").addEventListener("click", () => {
    rzStop(mine);
    build(); setMsg(msg, "Kitchen reset. Hire them again — and watch the finish line stagger.", "");
  });
  build();
}

/* async — one chef, many orders */
function initAsyncPlay(root, id){
  const msg = $("#as-" + id + "-msg");
  const mine = [];
  const TASKS = [
    { n:"boil water", ticks:8, dur:400 },
    { n:"peel onions", ticks:6, dur:300 },
    { n:"set table", ticks:3, dur:220 }
  ];
  const build = () => {
    root.querySelectorAll("[data-as-row]").forEach(el => el.remove());
    TASKS.forEach(t => {
      const row = document.createElement("div");
      row.className = "async-row"; row.setAttribute("data-as-row", "");
      row.innerHTML = `<span class="a-name">${t.n}</span><div class="a-ticks">${Array.from({length: t.ticks}, (_, i) => `<div class="a-tick" data-ti="${i}">${i + 1}</div>`).join("")}</div>`;
      root.querySelector(".w-row").after(row);
    });
  };
  $("#as-" + id + "-run").addEventListener("click", async () => {
    rzStop(mine);
    build();
    const rows = [...root.querySelectorAll("[data-as-row]")];
    const states = TASKS.map(t => ({ p: 0, max: t.ticks, dur: t.dur }));
    const tickEl = (ri, ti) => rows[ri].querySelector(`[data-ti="${ti}"]`);
    let remaining = TASKS.length;
    const step = ri => {
      const s = states[ri];
      if (s.p >= s.max) return;
      s.p++;
      rows.forEach((_, oi) => rows[oi].querySelectorAll(".a-tick.hot").forEach(e => e.classList.remove("hot")));
      if (s.p <= s.max) tickEl(ri, s.p - 1).classList.add("hot");
      if (s.p === s.max){
        tickEl(ri, s.p - 1).classList.remove("hot");
        tickEl(ri, s.p - 1).classList.add("done");
        remaining--;
        if (remaining === 0){
          setMsg(msg, "<b>One chef, three orders — done!</b> Each task was <i>paused while the chef did other work</i> (the .await whistle). No chef was hired; nobody stood still.", "ok");
        }
      }
    };
    let turn = 0;
    const t = rzInterval(() => {
      const active = TASKS.map((_, i) => i).filter(i => states[i].p < states[i].max);
      if (active.length === 0){ clearInterval(t); return; }
      step(active[turn % active.length]);
      turn++;
    }, 300, mine);
    setMsg(msg, "The chef starts the kettle (task 1, tick 1)… then <b>peels onions while it boils</b>. Watch the hot tick jump between rows.", "");
  });
  $("#as-" + id + "-reset").addEventListener("click", () => {
    rzStop(mine);
    build(); setMsg(msg, "Reset. Run it and watch ONE chef juggle all three orders.", "");
  });
  build();
}

/* smart pointers — the note */
function initSmartPtr(root, id){
  const stage = $("#sp-" + id + "-stage"), msg = $("#sp-" + id + "-msg");
  const stackBox = extra => `<div class="sp-box"><small>the stack — your code</small>${extra}</div>`;
  const heapBox = inner => `<div class="sp-heap"><small>the heap — the warehouse</small>${inner}</div>`;
  const show = (mode) => {
    if (mode === "plain"){
      stage.innerHTML = stackBox("<b>s: String</b><br>\"hello\" lives right here") + `<span class="sp-arrow">·</span>` + stackBox("<b>ordinary box</b> — value &amp; note are neighbors");
      setMsg(msg, "<b>Plain variable:</b> the value lives on the stack, right next to your code. No note needed — it IS here.", "ok");
    }
    if (mode === "box"){
      stage.innerHTML = stackBox("<b>big: Box&lt;Vec&gt;</b><br>tiny note") + `<span class="sp-arrow">→</span>` + heapBox("<b>the numbers</b><br>vec![1, 2, 3] live in the warehouse");
      setMsg(msg, "<b>Box&lt;T&gt;:</b> the heavy data moved to the heap warehouse. Your code keeps only the tiny note. One owner — when the note is torn up, the warehouse shelf is freed.", "ok");
    }
    if (mode === "rc"){
      stage.innerHTML = stackBox("<b>a: Rc — note 1</b>") + `<span class="sp-arrow">→</span>` + heapBox("<b>the book</b>") + `<span class="sp-arrow">←</span>` + stackBox("<b>b: Rc — note 2</b>");
      stage.innerHTML += `<span class="sp-arrow">↑</span>` + stackBox("<b>c: Rc — note 3</b>");
      setMsg(msg, "<b>Rc&lt;T&gt;:</b> three notes point at one book. The shelf is cleaned only when the <i>last</i> note is torn up. Shared ownership — the book club.", "ok");
    }
  };
  $("#sp-" + id + "-plain").addEventListener("click", () => show("plain"));
  $("#sp-" + id + "-box").addEventListener("click", () => show("box"));
  $("#sp-" + id + "-rc").addEventListener("click", () => show("rc"));
  show("plain");
}

/* testing — safety net */
function initTestPlay(root, id){
  const dots = $("#ts-" + id + "-dots"), msg = $("#ts-" + id + "-msg");
  const mine = [];
  const TESTS = [
    { n:"adds_two_and_three", ok:true },
    { n:"subtracts", ok:true },
    { n:"empty_string_is_ok", ok:true },
    { n:"handles_zero", ok:true },
    { n:"big_numbers", ok:true },
    { n:"weird_input", ok:false, why:"expected 1, got 2 — feed it the weird input and it disagrees" }
  ];
  const build = () => {
    dots.innerHTML = TESTS.map((t, i) => `<div class="t-dot" data-ti="${i}">${i + 1}</div>`).join("");
  };
  $("#ts-" + id + "-run").addEventListener("click", () => {
    rzStop(mine);
    build();
    setMsg(msg, "<b>cargo test</b> — running 6 tests…", "");
    let failed = 0;
    TESTS.forEach((t, i) => {
      const d = setTimeout(() => {
        if (!dots.isConnected) return;
        const el = dots.querySelector(`[data-ti="${i}"]`);
        el.classList.add(t.ok ? "pass" : "fail");
        el.textContent = t.ok ? "✓" : "✗";
        if (!t.ok){
          failed++;
          setMsg(msg, `<b>1 test failed:</b> weird_input — ${t.why}. The net caught it. Read the red line, fix the code, run again.`, "err");
        }
        if (i === TESTS.length - 1){
          setMsg(msg, `<b>${TESTS.length - failed} passed, ${failed} failed.</b> A failing test is never an enemy — it's a roadmap. It tells you EXACTLY what to fix.`, failed ? "err" : "ok");
        }
      }, 350 * (i + 1));
      mine.push(d);
    });
  });
  $("#ts-" + id + "-reset").addEventListener("click", () => {
    rzStop(mine);
    build(); setMsg(msg, "Reset. Run the net again — watch the verdict roll in.", "");
  });
  build();
}

/* modules — the house */
function initModuleMap(root, id){
  const msg = $("#mn-" + id + "-msg");
  const toggle = (nodeId, kidsId, pubKids, privKids, note) => {
    const node = $("#" + nodeId), kids = $("#" + kidsId);
    node.addEventListener("click", () => {
      const open = node.classList.toggle("open");
      kids.innerHTML = open ? `
        ${pubKids.map(k => `<div class="mod-kid"><span class="k-ic">🚪</span>${k} <span class="m-items">pub — open door</span></div>`).join("")}
        ${privKids.map(k => `<div class="mod-kid"><span class="k-ic">🔒</span>${k} <span class="m-items">private — locked</span></div>`).join("")}
      ` : "";
      setMsg(msg, note(open), open ? "ok" : "");
    });
  };
  toggle("mn-" + id + "-pay", "mn-" + id + "-paykids",
    ["fn validate_card()"], ["fn secret_fee()"],
    open => open ? "<b>mod payment</b> — <code class='inline'>validate_card</code> has an open door (pub): anyone in the house may use it. <code class='inline'>secret_fee</code> is locked: only payment's own room can see it. That hiding is the whole point of modules." : "Closed the payment room.");
  toggle("mn-" + id + "-mail", "mn-" + id + "-mailkids",
    ["fn send()"], ["fn rate_limit()"],
    open => open ? "<b>mod mailer</b> — <code class='inline'>send</code> is public (the mailbox), <code class='inline'>rate_limit</code> is private (the mailroom's own rules). Rooms hide what the rest of the house doesn't need." : "Closed the mailroom.");
  setMsg(msg, "This is the whole program: main.rs at the front door, two rooms inside. <b>Click a room</b> to open its doors.", "");
}

/* big O — shapes of time */
function initBigO(root, id){
  const nEl = $("#bg-" + id + "-n"), val = $("#bg-" + id + "-val"), msg = $("#bg-" + id + "-msg");
  const bars = {
    o1: $("#bg-" + id + "-o1"),
    olog: $("#bg-" + id + "-olog"),
    on: $("#bg-" + id + "-on"),
    on2: $("#bg-" + id + "-on2")
  };
  const steps = n => ({
    o1: 1,
    olog: Math.max(1, Math.round(Math.log2(n)) + 1),
    on: n,
    on2: n * n
  });
  const render = () => {
    const n = +nEl.value;
    const s = steps(n);
    val.textContent = "n = " + n;
    const pct = k => Math.min(100, Math.round(s[k] / 50 * 100));
    bars.o1.style.width = pct("o1") + "%";
    bars.olog.style.width = pct("olog") + "%";
    bars.on.style.width = pct("on") + "%";
    bars.on2.style.width = pct("on2") + "%";
    setMsg(msg, `n = ${n} → locker: <b>${s.o1}</b> step · halving: <b>${s.olog}</b> steps · reading all: <b>${s.on}</b> steps · comparing every pair: <b>${s.on2}</b> steps. <b>See how O(n²) hits the wall?</b>`, "");
  };
  nEl.addEventListener("input", render);
  render();
}

/* array vs linked list */
function initAList(root, id){
  const arr = $("#al-" + id + "-arr"), lst = $("#al-" + id + "-lst"), msg = $("#al-" + id + "-msg");
  let vals = [7, 3, 9, 1];
  const render = () => {
    arr.innerHTML = vals.map((v, i) => `<div class="al-locker" data-li="${i}">${v}</div>`).join("") + `<div class="al-locker" style="opacity:.25">…</div>`;
    lst.innerHTML = vals.map(v => `<div class="al-car">${v}<br><small>next →</small></div>`).join("") + `<div class="al-car" style="opacity:.25">∅</div>`;
  };
  $("#al-" + id + "-look").addEventListener("click", () => {
    arr.querySelectorAll(".al-locker").forEach(e => e.classList.remove("jump"));
    arr.querySelector('[data-li="2"]').classList.add("jump");
    setMsg(msg, "<b>v[2] = 9 — one step.</b> Locker 2 is exactly there. Arrays pick instantly: <b>O(1)</b>.", "ok");
  });
  $("#al-" + id + "-ins").addEventListener("click", () => {
    vals = [7, 99, 3, 9, 1];
    render();
    arr.querySelector('[data-li="1"]').classList.add("jump");
    setMsg(msg, "<b>Inserting 99 at index 1:</b> everything from 99 on shoves one locker to the right. That shoving is <b>O(n)</b> — the price of instant picking.", "ok");
  });
  let walkTimer = null;
  $("#al-" + id + "-walk").addEventListener("click", () => {
    if (walkTimer) clearInterval(walkTimer);
    render();
    lst.querySelectorAll(".al-car").forEach(e => e.classList.remove("jump"));
    let i = 0;
    walkTimer = rzInterval(() => {
      const cars = [...lst.children].slice(0, -1);
      if (i < 3){
        cars[i].classList.add("jump");
        i++;
      } else {
        clearInterval(walkTimer);
        setMsg(msg, "<b>Found it after walking 3 cars from the front.</b> The train has no locker numbers — every search is a walk: <b>O(n)</b>. Easy insert, slow search. That's the trade.", "ok");
      }
    }, 500);
    setMsg(msg, "The train starts <b>walking from the front</b>, car by car…", "");
  });
  $("#al-" + id + "-reset").addEventListener("click", () => {
    if (walkTimer) clearInterval(walkTimer);
    vals = [7, 3, 9, 1];
    render(); setMsg(msg, "Reset. Array = instant pick. Train = easy insert. One click each, see the difference.", "");
  });
  render();
}

/* stacks & queues */
function initStackQue(root, id){
  const stack = $("#sq-" + id + "-stack"), queue = $("#sq-" + id + "-queue"), msg = $("#sq-" + id + "-msg");
  let s = 0, q = 0;
  const render = () => {
    stack.innerHTML = s ? `<div class="sq-item teal">plate ${s}</div>` + (s > 1 ? `<div class="sq-item teal">plate ${s - 1}</div>` : "") : "";
    queue.innerHTML = "";
    for (let i = 1; i <= q; i++) queue.innerHTML += `<div class="sq-item violet">person ${i}</div>`;
  };
  $("#sq-" + id + "-push").addEventListener("click", () => {
    s++;
    stack.innerHTML = `<div class="sq-item teal">plate ${s}</div>` + stack.innerHTML;
    setMsg(msg, `<b>push — plate ${s} lands on top.</b> Only the top is touchable. Last one down, first one up: <b>LIFO</b>.`, "ok");
  });
  $("#sq-" + id + "-pop").addEventListener("click", () => {
    if (!s) return setMsg(msg, "No plates left — the pile is empty. (Push first!)", "err");
    const top = s;
    s--;
    stack.querySelector(".sq-item").remove();
    setMsg(msg, `<b>pop — you take plate ${top}.</b> The one put down LAST comes off FIRST. That's why Undo uses a stack.`, "ok");
  });
  $("#sq-" + id + "-join").addEventListener("click", () => {
    q++;
    queue.innerHTML += `<div class="sq-item violet">person ${q}</div>`;
    setMsg(msg, `<b>push_back — person ${q} joins the back of the line.</b> They wait their turn.`, "ok");
  });
  $("#sq-" + id + "-serve").addEventListener("click", () => {
    if (!q) return setMsg(msg, "Empty line — nobody to serve. (Join first!)", "err");
    queue.querySelector(".sq-item").remove();
    setMsg(msg, `<b>pop_front — the FIRST person in line gets served.</b> First in, first out: <b>FIFO</b>. That's the printer queue.`, "ok");
    q--;
  });
  render();
  setMsg(msg, "Stack = plates (touch only the top). Queue = line (serve the front). Push/pop vs join/serve — that's the entire lesson.", "");
}

/* binary search */
function initBinSearch(root, id){
  const lowEl = $("#bs-" + id + "-low"), highEl = $("#bs-" + id + "-high"),
        midEl = $("#bs-" + id + "-mid"), stepEl = $("#bs-" + id + "-step"), msg = $("#bs-" + id + "-msg");
  const ARR = [2, 5, 8, 12, 20], target = 12;
  const mine = [];
  let running = false;
  const reset = () => {
    rzStop(mine);
    running = false;
    lowEl.textContent = "low: 0"; highEl.textContent = "high: 4";
    midEl.textContent = "target: 12";
    stepEl.textContent = "sorted [2, 5, 8, 12, 20]";
    setMsg(msg, "Ready. The list is sorted — so the middle always tells us which half to throw away.", "");
  };
  $("#bs-" + id + "-find").addEventListener("click", () => {
    if (running) return;
    running = true;
    setMsg(msg, "<b>Leap 1:</b> check the middle…", "");
    let low = 0, high = ARR.length - 1, leaps = 0;
    const t = rzInterval(() => {
      if (low > high){
        clearInterval(t); running = false;
        setMsg(msg, "Not found. (It's not in the sorted list.)", "err");
        return;
      }
      const mid = Math.floor((low + high) / 2);
      leaps++;
      lowEl.textContent = "low: " + low; highEl.textContent = "high: " + high;
      midEl.textContent = "check " + ARR[mid];
      stepEl.textContent = "looking between index " + low + " and " + high;
      if (ARR[mid] === target){
        midEl.textContent = "FOUND " + target + "!";
        stepEl.textContent = "only " + leaps + " leap" + (leaps > 1 ? "s" : "") + " — O(log n)";
        setMsg(msg, `<b>Found 12 in ${leaps} leaps!</b> Five items, three possible middles — binary search always halves the territory. 100 items → 7 leaps. A billion → 30.`, "ok");
        clearInterval(t); running = false;
        return;
      }
      if (ARR[mid] < target){
        stepEl.textContent = ARR[mid] + " is too small → throw away the left half";
        low = mid + 1;
      } else {
        stepEl.textContent = ARR[mid] + " is too big → throw away the right half";
        high = mid - 1;
      }
    }, 900, mine);
  });
  $("#bs-" + id + "-reset").addEventListener("click", reset);
  reset();
}

/* sorting — bubble visual */
function initSorter(root, id){
  const bars = $("#so-" + id + "-bars"), msg = $("#so-" + id + "-msg");
  const mine = [];
  let arr = [9, 2, 7, 1, 5];
  const render = () => {
    const max = Math.max(...arr);
    bars.innerHTML = arr.map((v, i) => `<div class="sort-bar" data-bi="${i}" style="height:${Math.round(v / max * 100)}%">${v}</div>`).join("");
  };
  $("#so-" + id + "-run").addEventListener("click", () => {
    rzStop(mine);
    render();
    const a = arr.slice();
    const n = a.length;
    let i = 0, j = 0, comparisons = 0, swaps = 0;
    const t = rzInterval(() => {
      if (i >= n - 1){
        bars.querySelectorAll(".sort-bar").forEach(b => b.classList.add("sorted"));
        setMsg(msg, `<b>Sorted! [${a.join(", ")}]</b> — ${comparisons} comparisons, ${swaps} swaps. Bubble sort is simple but O(n²): the neighbors keep swapping until nobody swaps.`, "ok");
        clearInterval(t); return;
      }
      const e1 = bars.querySelector(`[data-bi="${j}"]`), e2 = bars.querySelector(`[data-bi="${j + 1}"]`);
      bars.querySelectorAll(".sort-bar").forEach(b => b.classList.remove("compare", "swap"));
      e1.classList.add("compare"); e2.classList.add("compare");
      comparisons++;
      if (a[j] > a[j + 1]){
        const l = a[j], r = a[j + 1];
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
        e1.classList.add("swap"); e2.classList.add("swap");
        e1.style.height = Math.round(a[j] / Math.max(...a) * 100) + "%"; e1.textContent = a[j];
        e2.style.height = Math.round(a[j + 1] / Math.max(...a) * 100) + "%"; e2.textContent = a[j + 1];
        setMsg(msg, `Comparing neighbors: ${l} vs ${r} — wrong order → <b>swap!</b> (swap #${swaps})`, "");
      }
      j++;
      if (j >= n - 1 - i){
        j = 0; i++;
        bars.querySelector(`[data-bi="${n - i}"]`).classList.add("sorted");
        setMsg(msg, `Pass ${i} done — the biggest remaining bubble floated to its spot.`, "");
      }
    }, 700, mine);
  });
  $("#so-" + id + "-reset").addEventListener("click", () => {
    rzStop(mine);
    arr = [9, 2, 7, 1, 5];
    render(); setMsg(msg, "Reset. Run it and watch bubble sort swap neighbors until calm. That's what list.sort() does for you.", "");
  });
  render();
  setMsg(msg, "Press run — bubble sort: compare neighbors, swap when wrong, repeat passes. Watch the swaps.", "");
}

/* recursion — dive & resurface */
function initRecursion(root, id){
  const line = $("#rc-" + id + "-line"), msg = $("#rc-" + id + "-msg");
  const mine = [];
  let running = false, token = 0;
  const reset = () => {
    rzStop(mine);
    running = false; token++;
    line.innerHTML = "";
    setMsg(msg, "Ready. countdown(5) will dive down to countdown(0)… then resurface, one return at a time.", "");
  };
  $("#rc-" + id + "-run").addEventListener("click", async () => {
    if (running) return;
    running = true;
    const t = ++token;
    line.innerHTML = "";
    const chip = (txt, cls) => {
      const d = document.createElement("span");
      d.className = "rec-chip" + (cls ? " " + cls : "");
      d.textContent = txt;
      line.appendChild(d);
      return d;
    };
    setMsg(msg, "<b>Diving…</b> each call is a smaller copy of the same recipe. A new doll opens.", "");
    for (let n = 5; n >= 0; n--){
      chip("countdown(" + n + ")", "dive");
      await rzSleep(650);
      if (t !== token) return;
    }
    chip("← base case: n == 0 — stop!", "");
    setMsg(msg, "<b>Base case reached!</b> The smallest doll doesn't open. Now every waiting call can <i>return</i> — resurfacing in reverse order. That's the recursion flow.", "ok");
    await rzSleep(900);
    if (t !== token) return;
    const chips = [...line.querySelectorAll(".rec-chip")];
    for (let i = chips.length - 2; i >= 0; i--){
      chips[i].classList.remove("dive");
      chips[i].classList.add("resurface");
      chips[i].textContent = chips[i].textContent.replace("countdown", "return ") + " ✓";
      await rzSleep(550);
      if (t !== token) return;
    }
    setMsg(msg, "<b>Resurfaced.</b> Deepest call returned first, back up to countdown(5). Trust the smaller version — the base case + smaller call IS the whole algorithm.", "ok");
    running = false;
  });
  $("#rc-" + id + "-reset").addEventListener("click", reset);
  reset();
}

/* tree — binary search tree */
function initTreeView(root, id){
  const stage = $("#tr-" + id + "-stage"), msg = $("#tr-" + id + "-msg");
  const TREE = { v: 5, l: { v: 3, r: { v: 4 } }, r: { v: 8, l: { v: 7 } } };
  let tree = TREE;
  const render = () => {
    stage.innerHTML = `
      <div class="tree-root">root: ${tree.v}</div>
      <div class="tree-line"></div>
      <div class="tree-row">
        <div class="tree-node">left: ${tree.l ? tree.l.v : "—"}</div>
        <div class="tree-node">right: ${tree.r ? tree.r.v : "—"}</div>
      </div>`;
  };
  const findPath = (n, t) => {
    if (!t) return null;
    if (t.v === n) return [t.v];
    const p = t.v > n ? findPath(n, t.l) : findPath(n, t.r);
    return p ? [t.v].concat(p) : null;
  };
  $("#tr-" + id + "-add").addEventListener("click", () => {
    tree = { v: 5, l: { v: 3, l: { v: 1 }, r: { v: 4 } }, r: { v: 8, l: { v: 7 } } };
    render();
    stage.querySelectorAll(".tree-node")[0].innerHTML = "left: 3<br><small>its left: 1</small>";
    setMsg(msg, "<b>insert(1):</b> 1 < 3 → it hangs left of 3. The rule never changes: <b>smaller goes left, bigger goes right</b>. That rule is what makes search fast.", "ok");
  });
  $("#tr-" + id + "-find").addEventListener("click", () => {
    const p = findPath(8, tree);
    if (!p) return;
    setMsg(msg, `<b>find(8):</b> 5 → ${p.join(" → ")}. ${p.length - 1} hops, and each hop throws away half the tree. Binary search, living in a tree: <b>O(log n)</b>.`, "ok");
    stage.querySelector(".tree-root").classList.add("vis");
  });
  $("#tr-" + id + "-traverse").addEventListener("click", () => {
    const order = [];
    const walk = n => { if (!n) return; walk(n.l); order.push(n.v); walk(n.r); };
    walk(tree);
    setMsg(msg, `<b>In-order traversal:</b> left → me → right gives ${order.join(", ")} — <b>sorted!</b> The tree keeps data sorted for free. That's why databases love trees.`, "ok");
  });
  $("#tr-" + id + "-reset").addEventListener("click", () => {
    tree = TREE;
    render();
    setMsg(msg, "Reset. A binary search tree: root 5, smaller left, bigger right. Try insert, find, traverse.", "");
  });
  render();
}

/* graph — BFS & DFS */
function initGraphView(root, id){
  const stage = $("#gr-" + id + "-stage"), msg = $("#gr-" + id + "-msg");
  const CITIES = [0, 1, 2, 3, 4, 5];
  const EDGES = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5]];
  let token = 0;
  const render = () => {
    let html = "";
    EDGES.forEach(([a, b]) => {
      html += `<div class="graph-city" data-ci="${a}">${a}</div><span class="graph-edge">↔</span><div class="graph-city" data-ci="${b}">${b}</div>`;
    });
    stage.innerHTML = html;
  };
  const visit = async (order, name) => {
    const t = ++token;
    stage.querySelectorAll(".graph-city").forEach(c => c.classList.remove("vis"));
    for (const c of order){
      if (t !== token) return false;
      const el = stage.querySelector(`[data-ci="${c}"]`);
      if (el) el.classList.add("vis");
      await rzSleep(550);
    }
    return t === token;
  };
  $("#gr-" + id + "-bfs").addEventListener("click", async () => {
    render();
    const bfs = [0, 1, 2, 3, 4, 5];
    setMsg(msg, "<b>BFS — breadth-first.</b> Flood: all roads from city 0 (1, 2), then all roads from THOSE (3, 4), ring by ring. Queue at the door. <b>Shortest paths, always.</b>", "");
    if (await visit(bfs, "BFS")) setMsg(msg, "<b>BFS order: 0 → 1, 2 → 3, 4 → 5.</b> Every ring explored before the next. If you're looking for the nearest café, BFS is your tool.", "ok");
  });
  $("#gr-" + id + "-dfs").addEventListener("click", async () => {
    render();
    const dfs = [0, 1, 3, 5, 2, 4];
    setMsg(msg, "<b>DFS — depth-first.</b> The maze explorer: follow one road to its end (0→1→3→5), then backtrack and try the next. Stack of junctions behind you.", "");
    if (await visit(dfs, "DFS")) setMsg(msg, "<b>DFS order: 0 → 1 → 3 → 5 (dead end) → back to 2 → 4.</b> Explores everything, in depth first. Memory: one stack. BFS: one queue. That's the whole difference.", "ok");
  });
  $("#gr-" + id + "-reset").addEventListener("click", () => {
    token++;
    render();
    setMsg(msg, "Cities 0–5 with roads. BFS floods ring by ring (queue); DFS follows one road to the end (stack).", "");
  });
  render();
}

/* heap — hospital line, bubble up & down */
function initHeaps(root, id){
  const stage = $("#hp-" + id + "-stage"), msg = $("#hp-" + id + "-msg");
  const SEQ = [4, 2, 9, 1, 6, 3];
  let heap = [3, 8, 5], si = 0, running = false, token = 0;
  const render = () => {
    let html = "", level = 0, i = 0;
    while (i < heap.length){
      let row = "";
      for (let j = 0; j < Math.pow(2, level) && i < heap.length; j++, i++){
        row += `<div class="hp-node${i === 0 ? " min" : ""}" data-hi="${i}">${heap[i]}</div>`;
      }
      html += `<div class="hp-row">${row}</div>`;
      level++;
      if (i < heap.length) html += `<div class="hp-link">⌄</div>`;
    }
    stage.innerHTML = html || `<div class="hp-row"><div class="hp-node min" style="opacity:.4">—</div></div>`;
  };
  $("#hp-" + id + "-push").addEventListener("click", async () => {
    if (running) return;
    if (si >= SEQ.length) return setMsg(msg, "The whole queue has arrived — try popping the min now.", "err");
    running = true;
    const t = ++token;
    const v = SEQ[si++];
    heap.push(v);
    render();
    setMsg(msg, `<b>push(${v}):</b> the patient arrives at the end of the line…`, "");
    let i = heap.length - 1;
    await rzSleep(450);
    if (t !== token) return;
    while (i > 0){
      const p = Math.floor((i - 1) / 2);
      if (heap[p] <= heap[i]) break;
      const nodes = stage.querySelectorAll(".hp-node");
      nodes[p].classList.add("hot"); nodes[i].classList.add("hot");
      setMsg(msg, `<b>${heap[i]} is more urgent than parent ${heap[p]} — bubble up!</b> Swap, then check again.`, "");
      await rzSleep(650);
      if (t !== token) return;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      nodes[p].textContent = heap[p]; nodes[i].textContent = heap[i];
      nodes[p].classList.remove("hot"); nodes[i].classList.remove("hot");
      i = p;
      await rzSleep(200);
      if (t !== token) return;
    }
    render();
    setMsg(msg, `<b>push(${v}) done — the heap rule holds again.</b> Smallest always on top. That was O(log n) hops.`, "ok");
    running = false;
  });
  $("#hp-" + id + "-pop").addEventListener("click", async () => {
    if (running) return;
    if (!heap.length) return setMsg(msg, "The queue is empty — nobody to treat. Push first!", "err");
    running = true;
    const t = ++token;
    const min = heap[0];
    const rootEl = stage.querySelector('[data-hi="0"]');
    rootEl.classList.add("hot");
    setMsg(msg, `<b>pop-min: the front is ${min} — always the smallest.</b> Treat that patient!`, "ok");
    await rzSleep(750);
    if (t !== token) return;
    const last = heap.pop();
    if (!heap.length){
      render();
      setMsg(msg, `<b>Treated ${min}!</b> The line is empty. Every pop-min takes O(log n) hops — that's a priority queue.`, "ok");
      running = false;
      return;
    }
    heap[0] = last;
    render();
    setMsg(msg, `<b>${last} moves up to the front — now bubble down.</b> Swap with the smaller child while the rule is broken.`, "");
    let i = 0;
    await rzSleep(550);
    if (t !== token) return;
    while (true){
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l >= heap.length) break;
      const small = (r < heap.length && heap[r] < heap[l]) ? r : l;
      if (heap[small] >= heap[i]) break;
      const nodes = stage.querySelectorAll(".hp-node");
      nodes[i].classList.add("hot"); nodes[small].classList.add("hot");
      setMsg(msg, `<b>${heap[i]} vs child ${heap[small]} — child is more urgent, swap!</b>`, "");
      await rzSleep(650);
      if (t !== token) return;
      [heap[i], heap[small]] = [heap[small], heap[i]];
      nodes[i].textContent = heap[i]; nodes[small].textContent = heap[small];
      nodes[i].classList.remove("hot"); nodes[small].classList.remove("hot");
      i = small;
      await rzSleep(200);
      if (t !== token) return;
    }
    render();
    setMsg(msg, `<b>Treated ${min}.</b> The last patient bubbled down to their spot — rule restored, O(log n) hops.`, "ok");
    running = false;
  });
  $("#hp-" + id + "-reset").addEventListener("click", () => {
    token++; running = false;
    heap = [3, 8, 5]; si = 0;
    render();
    setMsg(msg, "Reset: a small heap [3, 8, 5] — smallest on top. Push the waiting patients, pop the min, watch the bubbles.", "");
  });
  render();
  setMsg(msg, "A min-heap: the smallest is always at the front. Push a patient, then pop-min — every move keeps the rule. Watch the bubbles.", "");
}

/* merge sort — split to one card, merge back up */
function initMergeSort(root, id){
  const row = $("#ms-" + id + "-row"), step = $("#ms-" + id + "-step"), msg = $("#ms-" + id + "-msg");
  const INIT = [8, 3, 7, 1, 9, 2, 5, 4];
  let running = false, token = 0;
  const merge = (a, b) => {
    const out = []; let i = 0, j = 0;
    while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);
    return out.concat(a.slice(i), b.slice(j));
  };
  const passes = () => {
    const ev = [];
    let groups = INIT.map(v => [v]);
    while (groups.length > 1){
      const pass = [];
      for (let i = 0; i < groups.length; i += 2){
        const a = groups[i], b = groups[i + 1] || [];
        pass.push({ a, b, merged: merge(a, b) });
      }
      ev.push(pass);
      groups = pass.map(p => p.merged);
    }
    return ev;
  };
  const EV = passes();
  const barHtml = v => `<div class="ms-bar" data-v="${v}" style="height:${v * 13}px">${v}</div>`;
  const render = groups => {
    row.innerHTML = groups.map(g => `<div class="ms-group">${g.map(barHtml).join("")}</div>`).join("");
  };
  $("#ms-" + id + "-play").addEventListener("click", async () => {
    if (running) return;
    running = true;
    const t = ++token;
    let groups = INIT.map(v => [v]);
    render(groups);
    setMsg(msg, "<b>Divide & conquer:</b> split until every pile has ONE card — a pile of one is already sorted. Then merge back up, always taking the smaller front.", "");
    await rzSleep(900);
    if (t !== token) return;
    for (let pi = 0; pi < EV.length; pi++){
      if (t !== token) return;
      step.textContent = "Pass " + (pi + 1) + " — merge the neighbor piles";
      const grps = [...row.querySelectorAll(".ms-group")];
      for (let i = 0; i < EV[pi].length; i++){
        if (t !== token) return;
        const g = EV[pi][i];
        grps[2 * i].querySelectorAll(".ms-bar").forEach(b => b.classList.add("compare"));
        if (grps[2 * i + 1]) grps[2 * i + 1].querySelectorAll(".ms-bar").forEach(b => b.classList.add("compare"));
        step.textContent = `merge [${g.a.join(", ")}] + [${g.b.join(", ")}] — always the smaller front`;
        await rzSleep(1000);
        if (t !== token) return;
        grps[2 * i].innerHTML = g.merged.map(v => `<div class="ms-bar sorted" data-v="${v}" style="height:${v * 13}px">${v}</div>`).join("");
        if (grps[2 * i + 1]) grps[2 * i + 1].remove();
        step.textContent = `→ [${g.merged.join(", ")}] — one sorted pile`;
        await rzSleep(550);
        if (t !== token) return;
      }
      groups = EV[pi].map(p => p.merged);
    }
    render(groups);
    row.querySelectorAll(".ms-bar").forEach(b => b.classList.add("sorted"));
    step.textContent = "Sorted: [1, 2, 3, 4, 5, 7, 8, 9]";
    setMsg(msg, "<b>Sorted!</b> Each card was touched once per pass, and there were only 3 passes for 8 cards: <b>n × log n = O(n log n)</b>. No bad shuffle can ever slow it down. That's the divide & conquer promise.", "ok");
    running = false;
  });
  $("#ms-" + id + "-reset").addEventListener("click", () => {
    token++; running = false;
    step.textContent = "";
    render(INIT.map(v => [v]));
    setMsg(msg, "Reset: 8 shuffled cards. Play merge sort — watch the piles split to one card, then zip back up sorted.", "");
  });
  render(INIT.map(v => [v]));
  setMsg(msg, "Press play — merge sort splits the deck down to single cards, then merges sorted piles together. The merge is a zipper: always the smaller front.", "");
}

/* backtracking — the maze walker */
function initBacktrack(root, id){
  const mazeEl = $("#bt-" + id + "-maze"), msg = $("#bt-" + id + "-msg");
  const MAP = [
    "S........",
    ".####.###",
    ".#...#...",
    ".#.#.#.##",
    ".#.#.#...",
    ".#.###.#.",
    ".......#G"
  ];
  const R = MAP.length, C = MAP[0].length;
  const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const events = [];
  let deadCount = 0, running = false, token = 0;
  const solve = () => {
    events.length = 0; deadCount = 0;
    const vis = Array.from({ length: R }, () => Array(C).fill(false));
    let found = false;
    const dfs = (r, c) => {
      if (found) return;
      vis[r][c] = true;
      events.push({ v: [r, c] });
      if (r === R - 1 && c === C - 1){ found = true; return; }
      let went = 0;
      for (const [dr, dc] of DIRS){
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= R || nc >= C) continue;
        if (MAP[nr][nc] === "#" || vis[nr][nc]) continue;
        went++;
        dfs(nr, nc);
      }
      if (went === 0 && !found){ deadCount++; events.push({ d: [r, c] }); }
    };
    dfs(0, 0);
  };
  const cellEl = (r, c) => $("#bt-" + id + "-c" + (r * C + c));
  const render = () => {
    let html = "";
    for (let r = 0; r < R; r++){
      for (let c = 0; c < C; c++){
        const ch = MAP[r][c];
        const cls = ch === "#" ? " wall" : (ch === "S" ? " start" : (ch === "G" ? " goal" : ""));
        html += `<div class="bt-cell${cls}" id="bt-${id}-c${r * C + c}">${ch === "G" ? "🏁" : (ch === "S" ? "🚪" : "")}</div>`;
      }
    }
    mazeEl.innerHTML = html;
  };
  $("#bt-" + id + "-go").addEventListener("click", async () => {
    if (running) return;
    running = true;
    const t = ++token;
    solve();
    render();
    setMsg(msg, "<b>Walk forward…</b> try right, down, left, up — and mark every cell I've seen. Dead ends get painted red.", "");
    for (const ev of events){
      if (t !== token) return;
      if (ev.v){
        const el = cellEl(ev.v[0], ev.v[1]);
        el.classList.add("visit");
        el.classList.add("walker");
        await rzSleep(80);
        if (t !== token) return;
        el.classList.remove("walker");
      } else if (ev.d){
        const el = cellEl(ev.d[0], ev.d[1]);
        el.classList.remove("visit");
        el.classList.add("dead");
        setMsg(msg, `<b>Dead end at (${ev.d[0]}, ${ev.d[1]})</b> — no unvisited exits. Walk back to the last fork and try the next road.`, "");
        await rzSleep(320);
        if (t !== token) return;
      }
    }
    const onPath = {};
    events.forEach(ev => { if (ev.v) onPath[ev.v[0] * C + ev.v[1]] = 1; });
    events.forEach(ev => { if (ev.d) onPath[ev.d[0] * C + ev.d[1]] = 0; });
    Object.keys(onPath).forEach(i => cellEl(Math.floor(i / C), i % C).classList.add("path"));
    setMsg(msg, `<b>Found the exit!</b> Red cells are the ${deadCount} dead ends — visited, marked, never touched again. The teal route is the answer. Try → mark → backtrack → win.`, "ok");
    running = false;
  });
  $("#bt-" + id + "-reset").addEventListener("click", () => {
    token++; running = false;
    render();
    setMsg(msg, "A maze with two planted dead ends. Walk it: the walker tries right, down, left, up — and walks back whenever it hits a wall of marks.", "");
  });
  render();
  setMsg(msg, "Press walk — the explorer marks every cell it visits, hits two dead ends, and backtracks to the last fork each time. That's backtracking.", "");
}

/* dynamic programming — the notebook */
function initDP(root, id){
  const tree = $("#dp-" + id + "-tree"), stat = $("#dp-" + id + "-stat"), msg = $("#dp-" + id + "-msg");
  const N = 6;
  let running = false, token = 0;
  const naiveTree = (() => {
    const b = n => ({ v: n, kids: n < 2 ? [] : [b(n - 1), b(n - 2)] });
    return b(N);
  })();
  const memoTree = (() => {
    const seen = {};
    let reads = 0;
    const b = n => {
      if (seen[n]){ reads++; return null; }
      seen[n] = 1;
      const node = { v: n, kids: [] };
      if (n >= 2){
        for (const k of [b(n - 1), b(n - 2)]) if (k) node.kids.push(k);
      }
      return node;
    };
    const root = b(N);
    return { root, reads };
  })();
  const count = t => 1 + t.kids.reduce((s, k) => s + count(k), 0);
  const NAIVE = count(naiveTree), MEMO = count(memoTree.root);
  const MEMO_READS = memoTree.reads;
  const perValue = t => {
    const m = {};
    const w = n => { m[n.v] = (m[n.v] || 0) + 1; n.kids.forEach(w); };
    w(t);
    return m;
  };
  const PER = perValue(naiveTree);
  const nodeHtml = (n, depth, dup, saved) =>
    `<div class="dp-node${dup ? " dup" : (saved ? " saved" : "")}" style="margin-left:${depth * 26}px">fib(${n.v})${dup ? ` <span class="dp-badge">×${PER[n.v]} again</span>` : (saved ? ' <span class="dp-badge">stored</span>' : "")}</div>`;
  const expand = async (n, depth, saved, t) => {
    tree.innerHTML += nodeHtml(n, depth, !saved && PER[n.v] > 1, saved);
    await rzSleep(saved ? 300 : 220);
    for (const k of n.kids){
      if (t !== token) return;
      await expand(k, depth + 1, saved, t);
    }
  };
  const reset = () => {
    token++; running = false;
    tree.innerHTML = "";
    stat.textContent = "";
    setMsg(msg, "fib(6) — two runs. Naive recomputes fib(2) five times. With a notebook, every answer is computed once, then read. Same tree, two fates.", "");
  };
  $("#dp-" + id + "-naive").addEventListener("click", async () => {
    if (running) return;
    running = true;
    const t = ++token;
    tree.innerHTML = "";
    stat.textContent = "";
    setMsg(msg, "<b>Naive run — recursion with no memory.</b> Every call computes everything below it from scratch. Watch the same answers appear again and again…", "");
    await expand(naiveTree, 0, false, t);
    if (t !== token) return;
    stat.textContent = `naive calls: ${NAIVE} — fib(2) computed ${PER[2]} times, fib(1) ${PER[1]} times.`;
    setMsg(msg, `<b>${NAIVE} calls.</b> Look at the red chips — the same tiny answers, recomputed over and over. fib(2) appears ${PER[2]} times because nothing was ever written down. That's the waste.`, "ok");
    running = false;
  });
  $("#dp-" + id + "-memo").addEventListener("click", async () => {
    if (running) return;
    running = true;
    const t = ++token;
    tree.innerHTML = "";
    stat.textContent = "";
    setMsg(msg, "<b>Memo run — recursion with a notebook.</b> Each answer is computed once and stored; every later call just reads it. Count the chips:", "");
    await expand(memoTree.root, 0, true, t);
    if (t !== token) return;
    stat.textContent = `memo: ${MEMO} computed + ${MEMO_READS} notebook reads = ${MEMO + MEMO_READS} calls — vs ${NAIVE} naive.`;
    setMsg(msg, `<b>${MEMO} chips — every value exactly once.</b> The other ${MEMO_READS} references were notebook reads: no recomputing. ${MEMO + MEMO_READS} calls vs ${NAIVE} naive. Now at scale: naive fib(40) makes over a billion calls; with the notebook, 79. Exponential becomes linear.`, "ok");
    running = false;
  });
  $("#dp-" + id + "-reset").addEventListener("click", reset);
  reset();
}
/* macro — the tiny robot writer */
function initMacroPlay(root, id){
  const source = $("#mc-" + id + "-source"), arrow = $("#mc-" + id + "-arrow"), out = $("#mc-" + id + "-out"), msg = $("#mc-" + id + "-msg");
  let running = false, token = 0;
  const DEMOS = {
    myvec: {
      src: "myvec![4, 2, 9]",
      lines: ["{", "let mut tmp = Vec::new();", "tmp.push(4);", "tmp.push(2);", "tmp.push(9);", "tmp", "}"],
      arrow: "3 items found → write 3 push lines…",
      done: "<b>myvec![4, 2, 9] expanded!</b> The robot wrote 3 push lines — one per number. The whole block becomes the Vec: [4, 2, 9]. That's why vec! works with any length."
    },
    sq: {
      src: "sq!(5)",
      lines: ["5 * 5", "= 25"],
      arrow: "x found → write x * x…",
      done: "<b>sq!(5) expanded!</b> Macros see the CODE, not just the answer: sq!(x) becomes x * x — then Rust computes 25. A function could never do this; it only ever receives the value."
    }
  };
  const play = async key => {
    if (running) return;
    running = true;
    const t = ++token;
    const d = DEMOS[key];
    source.textContent = d.src;
    source.style.borderColor = "color-mix(in srgb,var(--violet) 55%,var(--line))";
    out.innerHTML = "";
    arrow.textContent = d.arrow;
    setMsg(msg, "The robot reads <code class='inline'>" + d.src + "</code> and starts typing the code…", "");
    await rzSleep(350);
    if (t !== token) return;
    for (const ln of d.lines){
      out.innerHTML += `<div class="mc-line${ln === "= 25" ? " res" : ""}">${ln}</div>`;
      await rzSleep(240);
      if (t !== token) return;
    }
    setMsg(msg, d.done, "ok");
    running = false;
  };
  $("#mc-" + id + "-myvec").addEventListener("click", () => play("myvec"));
  $("#mc-" + id + "-sq").addEventListener("click", () => play("sq"));
  $("#mc-" + id + "-reset").addEventListener("click", () => {
    token++; running = false;
    source.textContent = "Press Expand — the robot reads the line above…";
    source.style.borderColor = "";
    arrow.textContent = "the robot starts typing…";
    out.innerHTML = "";
    setMsg(msg, "A macro is a tiny robot that writes Rust code before the program runs. Expand one and watch it type!", "");
  });
  setMsg(msg, "Press Expand — the robot turns a short line into the full code, one line at a time.", "");
}

/* dyn — the shape-shifting box */
function initDynPlay(root, id){
  const box = $("#dy-" + id + "-box"), shelf = $("#dy-" + id + "-shelf"), msg = $("#dy-" + id + "-msg");
  const CREATURES = {
    Dog: { e: "🐶", s: "woof!", note: "<b>Box&lt;dyn Speak&gt; holds a Dog.</b> The box is one pointer (8 bytes) — the real Dog lives on the heap, behind the note." },
    Cat: { e: "🐱", s: "meow!", note: "<b>Same box, now a Cat!</b> The shape-shifting box never changes size — one pointer in, whatever creature inside." },
    Robot: { e: "🤖", s: "beep boop", note: "<b>And now a Robot.</b> Three different types, ONE Box&lt;dyn Speak&gt; — that's exactly what dyn gives you that generics can't." }
  };
  let current = null;
  const setCreature = key => {
    const c = CREATURES[key];
    current = key;
    shelf.classList.remove("show");
    box.classList.remove("hide");
    box.classList.add("filled");
    box.innerHTML = `<span class="dy-emoji">${c.e}</span><span class="dy-name">${key}</span><span class="dy-type">Box&lt;dyn Speak&gt;</span>`;
    setMsg(msg, c.note, "");
  };
  $("#dy-" + id + "-dog").addEventListener("click", () => setCreature("Dog"));
  $("#dy-" + id + "-cat").addEventListener("click", () => setCreature("Cat"));
  $("#dy-" + id + "-robot").addEventListener("click", () => setCreature("Robot"));
  $("#dy-" + id + "-speak").addEventListener("click", () => {
    if (!current) return setMsg(msg, "The box is empty — put a creature in first!", "err");
    setMsg(msg, `<b>${CREATURES[current].s}</b> — the computer peeked inside the box (dynamic dispatch), found the real ${current}, and called its speak().`, "ok");
  });
  $("#dy-" + id + "-generic").addEventListener("click", () => {
    box.classList.add("hide");
    box.classList.remove("filled");
    shelf.classList.add("show");
    setMsg(msg, "<b>Generics:</b> Rust prints a fresh copy for each type — three boxes on the shelf, each its own size. Fast, but a list can never hold a mix. dyn: one box, any creature.", "");
  });
  $("#dy-" + id + "-reset").addEventListener("click", () => {
    current = null;
    box.classList.remove("filled", "hide");
    shelf.classList.remove("show");
    box.innerHTML = `<span class="dy-empty">empty box —<br>just an 8-byte pointer</span>`;
    setMsg(msg, "One box, any creature. Put a Dog, Cat, or Robot inside — or compare with the generic shelf.", "");
  });
  setMsg(msg, "Box&lt;dyn Speak&gt; — one box, any type holding the Speak card. Put a creature in and see it change shape.", "");
}

/* unsafe — the unlocked door */
function initUnsafePlay(root, id){
  const guard = $("#un-" + id + "-guard"), door = $("#un-" + id + "-door"), sign = $("#un-" + id + "-sign"), msg = $("#un-" + id + "-msg");
  const setOpen = (o, text) => {
    guard.classList.toggle("away", o);
    door.classList.toggle("open", o);
    sign.classList.toggle("warn", o);
    sign.textContent = text;
  };
  $("#un-" + id + "-safe").addEventListener("click", () => {
    setOpen(false, "Safe Rust — the guard watches everything");
    setMsg(msg, "<b>Compile error!</b> You tried to read a raw pointer in safe Rust. The guard checks the rules: raw pointers make no promises — alive or garbage? <i>\"Not on my watch.\"</i>", "err");
  });
  $("#un-" + id + "-raw").addEventListener("click", () => {
    setOpen(true, "⚠️ UNSAFE — the guard stepped aside. YOU are responsible now.");
    setMsg(msg, "Inside <code class='inline'>unsafe</code>: no borrow checker. <b>You promise</b> the pointer is alive — break the promise and the program crashes (a segfault). That's the whole risk, and the whole rule.", "");
  });
  $("#un-" + id + "-static").addEventListener("click", () => {
    setOpen(true, "⚠️ UNSAFE — shared memory, no guard between writers");
    setMsg(msg, "<code class='inline'>static mut</code> is memory everyone shares. Two threads writing it at once = a <b>data race</b>: garbage results. Safe Rust forbids it; unsafe lets you — and the fix is Mutex or atomics.", "");
  });
  $("#un-" + id + "-wrap").addEventListener("click", () => {
    setOpen(false, "Safe door again — the unsafe hides INSIDE");
    setMsg(msg, "<b>The Rust way:</b> wrap the unsafe in a safe function, so callers never see the door. Vec and Box are built exactly like this — engine room unsafe, front door safe. Guard back on duty.", "ok");
  });
  $("#un-" + id + "-reset").addEventListener("click", () => {
    setOpen(false, "Safe Rust — the guard watches everything");
    setMsg(msg, "Press a scenario: watch the guard check the door — then watch him step aside when you walk into unsafe.", "");
  });
  setMsg(msg, "Safe Rust: the guard checks everything. unsafe: the one door the guard leaves — and the rules become your job.", "");
}

/* cargo — the crate store */
function initCargoPlay(root, id){
  const body = $("#cp-" + id + "-body"), msg = $("#cp-" + id + "-msg");
  const OUT = {
    serde: [["cargo add serde","cmd"],["    Adding serde v1.0.219","out"],["    Features: derive ✓ — struct → JSON in one line","out"],["    Done! One use line opens their door.","ok"]],
    anyhow: [["cargo add anyhow","cmd"],["    Adding anyhow v1.0.98","out"],["    The friendly error bag: write ? and go.","ok"]],
    clap: [["cargo add clap","cmd"],["    Adding clap v4.5.41","out"],["    Command-line arguments without pain.","ok"]],
    build: [["cargo build","cmd"],["    Compiling serde v1.0.219…","out"],["    Compiling my_app v0.1.0…","out"],["    Finished in 2.1s — zero warnings 🎉","ok"]],
    test: [["cargo test","cmd"],["    running 4 tests…","out"],["    test result: ok. 4 passed; 0 failed — the safety net held","ok"]],
    publish: [["cargo publish","cmd"],["    Packaging my_app v0.1.0…","out"],["    Uploading to crates.io…","out"],["    Published! Your recipe box is on the shelf 📦","ok"]]
  };
  const NOTES = {
    serde: "<b>serde</b> = serialize + deserialize — the most-used crate on Earth. Your struct → one line → JSON text.",
    anyhow: "<b>anyhow</b> lets every error ride along: all your <code class='inline'>?</code> just work. Beginners love it.",
    clap: "<b>clap</b> reads what people type on the command line — <code class='inline'>--name Bob</code> becomes a variable.",
    build: "cargo build compiles everything — and checks ALL the rules you learned. A green build means the borrow checker is happy.",
    test: "cargo test runs your safety net (the testing lesson). 4 tests, all green.",
    publish: "cargo publish shelves YOUR crate in the store. The world can now borrow your recipe box."
  };
  const line = (text, cls) => {
    const d = document.createElement("div");
    d.className = cls;
    d.innerHTML = text;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  };
  const run = key => {
    if (key === "clear"){ body.innerHTML = '<span class="hint">The store is open — borrow a crate.</span>'; setMsg(msg, "Terminal clean. Try a cargo add — one command, whole superpowers.", ""); return; }
    for (const [text, cls] of OUT[key]){
      line((cls === "cmd" ? '<span class="prompt">$</span> ' : "") + text, cls === "cmd" ? "" : cls);
    }
    setMsg(msg, NOTES[key], "ok");
  };
  root.querySelectorAll("[data-crate]").forEach(b => b.addEventListener("click", () => run(b.dataset.crate)));
  setMsg(msg, "One command to borrow a superpower. Try cargo add serde — then build, test, and publish.", "");
}
