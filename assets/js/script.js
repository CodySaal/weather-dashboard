var form = document.querySelector("form");
var searchInput = document.getElementById("citySearch");
var searchBtn = document.getElementById("searchBtn");
var searchHistoryEl = document.getElementById("searchHistory")
var cityInfoEl = document.getElementById("cityDate");
var conditionsList = document.getElementById("conditions");
var futureForcastEl = document.getElementById("fiveDay")
var currentIcon = document.getElementById("icon")


var key = "f6b1dc9de10dbbcfdf4c08cf6f933425";
var pastSearches = [];
var date = new Date().toLocaleDateString();
console.log(date);
// var cityLat 
// var cityLon

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
            displayName = coordinates[0].name
            cityLat = coordinates[0].lat;
            cityLon = coordinates[0].lon;
            console.log(cityLat)
            console.log(cityLon)
            cityInfoEl.innerHTML = displayName + " (" + date + ") ";
            getCurrentWeather(cityLat, cityLon);
        })
        
}
function getCurrentWeather(cityLat, cityLon){
    // get one day forecast
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + key)
        .then(function(response){
            return response.json();
        })
        .then(function(currentWeather){
            console.log(currentWeather)
            console.log(currentWeather.main.temp)
            getFutureWeather(cityLat, cityLon);
            var icon = "http://openweathermap.org/img/wn/" + currentWeather.weather[0].icon + "@2x.png";
            var iconAlt = currentWeather.weather[0].description;
            console.log(icon)
            var createIconEl = document.createElement("img");
            var currentTemp = currentWeather.main.temp;
            var createCurrentTempEl = document.createElement("li");
            createCurrentTempEl.textContent = "Temp: " + currentTemp + " °F";
            conditionsList.appendChild(createCurrentTempEl);
            var currentWind = currentWeather.wind.speed;
            var createCurrentWindEl = document.createElement("li");
            createCurrentWindEl.textContent = "Wind: " + currentWind + " MPH";
            conditionsList.appendChild(createCurrentWindEl);
            var currentHumidity = currentWeather.main.humidity;
            var createCurrentHumidityEl = document.createElement("li");
            createCurrentHumidityEl.textContent = "Humidity: " + currentHumidity + " %";
            conditionsList.appendChild(createCurrentHumidityEl);
            createIconEl.setAttribute("src", icon);
            createIconEl.setAttribute("alt", iconAlt);
            cityInfoEl.appendChild(createIconEl);
           
        })
}

function getFutureWeather(cityLat, cityLon){
    // get five day forecast
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + key)
        .then(function(response){
            return response.json();
        })
        .then(function(futureWeather){
            console.log(futureWeather)
            console.log(futureWeather.list[0].dt_txt)
            for (var i = 0; i < futureWeather.list.length; i++) {
                if (futureWeather.list[i].dt_txt.includes("12:00:00")){
                    console.log("Working")
                    var forecastCard = document.createElement("div");
                    var cardDate = document.createElement("h3")
                    var forecastIcon = document.createElement("img")
                    var forecastConditions = document.createElement("ul")
                    var tempItem = document.createElement("li")
                    var windItem = document.createElement("li")
                    var humidityItem = document.createElement("li")

                    var futureIcon = "http://openweathermap.org/img/wn/" + futureWeather.list[i].weather[0].icon + "@2x.png";
                    var futureIconAlt = futureWeather.list[i].weather[0].description;

                    tempItem.textContent = "Temp: " + futureWeather.list[i].main.temp + " °F"
                    windItem.textContent = "Wind: " + futureWeather.list[i].wind.speed + " MPH"
                    humidityItem.textContent = "Humidity: " + futureWeather.list[i].main.humidity + " %"
                    forecastCard.setAttribute("class", "col text-white bg-secondary")
                    forecastIcon.setAttribute("src", futureIcon);
                    forecastIcon.setAttribute("alt", futureIconAlt);
                    futureForcastEl.appendChild(forecastCard)
                    forecastCard.appendChild(forecastIcon);
                    forecastCard.appendChild(forecastConditions);
                    forecastConditions.appendChild(tempItem)
                    forecastConditions.appendChild(windItem)
                    forecastConditions.appendChild(humidityItem)

                }
            } 
        })
}

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
