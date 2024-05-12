function init() {
    document.getElementById('createAuthorBtn').addEventListener('click', submitForm);
}

function submitForm() {
    fetch('/catalog/api/author/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            first_name: document.getElementById("first_name").value,
            family_name: document.getElementById("family_name").value,
            date_of_birth: document.getElementById("date_of_birth").value,
            date_of_death: document.getElementById("date_of_death").value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.errors) {
            console.log(data.errors);
            alert('Error creating author');
        } else {
            const authorId = data.author._id;
            alert('Author created successfully');
            window.location.href = "/catalog/author/" + authorId;
        }
    })    
    .catch(error => {
        console.error('Error creating author:', error);
    });
}

document.addEventListener('DOMContentLoaded', init);
