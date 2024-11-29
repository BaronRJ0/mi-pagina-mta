let currentPage = 1;
let totalPages = 1;
let filters = {
    season: "FALL",
    year: 2024,
    rating: 0,
};

async function fetchAnimes() {
    const query = `
        query($season: MediaSeason, $year: Int, $rating: Int, $page: Int) {
            Page(page: $page, perPage: 10) {
                media(type: ANIME, season: $season, seasonYear: $year, sort: POPULARITY_DESC, minimumRating: $rating) {
                    title {
                        romaji
                    }
                    coverImage {
                        large
                    }
                    averageScore
                    siteUrl
                    status
                    genres
                    description
                }
            }
        }
    `;

    const url = "https://graphql.anilist.co";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables: { ...filters, page: currentPage },
        }),
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const animes = data.data.Page.media;

        totalPages = Math.ceil(data.data.Page.pageInfo.total / 10);
        displayAnimes(animes);
    } catch (error) {
        console.error("Error fetching anime data:", error);
        document.getElementById("anime-list").innerHTML = "<p>Error al cargar los animes.</p>";
    }
}

function displayAnimes(animes) {
    const animeList = document.getElementById("anime-list");
    animeList.innerHTML = ""; // Limpiar el contenido de animes anterior

    animes.forEach(anime => {
        const animeCard = document.createElement("div");
        animeCard.className = "anime-card";

        animeCard.innerHTML = `
            <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
            <h3>${anime.title.romaji}</h3>
            <p>Calificación: ${anime.averageScore || "N/A"} / 100</p>
            <p>Géneros: ${anime.genres.join(", ")}</p>
            <p>Estado: ${anime.status}</p>
            <p><a href="${anime.siteUrl}" target="_blank">Ver más</a></p>
            <p>${anime.description.slice(0, 150)}...</p>
        `;

        animeList.appendChild(animeCard);
    });
}

function loadMoreAnimes() {
    if (currentPage < totalPages) {
        currentPage++;
        fetchAnimes();
    }
}

// Filtro dinámico
document.getElementById("filters-form").addEventListener("submit", function (e) {
    e.preventDefault();
    filters.season = document.getElementById("season").value;
    filters.year = parseInt(document.getElementById("year").value);
    filters.rating = parseInt(document.getElementById("rating").value);
    currentPage = 1; // Resetear la página a la 1
    fetchAnimes();
});

// Cargar animes al inicio
document.addEventListener("DOMContentLoaded", fetchAnimes);
