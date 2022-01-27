$(document).ready(function () {
  // Api Key
  const nasaApiKey = "31bgnwZEP4zsKJHZeVH7vEEez47UVCe8k62awaSG";

  // Define HTML elements
  const DateInput = document.getElementById("start-date-input");
  const searchForm = document.getElementById("form-search");
  const searchBtn = document.getElementById("search-button");
  const apodImgEl = document.getElementById("last-img");

  // picture carousel elements
  const carouselSlideshow = document.querySelector(".slideshow-carousel");
  const carouselImages = document.querySelectorAll(".slideshow-carousel img");
  const prevBtn = document.querySelector("#prev-btn");
  const nextBtn = document.querySelector("#next-btn");
  const imageSize = carouselImages[0].clientWidth;
  var imageCounter = 0;

  // Get data from API
  function getNeoData(date) {
    // Build the URL using user input date & api key
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${nasaApiKey}`;

    // Return the data
    return fetch(url).then(function (response) {
      return response.json();
    });
  }

  function getAPOD(date) {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${date}`;

    // Return the data
    return fetch(url).then(function (response) {
      return response.json();
    });
  }

  // When the user submits a search
  searchForm.addEventListener("submit", function (event) {
    // Prevent the page from reloading
    event.preventDefault();
    // Create a variable that is the user input value
    const date = DateInput.value;
    // Set the submitted date in local storage
    localStorage.setItem("savedDateKey", date);

    // Get the data from the api
    getNeoData(date).then(function (data) {
      // Define asteroid table as a variable
      const tableRow = document.getElementById("asteroid-table-row");
      // Define asteroids as every asteroid on the date that was searched
      const asteroids = data.near_earth_objects[date];

      // For each asteroid in data create a row
      for (let index = 0; index < asteroids.length; index++) {
        const asteroid = asteroids[index];

        // create and append elements for list an fill them with data from api
        const row = createAsteroidRow(
          asteroid.name,
          date,
          asteroid.id,
          asteroid.estimated_diameter.kilometers.estimated_diameter_max,
          asteroid.is_potentially_hazardous_asteroid
        );

        tableRow.appendChild(row);
      }
    });
    getAPOD(date).then(function (data) {
      apodImgEl.src = data.url;
    });
  });

  // Function to build the table with data
  function createAsteroidRow(name, date, id, diameter, isHazard) {
    const asteroidRow = document.createElement("tr");
    const nameEl = document.createElement("th");
    const nameClass =
      "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left";
    nameEl.setAttribute("class", nameClass);
    nameEl.textContent = name;
    asteroidRow.appendChild(nameEl);

    const dateEl = document.createElement("td");
    const dateClass =
      "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4";
    dateEl.setAttribute("class", dateClass);
    dateEl.textContent = date;
    asteroidRow.appendChild(dateEl);

    const idEl = document.createElement("td");
    const idClass =
      "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4";
    idEl.setAttribute("class", idClass);
    idEl.textContent = id;
    asteroidRow.appendChild(idEl);

    const diameterEl = document.createElement("td");
    const diameterClass =
      "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4";
    diameterEl.setAttribute("class", diameterClass);
    diameterEl.textContent = diameter;
    asteroidRow.appendChild(diameterEl);

    const isHazardEl = document.createElement("td");
    const isHazardClass =
      "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4";
    isHazardEl.setAttribute("class", isHazardClass);
    isHazardEl.textContent = isHazard;
    asteroidRow.appendChild(isHazardEl);

    return asteroidRow;
  }

  // function to load the last search onto the page
  if (localStorage.getItem("savedDateKey") !== null) {
    function loadLastSearch() {
      var savedDate = localStorage.getItem("savedDateKey");
      DateInput.value = savedDate;
      getNeoData(savedDate).then(function (data) {
        const tableRow = document.getElementById("asteroid-table-row");
        const asteroids = data.near_earth_objects[savedDate];
        console.log(asteroids);

        // For each asteroid in data we want a row
        for (let index = 0; index < asteroids.length; index++) {
          const asteroid = asteroids[index];

          // create and append elements for list an fill them with data from api
          const row = createAsteroidRow(
            asteroid.name,
            savedDate,
            asteroid.id,
            asteroid.estimated_diameter.kilometers.estimated_diameter_max,
            asteroid.is_potentially_hazardous_asteroid
          );

          tableRow.appendChild(row);
        }
      });
    }
    loadLastSearch();
  }
  console.log(localStorage);
  // PICTURE SLIDESHOW JS//
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
});
