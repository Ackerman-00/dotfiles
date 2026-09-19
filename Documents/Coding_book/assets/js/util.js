/* ============================================
   shared helpers — DOM, escaping, timers
============================================ */

/* device-capability probe (2026 adaptive pattern): detects weak/constrained
   devices (<=4 cores or <=4GB) and flags them via html[data-perf="low"] so
   CSS can render the SAME design on cheaper frames (smaller blur radius,
   paused decorative animations) and JS can lighten work. Nothing visible
   is removed — only the per-frame cost is lowered. */
var RZ_LOW = false;
try {
  var _rzMem = navigator.deviceMemory || 0;
  var _rzCpu = navigator.hardwareConcurrency || 0;
  RZ_LOW = (_rzCpu && _rzCpu <= 4) || (_rzMem && _rzMem <= 4);
  if (RZ_LOW && document.documentElement) document.documentElement.dataset.perf = "low";
} catch(e){}

var $ = s => document.querySelector(s);
var $$ = s => document.querySelectorAll(s);
var esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
/* lesson titles carry <em> markup for display — strip it anywhere the
   string leaves HTML (tab titles, aria-live announcements) */
var stripTags = s => String(s == null ? "" : s).replace(/<[^>]*>/g, "");

function hlCode(line){
  const re = /("[^"\n]*"|'[^'\n]*')|\b(fn|let|mut|if|else|loop|while|for|in|break|continue|match|use|return|struct|enum|impl|true|false|Some|None|Ok|Err)\b|\b(i32|u32|u64|f64|bool|char|String|str|Vec|Option|Result|Player)\b|\b(\d+(?:\.\d+)?)\b/g;
  let out = "", last = 0, m;
  while ((m = re.exec(line))){
    out += esc(line.slice(last, m.index));
    if (m[1]) out += '<span class="st">' + esc(m[1]) + "</span>";
    else if (m[2]) out += '<span class="kw">' + m[2] + "</span>";
    else if (m[3]) out += '<span class="ty">' + m[3] + "</span>";
    else if (m[4]) out += '<span class="ot">' + m[4] + "</span>";
    last = m.index + m[0].length;
  }
  out += esc(line.slice(last));
  return out;
}

var fmtTip = t => t.h ? '<div class="tip"><div class="t-ic">★</div><p><b>' + t.h + "</b> " + t.b + "</p></div>" : "";

/* ============================================================
   RENDER
============================================================ */
var main = $("#main");
var sidebar = $("#sidebar");

var currentTrack = "rust";
var RZ_TIMERS = [];
/* every setInterval in the app is registered here so a route change
   (app.js clears RZ_TIMERS on every render) can't leak widget
   visualizers that keep ticking against detached DOM nodes. */
(function(){
  var _si = window.setInterval;
  window.setInterval = function(fn, ms){
    var t = _si(fn, ms);
    try { RZ_TIMERS.push(t); } catch(e){}
    return t;
  };
})();
function rzInterval(fn, ms, store){ const t = setInterval(fn, ms); if (store) store.push(t); return t; }
function rzStop(store){ store.forEach(id => { clearInterval(id); clearTimeout(id); }); store.length = 0; }
var rzSleep = ms => new Promise(r => setTimeout(r, ms));
var rzNextFrame = fn => (window.requestAnimationFrame || (f => setTimeout(f, 0)))(fn);