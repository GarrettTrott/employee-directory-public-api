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

// Helper functions
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
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

//function that generates the
function generateModal() {}

// function that pulls 12 random US employees
function generateGallery(numbOfEmployees) {
  let cards = "";
  fetchData(`https://randomuser.me/api/?nat=us&results=${numbOfEmployees}`)
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.results.length; i++) {
        const employee = {
          image: data.results[i].picture.large,
          name: `${data.results[i].name.first} ${data.results[i].name.last}`,
          email: data.results[i].email,
          cityState: `${data.results[i].location.city}, ${data.results[i].location.state}`,
          phone: data.results[i].phone,
          street: `${data.results[i].location.street.number} ${data.results[i].location.street.name}`,
          zip: data.results[i].location.postcode,
          birthday: dobToDate(data.results[i].dob.date),
        };

        cards += generateCard(
          employee.image,
          employee.name,
          employee.email,
          employee.location
        );
      }
      galleryDiv.innerHTML = cards;
    })
    .catch((error) =>
      console.log("There was an error loading directory...", error)
    );
}

generateGallery(12);

// Event handlers

const employeeCards = document.querySelectorAll(".card");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-submit");

employeeCards.addEventListener("click", (e) => {});

searchButton.addEventListener("click", (e) => {});

searchInput.addEventListener("keyup", () => {});
