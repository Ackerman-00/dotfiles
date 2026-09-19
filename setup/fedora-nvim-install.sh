#!/usr/bin/env bash
# ============================================================================
# Fedora Neovim + LazyVim Full Install Script
# Replicates: https://github.com/Ackerman-00/nix-config/blob/main/home.nix
# ============================================================================
set -Eeuo pipefail
IFS=$'\n\t'

BOLD="\033[1m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
NC="\033[0m"

info()  { printf '%s[INFO]%s %s\n'  "$GREEN" "$NC" "$*"; }
warn()  { printf '%s[WARN]%s %s\n'  "$YELLOW" "$NC" "$*"; }
error() { printf '%s[ERROR]%s %s\n' "$RED" "$NC" "$*" >&2; exit 1; }

command_exists() { command -v "$1" &>/dev/null; }

# Cleanup trap for temp files
TEMP_DIR=""
cleanup() {
    local rc=$?
    if [[ -n "$TEMP_DIR" && -d "$TEMP_DIR" ]]; then
        rm -rf "$TEMP_DIR"
    fi
    if (( rc != 0 )); then
        printf '\n%s[WARN] Script failed at line %s with exit code %s%s\n' \
            "$YELLOW" "$NC" "${BASH_LINENO[0]}" "$rc" >&2
    fi
}
trap cleanup EXIT
trap 'error "Interrupted by user"' INT TERM

# ============================================================================
# 1. SYSTEM DEPENDENCIES
# ============================================================================
info "Installing system dependencies..."
# NOTE: 'rustup'/'cargo' intentionally NOT from dnf — Fedora's rustup RPM only
# ships 'rustup-init' (no 'rustup' binary). Rust comes via rustup.rs below.
sudo dnf install -y \
    git curl wget unzip tar xz gcc gcc-c++ make cmake \
    nodejs npm \
    python3 python3-pip \
    ripgrep fd-find fzf \
    libstdc++-static \
    || warn "Some dnf packages may not be available — continuing"

# lazygit is NOT in official Fedora repos (only via COPR) — best effort
if ! command_exists lazygit; then
    sudo dnf install -y lazygit 2>/dev/null \
        || warn "lazygit not in official repos — install via 'sudo dnf copr enable dejan/lazygit && sudo dnf install lazygit' if you want Space+gg"
fi

# Ensure ~/.local/bin exists and is in PATH
mkdir -p "$HOME/.local/bin"
export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"

# Persist PATH for future shells
if ! grep -q '.local/bin' "$HOME/.bashrc" 2>/dev/null; then
    echo 'export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"' >> "$HOME/.bashrc"
fi
if [[ -f "$HOME/.zshrc" ]] && ! grep -q '.local/bin' "$HOME/.zshrc" 2>/dev/null; then
    echo 'export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"' >> "$HOME/.zshrc"
fi

# ============================================================================
# 2. COPR REPO + NEOVIM + LAZYVIM
# ============================================================================
info "Enabling COPR repo (ackerman/nexus)..."
if ! sudo dnf copr enable -y ackerman/nexus 2>/dev/null; then
    warn "COPR repo may already be enabled — continuing"
fi

info "Installing neovim and lazyvim-git..."
if ! sudo dnf install -y neovim lazyvim-git 2>/dev/null; then
    warn "COPR install failed — falling back to official neovim release..."
    TEMP_DIR=$(mktemp -d)
    curl -sL "https://github.com/neovim/neovim/releases/latest/download/nvim-linux-x86_64.tar.gz" \
        -o "$TEMP_DIR/nvim-linux-x86_64.tar.gz"
    sudo rm -rf /opt/nvim
    sudo tar -C /opt -xzf "$TEMP_DIR/nvim-linux-x86_64.tar.gz"
    sudo ln -sf /opt/nvim-linux-x86_64/bin/nvim /usr/local/bin/nvim
    info "Official neovim installed to /usr/local/bin/nvim"
fi

# ============================================================================
# 3. RUST TOOLCHAIN + RUST-ANALYZER
# ============================================================================
if ! command_exists rustup; then
    info "Installing rustup (official installer)..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --profile minimal --default-toolchain stable
fi
# shellcheck source=/dev/null
if [[ -f "$HOME/.cargo/env" ]]; then
    # shellcheck source=/dev/null
    source "$HOME/.cargo/env"
fi
export PATH="$HOME/.cargo/bin:$PATH"

info "Installing rust-analyzer via rustup..."
if ! rustup component add rust-analyzer 2>/dev/null; then
    warn "rust-analyzer install had issues — run: rustup component add rust-analyzer"
fi

# ============================================================================
# 4. STYLUA (Lua formatter)
# ============================================================================
if ! command_exists stylua; then
    info "Installing stylua via cargo..."
    cargo install stylua
fi

# ============================================================================
# 5. MARKSMAN (Markdown LSP)
# ============================================================================
if ! command_exists marksman; then
    info "Installing marksman 2026-02-08..."
    curl -sL "https://github.com/artempyanykh/marksman/releases/download/2026-02-08/marksman-linux-x64" \
        -o "$HOME/.local/bin/marksman"
    chmod +x "$HOME/.local/bin/marksman"
fi

# ============================================================================
# 6. LUA-LANGUAGE-SERVER (Lua LSP)
# ============================================================================
if ! command_exists lua-language-server; then
    info "Installing lua-language-server 3.19.1..."
    # Extract to share/ (NOT bin/) — bin/lua-language-server would collide
    # with the symlink we create below. Symlink method is WSL-tested upstream.
    LUA_LSP_DIR="$HOME/.local/share/lua-language-server"
    mkdir -p "$LUA_LSP_DIR"
    curl -sL "https://github.com/LuaLS/lua-language-server/releases/download/3.19.1/lua-language-server-3.19.1-linux-x64.tar.gz" \
        | tar -xz -C "$LUA_LSP_DIR"
    ln -sf "$LUA_LSP_DIR/bin/lua-language-server" "$HOME/.local/bin/lua-language-server"
fi

# ============================================================================
# 7. ZLS (Zig Language Server)
# ============================================================================
if ! command_exists zls; then
    info "Installing zls 0.16.0..."
    ZLS_TMP=$(mktemp -d)
    curl -sL "https://github.com/zigtools/zls/releases/download/0.16.0/zls-x86_64-linux.tar.xz" \
        | tar -xJ -C "$ZLS_TMP"
    mv "$ZLS_TMP/zls" "$HOME/.local/bin/zls"
    chmod +x "$HOME/.local/bin/zls"
    rm -rf "$ZLS_TMP"
fi

# ============================================================================
# 8. NPM GLOBAL PACKAGES (formatters + LSPs)
# ============================================================================
info "Installing npm global packages..."
# NOTE: 'typescript' is a required peer of typescript-language-server (upstream README).
# '@fsouza/prettierd' is what conform.nvim tries first (stop_after_first fallback to prettier).
NPM_PKGS=(prettier @fsouza/prettierd typescript typescript-language-server vscode-langservers-extracted markdownlint-cli2)
if ! sudo npm install -g "${NPM_PKGS[@]}" 2>/dev/null; then
    warn "Global npm install failed — trying user-local..."
    npm config set prefix "$HOME/.local"
    npm install -g "${NPM_PKGS[@]}"
fi

# Python formatter used by conform.nvim (python = { "black" })
if ! command_exists black; then
    info "Installing black via pip..."
    pip3 install --user black || warn "black install failed — python formatting will fall back to LSP"
fi

# ============================================================================
# 9. NEOVIM CONFIG — LazyVim Starter
# ============================================================================
NVIM_CONFIG="$HOME/.config/nvim"

if [[ -d "$NVIM_CONFIG" ]]; then
    warn "Existing nvim config found — backing up to ${NVIM_CONFIG}.bak.$(date +%s)"
    mv "$NVIM_CONFIG" "${NVIM_CONFIG}.bak.$(date +%s)"
fi

# Clear stale LazyVim state on re-runs (official docs recommend moving these too)
for d in "$HOME/.local/share/nvim" "$HOME/.local/state/nvim" "$HOME/.cache/nvim"; do
    if [[ -d "$d" ]]; then
        warn "Moving stale $d to $d.bak.$(date +%s)"
        mv "$d" "$d.bak.$(date +%s)"
    fi
done

info "Cloning LazyVim starter..."
git clone https://github.com/LazyVim/starter "$NVIM_CONFIG"
rm -rf "$NVIM_CONFIG/.git"

# ============================================================================
# 10. WRITE CONFIG FILES
# ============================================================================

# --- config/lazy.lua ---
info "Writing config/lazy.lua..."
mkdir -p "$NVIM_CONFIG/lua/config"
cat > "$NVIM_CONFIG/lua/config/lazy.lua" << 'LUAEOF'
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local lazyrepo = "https://github.com/folke/lazy.nvim.git"
  local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
  if vim.v.shell_error ~= 0 then
    vim.api.nvim_echo({
      { "Failed to clone lazy.nvim:\n", "ErrorMsg" },
      { out, "WarningMsg" },
      { "\nPress any key to exit..." },
    }, true, {})
    vim.fn.getchar()
    os.exit(1)
  end
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({
  spec = {
    { "LazyVim/LazyVim", import = "lazyvim.plugins" },
    -- extras MUST come before { import = "plugins" }
    { import = "lazyvim.plugins.extras.lang.rust" },
    { import = "lazyvim.plugins.extras.lang.json" },
    { import = "lazyvim.plugins.extras.lang.typescript" },
    { import = "lazyvim.plugins.extras.lang.python" },
    { import = "lazyvim.plugins.extras.lang.markdown" },
    { import = "lazyvim.plugins.extras.lang.yaml" },
    { import = "lazyvim.plugins.extras.lang.toml" },
    { import = "lazyvim.plugins.extras.lang.sql" },
    { import = "lazyvim.plugins.extras.lang.clangd" },
    { import = "lazyvim.plugins.extras.coding.mini-surround" },
    { import = "lazyvim.plugins.extras.editor.refactoring" },
    { import = "lazyvim.plugins.extras.editor.aerial" },
    -- your own plugins last
    { import = "plugins" },
  },
  defaults = {
    lazy = false,
    version = false,
  },
  install = { colorscheme = { "tokyonight" } },
  checker = {
    enabled = true,
    notify = false,
  },
  performance = {
    rtp = {
      disabled_plugins = {
        "gzip",
        "tarPlugin",
        "tohtml",
        "tutor",
        "zipPlugin",
      },
    },
  },
})
LUAEOF

# --- config/options.lua ---
info "Writing config/options.lua..."
cat > "$NVIM_CONFIG/lua/config/options.lua" << 'LUAEOF'
-- Options are automatically loaded before lazy.nvim startup
-- Default options that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/options.lua
-- Add any additional options here

vim.opt.number = true
vim.opt.relativenumber = false
LUAEOF

# --- plugins/home-nix.lua ---
info "Writing plugins/home-nix.lua..."
mkdir -p "$NVIM_CONFIG/lua/plugins"
cat > "$NVIM_CONFIG/lua/plugins/home-nix.lua" << 'LUAEOF'
-- Replicated from home.nix: https://github.com/Ackerman-00/nix-config/blob/main/home.nix
-- Only includes custom plugin specs (extras are in config/lazy.lua)

return {
  -- Disable Mason (mason disabled, use system-installed servers)
  { "mason-org/mason.nvim", enabled = false },
  { "mason-org/mason-lspconfig.nvim", enabled = false },

  -- Disable markdownlint (causes errors, prettier handles markdown)
  {
    "mfussenegger/nvim-lint",
    opts = {
      linters_by_ft = {
        markdown = {},
      },
    },
  },

  -- rustaceanvim (Rust extra doesn't include this)
  {
    "mrcjkb/rustaceanvim",
    ft = { "rust" },
    opts = {
      server = {
        default_settings = {
          ["rust-analyzer"] = {
            checkOnSave = { command = "clippy" },
            inlayHints = {
              chainingHints = { enable = true },
              typeHints = { enable = true },
              parameterHints = { enable = true },
            },
          },
        },
      },
      tools = {
        hover_actions = { replace_builtin_hover = true },
      },
    },
  },

  -- crates.nvim for Cargo.toml support
  {
    "saecki/crates.nvim",
    ft = "toml",
    dependencies = { "nvim-lua/plenary.nvim" },
    event = "BufRead Cargo.toml",
    opts = {
      completion = {
        crates = { enabled = true },
      },
      lsp = {
        enabled = true,
        actions = true,
        completion = true,
        hover = true,
      },
    },
  },

  -- conform.nvim formatting
  {
    "stevearc/conform.nvim",
    opts = {
      formatters_by_ft = {
        lua = { "stylua" },
        rust = { "rustfmt", lsp_format = "fallback" },
        javascript = { "prettierd", "prettier", stop_after_first = true },
        typescript = { "prettierd", "prettier", stop_after_first = true },
        javascriptreact = { "prettierd", "prettier", stop_after_first = true },
        typescriptreact = { "prettierd", "prettier", stop_after_first = true },
        css = { "prettierd", "prettier", stop_after_first = true },
        html = { "prettierd", "prettier", stop_after_first = true },
        json = { "prettierd", "prettier", stop_after_first = true },
        yaml = { "prettierd", "prettier", stop_after_first = true },
        markdown = { "prettierd", "prettier", stop_after_first = true },
        graphql = { "prettierd", "prettier", stop_after_first = true },
        sql = { "sqlfmt" },
        toml = { "taplo" },
        python = { "black" },
      },
      format_on_save = { timeout_ms = 500, lsp_format = "fallback" },
    },
  },

  -- LSP config (mason disabled, only system servers)
  {
    "neovim/nvim-lspconfig",
    opts = {
      servers = {
        rust_analyzer = false, -- rustaceanvim handles this
        marksman = {},
        lua_ls = {
          settings = {
            Lua = {
              runtime = { version = "LuaJIT" },
              workspace = { checkThirdParty = false },
              telemetry = { enable = false },
              diagnostics = { globals = { "vim" } },
            },
          },
        },
        ts_ls = {},
        zls = {},
      },
    },
  },

  -- aerial.nvim (code outline / symbols)
  {
    "stevearc/aerial.nvim",
    event = "User LazyVimStarted",
    opts = {
      backends = { "lsp", "treesitter", "markdown" },
      layout = { min_width = 30 },
      attach_mode = "global",
      filter_kind = false,
      icons = {},
      on_attach = function(bufnr)
        vim.keymap.set("n", "{", "<cmd>AerialPrev<CR>", { buffer = bufnr, desc = "Previous symbol" })
        vim.keymap.set("n", "}", "<cmd>AerialNext<CR>", { buffer = bufnr, desc = "Next symbol" })
      end,
    },
    keys = {
      { "<leader>cs", "<cmd>AerialToggle!<cr>", desc = "Aerial (Symbols)" },
      { "<leader>sS", "<cmd>Telescope aerial<cr>", desc = "Search Symbols (Aerial)" },
    },
  },

  -- blink.cmp (completion)
  {
    "saghen/blink.cmp",
    opts = {
      sources = {
        default = { "lsp", "path", "snippets", "buffer", "lazydev" },
        providers = {
          lazydev = { name = "LazyDev", module = "lazydev.builtin.sources" },
        },
      },
    },
  },

  -- lspconfig lazydev for Lua
  {
    "neovim/nvim-lspconfig",
    opts = {
      servers = {
        lua_ls = {
          on_init = function()
            local lazydev_config = vim.lsp.config("*") or {}
            lazydev_config.settings = lazydev_config.settings or {}
            lazydev_config.settings.Lua = lazydev_config.settings.Lua or {}
            lazydev_config.settings.Lua.library = vim.tbl_get(
              lazydev_config.settings.Lua, "library"
            ) or {}
            local paths = { "$4th[/runtime/lua/vim/lsp/]", "$4th[/runtime/lua/vim/shared/]" }
            for _, p in ipairs(paths) do
              table.insert(lazydev_config.settings.Lua.library, p)
            end
          end,
        },
      },
    },
  },

  -- nvim-ts-autotag
  {
    "windwp/nvim-ts-autotag",
    event = "InsertEnter",
    opts = {},
  },

  -- ts-comments.nvim
  {
    "folke/ts-comments.nvim",
    opts = {},
    event = "BufReadPost",
  },

  -- Treesitter grammars (matching home.nix)
  {
    "nvim-treesitter/nvim-treesitter",
    opts = {
      ensure_installed = {
        "bash", "c", "cpp", "css", "dart", "html", "java", "javascript",
        "json", "lua", "markdown", "markdown_inline", "python", "rust",
        "sql", "toml", "tsx", "typescript", "vim", "vimdoc", "yaml", "zig",
      },
    },
  },
}
LUAEOF

# Remove the starter example plugin
rm -f "$NVIM_CONFIG/lua/plugins/example.lua"

# ============================================================================
# 11. INITIAL PLUGIN INSTALL (headless)
# ============================================================================
# NOTE: the bang in "+Lazy! sync" makes lazy.nvim WAIT until sync finishes
# (official lazy.nvim docs). Without it nvim exits early with half-installed plugins.
info "Installing LazyVim plugins (headless, may take a few minutes)..."
nvim --headless "+Lazy! sync" +qa 2>/dev/null || warn "Plugin install had issues — run :Lazy sync in nvim"

# Treesitter parsers install from 'ensure_installed' on first launch.
# New nvim-treesitter (main branch) removed TSUpdateSync; update is async with
# a Lua wait() API. Best-effort sync here, non-fatal either way.
info "Installing Treesitter grammars (best effort)..."
nvim --headless -c "lua pcall(function() require('nvim-treesitter').update():wait(300000) end)" +qa 2>/dev/null \
    || warn "TS install had issues — run :TSUpdate in nvim"

# ============================================================================
# DONE
# ============================================================================
PLUGIN_COUNT=$(find "$HOME/.local/share/nvim/lazy" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l)

echo ""
echo -e "${BOLD}${GREEN}============================================${NC}"
echo -e "${BOLD}${GREEN}  INSTALL COMPLETE${NC}"
echo -e "${BOLD}${GREEN}============================================${NC}"
echo ""
echo -e "  Neovim:    $(nvim --version 2>/dev/null | head -1 || echo 'not found')"
echo -e "  LazyVim:   starter config at $NVIM_CONFIG"
echo -e "  Plugins:   ${PLUGIN_COUNT} installed"
echo ""
echo -e "  ${BOLD}LSP servers:${NC}"
echo -e "    rust-analyzer     $(rust-analyzer --version 2>/dev/null || echo 'not found')"
echo -e "    marksman          $(marksman --version 2>/dev/null || echo 'not found')"
echo -e "    lua-language-server $(lua-language-server --version 2>/dev/null || echo 'not found')"
echo -e "    zls               $(zls --version 2>/dev/null || echo 'not found')"
echo -e "    ts_ls             (via npm: typescript-language-server)"
echo ""
echo -e "  ${BOLD}Formatters:${NC}"
echo -e "    prettier          $(prettier --version 2>/dev/null || echo 'not found')"
echo -e "    stylua            $(stylua --version 2>/dev/null || echo 'not found')"
echo -e "    rustfmt           $(rustfmt --version 2>/dev/null || echo 'not found')"
echo ""
echo -e "  ${BOLD}Run:${NC} nvim"
echo -e "  ${BOLD}Keybinds:${NC}"
echo -e "    Space+e        File tree"
echo -e "    Space+ff       Find files"
echo -e "    Space+sg       Grep/search"
echo -e "    Space+gg       Lazygit"
echo -e "    Space+cs       Code outline (aerial)"
echo -e "    gd             Go to definition"
echo -e "    Space+cR       Rust code actions"
echo ""
