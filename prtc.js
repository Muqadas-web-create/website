let dt = "1753969771"; // Unix timestamp
let timeDate = new Date(dt * 1000);

// Correct formatting options
const DateTime = {
    weekday: "long",    // sahi spelling: weekday (not weekDay)
    month: "long",
    year: "numeric",
    day: "numeric",     // sahi spelling: day (not Day)
    hour: "numeric",    // sahi spelling: hour (not hours)
    minute: "numeric",
    second: "numeric"
};

console.log(timeDate.toLocaleString("en-US", DateTime));



// let sunsetTime = new Date(sunset * 1000).toLocaleTimeString();


// let sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();

let sunrise = "1754007516";
let sunRiseDate =  new Date(sunrise * 1000)
const sunRise = {
    day: "numeric",
    hours: "numeric",
    minutes: "numerics"
}
console.log(sunRiseDate.toLocaleString("en-Us", sunRiseDate))


let sunset = "1754056751";
let sunSetDate =  new Date(sunset * 1000)
const sunSetOption = {
    hour: "numeric",
    minute: "numeric"
}
console.log(sunSetDate.toLocaleTimeString("en-Us", sunSetOption))

// agr dono same show krna hu 
let sunsetElm = document.querySelector(".sunset");
let sunriseElm = document.querySelector(".sunrise");

const showBothSunELm = (timestamp) => {
    let date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}
sunsetElm.innerHTML = `Sunset: ${showBothSunELm(data.sys.sunset)}`;
sunriseElm.innerHTML = `Sunrise: ${showBothSunELm(data.sys.sunrise)}`;