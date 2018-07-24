'use strict';
const request = require('request');
const _ = require('lodash');

let googleApiKey = process.env.GOOGLEMAPSAPIKEY;

function getGeoCodedLocation(address, callback) {

  //     let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  let geocodeurl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleApiKey}`
  request(geocodeurl, function(err, response, body) {
      if (err) {
        return callback(err, { message: 'Failed to retrieve geocoded location' });
      }
      let parsedBody = JSON.parse(body);
      if (_.has(parsedBody,'error_message')) {
        console.log(parsedBody.error_message);
        return callback(new Error(), { message: 'Failed to retrieve geocoded location' });
      }else {
        return callback(null, parsedBody);
      }

    });
}

module.exports = {
  getGeoCodedLocation:  getGeoCodedLocation
};