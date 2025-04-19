// Глобальные переменные
let currentTrackIndex = 0;
const audio = new Audio();
const tracks = [
  {
    id: 1,
    name: "TETORIS",
    artist: "Kasane Teto",
    cover: "https://raw.githubusercontent.com/Hacker222G/Kirpichify/main/covers/tetoris.png",
    audio: "https://raw.githubusercontent.com/Hacker222G/Kirpichify/refs/heads/main/music/%E6%9F%8A%E3%83%9E%E3%82%B0%E3%83%8D%E3%82%BF%E3%82%A4%E3%83%88%20-%20%E3%83%86%E3%83%88%E3%83%AA%E3%82%B9.mp3"
  },
  // ... остальные треки ...
];

// Инициализация
function init() {
  renderPlayer();
  updateProgress();
}

// Отображение информации о треке
function renderPlayer() {
  const track = tracks[currentTrackIndex];
  document.querySelector('.cover').src = track.cover;
  document.querySelector('.track-name').textContent = track.name;
  document.querySelector('.artist-name').textContent = track.artist;
  audio.src = track.audio;
}

// Обновление прогресса
function updateProgress() {
  const progressSlider = document.querySelector('.progress-slider');
  progressSlider.value = Math.floor(audio.currentTime / audio.duration * 100);
  document.querySelector('.time').textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
  requestAnimationFrame(updateProgress);
}

// Форматирование времени
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Переключение треков
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  renderPlayer();
  audio.play();
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  renderPlayer();
  audio.play();
}

// Обработчики событий
document.querySelector('.play-btn').addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

document.querySelector('.next-btn').addEventListener('click', nextTrack);
document.querySelector('.prev-btn').addEventListener('click', prevTrack);

document.querySelector('.progress-slider').addEventListener('input', (e) => {
  const value = e.target.value;
  audio.currentTime = (value / 100) * audio.duration;
});

// Загрузка треков
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const trackId = card.getAttribute('data-audio');
    currentTrackIndex = tracks.findIndex(track => track.audio === trackId);
    renderPlayer();
    audio.play();
  });
});

// Инициализация
init();
