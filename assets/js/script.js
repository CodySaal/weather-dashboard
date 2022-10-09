var form = document.querySelector("form");
var searchInput = document.getElementById("citySearch");
var searchBtn = document.getElementById("searchBtn");
var searchHistoryEl = document.getElementById("searchHistory")
var cityInfoEl = document.getElementById("cityDate");
var conditionsList = document.getElementById("conditions");
var futureForcastEl = document.getElementById("futureWeather")

var key = "f6b1dc9de10dbbcfdf4c08cf6f933425";
var pastSearches = [];

// Main function
function handleSearch(event){
    event.preventDefault();
    // get name of city
    var cityName = searchInput.value
    // geoAPI function
    // current weather api function
    // 5 day forecast function
}

form.addEventListener("submit", handleSearch)