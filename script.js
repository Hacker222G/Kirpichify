// Данные артистов
const artists = [
  {
    id: 1,
    name: "Kasane Teto",
    bio: "Виртуальная АНИМЕ ЖЕНШИНА Вокалоид с красными волосами"
  },
  {
    id: 2,
    name: "Hatsune Miku",
    bio: "Виртуальная АНИМЕ ЖЕНШИНА Вокалоид c синими волосами"
  }
];

// Данные треков (с artistId)
const tracks = [
  {
    id: 1,
    name: "Tetoris",
    artistId: 1,
    cover: "https://i.ytimg.com/vi/Hl67rz3_NL4/maxresdefault.jpg",
    audio: "https://raw.githubusercontent.com/Hacker222G/Kirpichify/refs/heads/main/music/%E6%9F%8A%E3%83%9E%E3%82%B0%E3%83%8D%E3%82%BF%E3%82%A4%E3%83%88%20-%20%E3%83%86%E3%83%88%E3%83%AA%E3%82%B9.mp3"
  },
  {
    id: 2,
    name: "Трек 2",
    artistId: 2,
    cover: "https://via.placeholder.com/150",
    audio: "https://via.placeholder.com/150/audio.mp3"
  }
];

let currentTrackIndex = 0;
let audio = new Audio();

// Элементы плеера
let trackName;
let artistName;
let albumCover;
let volumeSlider;

// Роутинг через хэши
function handleRoute() {
  const hash = window.location.hash.slice(1) || "/";

  // Очистка контента
  const content = document.querySelector(".content");
  content.innerHTML = "";

  // Отображение страниц
  if (hash === "/") {
    renderHome();
    setActiveLink("#/");
  } else if (hash === "/artists") {
    renderArtists();
    setActiveLink("#/artists");
  } else if (hash.startsWith("/artist/")) {
    const artistId = parseInt(hash.split("/")[2]);
    renderArtist(artistId);
    setActiveLink("#/artists");
  }
}

// Установка активной ссылки
function setActiveLink(href) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.href.includes(href)) {
      link.classList.add("active");
    }
  });
}

// Страница «Главная»
function renderHome() {
  const content = document.querySelector(".content");
  content.innerHTML = `
    <div class="home">
      <div class="sidebar">
        <h2>Треки</h2>
        <div class="track-list"></div>
      </div>
      <div class="player">
        <div class="player-controls">
          <button class="prev-btn">&#10094;</button>
          <button class="play-btn">▶</button>
          <button class="next-btn">&#10095;</button>
        </div>
        <div class="track-info">
          <img src="" alt="Альбом" class="album-cover">
          <div>
            <h3 class="track-name"></h3>
            <p class="artist-name"></p>
          </div>
        </div>
        <input type="range" min="0" max="100" value="0" class="volume-slider">
      </div>
    </div>
  `;

  // Обновляем ссылки на элементы плеера
  trackName = document.querySelector(".track-name");
  artistName = document.querySelector(".artist-name");
  albumCover = document.querySelector(".album-cover");
  volumeSlider = document.querySelector(".volume-slider");

  // Перерисовываем треки
  const trackList = document.querySelector(".track-list");
  renderTracks(trackList);
}

// Страница «Артисты»
function renderArtists() {
  const content = document.querySelector(".content");
  content.innerHTML = `
    <div class="artists-list">
      <h2>Все артисты</h2>
      <div class="artist-cards"></div>
    </div>
  `;

  const artistCards = document.querySelector(".artist-cards");
  artists.forEach(artist => {
    const card = document.createElement("div");
    card.className = "artist-card";
    card.innerHTML = `
      <img src="https://via.placeholder.com/150" alt="${artist.name}">
      <h3>${artist.name}</h3>
      <button class="view-btn">Просмотреть</button>
    `;
    card.querySelector(".view-btn").addEventListener("click", () => {
      window.location.hash = `/artist/${artist.id}`;
    });
    artistCards.appendChild(card);
  });
}

// Страница артиста
function renderArtist(artistId) {
  const artist = artists.find(a => a.id === artistId);
  const content = document.querySelector(".content");
  content.innerHTML = `
    <div class="artist-page">
      <img src="https://via.placeholder.com/300" alt="${artist.name}">
      <h2>${artist.name}</h2>
      <p>${artist.bio}</p>
      <h3>Треки:</h3>
      <div class="track-list"></div>
      <button class="back-btn">&#8592; Назад</button>
    </div>
  `;

  // Треки артиста
  const trackList = content.querySelector(".track-list");
  const artistTracks = tracks.filter(t => t.artistId === artistId);
  renderTracks(trackList, artistTracks);

  // Кнопка «Назад»
  content.querySelector(".back-btn").addEventListener("click", () => {
    window.location.hash = "/artists";
  });
}

// Функция отображения треков с пагинацией
let currentPage = 1;
const tracksPerPage = 3;

function renderTracks(container, tracksList = tracks) {
  container.innerHTML = "";
  const startIndex = (currentPage - 1) * tracksPerPage;
  const endIndex = startIndex + tracksPerPage;

  tracksList.slice(startIndex, endIndex).forEach(track => {
    const item = document.createElement("div");
    item.className = "track-item";
    item.textContent = track.name;
    item.addEventListener("click", () => selectTrack(track));
    container.appendChild(item);
  });

  // Пагинация
  const pagination = document.createElement("div");
  pagination.className = "pagination";
  const totalPages = Math.ceil(tracksList.length / tracksPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("span");
    pageLink.textContent = i;
    pageLink.className = i === currentPage ? "active" : "";
    pageLink.addEventListener("click", () => {
      currentPage = i;
      renderTracks(container, tracksList);
    });
    pagination.appendChild(pageLink);
  }

  container.appendChild(pagination);
}

// Функция выбора трека
function selectTrack(track) {
  currentTrackIndex = tracks.findIndex(t => t.id === track.id);
  updateTrackInfo();
  play();
}

// Функция обновления информации о треке
function updateTrackInfo() {
  const track = tracks[currentTrackIndex];
  trackName.textContent = track.name;
  artistName.textContent = artists.find(a => a.id === track.artistId).name;
  albumCover.src = track.cover;
}

// Функция воспроизведения
function play() {
  const track = tracks[currentTrackIndex];
  audio.src = track.audio;
  audio.play();
}

// События кнопок плеера
document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.querySelector(".play-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  prevBtn.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    updateTrackInfo();
    play();
  });

  nextBtn.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    updateTrackInfo();
    play();
  });

  // Громкость
  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value / 100;
  });
});

// Поиск
document.querySelector(".search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filteredTracks = tracks.filter(track => 
    track.name.toLowerCase().includes(query) || 
    track.artistId.toString().includes(query)
  );
  renderTracks(document.querySelector(".track-list"), filteredTracks);
});

// Обработчик хэша
window.addEventListener("hashchange", handleRoute);
handleRoute(); // Инициализация
