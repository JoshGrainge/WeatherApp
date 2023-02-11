//import { updateCurrentCard } from "./cards";

const weatherKey = config.WEATHER_KEY;
const pexelKey = config.PEXELS_KEY;

const currentContainer = document.getElementById("current");
const fiveDayForecastContainer = document.getElementById("card-container");

let city = "Sudbury";
let weatherRequest = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;

let tempSuffix = "°C";

getData(city);

async function getData(city) {
  const reply = await fetch(weatherRequest, { mode: "cors" });
  const data = await reply.json();

  getForecastData(data);

  const dataObject = getWeatherData(data);
  createCurrentCard(dataObject.icon, dataObject.temp, dataObject.description);
}

async function getForecastData(data) {
  const lat = data.coord.lat;
  const lon = data.coord.lon;
  const forecastRequest = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherKey}`;

  const reply = await fetch(forecastRequest, { mode: "cors" });
  const forecastData = await reply.json();
  createFiveDayForecastCards(forecastData.list);
}

function createFiveDayForecastCards(forecastData) {
  let cardsData = [];

  for (const data of forecastData) {
    if (data.dt_txt.includes("12:00:00")) {
      cardsData.push(getWeatherData(data));
    }
  }

  fiveDayForecastContainer.innerHTML = "";

  for (const cardData of cardsData) {
    const card = createForecastCard(
      cardData.title,
      cardData.icon,
      cardData.temp,
      cardData.description
    );

    fiveDayForecastContainer.appendChild(card);
  }
}

function createCurrentCard(icon, temp, desc) {
  const cardTitle = document.createElement("h2");
  const weatherIcon = document.createElement("img");
  const temperatureText = document.createElement("h2");
  const descriptionPara = document.createElement("p");

  cardTitle.textContent = "Current";
  weatherIcon.src = icon;
  temperatureText.textContent = temp;
  descriptionPara.textContent = desc;

  cardTitle.classList = "day-title";

  currentContainer.replaceChildren(
    cardTitle,
    weatherIcon,
    temperatureText,
    descriptionPara
  );
}

function createForecastCard(title, icon, temp, desc) {
  const card = document.createElement("div");
  const day = document.createElement("h2");
  const img = document.createElement("img");
  const degrees = document.createElement("h2");
  const descPara = document.createElement("p");

  card.classList = "card";
  day.classList = "day-title";

  img.src = icon;

  day.textContent = title;
  degrees.textContent = temp;
  descPara.textContent = desc;

  card.appendChild(day);
  card.appendChild(img);
  card.appendChild(degrees);
  card.appendChild(descPara);

  return card;
}

function getWeatherData(data) {
  return {
    // TODO get weekday name from date
    title: "Day",
    // TODO convert from kelvin to celcius or fahrenheit
    temp: `${data.main.temp} ${tempSuffix}`,
    description: data.weather[0].description,
    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
}
