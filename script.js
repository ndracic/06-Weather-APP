var forecastURL;
// var date = moment().format('MMMM DD YYYY');
var history;
var cityname;
var $forecast = document.querySelector('#card');
var lat = ""
var lon = ""

//current weather
var api = {
    key: "640a83e1973db525d8014b10ebf30875",
    base: "https://api.openweathermap.org/data/2.5/"
}
// five day forecast API
var api5 = {
    key: "640a83e1973db525d8014b10ebf30875",
    base: "https://api.openweathermap.org/data/2.5/forecast?"
}

var searchbox = document.querySelector('.search-box')
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode ==13) {
        getResults(searchbox.value)
        // getuvResults(searchbox.value)
        console.log(searchbox.value)
        document.querySelector('.uvii').style.display="flex"

    }
}

//fetching info from same api manipulating the URL link with weather and forecast
function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }) .then(displayResults);
}
function getForecast () {
    fetch(`${api.base}forecast?q=${query}&units=imperial&APPID=${api.key}`)
    .then(forecast =>{
        return forecast.json();
    })
}

function displayResults (weather) {
    console.log(weather)
    let city = document.querySelector ('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`
    //set search in local storage
    localStorage.setItem('city', searchbox.value);

    let deg = document.querySelector ('.location .temp');
    deg.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`

    let Wea = document.querySelector ('.location .weather');
    Wea.innerText = weather.weather[0].main;

    var today = moment();
    $("#currentDay").text(today.format("MMMM DD, YYYY"));
}



//weather icons 
function weatherIcons() {
    for(let i=0; i<$forecast.length; i++) {
        var icon = $forecast[i].children[1].getAttribute('data-name');
        if (icon == 'clear') {
            $forecast[i].children[1].setAttribute("class", "fas fa-sun-bright")
        }
        else if (icon == 'cloudy') {
            $forecast[i].children[1].setAttribute("class", "fas fa-clouds")
        }
        else if (icon == 'rain') {
            $forecast[i].children[1].setAttribute("class", "fas fa-clouds")
        }
        else if (icon == 'snow') {
            $forecast[i].children[1].setAttribute("class", "fas fa-snowflakes")
        }
    }};

//add city to search list
function addToList() {
    var city = localStorage.getItem('city');
    searchedCities.innerHTML = ""
    searchedCities.unshift(city)

}

//local storage
//use the query search and create new button
function history() {
    if (!localStorage.getItem('city', searchbox.value))
    city = -1
    $('#search-history').appendchild('<li class= "searchedCity> type="button"</li>')
}

//get the UV index from API and display it to current
// uviUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${api.key}`
// $.ajax({
//     url: uviUrl
// })
// .then(function(newResponse) {
//     var uvi = newResponse.value;
//     $('#uv').text(uvi);
//     if (uv <= 3){
//         $('#uv').css('background-color', 'green');
//         $('#uv').css('color', "white")
//     }
//     else if (uv <= 6){
//         $('#uv').css('background-color', 'yellow');
//         $('#uv').css('color', "black")
// } 
//     else if (uv <= 9){
//         $('#uv').css('background-color', 'red');
//         $('#uv').css('color', "white")
// }}
// )