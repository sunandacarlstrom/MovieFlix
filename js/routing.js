// Hanterar routing (just nu endast startar upp)

import state from "./state.js";
import { listPopularMovies, showMovieDetails } from "./movies.js";

// Skapar routing hantering
const route = () => {
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

export default route;
