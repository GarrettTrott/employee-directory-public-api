const searchDiv = document.querySelector(".search-container");
const galleryDiv = document.querySelector("#gallery");

// Create search elements
const searchForm = document.createElement("form");
const searchInput = document.createElement("input");
const submitButton = document.createElement("input");

// Add search form attributes
searchForm.setAttribute("action", "#");
searchForm.setAttribute("method", "get");

searchInput.setAttribute("type", "search");
searchInput.id = "search-input";
searchInput.classList.add = "search-input";
searchInput.setAttribute("placeholder", "Search...");

submitButton.setAttribute("type", "submit");
submitButton.value = "&#x1F50D;";
submitButton.id = "search-submit";
submitButton.classList.add("search-submit");

// append search elements
searchDiv.appendChild(searchForm);
searchForm.appendChild(searchInput);
searchForm.appendChild(submitButton);

// FETCH Functions
function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then((res) => res.json())
    .catch((error) =>
      console.log("Looks like there was in issue with your request...", error)
    );
}

// Helper functions

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function generateCard(image, first, last, email, city, state) {
  const cardHTML = `
    <div class="card">
      <div class="card-img-container">
        <img class="card-img" src="${image}" alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${first} ${last}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${city}, ${state}</p>
      </div>
    </div>
  `;
  return cardHTML;
}

// Get 12 Random Users from API
fetchData("https://randomuser.me/api/?results=12").then((data) =>
  console.log(data.results)
);
