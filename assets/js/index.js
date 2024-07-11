// Function to fetch data from the Open Library API
function fetchBooks(searchQuery, searchCriteria) {
  fetch(`https://openlibrary.org/search.json?${searchCriteria.toLowerCase()}=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => displaySearchResults(data))
    .catch((error) => console.error("Fetch error:", error));
}

function displaySearchResults({ docs }) {
  // empty out any older search results to display the latest search
  $("#append-searches").empty();
  for (let books of docs) {
    const strTitle = books.title || "";
    let strAuthor;
    if (Array.isArray(books.author_name)) {
      strAuthor = books.author_name[0] || "";
    } else {
      strAuthor = books.author_name || "";
    }
    const numPages = books.number_of_pages_median;
    const firstPub = books.first_publish_year;
    const ratings = books.ratings_average;
    // store this incase we want to create a more elaborate design later
    const coverCode = books.cover_i;

    // CARD: construct our card element based off of bulma documentation
    const card = $("<div>").addClass("card");
    // HEAD: give our card a header and assign the bulma class
    const header = $("<header>").addClass("card-header");
    // append our strTitle to the header
    $("<p>").addClass("card-header-title").text(strTitle).appendTo(header);

    // BODY: construct our card body based on bulma documentation
    const content = $("<div>").addClass("card-content");
    const contentInner = $("<div>").addClass("content");
    // if the following values exist for the data set then append them to the inner content as paragraphs
    if (strAuthor) $("<p>").text(`Author: ${strAuthor}`).addClass("author").appendTo(contentInner);
    if (firstPub) $("<p>").text(`First Published: ${firstPub}`).addClass("published").appendTo(contentInner);
    if (numPages) $("<p>").text(`Number of Pages: ${numPages}`).addClass("pages").appendTo(contentInner);
    if (ratings) $("<p>").text(`Rating: ${ratings}`).addClass("ratings").appendTo(contentInner);
    // append all the inner content to the card main content
    content.append(contentInner);

    // FOOTER: construct our footer based on bulma documentation
    const footer = $("<footer>").addClass("card-footer");
    // add a button to the bottom of the content that allows for the book to be saved into local storage
    // the regex '/\s+/g' will replace all spaces found in the string with an underscore
    const buttonID = `${strTitle.replace(/\s+/g, "_")}:${strAuthor.replace(/\s+/g, "_")}`;
    $("<button>").attr("id", buttonID).addClass("card-footer-item").text("Save").appendTo(footer);

    // append our created elements to the card element shell
    card.append(header);
    card.append(content);
    card.append(footer);
    $("#append-searches").append(card);
  }
}

// Event listener for the search button click
document.getElementById("btn-search").addEventListener("click", () => {
  const searchValue = document.getElementById("search-value").value.replace(" ", "+");
  const searchCriteria = document.getElementById("search-criteria").value;
  fetchBooks(searchValue, searchCriteria);
});
