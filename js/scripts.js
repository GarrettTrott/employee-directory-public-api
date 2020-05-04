let directory = null;
const directorySize = 12;
const searchDiv = document.querySelector(".search-container");
const galleryDiv = document.querySelector("#gallery");
const noResults = document.createElement("H2");
noResults.textContent = "No Search Results....";

searchDiv.innerHTML = `
<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`;

// FETCH Functions
function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then((res) => res.json())
    .catch((error) =>
      console.log("Looks like there was in issue with your request...", error)
    );
}

//------- Helper functions ---------
//----------------------------------

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

//
function createDirectory(data) {
  let employeeArray = [];
  data.results.forEach((employee) => {
    const person = {
      image: employee.picture.large,
      name: `${employee.name.first} ${employee.name.last}`,
      email: employee.email,
      cityState: `${employee.location.city}, ${employee.location.state}`,
      phone: employee.phone,
      street: `${employee.location.street.number} ${employee.location.street.name}`,
      zip: employee.location.postcode,
      birthday: dobToDate(employee.dob.date),
    };
    employeeArray.push(person);
  });
  directory = employeeArray;
  return employeeArray;
}

//Turns API DOB string to date string *ex: "02/22/12"
function dobToDate(dob) {
  const strArray = dob.split("");
  const year = strArray.slice(0, 4).join("");
  const month = strArray.slice(5, 7).join("");
  const day = strArray.slice(8, 10).join("");
  const date = [month, "/", day, "/", year].flat().join("");
  return date;
}
// function that pulls 12 random US employees
function generateGallery(directory) {
  let cards = "";
  directory.forEach((employee) => {
    cards += `
    <div class="card">
    <div class="card-img-container">
    <img class="card-img" src="${employee.image}" alt="profile picture">
    </div>
    <div class="card-info-container">
    <h3 id="name" class="card-name cap">${employee.name}</h3>
    <p class="card-text">${employee.email}</p>
    <p class="card-text cap">${employee.cityState}</p>
    </div>
    </div>  
    `;
  });
  galleryDiv.innerHTML = cards;
}

//function that generates modal markup
function generateModal(index) {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  const modalHTML = `
  <div class="modal">
  <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
  <div class="modal-info-container">
  <img class="modal-img" src="${directory[index].image}" alt="profile picture">
  <h3 id="name" class="modal-name cap">${directory[index].name}</h3>
  <p class="modal-text">${directory[index].email}</p>
  <p class="modal-text cap">${directory[index].cityState}</p>
  <hr>
  <p class="modal-text">${directory[index].phone}</p>
  <p class="modal-text">${directory[index].street}</p>
  <p class="modal-text">${directory[index].birthday}</p>
  </div>
  </div>
  <div class="modal-btn-container">
  <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
  <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>
  `;

  modalContainer.innerHTML = modalHTML;
  galleryDiv.insertAdjacentElement("afterend", modalContainer);

  const modalClose = document.querySelector("#modal-close-btn");
  const modalButtons = document.querySelector(".modal-btn-container");

  modalClose.addEventListener("click", () => {
    modalContainer.remove();
  });

  modalButtons.addEventListener("click", (e) => {
    let currentIndex = index;
    if (e.target.textContent === "Prev") {
      modalContainer.remove();
      if (currentIndex === 0) {
        generateModal(directorySize - 1);
      } else if (currentIndex <= directorySize - 1) {
        generateModal(currentIndex - 1);
      }
    } else if (e.target.textContent === "Next") {
      modalContainer.remove();
      if (currentIndex === directorySize - 1) {
        generateModal(0);
      } else if (currentIndex <= directorySize - 1) {
        generateModal(currentIndex + 1);
      }
    }
  });
}

fetchData(`https://randomuser.me/api/?nat=us&results=${directorySize}`)
  .then((data) => createDirectory(data))
  .then((directory) => generateGallery(directory))
  .catch((error) =>
    console.log("There was an error loading directory...", error)
  );

// Event handlers //
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-submit");

searchButton.addEventListener("click", (e) => {});

searchInput.addEventListener("keyup", () => {});

// When
galleryDiv.addEventListener("click", (e) => {
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < directory.length; i++) {
    if (
      e.target === cards[i] ||
      e.target.parentNode === cards[i] ||
      e.target.parentNode.parentNode === cards[i]
    ) {
      generateModal(i);
    }
  }
});
