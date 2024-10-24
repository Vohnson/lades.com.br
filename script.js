  AOS.init({
    duration: 1000,
    once: true,
  });


  const audio = document.getElementById("bgMusic");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  let isPlaying = false;

  // Define o volume inicial
  audio.volume = 0.05;

  // Controle de volume
  volumeSlider.addEventListener("input", function () {
    audio.volume = this.value / 100;

    // Atualiza o ícone do volume baseado no valor
    const volumeIcon = document.querySelector(".volume-icon");
    if (this.value === 0) {
      volumeIcon.innerHTML =
        '<path d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"/>';
    } else {
      volumeIcon.innerHTML =
        '<path d="M3,9V15H7L12,20V4L7,9H3Z M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16.02C15.5,15.29 16.5,13.77 16.5,12Z M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.71V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23Z"/>';
    }
  });

  // Tenta iniciar a música automaticamente
  document.addEventListener("DOMContentLoaded", () => {
    try {
      audio
        .play()
        .then(() => {
          isPlaying = true;
          updatePlayButton();
        })
        .catch(() => {
          isPlaying = false;
          updatePlayButton();
        });
    } catch (e) {
      isPlaying = false;
      updatePlayButton();
    }
  });

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    isPlaying = !isPlaying;
    updatePlayButton();
  }

  function updatePlayButton() {
    playPauseBtn.innerHTML = isPlaying
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  }