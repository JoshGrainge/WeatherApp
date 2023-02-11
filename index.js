const weatherKey = config.WEATHER_KEY;
const pexelKey = config.PEXELS_KEY;

const cityTitle = document.getElementById("city-title");
const currentContainer = document.getElementById("current");
const fiveDayForecastContainer = document.getElementById("card-container");

let city = "Sudbury";

let tempSuffix = "°C";

const search = document.getElementById("search");
search.addEventListener("search", (e) => {
  e.preventDefault();

  console.log("Searching: " + search.value);
  city = search.value;
  search.textContent = "";

  getData();
});

getData();

async function getData() {
  try {
    let weatherRequest = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;

    const reply = await fetch(weatherRequest, { mode: "cors" });
    if (reply.status !== 200)
      throw new Error(`Could not find valid city of name: ${city}`);

    const data = await reply.json();

    getForecastData(data);

    updateCityTitle(data.name);

    const dataObject = getWeatherData(data);
    createCurrentCard(dataObject.icon, dataObject.temp, dataObject.description);
  } catch (err) {
    console.error(err);
  }
}

function updateCityTitle(city) {
  cityTitle.textContent = city;
}

async function getForecastData(data) {
  try {
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const forecastRequest = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherKey}`;

    const reply = await fetch(forecastRequest, { mode: "cors" });
    if (reply.status != 200)
      throw new Error(`Forecast data was not retrieved properly`);

    const forecastData = await reply.json();
    createFiveDayForecastCards(forecastData.list);
  } catch (err) {
    console.error(err);
  }
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
    temp: `${getActualTemp(data.main.temp)} ${tempSuffix}`,
    description: data.weather[0].description,
    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
}

function getActualTemp(kelvin) {
  const celsius = kelvin - 273.15;

  let returnNum = celsius;
  // Convert to fahrenheit
  if (tempSuffix != "°C") returnNum = celsius * (9 / 5) + 32;

  // Returns only first decimal
  return Math.round(returnNum * 10) / 10;
}
