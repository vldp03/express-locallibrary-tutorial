document.addEventListener("DOMContentLoaded", function() {
    const path = window.location.pathname;
    const regex = /\/author\/([^/]+)\/update/;
    const match = path.match(regex);
    const id = match[1];

    fetch('/catalog/api/author/' + id + '/update')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const author = data.author;
            let authorUpdateElement = document.getElementById("authorUpdate");
            if (!authorUpdateElement) {
                authorUpdateElement = document.createElement("div");
                authorUpdateElement.id = "authorUpdate";
                document.body.appendChild(authorUpdateElement);
            }
            authorUpdateElement.innerHTML = '';

            const fields = ['first_name', 'family_name', 'date_of_birth', 'date_of_death'];

            fields.forEach(field => {
                let input = document.createElement("input");
                input.type = "text";
                input.id = field;
                input.value = author[field] || '';
                if (field.includes('date')) {
                    input.placeholder = "DD/MM/YYYY";
                    input.value = author[field] ? formatDateToString(author[field]) : '';
                }
                authorUpdateElement.appendChild(createLabel(field, field));
                authorUpdateElement.appendChild(input);
                authorUpdateElement.appendChild(document.createElement("br"));
            });

            let submitButton = document.createElement("button");
            submitButton.textContent = "Update";
            submitButton.addEventListener("click", function() {
                const firstName = document.getElementById('first_name').value;
                const familyName = document.getElementById('family_name').value;
                const dateOfBirthElement = document.getElementById('date_of_birth');
                const dateOfDeathElement = document.getElementById('date_of_death');
                let dateOfBirth, dateOfDeath;

                if (dateOfBirthElement.value) {
                    dateOfBirth = new Date(dateOfBirthElement.value).toISOString();
                }
                if (dateOfDeathElement.value) {
                    dateOfDeath = new Date(dateOfDeathElement.value).toISOString();
                }

                const body = {
                    first_name: firstName,
                    family_name: familyName,
                    date_of_birth: dateOfBirth,
                    date_of_death: dateOfDeath
                };

                const url = `/catalog/api/author/${id}/update`;
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                };

                fetch(url, options)
                    .then(response => response.json())
                    .then(data => {
                        if (data.errors) {
                            console.log(data.errors);
                            alert('Error updating author');
                        } else {
                            const authorId = data.author._id;
                            alert('Author updated successfully');
                            window.location.href = "/catalog/author/" + authorId;
                        }
                    })    
                    .catch(error => {
                        console.error('Error creating author:', error);
                    });
            });
            authorUpdateElement.appendChild(submitButton);
        })
        .catch(error => {
            console.error('Error fetching author data:', error);
        });
});

function formatDateToString(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function createLabel(text, htmlFor) {
    let label = document.createElement("label");
    label.for = htmlFor;
    label.textContent = text.replace(/_/g, ' '); 
    return label;
}
