async function fetchNowPlaying() {
  try {
    const response = await fetch("https://spotify-now-playing-api.onrender.com/now-playing");
    const data = await response.json();

    const container = document.getElementById("spotify-now-playing");

    // Clear the container each time
    container.innerHTML = "";

    if (data.error || !data.is_playing) {
      container.innerHTML = `<p>Not playing anything right now 🎧</p>`;
      return;
    }

    const html = `
      <div class="now-playing-label">🎶 Currently Listening To
      <span class="equalizer">
    <span></span><span></span><span></span><span></span><span></span>
  </span></div>
      <div class="spotify-card">
        <img src="${data.album_image_url}" alt="Album Art" class="album-art" />
        <div class="track-info">
          <p><strong>${data.title}</strong></p>
          <p>${data.artist}</p>
          <a href="${data.song_url}" target="_blank">Listen on Spotify</a>
        </div>
      </div>
    `;

    container.innerHTML = html;
  } catch (error) {
    console.error("🚨 Error fetching now playing data:", error);
    document.getElementById("spotify-now-playing").innerHTML = `<p>Unable to load Spotify data. 🛑</p>`;
  }
}

// Run on page load and every 15 seconds
window.addEventListener("DOMContentLoaded", () => {
  fetchNowPlaying();
  setInterval(fetchNowPlaying, 5000); // every 15 sec
});

