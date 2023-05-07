// Hanterar visningen av presentationen med olika element

// Skapar en separat funktion för att visa alla filmer
const displayMovies = (element, movies) => {
    //Skapar utseendet på startsidan
    movies.forEach((movie) => {
        const section = document.createElement("section");
        section.classList.add("card");

        //Placerar dynamiskt innehåll på sidan under id 'top-movies'
        section.appendChild(displayCardImage(movie));
        section.appendChild(displayCardBody(movie));

        document.querySelector(element).appendChild(section);
    });
};

const displayCardImage = (movie) => {
    const link = document.createElement("a");
    link.href = `/movie-details.html?id=${movie.id}`;

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = movie.title;

    link.appendChild(img);
    return link
}

const displayCardBody = (movie) => {
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardBody.appendChild(cardTitle);

    const cardTitleText = document.createTextNode(movie.title);
    cardTitle.appendChild(cardTitleText);
    
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardBody.appendChild(cardText);

    const small = document.createElement("small");
    small.classList.add("text-muted");
    const smallText = document.createTextNode(`Premiär datum: ${movie.release_date}`);
    small.appendChild(smallText);
    cardText.appendChild(small);

    return cardBody;
}

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

// Namngiven export eftersom det finns flera funktioner i denna fil
export { displayMovies, displayMovieDetails, displayBackgroundImage };
