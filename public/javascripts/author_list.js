document.addEventListener("DOMContentLoaded", function() {
  fetchData();
});

function fetchData() {
  fetch('http://localhost:3000/catalog/api/author_list')
  .then(response => response.json())
  .then(data => {
      renderAuthors(data.author_list);
  })
  .catch(error => console.error('Error fetching data:', error));
}

function renderAuthors(authors) {
  const authorListElement = document.getElementById('author-list');
  authorListElement.innerHTML = '';

  authors.forEach(author => {
      const listItem = document.createElement('li');
      const authorLink = document.createElement('a');
      authorLink.href = `/catalog/author/${author._id}`;
      authorLink.textContent = `${author.first_name} ${author.family_name}`;
      authorLink.classList.add('author-link');
      listItem.appendChild(authorLink);
      authorListElement.appendChild(listItem);
  });
}
