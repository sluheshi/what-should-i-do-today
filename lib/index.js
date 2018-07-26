'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();

//custom modules
const geolocation = require('./requesthandlers/getlocationdata.js');
const getweather = require('./requesthandlers/getweather.js');

const noAPIKeysErrorMessage =
  'One or more API Keys required for this app have not been initialised per the README';

//Check apikeys for 3rd party services
function checkAPIKeys() {
  let weatherApiKey = process.env.OPENWEATHERMAPAPIKEY;
  let googleApiKey = process.env.GOOGLEMAPSAPIKEY;

  if (weatherApiKey === undefined || googleApiKey === undefined) {
    console.log(noAPIKeysErrorMessage);
    process.exit(1);
  }
}

checkAPIKeys();

// Route Handler for application /location route
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

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/location', function(req, res) {

  console.log(req.query);

  // Validate address
  if (!_.has(req.query, 'address')) {
    console.log('No address supplied');
    res.status(400).send(
      {
        message: 'No address supplied try sending an address in the form address=London,England'
      });
  }else {
    locationHandler(req, res);
  }
});

app.listen(3000, function() {
    console.log('What should I do app listening on port 3000!');
  });

