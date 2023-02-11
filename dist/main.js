/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cards.js":
/*!**********************!*\
  !*** ./src/cards.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCurrentCard": () => (/* binding */ createCurrentCard),
/* harmony export */   "createFiveDayForecastCards": () => (/* binding */ createFiveDayForecastCards)
/* harmony export */ });
/* harmony import */ var _weatherData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weatherData */ "./src/weatherData.js");


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
      cardsData.push((0,_weatherData__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)(data));
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




/***/ }),

/***/ "./src/cityTitle.js":
/*!**************************!*\
  !*** ./src/cityTitle.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateCityTitle": () => (/* binding */ updateCityTitle)
/* harmony export */ });
/* harmony import */ var _globalVariables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globalVariables */ "./src/globalVariables.js");


const cityTitle = document.getElementById("city-title");

function updateCityTitle() {
  cityTitle.textContent = _globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].city;
}




/***/ }),

/***/ "./src/globalVariables.js":
/*!********************************!*\
  !*** ./src/globalVariables.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  city: "Sudbury",
  tempSuffix: "°C",
  isCelsius: true,
});


/***/ }),

/***/ "./src/themes.js":
/*!***********************!*\
  !*** ./src/themes.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleThemes": () => (/* binding */ toggleThemes)
/* harmony export */ });
let lightTheme = true;

const lightBodyBg = "#ffcdb2";
const darkBodyBg = "#02020B";
const lightCardBg = "#df4545";
const darkCardBg = "#7fb069";

const lightTextColor = "#000";
const darkTextColor = "#fff";

const lightToggleBallColor = "#fff";
const darkToggleBallColor = "#111";
const lightToggleBgColor = "#111";
const darkToggleBgColor = "#fff";
const lightToggleTextColor = "#fff";
const darkToggleTextColor = "#111";

function toggleThemes() {
  lightTheme = !lightTheme;

  if (lightTheme) {
    document.documentElement.style.setProperty("--body-bg", lightBodyBg);
    document.documentElement.style.setProperty("--card-bg", lightCardBg);
    document.documentElement.style.setProperty("--text-color", lightTextColor);
    document.documentElement.style.setProperty(
      "--toggle-ball-color",
      lightToggleBallColor
    );
    document.documentElement.style.setProperty(
      "--toggle-bg",
      lightToggleBgColor
    );
    document.documentElement.style.setProperty(
      "--toggle-text-color",
      lightToggleTextColor
    );
  } else {
    console.log("Setting dark mode");
    document.documentElement.style.setProperty("--body-bg", darkBodyBg);
    document.documentElement.style.setProperty("--card-bg", darkCardBg);
    document.documentElement.style.setProperty("--text-color", darkTextColor);
    document.documentElement.style.setProperty(
      "--toggle-ball-color",
      darkToggleBallColor
    );
    document.documentElement.style.setProperty(
      "--toggle-bg",
      darkToggleBgColor
    );
    document.documentElement.style.setProperty(
      "--toggle-text-color",
      darkToggleTextColor
    );
  }
}




/***/ }),

/***/ "./src/weatherData.js":
/*!****************************!*\
  !*** ./src/weatherData.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWeatherData": () => (/* binding */ getWeatherData)
/* harmony export */ });
/* harmony import */ var _globalVariables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globalVariables */ "./src/globalVariables.js");


function getWeatherData(data) {
  return {
    title: _getWeekDayValue(data.dt_txt),
    temp: `${_getActualTemp(data.main.temp)} ${_globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].tempSuffix}`,
    description: _uppercaseFirstChar(data.weather[0].description),
    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
}

function _getActualTemp(kelvin) {
  const celsius = kelvin - 273.15;

  let returnNum = celsius;
  // Convert to fahrenheit
  if (_globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].tempSuffix != "°C") returnNum = celsius * (9 / 5) + 32;

  // Returns only to first decimal
  return Math.round(returnNum * 10) / 10;
}

function _getWeekDayValue(date) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const d = new Date(date);
  return weekdays[d.getDay()];
}

function _uppercaseFirstChar(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}




/***/ }),

/***/ "./src/weatherDataFetching.js":
/*!************************************!*\
  !*** ./src/weatherDataFetching.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchWeatherData": () => (/* binding */ fetchWeatherData)
/* harmony export */ });
/* harmony import */ var _globalVariables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globalVariables */ "./src/globalVariables.js");
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cards */ "./src/cards.js");
/* harmony import */ var _weatherData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./weatherData */ "./src/weatherData.js");
/* harmony import */ var _cityTitle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cityTitle */ "./src/cityTitle.js");





const weatherKey = config.WEATHER_KEY;
const pexelKey = config.PEXELS_KEY;

async function fetchWeatherData() {
  try {
    let weatherRequest = `https://api.openweathermap.org/data/2.5/weather?q=${_globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].city}&appid=${weatherKey}`;

    const reply = await fetch(weatherRequest, { mode: "cors" });
    if (reply.status !== 200)
      throw new Error(`Could not find valid city of name: ${_globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].city}`);

    const data = await reply.json();

    _getForecastData(data);

    (0,_cityTitle__WEBPACK_IMPORTED_MODULE_3__.updateCityTitle)(data.name);

    const dataObject = (0,_weatherData__WEBPACK_IMPORTED_MODULE_2__.getWeatherData)(data);
    (0,_cards__WEBPACK_IMPORTED_MODULE_1__.createCurrentCard)(dataObject.icon, dataObject.temp, dataObject.description);
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
    (0,_cards__WEBPACK_IMPORTED_MODULE_1__.createFiveDayForecastCards)(forecastData.list);
  } catch (err) {
    console.error(err);
  }
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _globalVariables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globalVariables */ "./src/globalVariables.js");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./themes */ "./src/themes.js");
/* harmony import */ var _weatherDataFetching__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./weatherDataFetching */ "./src/weatherDataFetching.js");




// Inputs
const search = document.getElementById("search");
const themeToggle = document.getElementById("theme-toggle");
const celsiusToggle = document.getElementById("degree-toggle");

themeToggle.addEventListener("click", () => {
  console.log("CLICKING");
  (0,_themes__WEBPACK_IMPORTED_MODULE_1__.toggleThemes)();
});

celsiusToggle.addEventListener("change", () => {
  _globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].isCelsius = !_globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].isCelsius;
  _globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].tempSuffix = _globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].isCelsius ? "°C" : "°F";

  (0,_weatherDataFetching__WEBPACK_IMPORTED_MODULE_2__.fetchWeatherData)();
});

search.addEventListener("search", (e) => {
  e.preventDefault();

  _globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].city = search.value;
  search.value = "";

  (0,_weatherDataFetching__WEBPACK_IMPORTED_MODULE_2__.fetchWeatherData)();
});

(0,_weatherDataFetching__WEBPACK_IMPORTED_MODULE_2__.fetchWeatherData)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ2xCLENBQUM7O0FBRUQ7QUFDQTs7QUFFQSxFQUFFLDZEQUFXO0FBQ2I7O0FBRUEsRUFBRSxzRUFBZ0I7QUFDbEIsQ0FBQzs7QUFFRCxzRUFBZ0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2NhcmRzLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvY2l0eVRpdGxlLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvZ2xvYmFsVmFyaWFibGVzLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvdGhlbWVzLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvd2VhdGhlckRhdGEuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy93ZWF0aGVyRGF0YUZldGNoaW5nLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFdlYXRoZXJEYXRhIH0gZnJvbSBcIi4vd2VhdGhlckRhdGFcIjtcblxuY29uc3QgY3VycmVudENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudFwiKTtcbmNvbnN0IGZpdmVEYXlGb3JlY2FzdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FyZC1jb250YWluZXJcIik7XG5cbmZ1bmN0aW9uIGNyZWF0ZUN1cnJlbnRDYXJkKGljb24sIHRlbXAsIGRlc2MpIHtcbiAgY29uc3QgY2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICBjb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIGNvbnN0IHRlbXBlcmF0dXJlVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgY29uc3QgZGVzY3JpcHRpb25QYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgY2FyZFRpdGxlLnRleHRDb250ZW50ID0gXCJDdXJyZW50XCI7XG4gIHdlYXRoZXJJY29uLnNyYyA9IGljb247XG4gIHRlbXBlcmF0dXJlVGV4dC50ZXh0Q29udGVudCA9IHRlbXA7XG4gIGRlc2NyaXB0aW9uUGFyYS50ZXh0Q29udGVudCA9IGRlc2M7XG5cbiAgY2FyZFRpdGxlLmNsYXNzTGlzdCA9IFwiZGF5LXRpdGxlXCI7XG5cbiAgY3VycmVudENvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oXG4gICAgY2FyZFRpdGxlLFxuICAgIHdlYXRoZXJJY29uLFxuICAgIHRlbXBlcmF0dXJlVGV4dCxcbiAgICBkZXNjcmlwdGlvblBhcmFcbiAgKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUZvcmVjYXN0Q2FyZCh0aXRsZSwgaWNvbiwgdGVtcCwgZGVzYykge1xuICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBjb25zdCBkZWdyZWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICBjb25zdCBkZXNjUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXG4gIGNhcmQuY2xhc3NMaXN0ID0gXCJjYXJkXCI7XG4gIGRheS5jbGFzc0xpc3QgPSBcImRheS10aXRsZVwiO1xuXG4gIGltZy5zcmMgPSBpY29uO1xuXG4gIGRheS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICBkZWdyZWVzLnRleHRDb250ZW50ID0gdGVtcDtcbiAgZGVzY1BhcmEudGV4dENvbnRlbnQgPSBkZXNjO1xuXG4gIGNhcmQuYXBwZW5kQ2hpbGQoZGF5KTtcbiAgY2FyZC5hcHBlbmRDaGlsZChpbWcpO1xuICBjYXJkLmFwcGVuZENoaWxkKGRlZ3JlZXMpO1xuICBjYXJkLmFwcGVuZENoaWxkKGRlc2NQYXJhKTtcblxuICByZXR1cm4gY2FyZDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRml2ZURheUZvcmVjYXN0Q2FyZHMoZm9yZWNhc3REYXRhKSB7XG4gIGxldCBjYXJkc0RhdGEgPSBbXTtcblxuICBmb3IgKGNvbnN0IGRhdGEgb2YgZm9yZWNhc3REYXRhKSB7XG4gICAgaWYgKGRhdGEuZHRfdHh0LmluY2x1ZGVzKFwiMTI6MDA6MDBcIikpIHtcbiAgICAgIGNhcmRzRGF0YS5wdXNoKGdldFdlYXRoZXJEYXRhKGRhdGEpKTtcbiAgICB9XG4gIH1cblxuICBmaXZlRGF5Rm9yZWNhc3RDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICBmb3IgKGNvbnN0IGNhcmREYXRhIG9mIGNhcmRzRGF0YSkge1xuICAgIGNvbnN0IGNhcmQgPSBfY3JlYXRlRm9yZWNhc3RDYXJkKFxuICAgICAgY2FyZERhdGEudGl0bGUsXG4gICAgICBjYXJkRGF0YS5pY29uLFxuICAgICAgY2FyZERhdGEudGVtcCxcbiAgICAgIGNhcmREYXRhLmRlc2NyaXB0aW9uXG4gICAgKTtcblxuICAgIGZpdmVEYXlGb3JlY2FzdENvbnRhaW5lci5hcHBlbmRDaGlsZChjYXJkKTtcbiAgfVxufVxuXG5leHBvcnQgeyBjcmVhdGVDdXJyZW50Q2FyZCwgY3JlYXRlRml2ZURheUZvcmVjYXN0Q2FyZHMgfTtcbiIsImltcG9ydCBnbG9iYWwgZnJvbSBcIi4vZ2xvYmFsVmFyaWFibGVzXCI7XG5cbmNvbnN0IGNpdHlUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eS10aXRsZVwiKTtcblxuZnVuY3Rpb24gdXBkYXRlQ2l0eVRpdGxlKCkge1xuICBjaXR5VGl0bGUudGV4dENvbnRlbnQgPSBnbG9iYWwuY2l0eTtcbn1cblxuZXhwb3J0IHsgdXBkYXRlQ2l0eVRpdGxlIH07XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGNpdHk6IFwiU3VkYnVyeVwiLFxuICB0ZW1wU3VmZml4OiBcIsKwQ1wiLFxuICBpc0NlbHNpdXM6IHRydWUsXG59O1xuIiwibGV0IGxpZ2h0VGhlbWUgPSB0cnVlO1xuXG5jb25zdCBsaWdodEJvZHlCZyA9IFwiI2ZmY2RiMlwiO1xuY29uc3QgZGFya0JvZHlCZyA9IFwiIzAyMDIwQlwiO1xuY29uc3QgbGlnaHRDYXJkQmcgPSBcIiNkZjQ1NDVcIjtcbmNvbnN0IGRhcmtDYXJkQmcgPSBcIiM3ZmIwNjlcIjtcblxuY29uc3QgbGlnaHRUZXh0Q29sb3IgPSBcIiMwMDBcIjtcbmNvbnN0IGRhcmtUZXh0Q29sb3IgPSBcIiNmZmZcIjtcblxuY29uc3QgbGlnaHRUb2dnbGVCYWxsQ29sb3IgPSBcIiNmZmZcIjtcbmNvbnN0IGRhcmtUb2dnbGVCYWxsQ29sb3IgPSBcIiMxMTFcIjtcbmNvbnN0IGxpZ2h0VG9nZ2xlQmdDb2xvciA9IFwiIzExMVwiO1xuY29uc3QgZGFya1RvZ2dsZUJnQ29sb3IgPSBcIiNmZmZcIjtcbmNvbnN0IGxpZ2h0VG9nZ2xlVGV4dENvbG9yID0gXCIjZmZmXCI7XG5jb25zdCBkYXJrVG9nZ2xlVGV4dENvbG9yID0gXCIjMTExXCI7XG5cbmZ1bmN0aW9uIHRvZ2dsZVRoZW1lcygpIHtcbiAgbGlnaHRUaGVtZSA9ICFsaWdodFRoZW1lO1xuXG4gIGlmIChsaWdodFRoZW1lKSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwiLS1ib2R5LWJnXCIsIGxpZ2h0Qm9keUJnKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCItLWNhcmQtYmdcIiwgbGlnaHRDYXJkQmcpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdGV4dC1jb2xvclwiLCBsaWdodFRleHRDb2xvcik7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgXCItLXRvZ2dsZS1iYWxsLWNvbG9yXCIsXG4gICAgICBsaWdodFRvZ2dsZUJhbGxDb2xvclxuICAgICk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgXCItLXRvZ2dsZS1iZ1wiLFxuICAgICAgbGlnaHRUb2dnbGVCZ0NvbG9yXG4gICAgKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgICBcIi0tdG9nZ2xlLXRleHQtY29sb3JcIixcbiAgICAgIGxpZ2h0VG9nZ2xlVGV4dENvbG9yXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcIlNldHRpbmcgZGFyayBtb2RlXCIpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm9keS1iZ1wiLCBkYXJrQm9keUJnKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCItLWNhcmQtYmdcIiwgZGFya0NhcmRCZyk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwiLS10ZXh0LWNvbG9yXCIsIGRhcmtUZXh0Q29sb3IpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgIFwiLS10b2dnbGUtYmFsbC1jb2xvclwiLFxuICAgICAgZGFya1RvZ2dsZUJhbGxDb2xvclxuICAgICk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgXCItLXRvZ2dsZS1iZ1wiLFxuICAgICAgZGFya1RvZ2dsZUJnQ29sb3JcbiAgICApO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgIFwiLS10b2dnbGUtdGV4dC1jb2xvclwiLFxuICAgICAgZGFya1RvZ2dsZVRleHRDb2xvclxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHsgdG9nZ2xlVGhlbWVzIH07XG4iLCJpbXBvcnQgZ2xvYmFsIGZyb20gXCIuL2dsb2JhbFZhcmlhYmxlc1wiO1xuXG5mdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShkYXRhKSB7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6IF9nZXRXZWVrRGF5VmFsdWUoZGF0YS5kdF90eHQpLFxuICAgIHRlbXA6IGAke19nZXRBY3R1YWxUZW1wKGRhdGEubWFpbi50ZW1wKX0gJHtnbG9iYWwudGVtcFN1ZmZpeH1gLFxuICAgIGRlc2NyaXB0aW9uOiBfdXBwZXJjYXNlRmlyc3RDaGFyKGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbiksXG4gICAgaWNvbjogYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2AsXG4gIH07XG59XG5cbmZ1bmN0aW9uIF9nZXRBY3R1YWxUZW1wKGtlbHZpbikge1xuICBjb25zdCBjZWxzaXVzID0ga2VsdmluIC0gMjczLjE1O1xuXG4gIGxldCByZXR1cm5OdW0gPSBjZWxzaXVzO1xuICAvLyBDb252ZXJ0IHRvIGZhaHJlbmhlaXRcbiAgaWYgKGdsb2JhbC50ZW1wU3VmZml4ICE9IFwiwrBDXCIpIHJldHVybk51bSA9IGNlbHNpdXMgKiAoOSAvIDUpICsgMzI7XG5cbiAgLy8gUmV0dXJucyBvbmx5IHRvIGZpcnN0IGRlY2ltYWxcbiAgcmV0dXJuIE1hdGgucm91bmQocmV0dXJuTnVtICogMTApIC8gMTA7XG59XG5cbmZ1bmN0aW9uIF9nZXRXZWVrRGF5VmFsdWUoZGF0ZSkge1xuICBjb25zdCB3ZWVrZGF5cyA9IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXTtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKGRhdGUpO1xuICByZXR1cm4gd2Vla2RheXNbZC5nZXREYXkoKV07XG59XG5cbmZ1bmN0aW9uIF91cHBlcmNhc2VGaXJzdENoYXIoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG59XG5cbmV4cG9ydCB7IGdldFdlYXRoZXJEYXRhIH07XG4iLCJpbXBvcnQgZ2xvYmFsIGZyb20gXCIuL2dsb2JhbFZhcmlhYmxlc1wiO1xuaW1wb3J0IHsgY3JlYXRlQ3VycmVudENhcmQsIGNyZWF0ZUZpdmVEYXlGb3JlY2FzdENhcmRzIH0gZnJvbSBcIi4vY2FyZHNcIjtcbmltcG9ydCB7IGdldFdlYXRoZXJEYXRhIH0gZnJvbSBcIi4vd2VhdGhlckRhdGFcIjtcbmltcG9ydCB7IHVwZGF0ZUNpdHlUaXRsZSB9IGZyb20gXCIuL2NpdHlUaXRsZVwiO1xuXG5jb25zdCB3ZWF0aGVyS2V5ID0gY29uZmlnLldFQVRIRVJfS0VZO1xuY29uc3QgcGV4ZWxLZXkgPSBjb25maWcuUEVYRUxTX0tFWTtcblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hXZWF0aGVyRGF0YSgpIHtcbiAgdHJ5IHtcbiAgICBsZXQgd2VhdGhlclJlcXVlc3QgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2dsb2JhbC5jaXR5fSZhcHBpZD0ke3dlYXRoZXJLZXl9YDtcblxuICAgIGNvbnN0IHJlcGx5ID0gYXdhaXQgZmV0Y2god2VhdGhlclJlcXVlc3QsIHsgbW9kZTogXCJjb3JzXCIgfSk7XG4gICAgaWYgKHJlcGx5LnN0YXR1cyAhPT0gMjAwKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCB2YWxpZCBjaXR5IG9mIG5hbWU6ICR7Z2xvYmFsLmNpdHl9YCk7XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVwbHkuanNvbigpO1xuXG4gICAgX2dldEZvcmVjYXN0RGF0YShkYXRhKTtcblxuICAgIHVwZGF0ZUNpdHlUaXRsZShkYXRhLm5hbWUpO1xuXG4gICAgY29uc3QgZGF0YU9iamVjdCA9IGdldFdlYXRoZXJEYXRhKGRhdGEpO1xuICAgIGNyZWF0ZUN1cnJlbnRDYXJkKGRhdGFPYmplY3QuaWNvbiwgZGF0YU9iamVjdC50ZW1wLCBkYXRhT2JqZWN0LmRlc2NyaXB0aW9uKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9nZXRGb3JlY2FzdERhdGEoZGF0YSkge1xuICB0cnkge1xuICAgIGNvbnN0IGxhdCA9IGRhdGEuY29vcmQubGF0O1xuICAgIGNvbnN0IGxvbiA9IGRhdGEuY29vcmQubG9uO1xuICAgIGNvbnN0IGZvcmVjYXN0UmVxdWVzdCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/bGF0PSR7bGF0fSZsb249JHtsb259JmFwcGlkPSR7d2VhdGhlcktleX1gO1xuXG4gICAgY29uc3QgcmVwbHkgPSBhd2FpdCBmZXRjaChmb3JlY2FzdFJlcXVlc3QsIHsgbW9kZTogXCJjb3JzXCIgfSk7XG4gICAgaWYgKHJlcGx5LnN0YXR1cyAhPSAyMDApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZvcmVjYXN0IGRhdGEgd2FzIG5vdCByZXRyaWV2ZWQgcHJvcGVybHlgKTtcblxuICAgIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IHJlcGx5Lmpzb24oKTtcbiAgICAvLyBUT0RPIHVzZSBpbXBvcnRlZCBmdW5jdGlvbiBoZXJlXG4gICAgY3JlYXRlRml2ZURheUZvcmVjYXN0Q2FyZHMoZm9yZWNhc3REYXRhLmxpc3QpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gIH1cbn1cblxuZXhwb3J0IHsgZmV0Y2hXZWF0aGVyRGF0YSB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2xvYmFsIGZyb20gXCIuL2dsb2JhbFZhcmlhYmxlc1wiO1xuaW1wb3J0IHsgdG9nZ2xlVGhlbWVzIH0gZnJvbSBcIi4vdGhlbWVzXCI7XG5pbXBvcnQgeyBmZXRjaFdlYXRoZXJEYXRhIH0gZnJvbSBcIi4vd2VhdGhlckRhdGFGZXRjaGluZ1wiO1xuXG4vLyBJbnB1dHNcbmNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoXCIpO1xuY29uc3QgdGhlbWVUb2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLXRvZ2dsZVwiKTtcbmNvbnN0IGNlbHNpdXNUb2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlZ3JlZS10b2dnbGVcIik7XG5cbnRoZW1lVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiQ0xJQ0tJTkdcIik7XG4gIHRvZ2dsZVRoZW1lcygpO1xufSk7XG5cbmNlbHNpdXNUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gIGdsb2JhbC5pc0NlbHNpdXMgPSAhZ2xvYmFsLmlzQ2Vsc2l1cztcbiAgZ2xvYmFsLnRlbXBTdWZmaXggPSBnbG9iYWwuaXNDZWxzaXVzID8gXCLCsENcIiA6IFwiwrBGXCI7XG5cbiAgZmV0Y2hXZWF0aGVyRGF0YSgpO1xufSk7XG5cbnNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwic2VhcmNoXCIsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBnbG9iYWwuY2l0eSA9IHNlYXJjaC52YWx1ZTtcbiAgc2VhcmNoLnZhbHVlID0gXCJcIjtcblxuICBmZXRjaFdlYXRoZXJEYXRhKCk7XG59KTtcblxuZmV0Y2hXZWF0aGVyRGF0YSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9