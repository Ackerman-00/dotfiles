# Dotfiles

| Component | Path |
|---|---|
| [MangoWM](config/mango/README.md) | `config/mango/` |
| Niri | `config/niri/` |
| Kitty | `config/kitty/` |
| Starship | `config/starship/` |
| Noctalia | `config/noctalia/` |
| Fastfetch | `config/fastfetch/` |
| Umbriel | `config/umbriel/` |

## Umbriel Config

This config is set up for my specific monitor. You need to change the output settings to match your hardware.

Run these to find your monitor info:

```
umbriel outputs
```

Look for your monitor's name and mode in the output. Then edit `config/umbriel/core.toml` and update the `[output]` section with your own monitor name and resolution/refresh rate.
