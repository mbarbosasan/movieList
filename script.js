const movieImg = document.querySelector(".movie-img");
const movieTitle = document.querySelector(".movie-name");
const movieDescription = document.querySelector(".movie-description");
const watchProviders = document.querySelector(".watch-providers");
const watchProvidersContainer = document.querySelector(
  ".watch-providers-container"
);
const nextMovie = document.querySelector(".next-movie");

const apiKey = API_KEY;
const imgLink = "https://image.tmdb.org/t/p/";

async function randomMovie() {
  const maxNumber = 19;
  const minNumber = 10;
  const randomNumber = Math.floor(
    Math.random() * (1 + maxNumber - minNumber) + minNumber
  );

   try { movieList = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&append_to_response=watch/providers`;
  const fetchMovie = await fetch(movieList);
  const movies = await fetchMovie.json();

  movieTitle.innerText = movies.results[randomNumber].original_title;
  movieDescription.innerText = movies.results[randomNumber].overview;
  movieImg.setAttribute(
    "src",
    `${imgLink}w300/${movies.results[randomNumber].poster_path}`
  ); }
  catch (error) {
    console.log(error);
  }

  try {
    const fetchProvidersList = await fetch(
      `https://api.themoviedb.org/3/movie/${randomNumber}}/watch/providers?api_key=${apiKey}`
    );
    const providersList = await fetchProvidersList.json();
    const streamList = await providersList.results.BR.flatrate;
    streamList.forEach((item) => {
      const imgStreaming = document.createElement("img");
      watchProviders.appendChild(imgStreaming);
      imgStreaming.setAttribute("src", `${imgLink}original${item.logo_path}`);
      // imgStreaming.setAttribute('href', `https://www.google.com/search?q=(${item.provider_name.replace(' ', '+')})`)
    });
  } catch (error) {
    const erro = document.createElement("p");
    erro.innerText = "Não conseguimos encontrar esse filme =(";
    watchProviders.appendChild(erro);
  }
}

nextMovie.addEventListener("click", () => {
  window.location.reload();
});

randomMovie();
