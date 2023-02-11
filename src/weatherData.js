import global from "./globalVariables";

function getWeatherData(data) {
  return {
    title: _getWeekDayValue(data.dt_txt),
    temp: `${_getActualTemp(data.main.temp)} ${global.tempSuffix}`,
    description: _uppercaseFirstChar(data.weather[0].description),
    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
}

function _getActualTemp(kelvin) {
  const celsius = kelvin - 273.15;

  let returnNum = celsius;
  // Convert to fahrenheit
  if (global.tempSuffix != "°C") returnNum = celsius * (9 / 5) + 32;

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

export { getWeatherData };
