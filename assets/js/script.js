var form = document.querySelector("form");
var searchInput = document.getElementById("citySearch");
var searchBtn = document.getElementById("searchBtn");
var searchHistoryEl = document.getElementById("searchHistory")
var cityInfoEl = document.getElementById("cityDate");
var conditionsList = document.getElementById("conditions");
var futureForcastEl = document.getElementById("futureWeather")

var key = "f6b1dc9de10dbbcfdf4c08cf6f933425";
var pastSearches = [];
var cityLat 
var cityLon

// Functions

function convertName(cityName){
    // convert city name to lat and lon
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + ",US&limit=1&appid=" + key)
        .then(function(response){
            return response.json();
        })
        .then(function(coordinates){
            console.log(coordinates);
            console.log(coordinates[0].lat)
            console.log(coordinates[0].lon)
            cityLat = coordinates[0].lat;
            cityLon = coordinates[0].lon
            console.log(cityLat)
            console.log(cityLon)
            getCurrentWeather(cityLat, cityLon)
        })
        
}
function getCurrentWeather(cityLat, cityLon){
    // get one day forecast
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + key)
        .then(function(response){
            return response.json();
        })
        .then(function(currentWeather){
            console.log(currentWeather)
        })
}
console.log(cityLat)

// Main function
function handleSearch(event){
    event.preventDefault();
    // get name of city
    var cityName = searchInput.value
    // geoAPI function
    convertName(cityName);
    // current weather api function
    // 5 day forecast function
}

form.addEventListener("submit", handleSearch)
