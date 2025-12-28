function getBooks() {
  return JSON.parse(localStorage.getItem("books")) || [];
}

function saveBooks(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

function getAuthors() {
  return JSON.parse(localStorage.getItem("authors")) || [];
}

function saveAuthors(authors) {
  localStorage.setItem("authors", JSON.stringify(authors));
}
