# 06-weather-dashboard

# User-Story

 ```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Description
The HTML and css are standard for this page, bootstrap grid was used to set up the layout for the page. Bootstrap cards were used for the five day forecast. Elements were predominantly generated in HTML rather than in javascript. 

## Javascript functionality
This page involved multiple api calls from openeather.api. The first uses the city input in the search bar and returns most of the values for the main section of weather data on the page. This code is within the second then statement of the fetch call and represents navigating through the data to find the values. Below you can see other functions were then called with that data. 

```bash
            temp = item.main.temp;
            wind = item.wind.speed;
            hum = item.main.humidity;
            lat = item.coord.lat;
            lon = item.coord.lon;
            icon = item.weather[0].icon;
          
            getUV(lat,lon);
            localStorage.setItem(city, item);
        })

        forecast(city);
        fillText(city);
        makeRecent(city);
```
The get UV and forecast functions have other api calls within them, while the fillText and makeRecent functions are putting text onto the page. 

The getUV function consisted of another API call using lat and lon which were gathered from the first API call, other than that it looked similar to the first. Same with the forecast function, its API call returns a five day forecast in 3 hour intervals. The info from that call was then sent to another function to write it to the page. 

# Writing the 5 Day Forecast cards

In order to write the 5 Day forecast cards, I utilized a for loop using the data from the forecast API.

```bash
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
```

Within this for loop I gathered all of the elements and made them variables as I would be editing text within them in each of this loops iteration. It runs from 0 to < 5 because that is the number of cards that need to be filled. Navigating the array of 40 values, I multiplied the variable i by 8 each time to allow for the 0 hour of 5 different days to be accessed. The first 5 values in the forecast array would simply have been fifteen hours into the first day. The date is then converted from unix time to month/day/year and added to the page. Text and icons are added after that. The API provides code for each icon and the url that goes with them so the id is the only thing that needed to change each time, rather than the entire url. 

# Local storage and a responsive recent search list

# Screenshot
## Live Link
https://mmurphy222.github.io/06-weather-dashboard/

## License
This website was used to get UVI rankings and their ratings

https://19january2017snapshot.epa.gov/sunsafety/uv-index-scale-1_.html 