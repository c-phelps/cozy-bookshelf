document.querySelector("#btn-back").addEventListener("click", function () {
  window.location.href = "index.html";
});

const apiKey = "GEoGrfuYmgUebEklTl8MwWQBlM6O3TWh";
// global variable
let curTitle;

function displayRecommendations({ results }) {
  const randNum = Math.floor(Math.random() * results.lists.length);
  $("#recommended").append("<p>").addClass("is-size-4").text(results.lists[randNum].list_name);
  for (books of results.lists[randNum].books) {
    const card = $("<div>").addClass("card");
    const header = $("<header>").addClass("card-header");
    $("<p>").addClass("card-header-title").text(books.title).appendTo(header);
    const content = $("<div>").addClass("card-content");
    const contentInner = $("<div>").addClass("content");
    $(`<img src='${books.book_image}' alt='Cover art for '${books.title}'>`).appendTo(contentInner);
    $("<p>").text(`Author: ${books.author}`).addClass("author").appendTo(contentInner);
    $("<p>").text(`Description: ${books.description}`).addClass("author").appendTo(contentInner);
    content.append(contentInner);
    card.append(header, content);
    $("#recommended").append(card);
  }
}

function retrieveRecomendations() {
  fetch(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => displayRecommendations(data))
    .catch((error) => console.error("Fetch error:", error));
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
                  <img src="https://covers.openlibrary.org/b/id/${savedBook.cover}-M.jpg" alt="Cover for ${
          savedBook.title
        }">
                </div>
                <div class="text-container">
                  <p>Title: ${savedBook.title}</p>
                  <p>Author: ${savedBook.author}</p>
                  <p>Pages: ${savedBook.pages || ""}</p>
                  <p>Published: ${savedBook.published || ""}</p>
                  <p>Rating: ${savedBook.rating || ""}</p>
                  <button class="button is-danger is-outlined delete-button" data-title="${
                    savedBook.title
                  }">Delete</button>
                </div>
              </div>
              `;

        savedBooksContainer.appendChild(card);
        displayedTitles.add(savedBook.title);
      }
    });

    //delete button
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const title = this.getAttribute("data-title");
        document.getElementById("modal").classList.add("is-active");
        curTitle = title;
      });
    });
  }
}

// Call the function to display selected books
displaySelectedBooks();

$(document).ready(() => {
  retrieveRecomendations();
});

$("#btn-delete-book").on("click", () => {
  let savedBooks = JSON.parse(localStorage.getItem("selectedBooks"));
  savedBooks = savedBooks.filter((book) => book.title !== curTitle);
  localStorage.setItem("selectedBooks", JSON.stringify(savedBooks));

  $("#selected-books").empty();
  displaySelectedBooks();
  curTitle = "";
  $("#modal").removeClass("is-active");
});

$("#btn-cancel").on("click", () => {
  $("#modal").removeClass("is-active");
});
