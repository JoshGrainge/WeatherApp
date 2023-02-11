//import { updateCurrentCard } from "./cards";

const weatherKey = config.WEATHER_KEY;
const pexelKey = config.PEXELS_KEY;

let city = "Sudbury";
city = "Czechia";
let weatherRequest = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;

let tempSuffix = "°C";

getData(city);

async function getData(city) {
  const reply = await fetch(weatherRequest, { mode: "cors" });
  const data = await reply.json();
  console.log(data);

  updateCurrentCard(
    // TODO convert from kelvin to celcius or fahrenheit
    `${data.main.temp} ${tempSuffix}`,
    data.weather[0].description,
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
}

function updateCurrentCard(temperature, description, icon) {
  const currentContainer = document.getElementById("current");

  const title = document.createElement("h2");
  const weatherIcon = document.createElement("img");
  const temperatureText = document.createElement("h2");
  const descriptionPara = document.createElement("p");

  title.value = "Current";
  weatherIcon.src = icon;
  temperatureText.textContent = temperature;
  descriptionPara.textContent = description;

  title.className = "day-title";

  currentContainer.replaceChildren(
    title,
    weatherIcon,
    temperatureText,
    descriptionPara
  );
}
