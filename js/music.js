const musicElement = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicVolume = document.getElementById("musicVolume");
const musicStatus = document.getElementById("musicStatus");
const musicStateKey = "birthday-music-playing";
const musicTimeKey = "birthday-music-time";

const setControlState = (isPlaying) => {
  if (!musicToggle) {
    return;
  }

  musicToggle.textContent = isPlaying ? "❚❚" : "▶";
  musicToggle.setAttribute("aria-label", isPlaying ? "Pause background music" : "Play background music");
  musicToggle.setAttribute("title", isPlaying ? "Pause background music" : "Play background music");
  if (musicStatus) {
    musicStatus.textContent = isPlaying ? "Background music playing." : "Background music paused.";
  }
};

const persistPlaybackTime = () => {
  if (!musicElement || Number.isNaN(musicElement.currentTime)) {
    return;
  }

  sessionStorage.setItem(musicTimeKey, String(musicElement.currentTime));
};

const attemptAutoplay = async () => {
  if (!musicElement) {
    return;
  }

  try {
    await musicElement.play();
    localStorage.setItem(musicStateKey, "playing");
    setControlState(true);
  } catch {
    setControlState(false);
  }
};

if (musicElement) {
  const savedVolume = Number(localStorage.getItem("birthday-music-volume") || "0.5");
  const savedTime = Number(sessionStorage.getItem(musicTimeKey) || "0");
  const savedState = localStorage.getItem(musicStateKey) || "playing";

  musicElement.volume = savedVolume;
  musicElement.preload = "auto";

  if (musicVolume) {
    musicVolume.value = String(savedVolume);
  }

  if (savedTime > 0) {
    musicElement.currentTime = savedTime;
  }

  musicElement.addEventListener("canplay", () => {
    if (savedState === "playing") {
      void attemptAutoplay();
    }
  });

  musicElement.addEventListener("error", () => {
    setControlState(false);
    if (musicStatus) {
      musicStatus.textContent = "Background music failed to load.";
    }
  });

  musicElement.addEventListener("play", () => {
    localStorage.setItem(musicStateKey, "playing");
    setControlState(true);
  });

  musicElement.addEventListener("pause", () => {
    localStorage.setItem(musicStateKey, "paused");
    persistPlaybackTime();
    setControlState(false);
  });

  musicElement.addEventListener("timeupdate", persistPlaybackTime);

  window.addEventListener("beforeunload", persistPlaybackTime);

  if (savedState === "playing") {
    void attemptAutoplay();
  } else {
    setControlState(false);
  }

  document.addEventListener(
    "pointerdown",
    () => {
      if (localStorage.getItem(musicStateKey) !== "paused" && musicElement.paused) {
        void attemptAutoplay();
      }
    },
    { once: true }
  );
}

musicToggle?.addEventListener("click", async () => {
  if (!musicElement) {
    return;
  }

  if (musicElement.paused) {
    await attemptAutoplay();
  } else {
    musicElement.pause();
  }
});

musicVolume?.addEventListener("input", () => {
  if (!musicElement) {
    return;
  }

  const volume = Number(musicVolume.value);
  musicElement.volume = volume;
  localStorage.setItem("birthday-music-volume", String(volume));
});