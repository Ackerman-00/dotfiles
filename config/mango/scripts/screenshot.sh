#!/usr/bin/env bash
tmp=$(mktemp /tmp/screenshot-XXXXXX.png)
trap 'rm -f "$tmp"' EXIT

case "${1:-full}" in
  region)
    grim -g "$(slurp -d)" "$tmp"
    ;;
  full)
    grim "$tmp"
    ;;
esac

wl-copy --type image/png < "$tmp" &
xclip -selection clipboard -t image/png "$tmp" &
swappy -f "$tmp"
wait
