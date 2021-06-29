var apiKey = "be557329f634f4d5fc78c4e2997a1366";
var searchFormEl = document.querySelector("#search-form");
var currentDay = moment().format("MM/DD/YY");
var mainTemp = document.getElementById("mainTemp");
var mainWind = document.getElementById("mainWind");
var mainHum = document.getElementById("mainHum");
var mainUV = document.getElementById("mainUV");
var mainHeader = document.getElementById("mainHeader");
var cardHeader = document.getElementsByClassName("cardHeader");
var recent = document.getElementById("recent");
var recentClick;

// function that runs on search, has error for an attempted search with nothing entered
// gets value entered into the search form and runs searchApi function with it
function formSubmit(event){
    event.preventDefault();

    var searchInputVal = document.querySelector('#city').value;

    if (!searchInputVal) {
        alert("'You need to enter a city to search!'");
        return;
      }


    if(mainUV.classList.contains("low", "high", "moderate", "veryHigh", "extreme")){
        mainUV.classList.remove("low", "high", "moderate", "veryHigh", "extreme");
    }

    searchApi(searchInputVal);
}

// parameter is city name that was searched, fetches initial values for main search and runs functions with those along with other functions with the city name
function searchApi(city){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function(response){
            return response.json();
        })
       .then(function(item){

            temp = item.main.temp;
            wind = item.wind.speed;
            hum = item.main.humidity;
            lat = item.coord.lat;
            lon = item.coord.lon;
            icon = item.weather[0].icon;
            writeTemp(temp, wind, hum, icon);
            getUV(lat,lon);
            localStorage.setItem(city, item);
        })

        forecast(city);
        fillText(city);
        makeRecent(city);
    }

//writes city and current date in main section
function fillText(city){
    mainHeader.textContent = city + "   " + currentDay;
}

//writes temp, wind, humidity, and icon in main section
function writeTemp(temp, wind, hum, icon){
   
    mainIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
    mainTemp.textContent = "Temp: " + temp + "°F";
    mainWind.textContent = "Wind: " + wind + " mph";
    mainHum.textContent = "Humidity: " + hum + "%";

}

// runs another api call using latitude and longitude from initial to get uvi rating
function getUV(lat,lon) {
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=" + apiKey;

    fetch(apiUrl2)
    .then(function(response){
        return response.json();
    })
   .then(function(item){
    
        uvi = item.current.uvi;
        writeUV(uvi);

    })

}

// writes the uvi from getUV function and adds classes to color it based on its rating
function writeUV(uvi) {
    mainUV.textContent = "UVI: " + uvi;


    switch(true){
        case( uvi < 3):
            mainUV.classList.add("low");
            break;
        
        case (uvi < 6):
            mainUV.classList.add("moderate");
            break;
        
        case (uvi < 8):
            mainUV.classList.add("high");
            break;

        case (uvi < 11):
            mainUV.classList.add("veryHigh")
            break;

        case(uvi >= 11):
            mainUV.classList.add("extreme");
            break;

    }
        
}

// another api call was needed for the five day forecast because the previous one did not contain a 5 day forecast
function forecast(city) {
    var apiUrl3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(apiUrl3)
    .then(function(response){
        return response.json();
    })
   .then(function(item){
        forecastArray = item.list;
        fillCards(forecastArray);
    })
}

// this writes the information for the cards
// this is a five day forecast in 3 hour intervals so that is why the four loop is run in multiples of 8
function fillCards(forecastArray){

    for(var i = 0; i < 5; i ++){
        var cardTemp = document.getElementById("cardTemp" + i);
        var cardWind = document.getElementById("cardWind" + i);
        var cardHum = document.getElementById("cardHum" + i);
        var cardHeader = document.getElementById("cardHeader" + i);
        var cardIcon = document.getElementById("cardIcon" + i);

        var temp = forecastArray[8*i].main.temp;
        var wind = forecastArray[8*i].wind.speed;
        var hum = forecastArray[8*i].main.humidity;
        var date = forecastArray[8*i].dt;
        var icon = forecastArray[8*i].weather[0].icon;

        var newDate = moment(date*1000).format('MM/DD/YY');
        
        cardTemp.textContent = "Temp: " + temp  + "°F";
        cardWind.textContent = "Wind: " + wind + " mph";
        cardHum.textContent = "Humidity: " + hum + "%";
        cardHeader.textContent = newDate;
        cardIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
    }
}

// this makes the recent search list 
function makeRecent(city){
    var li = document.createElement("li");
    var btn = document.createElement("button");
    btn.classList.add("recentClick");
    btn.classList.add("recent-search");
    btn.textContent = city;
    btn.setAttribute("value", city);
    recent.prepend(li);
    li.appendChild(btn);
    recentClick = document.getElementsByClassName("recentClick");


}


// Event listener for submit button click
searchFormEl.addEventListener('submit', formSubmit);

// adds event listener to items within the recent search list and then runs the function based on the click event
// it then again runs the searchApi function which will fill the whole page with the city on the button they clicked 
recent.addEventListener("click", function(event){
    event.preventDefault();
    var target = event.target;
    var buttonId = target.value;
    searchApi(buttonId);

})
