# Nxr's Website

Personal portfolio and blog built with [Hugo](https://gohugo.io/) using the [gokarna-hugo](https://github.com/gokarna-theme/gokarna-hugo) theme.

## Requirements

- **Hugo Extended** (v0.112+ recommended) — the standard `hugo` binary will *not* work with this theme; you need the extended/SCSS-enabled build.
- Git

## Quick Start

```bash
# 1. Clone with submodules (theme lives in themes/gokarna-hugo)
git clone --recurse-submodules <repo-url>
cd Nxrs_website

# If you already cloned without --recurse-submodules:
git submodule update --init --recursive

# 2. Start the dev server
hugo server -D

# 3. Build for production (output goes to public/)
hugo --minify
```

## Day-to-Day

| Task | Command |
|------|---------|
| Dev server (drafts included) | `hugo server -D` |
| Dev server (no drafts) | `hugo server` |
| Production build | `hugo --minify` |
| New post | `hugo new content posts/my-post.md` |

## Known Issues / TODO

- [ ] **Broken: Spotify now-playing widget** — `static/js/now-playing.js` is an HTML fragment mistakenly saved as `.js`, so it throws `SyntaxError: Unexpected token '<'` and never loads. Needs to be rewritten as actual JS or removed.
- [ ] **Dark mode toggle is inconsistent** — the theme's `.dark-theme-toggle` and the homepage's `prefers-color-scheme` handling don't always agree; sometimes the toggle state doesn't persist on reload.
- [ ] **Tag casing is inconsistent** — some posts use `"obsidian"`, others `"Obsidian"`. Results in duplicate tag pages. Normalize to lowercase.
- [ ] **`hugo.toml` deprecation warning** — `languageCode` key is flagged on every build; safe to ignore for now but should migrate to the newer site config keys.

## Project Structure

```
Nxrs_website/
├── hugo.toml           # Site config (title, baseURL, menus, params)
├── content/            # Markdown content (posts/, projects/, about/)
├── themes/
│   └── gokarna-hugo/   # Theme submodule — do NOT edit directly
├── static/             # Static assets copied as-is to the site root
├── public/             # Build output (generated; gitignored)
└── README.md
```

> **Note:** `themes/gokarna-hugo` is a git submodule. If `themes/gokarna-hugo/` is empty after cloning, run `git submodule update --init --recursive`. If `public/` doesn't exist, run `hugo --minify` first.
