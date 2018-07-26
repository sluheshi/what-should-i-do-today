'use strict';

let geolocation = require('./requesthandlers/getlocationdata.js');
let getweather = require('./requesthandlers/getweather.js');

function locationHandler(req,res) {
  geolocation.getGeoCodedLocation(req.query.address)
    .then(function(locationResponse) {
      var location = locationResponse.results[0].geometry.location;
      return getweather.getWeather(location.lat, location.lng);
    })
    .then(function(weatherResponse) {
      var conditions = getweather.goodOrBadWeather(weatherResponse);
      return geolocation.getPlaces(req.query.address, conditions);
    })
    .then(function(placesResponse) {
      var responseBody = {
        address: req.query.address,
        places: placesResponse
      };
      res.status(200).send(responseBody);
    })
    .catch(function(error) {
      res.status(500).send(error.message);
    });
}

module.exports = {
  locationHandler: locationHandler
};