import global from "./globalVariables";
import { toggleThemes } from "./themes";
import { fetchWeatherData } from "./weatherDataFetching";

// Inputs
const search = document.getElementById("search");
const themeToggle = document.getElementById("theme-toggle");
const celsiusToggle = document.getElementById("degree-toggle");

themeToggle.addEventListener("click", () => {
  console.log("CLICKING");
  toggleThemes();
});

celsiusToggle.addEventListener("change", () => {
  global.isCelsius = !global.isCelsius;
  global.tempSuffix = global.isCelsius ? "°C" : "°F";

  fetchWeatherData();
});

search.addEventListener("search", (e) => {
  e.preventDefault();

  global.city = search.value;
  search.value = "";

  fetchWeatherData();
});

fetchWeatherData();
