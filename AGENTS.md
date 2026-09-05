# AGENTS.md

## Project Overview

Personal website for Nxrnoob (Subash), built with **Hugo** (v0.165+) using the **gokarna-hugo** theme as a git submodule. The site is a portfolio/blog hybrid with custom widgets (Spotify now-playing, anime quotes, Lain clock, sakura petal animation). Deployed statically; no CI/CD pipeline configured in-repo.

## Essential Commands

```bash
# Build static site to public/
hugo --gc --minify

# Local dev server with live reload
hugo server -D

# Initialize/update theme submodule (required after fresh clone)
git submodule update --init --recursive
```

**Critical**: The theme submodule at `themes/gokarna-hugo/` may be empty after cloning. Always run `git submodule update --init --recursive` before building. Hugo will fail silently or produce missing-template warnings without it.

## Architecture

### Content Structure

- `content/posts/` — Blog posts. Front matter requires `type = "post"` for homepage listing.
- `content/projects/` — Project pages. Use `type = "page"`. Listed via custom `layouts/projects/list.html`.
- `content/_index.md` — Homepage body content (rendered in left column below avatar).

### Layout Overrides

Custom layouts in `layouts/` override the gokarna theme:

| File | Purpose |
|------|---------|
| `layouts/index.html` | Custom two-column homepage (about + posts/socials/widgets) |
| `layouts/partials/head.html` | Injects CSS vars, custom stylesheets, JS bundles |
| `layouts/partials/header.html` | Nav bar with Lain clock widget |
| `layouts/partials/footer.html` | Copyright footer |
| `layouts/projects/list.html` | Projects listing page |
| `layouts/_default/list.html` | Generic list template (posts by year) |

### Static Assets

All custom JS/CSS lives in `static/` and is loaded directly (not through Hugo pipes):

| File | Purpose |
|------|---------|
| `js/now-playing.js` | Spotify widget, polls external Vercel API every 5s |
| `js/anime-quotes.js` | Fetches random anime quote every 35s from yurippe API |
| `js/lain-clock.js` | Real-time clock widget in header |
| `js/pitch-black-darkmode.js` | Adds `darkmode-active` class to body when dark theme is on |
| `js/sakura.js` | Falling petal animation (also loaded via CDN in index.html) |
| `css/custom-homepage.css` | Two-column homepage layout, responsive breakpoints |
| `css/now-playing.css` | Spotify widget styling |
| `css/anime-quotes.css` | Quote box styling |
| `css/lain-clock.css` | Clock widget styling |
| `css/sakura.css` | Petal animation styles |

### External Dependencies

- **Spotify Now Playing API**: `https://spotify-now-playing-api-92zi-5x23umk7h-nxrnoobs-projects.vercel.app/now-playing`
- **Anime Quotes API**: `https://yurippe.vercel.app/api/quotes?random=1`
- **Sakura JS CDN**: Loaded in `layouts/index.html` via jsdelivr
- **Cbox Chat Widget**: Embedded iframe in homepage right column

## Conventions & Gotchas

### Front Matter

Posts must include `type = "post"` in TOML front matter to appear on the homepage. Projects use `type = "page"`. Tags are lowercase arrays.

### Accent Color

The site accent color (`#cc00ff`) is set in `hugo.toml` as `accentColor` and injected as a CSS variable `--accent-color` via `layouts/partials/head.html`. Border colors in `custom-homepage.css` are hardcoded to `#cc00ff` and won't auto-update if the config changes.

### Dark Mode

Dark mode uses the gokarna theme's toggle plus `pitch-black-darkmode.js` which adds/removes `darkmode-active` on `<body>`. Custom CSS overrides in `custom-homepage.css` use `@media (prefers-color-scheme: dark)` and also set `--dark-primary-color` / `--dark-secondary-color` to pure black.

### JS Loading Order

`head.html` loads theme JS bundle (via Hugo pipes) first, then `pitch-black-darkmode.js` and `lain-clock.js` with `defer`. Homepage-specific scripts (`now-playing.js`, `anime-quotes.js`) are loaded at the bottom of `layouts/index.html`. Do not move these to `head.html` without verifying they don't depend on DOM elements only present on the homepage.

### Hugo Warnings

- `languageCode` in `hugo.toml` is deprecated (use `locale` instead). Non-blocking but noisy.
- Missing layout warning for `"html"` kind `"page"` is expected for some content types and non-blocking.

### Theme Submodule

The gokarna-hugo theme is a git submodule, not vendored. After any theme update, test the build since custom layouts override theme templates and may break on upstream changes.

### No Build Tooling

No package.json, Makefile, or task runner. All builds are plain `hugo` commands. No linting, formatting, or test infrastructure exists.

### Images

Images referenced in content markdown use relative paths (`images/hello.png`) resolved against `static/`. Avatar is configured in `hugo.toml` as `avatarURL = "/images/avatar.jpg"` pointing to `static/images/avatar.jpg`. There is also an `images/` directory at root level containing `avatar.webp` and `hello.png` which are separate from `static/images/`.

## Owner's Anime Taste (for theming / copy ideas)

When the owner asks for an "anime touch" on UI, draw suggestions from this watchlist. The site's existing anime language: Serial Experiments Lain (Lain clock widget), sakura petals, anime quotes widget, purple `#cc00ff` accent.

**Series:** Death Note, Code Geass, Darling in the Franxx, Chainsaw Man, Jujutsu Kaisen, My Dress-Up Darling (S2 remaining), Alya Sometimes Hides Her Feelings in Russian, Solo Leveling, Dandadan (S2 remaining), Naruto (unfinished), Attack on Titan, The Dangers in My Heart, Golden Time, ReLIFE, Re:Zero (waiting for new season), Rascal Does Not Dream of Bunny Girl Senpai, Violet Evergarden, Monster, Serial Experiments Lain, Kowloon Generic Romance, Neon Genesis Evangelion, Just Because!, Toradora!, Cyberpunk: Edgerunners, Erased, Cowboy Bebop, Terror in Resonance, Tokyo Ghoul, Horimiya.

**Movies:** Your Name, Weathering with You, Jujutsu Kaisen 0, Violet Evergarden: The Movie, Rascal Does Not Dream of a Dreaming Girl, The End of Evangelion, Maquia: When the Promised Flower Blooms.

