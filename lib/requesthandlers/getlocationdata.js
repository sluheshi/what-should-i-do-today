'use strict';
const request = require('request');
const _ = require('lodash');

let googleApiKey = process.env.GOOGLEMAPSAPIKEY;

function getPlaces(address, conditions, callback) {
  let placereq;
  if (conditions === 'good') {
    placereq = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=parks+${address}&sensor=false&key=${googleApiKey}`;
  }else {
    placereq = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=museums+${address}&sensor=false&key=${googleApiKey}`;
  }
  request(placereq, function(err, response, body) {
    if (err) {
      return callback(err, { message: 'Failed to retrieve places for this location' });
    }
    let parsedBody = JSON.parse(body);
    if (_.has(parsedBody,'error_message')) {
      console.log(parsedBody.error_message);
      return callback(new Error(), { message: 'Failed to retrieve place for this location' });
    }else {
      return callback(null, parsedBody);
    }

  });
}

function getGeoCodedLocation(address, callback) {

  let geocodeurl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleApiKey}`;
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

function getGeoCodedLocationP(address) {
  return new Promise(
    function(resolve, reject) {
      let geocodeurl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleApiKey}`;
      request(geocodeurl, function(err, response, body) {
        if (err) {
          reject(err, { message: 'Failed to retrieve geocoded location' });
        }
        let parsedBody = JSON.parse(body);
        if (_.has(parsedBody,'error_message')) {
          console.log(parsedBody.error_message);
          reject(new Error(), { message: 'Failed to retrieve geocoded location' });
        }else {
          resolve(parsedBody);
        }
      });
    });
}

module.exports = {
  getGeoCodedLocation:  getGeoCodedLocation,
  getPlaces: getPlaces,
  getGeoCodedLocationP: getGeoCodedLocationP
};