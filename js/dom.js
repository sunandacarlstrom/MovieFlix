// Skapar en separat funktion för att visa alla filmer
const displayMovies = (element, movies) => {
    //Skapar utseendet på startsidan
    movies.forEach((movie) => {
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
        document.querySelector(element).appendChild(section);
    });
};

// Skapar en separat funktion för att visa detaljer om respektive film
const displayMovieDetails = (element, movie) => {
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
    document.querySelector(element).appendChild(section);
};

// Skapar en separat funktion för att hämta bild och placera i bakgrunden
const displayBackgroundImage = (element, backgroundPath) => {
    // Skapar en något transparent bakgrundsbild
    const overlayDiv = document.createElement("div");
    overlayDiv.classList.add("background-image");

    document.querySelector("#movie-details").appendChild(overlayDiv);

    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backgroundPath})`;

    //Placerar dynamiskt innehåll på sidan under id 'movie-details'
    document.querySelector(element).appendChild(overlayDiv);
};