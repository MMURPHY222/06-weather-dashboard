var apiKey = "be557329f634f4d5fc78c4e2997a1366";
var searchFormEl = document.querySelector("#search-form");
var currentDay = moment().format("MM/DD/YY");
var mainTemp = document.getElementById("mainTemp");
var mainWind = document.getElementById("mainWind");
var mainHum = document.getElementById("mainHum");
var mainUV = document.getElementById("mainUV");
var mainHeader = document.getElementById("mainHeader");
var cardHeader = document.getElementsByClassName("cardHeader");


function formSubmit(event){
    event.preventDefault();

    var searchInputVal = document.querySelector('#city').value;

    if (!searchInputVal) {
        console.error('You need to enter a city to search!');
        alert("'You need to enter a city to search!'");
        return;
      }

    console.log("What are you " + searchInputVal);

    searchApi(searchInputVal);
}

function searchApi(city){
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function(response){
            return response.json();
        })
       .then(function(item){
            console.log(item);

            temp = item.main.temp;
            wind = item.wind.speed;
            hum = item.main.humidity;
            lat = item.coord.lat;
            lon = item.coord.lon;
            console.log("This is temp " + temp);
            console.log("This is wind " + wind)
            writeTemp(temp, wind, hum);
            getUV(lat,lon);
        })

        forecast(city);
        fillText(city);
    }

function fillText(city){
    console.log(city, currentDay);
    mainHeader.textContent = city + "   " + currentDay;
}

function writeTemp(temp, wind, hum){
    console.log("Can I use this here? " + temp);
    mainTemp.textContent = "Temp: " + temp + "°F";
    mainWind.textContent = "Wind: " + wind + " mph";
    mainHum.textContent = "Humidity: " + hum + "%";

}

function getUV(lat,lon) {
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=" + apiKey;

    fetch(apiUrl2)
    .then(function(response){
        return response.json();
    })
   .then(function(item){
        console.log("Whatever is under me is the call to get UV using lat and lon");
        console.log(item);

        uvi = item.current.uvi;
        writeUV(uvi);

    })

}

function writeUV(uvi) {
    mainUV.textContent = "UVI: " + uvi;

    if (uvi < 3 ){
        mainUV.classList.add("low");

    } 
    
    if (3 <= uvi < 6){
        mainUV.classList.add("moderate");

    }
    
    if (6 <= uvi < 8){
        mainUV.classList.add("high");

    }
    
    if (8 <= uvi < 11) {
        mainUV.classList.add("veryHigh")

    }
    
    if (11 <= uvi) {
        mainUV.classList.add("extreme")
    }
}

function forecast(city) {
    var apiUrl3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=5&appid=" + apiKey;

    fetch(apiUrl3)
    .then(function(response){
        return response.json();
    })
   .then(function(item){
        console.log("My underside is supposed to be 5 day forecast");
        console.log(item);
        forecastArray = item.list;
        fillCards(forecastArray);
    })
}

function fillCards(forecastArray){
    console.log("Under me is supposed to be an array of 5 days");
    console.log(forecastArray);

    for(var i = 0; i < 5; i ++){
        var cardTemp = document.getElementById("cardTemp" + i);
        var cardWind = document.getElementById("cardWind" + i);
        var cardHum = document.getElementById("cardHum" + i);

        console.log("POOP" + cardTemp);

        var temp = forecastArray[i].main.temp;
        var wind = forecastArray[i].wind.speed;
        var hum = forecastArray[i].main.humidity;

        cardTemp.textContent = "Temp: " + temp  + "°F";
        cardWind.textContent = "Wind: " + wind + " mph";
        cardHum.textContent = "Humidity: " + hum + "%";

        console.log("TEMP " + i + " " + temp);
        console.log("Wind " + i + " " + wind);
        console.log("Hum " + i + " " + hum);
    }
}


searchFormEl.addEventListener('submit', formSubmit);