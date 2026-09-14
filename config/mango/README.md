# MangoWM Config

Personal config for [MangoWM](https://mangowm.github.io/) — wlroots-based Wayland compositor.

## Screenshots

Keybinds:
- `Print` — full screen
- `Super+Shift+S` — region select

### How it works

1. `grim` captures the screen (with `slurp` for region) → saves to a temp file
2. `wl-copy` copies to the Wayland clipboard (native Wayland apps)
3. `xclip` copies to the X11 clipboard (XWayland apps like rootapp)
4. `swappy` opens the editor for annotations

### Why both clipboards?

XWayland apps (e.g. rootapp, Electron apps, WPS Office) can only read the **X11 clipboard**. `wl-copy` alone puts data only on the Wayland clipboard — invisible to XWayland. KDE/GNOME bridge these automatically; wlroots compositors don't. Writing to both clipboards ensures paste works everywhere.

### Dependencies

| Package | Purpose |
|---|---|
| `grim` | Screenshot capture (wlroots) |
| `slurp` | Region selection |
| `wl-clipboard` | Wayland clipboard (`wl-copy`/`wl-paste`) |
| `swappy` | Screenshot editor/annotator |
| `xclip` | X11 clipboard bridge for XWayland |

#### Install by distro

| Distro | Command |
|---|---|
| **Arch** | `sudo pacman -S grim slurp wl-clipboard swappy xclip` |
| **Fedora** | `sudo dnf install grim slurp wl-clipboard swappy xclip` |
| **Debian/Ubuntu** | `sudo apt install grim slurp wl-clipboard swappy xclip` |
| **NixOS** | Already included in system packages |
| **openSUSE** | `sudo zypper install grim slurp wl-clipboard swappy xclip` |

> Note: `swappy` may not be in older Debian/Ubuntu repos — build from [source](https://github.com/jtheoof/swappy).

## Shell

If you use NixOS, scripts must use `#!/usr/bin/env bash` (not `#!/bin/bash`) — NixOS has no `/bin/bash`.

## Extras

- [caelestia-shell-mango](https://github.com/Ackerman-00/caelestia-shell-mango.git) — Caelestia shell integration


