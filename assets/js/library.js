document.querySelector(".button").addEventListener("click", function () {
  window.location.href = "index.html";
});

const apiKey = "GEoGrfuYmgUebEklTl8MwWQBlM6O3TWh";

function retrieveRecomendations() {
  fetch(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => displayRecommendations(data))
    .catch((error) => console.error("Fetch error:", error));
}

function displayRecommendations({ results }) {
  const randNum = Math.floor(Math.random() * results.lists.length);
  for (books of results.lists[randNum].books) {
    console.log(books);
  }
  //   console.log(results.lists[randNum].books[0]);
  //   console.log(randNum);
}

$(document).ready(() => {
//   retrieveRecomendations();
});

document.querySelector(".button").addEventListener("click", function () {
  window.location.href = "index.html";
});
