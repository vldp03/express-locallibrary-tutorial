function post(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
}

const form = document.getElementById('genreForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('titleInput').value;

    const formData = {
        name: title
    };

    post('/catalog/api/genre/create', formData)
        .then(response => {
            console.log('Response:', response);
            window.location.href = '/catalog/genre/' + response.genre._id;
        });

    form.reset();
});
