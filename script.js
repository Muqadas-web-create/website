// img slide start 
let preBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
let slides = document.querySelectorAll(".slide");

let currentImg = 0;

function loadData(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
    currentImg = (currentImg + 1) % slides.length;
    loadData(currentImg);
});

preBtn.addEventListener("click", () => {
    currentImg = (currentImg - 1 + slides.length) % slides.length;
    loadData(currentImg);
});

setInterval(() => {
    currentImg = (currentImg + 1) % slides.length;
    loadData(currentImg);
}, 7000);
// img slide end 

//inputValue start
let searchForm = document.querySelector(".searchForm");
const search_city = document.querySelector(".search_city");

let city = "Lahore";

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = search_city.value.trim();

    if (cityName !== "") {
        city = cityName;
        apiData();
        search_city.value = "";
    }
});
//inputValue end

// showDateTime start
const showDateTime = (dt) => {
    const timeDate = new Date(dt * 1000);
    const DateTime = {
        weekday: "long",
        month: "long",
        year: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };

    return (timeDate.toLocaleString("en-US", DateTime));
}
// showDateTime end

// showweather intro data section start 
let weatherData = document.querySelector(".weatherData");
let temperature = document.querySelector(".temperature");
let cluds_icon = document.querySelector(".cluds_icon");
let country = document.querySelector(".country");
let feels_like = document.querySelector(".feels_like")
let dateTime = document.querySelector(".dateTime");
// showweather intro data section end


// sunset and sunrise section start
let sunsetElm = document.querySelector(".sunset");
let sunriseElm = document.querySelector(".sunrise");


// footer section start
let pressure = document.querySelector(".pressure");
let sea_leve = document.querySelector(".sea_leve");
let grnd_level = document.querySelector(".grnd_level");
let temp_min = document.querySelector(".temp_min");


const showBothSunELm = (timestamp) => {
    let date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}
// sunset and sunrise section end

// apiData function start 
const apiData = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=34639ccd64c601eb96937e47f458b12b&units=metric`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data)
        const { coord, main, name, sys, weather, dt} = data;

        //show city and country
        country.innerHTML = `${name}, ${sys.country}`;

        //show date and time
        dateTime.innerHTML = showDateTime(dt);

        //show temp and cloud icon
        temperature.innerHTML = `temp: ${main.temp.toFixed()}&#176`;
        cluds_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="weather icon">`;
        feels_like.innerHTML = `RealFeel ${main.feels_like}&#176`;

        //show map data
        showMap(coord.lat, coord.lon);


        // sunset and sunrise section start
        sunsetElm.innerHTML = `Sunset: ${showBothSunELm(data.sys.sunset)}`;
        sunriseElm.innerHTML = `Sunrise: ${showBothSunELm(data.sys.sunrise)}`;

        // footer section start
        pressure.innerHTML = `Pressure: ${data.main.pressure} hPa`;
        sea_leve.innerHTML = data.main.sea_level ? `Sea Level: ${data.main.sea_level} m` : "Sea Level: N/A";
        grnd_level.innerHTML = data.main.grnd_level ? `Ground Level: ${data.main.grnd_level} m` : "Ground Level: N/A";
        temp_min.innerHTML = `Min Temp: ${data.main.temp_min}°C`;


    } catch (error) {
        console.log(error, "api error");
    }
}
// apiData function end 

// map section start 
let mapContainer = document.querySelector(".mapContainer");
function showMap(lat, lon) {
    mapContainer.innerHTML = `<iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0"
      marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.05}%2C${lat - 0.05}%2C${lon + 0.05}%2C${lat + 0.05}&layer=mapnik&marker=${lat}%2C${lon}"> </iframe>`;
}
// map section end

// cities weather cards start 
let citiesWeatherDiv = document.querySelector(".citiesWeather");

const citiesList = [
    "Lahore", "Karachi", "Islamabad", "Multan", "Peshawar", "Faisalabad",
    "Quetta", "Rawalpindi", "Sargodha", "Bahawalnagar", "Bannu", "malakand"
];

const loadCitiesWeather = () => {
    citiesList.map(async (cityName) => {
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=34639ccd64c601eb96937e47f458b12b&units=metric`;

        try {
            const res = await fetch(apiUrl);
            const data = await res.json();
            
            //   create now div for cards 
            const card = document.createElement("div");
            card.className = "cityCard";
            card.innerHTML = `<h3>${data.name}</h3>
        <p>${data.main.temp}&#176</p>
        <img src = "https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
        <p>${data.weather[0].description}</p>`

            // append on the parent div 
            citiesWeatherDiv.append(card)
        } catch (error) {
            console.log("Error loading city")
        }
    })
}
// cities weather cards end

// load on page start 
window.addEventListener("load", () => {
    loadCitiesWeather();
    apiData();
})
// load on page end
