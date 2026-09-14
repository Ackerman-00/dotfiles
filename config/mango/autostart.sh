#!/bin/sh

# keep clipboard content after app closes
wl-clip-persist --clipboard regular --reconnect-tries 0 >/dev/null 2>&1 &

# clipboard history
wl-paste --type text --watch cliphist store >/dev/null 2>&1 &

# bridge: Wayland -> X11 (text)
wl-paste --type text --watch xclip -selection clipboard >/dev/null 2>&1 &

# bridge: Wayland -> X11 (images - x11 App fix)
~/.config/mango/scripts/clipboard-image-bridge.sh &
