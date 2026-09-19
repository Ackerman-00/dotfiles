/* ============================================================
   THEMES — registry + premium picker
   ADD A THEME:
     1) drop a file in assets/css/themes/ (one block per mode,
        token contract documented in assets/css/themes.css)
     2) add one entry to RZ_THEMES below
   Nothing else changes.
============================================================ */
var RZ_THEMES = [
  { id:"ember",     name:"Ember",        emoji:"🌋", group:"Signature", grad:"linear-gradient(100deg,#e08a64 0%,#c0609a 45%,#8f75ff 100%)", speed:"4s",  modes:{dark:true,light:true},  def:"dark"  },
  { id:"graphite",    name:"Graphite",     emoji:"🌑", group:"Signature", grad:"linear-gradient(100deg,#10A37F 0%,#19C37D 45%,#ECECEC 100%)", speed:"5s", modes:{dark:true,light:true},  def:"dark"  },
  { id:"void",        name:"Void",         emoji:"🕳️", group:"Signature", grad:"linear-gradient(135deg,#1D9BF0 0%,#16181C 55%,#000000 100%)", speed:"6s", modes:{dark:true,light:true},  def:"dark"  },
  { id:"liquid-glass", name:"Liquid Glass", emoji:"💎", group:"Signature", grad:"linear-gradient(135deg,#60a5fa 0%,#a78bfa 50%,#f472b6 100%)", speed:"5s",  modes:{dark:true,light:true},  def:"dark"  },
  { id:"aurora-glass", name:"Aurora Glass", emoji:"🌿", group:"Signature", grad:"linear-gradient(135deg,#10b981 0%,#06b6d4 45%,#8b5cf6 100%)", speed:"4s",  modes:{dark:true,light:true},  def:"dark"  },
  { id:"claude",      name:"Claude",       emoji:"✳️", group:"Official", grad:"linear-gradient(100deg,#d97757 0%,#c6613f 45%,#6a9bcc 100%)", speed:"7s", modes:{dark:true,light:true},  def:"light"  },
  { id:"chatgpt",     name:"ChatGPT",      emoji:"💬", group:"Official", grad:"linear-gradient(100deg,#10a37f 0%,#0b7a5c 45%,#000000 100%)", speed:"6s", modes:{dark:true,light:true},  def:"light"  },
  { id:"grok",        name:"Grok",         emoji:"⚡", group:"Official", grad:"linear-gradient(100deg,#a78bfa 0%,#7c3aed 45%,#000000 100%)", speed:"5s", modes:{dark:true,light:true},  def:"dark"  },
  { id:"nord",      name:"Nord",         emoji:"❄️", group:"Editor", grad:"linear-gradient(100deg,#bf616a 0%,#d08770 45%,#88c0d0 100%)", speed:"6s",  modes:{dark:true,light:true},  def:"dark"  },
  { id:"tokyo",     name:"Tokyo Night",  emoji:"🌃", group:"Editor", grad:"linear-gradient(100deg,#ff9e64 0%,#bb9af7 45%,#7dcfff 100%)", speed:"3s",  modes:{dark:true,light:false}, def:"dark"  },
  { id:"dracula",   name:"Dracula",      emoji:"🧛", group:"Editor", grad:"linear-gradient(100deg,#ff5555 0%,#bd93f9 45%,#8be9fd 100%)", speed:"3.5s",modes:{dark:true,light:false}, def:"dark"  },
  { id:"catppuccin",name:"Catppuccin",   emoji:"🐱", group:"Editor", grad:"linear-gradient(100deg,#fab387 0%,#cba6f7 45%,#89dceb 100%)", speed:"5s",  modes:{dark:true,light:true},  def:"dark"  },
  { id:"gruvbox",   name:"Gruvbox",      emoji:"🪵", group:"Editor", grad:"linear-gradient(100deg,#fb4934 0%,#fabd2f 45%,#8ec07c 100%)", speed:"4.5s",modes:{dark:true,light:true},  def:"dark"  }
];

var RZ_THEME_KEY = "rz-theme";

function rzThemeById(id){
  for (var i = 0; i < RZ_THEMES.length; i++) if (RZ_THEMES[i].id === id) return RZ_THEMES[i];
  return null;
}

/* ---- apply: theme id + mode ("dark" | "light") onto <html> ---- */
function rzApplyTheme(id, mode){
  var t = rzThemeById(id);
  if (!t) return;
  if (!t.modes[mode]) mode = t.modes.dark ? "dark" : "light";
  var html = document.documentElement;
  html.dataset.theme = t.id;
  html.dataset.mode = mode;
  try { localStorage.setItem(RZ_THEME_KEY, t.id + "-" + mode); } catch (e) {}
  if (typeof rzPaintPicker === "function") rzPaintPicker();
}

/* ---- boot: read saved theme (back-compat: old "dark"/"light") ---- */
(function rzBootTheme(){
  var saved = "ember-dark";
  try { saved = localStorage.getItem(RZ_THEME_KEY) || saved; } catch (e) {}
  var mode = "dark", id = "ember";
  if (saved === "dark" || saved === "light") { mode = saved; }
  else {
    var m = /^([a-z]+)-(dark|light)$/.exec(saved);
    if (m && rzThemeById(m[1])) { id = m[1]; mode = m[2]; }
  }
  rzApplyTheme(id, mode);
})();

/* ---- premium picker UI ---- */
function rzBuildPicker(){
  var trigger = document.getElementById("themeBtn");
  var menu = document.getElementById("themeMenu");
  if (!trigger || !menu) return;
  trigger.setAttribute("aria-haspopup","true");
  trigger.setAttribute("aria-expanded","false");
  trigger.setAttribute("aria-controls","themeMenu");

  /* mode row: sleek dark / light pills */
  var modeRow = document.createElement("div");
  modeRow.className = "tm-mode";
  ["dark","light"].forEach(function(m){
    var b = document.createElement("button");
    b.className = "tm-mode-btn";
    b.type = "button";
    b.dataset.mode = m;
    b.setAttribute("aria-pressed","false");
    b.innerHTML = m === "dark" ? "🌙&nbsp;Dark" : "☀️&nbsp;Light";
    b.addEventListener("click",function(){
      var cur = rzThemeById(document.documentElement.dataset.theme) || RZ_THEMES[0];
      rzApplyTheme(cur.id,m);
    });
    modeRow.appendChild(b);
  });
  menu.appendChild(modeRow);

  /* theme list: grouped rows (Official / Signature / Editor) */
  var list = document.createElement("div");
  list.className = "tm-list";
  var groups = ["Official","Signature","Editor"];
  groups.forEach(function(g){
    var items = RZ_THEMES.filter(function(t){ return (t.group || "Signature") === g; });
    if (!items.length) return;
    var head = document.createElement("div");
    head.className = "tm-group";
    head.textContent = g;
    list.appendChild(head);
    items.forEach(function(t){
    var row = document.createElement("button");
    row.type = "button";
    row.className = "tm-row";
    row.dataset.family = t.id;
    row.setAttribute("aria-label",t.name);
    row.style.setProperty("--tm-grad",t.grad);
    row.style.setProperty("--tm-speed",t.speed);

    var bar = document.createElement("span");
    bar.className = "tm-bar";

    var info = document.createElement("span");
    info.className = "tm-info";

    var name = document.createElement("span");
    name.className = "tm-name";
    name.innerHTML = t.emoji + " " + t.name + " <small>" + (t.modes.dark && t.modes.light ? "Dark+Light" : "Dark only") + "</small>";

    info.appendChild(name);

    var modes = document.createElement("span");
    modes.className = "tm-modes";
    ["dark","light"].forEach(function(m){
      var dot = document.createElement("span");
      dot.className = "tm-dot" + (t.modes[m] ? "" : " dim");
      dot.dataset.mode = m;
      dot.title = m;
      dot.textContent = m === "dark" ? "🌙" : "☀";
      dot.addEventListener("click",function(ev){
        ev.stopPropagation();
        if (!dot.classList.contains("dim")) rzApplyTheme(t.id,m);
      });
      modes.appendChild(dot);
    });

    row.appendChild(bar);
    row.appendChild(info);
    row.appendChild(modes);

    row.addEventListener("click",function(){
      rzApplyTheme(t.id,t.modes[t.def] ? t.def : (t.modes.light ? "light" : "dark"));
    });

    list.appendChild(row);
    });
  });
  menu.appendChild(list);

  /* trigger toggle */
  trigger.addEventListener("click",function(){
    var open = menu.hidden;
    menu.hidden = !open;
    trigger.setAttribute("aria-expanded",String(open));
  });

  /* outside click */
  document.addEventListener("pointerdown",function(ev){
    if (!menu.hidden && !menu.contains(ev.target) && ev.target !== trigger){
      menu.hidden = true;
      trigger.setAttribute("aria-expanded","false");
    }
  });

  /* escape */
  document.addEventListener("keydown",function(ev){
    if (ev.key === "Escape" && !menu.hidden){
      menu.hidden = true;
      trigger.setAttribute("aria-expanded","false");
      trigger.focus();
    }
  });

  rzPaintPicker();
}

function rzPaintPicker(){
  var html = document.documentElement;
  var curId = html.dataset.theme;
  var curMode = html.dataset.mode || "dark";
  var menu = document.getElementById("themeMenu");
  if (!menu) return;

  /* mode buttons */
  menu.querySelectorAll(".tm-mode-btn").forEach(function(b){
    b.setAttribute("aria-pressed",String(b.dataset.mode === curMode));
    var t = rzThemeById(curId);
    b.setAttribute("aria-disabled",String(!t || !t.modes[b.dataset.mode]));
  });

  /* theme rows */
  menu.querySelectorAll(".tm-row").forEach(function(r){
    var t = rzThemeById(r.dataset.family);
    r.classList.toggle("active",r.dataset.family === curId);

    /* update mode dots */
    r.querySelectorAll(".tm-dot").forEach(function(d){
      d.classList.toggle("cur",r.dataset.family === curId && d.dataset.mode === curMode);
    });

    /* update subtitle */
    if (t){
      var sub = r.querySelector("small");
      if (sub) sub.textContent = (t.modes.dark && t.modes.light) ? "Dark+Light" : "Dark only";
    }
  });
}

document.addEventListener("DOMContentLoaded",function(){
  if (typeof rzBuildPicker === "function") rzBuildPicker();
});

/* ── premium 2026: cursor-follow ambient glow ──
   Feeds --gx/--gy (px) for the composited .rz-glow layer
   (transform-driven, GPU-composited, zero repaint). rAF-throttled
   + hidden-tab gating; no layout work. */
(function(){
  if (typeof addEventListener !== "function") return;
  var gx=0,gy=0,raf=0;
  addEventListener("pointermove",function(e){
    gx=e.clientX;gy=e.clientY;
    if(!raf){raf=requestAnimationFrame(function(){
      raf=0;
      if (document.hidden) return;
      var s=document.documentElement.style;
      s.setProperty("--gx",gx+"px");
      s.setProperty("--gy",gy+"px");
    });}
  },{passive:true});
})();

/* ── 2026 perf: viewport-gated border glow ──
   Conic-gradient rotation repaints per frame, so running it on
   every card is a top heat source. Only cards in/near the
   viewport get animation-play-state:running (data-glow="on");
   everything off-screen freezes to a static ring. observeAll()
   in app.js re-hooks this on every route render. */
var rzGlowIO = null;
function rzObserveGlow(){
  if (typeof IntersectionObserver === "undefined") return;
  if (rzGlowIO) rzGlowIO.disconnect();
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      e.target.setAttribute("data-glow", e.isIntersecting ? "on" : "off");
    });
  }, { rootMargin:"150px 0px" });
  document.querySelectorAll(".hero-panel,.widget,.quiz-card,.track-card,.terminal,.side-progress,.sp-next,.id-card,.vbox,.own-box,.ts-value,.graduation,.match-arm,.shelf-item").forEach(function(el){ io.observe(el); });
  rzGlowIO = io;
}
if (typeof addEventListener === "function") document.addEventListener("DOMContentLoaded", rzObserveGlow);
