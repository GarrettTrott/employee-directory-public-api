let directory = null;
const searchDiv = document.querySelector(".search-container");
const galleryDiv = document.querySelector("#gallery");

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

//Turns API DOB string to date string *ex: 02/22/12
function dobToDate(dob) {
  const strArray = dob.split("");

  const year = strArray.slice(0, 4).join("");
  const month = strArray.slice(5, 7).join("");
  const day = strArray.slice(8, 10).join("");

  const date = [month, "/", day, "/", year].flat().join("");
  return date;
}

// generates employee card markup
function generateCard(image, name, email, cityState) {
  const cardHTML = `
    <div class="card">
      <div class="card-img-container">
        <img class="card-img" src="${image}" alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${name}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${cityState}</p>
      </div>
    </div>  
  `;
  return cardHTML;
}

// function that pulls 12 random US employees
function generateGallery(directory) {
  let cards = "";
  directory.forEach((employee) => {
    cards += generateCard(
      employee.image,
      employee.name,
      employee.email,
      employee.cityState
    );
  });
  galleryDiv.innerHTML = cards;
}

//function that generates modal markup
function generateModal(index) {
  const modalHTML = `
  <div class="modal-container">
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
        <img class="modal-img" src="${directory.results[index].picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
        <p class="modal-text">email</p>
        <p class="modal-text cap">city</p>
        <hr>
        <p class="modal-text">(555) 555-5555</p>
        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
      </div>
    </div>
    <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
  </div>
  `;
  return modalHTML;
}

fetchData(`https://randomuser.me/api/?nat=us&results=12`)
  .then((data) => createDirectory(data))
  .then((directory) => generateGallery(directory))
  .catch((error) =>
    console.log("There was an error loading directory...", error)
  );

// Event handlers

const employeeCards = document.querySelector("#gallery");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-submit");

employeeCards.addEventListener("click", (e) => {});

searchButton.addEventListener("click", (e) => {});

searchInput.addEventListener("keyup", () => {});
