document.addEventListener("DOMContentLoaded", () => {

   console.log("module2.js chargé");


  let authors = getAuthors();


  const form = document.getElementById("authorForm");
  const inputName = document.getElementById("authorName");
  const list = document.getElementById("authorsList");

  if (!form || !inputName || !list) {
    console.error("Éléments Auteurs introuvables");
    return;
  }

  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = inputName.value.trim();

    if (name === "") {
      alert("Veuillez saisir le nom de l’auteur");
      return;
    }

    const author = {
      id: Date.now(),
      name
    };

    authors.push(author);
  saveAuthors(authors);
displayAuthors();


    form.reset();
  });

  
  function displayAuthors() {
    list.innerHTML = "";

    authors.forEach(author => {
      const li = document.createElement("li");

      li.innerHTML = `
        ${author.name}
        <button onclick="deleteAuthor(${author.id})" style="float:right">🗑</button>
      `;

      list.appendChild(li);
    });
  }

  
  window.deleteAuthor = function (id) {
    authors = authors.filter(author => author.id !== id);
    saveAuthors(authors); 
    displayAuthors();
     
  };
  displayAuthors();

});
