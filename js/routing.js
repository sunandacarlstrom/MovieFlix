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
