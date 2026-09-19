# Learn to Code from Zero

A hash-routed interactive course with two tracks, wiki-style: a **portal
page** (`#home`) holds the search and the two path cards, and each path is its
own page (`#rust` / `#general`, deep-linkable to lessons as `#rust/<lesson>`):

- **Rust** (45 lessons, five chapters: first steps → core ideas → handle errors → build big → finish) — the original course, from `cargo` to modules, tests, closures, smart pointers, threads, async, patterns, a real CLI (minigrep), and a hand-built web server, including cheat sheets and an A–Z glossary, plus a **Projects workshop** (`#rust/projects`, deep-linkable as `#rust/project/<id>`) — 12 real, tested projects in four tiers (Foundation → Core → Advanced → Pro), from minigrep to an OS kernel, each with a brief, milestones, and its real source
- **General** (20 lessons) — threads, async, smart pointers, testing, modules,
  Big O, data structures (array vs linked list, stack/queue, hash map, trees,
  graphs, heaps), binary search, sorting, merge sort, recursion, backtracking,
  dynamic programming, and problem-solving

Every lesson has a text explanation, a line-by-line annotated code sample with
an explain panel, and a hands-on playground. Progress is saved in
`localStorage`, per track.

## Run it

Open `index.html` in a browser. No build step, no server required (everything
is plain `<script>` tags, so it also works from `file://`).

Smoke test (needs Node ≥ 14):

```sh
node tools/smoke.mjs
```

This boots the whole site inside a DOM shim, renders both tracks, clicks every
playground, and fails loudly if anything breaks.

## Project layout

```
index.html              static shell: nav, track switcher, sidebar, portal page, footer
assets/css/base.css     layout, nav, sidebar, portal + path pages, typography
assets/css/widgets.css  18 playground styles
assets/js/util.js       DOM helpers ($, $$, esc, hlCode), timers
assets/js/data.js       track meta (portal/path copy, graduation roadmap)
assets/js/tracks.js     TRACKS registry (lesson arrays per track)
assets/js/widgets.js    every playground: HTML, CSS-driven, behaviors
assets/js/app.js        render engine, hash router (#home / #rust / #general / #rust/<lesson> / #rust/projects / #rust/project/<id>), the 12-project workshop, progress, theme, boot
assets/js/lessons/rust/*.js       one file per Rust lesson
assets/js/lessons/general/*.js    one file per general lesson
tools/smoke.mjs         headless boot + interaction test
```

## How a lesson is written

Each lesson is a plain file that pushes one object onto the track's array:

```js
RUST_LESSONS.push({
  id: "hello",                       // used for #w-{id}, anchors, progress key
  title: "Hello, world",             // sidebar + lesson header
  w: "hello",                        // widget type (see widgetTitle in widgets.js)
  words: [ "First lesson..." ],      // the plain-words explanation
  code: {                            // annotated code sample
    lines: [
      ["fn main() {", "every program starts here"],
      ["println!(\"Hi!\");", "prints a line", "deeper dive text shown in the explain panel"]
    ],
    copy: "fn main() { ... }"        // what the Copy button copies
  },
  steps: { "goal": "Done step 1", "2": "Done step 2" },   // optional quiz-ish checklist
  done: "What a start!"
});
```

The `widgets.js` `initWidget(id, type)` dispatch maps `type` to `init*` functions
that wire up each playground; widget-specific markup comes from `widgetHtml`.

## Adding a lesson

1. Create `assets/js/lessons/<track>/mylesson.js` with a `push` like above.
2. Add a `<script>` tag for it in `index.html` **in the track's block** (order matters: `data.js` → lesson files → `tracks.js`).
3. Update the footer lesson count in `index.html` (all-tracks total).
4. Run `node tools/smoke.mjs` — it verifies rendering and that every playground's handlers fire.

## Adding a track (C++, Python, JS…)

Tracks are data, not code — router, search, switcher, home cards and
progress all read `TRACK_ORDER` + `TRACK_META`:

1. Create `assets/js/lessons/<id>/*.js` (same `push` format) + a
   `var <ID>_LESSONS = [];` line in `assets/js/data.js`.
2. Add the `<script>` tags in `index.html` (own `<!-- lessons: <id> -->`
   block, before `tracks.js`), and register in `assets/js/tracks.js`:
   `TRACKS.<id> = <ID>_LESSONS` + `TRACK_ORDER.push("<id>")`.
3. Add `TRACK_META.<id>` in `data.js`: `pill`, `pillIcon`, `short`
   (search prefix), `color` (card/search accent, AA-checked),
   `name`, `tag`, `projects:true` only if it has a workshop.
4. Extend `tools/smoke.mjs` orders + counts for the new track.
5. `node tools/protect.mjs` to rebuild `dist/`.

## Themes

One file per theme in `assets/css/themes/` (token contract at the top of
`assets/css/themes.css`) + one `RZ_THEMES` entry with a `group`
(`Official` = real brand palettes, `Editor` = code-editor classics,
`Signature` = house styles). Small text never uses raw accents — shared
text-safe `color-mix` rules in `themes.css` hold ≥4.5:1 in every theme.

## Deploying to GitHub Pages

Everything is static, so Pages just serves the repo root:

1. `git init && git add . && git commit -m "init"`
2. Create a repo on GitHub (e.g. `rust-from-zero`), then `git remote add origin <url> && git push -u origin main`
3. Repo → **Settings → Pages** → Source: **Deploy from a branch**, branch `main`, folder `/` → Save.
4. Your site is live at `https://<user>.github.io/<repo>/`

That's it — no build, no `gh-pages` branch needed. Paths in the HTML are
relative (`assets/...`), so subdirectory hosting works as-is.

## Security — what's guarded, and how

Layered 2026 hardening against "prying into the code" via web tools:

1. **`assets/js/security.js`** (loaded with every page): blocks right-click,
   F12 / Ctrl+U / Ctrl+Shift+I/C/J / Ctrl+S, drag-and-drop file injection,
   blanks `console.clear()`, watermarks the console, and shows a full-screen
   overlay while DevTools is detected open (window-size heuristic, probed with
   a recursive `setTimeout` — deliberately NOT `rzInterval`, so route changes
   can't kill the guard). Selection is locked on the chrome but kept copyable
   in lesson content, so learners can still copy code they're allowed to.
2. **Meta hardening in `index.html`**: `robots noindex,nofollow,noarchive`,
   `referrer no-referrer`, and a Content-Security-Policy meta
   (`default-src 'self'`, scripts/CSS local, images data-only). No third-party
   loads exist, so the CSP locks the page to itself.
3. **`_headers`** — hardening headers for Netlify/Cloudflare Pages deploys
   (`nosniff`, `X-Frame-Options: DENY`, `noindex`, permissions policy).
4. **Obfuscated deploy build**: `node tools/protect.mjs` produces `dist/` with
   every comment stripped and whitespace collapsed — string-, regex- and
   template-aware, ASI-preserving, each file verified with `node --check`,
   then the whole site re-verified with the full smoke suite against `dist/`
   (`RZ_BASE=dist node tools/smoke.mjs`). No source maps are emitted.
5. **Anti-cheat (no copy, no screenshots)**: text selection is locked
   globally — only code blocks (`.code-body`/`.code-text`) and form inputs
   stay selectable, so paragraphs, titles, tips, hints, quiz text and widget
   answers can't be copied or highlighted. Screenshot deterrents: the page
   AutoBlurs the moment the window loses focus or the tab is hidden
   (catches snipping-tool grabs and alt-tab), `@media print` blanks the page
   (kills Save-as-PDF), and PrtSc / Ctrl+P / macOS Cmd+Shift+3/4/5 are
   intercepted. The devtools overlay also kills the DevTools "Capture
   screenshot" command.

Honest limits: client-side code can never be truly hidden — a determined
person can always run the page and observe behavior. Obfuscation + guards +
CSP raise the cost to "not worth it" for casual prying; if you ever need real
secrecy, the actual logic must live on a server you control. Note also that
meta-CSP is largely ignored on `file://` — serve `dist/` through a static host
to make the headers and CSP fully effective. And no web page can stop a phone
camera pointed at the screen — the blur/selection stack raises the bar, it
doesn't build a wall.

## Performance — why load times dropped

The dev tree is modular (72 script files for easy lesson editing), but a
deploy build must not ship 72 render-blocking requests. `dist/` fixes the
three big 2026 load-time killers:

1. **One bundle**: `tools/protect.mjs` concatenates all 72 scripts (in
   `index.html` order, top-level `var`s intact) into a single
   `assets/js/bundle.js` (~270KB) — one request instead of 72 serial ones.
   `security.js` stays separate, loaded last.
2. **One stylesheet**: `fonts.css + base.css + widgets.css` merge into
   `assets/css/app.css` (relative `url(../fonts/...)` paths keep the
   @font-face rules valid). 3 requests → 1.
3. **Self-hosted fonts**: `tools/fonts.mjs` downloads the exact latin woff2
   subsets the design uses into `assets/fonts/` (13 faces) — the render-
   blocking Google Fonts stylesheet and its preconnects are gone, the site
   now works offline, and nothing is fetched from Google.

Plus `_headers` caching: `/assets/*` is `Cache-Control: max-age=31536000,
immutable` (after the first load the browser never re-requests a file) and
`index.html` is `no-cache`, so updates appear instantly. Re-run
`node tools/fonts.mjs && node tools/protect.mjs` after any asset change.

## Editing style notes

- All shared names across files are declared with `var` at file top level so
  every `<script>` sees them in every runtime.
- Timers created by widgets are collected in `RZ_TIMERS` and cleared on each
  re-render — always register new intervals with `rzInterval`.
- Dark/light theme is a `.dark` class on `<html>`; `localStorage` key
  `rz-theme`. Progress keys: `rz-progress-rust`, `rz-progress-general`.
