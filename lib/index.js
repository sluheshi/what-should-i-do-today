'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();

//custom modules
const geolocation = require('./requesthandlers/getlocationdata.js');
const getweather = require('./requesthandlers/getweather.js');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/location', function(req, res) {

    console.log(req.query);

    // Validate address and values
    if (!_.has(req.query, 'address')) {
      console.log('No address supplied');
      res.status(400).send({ message: 'No address supplied try sending an address in the form address=London,England' });
    }else {
      geolocation.getGeoCodedLocation(req.query.address, function(err, response) {
          if (err) {
            res.status(500).send(response.message);
          }else {
            let location = response.results[0].geometry.location;
            getweather.getWeather(location.lat, location.lng, function(err, response) {
              if (err) {
                res.status(500).send(response.message);
              }
              console.log(response);
              var conditions = getweather.goodOrBadWeather(response);
              geolocation.getPlaces(req.query.address, conditions, function(err, response) {
                if (err) {
                  res.status(500).send(response.message);
                }
                var responseBody = {
                  location: 'geocodedlocation',
                  address: req.query.address,
                  places: response,
                  conditions: conditions };
                res.status(200).send(responseBody);
              });
            });
          }
        });
    }

  });

app.get('/2/location', function(req, res) {

  console.log(req.query);

  // Validate address and values
  if (!_.has(req.query, 'address')) {
    console.log('No address supplied');
    res.status(400).send({ message: 'No address supplied try sending an address in the form address=London,England' });
  }else {
    geolocation.getGeoCodedLocationP(req.query.address)
      .then(function(locationResponse) {
        var location = locationResponse.results[0].geometry.location;
        return getweather.getWeatherP(location.lat, location.lng);
      })
    .then(function(weatherResponse) {
      var conditions = getweather.goodOrBadWeather(weatherResponse);
      return geolocation.getPlacesP(req.query.address, conditions);
    })
      .then(function(placesResponse) {
        var responseBody = {
          location: 'geocodedlocation',
          address: req.query.address,
          places: placesResponse
        };
        res.status(200).send(responseBody);
      })
      .catch(function(error) {
        res.status(500).send(error.message);
      });
  }

});

app.listen(3000, function() {
    console.log('What should I do app listening on port 3000!');
  });

