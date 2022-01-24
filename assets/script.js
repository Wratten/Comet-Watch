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

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const date = DateInput.value;

  getNeoData(date).then(function (data) {
    console.log(data);

    // data.near_earth_objects.DATEVARIABLE.name
    // data.near_earth_objects.DATEVARIABLE.close_approach_date_full
    // data.near_earth_objects.DATEVARIABLE.neo_reference_id
    // data.near_earth_objects.DATEVARIABLE.estimated_diameter.kilometers.estimated_diameter_min
    // data.near_earth_objects.DATEVARIABLE.estimated_diameter.kilometers.estimated_diameter_max
    // data.near_earth_objects.DATEVARIABLE.is_potentially_hazardous_asteroid
  });
});

// create and append elements for list an fill them with data from api

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
