const searchDiv = document.querySelector(".search-container");

// Create search elements
const searchForm = document.createElement("form");
const searchInput = document.createElement("input");
const submitButton = document.createElement("input");

// append search elements
searchDiv.appendChild(searchForm);
searchForm.appendChild(searchInput);
searchForm.appendChild(submitButton);
