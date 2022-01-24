const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const searchButton = document.getElementById("search-btn");

const apiKey = "31bgnwZEP4zsKJHZeVH7vEEez47UVCe8k62awaSG";
const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${API_KEY}`;



searchButton.addEventListener("search",function(event) {
    event.preventDefault();
    searchButton = data.apiKey, data.url;
    console.log(data);
})

//promise
return fetch(url)
    .then(function(response) {
        console.log(response)
        return response.json();
    })
