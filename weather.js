$(document).ready(function () {
 function showIcon(weatherType) {
     if (weatherType === 'Rain') {
         return '<i class="fas fa-cloud-rain fa-2x"></i>'
     }
     if (weatherType === "Clouds") {
         return '<i class="fas fa-cloud fa-2x"></i>'
     }
     if (weatherType === "Clear") {
         return '<i class="fas fa-sun fa-2x"></i>'
     }
     return weatherType;
 }
 var apiKey = "e732b1e956b972314469ea1ce19d3f86";
 

    $('#form').submit(function(event) {
        event.preventDefault();

        var city =$('#location').val();
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial",
        })
        .then(function(response) {
            for(var i = 0; i < response.list.length; i+=8) {
                var html= `
                   
                       <div class="card">
                           <div class="card-body">
                               <h3 class="card-title">${moment(response.list[i].dt_txt).format('MM/DD/YYYY')}</h3>
   
                               ${showIcon(response.list[i].weather[0].main)}
   
   
                               <p>Temperature: ${response.list[i].main.temp} F</p>
                               <p>Humidity: ${response.list[i].main.humidity} %</p>
                           </div>
                       </div>
                   
                `;
                $('#forecast').append(html);
            }
            console.log(response)
        })
        .catch(function(error) {
            console.log(error);
        });

        let cities = JSON.parse(localStorage.getItem('cities'));
        if (cities === null) {
            cities = [];
        }
        
        cities.push(city);
        let html = `
            <li class="list-group-item">${city}</li>
        `;

        $('#cities-list').append(html)
        localStorage.setItem('cities', JSON.stringify(cities));
    });

    // retrieving cites from
    let cities = JSON.parse(localStorage.getItem('cities'));
    if (cities !== null) {
        for (let i = 0; i < cities.length; i +=1) {
            let html = `
                <li class="list-group-item">${cities[i]}</li>
            `;

            $('#cities-list').append(html);
        }

        let [city]= cities;

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial",
        })
        .then(function(response) {
            for(var i = 0; i < response.list.length; i+=8) {
                var html= `
                   
                       <div class="card">
                           <div class="card-body">
                               <h3 class="card-title">${moment(response.list[i].dt_txt).format('MM/DD/YYYY')}</h3>
   
                               ${showIcon(response.list[i].weather[0].main)}
   
   
                               <p>Temperature: ${response.list[i].main.temp} F</p>
                               <p>Humidity: ${response.list[i].main.humidity} %</p>
                           </div>
                       </div>
                   
                `;
                $('#forecast').append(html);
            }
            console.log(response)
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    
 });
