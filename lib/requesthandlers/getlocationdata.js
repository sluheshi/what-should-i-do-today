'use strict';
const request = require('request');
const _ = require('lodash');

let googleApiKey = process.env.GOOGLEMAPSAPIKEY;

const placesQuery = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
const geocodeQuery = `https://maps.googleapis.com/maps/api/geocode/json?address`;

function getGeoCodedLocation(address) {
  return new Promise(
    function(resolve, reject) {
      let geocodeurl = `${geocodeQuery}=${address}&key=${googleApiKey}`;
      request(geocodeurl, function(err, response, body) {
        if (err) {
          reject(err, { message: 'Failed to retrieve geocoded location' });
        }
        let parsedBody = JSON.parse(body);
        //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        if (_.has(parsedBody,'error_message')) {
          console.log(parsedBody.error_message);
          reject(new Error(), { message: 'Failed to retrieve geocoded location' });
        }else {
          resolve(parsedBody);
        }
        //jscs:enable requireCamelCaseOrUpperCaseIdentifiers
      });
    });
}

function getPlaces(address, conditions) {
  return new Promise(
    function(resolve, reject) {
      var placeType;
      if (conditions === 'good') {
        placeType = 'parks';
      }else {
        placeType = 'museums';
      }
      let placesreq = `${placesQuery}=${placeType}+${address}&sensor=false&key=${googleApiKey}`;
      request(placesreq, function(err, response, body) {
        if (err) {
          reject(err, { message: 'Failed to retrieve places for this location' });
        }
        let parsedBody = JSON.parse(body);
        //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        if (_.has(parsedBody,'error_message')) {
          console.log(parsedBody.error_message);
          reject(new Error(), { message: 'Failed to retrieve place for this location' });
        }else {
          resolve(parsedBody);
        }
        //jscs:enable requireCamelCaseOrUpperCaseIdentifiers
      });
    });
}

module.exports = {
  getGeoCodedLocation: getGeoCodedLocation,
  getPlaces: getPlaces
};