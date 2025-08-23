<div id="spotify-now-playing"></div>

<script>
let lastTrackId = null; // remember the last song played

function renderWidgetSkeleton() {
  const container = document.getElementById("spotify-now-playing");

  if (!document.getElementById("now-playing-widget")) {
    container.innerHTML = `
      <div id="now-playing-widget" class="anime-theme">
        <div class="np-album-art-wrap">
          <img class="album-art" src="" alt="Album Art">
        </div>
        <div class="np-info">
          <div class="song-title"></div>
          <div class="artist"></div>
          <div class="album-name"></div>
          <a class="spotify-btn" href="#" target="_blank" rel="noopener">
            <img src="/svg/icons/spotify.svg" alt="Spotify"> Listen with me
          </a>
        </div>
      </div>
    `;
  }
}

async function fetchNowPlaying() {
  const container = document.getElementById("spotify-now-playing");
  renderWidgetSkeleton();

  try {
    const response = await fetch("https://spotify-now-playing-api-92zi-5x23umk7h-nxrnoobs-projects.vercel.app/now-playing", {
      method: "GET",
      headers: { "Accept": "application/json" },
      cache: "no-store"
    });

    const data = await response.json();
    const widget = document.getElementById("now-playing-widget");

    if (data.error || !data.isPlaying) {
      // reset state if nothing is playing
      lastTrackId = null;
      widget.querySelector(".song-title").textContent = "Not playing anything 🎧";
      widget.querySelector(".artist").textContent = "";
      widget.querySelector(".album-name").textContent = "";
      widget.querySelector(".album-art").src = "";
      widget.querySelector(".spotify-btn").style.display = "none";
    } else {
      // use songUrl as unique track identifier (or combine title+artist)
      const currentTrackId = data.songUrl || (data.title + "|" + data.artist);

      if (currentTrackId !== lastTrackId) {
        console.log("🎵 Track changed:", data.title, "-", data.artist);

        widget.querySelector(".song-title").textContent = data.title;
        widget.querySelector(".artist").textContent = data.artist;
        widget.querySelector(".album-name").textContent = data.album || "";
        widget.querySelector(".album-art").src = data.albumImageUrl;
        widget.querySelector(".spotify-btn").href = data.songUrl;
        widget.querySelector(".spotify-btn").style.display = "inline-flex";

        // update tracker
        lastTrackId = currentTrackId;
      } else {
        console.log("⏸️ Same track, no DOM update");
      }
    }
  } catch (error) {
    console.error("🚨 Error fetching now playing data:", error);
    container.innerHTML = `<p>Unable to load Spotify data. 🛑</p>`;
  } finally {
    // 🔁 continue polling every 5s
    setTimeout(fetchNowPlaying, 5000);
  }
}

// 🔥 Start loop
fetchNowPlaying();
</script>