#!/usr/bin/env node
// Smoke test — runs the whole site (HTML + all JS files in document order)
// inside a tiny DOM shim and verifies the UI actually renders and responds.
// Usage: node tools/smoke.mjs   (from the project root)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = process.env.RZ_BASE ? path.resolve(process.env.RZ_BASE) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HTML = path.join(ROOT, 'index.html');

// ---------- tiny DOM shim ----------
const byId = new Map();
const byClass = new Map();
const allEls = [];
const sidebarAnchors = [];
const attrEls = [];
const byTag = new Map();

function regClass(el, cls){ if(!byClass.has(cls)) byClass.set(cls, []); if(!byClass.get(cls).includes(el)) byClass.get(cls).push(el); }
function unregClass(el, cls){ const l = byClass.get(cls); if(l){ const i = l.indexOf(el); if(i>-1) l.splice(i,1); } }

function makeEl(tag, attrs){
  const el = {
    tag, children: [], parent: null, value: "", textContent: "", title: "",
    _attrs: {}, _classes: new Set(), scrollTop: 0, scrollHeight: 300,
    _inner: "",
    style: {},
    dataset: {},
    classList: {
      add(c){ if(!el._classes.has(c)){ el._classes.add(c); regClass(el, c); } },
      remove(c){ if(el._classes.delete(c)) unregClass(el, c); },
      toggle(c, force){ const has = el._classes.has(c);
        if(force === undefined){ has ? el.classList.remove(c) : el.classList.add(c); return !has; }
        if(force && !has) el.classList.add(c); if(!force && has) el.classList.remove(c); return !!force; },
      contains(c){ return el._classes.has(c); }
    },
    _ls: {},
    addEventListener(type, fn){ (this._ls[type] = this._ls[type] || []).push(fn); },
    removeEventListener(){},
    fire(type, ev){ (this._ls[type] || []).forEach(fn => {
      try { fn(Object.assign({ target: this, key: "", currentTarget: this }, ev)); }
      catch(e){ console.error("HANDLER ERROR:", e.message, (e.stack||"").split("\n").slice(1,3).join(" | ")); process.exitCode = 1; }
    }); },
    appendChild(child){ child.parent = el; el.children.push(child);
      if(el.tag === "aside" && el._attrs.id === "sidebar") sidebarAnchors.push(child);
      return child; },
    remove(){ if(el.parent){ const i = el.parent.children.indexOf(el); if(i > -1) el.parent.children.splice(i, 1); } },
    after(node){ if(el.parent){ const i = el.parent.children.indexOf(el); el.parent.children.splice(i + 1, 0, node); node.parent = el.parent; } },
    setAttribute(k, v){ el._attrs[k] = String(v); if(k.startsWith("data-")){ el.dataset[k.slice(5)] = String(v); if(!attrEls.includes(el)) attrEls.push(el); } },
    getAttribute(k){ return el._attrs[k] ?? null; },
    closest(sel){ let n = el; while(n){
      if(sel.startsWith(".")){ if(n._classes.has(sel.slice(1))) return n; }
      else if(sel.startsWith("#")){ if(n._attrs.id === sel.slice(1)) return n; }
      n = n.parent; } return null; },
    getBoundingClientRect(){ return { left: 0, width: 0, top: 0 }; },
    scrollIntoView(){},
    get parentElement(){ return el.parent; },
    querySelector(sel){ const r = el.querySelectorAll(sel); return r[0] || null; },
    querySelectorAll(sel){
      const scope = [el, ...descendants(el)];
      if(sel.startsWith("#")){ const e = byId.get(sel.slice(1)); return e ? [e] : []; }
      if(sel.startsWith(".")){ const c = byClass.get(sel.slice(1)) || []; return c.filter(x => scope.includes(x)); }
      if(sel.startsWith("[data-")){
        const m = sel.match(/^\[data-([a-z-]+)(?:="([^"]*)")?\]$/);
        if(m) return scope.filter(e => e._attrs["data-" + m[1]] !== undefined && (!m[2] || e._attrs["data-" + m[1]] === m[2]));
        return [];
      }
      if(byTag.has(sel)){ return (byTag.get(sel) || []).filter(x => scope.includes(x)); }
      return [];
    },
    focus(){}
  };
  Object.defineProperty(el, "innerHTML", {
    get(){ return el._inner; },
    set(v){
      el._inner = String(v);
      el.children = [];
      scanFragment(String(v), el);
    }
  });
  Object.defineProperty(el, "className", {
    get(){ return [...el._classes].join(" "); },
    set(v){
      [...el._classes].forEach(c => unregClass(el, c));
      el._classes.clear();
      String(v).split(/\s+/).filter(Boolean).forEach(c => el.classList.add(c));
    }
  });
  if(attrs) for(const [k,v] of Object.entries(attrs)) el.setAttribute(k, v);
  if(!byTag.has(tag)) byTag.set(tag, []);
  byTag.get(tag).push(el);
  allEls.push(el);
  return el;
}

function descendants(el){ return el.children.flatMap(c => [c, ...descendants(c)]); }

function scanFragment(html, host){
  const VOID = new Set(["meta","link","br","input","img","hr"]);
  const re = /<\/?([a-zA-Z][\w-]*)((?:\s+[a-zA-Z-]+(?:="[^"]*")?)*)\s*\/?>/g;
  const stack = [];
  let m;
  while((m = re.exec(html))){
    const closing = m[0][1] === "/";
    const tag = m[1].toLowerCase();
    if(tag === "style" || tag === "script") continue;
    if(closing){
      if(stack.length && stack[stack.length-1].tag === tag) stack.pop();
      continue;
    }
    const selfClose = /\/>\s*$/.test(m[0]);
    const el = makeEl(tag);
    const attrs = m[2] || "";
    const am = /([a-zA-Z-]+)="([^"]*)"/g; let a;
    while((a = am.exec(attrs))){
      el.setAttribute(a[1], a[2]);
      if(a[1]==="id") byId.set(a[2], el);
      if(a[1]==="class") String(a[2]).split(/\s+/).filter(Boolean).forEach(c => { if(!el._classes.has(c)){ el._classes.add(c); regClass(el,c); } });
    }
    if(/data-[a-z-]+=/.test(attrs) && !attrEls.includes(el)) attrEls.push(el);
    if(host && stack.length === 0){ el.parent = host; host.children.push(el); }
    else if(stack.length){ el.parent = stack[stack.length-1]; stack[stack.length-1].children.push(el); }
    if(!VOID.has(tag) && !selfClose) stack.push(el);
  }
}

const doc = {
  querySelector(sel){
    if(sel === ".sidebar a") return sidebarAnchors.find(e => e.tag === "a") || null;
    if(sel === ".drawer-list a"){ const dl = byId.get("drawerList"); return dl ? dl.querySelectorAll("a")[0] || null : null; }
    if(sel.startsWith("#")) return byId.get(sel.slice(1)) || null;
    if(sel.startsWith(".")){ const l = byClass.get(sel.slice(1)); return (l && l[0]) || null; }
    return null;
  },
  querySelectorAll(sel){
    if(sel === ".sidebar a") return sidebarAnchors.filter(e => e.tag === "a");
    if(sel === ".drawer-list a"){ const dl = byId.get("drawerList"); return dl ? dl.querySelectorAll("a") : []; }
    if(sel.startsWith("#")){ const e = byId.get(sel.slice(1)); return e ? [e] : []; }
    if(sel.startsWith(".")) return byClass.get(sel.slice(1)) || [];
    if(sel.startsWith("[data-")){
      const m = sel.match(/^\[data-([a-z-]+)(?:="([^"]*)")?\]$/);
      if(m) return attrEls.filter(e => e._attrs["data-" + m[1]] !== undefined && (!m[2] || e._attrs["data-" + m[1]] === m[2]));
      return [];
    }
    return [];
  },
  getElementById(id){ return byId.get(id) || null; },
  createElement(tag){ return makeEl(tag.toLowerCase()); },
  addEventListener(){},
  execCommand(){ return true; },
  documentElement: { dataset: {} },
  body: makeEl("body")
};

const sandbox = {
  document: doc,
  localStorage: { _s:{}, getItem(k){ return this._s[k] ?? null; }, setItem(k,v){ this._s[k] = String(v); }, removeItem(k){ delete this._s[k]; } },
  navigator: { clipboard: null },
  IntersectionObserver: class { constructor(){} observe(){} unobserve(){} disconnect(){} },
  setTimeout, clearTimeout, setInterval, clearInterval,
  console, window: null,
  addEventListener(){},
  scrollTo(){},
  location: { hash: "" }
};
sandbox.window = sandbox;
vm.createContext(sandbox);

// 1) pre-scan static HTML
const html = fs.readFileSync(HTML, 'utf8');
const staticPart = html.slice(0, html.indexOf('<script'));
scanFragment(staticPart);

// 2) run scripts (inline + src'd, in document order)
const scripts = [];
const re = /<script(?:\s+src="([^"]*)")?\s*>/g;
let m;
while((m = re.exec(html))){ if(m[1]) scripts.push({ name: m[1], code: fs.readFileSync(path.join(ROOT, m[1]), 'utf8') }); }

// 2b) lesson load order = teaching order; guard against alphabetical regressions
// (dist/ runs a single bundle, so the check only applies when lessons are per-file)
const RUST_ORDER = ["what","install","hello","flow","vars","types","math","if","loops","funcs","input","guess","ownership","borrow","shapes","strings","structs","methods","enums","match","modules","vecs","hashmap","errors","files","generics","traits","lifetimes","tests","minigrep","closures","iterators","crates","smartp","threads","asyncr","dyn","pattern","unsafe","macros","webserver","cheats","glossary","next","quiz"];
const GENERAL_ORDER = ["threads","async","smartptr","testing","modules","bigo","alist","stackque","binsearch","sorter","recursion","treeview","graphview","heaps","mergesort","backtrack","dp","hashd","psolve","gtfinale"];
const lesson = (prefix) => scripts.filter(s => s.name.startsWith("assets/js/lessons/" + prefix + "/")).map(s => s.name.split("/").pop().replace(".js", ""));
const rustLoaded = lesson("rust"), generalLoaded = lesson("general");
if (scripts.some(s => s.name.includes("assets/js/lessons/"))){
  if (JSON.stringify(rustLoaded) !== JSON.stringify(RUST_ORDER)) throw new Error("rust lesson order regression: " + rustLoaded.join(", "));
  if (JSON.stringify(generalLoaded) !== JSON.stringify(GENERAL_ORDER)) throw new Error("general lesson order regression: " + generalLoaded.join(", "));
}
console.log("LESSON ORDER OK — rust(" + rustLoaded.length + ") general(" + generalLoaded.length + ")");

// every interval must go through rzInterval (util.js) so renderAll can stop it.
// dev build: widgets.js must have zero; bundle build: exactly one (util.js only)
const widgetsPath = path.join(ROOT, "assets/js/widgets.js");
if (fs.existsSync(widgetsPath)){
  if (/setInterval\(/.test(fs.readFileSync(widgetsPath, "utf8"))) throw new Error("raw setInterval in widgets.js — leaks after track switch; use rzInterval");
} else {
  const jsDir = path.join(ROOT, "assets/js");
  const bundleName = fs.existsSync(jsDir) ? fs.readdirSync(jsDir).find(f => /^bundle\.[a-f0-9]+\.js$/.test(f)) : null;
  if (!bundleName) throw new Error("neither widgets.js nor hashed bundle.js present");
  const bundlePath = path.join(jsDir, bundleName);
  const n = (fs.readFileSync(bundlePath, "utf8").match(/setInterval\(/g) || []).length;
  if (n !== 1) throw new Error("bundle.js has " + n + " raw setInterval occurrences — must be exactly 1 (util.js rzInterval)");
}
console.log("TIMER DISCIPLINE OK — all intervals run through rzInterval");

// security layer must be present and itself timer-disciplined
const secDir = path.join(ROOT, "assets/js");
const secName = fs.existsSync(secDir) ? fs.readdirSync(secDir).find(n => /^security(?:\.[a-f0-9]+)?\.js$/.test(n)) : null;
const SEC_J = secName ? path.join(secDir, secName) : null;
if (!SEC_J || !fs.existsSync(SEC_J)) throw new Error("missing assets/js/security(.<hash>).js");
const secSrc = fs.readFileSync(SEC_J, "utf8");
if (/setInterval\(/.test(secSrc)) throw new Error("raw setInterval in security.js — use recursive setTimeout so renderAll can't kill the guard");
if (!secSrc.includes("snap-guard")) throw new Error("security.js missing snap-guard (AutoBlur) wiring");
if (!secSrc.includes("printscreen")) throw new Error("security.js missing screenshot-key guard");
if (!secSrc.includes('addEventListener("blur"')) throw new Error("security.js missing window blur hook");
if (!/BOOT_GRACE\s*=\s*1000/.test(secSrc)) throw new Error("security.js missing boot grace — guard is arming during page load (blur flash on open/reload)");
const cssDir = path.join(ROOT, "assets/css");
let cssName = null;
if (fs.existsSync(path.join(cssDir, "base.css"))) cssName = "assets/css/base.css";
else {
  const hashed = fs.existsSync(cssDir) ? fs.readdirSync(cssDir).find(n => /^app\.[a-f0-9]+\.css$/.test(n)) : null;
  if (hashed) cssName = "assets/css/" + hashed;
}
if (!cssName) throw new Error("no css source present (base.css or hashed app.css)");
const baseCss = fs.readFileSync(path.join(ROOT, cssName), "utf8");
if (!baseCss.includes(".snap-guard")) throw new Error("base.css missing snap-guard styles");
if (!baseCss.includes("@media print")) throw new Error("base.css missing print blanking");
if (!baseCss.includes("user-select:none")) throw new Error("base.css missing global selection lock");
if (baseCss.includes(".lesson,.lesson *")) throw new Error("lesson text must NOT be selectable — code-only selection policy broken");
if (!baseCss.includes("pre,code,.code-body")) throw new Error("code blocks must stay selectable");
if (!html.includes('<meta name="robots" content="noindex, nofollow, noarchive">')) throw new Error("robots noindex meta missing");
if (!html.includes('http-equiv="Content-Security-Policy"')) throw new Error("CSP meta missing");
if (html.includes("script-src 'self' 'unsafe-inline'") || !html.includes("script-src 'self';")) throw new Error("CSP script-src must be strict 'self' (no inline handlers allowed)");
if (!html.includes('<meta name="referrer" content="no-referrer">')) throw new Error("referrer meta missing");
if (!/^security(?:\.[a-f0-9]+)?\.js$/.test(secName)) throw new Error("security(.<hash>).js not wired into index.html");

// premium 2026 layer — view transitions, route meta, a11y, paint containment
if (!baseCss.includes("::view-transition-old(root)")) throw new Error("premium: missing View Transition animations");
if (!baseCss.includes("content-visibility:auto")) throw new Error("premium: missing lesson content-visibility");
if (!baseCss.includes(":focus-visible")) throw new Error("premium: missing keyboard focus ring");
if (!baseCss.includes("text-wrap:balance")) throw new Error("premium: missing balanced headings");
if (!baseCss.includes(".sr-only")) throw new Error("premium: missing sr-only utility");
const appSrcPath = path.join(ROOT, "assets/js/app.js");
const appSrc = fs.existsSync(appSrcPath)
  ? fs.readFileSync(appSrcPath, "utf8")
  : (() => {
      const jsDir = path.join(ROOT, "assets/js");
      const bn = fs.existsSync(jsDir) ? fs.readdirSync(jsDir).find(f => /^bundle\.[a-f0-9]+\.js$/.test(f)) : null;
      if (!bn) throw new Error("premium: no app.js or hashed bundle.js to inspect");
      return fs.readFileSync(path.join(jsDir, bn), "utf8");
    })();
if (!appSrc.includes("startViewTransition")) throw new Error("premium: app.js missing View Transitions wiring");
if (!appSrc.includes("document.title")) throw new Error("premium: route titles missing");
if (!html.includes('id="routeLive"')) throw new Error("premium: aria-live route announcer missing");
console.log("PREMIUM 2026 LAYER OK — view transitions, route titles, focus rings, paint containment");
const headersPath = path.join(ROOT, "_headers");
if (fs.existsSync(headersPath)){
  const h = fs.readFileSync(headersPath, "utf8").split("\n").map(l => l.trim());
  for (const l of h){
    if (!l || l === "/*") continue;
    if (!l.includes(":")){ if (l.endsWith("*")) continue; throw new Error("_headers line has no key:value — " + l); }
  }
  for (const k of ["X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "X-Robots-Tag", "Permissions-Policy"]){
    if (!h.some(l => l.startsWith(k + ":"))) throw new Error("_headers missing " + k);
  }
}
console.log("SECURITY OK — guards present, metas in place, headers valid");

// perf guard: a bundled build must stay lean (1 hashed js bundle + 1 hashed css + security)
const jsDir = path.join(ROOT, "assets/js");
if (fs.existsSync(jsDir) && fs.readdirSync(jsDir).some(f => /^bundle\.[a-f0-9]+\.js$/.test(f))){
  const scriptTags = (html.match(/<script src="/g) || []).length;
  const cssTags = (html.match(/<link rel="stylesheet" href=/g) || []).length;
  if (scriptTags > 2) throw new Error("bundle build must have <=2 script tags, found " + scriptTags);
  if (cssTags > 1) throw new Error("bundle build must have 1 css link, found " + cssTags);
  const b = fs.readdirSync(jsDir).find(f => /^bundle\.[a-f0-9]+\.js$/.test(f));
  if (!html.includes('src="assets/js/' + b + '"')) throw new Error("hashed bundle not wired into index.html");
  if (!fs.readdirSync(path.join(ROOT, "assets/css")).some(f => /^app\.[a-f0-9]+\.css$/.test(f)))
    throw new Error("hashed app.css missing");
  const unique = new Set([...fs.readdirSync(jsDir), ...fs.readdirSync(path.join(ROOT, "assets/css"))]);
  if (unique.size !== fs.readdirSync(jsDir).length + fs.readdirSync(path.join(ROOT, "assets/css")).length) throw new Error("build artifact name collision");
}
if (!fs.existsSync(path.join(ROOT, "assets/fonts")) || !fs.readdirSync(path.join(ROOT, "assets/fonts")).some(f => f.endsWith(".woff2")))
  throw new Error("self-hosted fonts missing from assets/fonts");
console.log("PERF OK — bundle build lean, fonts self-hosted");
for(const f of scripts){
  try { vm.runInContext(f.code, sandbox, { timeout: 8000 }); }
  catch(e){ console.error("RUNTIME ERROR in " + (f.name || "(inline)") + ":", JSON.stringify(e && e.message), (e.stack || "").split("\n").slice(0,4).join("\n")); process.exit(1); }
}

console.log("BOOT OK —", scripts.length, "scripts");
console.log("ids:", byId.size, "classes:", byClass.size, "data-elements:", attrEls.length, "sidebar anchors:", sidebarAnchors.length);

// ---- portal page (home) — separated from the paths, no lessons on it ----
if (doc.body.dataset.page !== "home") throw new Error("boot should land on the portal page, got body[data-page]=" + doc.body.dataset.page);
if (byId.get("main").children.length !== 1) throw new Error("portal page should render exactly one section (the hero), got " + byId.get("main").children.length);
const homeLessons = byId.get("main").children.filter(c => c.tag === "section" && c._classes.has("lesson")).length;
if (homeLessons !== 0) throw new Error("portal page must not contain lessons, got " + homeLessons);
const homeNeed = ["searchInput","searchResults","homeCard-rust","homeCard-general","homeFill-rust","homeFill-general","homePct-rust","homePct-general","homeCta-rust","homeCta-general"];
const missingHome = homeNeed.filter(n => !byId.has(n));
if(missingHome.length){ console.error("MISSING HOME IDS:", missingHome); process.exit(1); }
console.log("HOME PAGE (portal, search + cards, no lessons): OK");

// enter the rust path via the router (what clicking a path card does)
sandbox.go("#rust");
if (doc.body.dataset.page !== "rust") throw new Error("go('#rust') should render the rust course map");
if (!byId.has("pcount")) throw new Error("rust map should have the sidebar progress");
const mapRows = (byId.get("main").querySelectorAll(".syl-row") || []);
if (mapRows.length !== 45) throw new Error("course map should list 45 rust lessons, got " + mapRows.length);
if (byId.get("syl-what").getAttribute("href") !== "#rust/what") throw new Error("first map row should deep-link to #rust/what, got " + byId.get("syl-what").getAttribute("href"));
if (!byClass.get("graduation") || byClass.get("graduation").length !== 1) throw new Error("course map should carry the graduation roadmap");
if (byId.get("sylCount").textContent !== "0 of 45 done") throw new Error("sylCount wrong on fresh rust map: " + byId.get("sylCount").textContent);
console.log("RUST MAP (course map, 45 rows + roadmap): OK");

// ============ COURSE WALK ============
// visit every lesson page: ONE topic per page, widgets fire, done-buttons work
function walkTrack(){
  const byIdg = globalThis.__t.byId;
  const sidebar = byIdg.get("sidebar");
  const hrefs = [...sidebar.querySelectorAll("a")].filter(a => !a.classList.contains("sp-next")).map(a => a.getAttribute("href")).filter(h => /^#[a-z]+\/[\w-]+$/.test(h));
  let doneBtns = 0, widgetLessons = 0;
  for (const href of hrefs){
    sandbox.go(href);
    const lessons = [...byIdg.get("main").children].filter(c => c.tag === "section" && c._classes.has("lesson"));
    if (lessons.length !== 1) throw new Error(href + " should render exactly ONE lesson, got " + lessons.length);
    const id = href.split("/")[1];
    if (!byIdg.get("lpFill") || !byIdg.get("lpPct")) throw new Error(href + " missing lesson progress bar");
    if (!byIdg.get("main").querySelector(".le-next")) throw new Error(href + " missing mark-done-and-continue button");
    const w = byIdg.get("w-" + id);
    if (w){
      widgetLessons++;
      w.querySelectorAll("button").forEach(b => b.fire("click"));
      w.querySelectorAll("[data-cmd]").forEach(b => { b.value = ""; b.fire("click"); });
    }
    lessons[0].querySelectorAll(".done-btn").forEach(b => { b.fire("click"); doneBtns++; });
  }
  return { doneBtns, widgetLessons };
}
function fireAll(){
  const byIdg = globalThis.__t.byId;
  const walk = walkTrack();
  if (walk.widgetLessons < 20) throw new Error("course walk should hit widget lessons, found " + walk.widgetLessons);
  if (walk.doneBtns !== 43) throw new Error("course walk should mark 43 done-able lessons, got " + walk.doneBtns);
  console.log("COURSE WALK: every lesson renders as ONE page, widgets fire, " + walk.doneBtns + " marked done");

  // mark-done-and-continue: one click completes the lesson AND advances
  sandbox.go("#rust/what");
  byIdg.get("main").querySelector(".le-next").fire("click");
  if (sandbox.location.hash !== "#rust/install") throw new Error("le-next should advance to #rust/install, got " + sandbox.location.hash);
  if (doc.body.dataset.page !== "rust") throw new Error("le-next should stay on the rust path");
  console.log("MARK DONE & CONTINUE: one click completes + advances");

  // ---- copy button: quotes must survive the data-copy attribute intact ----
  sandbox.go("#rust/hello");
  const helloCopy = [...doc.querySelectorAll(".copy-btn")].map(b => b.dataset.copy).find(c => c.includes("Hello, world!"));
  const EXPECTED_COPY = 'fn main() {\n    println!(&quot;Hello, world!&quot;);\n    println!(&quot;I am learning Rust!&quot;);\n}';
  if (helloCopy !== EXPECTED_COPY) throw new Error("copy truncation regression, got: " + JSON.stringify(helloCopy));
  console.log("COPY BUTTON: full code (quotes + newlines) survives the attribute");

  // ---- regression checks for fixed bugs (rust pages) ----
  sandbox.go("#rust/math");
  byIdg.get("cl-math-a").value = "7"; byIdg.get("cl-math-b").value = "2"; byIdg.get("cl-math-op").value = "/"; byIdg.get("cl-math-go").fire("click");
  const calcOut = byIdg.get("cl-math-screen")._inner;
  if (/dropped 0\.5/.test(calcOut) || !/0\.5 got dropped/.test(calcOut)) throw new Error("calc message regression: " + calcOut);
  sandbox.go("#rust/lifetimes");
  byIdg.get("lg-lifetimes-in").fire("click");
  const lgOut = byIdg.get("lg-lifetimes-msg")._inner;
  if (!/&amp;s/.test(lgOut)) throw new Error("lifeguard entity regression: " + lgOut);
  console.log("REGRESSION CHECKS (rust): PASSED");

  // ---- sidebar UI state checks (rust track, everything marked done) ----
  sandbox.go("#rust/what");
  if (byIdg.get("pcount").textContent !== "43 of 43 done") throw new Error("pcount wrong after all done: " + byIdg.get("pcount").textContent);
  if (byIdg.get("pnext").querySelector(".spn-title").textContent !== "Track complete! 🎓") throw new Error("pnext title wrong after all done: " + byIdg.get("pnext").querySelector(".spn-title").textContent);
  if (byIdg.get("pnext").getAttribute("href") !== "#rust/glossary") throw new Error("pnext should point at the last done-able lesson when complete, got " + byIdg.get("pnext").getAttribute("href"));
  if (byIdg.get("pbar-fill").style.width !== "100%") throw new Error("pbar-fill should be 100%: " + byIdg.get("pbar-fill").style.width);
  const spNext = byIdg.get("pnext");
  for (const c of ["done", "next", "active"]) if (spNext.classList.contains(c)) throw new Error("up-next card must never get lesson-link state '" + c + "'");
  console.log("SIDEBAR UI STATE (rust, all done): OK");

  // ---- mobile drawer checks ----
  const drawerEl = byIdg.get("lessonDrawer"), backdropEl = byIdg.get("drawerBackdrop");
  byIdg.get("lessonMenuBtn").fire("click");
  if (!drawerEl.classList.contains("open")) throw new Error("drawer should open on menu click");
  if (!backdropEl.classList.contains("open")) throw new Error("backdrop should open with drawer");
  const dl = byIdg.get("drawerList").querySelectorAll("a");
  if (dl.length !== 45) throw new Error("drawer should list 45 rust lessons, got " + dl.length);
  if (dl[0].getAttribute("href") !== "#rust/what") throw new Error("drawer first lesson should be #rust/what, got " + dl[0].getAttribute("href"));
  const dcard = drawerEl.querySelector(".sp-next");
  if (dcard.getAttribute("href") !== "#rust/glossary") throw new Error("drawer next-card should point at last done-able lesson when complete, got " + dcard.getAttribute("href"));
  if (dcard.querySelector(".spn-title").textContent !== "Track complete! 🎓") throw new Error("drawer next-card title wrong: " + dcard.querySelector(".spn-title").textContent);
  byIdg.get("drawerClose").fire("click");
  if (drawerEl.classList.contains("open")) throw new Error("drawer should close on ✕");
  byIdg.get("lessonMenuBtn").fire("click");
  backdropEl.fire("click");
  if (drawerEl.classList.contains("open")) throw new Error("drawer should close on backdrop tap");
  console.log("MOBILE DRAWER (rust, open/close + list): OK");
}

// ============ PORTAL PAGE TEST (back on home) ============
function homeTest(){
  sandbox.go("#home");
  if (doc.body.dataset.page !== "home") throw new Error("go('#home') should return to the portal page");
  if (byId.get("main").children.length !== 1) throw new Error("portal should render one section after returning, got " + byId.get("main").children.length);

  // ---- cross-track search palette ----
  const si = byId.get("searchInput");
  si.value = "ownership";
  si.fire("input");
  const sres = byId.get("searchResults");
  const firstItem = sres.querySelector(".sr-item");
  if (!firstItem) throw new Error("search should list results for 'ownership'");
  if (firstItem.dataset.id !== "ownership") throw new Error("search first hit should be #ownership, got " + firstItem.dataset.id);
  si.fire("keydown", { key: "ArrowDown" });
  if (!sres.children[0].classList.contains("sel")) throw new Error("ArrowDown should select the first result");
  si.fire("keydown", { key: "Enter" });
  if (sres.classList.contains("open")) throw new Error("Enter should close the palette");
  if (sres.children.length !== 0) throw new Error("Enter should clear results");
  if (doc.body.dataset.page !== "rust") throw new Error("Enter on a rust hit should open the rust path");
  sandbox.go("#home");
  si.value = "zzzqqx";
  si.fire("input");
  if (sres.children.length !== 1 || !sres.children[0].classList.contains("sr-empty")) throw new Error("garbage query should show the empty state");
  si.fire("keydown", { key: "Escape" });
  if (sres.classList.contains("open")) throw new Error("Escape should close the palette");

  // ---- cross-path search: a general hit from home opens the general path ----
  // (probe a general-only term: rust now also has a "threads" lesson, which
  //  would shadow the general hit at the top of the palette)
  si.value = "big o";
  si.fire("input");
  const hit = sres.querySelector(".sr-item");
  if (!hit || hit.dataset.id !== "bigo") throw new Error("search should find #bigo first for 'big o': " + (hit && hit.dataset.id));
  sres.fire("click", { target: hit });
  if (doc.body.dataset.page !== "general") throw new Error("clicking a general hit should open the general path");
  sandbox.go("#home");
  console.log("SEARCH (cross-track palette, cross-path jumps): OK");

  // ---- home path cards (rust complete, general untouched) ----
  if (byId.get("homeFill-rust").style.width !== "100%") throw new Error("rust home card should show 100%");
  if (byId.get("homePct-rust").textContent !== "100%") throw new Error("rust home card pct wrong: " + byId.get("homePct-rust").textContent);
  if (byId.get("homeCta-rust").textContent !== "Track complete — review →") throw new Error("rust home card cta wrong: " + byId.get("homeCta-rust").textContent);
  if (byId.get("homeCard-rust").getAttribute("href") !== "#rust") throw new Error("rust home card should point at #rust (map) when complete, got " + byId.get("homeCard-rust").getAttribute("href"));
  if (byId.get("homeFill-general").style.width !== "0%") throw new Error("general home card should show 0%");
  if (byId.get("homeCta-general").textContent !== "Start the path →") throw new Error("general home card cta wrong: " + byId.get("homeCta-general").textContent);
  if (!/^#general\//.test(byId.get("homeCard-general").getAttribute("href"))) throw new Error("general home card should point at #general/<first lesson>: " + byId.get("homeCard-general").getAttribute("href"));
  console.log("HOME PATH CARDS (progress + portal links): OK");
}
globalThis.__t = { byId, byClass, allEls, doc, byTag };
fireAll();
homeTest();

// ============ TRACK SWITCH TEST ============
function trackTest(){
  const byIdg = globalThis.__t.byId;
  const sw = byIdg.get("trackSwitch");
  const generalBtn = [...sw.children].find(c => c._attrs && c._attrs["data-track"] === "general");
  if(!generalBtn) throw new Error("general track button missing");
  sw.fire("click", { target: generalBtn });

  // ---- general course map (fresh) ----
  const gRows = (byIdg.get("main").querySelectorAll(".syl-row") || []);
  if (gRows.length !== 20) throw new Error("general map should list 20 lessons, got " + gRows.length);
  if (byIdg.get("sylCount").textContent !== "0 of 20 done") throw new Error("sylCount wrong on fresh general map: " + byIdg.get("sylCount").textContent);
  if (byIdg.get("pcount").textContent !== "0 of 20 done") throw new Error("pcount wrong on fresh general track: " + byIdg.get("pcount").textContent);
  if (byIdg.get("pnext").querySelector(".spn-eyebrow").textContent !== "Up next") throw new Error("pnext eyebrow wrong on fresh general track: " + byIdg.get("pnext").querySelector(".spn-eyebrow").textContent);
  if (byIdg.get("pnext").querySelector(".spn-title").textContent !== "Threads — many workers") throw new Error("pnext title wrong on fresh general track: " + byIdg.get("pnext").querySelector(".spn-title").textContent);
  if (byIdg.get("pnext").getAttribute("href") !== "#general/threads") throw new Error("pnext href wrong on fresh general track: " + byIdg.get("pnext").getAttribute("href"));
  if (byIdg.get("pbar-fill").style.width !== "0%") throw new Error("pbar-fill should be 0% on fresh track: " + byIdg.get("pbar-fill").style.width);
  console.log("GENERAL MAP (20 rows + fresh sidebar state): OK");

  // ---- walk every general lesson: one page each, widgets fire ----
  const gwalk = walkTrack();
  if (gwalk.widgetLessons < 14) throw new Error("general walk should hit widget lessons, found " + gwalk.widgetLessons);
  console.log("GENERAL WALK: every lesson page renders + fires, " + gwalk.doneBtns + " marked done");

  // ---- regression checks for fixed bugs (general pages) ----
  sandbox.go("#general/treeview");
  let p = byIdg.get("w-treeview");
  while (p && p.tag !== "section") p = p.parentElement;
  if (!p || p._inner.indexOf("insert 1 →") === -1) throw new Error("treeview button label regression");
  sandbox.go("#general/threads");
  byIdg.get("th-threads-reset").fire("click");
  const lanes = [...byIdg.get("th-threads-race").querySelectorAll(".r-fill")].map(e => e.classList.contains("t1") ? "t1" : e.classList.contains("t2") ? "t2" : e.classList.contains("t3") ? "t3" : "none");
  if (lanes.join(",") !== "t1,t2,t3") throw new Error("threads lanes regression: " + lanes.join(","));
  console.log("REGRESSION CHECKS (general): PASSED");

  // ---- switch back to rust ----
  const rustBtn = [...sw.children].find(c => c._attrs && c._attrs["data-track"] === "rust");
  sw.fire("click", { target: rustBtn });
  const rRows = (byIdg.get("main").querySelectorAll(".syl-row") || []);
  if (rRows.length !== 45) throw new Error("switch back should restore the rust map, got " + rRows.length);
  console.log("SWITCH BACK: rust map re-rendered");

  // ---- router: legacy bare-hash deep link resolves across paths ----
  // (probe a general-only id: rust also has a "threads" lesson, which
  //  rightly wins bare "#threads" since tracks resolve in order)
  sandbox.go("#bigo");
  if (doc.body.dataset.page !== "general") throw new Error("legacy #bigo should open the general lesson page, got " + doc.body.dataset.page);
  sandbox.go("#rust/ownership");
  if (doc.body.dataset.page !== "rust") throw new Error("#rust/ownership should open the rust lesson page, got " + doc.body.dataset.page);
  byIdg.get("bx-vars-in").value = "42";
  sandbox.go("#ownership");
  if (doc.body.dataset.page !== "rust") throw new Error("legacy bare #ownership should stay on rust");
  if (byIdg.get("bx-vars-in").value !== "42") throw new Error("same-lesson nav must not re-render (widget state lost)");
  sandbox.go("#home");
  if (doc.body.dataset.page !== "home") throw new Error("#home should return to the portal");
  sandbox.go("#rust");
  const brandEl = byClass.get("brand") && byClass.get("brand")[0];
  if (!brandEl) throw new Error("brand element missing");
  brandEl.fire("click");
  if (doc.body.dataset.page !== "home") throw new Error("brand click should return to the portal");
  console.log("ROUTER (portal ↔ path deep links, same-track no-re-render, brand → home): OK");

  // ---- projects: the rust workshop — #rust/projects + #rust/project/<id> ----
  sandbox.go("#rust/projects");
  const pjCards = [...byClass.get("pj-card") || []];
  if (pjCards.length !== 12) throw new Error("projects page should list 12 project cards, got " + pjCards.length);
  const tiers = [...byClass.get("pj-tier") || []].map(t => t._attrs.id.replace("tier-", ""));
  if (tiers.join(",") !== "foundation,core,advanced,pro") throw new Error("project tiers wrong: " + tiers.join(","));
  const pjCrumbs = byId.get("main")._inner.indexOf("Projects") > -1;
  if (!pjCrumbs) throw new Error("projects breadcrumb missing");
  const unlockStrips = [...byClass.get("pj-unlock") || []];
  if (unlockStrips.length !== 4) throw new Error("each tier should show its unlock strip, got " + unlockStrips.length);
  const firstCard = pjCards[0];
  if (firstCard.getAttribute("href") !== "#rust/project/pj-minigrep") throw new Error("first card should be minigrep, got " + firstCard.getAttribute("href"));
  const pjHtml = byId.get("main")._inner;
  if (pjHtml.indexOf("Level 01") === -1) throw new Error("cards should carry level numbers");
  if (pjHtml.indexOf("pj-card-cta") === -1) throw new Error("cards should carry a real CTA button");
  const dd = [...byClass.get("side-dd") || []][0];
  if (!dd || dd._inner.indexOf("Projects") === -1) throw new Error("sidebar projects dropdown missing");
  if (dd._inner.indexOf("pj-minigrep") === -1) throw new Error("dropdown should list project deep links");
  dd.open = true;
  sandbox.go("#rust/project/pj-kernel");
  const ddAfter = [...byClass.get("side-dd") || []][0];
  if (!ddAfter || ddAfter.open !== true) throw new Error("projects dropdown must stay open when a project is selected (renderSidebar re-creates <details> — re-apply open)");
  const brief = byId.get("main")._inner;
  if (brief.indexOf("The goal") === -1 || brief.indexOf("Milestones") === -1 || brief.indexOf("Mentor") === -1) throw new Error("project brief page incomplete");
  if (brief.indexOf("What you'll use") === -1 || brief.indexOf("and why") === -1) throw new Error("brief should explain what to use and why");
  if (brief.indexOf("Before you start") === -1) throw new Error("brief should list prerequisites");
  if (brief.indexOf("blog_os") === -1) throw new Error("project brief should link its real source");
  if (brief.indexOf("Level 11") === -1) throw new Error("brief should show the level number");
  const steps = [...byClass.get("pj-step") || []].length;
  if (steps < 3) throw new Error("project brief should have milestones, got " + steps);
  sandbox.go("#rust/project/pj-minigrep");
  if (byId.get("main")._inner.indexOf("minigrep") === -1) throw new Error("project switching should re-render the brief");
  sandbox.go("#ownership");
  if (doc.body.dataset.page !== "rust") throw new Error("lesson nav from a project page should return to the path");
  if (byId.get("bx-vars-in") === undefined) throw new Error("path lessons should re-render after a project page");
  sandbox.go("#rust");
  console.log("PROJECTS (#rust/projects, brief pages, dropdown, cross-nav): OK");
}
trackTest();

setTimeout(() => process.exit(process.exitCode || 0), 50);
