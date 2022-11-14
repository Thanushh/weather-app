
let city 

const API_KEY = process.env.WEATHER_API_KEY;

//To get the weather data ...
function getData() {
    city = document.getElementById("city-name").value
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
fetch(API_URL)
        .then(res => res.json())
        .then(apiData => {
            if (apiData.name == undefined) {
                alert(`This city is not found :(`)
            }
            else {
                weather(apiData)
            }
        })
        .catch("Server has some problem")
}
//To get the city background image...
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.WEATHER_API_KEY,
		'X-RapidAPI-Host': 'joj-image-search.p.rapidapi.com'
	}
};
function getImage() {
    fetch(`https://joj-image-search.p.rapidapi.com/v2/?q=${city}&hl=en`, options)
	.then(response => response.json())
        .then(imageData => {
            if (city == undefined) {
                alert(`This image is not found :(`)
            }
            else {
                image(imageData);
            }
        })
        .catch(err => console.error(err));
}

function image ( imageData) {
    let image_url = imageData.response.images[0].image.url
    document.getElementById("cont-bg").style.backgroundImage =`url(${image_url})`;
}

function weather(apiData) {
    let place = document.getElementById('place')
    place.innerHTML = `Weather in ${apiData.name}`;

    let temperature = document.getElementById('temp')
    temperature.innerHTML = `${apiData.main.temp}°C`;

    let weatherIcon = document.querySelector('.weather-icon')
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${apiData.weather[0].icon}.png"/>`

    const smallCase = apiData.weather[0].description;
    const upperCase = smallCase.charAt(0).toUpperCase() + smallCase.slice(1);
    let info = document.querySelector('.info')
    info.innerHTML = `${upperCase}`;

    let cityHumidity = document.getElementById('humidity')
    cityHumidity.innerHTML = `Humidity: ${apiData.main.humidity}%`;

    let cityWindSpeed = document.getElementById('wind-speed')
    cityWindSpeed.innerHTML = `Wind Speed: ${apiData.wind.speed}km/h`;
}


