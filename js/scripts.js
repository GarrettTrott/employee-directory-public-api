let directory = null;
const directorySize = 12;

const searchDiv = document.querySelector(".search-container");
searchDiv.innerHTML = `
  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
  `;
const searchButton = document.querySelector("#search-submit");
const searchInput = document.querySelector("#search-input");

const galleryDiv = document.querySelector("#gallery");
const noResults = document.createElement("h3");
noResults.textContent = "No Search Results....";
noResults.style.display = "none";

const modalContainer = document.createElement("div");
modalContainer.classList.add("modal-container");
modalContainer.style.display = "none";
galleryDiv.insertAdjacentElement("afterend", modalContainer);

function searchNames(input) {
  const galleryNames = document.querySelectorAll(".card-name");
  let searchResults = [];
  noResults.style.display = "none";

  galleryNames.forEach((name) => {
    if (
      name.textContent.toLowerCase().indexOf(input.value.toLowerCase()) > -1
    ) {
      searchResults.push(name.textContent);
      name.parentNode.parentNode.style.display = "";
    } else {
      name.parentNode.parentNode.style.display = "none";
    }
  });
  if (searchResults.length === 0) {
    noResults.style.display = "";
  }
}

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
      city: employee.location.city,
      state: employee.location.state,
      phone: employee.phone,
      street: `${employee.location.street.number} ${employee.location.street.name}`,
      zip: employee.location.postcode,
      birthday: dobToDate(employee.dob.date),
    };
    employeeArray.push(person);
  });
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
          <p class="card-text cap">${employee.city}</p>
        </div>
      </div>  
      `;
  });
  galleryDiv.innerHTML = cards;
  galleryDiv.appendChild(noResults);
}

//function that generates modal markup
function generateModals(directory) {
  let modals = "";
  directory.forEach((employee) => {
    modals += `
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
          <img class="modal-img" src="${employee.image}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${employee.name}</h3>
          <p class="modal-text">${employee.email}</p>
          <p class="modal-text cap">${employee.city}</p>
          <hr>
          <p class="modal-text">${employee.phone}</p>
          <p class="modal-text">${employee.street}, ${employee.state} ${employee.zip}</p>
          <p class="modal-text">Birthday: ${employee.birthday}</p>
        </div>
      </div>
      `;
  });
  modals += `
      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
  `;
  modalContainer.innerHTML = modals;
}

fetchData(`https://randomuser.me/api/?nat=us&results=${directorySize}`)
  .then((data) => (directory = createDirectory(data)))
  .then((directory) => generateGallery(directory))
  .then(() => generateModals(directory))
  .catch((error) =>
    console.log("There was an error loading directory...", error)
  );

// Event handlers //

searchButton.addEventListener("click", (e) => {
  searchNames(searchInput);
});

searchInput.addEventListener("keyup", (e) => {
  searchNames(searchInput);
});

//When employee card is clicked generate modal
galleryDiv.addEventListener("click", (e) => {
  let selectedName = "";
  const modals = document.querySelectorAll(".modal");
  const cards = document.querySelectorAll(".card");

  console.log(e.target);
  cards.forEach((employee) => {
    if (e.target.className === "card") {
      selectedName = e.target.lastChild.firstChild.textContent;
      console.log(selectedName);
    } else if (e.target.className === "card-img-container") {
      selectedName = e.target.nextChild.firstChild.textContent;
    }
  });

  modals.forEach((employee) => {});
});

modalContainer.addEventListener("click", (e) => {
  const modals = document.querySelectorAll(".modal");
  if (e.target.textContent === "X") {
    modals.forEach((modal) => {
      modal.style.display = "none";
    });
    modalContainer.style.display = "none";
  } else if (e.target.textContent === "Prev") {
    console.log("prev");
  } else if (e.target.textContent === "Next") {
    console.log("next");
  }
});

// modalButtons.addEventListener("click", (e) => {
//   let currentIndex = index;
//     if (e.target.textContent === "Prev") {
//       modalContainer.remove();
//       if (currentIndex === 0) {
//         generateModal(directorySize - 1);
//       } else if (currentIndex <= directorySize - 1) {
//         generateModal(currentIndex - 1);
//       }
//     } else if (e.target.textContent === "Next") {
//       modalContainer.remove();
//       if (currentIndex === directorySize - 1) {
//         generateModal(0);
//       } else if (currentIndex <= directorySize - 1) {
//         generateModal(currentIndex + 1);
//       }
//   }
// });
