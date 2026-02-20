const API_KEY = "f42514c3733d0e3a5ec73da5be9a3374";
const BASE_URL = "https://api.themoviedb.org/3/movie/top_rated";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

const moviesContainer = document.getElementById("movies");
const form = document.getElementById("form");
const search = document.getElementById("search");
const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");

  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
});

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.results.length > 0) {
        showMovies(data.results);
      } else {
        moviesContainer.innerHTML = '<h2 class="no-results">No movies found. Try something else!</h2>';
      }
    })
    .catch((err) => console.error(err));
}

let debounceTimer;

function showMovies(movies) {
  moviesContainer.innerHTML = movies
    .map(
      (movie) => `
            <div class="card">
                <img src="${IMG_PATH}${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <span>${movie.vote_average.toFixed(1)}</span>
            </div>
        `,
    )
    .join("");
}

search.addEventListener("input", (e) => {
  const searchTerm = e.target.value;

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    if (searchTerm && searchTerm.trim() !== "") {
      getMovies(`${SEARCH_URL}?api_key=${API_KEY}&query=${searchTerm}`);
    } else {
      getMovies(`${BASE_URL}?api_key=${API_KEY}`);
    }
  }, 500);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
  getMovies(`${BASE_URL}?api_key=${API_KEY}`);
});
