const listPopularMovies = async () => {
    // Anropar min metod fetchData() och skickar in korrekt endpoint
    const { results } = await fetchData("movie/popular");
    displayMovies("#top-movies", results);
};

//Skapar undersidan 'movie-details'
const showMovieDetails = async () => {
    // Måste ha tag i Movie-id med. location.serach som tar frågesträngen
    // därefter splitta frågesträngen och använder endast andra delen av splittningen
    const movieId = window.location.search.split("=")[1];

    // Anropar min metod fetchData() och skickar in korrekt endpoint
    const movie = await fetchData(`movie/${movieId}`);
    // Anropar min metod displayMovieDetails() och skickar in korrekt data
    displayMovieDetails("#movie-details", movie);
    // showMovieDetails blir ansvarig att anropa min metod displayBackgroundImage()
    displayBackgroundImage("#movie-details", movie.backdrop_path);
};

