const searchDiv = document.querySelector(".search-container");

// Create search elements
const searchForm = document.createElement("form");
const searchInput = document.createElement("input");
const submitButton = document.createElement("input");

// Add search form attributes
searchForm.setAttribute("action", "#");
searchForm.setAttribute("method", "get");

searchInput.setAttribute("type", "search");
searchInput.setAttribute("id", "search-input");
searchInput.setAttribute("class", "search-input");
searchInput.setAttribute("placeholder", "Search...");

submitButton.setAttribute("type", "submit");
submitButton.setAttribute("value", "&#x1F50D;");
submitButton.setAttribute("id", "search-submit");
submitButton.setAttribute("class", "search-submit");

// append search elements
searchDiv.appendChild(searchForm);
searchForm.appendChild(searchInput);
searchForm.appendChild(submitButton);

// FETCH Functions
function fetchData(url) {
  return fetch(url)
    .then((res) => res.json())
    .catch((error) =>
      console.log("Looks like there was in issue with your request...", error)
    );
}

// Helper funtions
