const movieImg = document.querySelector(".movie-img");
const movieTitle = document.querySelector(".movie-name");
const movieDescription = document.querySelector(".movie-description");
const watchProviders = document.querySelector(".watch-providers");
const watchProvidersContainer = document.querySelector(".watch-providers-container")
const body = document.querySelector("body");

const apiKey = `7163d507a975c5833a02e7ea696637bd`;
const imgLink = "https://image.tmdb.org/t/p/";

const maxNumber = 19;
const minNumber = 10;
const randomNumber = Math.floor(
  Math.random() * (1 + maxNumber - minNumber) + minNumber
);
console.log(randomNumber);

async function randomMovie() {
  movieList = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&append_to_response=watch/providers`;

  const fetchMovie = await fetch(movieList);
  const movies = await fetchMovie.json();

  movieTitle.innerText = movies.results[randomNumber].original_title;
  movieDescription.innerText = movies.results[randomNumber].overview;
  movieImg.setAttribute(
    "src",
    `${imgLink}w300/${movies.results[randomNumber].poster_path}`
  );
  const fetchProvidersList = await fetch(
    `https://api.themoviedb.org/3/movie/${randomNumber}}/watch/providers?api_key=${apiKey}`
  );
  try { const providersList = await fetchProvidersList.json();
  watchProviders.setAttribute(
    "src",
    `${imgLink}original${providersList.results.BR.flatrate[0].logo_path}`
  ); }
  catch (error) {
    const erro = document.createElement('p')
    erro.innerText = "Não conseguimos encontrar esse filme =("
    watchProvidersContainer.appendChild(erro)
  }
}
randomMovie();
