let city = "Lahore";
let timezone = document.getElementById("timezone");
let visibility = document.getElementById("visibility");
let showtime = document.querySelector(".showtime");

// Function to convert timestamp to formatted time
const timeShowData = (timestamp) => {
  const timeDate = new Date(timestamp * 1000);
  const options = {
    weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
  return timeDate.toLocaleString("en-US", options);
};


const getData = async () => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=34639ccd64c601eb96937e47f458b12b&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    //show time
    let timestamp = data.dt;
    showtime.innerHTML = `🕒 Local Time: ${timeShowData(timestamp)}`;

    // updated time mtlb runing position
    setInterval(() => {
      timestamp++;
      showtime.innerHTML = `🕒 Local Time: ${timeShowData(timestamp)}`;
    }, 1000);

    // Timezone
    const offsetHours = data.timezone / 3600;
    const offsetSign = offsetHours >= 0 ? "+" : "-";
    timezone.innerHTML = `🕓 Timezone: Pakistan UTC${offsetSign}${Math.abs(offsetHours)}`;

    // Visibility
    visibility.innerHTML = `🌫️ Visibility: ${data.visibility} meters`;

  } catch (err) {
    timezone.innerHTML = "Timezone: Error loading data";
    visibility.innerHTML = "Visibility: Error loading data";
    console.error("Fetch Error:", err);
  }
};

// Footer Year
document.getElementById("year").textContent = new Date().getFullYear();

window.addEventListener("load", getData);
