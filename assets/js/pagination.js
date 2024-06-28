$(document).ready(function () {
  const $page1 = $("#resume-page1");
  const $page2 = $("#resume-page2");
  const $prevButton = $("#prev");
  const $nextButton = $("#next");

  let currentPage = 1;

  function updatePagination() {
    console.log("currentPage :", currentPage);
    if (currentPage === 1) {
      $page1.show();
      $page2.hide();
      $prevButton.prop("disabled", true);
      $nextButton.prop("disabled", false);
    } else if (currentPage === 2) {
      $page1.hide();
      $page2.show();
      $prevButton.prop("disabled", false);
      $nextButton.prop("disabled", true);
    }
  }

  $prevButton.click(function () {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });

  $nextButton.click(function () {
    if (currentPage < 2) {
      currentPage++;
      updatePagination();
    }
  });

  updatePagination();
});
