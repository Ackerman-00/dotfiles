/* ============================================================
   SECURITY — client-side guard (2026 essentials):
   context menu / shortcut / devtools / drag-drop / console
   NOTE: client-side code can never be 100% hidden — this is the
   layered "make it not worth the effort" standard. For real
   secrecy the JS must live on a server; see tools/protect.mjs
   for the obfuscated dist/ build.
============================================================ */
(function(){
  "use strict";

  var on = function(){
    try {
      return typeof window !== "undefined" && !!window.document;
    } catch(e){ return false; }
  };
  if (!on()) return;

  var shown = 0;
  var toastEl = null;
  var overlayEl = null;
  var dismissedAt = 0;

  function toast(msg){
    if (!document.body) return;
    if (Date.now() - shown < 900) return;
    shown = Date.now();
    if (!toastEl){
      toastEl = document.createElement("div");
      toastEl.className = "sec-toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("on");
    setTimeout(function(){ toastEl.classList.remove("on"); }, 1600);
  }

  function overlay(on_){
    if (!document.body) return;
    if (on_){
      /* the window-size heuristic can false-positive (split screens, zoomed
         or large browser chrome) — a dismiss button keeps a false hit from
         bricking the page, and a 60s backoff stops it instantly re-covering
         while still re-arming once the coast is clear. */
      if (dismissedAt && Date.now() - dismissedAt < 60000) return;
      if (!overlayEl){
        overlayEl = document.createElement("div");
        overlayEl.className = "sec-overlay";
        overlayEl.innerHTML = '<div class="sec-overlay-card"><button type="button" class="sec-overlay-close" aria-label="Dismiss">×</button><b>Protected content</b><p>DevTools is open. The content is guarded — close the inspector to continue reading.</p></div>';
        document.body.appendChild(overlayEl);
        overlayEl.querySelector(".sec-overlay-close").addEventListener("click", function(){
          dismissedAt = Date.now();
          overlayEl.classList.remove("on");
        });
      }
      overlayEl.classList.add("on");
    } else if (overlayEl){
      overlayEl.classList.remove("on");
    }
  }

  /* 1 — no right-click / long-press prying */
  try {
    document.addEventListener("contextmenu", function(e){
      if (e.preventDefault) e.preventDefault();
      toast("This site is protected — no inspecting here.");
    });
  } catch(e){}

  /* 2 — keyboard: F12, devtools, view source, save-as, screenshots */
  try {
    document.addEventListener("keydown", function(e){
      var k = (e.key || "").toLowerCase();
      var mod = e.ctrlKey || e.metaKey;
      var blocked =
        k === "f12" ||
        (mod && (e.shiftKey || e.altKey) && (k === "i" || k === "j" || k === "c")) ||
        (mod && k === "u") ||
        (mod && k === "s") ||
        (mod && !e.shiftKey && !e.altKey && k === "p");
      var snap = k === "printscreen" || k === "snapshot" ||
        (e.metaKey && e.shiftKey && (k === "3" || k === "4" || k === "5"));
      if (blocked || snap){
        if (e.preventDefault) e.preventDefault();
        toast("Protected — shortcut disabled.");
      }
    });
  } catch(e){}

  /* 2b — anti-screenshot AutoBlur: the page blurs the moment the window
     loses focus (alt-tab, snipping overlay, tab switch) and stays blurred
     briefly after focus returns, so grabs never show readable content.
     NOTE: blur/visibility events also fire during load (unfocused new
     tab, reload focus transition) — without a boot grace the page would
     flash blurred at every open/reload, so arming is ignored for the
     first second; if the page is still hidden when the grace ends, it
     arms then. */
  var BOOT_GRACE = 1000;
  var bootedAt = Date.now();
  function armSnap(){
    if (Date.now() - bootedAt < BOOT_GRACE) return;
    try { if (document.body) document.body.classList.add("snap-guard"); } catch(e){}
  }
  var snapTimer = null;
  function disarmSnap(){
    if (snapTimer) return;
    snapTimer = setTimeout(function(){
      snapTimer = null;
      try { if (document.body) document.body.classList.remove("snap-guard"); } catch(e){}
    }, 300);
  }
  try {
    window.addEventListener("blur", armSnap);
    window.addEventListener("focus", disarmSnap);
    document.addEventListener("visibilitychange", function(){
      if (document.hidden) armSnap(); else disarmSnap();
    });
    window.addEventListener("beforeprint", armSnap);
    window.addEventListener("afterprint", disarmSnap);
  } catch(e){}
  setTimeout(function(){
    if (document.hidden) armSnap();
  }, BOOT_GRACE);

  /* 3 — no dragging files onto the page (script-injection vector) */
  try {
    document.addEventListener("dragover", function(e){ if (e.preventDefault) e.preventDefault(); });
    document.addEventListener("drop", function(e){
      if (e.preventDefault) e.preventDefault();
      toast("Protected — drops disabled.");
    });
  } catch(e){}

  /* 4 — devtools detection (window-size heuristic) with an overlay.
      setTimeout chain on purpose: setInterval would be killed by
      renderAll()'s RZ_TIMERS cleanup. While the tab is in the
      background the inspector can't be open on us anyway, so we
      back off to a slow 2s pulse instead of burning CPU every 1.2s
      on a hidden page (a classic silent leak pattern). */
   function probe(){
     if (document.hidden){ setTimeout(probe, 2000); return; }
     try {
       var w = window.outerWidth - window.innerWidth;
       var h = window.outerHeight - window.innerHeight;
       var open = (w > 160 || h > 160);
       if (open !== probe.open){
         probe.open = open;
         overlay(open);
       }
     } catch(e){}
     setTimeout(probe, 1200);
   }
   probe.open = false;
   if (typeof window.outerWidth !== "undefined" && typeof window.innerWidth !== "undefined") setTimeout(probe, 1500);

  /* 5 — console: watermark + make clear() useless for snooping */
  try {
    if (window.console && console.clear){
      console.clear = function(){};
    }
    if (window.console && console.log){
      var orig = console.log.bind(console);
      setTimeout(function(){
        orig("%cLearn to Code from Zero%c — protected build. Source is intentionally not readable here.", "background:#6b51d9;color:#fff;padding:3px 10px;border-radius:4px;font-weight:bold", "");
      }, 400);
    }
  } catch(e){}
})();
