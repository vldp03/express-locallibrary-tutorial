document.addEventListener("DOMContentLoaded", () => {
    getData();
  });
  
  async function getData() {
    try {
      const response = await fetch("/catalog/api/author/" + window.location.pathname.split("/").pop());
      const data = await response.json();
  
      const authorDetailDiv = document.getElementById('authorDetail');
      const authorName = document.createElement('h2');
      authorName.textContent = `${data.author.first_name} ${data.author.family_name}`;
      const authorId = document.createElement('p');
      authorId.textContent = `Author ID: ${data.author._id}`;
      const authorBirth = document.createElement('p');
      authorBirth.textContent = `Date of birth: ${data.author.date_of_birth || 'N/A'}`;
      authorBirth.classList.add('author-birth');
      const authorDeath = document.createElement('p');
      authorDeath.textContent = `Date of death: ${data.author.date_of_death || 'N/A'}`;
      authorDeath.classList.add('author-death');
  
      const booksList = document.createElement('ul');
      data.author_books.forEach(book => {
        const bookItem = document.createElement('li');
        bookItem.textContent = `${book.title}: ${book.summary}`;
        booksList.appendChild(bookItem);
      });
      const authorDelete = document.createElement('button');
      authorDelete.textContent = 'Delete';
      authorDelete.classList.add('delete-button');
      const id = data.author._id;
      const books = data.author_books.length;
      authorDelete.onclick = () => deleteAuthor(id, books);
  
      const authorUpdate = document.createElement('button');
      authorUpdate.textContent = 'Update';
      authorUpdate.classList.add('update-button');
      authorUpdate.onclick = () => updateAuthor(id);
  
      authorDetailDiv.innerHTML = '';
  
      authorDetailDiv.appendChild(authorName);
      authorDetailDiv.appendChild(authorId);
      authorDetailDiv.appendChild(authorBirth);
      authorDetailDiv.appendChild(authorDeath);
      authorDetailDiv.appendChild(booksList);
      authorDetailDiv.appendChild(authorDelete);
      authorDetailDiv.appendChild(authorUpdate);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  async function deleteAuthor(id, books) {
    try {
      if (books > 0) {
        alert('Author has books. Delete them first');
        return;
      } else {
        const response = await fetch(`/catalog/api/author/${id}/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ authorid: id })
        });
        const result = await response.json();
        window.location.href = '/catalog/authors';
      }
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  }
  
  function updateAuthor(id) {
    window.location.href = 'http://localhost:3000/catalog/author/' + id + '/update';
  }
  