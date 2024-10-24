// Inicializa AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true
});

// Gerenciador do Player de Áudio
const AudioPlayer = {
  audio: document.getElementById("bgMusic"),
  playPauseBtn: document.getElementById("playPauseBtn"),
  volumeSlider: document.getElementById("volumeSlider"),
  volumeIcon: document.querySelector(".volume-icon"),
  isPlaying: false,

  init() {
      this.setupEventListeners();
      this.setInitialVolume();
      this.tryAutoPlay();
  },

  setInitialVolume() {
      this.audio.volume = 0.05;
      this.volumeSlider.value = 5; // 5%
      this.updateVolumeIcon(0.05);
  },

  setupEventListeners() {
      this.volumeSlider.addEventListener("input", (e) => {
          const volume = e.target.value / 100;
          this.audio.volume = volume;
          this.updateVolumeIcon(volume);
      });

      this.audio.addEventListener('ended', () => {
          this.isPlaying = false;
          this.updatePlayButton();
      });
  },

  updateVolumeIcon(volume) {
      const mutedIcon = '<path d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"/>';
      const volumeOnIcon = '<path d="M3,9V15H7L12,20V4L7,9H3Z M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16.02C15.5,15.29 16.5,13.77 16.5,12Z M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.71V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23Z"/>';
      
      this.volumeIcon.innerHTML = volume === 0 ? mutedIcon : volumeOnIcon;
  },

  tryAutoPlay() {
      try {
          const playPromise = this.audio.play();
          if (playPromise !== undefined) {
              playPromise
                  .then(() => {
                      this.isPlaying = true;
                      this.updatePlayButton();
                  })
                  .catch(() => {
                      this.isPlaying = false;
                      this.updatePlayButton();
                      console.log("Autoplay foi bloqueado pelo navegador");
                  });
          }
      } catch (e) {
          this.isPlaying = false;
          this.updatePlayButton();
          console.error("Erro ao tentar reproduzir áudio:", e);
      }
  },

  togglePlay() {
      if (this.isPlaying) {
          this.audio.pause();
      } else {
          this.audio.play();
      }
      this.isPlaying = !this.isPlaying;
      this.updatePlayButton();
  },

  updatePlayButton() {
      const playIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
      const pauseIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
      
      this.playPauseBtn.innerHTML = this.isPlaying ? pauseIcon : playIcon;
  }
};

// Gerenciador do Menu Mobile
const MobileMenu = {
  init() {
      this.setupMenuToggle();
  },

  setupMenuToggle() {
      const menuButton = document.querySelector('.menu-mobile');
      const navLinks = document.querySelector('.nav-links');

      if (menuButton) {
          menuButton.addEventListener('click', () => {
              navLinks.classList.toggle('active');
          });

          // Fecha o menu ao clicar em um link
          const links = navLinks.querySelectorAll('a');
          links.forEach(link => {
              link.addEventListener('click', () => {
                  navLinks.classList.remove('active');
              });
          });

          // Fecha o menu ao rolar a página
          window.addEventListener('scroll', () => {
              if (navLinks.classList.contains('active')) {
                  navLinks.classList.remove('active');
              }
          });
      }
  }
};

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  AudioPlayer.init();
  MobileMenu.init();
});

// Expõe a função togglePlay globalmente para o onclick do HTML
window.togglePlay = () => AudioPlayer.togglePlay();