const apiKey = "GEoGrfuYmgUebEklTl8MwWQBlM6O3TWh";
// global variable
let curTitle;

// function to populated the select control and display it on screen for the data returned by the API call
function populateSelect({ results }) {
  localStorage.setItem("recommendedBooks", JSON.stringify(results.lists));
  const eleControl = $("<div>").addClass("control");
  const eleContainer = $("<div>").addClass("select is-fullwidth mt-3").attr("id", "book-container");
  const eleSelect = $("<select>")
    .addClass("has-text-centered")
    .attr("id", "filter-option")
    .on("change", (event) => {
      // set the on change event to displaySelected and pass the target's value
      displaySelected(event.target.value);
    });
  $("<p>").text("Please select a category for recommendations").appendTo(eleControl);

  // for each value in results.list add the display_name as an option
  for (let x in results.lists) {
    $("<option>").text(results.lists[x].display_name).appendTo(eleSelect);
  }
  // append our values
  eleSelect.appendTo(eleContainer);
  eleContainer.appendTo(eleControl);
  $("#recommended").append(eleControl);
  $("<div>").addClass("column", "has-text-centered").attr("id", "fill-cards").appendTo("#recommended");
}

// display the books for the bestsellers list that is selected on option change
function displaySelected(displayName) {
  let arrRecommended = JSON.parse(localStorage.getItem("recommendedBooks")) || [];
  const inArray = arrRecommended.findIndex(function (book) {
    return book.display_name === displayName;
  });
  // clear out any previous books that were displayed
  $("#fill-cards").empty();
  // for each book in the array of objects display a card with relevant data
  for (books of arrRecommended[inArray].books) {
    const card = $("<div>").addClass("card");
    const header = $("<header>").addClass("card-header");
    $("<p>").addClass("card-header-title").text(books.title).appendTo(header);
    const content = $("<div>").addClass("card-content");
    const contentInner = $("<div>").addClass("content");
    $(`<img src='${books.book_image}' alt='Cover art for ${books.title}'>`).appendTo(contentInner);
    $("<p>").text(`Author: ${books.author}`).addClass("author").appendTo(contentInner);
    $("<p>").text(`Description: ${books.description}`).addClass("description").appendTo(contentInner);
    content.append(contentInner);
    card.append(header, content);
    $("#fill-cards").append(card);
  }
}

// simple fetch request to return data to the webpage for recommendations
function retrieveRecomendations() {
  localStorage.setItem("recommendedBooks", JSON.stringify(""));
  fetch(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => populateSelect(data))
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

// on document ready handle all the event listeners and fetch requests
$(document).ready(() => {
  retrieveRecomendations();

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

  document.querySelector("#btn-back").addEventListener("click", function () {
    window.location.href = "index.html";
  });
});
