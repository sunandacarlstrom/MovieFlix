import { createHTMLElement, createHTMLElementImage } from "./element-helper.js";

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
    return link;
};

const displayCardBody = (movie) => {
    const cardBody = createHTMLElement("div", "card-body");

    const title = createHTMLElement("h5", "card-title", movie.title);
    cardBody.appendChild(title);

    const cardDetails = createHTMLElement("p", "card-text");
    cardBody.appendChild(cardDetails);

    const small = createHTMLElement("small", "text-muted", `Premiär datum: ${movie.release_date}`);
    cardDetails.appendChild(small);

    return cardBody;
};

// Skapar en separat funktion för att visa detaljer om respektive film
const displayMovieDetails = (element, movie) => {
    // Skapar utseendet på sidan
    const top = createHTMLElement("section", "details-top");

    const bottom = createHTMLElement("section", "details-bottom");

    const img = createHTMLElementImage("card-img-top", movie.poster_path, movie.title);
    top.appendChild(img);

    const title = createHTMLElement("h2", "", movie.title);
    bottom.appendChild(title);

    const ratingText = createHTMLElement("p", "", ` ${movie.vote_average.toFixed(1)} / 10`);
    const ratingIcon = createHTMLElement("i", "fas fa-star rating");
    const rating = createHTMLElement("div", "rating-container");

    rating.appendChild(ratingIcon);
    rating.appendChild(ratingText);
    bottom.appendChild(rating);

    const release = createHTMLElement("p", "text-muted", `Premiär ${movie.release_date}`);
    bottom.appendChild(release);

    const description = createHTMLElement("p", "", `${movie.overview}`);
    bottom.appendChild(description);

    const genre = createHTMLElement("h5", "", "Genre");
    bottom.appendChild(genre);

    const ul = createHTMLElement("ul");
    movie.genres.forEach(function (genre) {
        const li = createHTMLElement("li", "", `${genre.name}`);
        ul.appendChild(li);
    });

    bottom.appendChild(ul);

    //Placerar dynamiskt innehåll på sidan under id 'movie-details'
    const section = document.querySelector(element);
    section.appendChild(top);
    section.appendChild(bottom);
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
