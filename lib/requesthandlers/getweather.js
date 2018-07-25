'use strict';
const request = require('request');

let apiKey = process.env.OPENWEATHERMAPAPIKEY;
const weatherQuery = 'http://api.openweathermap.org/data/2.5/weather';

function getWeather(lat, lng) {
  return new Promise(
    function(resolve, reject) {
      let latlongreq = `${weatherQuery}?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;

      request(latlongreq, function(err, response, body) {
        if (err) {
          reject(err, { message: 'Failed to retrieve retrieve weather for this location' });
        } else {
          let weather = JSON.parse(body);
          if (weather.main === undefined) {
            reject(new Error(), { message: 'Failed to retrieve weather for this location' });
          }else {
            resolve(weather);
          }
        }
      });
    });
}

function goodOrBadWeather(weather) {
  if (weather.main.temp >= 21) {
    return 'good';
  } else {
    return 'bad';
  }
}

module.exports = {
  getWeather: getWeather,
  goodOrBadWeather: goodOrBadWeather
};
