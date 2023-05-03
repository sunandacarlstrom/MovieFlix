// Skapar egen state-hantering
const state = {
    currentPage: window.location.pathname,
};

const listPopularMovies = async () => {
    const url = "https://api.themoviedb.org/3/movie/popular";
    const api_key = "cf4dff71f2576af5f9aeb62372d8bb09";

    // Hämtar datat från API
    const response = await fetch(`${url}?api_key=${api_key}&language=sv-SE`);
    const { results } = await response.json();
    // console.log(results);

    //Skapar utseendet på startsidan
    results.forEach((movie) => {
        const section = document.createElement("section");
        section.classList.add("card");

        section.innerHTML = `
        <a href="/movie-details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"/>
        </a>
        <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
                <small class="text-muted">Premiär datum: ${movie.release_date}</small>
            </p>
        </div>
        `;

        //Placerar dynamiskt innehåll på sidan under id 'top-movies'
        document.querySelector("#top-movies").appendChild(section);
    });
};

//Skapar undersidan 'movie-details'
const showMovieDetails = async () => {
    const url = "https://api.themoviedb.org/3/movie";
    const api_key = "cf4dff71f2576af5f9aeb62372d8bb09";

    // Måste ha tag i Movie-id med. location.serach som tar frågesträngen
    // därefter splitta frågesträngen och använder endast andra delen av splittningen
    const movieId = window.location.search.split("=")[1];

    // Hämtar datat från API
    const response = await fetch(`${url}/${movieId}?api_key=${api_key}&language=sv-SE`);
    const movie = await response.json();
    // console.log(movie);

    //Skapar en något transparent bakgrundsbild
    const overlayDiv = document.createElement("div");
    overlayDiv.classList.add("background-image");

    document.querySelector("#movie-details").appendChild(overlayDiv);

    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;

    // Skapar utseendet på sidan
    const section = document.createElement("section");
    section.innerHTML = `
    <section class="details-top">
        <div>${
            movie.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top" alt"${movie.title}" />`
                : `<img src="../assets/images/no-image.jpg"
                    class="card-img-top" alt="${movie.title}" />`
        }
        </div>
        <section>
            <h2>${movie.title}</h2>
            <p>
            <i class="fas fa-star rating"></i>
            ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Premiär ${movie.release_date}</p>
            <p>${movie.overview}</p>
            <h5>Genre</h5>
            <ul>
            ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
        </section>
    </section>
    `;

    //Placerar dynamiskt innehåll på sidan under id 'movie-details'
    document.querySelector("#movie-details").appendChild(section);
};

// Skapar routing hantering
const init = () => {
    switch (state.currentPage) {
        // fångar upp resultat med olika fall i mitt switch-uttryck
        case "/":
        case "/index.html":
            listPopularMovies();
            break;
        case "/movie-details.html":
            showMovieDetails();
            break;
    }
};

// Skapar händelse-hantering när DOM är laddad
document.addEventListener("DOMContentLoaded", init);
