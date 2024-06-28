document.addEventListener("DOMContentLoaded", () => {
  const page1 = document.getElementById("resume-page1");
  const page2 = document.getElementById("resume-page2");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  let currentPage = 1;

  function updatePagination() {
    if (currentPage === 1) {
      page1.style.display = "block";
      page2.style.display = "none";
      prevButton.disabled = true;
      nextButton.disabled = false;
    } else if (currentPage === 2) {
      page1.style.display = "none";
      page2.style.display = "block";
      prevButton.disabled = false;
      nextButton.disabled = true;
    }
  }

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < 2) {
      currentPage++;
      updatePagination();
    }
  });

  updatePagination();
});
