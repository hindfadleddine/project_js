const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const searchType = document.getElementById("searchType");
const apiResults = document.getElementById("apiResults");

searchBtn.addEventListener("click", searchOpenLibrary);

async function searchOpenLibrary() {
  const query = searchInput.value.trim();
  if (!query) return;

  apiResults.innerHTML = "Chargement...";

  let url =
    searchType.value === "title"
      ? `https://openlibrary.org/search.json?title=${query}`
      : `https://openlibrary.org/search.json?author=${query}`;

  const res = await fetch(url);
  const data = await res.json();

  displayResults(data.docs.slice(0, 10));
}

function displayResults(books) {
  apiResults.innerHTML = "";

  books.forEach(book => {
    const div = document.createElement("div");
    div.className = "api-book";

    div.innerHTML = `
      <h4>${book.title}</h4>
      <p>${book.author_name ? book.author_name[0] : "Auteur inconnu"}</p>
      <p>${book.first_publish_year || "—"}</p>
      <button>Importer</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      importBook(book);
    });

    apiResults.appendChild(div);
  });
}
function importBook(book) {
  const books = JSON.parse(localStorage.getItem("books")) || [];

  books.push({
    title: book.title,
    author: book.author_name ? book.author_name[0] : "Inconnu",
    year: book.first_publish_year || "",
    category: "Importé (API)",
    available: true
  });

  localStorage.setItem("books", JSON.stringify(books));
  alert("📚 Livre importé avec succès !");
}
