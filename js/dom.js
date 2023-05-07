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
};

// Skapar en separat funktion för att visa detaljer om respektive film
const displayMovieDetails = (element, movie) => {
    // Skapar utseendet på sidan
    const top = document.createElement("section");
    top.classList.add("details-top");

    const bottom = document.createElement("section");
    bottom.classList.add("details-bottom");

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `../assets/images/No-Image.jpg`;
    img.alt = movie.title;
    top.appendChild(img);

    const title = document.createElement("h2");
    const titleText = document.createTextNode(`${movie.title}`);
    title.appendChild(titleText);
    bottom.appendChild(title);

    const rating = document.createElement("p");
    const ratingIcon = document.createElement("i");
    ratingIcon.classList.add("fas");
    ratingIcon.classList.add("fa-star");
    ratingIcon.classList.add("rating");
    const ratingText = document.createTextNode(` ${movie.vote_average.toFixed(1)} / 10`);
    rating.appendChild(ratingIcon);
    rating.appendChild(ratingText);
    bottom.appendChild(rating);

    const release = document.createElement("p");
    release.classList.add("text-muted");
    const releaseText = document.createTextNode(`Premiär ${movie.release_date}`);
    release.appendChild(releaseText);
    bottom.appendChild(release);

    const description = document.createElement("p");
    const descriptionText = document.createTextNode(`${movie.overview}`);
    description.appendChild(descriptionText);
    bottom.appendChild(description);

    const genre = document.createElement("h5");
    const genreText = document.createTextNode("Genre");
    genre.appendChild(genreText);
    bottom.appendChild(genre);

    const ul = document.createElement("ul");
    movie.genres.forEach(function (genre) {
        const li = document.createElement("li");
        const liText = document.createTextNode(`${genre.name}`);
        li.appendChild(liText);
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
