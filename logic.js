
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
    
    // Make ajax request 
        $.ajax({
            url: openWeather,
            method: "GET"
          }).then(function(response) { 
            console.log("hiii :)") //checking that we're getting a response
            console.log(response) //checking that we're getting an object 
            $("#today").empty() //making sure Div is emptied for each request

            let headerBlock = $("<h4>").addClass("card-title") // create element <h3> class="card-title"
            let cityName = response.name

            let now = new Date()
            let date = ("(" + now.getMonth() + 1)+"/"+now.getDate()+"/"+now.getFullYear()+")"

            let icon = $("<img>")
            icon.attr("src", response.main.icon) //not appending right, we'll look later
            
            headerBlock.append(cityName," ",date," ",icon) // append variables to <h3>
            $("#today").append(headerBlock) // append <h3> to #today div
            $("#today").addClass("mt-3 bg-light border rounded p-2") // class and style
          })

        //===== Current Conditions =====//

        let daily = $("<div>").addClass("daily") // create element <div> class="daily" ? For sake of organization while appending, would probably be fine being appended to parent element but eh
        let parseTemp = parseInt(1.8*(response.main.temp-273)+32) //not being pointed to right, confused
        console.log(response.main.temp)
        let dailyTemp = $("<p>").text(parseTemp)
        daily.append(dailyTemp)
        $("#today").append(daily)
        // create <p> ID="dailyTemp", text = "temperature " + attach today's temperature 
        // create <p> ID="dailyHum", text = "humidity " + attach today's humidity  
        // create <p> ID="dailyWind", text = "wind speed " + attach today's wind speed
        // create <p> ID="uvIndex", text = "UV index " + attach today's wind speed 
            //conditionals for favorable, moderate, or severe [add classes for success, warning, danger]
        // append all items to <div> class="daily"
        // append <div> class="daily" to #today div

        //===== 5-Day Forecast =====//
       // create element <h3> class="card-title" -- text = "5-day forecast"
       // append element to #forecast div

        //for loop
            // create element <div> with class of "card-group"
            // create element <div> with class of "card", add style rules for white text and bg-primary I think.
            // create <p> ID="date", text = parseInt the date so it shows up as a string? Or will it return the value as a string? Try string first. Have to consider this for all numbers actually, we'll find out
            // create <p> ID="weatherIcon", get response for weather icon 
            // create <p> ID="temp", text = "temp " + attach temperature  
            // create <p> ID="hum", text = "humidity " + attach humidity  
    }
