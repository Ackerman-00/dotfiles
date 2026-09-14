#!/usr/bin/env bash

confDir="${XDG_CONFIG_HOME:-$HOME/.config}"
logoDir="${confDir}/fastfetch/logo"

# Ensure directory exists
mkdir -p "$logoDir"

# Find a random image or text file
chosen_logo_path=$(find -L "$logoDir" -maxdepth 1 -type f \
  \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.gif" -o -iname "*.webp" -o -iname "*.bmp" -o -iname "*.txt" \) \
  2>/dev/null | shuf -n 1)

# If no logo is found in the folder, just run standard fastfetch
if [ -z "$chosen_logo_path" ]; then
  exec fastfetch
fi

extension="${chosen_logo_path##*.}"
# Convert extension to lowercase for safety
extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

# Execute fastfetch directly, injecting the random logo
if [[ "$extension" == "txt" ]]; then
  exec fastfetch --logo-type file --logo "$chosen_logo_path"
else
  exec fastfetch --logo-type kitty --logo "$chosen_logo_path"
fi
