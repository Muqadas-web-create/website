 const speedElm = document.getElementById("speed");
      const degElm = document.getElementById("deg");
      const yearElm = document.getElementById("year");

      const city = "Lahore";
      const apiKey = "34639ccd64c601eb96937e47f458b12b";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      async function getWindData() {
        try {
          const res = await fetch(url);
          const data = await res.json();
          const wind = data.wind;

          speedElm.innerText = `Speed: ${wind.speed} m/s`;
          degElm.innerText = `Direction: ${wind.deg}°`;
        } catch (err) {
          speedElm.innerText = "Speed: N/A";
          degElm.innerText = "Direction: N/A";
        }
      }

      getWindData();
      yearElm.innerText = new Date().getFullYear();