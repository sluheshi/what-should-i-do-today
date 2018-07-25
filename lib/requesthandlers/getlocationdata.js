'use strict';
const request = require('request');
const _ = require('lodash');

let googleApiKey = process.env.GOOGLEMAPSAPIKEY;

const placesQuery = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
const geocodeQuery = `https://maps.googleapis.com/maps/api/geocode/json?address`;

function getPlaces(address, conditions, callback) {
  var placeType;
  if (conditions === 'good') {
    placeType = 'parks';
  }else {
    placeType = 'museums';
  }
  let placesreq = `${placesQuery}=${placeType}+${address}&sensor=false&key=${googleApiKey}`;
  request(placesreq, function(err, response, body) {
    if (err) {
      return callback(err, { message: 'Failed to retrieve places for this location' });
    }
    let parsedBody = JSON.parse(body);

    //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    if (_.has(parsedBody,'error_message')) { // jshint ignore:line
      console.log(parsedBody.error_message); // jshint ignore:line
      return callback(new Error(), { message: 'Failed to retrieve place for this location' });
    }else {
      return callback(null, parsedBody);
    }
    //jscs:enable requireCamelCaseOrUpperCaseIdentifiers
  });
}

function getGeoCodedLocation(address, callback) {

  let geocodeurl = `${geocodeQuery}=${address}&key=${googleApiKey}`;
  request(geocodeurl, function(err, response, body) {
      if (err) {
        return callback(err, { message: 'Failed to retrieve geocoded location' });
      }
      let parsedBody = JSON.parse(body);
      //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      if (_.has(parsedBody,'error_message')) {
        console.log(parsedBody.error_message);
        return callback(new Error(), { message: 'Failed to retrieve geocoded location' });
      }else {
        return callback(null, parsedBody);
      }
      //jscs:enable requireCamelCaseOrUpperCaseIdentifiers
    });
}

function getGeoCodedLocationP(address) {
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

function getPlacesP(address, conditions) {
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
  getGeoCodedLocation:  getGeoCodedLocation,
  getPlaces: getPlaces,
  getGeoCodedLocationP: getGeoCodedLocationP,
  getPlacesP: getPlacesP
};