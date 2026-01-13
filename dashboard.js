function loadDashboard() {
  const books = getBooks();
  const authors = JSON.parse(localStorage.getItem("authors")) || [];

  document.getElementById("statBooks").textContent = books.length;
  document.getElementById("statAuthors").textContent = authors.length;
  document.getElementById("statAvailable").textContent =
    books.filter(b => b.available !== false).length;

  const categories = {};

  books.forEach(book => {
    const cat = (book.category || "").trim();
    if (!cat) return;
    categories[cat] = (categories[cat] || 0) + 1;
  });

  const labels = Object.keys(categories);
  const data = Object.values(categories);

  document.getElementById("statCategories").textContent = labels.length;

  if (labels.length === 0) return;

  const canvas = document.getElementById("booksChart");
  if (!canvas) return;


  if (window.booksChart && typeof window.booksChart.destroy === "function") {
    window.booksChart.destroy();
  }

  window.booksChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Livres par catégorie",
        data,
        backgroundColor: "#2563eb"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", loadDashboard);
