#!/usr/bin/env bash
# fix-noctalia-keys.sh - rewrite legacy pre-0.18.0 color keys in Noctalia's
# generated Mango theme (~/.config/mango/noctalia.conf) to snake_case.
# Noctalia v5.2.1's built-in Mango template still emits run-together keys
# (rootcolor, bordercolor, ...) which Mango 0.18.0 rejects as Unknown keyword.
# Idempotent: safe to run on every palette/wallpaper change via Noctalia hooks.
set -euo pipefail

file="${HOME}/.config/mango/noctalia.conf"
[[ -f "$file" ]] || exit 0

perl -i -pe 's{(?<![-/\w#])\Qrootcolor\E(?![\w#/-])}{root_color}g;s{(?<![-/\w#])\Qbordercolor\E(?![\w#/-])}{border_color}g;s{(?<![-/\w#])\Qdropcolor\E(?![\w#/-])}{drop_color}g;s{(?<![-/\w#])\Qsplitcolor\E(?![\w#/-])}{split_color}g;s{(?<![-/\w#])\Qfocuscolor\E(?![\w#/-])}{focus_color}g;s{(?<![-/\w#])\Qmaximizescreencolor\E(?![\w#/-])}{maximized_screen_color}g;s{(?<![-/\w#])\Qurgentcolor\E(?![\w#/-])}{urgent_color}g;s{(?<![-/\w#])\Qscratchpadcolor\E(?![\w#/-])}{scratchpad_color}g;s{(?<![-/\w#])\Qglobalcolor\E(?![\w#/-])}{global_color}g;s{(?<![-/\w#])\Qoverlaycolor\E(?![\w#/-])}{overlay_color}g;s{(?<![-/\w#])\Qshadowscolor\E(?![\w#/-])}{shadows_color}g;' -- "$file"
