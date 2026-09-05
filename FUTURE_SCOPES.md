# Future Scopes / Roadmap

Ideas and improvements planned for later — not urgent, but worth tracking.

---

## 1. Self-Hosted Now-Playing API

**Status:** Planned (deferred)

Right now the Spotify "now playing" widget depends on an external API
(`spotify-now-playing-api-...vercel.app`) that we don't control. If it
goes down, changes its CORS policy, or rate-limits us, the widget breaks
through no fault of our own.

**The plan:** Build our own tiny serverless endpoint (Vercel function or
Cloudflare Worker) that:

1. Accepts a Spotify OAuth token (refreshed server-side)
2. Polls `GET /v1/me/player/currently-playing` on the Spotify API
3. Returns a clean, minimal JSON payload:

```json
{
  "isPlaying": true,
  "title": "Track Name",
  "artist": "Artist Name",
  "albumArt": "https://...",
  "songUrl": "https://open.spotify.com/track/..."
}
```

**Why bother?**

- No third-party downtime or policy changes can break the widget
- We control caching, rate limits, and response shape
- One less external dependency = fewer points of failure

**Estimated effort:** ~2-3 hours (OAuth token refresh logic + a Vercel
edge function + a client-side fetch rewrite).

---

## 2. Lyrics Fetching

**Status:** Idea (not started)

Fetch synced lyrics (LRC format) for the current track and display them
alongside the widget, karaoke-style. Would require:

- A lyrics API (lrclib.net is free and has synced lyrics)
- A `<div>` with timestamp-synced line highlighting
- Parsing `.lrc` timestamps `[mm:ss.xx]`

---

## 3. Multi-User Support

**Status:** Idea (very far future)

Currently the widget assumes a single Spotify account. Supporting
multiple users would require per-user OAuth token storage and a
session/cookie layer. Probably overkill for a personal site, but
documented here in case the site ever grows beyond one person.

---

## 4. Offline / PWA Support

**Status:** Idea (not started)

Add a service worker + manifest so the site can be "installed" and the
widget can show cached track data while offline. Low priority since the
widget is meaningless without network access to Spotify anyway.
