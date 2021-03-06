$("#mainCard").hide();



function getLocalStorage(){
var lsCities = JSON.parse(localStorage.getItem('cities'))
for(var i=0; i<lsCities.length ; i++){
  $("#list").append('<button class="button">' + lsCities[i] + '</button><br>')
}
}
//creates buttons if they have value
var citiesArr=[]
function addCityBtn() {
  if ($("#searchCity").val() !== "") {
    var city = $("#searchCity").val().trim().toUpperCase();

    citiesArr.push(city)
    localStorage.setItem('cities',JSON.stringify(citiesArr));
   
    $("#list").append('<button class="button">' + city + '</button><br>');
    return city;
  }
  else {
    var city = $("#searchCity").val().trim().toUpperCase();
    return city;
  }
}
//gets weather when button is clicked
$(document).on('click', '.button', function () {
  var city = $(this).text()
  getWeather(city)
})
//gathers all weather data
function getWeather(city) {
  $("#mainCard").show()
  $("#searchCity").val("")
  
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6b3afd9bd72f4073f1bc156249372fa6"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    $(".city").html("<h1>" + response.name + ", " + response.sys.country + " " + moment().format("(MM/DD/YYYY)") + "</h1><br>");
    $(".temperature").html("<h2>Temperature: " + (((response.main.temp - 273.15) * 1.8) + 32).toFixed(2) + " F</h2>");
    $(".humidity").html("<h2>Humidity: " + response.main.humidity + "% </h2>");
    $(".windSpeed").html("<h2>Wind Speed: " + response.wind.speed + " MPH</h2>");

    $("#date1").text(moment().add(1, 'day').format("MM/DD/YYYY"))
    $("#date2").text(moment().add(2, 'day').format("MM/DD/YYYY"))
    $("#date3").text(moment().add(3, 'day').format("MM/DD/YYYY"))
    $("#date4").text(moment().add(4, 'day').format("MM/DD/YYYY"))
    $("#date5").text(moment().add(5, 'day').format("MM/DD/YYYY"))

    var lat = response.coord.lat;
    var lon = response.coord.lon;

    var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=6b3afd9bd72f4073f1bc156249372fa6"

    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function (responseUV) {

      var temp1 = (((responseUV.daily[0].temp.day - 273.15) * 1.8) + 32).toFixed(2)
      var temp2 = (((responseUV.daily[1].temp.day - 273.15) * 1.8) + 32).toFixed(2)
      var temp3 = (((responseUV.daily[2].temp.day - 273.15) * 1.8) + 32).toFixed(2)
      var temp4 = (((responseUV.daily[3].temp.day - 273.15) * 1.8) + 32).toFixed(2)
      var temp5 = (((responseUV.daily[4].temp.day - 273.15) * 1.8) + 32).toFixed(2)

      var hum1 = responseUV.daily[0].humidity
      var hum2 = responseUV.daily[1].humidity
      var hum3 = responseUV.daily[2].humidity
      var hum4 = responseUV.daily[3].humidity
      var hum5 = responseUV.daily[4].humidity

      var icon1 = responseUV.daily[0].weather[0].icon
      var icon2 = responseUV.daily[1].weather[0].icon
      var icon3 = responseUV.daily[2].weather[0].icon
      var icon4 = responseUV.daily[3].weather[0].icon
      var icon5 = responseUV.daily[4].weather[0].icon

      var icon1url = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png"
      var icon2url = "http://openweathermap.org/img/wn/" + icon2 + "@2x.png"
      var icon3url = "http://openweathermap.org/img/wn/" + icon3 + "@2x.png"
      var icon4url = "http://openweathermap.org/img/wn/" + icon4 + "@2x.png"
      var icon5url = "http://openweathermap.org/img/wn/" + icon5 + "@2x.png"

      $("#temp1").text("Temp: " + temp1 + " °F")
      $("#temp2").text("Temp: " + temp2 + " °F")
      $("#temp3").text("Temp: " + temp3 + " °F")
      $("#temp4").text("Temp: " + temp4 + " °F")
      $("#temp5").text("Temp: " + temp5 + " °F")

      $("#hum1").text("Humidity: " + hum1 + "%")
      $("#hum2").text("Humidity: " + hum2 + "%")
      $("#hum3").text("Humidity: " + hum3 + "%")
      $("#hum4").text("Humidity: " + hum4 + "%")
      $("#hum5").text("Humidity: " + hum5 + "%")

      $("#icon1").attr("src", icon1url)
      $("#icon2").attr("src", icon2url)
      $("#icon3").attr("src", icon3url)
      $("#icon4").attr("src", icon4url)
      $("#icon5").attr("src", icon5url)

      var uvIndex = responseUV.current.uvi
      $(".uvIndex").html("<h2>UV index " + uvIndex + "</h2>");
      
      if(uvIndex<5){
        $(".uvIndex").css({"background-color":"green"})
      }
      if(uvIndex>=5 && uvIndex<=8){
        $(".uvIndex").css({"background-color":"orange"})
      }
      if(uvIndex>8){
        $(".uvIndex").css({"background-color":"red"})
      }

      var iconCode = responseUV.current.weather[0].icon
      varIconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
      $("#image").attr("src", varIconURL)
    })
  })
}

function handleGetWeather() {
  var city = addCityBtn();
  if (city.length !== 0) {
    getWeather(city);
  } else {alert("Enter city name")}
}

$("#searchBtn").on("click", handleGetWeather);
getLocalStorage();



