# --- ZSH CONFIGURATION START ---

unsetopt nomatch

export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME=""

plugins=(
    git sudo zsh-autosuggestions zsh-syntax-highlighting
    history-substring-search z web-search extract fzf colored-man-pages
)
source "$ZSH/oh-my-zsh.sh"

# --- ENVIRONMENT VARIABLES ---
export EDITOR="code"
export PATH="$PATH:$HOME/.local/bin"
export XDG_DATA_DIRS="$XDG_DATA_DIRS:/var/lib/flatpak/exports/share:$HOME/.local/share/flatpak/exports/share"

# --- HISTORY SETTINGS ---
HISTFILE=~/.zsh_history
HISTSIZE=100000
SAVEHIST=100000
setopt APPEND_HISTORY SHARE_HISTORY HIST_IGNORE_DUPS HIST_IGNORE_SPACE HIST_REDUCE_BLANKS INC_APPEND_HISTORY

# --- ALIASES ---
alias c='clear'
alias l='eza -lh --icons=auto'
alias ls='eza -1 --icons=auto'
alias ll='eza -lha --icons=auto --sort=name --group-directories-first'
alias ld='eza -lhD --icons=auto'
alias lt='eza --icons=auto --tree'
alias vc='code'
alias cdconf='cd ~/.config'
alias cleancache='rm -rf ~/.zcompdump* ~/.cache/p10k-instant-prompt* ~/.cache/fastfetch'

alias ..='cd ..'
alias ...='cd ../..'
alias .3='cd ../../..'
alias .4='cd ../../../..'
alias mkdir='mkdir -p'

# --- STARTUP SCRIPTS ---
if [[ $- == *i* && -z "$_FASTFETCH_INITIAL_RUN" ]]; then
    clear
    if [[ -x ~/.local/bin/fastfetch.sh ]]; then
        ~/.local/bin/fastfetch.sh
    elif command -v fastfetch >/dev/null; then
        fastfetch
    fi
    typeset -g _FASTFETCH_INITIAL_RUN=1
fi

eval "$(starship init zsh)"

# --- ZSH CONFIGURATION END ---


