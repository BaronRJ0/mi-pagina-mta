body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    color: #333;
}

header {
    background-color: #1a1a1d;
    color: white;
    padding: 20px 10px;
    text-align: center;
}

header h1 {
    margin: 0;
    font-size: 2.5rem;
}

nav ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    margin: 10px 0 0;
}

nav li {
    margin: 0 15px;
}

nav a {
    text-decoration: none;
    color: white;
    font-size: 1rem;
    transition: color 0.3s;
}

nav a:hover {
    color: #f39c12;
}

main {
    padding: 20px;
}

#filters {
    margin-bottom: 20px;
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#filters form {
    display: flex;
    flex-direction: column;
}

#filters form label {
    margin: 5px 0;
}

#filters form select, #filters form input {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #ddd;
}

#filters form button {
    padding: 10px;
    background-color: #1a1a1d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

#filters form button:hover {
    background-color: #f39c12;
}

#anime-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.anime-card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}

.anime-card:hover {
    transform: scale(1.05);
}

.anime-card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
}

.anime-card h3 {
    margin: 10px 0;
    font-size: 1.2rem;
}

.anime-card p {
    font-size: 0.9rem;
    margin: 5px 0;
    color: #666;
}

#pagination {
    text-align: center;
    margin-top: 20px;
}

footer {
    text-align: center;
    padding: 10px;
    background-color: #1a1a1d;
    color: white;
    font-size: 0.9rem;
}
