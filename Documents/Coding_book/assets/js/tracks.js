/* ============================================
   tracks — load AFTER lesson files
   TRACK_ORDER is the single source of truth for every
   track loop (router, search, switcher, home, progress).
   New language? Push its id here (order = display order).
============================================ */
var TRACKS = {
  rust: RUST_LESSONS,
  general: GENERAL_LESSONS
};
var TRACK_ORDER = ["rust", "general"];
function trackList(){
  return TRACK_ORDER.filter(function(id){ return TRACKS[id] && TRACK_META[id]; });
}