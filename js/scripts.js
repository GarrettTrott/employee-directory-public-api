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

// generates employee card markup
function generateCard(image, name, email, location) {
  const cardHTML = `
    <div class="card">
      <div class="card-img-container">
        <img class="card-img" src="${image}" alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${name}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${location}</p>
      </div>
    </div>  
  `;
  return cardHTML;
}
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
          location: `${data.results[i].location.city}, ${data.results[i].location.state}`,
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
