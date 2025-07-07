async function fetchNowPlaying() {
  try {
    const response = await fetch("https://spotify-now-playing-api.onrender.com/now-playing");
    const data = await response.json();

    const container = document.getElementById("spotify-now-playing");
    container.innerHTML = "";

    // ✅ Updated field names
    if (data.error || !data.isPlaying) {
      container.innerHTML = `<p>Not playing anything right now 🎧</p>`;
      return;
    }

    const html = `
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

    container.innerHTML = html;
  } catch (error) {
    console.error("🚨 Error fetching now playing data:", error);
    document.getElementById("spotify-now-playing").innerHTML = `<p>Unable to load Spotify data. 🛑</p>`;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchNowPlaying();
  setInterval(fetchNowPlaying, 5000);
});

