$("#searchBtn").on("click", function () {
  var a = $("#searchCity").val()
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + a + "&appid=6b3afd9bd72f4073f1bc156249372fa6"
  $("#city1").text(a)

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    $(".city").html("<h1>" + response.name +", "+ response.sys.country +" "+ moment().format("(MM/DD/YYYY)") + "</h1><br>");
    $(".temperature").html("<h2>Temperature: " + (((response.main.temp - 273.15) * 1.8) + 32).toFixed(2) + " F</h2>");
    $(".humidity").html("<h2>Humidity: " + response.main.humidity + "% </h2>");
    $(".windSpeed").html("<h2>Wind Speed: " + response.wind.speed + " MPH</h2>");

    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=6b3afd9bd72f4073f1bc156249372fa6" + "&lat=" + lat + "&lon=" + lon
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function (responseUV) {
      $(".uvIndex").html("<h2>UV index " + responseUV.value + "</h2>");
    })

  })
});

