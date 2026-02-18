const API_KEY = "f42514c3733d0e3a5ec73da5be9a3374";
const BASE_URL = "https://api.themoviedb.org/3/movie/top_rated";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

const moviesContainer = document.getElementById("movies");

function getMovies() {
  fetch(`${BASE_URL}?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      moviesContainer.innerHTML = data.results
        .map(
          (movie) => `
                <div class="card">
                    <img src="${IMG_PATH}${movie.poster_path}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <span>${movie.vote_average.toFixed(1)}</span>
                </div>
            `,
        ).join("");
    })
    .catch((err) => console.error(err));
}

document.addEventListener("DOMContentLoaded", getMovies);
