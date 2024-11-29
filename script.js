// Función para obtener animes populares de AniList
async function fetchAnimes() {
    const query = `
        query {
            Page(page: 1, perPage: 10) {
                media(type: ANIME, sort: POPULARITY_DESC) {
                    title {
                        romaji
                    }
                    coverImage {
                        large
                    }
                    averageScore
                    siteUrl
                    status
                }
            }
        }
    `;

    const url = "https://graphql.anilist.co";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        displayAnimes(data.data.Page.media);
    } catch (error) {
        console.error("Error fetching anime data:", error);
        document.getElementById("anime-list").innerHTML = "<p>Error al cargar los animes.</p>";
    }
}

// Función para mostrar los animes en la página
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
            <p>Estado: ${anime.status}</p>
            <p><a href="${anime.siteUrl}" target="_blank">Ver más</a></p>
        `;

        animeList.appendChild(animeCard);
    });
}

// Cargar los animes al iniciar la página
document.addEventListener("DOMContentLoaded", fetchAnimes);
