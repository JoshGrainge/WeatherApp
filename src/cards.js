import { getWeatherData } from "./weatherData";

const currentContainer = document.getElementById("current");
const fiveDayForecastContainer = document.getElementById("card-container");

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

function _createForecastCard(title, icon, temp, desc) {
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

function createFiveDayForecastCards(forecastData) {
  let cardsData = [];

  for (const data of forecastData) {
    if (data.dt_txt.includes("12:00:00")) {
      cardsData.push(getWeatherData(data));
    }
  }

  fiveDayForecastContainer.innerHTML = "";

  for (const cardData of cardsData) {
    const card = _createForecastCard(
      cardData.title,
      cardData.icon,
      cardData.temp,
      cardData.description
    );

    fiveDayForecastContainer.appendChild(card);
  }
}

export { createCurrentCard, createFiveDayForecastCards };
