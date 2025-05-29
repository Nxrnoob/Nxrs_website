async function fetchNowPlaying() {
  try {
    const response = await fetch("https://spotify-now-playing-api.onrender.com/now-playing");
    const data = await response.json();

    const container = document.getElementById("spotify-now-playing");

    if (data.error || !data.is_playing) {
      container.innerHTML = `<p>Not listening anything right now 🎧</p>`;
      return;
    }

    const html = `
      <h3 class="now-playing-heading">Currently listening to 🎶</h3>
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

// Run immediately
window.addEventListener("DOMContentLoaded", () => {
  fetchNowPlaying();
  setInterval(fetchNowPlaying, 5000); // 🔁 fetch every 15 seconds
});

