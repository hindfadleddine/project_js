document.addEventListener("DOMContentLoaded", () => {

  const menuItems = document.querySelectorAll(".sidebar nav li");
  const sections = document.querySelectorAll(".section");

  menuItems.forEach(item => {
    item.addEventListener("click", () => {

      
      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      
      sections.forEach(section => section.classList.remove("active"));

      
      const target = item.dataset.section;
      document.getElementById(target).classList.add("active");
    });
  });

});

