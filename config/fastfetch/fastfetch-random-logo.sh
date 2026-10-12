#!/usr/bin/env bash
# Random-logo wrapper for fastfetch (Fedora port).
# Picks a random logo from the logo dir on every invocation, overriding the
# static "logo.source" in config.jsonc.
#
# Install: install -Dm755 ~/.config/fastfetch/fastfetch-random-logo.sh ~/.local/bin/fastfetch.sh
# Your .zshrc already calls ~/.local/bin/fastfetch.sh on shell startup.
set -euo pipefail

confDir="${XDG_CONFIG_HOME:-$HOME/.config}"
logoDir="${confDir}/fastfetch/logo"

mkdir -p "$logoDir"

# Random pick. `shuf` is part of coreutils on Fedora, so always present.
chosen_logo_path="$(find -L "$logoDir" -maxdepth 1 -type f \
  \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.gif" -o -iname "*.webp" -o -iname "*.bmp" -o -iname "*.txt" \) \
  2>/dev/null | shuf -n 1 || true)"

if [ -z "${chosen_logo_path:-}" ]; then
  exec fastfetch "$@"
fi

extension="${chosen_logo_path##*.}"
extension="${extension,,}"

# Images render via kitty (fastfetch downscales with ImageMagick, which keeps
# the soft original look; kitty-direct lets the terminal crush full-res files
# down to cell size and looks oversharpened). Text logos print as-is.
if [[ "$extension" == "txt" ]]; then
  exec fastfetch --logo-type file --logo "$chosen_logo_path" "$@"
else
  exec fastfetch --logo-type kitty --logo "$chosen_logo_path" "$@"
fi
