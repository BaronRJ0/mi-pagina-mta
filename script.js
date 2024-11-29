// Simulación de datos obtenidos de una API de anime
const animes = [
    {
        title: "Shingeki no Kyojin: The Final Season",
        image: "https://via.placeholder.com/300x400",
        rating: 9.2,
        site: "MyAnimeList"
    },
    {
        title: "Jujutsu Kaisen 2nd Season",
        image: "https://via.placeholder.com/300x400",
        rating: 8.7,
        site: "MyAnimeList"
    },
    {
        title: "Tokyo Revengers: Tenjiku-hen",
        image: "https://via.placeholder.com/300x400",
        rating: 8.1,
        site: "Anilist"
    },
    {
        title: "One Piece",
        image: "https://via.placeholder.com/300x400",
        rating: 9.0,
        site: "MyAnimeList"
    }
];

function loadAnimes() {
    const animeList = document.getElementById("anime-list");

    animes.forEach(anime => {
        const animeCard = document.createElement("div");
        animeCard.className = "anime-card";

        animeCard.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <p>Calificación: ${anime.rating} (${anime.site})</p>
        `;

        animeList.appendChild(animeCard);
    });
}

// Cargar animes al cargar la página
document.addEventListener("DOMContentLoaded", loadAnimes);
