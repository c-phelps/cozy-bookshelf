// Function to fetch data from the Open Library API
function fetchBooks(searchQuery, searchCriteria) {
  fetch(
    `https://openlibrary.org/search.json?${searchCriteria.toLowerCase()}=${searchQuery}`
  )
    .then((response) => response.json())
    .then((data) => displaySearchResults(data))
    .catch((error) => console.error("Fetch error:", error));
}

// Function to display search results on the page
function displaySearchResults(data) {
  const searchResultsDiv = document.getElementById("append-searches");
  searchResultsDiv.innerHTML = "";

  data.docs.forEach((book) => {
    const bookTitle = book.title;
    const bookAuthor = book.author_name
      ? book.author_name.join(", ")
      : "Unknown Author";
    const bookElement = document.createElement("p");
    bookElement.textContent = `${bookTitle} by ${bookAuthor}`;
    searchResultsDiv.appendChild(bookElement);
  });
}

// Event listener for the search button click
document.getElementById("btn-search").addEventListener("click", () => {
  const searchValue = document.getElementById("search-value").value;
  const searchCriteria = document.getElementById("search-criteria").value;
  fetchBooks(searchValue, searchCriteria);
});
