<div id="spotify-now-playing"></div>

<script>
async function fetchNowPlaying() {
  const container = document.getElementById("spotify-now-playing");

  // Show loading state immediately
  container.innerHTML = `<p>🎶 Fetching now playing...</p>`;

  const start = Date.now();
  console.log("⏱ Fetch started:", new Date(start).toLocaleTimeString());

  try {
    const response = await fetch("https://spotify-now-playing-api-92zi-5x23umk7h-nxrnoobs-projects.vercel.app/now-playing", {
      method: "GET",
      headers: { "Accept": "application/json" },
      cache: "no-store"  // avoid stale/cached results
    });

    const mid = Date.now();
    console.log("✅ Response received in", (mid - start) / 1000, "seconds");

    const data = await response.json();
    const end = Date.now();
    console.log("📦 JSON parsed in", (end - mid) / 1000, "seconds");

    // Clear container for new data
    container.innerHTML = "";

    if (data.error || !data.isPlaying) {
      container.innerHTML = `<p>Not playing anything right now 🎧</p>`;
      return;
    }

    // Build widget HTML
    container.innerHTML = `
      <div id="now-playing-widget" class="anime-theme">
        <div class="np-album-art-wrap">
          <img class="album-art" src="${data.albumImageUrl}" alt="Album Art">
        </div>
        <div class="np-info">
          <div class="song-title">${data.title}</div>
          <div class="artist">${data.artist}</div>
          <div class="album-name">${data.album || ''}</div>
          <a class="spotify-btn" href="${data.songUrl}" target="_blank" rel="noopener">
            <img src="/svg/icons/spotify.svg" alt="Spotify"> Listen with me
          </a>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("🚨 Error fetching now playing data:", error);
    container.innerHTML = `<p>Unable to load Spotify data. 🛑</p>`;
  }
}

// 🔥 Run immediately when script loads
fetchNowPlaying();

// ⏳ Refresh every 5s
setInterval(fetchNowPlaying, 5000);
</script>