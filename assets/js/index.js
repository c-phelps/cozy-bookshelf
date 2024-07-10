// Function to fetch data from the Open Library API
function fetchBooks(searchQuery, searchCriteria) {
  fetch(
    `https://openlibrary.org/search.json?${searchCriteria.toLowerCase()}=${searchQuery}`
  )
    .then((response) => response.json())
    .then((data) => displaySearchResults(data))
    .catch((error) => console.error("Fetch error:", error));
}

// Event listener for the search button click
document.getElementById("btn-search").addEventListener("click", () => {
  const searchValue = document
    .getElementById("search-value")
    .value.replace("", "+");
  const searchCriteria = document.getElementById("search-criteria").value;
  fetchBooks(searchValue, searchCriteria);
});
