let currentPage = 1;
let totalPages = 1;
let filters = {
    season: "FALL",
    year: 2024,
    rating: 0,
};

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

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
                    id
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
        
        // Verificamos la respuesta de la API
        console.log(data);

        if (data.data && data.data.Page && data.data.Page.media) {
            const animes = data.data.Page.media;
            totalPages = Math.ceil(data.data.Page.pageInfo.total / 10);
            displayAnimes(animes);
        } else {
            console.error("No se encontraron animes en la respuesta.");
            document.getElementById("anime-list").innerHTML = "<p>No se encontraron animes.</p>";
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        document.getElementById("anime-list").innerHTML = "<p>Error al cargar los animes.</p>";
    }
}

function displayAnimes(animes) {
    const animeList = document.getElementById("anime-list");
    animeList.innerHTML = "";

    if (animes.length === 0) {
        animeList.innerHTML = "<p>No se encontraron animes.</p>";
    }

    animes.forEach(anime => {
        const animeCard = document.createElement("div");
        animeCard.className = "anime-card";

        const isFavorite = favorites.some(fav => fav.id === anime.id);

        const stars = "★".repeat(Math.floor(anime.averageScore / 10)) + "☆".repeat(10 - Math.floor(anime.averageScore / 10));

        animeCard.innerHTML = `
            <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
            <h3>${anime.title.romaji}</h3>
            <p class="stars">${stars}</p>
            <p>Calificación: ${anime.averageScore || "N/A"} / 100</p>
            <p>Géneros: ${anime.genres.join(", ")}</p>
            <p>Estado: ${anime.status}</p>
            <p><a href="${anime.siteUrl}" target="_blank">Ver más</a></p>
            <p>${anime.description.slice(0, 150)}...</p>
            <button onclick="toggleFavorite(${anime.id})">${isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}</button>
        `;

        animeList.appendChild(animeCard);
    });
}

function toggleFavorite(animeId) {
    const animeData = {
        id: animeId,
        title: anime.querySelector("h3").innerText,
        image: anime.querySelector("img").src,
    };

    if (favorites.some(fav => fav.id === animeId)) {
        favorites = favorites.filter(fav => fav.id !== animeId);
    } else {
        favorites.push(animeData);
    }

    saveFavorites();
    displayAnimes([...favorites, ...animes]);
}

function loadMoreAnimes() {
    if (currentPage < totalPages) {
        currentPage++;
        fetchAnimes();
    }
}

document.getElementById("filters-form").addEventListener("submit", function (e) {
    e.preventDefault();
    filters.season = document.getElementById("season").value;
    filters.year = parseInt(document.getElementById("year").value);
    filters.rating = parseInt(document.getElementById("rating").value);
    currentPage = 1;
    fetchAnimes();
});

document.addEventListener("DOMContentLoaded", fetchAnimes);
