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
        const animes = data.data.Page.media;

        totalPages = Math
