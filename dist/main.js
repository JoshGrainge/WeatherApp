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

  // Returns only first decimal
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

    console.log("Updating city title to: " + data.name);
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
/* harmony import */ var _weatherDataFetching__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherDataFetching */ "./src/weatherDataFetching.js");



// Inputs
const search = document.getElementById("search");
const themeToggle = document.getElementById("theme");
const celsiusToggle = document.getElementById("celsius");

celsiusToggle.addEventListener("change", () => {
  _globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].isCelsius = !_globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].isCelsius;
  _globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].tempSuffix = _globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].isCelsius ? "°C" : "°F";

  getData();
});

search.addEventListener("search", (e) => {
  e.preventDefault();

  console.log("Searching: " + search.value);
  _globalVariables__WEBPACK_IMPORTED_MODULE_0__["default"].city = search.value;
  search.value = "";

  (0,_weatherDataFetching__WEBPACK_IMPORTED_MODULE_1__.fetchWeatherData)();
});

(0,_weatherDataFetching__WEBPACK_IMPORTED_MODULE_1__.fetchWeatherData)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQStDOztBQUUvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDREQUFjO0FBQ25DO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUV5RDs7Ozs7Ozs7Ozs7Ozs7OztBQ3pFbEI7O0FBRXZDOztBQUVBO0FBQ0EsMEJBQTBCLDZEQUFXO0FBQ3JDOztBQUUyQjs7Ozs7Ozs7Ozs7Ozs7O0FDUjNCLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDSnFDOztBQUV2QztBQUNBO0FBQ0E7QUFDQSxhQUFhLGdDQUFnQyxFQUFFLG1FQUFpQixDQUFDO0FBQ2pFO0FBQ0EsOENBQThDLHFCQUFxQjtBQUNuRTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU0sbUVBQWlCOztBQUV2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRTBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENhO0FBQ2lDO0FBQ3pCO0FBQ0Q7O0FBRTlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhFQUE4RSw2REFBVyxDQUFDLFNBQVMsV0FBVzs7QUFFOUcsZ0RBQWdELGNBQWM7QUFDOUQ7QUFDQSw0REFBNEQsNkRBQVcsQ0FBQzs7QUFFeEU7O0FBRUE7O0FBRUE7QUFDQSxJQUFJLDJEQUFlOztBQUVuQix1QkFBdUIsNERBQWM7QUFDckMsSUFBSSx5REFBaUI7QUFDckIsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixJQUFJLE9BQU8sSUFBSSxTQUFTLFdBQVc7O0FBRXZILGlEQUFpRCxjQUFjO0FBQy9EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksa0VBQTBCO0FBQzlCLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRTRCOzs7Ozs7O1VDaEQ1QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ051QztBQUNrQjs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLGtFQUFnQixJQUFJLGtFQUFnQjtBQUN0QyxFQUFFLG1FQUFpQixHQUFHLGtFQUFnQjs7QUFFdEM7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLDZEQUFXO0FBQ2I7O0FBRUEsRUFBRSxzRUFBZ0I7QUFDbEIsQ0FBQzs7QUFFRCxzRUFBZ0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2NhcmRzLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvY2l0eVRpdGxlLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvZ2xvYmFsVmFyaWFibGVzLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvd2VhdGhlckRhdGEuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy93ZWF0aGVyRGF0YUZldGNoaW5nLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFdlYXRoZXJEYXRhIH0gZnJvbSBcIi4vd2VhdGhlckRhdGFcIjtcblxuY29uc3QgY3VycmVudENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudFwiKTtcbmNvbnN0IGZpdmVEYXlGb3JlY2FzdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FyZC1jb250YWluZXJcIik7XG5cbmZ1bmN0aW9uIGNyZWF0ZUN1cnJlbnRDYXJkKGljb24sIHRlbXAsIGRlc2MpIHtcbiAgY29uc3QgY2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICBjb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIGNvbnN0IHRlbXBlcmF0dXJlVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgY29uc3QgZGVzY3JpcHRpb25QYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgY2FyZFRpdGxlLnRleHRDb250ZW50ID0gXCJDdXJyZW50XCI7XG4gIHdlYXRoZXJJY29uLnNyYyA9IGljb247XG4gIHRlbXBlcmF0dXJlVGV4dC50ZXh0Q29udGVudCA9IHRlbXA7XG4gIGRlc2NyaXB0aW9uUGFyYS50ZXh0Q29udGVudCA9IGRlc2M7XG5cbiAgY2FyZFRpdGxlLmNsYXNzTGlzdCA9IFwiZGF5LXRpdGxlXCI7XG5cbiAgY3VycmVudENvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oXG4gICAgY2FyZFRpdGxlLFxuICAgIHdlYXRoZXJJY29uLFxuICAgIHRlbXBlcmF0dXJlVGV4dCxcbiAgICBkZXNjcmlwdGlvblBhcmFcbiAgKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUZvcmVjYXN0Q2FyZCh0aXRsZSwgaWNvbiwgdGVtcCwgZGVzYykge1xuICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBjb25zdCBkZWdyZWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICBjb25zdCBkZXNjUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXG4gIGNhcmQuY2xhc3NMaXN0ID0gXCJjYXJkXCI7XG4gIGRheS5jbGFzc0xpc3QgPSBcImRheS10aXRsZVwiO1xuXG4gIGltZy5zcmMgPSBpY29uO1xuXG4gIGRheS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICBkZWdyZWVzLnRleHRDb250ZW50ID0gdGVtcDtcbiAgZGVzY1BhcmEudGV4dENvbnRlbnQgPSBkZXNjO1xuXG4gIGNhcmQuYXBwZW5kQ2hpbGQoZGF5KTtcbiAgY2FyZC5hcHBlbmRDaGlsZChpbWcpO1xuICBjYXJkLmFwcGVuZENoaWxkKGRlZ3JlZXMpO1xuICBjYXJkLmFwcGVuZENoaWxkKGRlc2NQYXJhKTtcblxuICByZXR1cm4gY2FyZDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRml2ZURheUZvcmVjYXN0Q2FyZHMoZm9yZWNhc3REYXRhKSB7XG4gIGxldCBjYXJkc0RhdGEgPSBbXTtcblxuICBmb3IgKGNvbnN0IGRhdGEgb2YgZm9yZWNhc3REYXRhKSB7XG4gICAgaWYgKGRhdGEuZHRfdHh0LmluY2x1ZGVzKFwiMTI6MDA6MDBcIikpIHtcbiAgICAgIGNhcmRzRGF0YS5wdXNoKGdldFdlYXRoZXJEYXRhKGRhdGEpKTtcbiAgICB9XG4gIH1cblxuICBmaXZlRGF5Rm9yZWNhc3RDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICBmb3IgKGNvbnN0IGNhcmREYXRhIG9mIGNhcmRzRGF0YSkge1xuICAgIGNvbnN0IGNhcmQgPSBfY3JlYXRlRm9yZWNhc3RDYXJkKFxuICAgICAgY2FyZERhdGEudGl0bGUsXG4gICAgICBjYXJkRGF0YS5pY29uLFxuICAgICAgY2FyZERhdGEudGVtcCxcbiAgICAgIGNhcmREYXRhLmRlc2NyaXB0aW9uXG4gICAgKTtcblxuICAgIGZpdmVEYXlGb3JlY2FzdENvbnRhaW5lci5hcHBlbmRDaGlsZChjYXJkKTtcbiAgfVxufVxuXG5leHBvcnQgeyBjcmVhdGVDdXJyZW50Q2FyZCwgY3JlYXRlRml2ZURheUZvcmVjYXN0Q2FyZHMgfTtcbiIsImltcG9ydCBnbG9iYWwgZnJvbSBcIi4vZ2xvYmFsVmFyaWFibGVzXCI7XG5cbmNvbnN0IGNpdHlUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eS10aXRsZVwiKTtcblxuZnVuY3Rpb24gdXBkYXRlQ2l0eVRpdGxlKCkge1xuICBjaXR5VGl0bGUudGV4dENvbnRlbnQgPSBnbG9iYWwuY2l0eTtcbn1cblxuZXhwb3J0IHsgdXBkYXRlQ2l0eVRpdGxlIH07XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGNpdHk6IFwiU3VkYnVyeVwiLFxuICB0ZW1wU3VmZml4OiBcIsKwQ1wiLFxuICBpc0NlbHNpdXM6IHRydWUsXG59O1xuIiwiaW1wb3J0IGdsb2JhbCBmcm9tIFwiLi9nbG9iYWxWYXJpYWJsZXNcIjtcblxuZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEoZGF0YSkge1xuICByZXR1cm4ge1xuICAgIHRpdGxlOiBfZ2V0V2Vla0RheVZhbHVlKGRhdGEuZHRfdHh0KSxcbiAgICB0ZW1wOiBgJHtfZ2V0QWN0dWFsVGVtcChkYXRhLm1haW4udGVtcCl9ICR7Z2xvYmFsLnRlbXBTdWZmaXh9YCxcbiAgICBkZXNjcmlwdGlvbjogX3VwcGVyY2FzZUZpcnN0Q2hhcihkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24pLFxuICAgIGljb246IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RhdGEud2VhdGhlclswXS5pY29ufUAyeC5wbmdgLFxuICB9O1xufVxuXG5mdW5jdGlvbiBfZ2V0QWN0dWFsVGVtcChrZWx2aW4pIHtcbiAgY29uc3QgY2Vsc2l1cyA9IGtlbHZpbiAtIDI3My4xNTtcblxuICBsZXQgcmV0dXJuTnVtID0gY2Vsc2l1cztcbiAgLy8gQ29udmVydCB0byBmYWhyZW5oZWl0XG4gIGlmIChnbG9iYWwudGVtcFN1ZmZpeCAhPSBcIsKwQ1wiKSByZXR1cm5OdW0gPSBjZWxzaXVzICogKDkgLyA1KSArIDMyO1xuXG4gIC8vIFJldHVybnMgb25seSBmaXJzdCBkZWNpbWFsXG4gIHJldHVybiBNYXRoLnJvdW5kKHJldHVybk51bSAqIDEwKSAvIDEwO1xufVxuXG5mdW5jdGlvbiBfZ2V0V2Vla0RheVZhbHVlKGRhdGUpIHtcbiAgY29uc3Qgd2Vla2RheXMgPSBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl07XG4gIGNvbnN0IGQgPSBuZXcgRGF0ZShkYXRlKTtcbiAgcmV0dXJuIHdlZWtkYXlzW2QuZ2V0RGF5KCldO1xufVxuXG5mdW5jdGlvbiBfdXBwZXJjYXNlRmlyc3RDaGFyKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xufVxuXG5leHBvcnQgeyBnZXRXZWF0aGVyRGF0YSB9O1xuIiwiaW1wb3J0IGdsb2JhbCBmcm9tIFwiLi9nbG9iYWxWYXJpYWJsZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUN1cnJlbnRDYXJkLCBjcmVhdGVGaXZlRGF5Rm9yZWNhc3RDYXJkcyB9IGZyb20gXCIuL2NhcmRzXCI7XG5pbXBvcnQgeyBnZXRXZWF0aGVyRGF0YSB9IGZyb20gXCIuL3dlYXRoZXJEYXRhXCI7XG5pbXBvcnQgeyB1cGRhdGVDaXR5VGl0bGUgfSBmcm9tIFwiLi9jaXR5VGl0bGVcIjtcblxuY29uc3Qgd2VhdGhlcktleSA9IGNvbmZpZy5XRUFUSEVSX0tFWTtcbmNvbnN0IHBleGVsS2V5ID0gY29uZmlnLlBFWEVMU19LRVk7XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoV2VhdGhlckRhdGEoKSB7XG4gIHRyeSB7XG4gICAgbGV0IHdlYXRoZXJSZXF1ZXN0ID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtnbG9iYWwuY2l0eX0mYXBwaWQ9JHt3ZWF0aGVyS2V5fWA7XG5cbiAgICBjb25zdCByZXBseSA9IGF3YWl0IGZldGNoKHdlYXRoZXJSZXF1ZXN0LCB7IG1vZGU6IFwiY29yc1wiIH0pO1xuICAgIGlmIChyZXBseS5zdGF0dXMgIT09IDIwMClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgdmFsaWQgY2l0eSBvZiBuYW1lOiAke2dsb2JhbC5jaXR5fWApO1xuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcGx5Lmpzb24oKTtcblxuICAgIF9nZXRGb3JlY2FzdERhdGEoZGF0YSk7XG5cbiAgICBjb25zb2xlLmxvZyhcIlVwZGF0aW5nIGNpdHkgdGl0bGUgdG86IFwiICsgZGF0YS5uYW1lKTtcbiAgICB1cGRhdGVDaXR5VGl0bGUoZGF0YS5uYW1lKTtcblxuICAgIGNvbnN0IGRhdGFPYmplY3QgPSBnZXRXZWF0aGVyRGF0YShkYXRhKTtcbiAgICBjcmVhdGVDdXJyZW50Q2FyZChkYXRhT2JqZWN0Lmljb24sIGRhdGFPYmplY3QudGVtcCwgZGF0YU9iamVjdC5kZXNjcmlwdGlvbik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBfZ2V0Rm9yZWNhc3REYXRhKGRhdGEpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBsYXQgPSBkYXRhLmNvb3JkLmxhdDtcbiAgICBjb25zdCBsb24gPSBkYXRhLmNvb3JkLmxvbjtcbiAgICBjb25zdCBmb3JlY2FzdFJlcXVlc3QgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZhcHBpZD0ke3dlYXRoZXJLZXl9YDtcblxuICAgIGNvbnN0IHJlcGx5ID0gYXdhaXQgZmV0Y2goZm9yZWNhc3RSZXF1ZXN0LCB7IG1vZGU6IFwiY29yc1wiIH0pO1xuICAgIGlmIChyZXBseS5zdGF0dXMgIT0gMjAwKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGb3JlY2FzdCBkYXRhIHdhcyBub3QgcmV0cmlldmVkIHByb3Blcmx5YCk7XG5cbiAgICBjb25zdCBmb3JlY2FzdERhdGEgPSBhd2FpdCByZXBseS5qc29uKCk7XG4gICAgLy8gVE9ETyB1c2UgaW1wb3J0ZWQgZnVuY3Rpb24gaGVyZVxuICAgIGNyZWF0ZUZpdmVEYXlGb3JlY2FzdENhcmRzKGZvcmVjYXN0RGF0YS5saXN0KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICB9XG59XG5cbmV4cG9ydCB7IGZldGNoV2VhdGhlckRhdGEgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGdsb2JhbCBmcm9tIFwiLi9nbG9iYWxWYXJpYWJsZXNcIjtcbmltcG9ydCB7IGZldGNoV2VhdGhlckRhdGEgfSBmcm9tIFwiLi93ZWF0aGVyRGF0YUZldGNoaW5nXCI7XG5cbi8vIElucHV0c1xuY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIik7XG5jb25zdCB0aGVtZVRvZ2dsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGhlbWVcIik7XG5jb25zdCBjZWxzaXVzVG9nZ2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxzaXVzXCIpO1xuXG5jZWxzaXVzVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICBnbG9iYWwuaXNDZWxzaXVzID0gIWdsb2JhbC5pc0NlbHNpdXM7XG4gIGdsb2JhbC50ZW1wU3VmZml4ID0gZ2xvYmFsLmlzQ2Vsc2l1cyA/IFwiwrBDXCIgOiBcIsKwRlwiO1xuXG4gIGdldERhdGEoKTtcbn0pO1xuXG5zZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcInNlYXJjaFwiLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY29uc29sZS5sb2coXCJTZWFyY2hpbmc6IFwiICsgc2VhcmNoLnZhbHVlKTtcbiAgZ2xvYmFsLmNpdHkgPSBzZWFyY2gudmFsdWU7XG4gIHNlYXJjaC52YWx1ZSA9IFwiXCI7XG5cbiAgZmV0Y2hXZWF0aGVyRGF0YSgpO1xufSk7XG5cbmZldGNoV2VhdGhlckRhdGEoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==