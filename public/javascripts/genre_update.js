function fetchGenreDataAndPopulateForm() {
  const path = window.location.pathname;
  const regex = /\/genre\/([^/]+)\/update/;
  const match = path.match(regex);
  const id = match[1];
  fetch('/catalog/api/genre/' + id + '/update')
    .then(response => response.json())
    .then(data => {
      const name = data.genre.name;
      const titleInput = document.getElementById('titleInput');
      if (titleInput) {
        titleInput.value = name;
      } else {
        console.error('Элемент с id "titleInput" не найден');
      }

      const updateGenreBtn = document.getElementById('updateGenreBtn');
      if (updateGenreBtn) {
        updateGenreBtn.addEventListener('click', function(event) {
          event.preventDefault();
          const newName = titleInput.value;
          const id = data.genre._id;
          updateGenre(id, newName);
        });
      } else {
        console.error('Кнопка с id "updateGenreBtn" не найдена');
      }
    })
    .catch(error => console.error('Ошибка при получении данных:', error));
}

function updateGenre(id, newName) {
  const data = { name: newName };

  fetch("/catalog/api/genre/" + id + "/update", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка HTTP: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log('Данные успешно отправлены:', data);
    window.location.href = '/catalog/genre/' + data.genre._id;
  })
  .catch(error => {
    console.error('Ошибка при отправке данных:', error);
  });
}

fetchGenreDataAndPopulateForm();
