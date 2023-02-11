import global from "./globalVariables";

const cityTitle = document.getElementById("city-title");

function updateCityTitle() {
  cityTitle.textContent = global.city;
}

export { updateCityTitle };
