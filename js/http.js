// Skapar en separat funktion för att hämta datat från API
const fetchData = async (endpoint) => {
    const API_KEY = state.apiSettings.key;
    const API_URL = state.apiSettings.baseUrl;

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=sv-SE`);

    const data = await response.json();
    return data;
};