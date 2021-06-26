apiKey = "be557329f634f4d5fc78c4e2997a1366";
searchFormEl = document.querySelector("#search-form");
currentDay = moment().format("MM/DD/YY");
console.log(currentDay);

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
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function(response){
            return response.json();
        })
       .then(function(item){
            console.log(item);
        })

    }

searchFormEl.addEventListener('submit', formSubmit);