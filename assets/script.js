
var searchbtn = document.getElementById("search-button")
var currentDayBox = document.getElementById("current-day")
var fiveDayBox = document.getElementById("fiveday-containers")
var locationOptions = document.getElementById("location-options")
var currentweatherDiv = document.getElementById("current-weather")



var getCurrentweather = function (event) {
   event.preventDefault()

var searchlocation = document.getElementById("searched-location").value;
var currentweatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchlocation}&appid=205fd71bd6dc44c3796f99ccb183c2cc&units=imperial`;



fetch(currentweatherURL).then(function (response) {
    return response.json();
    })
    .then(function (data) {
        let nameparagraph = document.createElement('p')
        nameparagraph.innerHTML = `City Name: ${data.name}`
        let humidityparagraph = document.createElement('p')
        humidityparagraph.innerHTML = `Humidity: ${data.main.humidity}%`
        let tempParagraph = document.createElement(`p`)
        tempParagraph.innerHTML = `Temperature: ${data.main.temp}`
        let windparagraph = document.createElement(`p`)
        windparagraph.innerHTML = `Wind: ${data.wind.speed} MPH`

        currentweatherDiv.append(nameparagraph, humidityparagraph, tempParagraph, windparagraph)
        
getForecastweather(data.name)
    })

localStorage.setItem(`cityname`, JSON.stringify(searchlocation))

}


function getForecastweather (cityname){

    var forecastweatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=205fd71bd6dc44c3796f99ccb183c2cc&units=imperial`

    fetch(forecastweatherURL).then(function (response){
    return response.json();
    })
    .then(function (data){
        console.log(data)
        let dataList = data.list
       for (let index = 0; index < dataList.length; index+=8) {
    console.log(dataList[index])
    fiveDayBox.style.display="flex"
    let weatherdiv = document.createElement(`div`)

        let dateparagraph = document.createElement(`p`)
        dateparagraph.innerHTML = `Date: ${dataList[index].dt_txt}`
        let humidityparagraph = document.createElement('p')
        humidityparagraph.innerHTML = `Humidity: ${dataList[index].main.humidity}%`
        let tempParagraph = document.createElement(`p`)
        tempParagraph.innerHTML = `Temperature: ${dataList[index].main.temp}`
        let windparagraph = document.createElement(`p`)
        windparagraph.innerHTML = `Wind: ${dataList[index].wind.speed} MPH`

        weatherdiv.append(dateparagraph, humidityparagraph, tempParagraph, windparagraph)
fiveDayBox.append(weatherdiv)
       }


    }
    )
}





searchbtn.addEventListener("click", getCurrentweather);


