import global from "./globalVariables";
import { fetchWeatherData } from "./weatherDataFetching";

// Inputs
const search = document.getElementById("search");
const themeToggle = document.getElementById("theme");
const celsiusToggle = document.getElementById("celsius");

celsiusToggle.addEventListener("change", () => {
  global.isCelsius = !global.isCelsius;
  global.tempSuffix = global.isCelsius ? "°C" : "°F";

  getData();
});

search.addEventListener("search", (e) => {
  e.preventDefault();

  console.log("Searching: " + search.value);
  global.city = search.value;
  search.value = "";

  fetchWeatherData();
});

fetchWeatherData();
