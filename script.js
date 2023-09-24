const video = document.querySelector('video');
const progressBar = document.querySelector('.progress-bar');
const volumeRange = document.querySelector('input[type="range"]');
const playPauseBtn = document.querySelector('.play-pause');
const volumeBtn = document.querySelector('.volume');
const videoDuration = document.querySelector('.video-duration');
const skipBackwardBtn = document.querySelector('.skip-backward');
const skipForwardBtn = document.querySelector('.skip-forward');
const playBtn = document.querySelector('.play-btn');
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const container = document.querySelector('.container');
const videoTimeline = document.querySelector('.video-timeline');

// Функция форматирования времени в формат "мм:сс"
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Обработчик клика по кнопке воспроизведения/паузы
playBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playBtn.style.opacity = '0';
    playBtn.style.cursor = 'auto';
  } else {
    video.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    playBtn.style.opacity = '1';
    playBtn.style.cursor = 'pointer';
  }
});

// Обработчик перемотки бара
videoTimeline.addEventListener('click', e => {
  const timelineWidth = videoTimeline.clientWidth;
  let offsetX = e.offsetX;
  offsetX = offsetX < 20 ? 20 : offsetX > timelineWidth - 20 ? timelineWidth - 20 : offsetX;
  const percent = (offsetX / timelineWidth) * 100;

  
  // Расчет времени на основе процента перемотки
  const currentTime = (video.duration * percent) / 100;
  video.currentTime = currentTime;
});

// Отслеживание прогресса видео и обновление прогресс-бара
video.addEventListener('timeupdate', () => {
  const currentTime = video.currentTime;
  const duration = video.duration;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Обновление текущего времени видео
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  document.querySelector('.current-time').textContent = `${formatTime(currentMinutes)}:${formatTime(currentSeconds)}`;
});

// Отслеживание изменения длительности видео
video.addEventListener('loadedmetadata', () => {
  const duration = video.duration;

  // Обновление длительности видео
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration % 60);
  videoDuration.textContent = `${formatTime(durationMinutes)}:${formatTime(durationSeconds)}`;
});


// Обработчик клика по кнопке воспроизведения/паузы
playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playBtn.style.opacity = '0';
    playBtn.style.cursor = 'auto';
  } else {
    video.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    playBtn.style.opacity = '1';
    playBtn.style.cursor = 'pointer';
  }
});

// Обработчик клика по кнопке управления звуком
volumeBtn.addEventListener('click', () => {
  if (video.muted) {
    video.muted = false;
    volumeBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  } else {
    video.muted = true;
    volumeBtn.innerHTML = '<i class="fa-solid fa-volume-mute"></i>';
  }
});

// Обработчик изменения громкости
volumeRange.addEventListener('input', () => {
  video.volume = volumeRange.value;
});
const volumeInput = document.querySelector('.volume-input');

volumeInput.addEventListener('input', function() {
  const value = (this.value - this.min) / (this.max - this.min);
  
  this.style.background = `linear-gradient(to right, #0078FF 0%, #0078FF ${value * 100}%, #c8c8c8 ${value * 100}%, #c8c8c8 100%)`;
});
// Обработчик клика по кнопке "skip-backward"
skipBackwardBtn.addEventListener('click', () => {
    video.currentTime -= 10;
  });
  
  // Обработчик клика по кнопке "skip-forward"
  skipForwardBtn.addEventListener('click', () => {
    video.currentTime += 10;
  });
  // нажатии в области видео
  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      playBtn.style.opacity = '0';
      playBtn.style.cursor = 'auto';
    } else {
      video.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      playBtn.style.opacity = '1';
      playBtn.style.cursor = 'pointer';
    }
  });
  //заход в полный экран
  fullscreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement) {
        return document.exitFullscreen();
    }
    container.requestFullscreen();
});
// если видео закончится появляется значок паузы
video.addEventListener('ended', () => {
    playBtn.style.opacity = '1';
    playBtn.style.cursor = 'pointer';
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  });