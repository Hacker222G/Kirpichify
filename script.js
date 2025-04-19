// Анимация карусели
document.querySelector('.carousel').addEventListener('wheel', (e) => {
  e.preventDefault();
  const carousel = e.target;
  carousel.scrollLeft += e.deltaY;
});

// Воспроизведение
function playTrack(audioUrl) {
  const audio = new Audio(audioUrl);
  audio.play();
}

// Обработчик карточек
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const audioUrl = card.getAttribute('data-audio');
    if (audioUrl) {
      playTrack(audioUrl);
    }
  });
});
