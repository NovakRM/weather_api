
//===== Search History =====//
let searchHistory = []

function renderButtons() {
    $(".history").empty() // keeps repeat buttons from occurring 
    for (var i = 0; i < searchHistory.length; i++) { // Loops through the array of cities
      let newCity = $("<li>")
      // create city element as <li>, class="list-group-item"
      newCity.addClass("city list-group-item")
      newCity.attr("data-city", searchHistory[i]) // can be pointed to by "city" now that it has a data attribute
      newCity.text(searchHistory[i]) // sets text content of element 
      $(".history").append(newCity) // prepend new element to ".history"
    }
  }

$("#search-button").on("click", function(event) { //event listener for click on id="search-button"
    event.preventDefault() //keep page from refreshing onclick
    let addCity = $("#search-value").val().trim() // parse "city" value from search box
    searchHistory.push(addCity) // pushes new city into storage array, there's no order to preserve besides grabbing the most recent item
    renderButtons();
  });

  // Adding click event listeners to all elements with a class of "movie"
  $(document).on("click", ".city", displayWeatherData);

  function displayWeatherData(){
    let city = $(this).attr("data-city") //storing event target's attribute to a variable
    let openWeather = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=4e95e51be70e4eb2e6a0802e49e7422f"
    // Make ajax request 
        $.ajax({
            url: openWeather,
            method: "GET"
          }).then(function(response) { 
            //console.log("hiii :)") // checking that we're getting a response
            //console.log(response) // checking that we're getting an object 
            $("#today").empty() // making sure Div is emptied for each request so we don't repeat buttons

            let headerBlock = $("<h4>").addClass("card-title") // create element <h4> class="card-title"
            let cityName = response.name

            let now = new Date()
            let date = ("(" + now.getMonth() + 1)+"/"+now.getDate()+"/"+now.getFullYear()+")"

            let icon = $("<img>")
            icon.attr("src","http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
            headerBlock.append(icon)

            headerBlock.prepend(cityName," ",date) // append variables to <h3>, prepending because I want these to appear before icon
            $("#today").append(headerBlock) // append <h3> to #today div
            $("#today").addClass("mt-3 bg-light border rounded p-2") // class and style
          
            //===== Current Conditions =====//
            let moment = $("<div>").addClass("moment") // create element <div> class="daily" ? For sake of organization while appending, would probably be fine being appended to parent element but eh
            let parseTemp = parseInt(1.8*(response.main.temp-273)+32)
            let dailyTemp = $("<p>").text("Temperature: " + parseTemp + "°F") // create <p>  ="dailyTemp", text = "temperature " + attach today's temperature 
            let dailyHum = $("<p>").text("Humidity: " + response.main.humidity + "%") // create <p> = "dailyHum", text = "humidity " + attach today's humidity 
            let windSpd = $("<p>").text("Wind Spd: " + response.wind.speed) // create <p> = "dailyWind", text = "wind speed " + attach today's wind speed

            // Desean and Bryan explained this one to me, need to call the other part of the API with the UVI: 
            let oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ response.coord.lat + "&lon=" + response.coord.lon + "&exclude=alerts&appid=4e95e51be70e4eb2e6a0802e49e7422f";
            $.ajax({
                url: oneCallURL,
                method: "GET"
              }).then(function(response) {
                console.log(response);
                let dailyUV = $("<p>").text("UVI: " + response.current.uvi)
                    if (parseInt(response.current.uvi) < 3) { //conditionals for favorable, moderate, or severe [add classes for success, warning, danger]
                      dailyUV.attr("class", "bg-success") 
                    }else if(response.current.uvi < 8) {
                      dailyUV.attr("class", "bg-warning")
                    }else{
                      dailyUV.attr("class", "bg-danger")
                    }
                  //UVI area DONE// :)
            moment.append(dailyTemp, dailyHum, windSpd, dailyUV) // append all items to <div> class="daily"
            $("#today").append(moment) // append <div> class="daily" to #today div        
      
        //===== 5-Day Forecast =====//
          $("#forecast").empty() // making sure Div is emptied for each request so we don't repeat buttons
          $("#forecast").addClass("mt-3 bg-light border rounded p-2") // create element <div> with class of "card-group"
          let forecastDiv = $("<div>").addClass("card-group")
          let fiveDayHeading = $("<h4>").addClass("card-title").text("5-Day Forecast") // create element <h3> class="card-title" -- text = "5-day forecast"
          $("#forecast").append(fiveDayHeading, forecastDiv)// append element to #forecast div

        for (let i= 1; i< 6; i++){// for loop, if i is less than six, add another forecast card
          let forecastCard = $("<div>").addClass("mt-3 bg-primary text-light border rounded p-2") // create element <div> with class of "card", add style rules for white text and bg-primary I think.
          let event = new Date(response.daily[i].dt*1000);
          let week = $("<h5><strong>"+ event.toDateString() + "</strong></h5>") // create <p> ID="date", text = parseInt the date so it shows up as a string? Or will it return the value as a string? Try string first. Have to consider this for all numbers actually, we'll find out
          // create <p> ID="weatherIcon", get response for weather icon CANT SEEM TO DO THIS ONE?   
          let temp = (response.daily[i].temp.day)
          temp = parseInt(1.8*(temp-273)+32)
          tempForecast = $("<p>").text("Temperature: " + temp + "°F") // create <p> ID="temp", text = "temp " + attach temperature  
          let humidity = $("<p>").text("Humidity: " + response.daily[i].humidity + "%") // create <p> ID="hum", text = "humidity " + attach humidity  
          $(forecastCard).append(week, tempForecast, humidity) //append all to their card
          $(forecastDiv).append(forecastCard) //append cards to cardgroup
        }
      })  
    })
  }
