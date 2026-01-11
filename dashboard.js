function loadDashboard() {

  const kpis = document.querySelectorAll(".kpi-card p");

  const books = JSON.parse(localStorage.getItem("books")) || [];
  const authors = JSON.parse(localStorage.getItem("authors")) || [];

  // KPI
  kpis[0].textContent = books.length;
  kpis[1].textContent = authors.length;
  kpis[2].textContent = books.length;

  // données graphique
  const categories = {};

  books.forEach(book => {
    const cat = book.category || "Autres";
    categories[cat] = (categories[cat] || 0) + 1;
  });

  const labels = Object.keys(categories);
  const data = Object.values(categories);

  if (labels.length === 0) return;

  const canvas = document.getElementById("booksChart");

  // supprimer ancien graphique si existant
  if (window.booksChart) {
    window.booksChart.destroy();
  }

  window.booksChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Livres par catégorie",
        data: data
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
