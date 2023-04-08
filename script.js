var weatherDiv = document.querySelector("#weatherdata");
var buttonEl = document.querySelector("#search");
var cityDiv = document.querySelector("#cityButtons");
var searchInput = document.querySelector("#searchinput");

var cityEl = document.querySelector("#cityname");
var todayDate = document.querySelector('#date');
var todayTemp = document.querySelector('#temp');
var todayWind = document.querySelector('#wind');
var todayHumid = document.querySelector('#humid')
var todayIcon = document.querySelector('#icon');

var tomorrowIs = document.querySelector('#date2');
var tomorrowIcon = document.querySelector('#icon2');
var tomorrowTemp = document.querySelector("#temp2");
var tomorrowWind = document.querySelector('#wind2');
var tomorrowHumid = document.querySelector("#humid2");

var twoDayIs = document.querySelector('#date3');
var twoDayIcon = document.querySelector('#icon3');
var twoDayTemp = document.querySelector('#temp3');
var twoDayWind = document.querySelector("#wind3");
var twoDayHumid = document.querySelector('#humid3');

var threeDayIs = document.querySelector('#date4');
var threeDayIcon = document.querySelector('#icon4');
var threeDayTemp = document.querySelector('#temp4');
var threeWind = document.querySelector("#wind4");
var threeHumid = document.querySelector('#humid4');

var fourDayIs = document.querySelector('#date5');
var fourDayIcon = document.querySelector('#icon5');
var fourDayTemp = document.querySelector('#temp5');
var fourWind = document.querySelector("#wind5");
var fourHumid = document.querySelector('#humid5');

var fiveDayIs = document.querySelector('#date6');
var fiveDayIcon = document.querySelector('#icon6');
var fiveDayTemp = document.querySelector('#temp6');
var fiveWind = document.querySelector("#wind6");
var fiveHumid = document.querySelector('#humid6');

function getApi(event) {
    event.preventDefault();
    //Display city Data Div
    if (weatherDiv.style.display === "none") {
        weatherDiv.style.display = "block";
    }
    
    //Convert City name to Local Storage
    var cityText = document.querySelector("#searchinput");
    var cityData = JSON.stringify(cityText.value);

    localStorage.setItem("cityName", cityData);

    function showCityButton (){
        var cityButtonText = JSON.parse(localStorage.getItem("cityName"));
        var cityButton = document.createElement("button");
        cityButton.textContent = cityButtonText;
        cityDiv.append(cityButton);
        cityButton.setAttribute("Class", "citybutton");
        cityButton.setAttribute("id", "newcitybutton");

        cityButton.addEventListener("click", showPreviousCity);

        function showPreviousCity(event){
            event.preventDefault();
            searchInput.value = cityButton.textContent;
            renderCityData();
        }
    }

    showCityButton();
    renderCityData();

function renderCityData(){

    var inputValue = searchInput.value;
    //get city name and lat and long data
    var locationUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + inputValue + "&appid=4c50997e952beae527644e8960606170";

    fetch (locationUrl)
        .then (function (response) {
            return response.json();
        })
        .then (function (data){
            //assign variables for lat long
            var cityLat = data[0].lat 
            var cityLong = data[0].lon
            
            //render name and current date data
             cityEl.textContent = data[0].name + " " + dayjs().format("(M/DD/YYYY)");

        //get additional data using lat and long
        var additionalUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLong + "&appid=4c50997e952beae527644e8960606170"

        fetch (additionalUrl)
            .then (function (response) {
                return response.json();
        })
        .then (function (data){

            //data for today
            var iconToday = data.list[0].weather[0].icon;
            todayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + iconToday + "@2x.png");
            todayIcon.setAttribute("alt", "sprite of current weather conditions");

            var temperatureKel = data.list[0].main.temp;
            var tempF = Math.floor(1.8*(temperatureKel-273) + 32);
            todayTemp.textContent = "Temp: " + tempF + "°F";

            var windSpeed = data.list[0].wind.speed;
            var windMPH = windSpeed*2.2369;
            todayWind.textContent = "Wind: " + windMPH.toFixed(2) + " MPH";

            var hummidity = data.list[0].main.humidity;
            todayHumid.textContent = "Humidity: " + hummidity + "%";

            //data for tomorrow
            var tomorrowUnix = data.list[8].dt;
            var tomorrowDate = dayjs(tomorrowUnix*1000).format("M/DD/YYYY");
            tomorrowIs.textContent = tomorrowDate;

            var iconTomorrow = data.list[8].weather[0].icon;
            tomorrowIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + iconTomorrow + "@2x.png");
            tomorrowIcon.setAttribute("alt", "sprite of current weather conditions");

            var tempTomorrowKel = data.list[8].main.temp;
            var tempTomorrowF = Math.floor(1.8*(tempTomorrowKel-273) + 32);
            tomorrowTemp.textContent = "Temp: " + tempTomorrowF + "°F";

            var windTomorrow = data.list[8].wind.speed;
            var windMPHTomorrow = windTomorrow*2.2369;
            tomorrowWind.textContent = "Wind: " + windMPHTomorrow.toFixed(2) + " MPH";

            var humidityTomorrow = data.list[8].main.humidity;
            tomorrowHumid.textContent = "Humidity: " + humidityTomorrow + "%";

            //data for two days out
            var twoDayUnix = data.list[16].dt;
            var twoDayDate = dayjs(twoDayUnix*1000).format("M/DD/YYYY");
            twoDayIs.textContent = twoDayDate;

            var iconTwoDay = data.list[16].weather[0].icon;
            twoDayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + iconTwoDay+ "@2x.png");
            twoDayIcon.setAttribute("alt", "sprite of current weather conditions");

            var tempTwoDayKel = data.list[16].main.temp;
            var tempTwoDayF = Math.floor(1.8*(tempTwoDayKel-273) + 32);
            twoDayTemp.textContent = "Temp: " + tempTwoDayF + "°F";

            var windTwoDay = data.list[16].wind.speed;
            var windMPHTwoDay= windTwoDay*2.2369;
            twoDayWind.textContent = "Wind: " + windMPHTwoDay.toFixed(2) + " MPH";

            var humidityTwoDay = data.list[16].main.humidity;
            twoDayHumid.textContent = "Humidity: " + humidityTwoDay + "%";

            //data for three days out
            var threeDayUnix = data.list[24].dt;
            var threeDayDate = dayjs(threeDayUnix*1000).format("M/DD/YYYY");
            threeDayIs.textContent = threeDayDate;

            var iconThreeDay = data.list[16].weather[0].icon;
            threeDayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + iconThreeDay+ "@2x.png");
            threeDayIcon.setAttribute("alt", "sprite of current weather conditions");

            var tempThreeDayKel = data.list[24].main.temp;
            var tempThreeDayF = Math.floor(1.8*(tempThreeDayKel-273) + 32);
            threeDayTemp.textContent = "Temp: " + tempThreeDayF + "°F";

            var windThreeDay = data.list[24].wind.speed;
            var windMPHThreeDay= windThreeDay*2.2369;
            threeWind.textContent = "Wind: " + windMPHThreeDay.toFixed(2) + " MPH";

            var humidityThreeDay = data.list[24].main.humidity;
            threeHumid.textContent = "Humidity: " + humidityThreeDay + "%";

            //data for four days out
            var fourDayUnix = data.list[32].dt;
            var fourDayDate = dayjs(fourDayUnix*1000).format("M/DD/YYYY");
            fourDayIs.textContent = fourDayDate;

            var iconFourDay = data.list[32].weather[0].icon;
            fourDayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + iconFourDay+ "@2x.png");
            fourDayIcon.setAttribute("alt", "sprite of current weather conditions");

            var tempfourDayKel = data.list[32].main.temp;
            var tempfourDayF = Math.floor(1.8*(tempfourDayKel-273) + 32);
            fourDayTemp.textContent = "Temp: " + tempfourDayF + "°F";

            var windfourDay = data.list[32].wind.speed;
            var windMPHFourDay= windfourDay*2.2369;
            fourWind.textContent = "Wind: " + windMPHFourDay.toFixed(2) + " MPH";

            var humidityfourDay = data.list[32].main.humidity;
            fourHumid.textContent = "Humidity: " + humidityfourDay + "%";

            //data for five days out 
            var fiveDayUnix = data.list[39].dt;
            var fiveDayDate = dayjs(fiveDayUnix*1000).format("M/DD/YYYY");
            fiveDayIs.textContent = fiveDayDate;

            var iconFiveDay = data.list[39].weather[0].icon;
            fiveDayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + iconFiveDay+ "@2x.png");
            fiveDayIcon.setAttribute("alt", "sprite of current weather conditions");

            var tempfiveDayKel = data.list[39].main.temp;
            var tempfiveDayF = Math.floor(1.8*(tempfiveDayKel-273) + 32);
            fiveDayTemp.textContent = "Temp: " + tempfiveDayF + "°F";

            var windfiveDay = data.list[39].wind.speed;
            var windMPHFiveDay= windfiveDay*2.2369;
            fiveWind.textContent = "Wind: " + windMPHFiveDay.toFixed(2) + " MPH";

            var humidityfiveDay = data.list[39].main.humidity;
            fiveHumid.textContent = "Humidity: " + humidityfiveDay + "%";


            });

            
        });

}
}

//when you click the search button pull data 
buttonEl.addEventListener("click", getApi);

searchInput.addEventListener("click", clearInputField)

function clearInputField(){
    searchInput.value = "";
}
