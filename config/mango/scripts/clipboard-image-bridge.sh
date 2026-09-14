#!/bin/sh
# Bridges Wayland images to X11 clipboard
wl-paste --type image/png --watch sh -c \
  'xclip -selection clipboard -t image/png -i' >/dev/null 2>&1
