document.addEventListener("DOMContentLoaded", function() {
    retrieveGenreData();
});

function retrieveGenreData() {
    fetch('http://localhost:3000/catalog/api/genre_list')
    .then(response => response.json())
    .then(data => {
        renderGenres(data.genre_list);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function renderGenres(genres) {
    const genreContainer = document.getElementById('genre-list');
    genreContainer.innerHTML = '';

    genres.forEach(genreItem => {
        const genreDiv = document.createElement('li');
        const genreLink = document.createElement('a');
        genreLink.href = `/catalog/genre/${genreItem._id}`;
        genreLink.textContent = genreItem.name;
        genreLink.classList.add('genre-link');
        genreDiv.appendChild(genreLink);
        genreContainer.appendChild(genreDiv);
    });
}
