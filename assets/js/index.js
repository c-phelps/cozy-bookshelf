// Function to fetch data from the Open Library API
function fetchBooks(searchQuery, searchCriteria) {
  if (searchQuery !== ""){

  
  fetch(
    `https://openlibrary.org/search.json?${searchCriteria.toLowerCase()}=${searchQuery}`
  )
    .then((response) => response.json())
    .then((data) => displaySearchResults(data))
    .catch((error) => console.error("Fetch error:", error));

} 
else {
  $("#modal-text").empty();
  $("<p>").text("Please enter a search term before searching.").appendTo("#modal-text");
  $("#modal").addClass("is-active");
 
}
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
    const contentOuter = $("<div>").addClass("content");
    const contentContainer = $("<div>").addClass("columns");
    const contentInnerImg = $("<div>").addClass("column");
    const contentInnerText = $("<div>").addClass("column");
    if (coverCode)
      $(
        `<img src='https://covers.openlibrary.org/b/id/${coverCode}-M.jpg' alt='Cover for ${strTitle}.'>`
      )
        .addClass("imgCode")
        .appendTo(contentInnerImg);
    // if the following values exist for the data set then append them to the inner content as paragraphs
    if (strAuthor)
      $("<p>")
        .text(`Author: ${strAuthor}`)
        .addClass("author")
        .appendTo(contentInnerText);
    if (firstPub)
      $("<p>")
        .text(`First Published: ${firstPub}`)
        .addClass("published")
        .appendTo(contentInnerText);
    if (numPages)
      $("<p>")
        .text(`Number of Pages: ${numPages}`)
        .addClass("pages")
        .appendTo(contentInnerText);
    if (ratings)
      $("<p>")
        .text(`Rating: ${ratings}`)
        .addClass("ratings")
        .appendTo(contentInnerText);

    // append all the inner content to the card main content
    contentContainer.append(contentInnerImg, contentInnerText);
    contentOuter.append(contentContainer);
    content.append(contentOuter);

    // FOOTER: construct our footer based on bulma documentation
    const footer = $("<footer>").addClass("card-footer");
    // add a button to the bottom of the content that allows for the book to be saved into local storage
    // the regex '/\s+/g' will replace all spaces found in the string with an underscore
    const buttonID = `${strTitle.replace(/\s+/g, "_")}:${strAuthor.replace(
      /\s+/g,
      "_"
    )}`;
    $("<button>")
      .attr("id", buttonID)
      .addClass("card-footer-item")
      .text("Save")
      .on("click", function () {
        const selectedBook = {
          title: strTitle,
          author: strAuthor,
          pages: numPages,
          published: firstPub,
          rating: ratings,
          cover: coverCode,
        };
        // Retrieve existing books from localStorage or initialize as an empty array
        let selectedBooks =
          JSON.parse(localStorage.getItem("selectedBooks")) || [];
        // Add the new selected book to the array
        selectedBooks.push(selectedBook);

        // Store the updated selected books array in localStorage
        localStorage.setItem("selectedBooks", JSON.stringify(selectedBooks));

        $("#modal-text").empty();
        $("<p>").text("Books saved").appendTo("#modal-text");
        $("#modal").addClass("is-active");
      })
      .appendTo(footer);

    // Append all elements to the card
    card.append(header, content, footer);
    $("#append-searches").append(card);
  }
}

// Event listener for the search button click
document.getElementById("btn-search").addEventListener("click", () => {
  const searchValue = document
    .getElementById("search-value")
    .value.replace(" ", "+");
  const searchCriteria = document.getElementById("search-criteria").value;
  
  fetchBooks(searchValue, searchCriteria);

});

//Event listener to link indexhtml to libraryhtml
document
  .getElementById("library-redirect")
  .addEventListener("click", function () {
    window.location.href = "library.html";
  });
