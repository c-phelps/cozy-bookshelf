document.querySelector(".button").addEventListener("click", function () {
  window.location.href = "index.html";
});

const apiKey = "GEoGrfuYmgUebEklTl8MwWQBlM6O3TWh";

function retrieveRecomendations() {
  fetch(
    `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${apiKey}`
  )
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

// Function to display selected books on library.html
function displaySelectedBooks() {
  const savedBooks = JSON.parse(localStorage.getItem("selectedBooks"));
  const savedBooksContainer = document.getElementById("selected-books");
  const displayedTitles = new Set();

  if (savedBooks && Array.isArray(savedBooks)) {
    savedBooks.forEach((savedBook) => {
      if (!displayedTitles.has(savedBook.title)) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
              <div class="card-content">
                <div class="image-container">
                  <img src="https://covers.openlibrary.org/b/id/${savedBook.cover}-M.jpg" alt="Cover for ${savedBook.title}">
                </div>
                <div class="text-container">
                  <p>Title: ${savedBook.title}</p>
                  <p>Author: ${savedBook.author}</p>
                  <p>Pages: ${savedBook.pages}</p>
                  <p>Published: ${savedBook.published}</p>
                  <p>Rating: ${savedBook.rating}</p>
                </div>
              </div>
              `;

        savedBooksContainer.appendChild(card);
        displayedTitles.add(savedBook.title);
      }
    });
  }
}

// Call the function to display selected books
displaySelectedBooks();

$(document).ready(() => {
  //   retrieveRecomendations();
});

document.querySelector(".button").addEventListener("click", function () {
  window.location.href = "index.html";
});
