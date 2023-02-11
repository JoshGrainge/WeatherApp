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

  updateCurrentCard(getWeatherData(data));
}

function updateCurrentCard(dataObject) {
  const currentContainer = document.getElementById("current");

  const title = document.createElement("h2");
  const weatherIcon = document.createElement("img");
  const temperatureText = document.createElement("h2");
  const descriptionPara = document.createElement("p");

  title.value = "Current";
  weatherIcon.src = dataObject.icon;
  temperatureText.textContent = dataObject.temp;
  descriptionPara.textContent = dataObject.description;

  title.className = "day-title";

  currentContainer.replaceChildren(
    title,
    weatherIcon,
    temperatureText,
    descriptionPara
  );
}

function createWeekForecastCards(dataObject) {}

function getWeatherData(data) {
  return {
    title: "title",
    // TODO convert from kelvin to celcius or fahrenheit
    temp: `${data.main.temp} ${tempSuffix}`,
    description: data.weather[0].description,
    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
}
