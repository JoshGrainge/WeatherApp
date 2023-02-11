import global from "./globalVariables";
import { createCurrentCard, createFiveDayForecastCards } from "./cards";
import { getWeatherData } from "./weatherData";
import { updateCityTitle } from "./cityTitle";

const weatherKey = config.WEATHER_KEY;
const pexelKey = config.PEXELS_KEY;

async function fetchWeatherData() {
  try {
    let weatherRequest = `https://api.openweathermap.org/data/2.5/weather?q=${global.city}&appid=${weatherKey}`;

    const reply = await fetch(weatherRequest, { mode: "cors" });
    if (reply.status !== 200)
      throw new Error(`Could not find valid city of name: ${global.city}`);

    const data = await reply.json();

    _getForecastData(data);

    updateCityTitle(data.name);

    const dataObject = getWeatherData(data);
    createCurrentCard(dataObject.icon, dataObject.temp, dataObject.description);
  } catch (err) {
    console.error(err);
  }
}

async function _getForecastData(data) {
  try {
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const forecastRequest = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherKey}`;

    const reply = await fetch(forecastRequest, { mode: "cors" });
    if (reply.status != 200)
      throw new Error(`Forecast data was not retrieved properly`);

    const forecastData = await reply.json();
    // TODO use imported function here
    createFiveDayForecastCards(forecastData.list);
  } catch (err) {
    console.error(err);
  }
}

export { fetchWeatherData };
