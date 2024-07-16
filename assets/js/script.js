// document.getElementById('btn-search').addEventListener('click', function() {
//   const searchValue = document.getElementById('search-value').value.trim();

//   // Check if the search bar is empty
//   if (searchValue === '') {
//     // Show the Bulma modal
//     document.getElementById('modal').classList.add('is-active');
//     return; // Exit the function if the search bar is empty
//   }

//   // Retrieve the selected search criteria
//   const searchCriteria = document.getElementById('search-criteria').value;

//   // Clear the search bar after the search
//   document.getElementById('search-value').value = '';
// });

// Close the modal when the close button is clicked
document.querySelector('.modal-close').addEventListener('click', function() {
  document.getElementById('modal').classList.remove('is-active');
});