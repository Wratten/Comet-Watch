//
// define elements

// Api Key
const nasaApiKey = "31bgnwZEP4zsKJHZeVH7vEEez47UVCe8k62awaSG";

// Date Input Field
const DateInput = document.getElementById("start-date-input");

// Search form
const searchForm = document.getElementById("form-search");

// Search button
const searchBtn = document.getElementById("search-button");

// get data from api

// API FEED LOOKUP MAX 7 DAYS APART
// MUST BE FORMATTED LIKE YYYY-MM-DD eg. 2022-01-23
// https://api.nasa.gov/neo/rest/v1/feed?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${API_KEY}
// handle search input

function getNeoData(date) {
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${nasaApiKey}`;

  return fetch(url).then(function (response) {
    return response.json();
  });
}
function createAsteroidRow(name, date, id, diameter,  isHazard){
  const asteroidRow = document.createElement('tr');
  const nameEl = document.createElement('th');
  const nameClass = "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left";
  nameEl.setAttribute('class', nameClass);
  nameEl.textContent = name;
  asteroidRow.appendChild(nameEl);
  
  const dateEl = document.createElement('td');
  const dateClass = "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4";
  dateEl.setAttribute('class', dateClass);
  dateEl.textContent = date;
  asteroidRow.appendChild(dateEl);

  const idElement = document.createElement('td');
  const idClass = "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4";
  idElement.setAttribute('class', idClass);
  idElement.textContent = id;
  asteroidRow.appendChild(idElement);

  const diameterEl = document.createElement('td');
  const diameterClass = "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4";
  diameterEl.setAttribute('class', diameterClass);
  diameterEl.textContent = data.near_earth_objects[date] // TODO: identify the correct path
  asteroidRow.appendChild(diameterEl);

  const isHazard = document.createElement('td');
  const isHazardClass = "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4";
  isHazard.setAttribute('class',isHazardClass);
  isHazard.textContent = data.estimated_diameter.is_potentially_hazardous_asteroide
  asteroidRow.appendChild(isHazard.value);

  
  return asteroidRow;


  // <tr>
  //               <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
  //                 ASTEROID_NAME
  //               </th>
  //                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
  //                      4th of Jan 2022
  //                    </td>
  //              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
  //                 340
  //               </td>
  //                      <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
  //                        <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>
  //                        4km
  //                      </td>
  //               <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
  //                 <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>
  //                 False
  //               </td>
  //             </tr>

}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const date = DateInput.value;

  getNeoData(date).then(function (data) {
    console.log(data);

    const tableRow = document.getElementById('asteroid-table-row');
    const asteroids = data.near_earth_objects[date];
    
    console.log(asteroids);

    // For each asteroid in data we want a row
    for (let index = 0; index <asteroids.length; index++) {
      const asteroid = asteroids[index];
      
      
      // create and append elements for list an fill them with data from api
      const row = createAsteroidRow(asteroid.name, asteroid.date, asteroid.id, asteroid.diameter, asteroid.isHazard);

      tableRow.appendChild(row);
    
    }


    // data.near_earth_objects.DATEVARIABLE.name
    // data.near_earth_objects.DATEVARIABLE.close_approach_date_full
    // data.near_earth_objects.DATEVARIABLE.neo_reference_id
    // data.near_earth_objects.DATEVARIABLE.estimated_diameter.kilometers.estimated_diameter_min
    // data.near_earth_objects.DATEVARIABLE.estimated_diameter.kilometers.estimated_diameter_max
    // data.near_earth_objects.DATEVARIABLE.is_potentially_hazardous_asteroid
  });
});


// create and append elements for list an fill them with data from api
const tableRow = document.getElementById('asteroid-table-row');
const asteroids = data.near_earth_objects[date];

console.log(asteroids);

// For each asteroid in data we want a row
for (let index = 0; index <asteroids.length; index++) {
  const asteroid = asteroids[index];
  
  
  // create and append elements for list an fill them with data from api
  const row = createAsteroidRow(asteroid.name, asteroid.date, asteroid.id, asteroid.diameter, asteroid.isHazard);

  tableRow.appendChild(row);

}


// display new search

// PICTURE SLIDESHOW JS//
const carouselSlideshow = document.querySelector(".slideshow-carousel");
const carouselImages = document.querySelectorAll(".slideshow-carousel img");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
var imageCounter = 1;
const imageSize = carouselImages[0].clientWidth;

carouselSlideshow.style.transform =
  "translateX(" + -imageSize * imageCounter + "px)";

nextBtn.addEventListener("click", function () {
  if (imageCounter >= carouselImages.length - 1) return;
  carouselSlideshow.style.transition = "transform 0.3s ease-in-out";
  imageCounter++;
  carouselSlideshow.style.transform =
    "translateX(" + -imageSize * imageCounter + "px)";
});

prevBtn.addEventListener("click", function () {
  if (imageCounter <= 0) return;
  carouselSlideshow.style.transition = "transform 0.3s ease-in-out";
  imageCounter--;
  carouselSlideshow.style.transform =
    "translateX(" + -imageSize * imageCounter + "px)";
});

carouselSlideshow.addEventListener("transitioned", function () {
  if (carouselImages[imageCounter].id === "last-img") {
    carouselSlideshow.style.transition = "none";
    imageCounter = carouselImages.length - 2;
    carouselSlideshow.style.transform =
      "translateX(" + -imageSize * imageCounter + "px)";
  }
  if (carouselImages[imageCounter].id === "first-img") {
    carouselSlideshow.style.transition = "none";
    imageCounter = carouselImages.length - imageCounter;
    carouselSlideshow.style.transform =
      "translateX(" + -imageSize * imageCounter + "px)";
  }
});
