'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();

//custom modules

const locationHandler = require('./location.js');

const noAPIKeysErrorMessage =
  'One or more API Keys required for this app have not been initialised per the README';

var weatherApiKey = process.env.OPENWEATHERMAPAPIKEY;
var googleApiKey = process.env.GOOGLEMAPSAPIKEY;

//Check apikeys for 3rd party services
function checkAPIKeys() {

  if (weatherApiKey === undefined || googleApiKey === undefined) {
    console.log(noAPIKeysErrorMessage);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'development') {
  checkAPIKeys();
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
    locationHandler.locationHandler(req, res);
  }
});

app.listen(3000, function() {
    console.log('What should I do app listening on port 3000!');
  });

