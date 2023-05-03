// Skapar egen state-hantering
const state = {
    currentPage: window.location.pathname,
    apiSettings: {
        key: "cf4dff71f2576af5f9aeb62372d8bb09",
        baseUrl: "https://api.themoviedb.org/3/",
    },
};

const listPopularMovies = async () => {
    // Anropar min metod fetchData() och skickar in korrekt endpoint
    const { results } = await fetchData("movie/popular");

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
    // Måste ha tag i Movie-id med. location.serach som tar frågesträngen
    // därefter splitta frågesträngen och använder endast andra delen av splittningen
    const movieId = window.location.search.split("=")[1];

    // Anropar min metod fetchData() och skickar in korrekt endpoint
    const movie = await fetchData(`movie/${movieId}`);

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

// Skapar en separat funktion för att hämta datat från API
const fetchData = async (endpoint) => {
    const API_KEY = state.apiSettings.key;
    const API_URL = state.apiSettings.baseUrl;

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=sv-SE`);

    const data = await response.json();
    return data;
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
