document.addEventListener("DOMContentLoaded", () => {

  
   let books = getBooks();

  const form = document.getElementById("bookForm");
  const tableBody = document.getElementById("booksTableBody");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const year = document.getElementById("bookYear").value;
    const category = document.getElementById("bookCategory").value;

    if (!title || !author || !year) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const book = {
      id: Date.now(),
      title,
      author,
      year,
      category,
        available: true
    };

   

    books.push(book);
 saveBooks(books);
displayBooks();
loadDashboard();

    form.reset();
  });

  function displayBooks() {
    tableBody.innerHTML = "";

    books.forEach(book => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
          <td>${book.category || "-"}</td>
        <td>${book.year}</td>
        <td>
          <button onclick="deleteBook(${book.id})">🗑</button>
        </td>
      `;

      tableBody.appendChild(tr);
    });
  }

  window.deleteBook = function (id) {
   
    books = books.filter(b => b.id !== id);
 saveBooks(books);
displayBooks();
loadDashboard();


  };

   displayBooks();
});
