'use strict';
const request = require('request');
const _ = require('lodash');

let apiKey = process.env.OPENWEATHERMAPAPIKEY;

function getWeather(lat, long, callback) {
  //let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  let latlongreq = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`

  request(latlongreq, function(err, response, body) {
    if (err) {
      return callback(err, { message: 'Failed to retrieve retrieve weather for this location' });
    } else {
      let weather = JSON.parse(body);
      if (weather.main === undefined) {
        return callback(new Error(), { message: 'Failed to retrieve weather for this location' });
      }else {
        //let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}
        return callback(null, weather);
      }
    }
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
  getWeather:  getWeather,
  goodOrBadWeather: goodOrBadWeather
};