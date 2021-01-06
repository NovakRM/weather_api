// store API url as a variable, create ENV to hide the key. 

// make GET request to openweather API 
   
    // then:

        //===== Search History =====//
        // event listener for click on id="search-button"

        // parse "city" value from search box into the API search URL
        // create city element as <li>, class="list-group-item"
        // prepend new element to <ul class="list-group history"> [maybe set as variable first for tidiness]
        
        // store items as array? 
        // locally store most recent city search and its data

        // for loop adding listeners to each city <li> to prompt further activity [might need unique IDs then]: 

        //===== Current Conditions =====//
        // create element <h3> class="card-title"
        // add variables for City Name, Date, and weatherIcon 
        // append variables to <h3>
        // append <h3> to #today div

        // create element <div> class="daily" ? For sake of organization while appending, would probably be fine being appended to parent element but eh
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
