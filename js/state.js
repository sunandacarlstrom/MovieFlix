// Hanterar och uppdaterar tillståndet(state) för applikationen

// Skapar egen state-hantering för att hålla viktiga globala variabler och inställningar som används på flera ställen i applikationen
const state = {
    currentPage: window.location.pathname,
    apiSettings: {
        key: "cf4dff71f2576af5f9aeb62372d8bb09",
        baseUrl: "https://api.themoviedb.org/3/",
    },
};

export default state;
