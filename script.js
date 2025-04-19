// Функция воспроизведения
function playTrack(audioUrl) {
  const player = document.querySelector(".player");
  player.style.transform = "translateY(0)";
  const audio = new Audio(audioUrl);
  audio.play();
  // Здесь можно добавить логику для обновления информации в плеере
}

// Обработчик клика по карточке
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const audioUrl = card.getAttribute("data-audio");
    if (audioUrl) {
      playTrack(audioUrl);
    }
  });
});

// Табы
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelector('.tab.active').classList.remove('active');
    tab.classList.add('active');
  });
});
